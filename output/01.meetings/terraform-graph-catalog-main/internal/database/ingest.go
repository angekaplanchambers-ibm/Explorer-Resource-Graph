// Copyright IBM Corp. 2026

package database

import (
	"context"
	"fmt"
	"hash/fnv"

	"github.com/jackc/pgx/v5"
)

// advisoryKey derives a deterministic 64-bit advisory-lock key from a workspace
// ID. Both ingest paths lock on the same key so that state and plan ingests for
// the same workspace serialize against each other.
func advisoryKey(workspaceID string) int64 {
	h := fnv.New64a()
	_, _ = h.Write([]byte(workspaceID))
	return int64(h.Sum64())
}

// jsonbArg returns a value suitable for binding to a $n::jsonb placeholder:
// the JSON as a string, or nil for SQL NULL.
func jsonbArg(raw []byte) any {
	if len(raw) == 0 {
		return nil
	}
	return string(raw)
}

func textArray(in []string) []string {
	if in == nil {
		return []string{}
	}
	return in
}

// IngestStateVersion replaces the resource instances and outputs for a workspace
// with the contents of a new state version. Returns true if data was ingested,
// false if the call was an idempotent no-op (the state_version_id was already
// present).
//
// Transaction shape: advisory lock on workspace_id -> idempotency check on
// resource_instances.state_version_id -> delete-then-insert -> commit.
func (d *Database) IngestStateVersion(ctx context.Context, in StateVersionIngest) (ingested bool, err error) {
	tx, err := d.pool.Begin(ctx)
	if err != nil {
		return false, fmt.Errorf("begin: %w", err)
	}
	defer func() { _ = tx.Rollback(ctx) }()

	if _, err = tx.Exec(ctx, "SELECT pg_advisory_xact_lock($1)", advisoryKey(in.WorkspaceID)); err != nil {
		return false, fmt.Errorf("advisory lock: %w", err)
	}

	var exists bool
	err = tx.QueryRow(ctx,
		`SELECT EXISTS(SELECT 1 FROM resource_instances WHERE workspace_id = $1 AND state_version_id = $2)`,
		in.WorkspaceID, in.StateVersionID,
	).Scan(&exists)
	if err != nil {
		return false, fmt.Errorf("idempotency check: %w", err)
	}
	if exists {
		// Already ingested this state version: idempotent no-op.
		if err = tx.Commit(ctx); err != nil {
			return false, fmt.Errorf("commit: %w", err)
		}
		return false, nil
	}

	// Replace the full set for this workspace.
	if _, err = tx.Exec(ctx, `DELETE FROM resource_instances WHERE workspace_id = $1`, in.WorkspaceID); err != nil {
		return false, fmt.Errorf("delete instances: %w", err)
	}
	if _, err = tx.Exec(ctx, `DELETE FROM state_outputs WHERE workspace_id = $1`, in.WorkspaceID); err != nil {
		return false, fmt.Errorf("delete outputs: %w", err)
	}

	batch := &pgx.Batch{}
	for _, r := range in.Resources {
		module := r.Module
		if module == "" {
			module = "root"
		}
		mode := r.Mode
		if mode == "" {
			mode = "managed"
		}
		batch.Queue(
			`INSERT INTO resource_instances
			   (workspace_id, org_id, project_id, state_version_id, address, resource_type,
			    resource_name, module, provider, mode, instance_key, attributes, dependencies)
			 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,$13)`,
			in.WorkspaceID, in.OrgID, in.ProjectID, in.StateVersionID, r.Address, r.ResourceType,
			r.ResourceName, module, r.Provider, mode, r.InstanceKey,
			jsonbArg(r.Attributes), textArray(r.Dependencies),
		)
	}
	for _, o := range in.Outputs {
		batch.Queue(
			`INSERT INTO state_outputs
			   (workspace_id, org_id, project_id, state_version_id, name, value, sensitive, detailed_type)
			 VALUES ($1,$2,$3,$4,$5,$6::jsonb,$7,$8::jsonb)`,
			in.WorkspaceID, in.OrgID, in.ProjectID, in.StateVersionID, o.Name,
			jsonbArg(o.Value), o.Sensitive, jsonbArg(o.DetailedType),
		)
	}

	if err = drainBatch(ctx, tx, batch); err != nil {
		return false, fmt.Errorf("insert state data: %w", err)
	}

	if err = tx.Commit(ctx); err != nil {
		return false, fmt.Errorf("commit: %w", err)
	}
	return true, nil
}

