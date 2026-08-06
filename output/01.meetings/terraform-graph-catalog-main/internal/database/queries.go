// Copyright IBM Corp. 2026

package database

import (
	"context"
	"encoding/json"
	"fmt"
	"sort"
	"strings"

	"github.com/jackc/pgx/v5"
)

const (
	// defaultPageSize and maxPageSize bound the collection endpoints.
	defaultPageSize = 100
	maxPageSize     = 1000

	// maxBlastHops caps recursion depth in the cross-workspace blast-radius
	// CTE. Real graphs are typically 1-3 hops; this is a safety bound on top of
	// the per-path cycle guard.
	maxBlastHops = 32
)

// resourceCols is the ordered SELECT list backing ResourceResult, aliased to the
// resource_instances table as "ri".
const resourceCols = `ri.workspace_id, ri.org_id, ri.project_id, ri.address, ri.resource_type,
	ri.resource_name, ri.module, ri.provider, ri.mode, ri.instance_key, ri.attributes,
	ri.dependencies, ri.indexed_at, ri.updated_at`

// argBuilder accumulates positional query arguments and hands back the matching
// "$N" placeholder for each, so dynamic WHERE clauses stay in sync with the args
// slice.
type argBuilder struct {
	vals []any
}

func (a *argBuilder) add(v any) string {
	a.vals = append(a.vals, v)
	return fmt.Sprintf("$%d", len(a.vals))
}

func clampPageSize(n int) int {
	switch {
	case n <= 0:
		return defaultPageSize
	case n > maxPageSize:
		return maxPageSize
	default:
		return n
	}
}

// scanResource scans the standard resourceCols (plus any trailing extra dests)
// from the current row into r. Attributes is read as raw bytes so a SQL NULL maps
// to a nil json.RawMessage (which marshals as `null`).
func scanResource(rows pgx.Rows, r *ResourceResult, extra ...any) error {
	var attrs []byte
	dests := []any{
		&r.WorkspaceID, &r.OrgID, &r.ProjectID, &r.Address, &r.ResourceType,
		&r.ResourceName, &r.Module, &r.Provider, &r.Mode, &r.InstanceKey, &attrs,
		&r.Dependencies, &r.IndexedAt, &r.UpdatedAt,
	}
	dests = append(dests, extra...)
	if err := rows.Scan(dests...); err != nil {
		return err
	}
	if attrs != nil {
		r.Attributes = json.RawMessage(attrs)
	}
	return nil
}

// QueryResources returns resource instances visible to a grant, filtered by the
// query, ordered by (workspace_id, address, instance_key). It returns the page,
// the next cursor (nil when exhausted), and the total count of matching rows
// across all pages.
func (d *Database) QueryResources(ctx context.Context, q ResourceQuery) ([]ResourceResult, *ResourceCursor, int, error) {
	pageSize := clampPageSize(q.PageSize)

	args := &argBuilder{}
	grantPH := args.add(q.GrantID)

	conds := []string{}
	if q.WorkspaceID != "" {
		conds = append(conds, "ri.workspace_id = "+args.add(q.WorkspaceID))
	}
	if q.ResourceType != "" {
		conds = append(conds, "ri.resource_type = "+args.add(q.ResourceType))
	}
	if q.OrgID != "" {
		conds = append(conds, "ri.org_id = "+args.add(q.OrgID))
	}
	if q.ProjectID != "" {
		conds = append(conds, "ri.project_id = "+args.add(q.ProjectID))
	}
	// Attribute filters: exact match on attributes->>'key'. Sorted for stable SQL.
	for _, k := range sortedKeys(q.AttrFilters) {
		conds = append(conds,
			fmt.Sprintf("ri.attributes ->> %s = %s", args.add(k), args.add(q.AttrFilters[k])))
	}

	from := fmt.Sprintf(`FROM resource_instances ri
		JOIN access_grant_workspaces g
		  ON g.workspace_id = ri.workspace_id AND g.grant_id = %s::uuid`, grantPH)
	where := whereClause(conds)

	// Total count (independent of cursor/limit).
	var total int
	if err := d.pool.QueryRow(ctx,
		"SELECT COUNT(*) "+from+where, args.vals...,
	).Scan(&total); err != nil {
		return nil, nil, 0, fmt.Errorf("count resources: %w", err)
	}

	// Page query: add keyset cursor + limit on top of the shared filters.
	cursor := resourceCursorClause(q.Cursor, args)
	limitPH := args.add(pageSize + 1)
	pageSQL := fmt.Sprintf(`SELECT %s %s%s%s
		ORDER BY ri.workspace_id, ri.address, ri.instance_key
		LIMIT %s`, resourceCols, from, where, cursor, limitPH)

	rows, err := d.pool.Query(ctx, pageSQL, args.vals...)
	if err != nil {
		return nil, nil, 0, fmt.Errorf("query resources: %w", err)
	}
	defer rows.Close()

	var out []ResourceResult
	for rows.Next() {
		var r ResourceResult
		if err := scanResource(rows, &r); err != nil {
			return nil, nil, 0, fmt.Errorf("scan resource: %w", err)
		}
		out = append(out, r)
	}
	if err := rows.Err(); err != nil {
		return nil, nil, 0, fmt.Errorf("iterate resources: %w", err)
	}

	out, next := paginate(out, pageSize)
	return out, next, total, nil
}

