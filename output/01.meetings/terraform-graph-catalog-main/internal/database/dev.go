// Copyright IBM Corp. 2026

package database

import (
	"context"
	"fmt"
)

// This file holds dev-only queries that back the embedded development UI. They
// are NOT grant-scoped and must only ever be reachable behind the
// GRAPH_CATALOG_DEV_UI gate. They exist because the visual graph needs the raw
// workspace_edges adjacency and per-workspace resource sets, neither of which is
// exposed by the production (grant-scoped, paginated) query surface.

// WorkspaceGraphNode summarizes one workspace for the workspace-level graph view.
type WorkspaceGraphNode struct {
	WorkspaceID   string   `json:"workspace_id"`
	OrgID         string   `json:"org_id"`
	ProjectID     *string  `json:"project_id"`
	ResourceCount int      `json:"resource_count"`
	Providers     []string `json:"providers"`
}

// WorkspaceGraphEdge is a directed cross-workspace dependency: the consumer reads
// outputs from the producer via terraform_remote_state.
type WorkspaceGraphEdge struct {
	ProducerWorkspaceID string `json:"producer_workspace_id"`
	ConsumerWorkspaceID string `json:"consumer_workspace_id"`
}

// WorkspaceGraphResult is the whole-catalog overview rendered by the dev UI's
// workspace graph view.
type WorkspaceGraphResult struct {
	Nodes []WorkspaceGraphNode `json:"nodes"`
	Edges []WorkspaceGraphEdge `json:"edges"`
}

// WorkspaceGraph returns every workspace currently in the catalog (with its
// resource count and the set of provider sources it uses) plus every
// cross-workspace edge. Dev-only: scans the whole catalog with no grant scoping.
func (d *Database) WorkspaceGraph(ctx context.Context) (WorkspaceGraphResult, error) {
	var g WorkspaceGraphResult

	// Nodes: one row per workspace, collapsing the union of workspaces that
	// appear in resource_instances and/or workspace_providers. Resource counts
	// and provider lists are folded in via left joins so a workspace with a plan
	// ingest but no state (or vice versa) still appears.
	nodeSQL := `
		WITH ws AS (
			SELECT workspace_id, org_id, project_id FROM resource_instances
			UNION
			SELECT workspace_id, org_id, project_id FROM workspace_providers
		),
		ws_one AS (
			SELECT DISTINCT ON (workspace_id) workspace_id, org_id, project_id
			FROM ws
			ORDER BY workspace_id
		),
		counts AS (
			SELECT workspace_id, COUNT(*) AS resource_count
			FROM resource_instances
			GROUP BY workspace_id
		),
		provs AS (
			SELECT workspace_id, array_agg(DISTINCT provider_source ORDER BY provider_source) AS providers
			FROM workspace_providers
			GROUP BY workspace_id
		)
		SELECT w.workspace_id, w.org_id, w.project_id,
		       COALESCE(c.resource_count, 0),
		       COALESCE(p.providers, ARRAY[]::text[])
		FROM ws_one w
		LEFT JOIN counts c ON c.workspace_id = w.workspace_id
		LEFT JOIN provs  p ON p.workspace_id = w.workspace_id
		ORDER BY w.workspace_id`

	rows, err := d.pool.Query(ctx, nodeSQL)
	if err != nil {
		return g, fmt.Errorf("query workspace graph nodes: %w", err)
	}
	defer rows.Close()
	for rows.Next() {
		var n WorkspaceGraphNode
		if err := rows.Scan(&n.WorkspaceID, &n.OrgID, &n.ProjectID, &n.ResourceCount, &n.Providers); err != nil {
			return g, fmt.Errorf("scan workspace graph node: %w", err)
		}
		g.Nodes = append(g.Nodes, n)
	}
	if err := rows.Err(); err != nil {
		return g, fmt.Errorf("iterate workspace graph nodes: %w", err)
	}

	// Edges.
	edgeRows, err := d.pool.Query(ctx,
		`SELECT producer_workspace_id, consumer_workspace_id
		 FROM workspace_edges
		 ORDER BY producer_workspace_id, consumer_workspace_id`)
	if err != nil {
		return g, fmt.Errorf("query workspace graph edges: %w", err)
	}
	defer edgeRows.Close()
	for edgeRows.Next() {
		var e WorkspaceGraphEdge
		if err := edgeRows.Scan(&e.ProducerWorkspaceID, &e.ConsumerWorkspaceID); err != nil {
			return g, fmt.Errorf("scan workspace graph edge: %w", err)
		}
		g.Edges = append(g.Edges, e)
	}
	if err := edgeRows.Err(); err != nil {
		return g, fmt.Errorf("iterate workspace graph edges: %w", err)
	}

	return g, nil
}

// WorkspaceResources returns every resource instance in a single workspace,
// unpaginated, ordered by (address, instance_key). The dev UI builds the
// within-workspace dependency DAG client-side from each instance's dependencies
// array. Dev-only: no grant scoping.
func (d *Database) WorkspaceResources(ctx context.Context, workspaceID string) ([]ResourceResult, error) {
	sql := fmt.Sprintf(`SELECT %s
		FROM resource_instances ri
		WHERE ri.workspace_id = $1
		ORDER BY ri.address, ri.instance_key`, resourceCols)

	rows, err := d.pool.Query(ctx, sql, workspaceID)
	if err != nil {
		return nil, fmt.Errorf("query workspace resources: %w", err)
	}
	defer rows.Close()

	var out []ResourceResult
	for rows.Next() {
		var r ResourceResult
		if err := scanResource(rows, &r); err != nil {
			return nil, fmt.Errorf("scan workspace resource: %w", err)
		}
		out = append(out, r)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate workspace resources: %w", err)
	}
	return out, nil
}
