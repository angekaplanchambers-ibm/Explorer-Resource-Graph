// Copyright IBM Corp. 2026

package database

import (
	"context"
	"fmt"
	"time"
)

// Grant is an access grant: an opaque token plus its expiry.
type Grant struct {
	GrantID   string    `json:"grant_id"`
	ExpiresAt time.Time `json:"expires_at"`
}

// CreateGrant inserts a new access grant and its workspace set. The workspace
// IDs are written with a single set-returning INSERT so that even very large
// grants (tens of thousands of workspaces) are a single round trip.
func (d *Database) CreateGrant(ctx context.Context, workspaceIDs []string, ttl time.Duration) (Grant, error) {
	expiresAt := time.Now().Add(ttl).UTC()

	tx, err := d.pool.Begin(ctx)
	if err != nil {
		return Grant{}, fmt.Errorf("begin: %w", err)
	}
	defer func() { _ = tx.Rollback(ctx) }()

	var grantID string
	err = tx.QueryRow(ctx,
		`INSERT INTO access_grants (expires_at) VALUES ($1) RETURNING grant_id::text`,
		expiresAt,
	).Scan(&grantID)
	if err != nil {
		return Grant{}, fmt.Errorf("insert grant: %w", err)
	}

	if len(workspaceIDs) > 0 {
		_, err = tx.Exec(ctx,
			`INSERT INTO access_grant_workspaces (grant_id, workspace_id)
			 SELECT $1::uuid, w FROM unnest($2::text[]) AS w
			 ON CONFLICT DO NOTHING`,
			grantID, workspaceIDs,
		)
		if err != nil {
			return Grant{}, fmt.Errorf("insert grant workspaces: %w", err)
		}
	}

	if err = tx.Commit(ctx); err != nil {
		return Grant{}, fmt.Errorf("commit: %w", err)
	}

	return Grant{GrantID: grantID, ExpiresAt: expiresAt}, nil
}

// DeleteGrant removes an access grant and its workspace set. Used as a
// compensating action when the Redis validity key cannot be written after the
// Postgres rows are committed.
func (d *Database) DeleteGrant(ctx context.Context, grantID string) error {
	_, err := d.pool.Exec(ctx,
		`DELETE FROM access_grants WHERE grant_id = $1::uuid`, grantID)
	if err != nil {
		return fmt.Errorf("delete grant: %w", err)
	}
	return nil
}

// DeleteExpiredGrants removes grants whose expires_at is in the past. Called
// periodically to keep the access_grants table from growing without bound.
// access_grant_workspaces rows are deleted via ON DELETE CASCADE.
func (d *Database) DeleteExpiredGrants(ctx context.Context) (int64, error) {
	tag, err := d.pool.Exec(ctx,
		`DELETE FROM access_grants WHERE expires_at < now()`)
	if err != nil {
		return 0, fmt.Errorf("delete expired grants: %w", err)
	}
	return tag.RowsAffected(), nil
}

// AllWorkspaceIDs returns the distinct set of workspace IDs currently present in
// the catalog. Used by the development "grant for everything" endpoint.
func (d *Database) AllWorkspaceIDs(ctx context.Context) ([]string, error) {
	rows, err := d.pool.Query(ctx,
		`SELECT DISTINCT workspace_id FROM resource_instances
		 UNION
		 SELECT DISTINCT workspace_id FROM resource_configs
		 UNION
		 SELECT DISTINCT workspace_id FROM workspace_providers`)
	if err != nil {
		return nil, fmt.Errorf("query workspace ids: %w", err)
	}
	defer rows.Close()

	var ids []string
	for rows.Next() {
		var id string
		if err := rows.Scan(&id); err != nil {
			return nil, fmt.Errorf("scan: %w", err)
		}
		ids = append(ids, id)
	}
	return ids, rows.Err()
}