// GetDependents returns all resource instances that have the given resource
// address in their dependencies array, annotated with the reason for the
// dependency (explicit / implicit:<attribute> / unknown). Scoped to the grant and
// paginated identically to QueryResources.
func (d *Database) GetDependents(ctx context.Context, grantID, address string, cur ResourceCursor, pageSizeReq int) ([]ResourceResult, *ResourceCursor, int, error) {
	pageSize := clampPageSize(pageSizeReq)

	args := &argBuilder{}
	grantPH := args.add(grantID)
	addrPH := args.add(address)

	// dependencies @> ARRAY[address] uses the GIN index on dependencies and is
	// equivalent to address = ANY(dependencies).
	from := fmt.Sprintf(`FROM resource_instances ri
		JOIN access_grant_workspaces g
		  ON g.workspace_id = ri.workspace_id AND g.grant_id = %s::uuid`, grantPH)
	depCond := fmt.Sprintf("ri.dependencies @> ARRAY[%s]::text[]", addrPH)
	where := whereClause([]string{depCond})

	var total int
	if err := d.pool.QueryRow(ctx,
		"SELECT COUNT(*) "+from+where, args.vals...,
	).Scan(&total); err != nil {
		return nil, nil, 0, fmt.Errorf("count dependents: %w", err)
	}

	// LEFT JOIN resource_configs to derive dependency_reason. The instance
	// address carries a trailing [key] for count/for_each instances; configs are
	// keyed by the bare resource address, so strip it.
	cursor := resourceCursorClause(cur, args)
	limitPH := args.add(pageSize + 1)
	pageSQL := fmt.Sprintf(`SELECT %s, rc.config_depends_on, rc.expressions
		%s
		LEFT JOIN resource_configs rc
		  ON rc.workspace_id = ri.workspace_id
		 AND rc.resource_address = regexp_replace(ri.address, '\[.*\]$', '')
		%s%s
		ORDER BY ri.workspace_id, ri.address, ri.instance_key
		LIMIT %s`, resourceCols, from, where, cursor, limitPH)

	rows, err := d.pool.Query(ctx, pageSQL, args.vals...)
	if err != nil {
		return nil, nil, 0, fmt.Errorf("query dependents: %w", err)
	}
	defer rows.Close()

	var out []ResourceResult
	for rows.Next() {
		var (
			r          ResourceResult
			dependsOn  []string
			expression []byte
		)
		if err := scanResource(rows, &r, &dependsOn, &expression); err != nil {
			return nil, nil, 0, fmt.Errorf("scan dependent: %w", err)
		}
		reason := dependencyReason(address, dependsOn, expression)
		r.DependencyReason = &reason
		out = append(out, r)
	}
	if err := rows.Err(); err != nil {
		return nil, nil, 0, fmt.Errorf("iterate dependents: %w", err)
	}

	out, next := paginate(out, pageSize)
	return out, next, total, nil
}