// IngestPlan replaces the resource configs, provider configs, and cross-workspace
// edges for a workspace with the contents of a plan delivered by Atlas. Returns
// true if data was ingested, false on idempotent no-op.
//
// Transaction shape: advisory lock on workspace_id -> idempotency check on
// resource_configs.state_version_id -> delete-then-insert (configs, providers,
// edges) -> commit.
func (d *Database) IngestPlan(ctx context.Context, in PlanIngest) (ingested bool, err error) {
	tx, err := d.pool.Begin(ctx)
	if err != nil {
		return false, fmt.Errorf("begin: %w", err)
	}
	defer func() { _ = tx.Rollback(ctx) }()

	if _, err = tx.Exec(ctx, "SELECT pg_advisory_xact_lock($1)", advisoryKey(in.WorkspaceID)); err != nil {
		return false, fmt.Errorf("advisory lock: %w", err)
	}

	var exists bool
	err = tx.QueryRow(ctx,
		`SELECT EXISTS(SELECT 1 FROM resource_configs WHERE workspace_id = $1 AND state_version_id = $2)`,
		in.WorkspaceID, in.StateVersionID,
	).Scan(&exists)
	if err != nil {
		return false, fmt.Errorf("idempotency check: %w", err)
	}
	if exists {
		if err = tx.Commit(ctx); err != nil {
			return false, fmt.Errorf("commit: %w", err)
		}
		return false, nil
	}

	// Replace configs, providers, and edges for this workspace atomically.
	if _, err = tx.Exec(ctx, `DELETE FROM resource_configs WHERE workspace_id = $1`, in.WorkspaceID); err != nil {
		return false, fmt.Errorf("delete configs: %w", err)
	}
	if _, err = tx.Exec(ctx, `DELETE FROM workspace_providers WHERE workspace_id = $1`, in.WorkspaceID); err != nil {
		return false, fmt.Errorf("delete providers: %w", err)
	}
	if _, err = tx.Exec(ctx, `DELETE FROM workspace_edges WHERE consumer_workspace_id = $1`, in.WorkspaceID); err != nil {
		return false, fmt.Errorf("delete edges: %w", err)
	}

	batch := &pgx.Batch{}
	for _, r := range in.Resources {
		batch.Queue(
			`INSERT INTO resource_configs
			   (workspace_id, org_id, project_id, state_version_id, resource_address,
			    resource_type, provider, config_depends_on, expressions)
			 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb)`,
			in.WorkspaceID, in.OrgID, in.ProjectID, in.StateVersionID, r.ResourceAddress,
			r.ResourceType, r.Provider, textArray(r.ConfigDependsOn), jsonbArg(r.Expressions),
		)
	}
	for _, p := range in.Providers {
		batch.Queue(
			`INSERT INTO workspace_providers
			   (workspace_id, org_id, project_id, state_version_id, provider_source,
			    alias, version_constraint, version_exact, configuration)
			 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb)`,
			in.WorkspaceID, in.OrgID, in.ProjectID, in.StateVersionID, p.ProviderSource,
			p.Alias, p.VersionConstraint, p.VersionExact, jsonbArg(p.Configuration),
		)
	}
	// Deduplicate edges to avoid PK violations within one payload.
	seen := make(map[string]struct{}, len(in.WorkspaceEdges))
	for _, e := range in.WorkspaceEdges {
		if e.ProducerWorkspaceID == "" || e.ProducerWorkspaceID == in.WorkspaceID {
			continue // skip empty and self-edges
		}
		if _, ok := seen[e.ProducerWorkspaceID]; ok {
			continue
		}
		seen[e.ProducerWorkspaceID] = struct{}{}
		batch.Queue(
			`INSERT INTO workspace_edges (consumer_workspace_id, producer_workspace_id)
			 VALUES ($1,$2) ON CONFLICT DO NOTHING`,
			in.WorkspaceID, e.ProducerWorkspaceID,
		)
	}

	if err = drainBatch(ctx, tx, batch); err != nil {
		return false, fmt.Errorf("insert plan data: %w", err)
	}

	if err = tx.Commit(ctx); err != nil {
		return false, fmt.Errorf("commit: %w", err)
	}
	return true, nil
}

// UpdateProviderVersions patches the version_exact field on existing
// workspace_providers rows matched by (workspace_id, provider_source). It is
// called after a successful apply when the runtime-report pipeline delivers
// resolved lock-file versions. Rows that do not yet exist (e.g. if plan ingest
// has not run) are silently skipped (UPDATE touches 0 rows for that source).
func (d *Database) UpdateProviderVersions(ctx context.Context, workspaceID string, providers []ProviderVersionUpdate) error {
	if len(providers) == 0 {
		return nil
	}

	tx, err := d.pool.Begin(ctx)
	if err != nil {
		return fmt.Errorf("begin: %w", err)
	}
	defer func() { _ = tx.Rollback(ctx) }()

	if _, err = tx.Exec(ctx, "SELECT pg_advisory_xact_lock($1)", advisoryKey(workspaceID)); err != nil {
		return fmt.Errorf("advisory lock: %w", err)
	}

	batch := &pgx.Batch{}
	for _, p := range providers {
		batch.Queue(
			`UPDATE workspace_providers SET version_exact = $1 WHERE workspace_id = $2 AND provider_source = $3`,
			p.Version, workspaceID, p.ProviderSource,
		)
	}

	if err = drainBatch(ctx, tx, batch); err != nil {
		return fmt.Errorf("update provider versions: %w", err)
	}

	if err = tx.Commit(ctx); err != nil {
		return fmt.Errorf("commit: %w", err)
	}
	return nil
}

// drainBatch sends a batch on the transaction and consumes all results, returning
// the first error encountered.
func drainBatch(ctx context.Context, tx pgx.Tx, batch *pgx.Batch) error {
	if batch.Len() == 0 {
		return nil
	}
	br := tx.SendBatch(ctx, batch)
	var firstErr error
	for i := 0; i < batch.Len(); i++ {
		if _, err := br.Exec(); err != nil && firstErr == nil {
			firstErr = err
		}
	}
	if cerr := br.Close(); cerr != nil && firstErr == nil {
		firstErr = cerr
	}
	return firstErr
}