// QueryProviders returns provider configurations visible to a grant, ordered by
// (workspace_id, provider_source, alias).
func (d *Database) QueryProviders(ctx context.Context, q ProviderQuery) ([]ProviderResult, *ProviderCursor, int, error) {
	pageSize := clampPageSize(q.PageSize)

	args := &argBuilder{}
	grantPH := args.add(q.GrantID)

	conds := []string{}
	if q.ProviderSource != "" {
		conds = append(conds, "wp.provider_source = "+args.add(q.ProviderSource))
	}
	if q.VersionConstraint != "" {
		// Substring match on the constraint string.
		conds = append(conds, "wp.version_constraint LIKE "+args.add("%"+escapeLike(q.VersionConstraint)+"%"))
	}
	if q.VersionExact != "" {
		conds = append(conds, "wp.version_exact = "+args.add(q.VersionExact))
	}

	from := fmt.Sprintf(`FROM workspace_providers wp
		JOIN access_grant_workspaces g
		  ON g.workspace_id = wp.workspace_id AND g.grant_id = %s::uuid`, grantPH)
	where := whereClause(conds)

	var total int
	if err := d.pool.QueryRow(ctx,
		"SELECT COUNT(*) "+from+where, args.vals...,
	).Scan(&total); err != nil {
		return nil, nil, 0, fmt.Errorf("count providers: %w", err)
	}

	cursor := providerCursorClause(q.Cursor, args)
	limitPH := args.add(pageSize + 1)
	pageSQL := fmt.Sprintf(`SELECT wp.workspace_id, wp.org_id, wp.project_id, wp.provider_source,
		wp.alias, wp.version_constraint, wp.version_exact, wp.configuration
		%s%s%s
		ORDER BY wp.workspace_id, wp.provider_source, wp.alias
		LIMIT %s`, from, where, cursor, limitPH)

	rows, err := d.pool.Query(ctx, pageSQL, args.vals...)
	if err != nil {
		return nil, nil, 0, fmt.Errorf("query providers: %w", err)
	}
	defer rows.Close()

	var out []ProviderResult
	for rows.Next() {
		var (
			p    ProviderResult
			conf []byte
		)
		if err := rows.Scan(&p.WorkspaceID, &p.OrgID, &p.ProjectID, &p.ProviderSource,
			&p.Alias, &p.VersionConstraint, &p.VersionExact, &conf); err != nil {
			return nil, nil, 0, fmt.Errorf("scan provider: %w", err)
		}
		if conf != nil {
			p.Configuration = json.RawMessage(conf)
		}
		out = append(out, p)
	}
	if err := rows.Err(); err != nil {
		return nil, nil, 0, fmt.Errorf("iterate providers: %w", err)
	}

	var next *ProviderCursor
	if len(out) > pageSize {
		out = out[:pageSize]
		last := out[len(out)-1]
		next = &ProviderCursor{
			WorkspaceID:    last.WorkspaceID,
			ProviderSource: last.ProviderSource,
			Alias:          last.Alias,
			Set:            true,
		}
	}
	return out, next, total, nil
}

// BlastRadius returns every resource instance in every workspace that directly
// or transitively consumes outputs from the source workspace via
// terraform_remote_state, scoped to the grant. Each result is annotated with its
// hop_distance (minimum number of workspace_edges hops from the source).
func (d *Database) BlastRadius(ctx context.Context, grantID, sourceWorkspaceID string, cur ResourceCursor, pageSizeReq int) ([]ResourceResult, *ResourceCursor, int, error) {
	pageSize := clampPageSize(pageSizeReq)

	args := &argBuilder{}
	sourcePH := args.add(sourceWorkspaceID)
	hopsPH := args.add(maxBlastHops)
	grantPH := args.add(grantID)

	// Recursive traversal of workspace_edges with a per-path cycle guard and hop
	// cap, collapsed to the minimum hop distance per affected workspace.
	cte := fmt.Sprintf(`WITH RECURSIVE affected AS (
			SELECT we.consumer_workspace_id AS workspace_id,
			       1 AS hop,
			       ARRAY[we.producer_workspace_id, we.consumer_workspace_id] AS path
			FROM workspace_edges we
			WHERE we.producer_workspace_id = %s
			UNION ALL
			SELECT we.consumer_workspace_id,
			       a.hop + 1,
			       a.path || we.consumer_workspace_id
			FROM workspace_edges we
			JOIN affected a ON we.producer_workspace_id = a.workspace_id
			WHERE NOT we.consumer_workspace_id = ANY(a.path)
			  AND a.hop < %s
		),
		affected_min AS (
			SELECT workspace_id, MIN(hop) AS hop_distance
			FROM affected
			GROUP BY workspace_id
		)`, sourcePH, hopsPH)

	from := fmt.Sprintf(`FROM resource_instances ri
		JOIN affected_min am ON am.workspace_id = ri.workspace_id
		JOIN access_grant_workspaces g
		  ON g.workspace_id = ri.workspace_id AND g.grant_id = %s::uuid`, grantPH)

	// Single query: COUNT(*) OVER() computes the total count across all matching
	// rows (before LIMIT) while the LIMIT clause bounds the returned page.
	cursor := resourceCursorClause(cur, args)
	limitPH := args.add(pageSize + 1)
	pageSQL := fmt.Sprintf(`%s
		SELECT %s, am.hop_distance, COUNT(*) OVER() AS total_count
		%s%s
		ORDER BY ri.workspace_id, ri.address, ri.instance_key
		LIMIT %s`, cte, resourceCols, from, cursor, limitPH)

	rows, err := d.pool.Query(ctx, pageSQL, args.vals...)
	if err != nil {
		return nil, nil, 0, fmt.Errorf("query blast radius: %w", err)
	}
	defer rows.Close()

	var (
		out   []ResourceResult
		total int
	)
	for rows.Next() {
		var (
			r   ResourceResult
			hop int
		)
		if err := scanResource(rows, &r, &hop, &total); err != nil {
			return nil, nil, 0, fmt.Errorf("scan blast radius: %w", err)
		}
		h := hop
		r.HopDistance = &h
		out = append(out, r)
	}
	if err := rows.Err(); err != nil {
		return nil, nil, 0, fmt.Errorf("iterate blast radius: %w", err)
	}

	out, next := paginate(out, pageSize)
	return out, next, total, nil
}

// --- helpers ---

func whereClause(conds []string) string {
	if len(conds) == 0 {
		return ""
	}
	return " WHERE " + strings.Join(conds, " AND ")
}

// resourceCursorClause returns a keyset predicate on
// (workspace_id, address, instance_key) for the resource ordering, or an empty
// string when the cursor is unset. It is meant to be appended after an existing
// WHERE clause via " AND ...".
func resourceCursorClause(c ResourceCursor, args *argBuilder) string {
	if !c.Set {
		return ""
	}
	w := args.add(c.WorkspaceID)
	a := args.add(c.Address)
	k := args.add(c.InstanceKey)
	return fmt.Sprintf(" AND (ri.workspace_id, ri.address, ri.instance_key) > (%s, %s, %s)", w, a, k)
}

// providerCursorClause is the provider-ordering analogue of resourceCursorClause.
func providerCursorClause(c ProviderCursor, args *argBuilder) string {
	if !c.Set {
		return ""
	}
	w := args.add(c.WorkspaceID)
	s := args.add(c.ProviderSource)
	l := args.add(c.Alias)
	return fmt.Sprintf(" AND (wp.workspace_id, wp.provider_source, wp.alias) > (%s, %s, %s)", w, s, l)
}

// paginate trims an over-fetched (pageSize+1) result set to pageSize and, when an
// extra row was present, derives the next cursor from the last returned row.
func paginate(rows []ResourceResult, pageSize int) ([]ResourceResult, *ResourceCursor) {
	if len(rows) <= pageSize {
		return rows, nil
	}
	rows = rows[:pageSize]
	last := rows[len(rows)-1]
	return rows, &ResourceCursor{
		WorkspaceID: last.WorkspaceID,
		Address:     last.Address,
		InstanceKey: last.InstanceKey,
		Set:         true,
	}
}

// dependencyReason classifies why a dependent resource depends on the target
// address, using its plan-derived config. Precedence: explicit depends_on, then
// the first (sorted) attribute whose expression references the target, then
// unknown (config not ingested, or only a transitive dependency).
func dependencyReason(target string, dependsOn []string, expressions []byte) string {
	for _, dep := range dependsOn {
		if dep == target {
			return "explicit"
		}
	}

	if len(expressions) > 0 {
		var exprMap map[string]json.RawMessage
		if err := json.Unmarshal(expressions, &exprMap); err == nil {
			for _, attr := range sortedKeys(exprMap) {
				if expressionReferences(exprMap[attr], target) {
					return "implicit:" + attr
				}
			}
		}
	}

	return "unknown"
}

// expressionReferences reports whether a plan-JSON expression object references
// the target address in its "references" array. A reference matches when it is
// exactly the target or an attribute path rooted at the target (e.g. target
// "aws_vpc.main" matches reference "aws_vpc.main.id").
func expressionReferences(expr json.RawMessage, target string) bool {
	var obj struct {
		References []string `json:"references"`
	}
	if err := json.Unmarshal(expr, &obj); err != nil {
		return false
	}
	for _, ref := range obj.References {
		if ref == target || strings.HasPrefix(ref, target+".") {
			return true
		}
	}
	return false
}

// sortedKeys returns the keys of a map in sorted order.
func sortedKeys[V any](m map[string]V) []string {
	if len(m) == 0 {
		return nil
	}
	keys := make([]string, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	return keys
}

// escapeLike escapes LIKE wildcards so a substring filter matches literally.
func escapeLike(s string) string {
	r := strings.NewReplacer(`\`, `\\`, `%`, `\%`, `_`, `\_`)
	return r.Replace(s)
}

// ListGrantWorkspaces returns workspaces accessible under a grant.
// sortBy controls the ordering: "blast_radius" sorts by number of direct
// downstream workspaces descending; anything else sorts by resource_count
// descending. Both orderings break ties on workspace_id ascending.
// Every row always includes both resource_count and downstream_workspaces.
// total is the grant's full workspace count regardless of limit.
func (d *Database) ListGrantWorkspaces(ctx context.Context, grantID string, limit int, sortBy string) ([]WorkspaceSummary, int, error) {
	var total int
	if err := d.pool.QueryRow(ctx,
		`SELECT COUNT(*) FROM access_grant_workspaces WHERE grant_id = $1::uuid`,
		grantID,
	).Scan(&total); err != nil {
		return nil, 0, fmt.Errorf("count grant workspaces: %w", err)
	}

	orderExpr := "resource_count DESC, g.workspace_id"
	if sortBy == "blast_radius" {
		orderExpr = "COALESCE(br.downstream_count, 0) DESC, g.workspace_id"
	}

	// Single grant-scoped scan of resource_instances (using resource_instances_ws_idx).
	// MIN(org_id)/MIN(project_id) are safe because both are invariant per workspace.
	// COUNT(*) on workspace_edges is correct: PK (consumer,producer) already
	// guarantees uniqueness per producer, so DISTINCT is unnecessary.
	q := fmt.Sprintf(`
		SELECT
			g.workspace_id,
			COALESCE(MIN(ri.org_id), '')     AS org_id,
			MIN(ri.project_id)               AS project_id,
			COUNT(ri.id)                     AS resource_count,
			COALESCE(br.downstream_count, 0) AS downstream_workspaces
		FROM access_grant_workspaces g
		LEFT JOIN resource_instances ri ON ri.workspace_id = g.workspace_id
		LEFT JOIN (
			SELECT producer_workspace_id, COUNT(*) AS downstream_count
			FROM workspace_edges GROUP BY producer_workspace_id
		) br ON br.producer_workspace_id = g.workspace_id
		WHERE g.grant_id = $1::uuid
		GROUP BY g.workspace_id, br.downstream_count
		ORDER BY %s
		LIMIT $2`, orderExpr)

	rows, err := d.pool.Query(ctx, q, grantID, limit)
	if err != nil {
		return nil, 0, fmt.Errorf("list grant workspaces: %w", err)
	}
	defer rows.Close()

	var out []WorkspaceSummary
	for rows.Next() {
		var w WorkspaceSummary
		if err := rows.Scan(&w.WorkspaceID, &w.OrgID, &w.ProjectID, &w.ResourceCount, &w.DownstreamWorkspaces); err != nil {
			return nil, 0, fmt.Errorf("scan workspace summary: %w", err)
		}
		out = append(out, w)
	}
	if out == nil {
		out = []WorkspaceSummary{}
	}
	return out, total, rows.Err()
}
