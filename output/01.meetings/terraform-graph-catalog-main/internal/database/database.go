// Copyright IBM Corp. 2026

// Package database provides the Postgres data layer for the Terraform Graph
// Catalog. It owns the connection pool, schema migrations, ingest transactions,
// access grants, and the query surface.
//
// The service is query-heavy and leans on Postgres-native features (text[] GIN
// containment, jsonb filters, recursive CTEs), so it uses pgx/v5 directly rather
// than an ORM. Migrations are managed by golang-migrate over an independent
// connection, mirroring the Janus pattern.
package database

import (
	"context"
	"fmt"
	"time"

	"terraform-graph-catalog/internal/config"
	"terraform-graph-catalog/internal/telemetry"

	"github.com/jackc/pgx/v5/pgxpool"
)

// Database wraps a pgx connection pool and telemetry.
type Database struct {
	pool *pgxpool.Pool
	t    telemetry.Telemetry
}

// New initializes a Database instance from config, running migrations on
// startup.
func New(cfg *config.Config, t telemetry.Telemetry) (*Database, error) {
	m, err := NewMigrator(cfg, cfg.PostgresSchema, t.Named("migrate"))
	if err != nil {
		return nil, fmt.Errorf("failed creating migrator: %w", err)
	}
	if err := m.Migrate(); err != nil {
		return nil, fmt.Errorf("failed running migrations: %w", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	pool, err := pgxpool.New(ctx, dsnForSchema(cfg, cfg.PostgresSchema))
	if err != nil {
		return nil, fmt.Errorf("failed connecting to database: %w", err)
	}
	if err := pool.Ping(ctx); err != nil {
		return nil, fmt.Errorf("failed pinging database: %w", err)
	}

	return NewWithPool(pool, t), nil
}

// NewWithPool initializes a Database with an existing pool. Useful for tests.
func NewWithPool(pool *pgxpool.Pool, t telemetry.Telemetry) *Database {
	return &Database{pool: pool, t: t}
}

// Pool exposes the underlying connection pool (used by tests).
func (d *Database) Pool() *pgxpool.Pool {
	return d.pool
}

// Ping checks database connectivity for health checks.
func (d *Database) Ping(ctx context.Context) error {
	return d.pool.Ping(ctx)
}

// Close closes the connection pool.
func (d *Database) Close() {
	d.pool.Close()
}

// dsnForSchema builds a Postgres DSN for the configured database using the
// postgresql:// scheme understood by pgxpool. The schema is set as search_path.
func dsnForSchema(cfg *config.Config, schema string) string {
	return fmt.Sprintf("postgresql://%s:%s@%s/%s?search_path=%s",
		cfg.PostgresUser, cfg.PostgresPass, cfg.PostgresAddr, cfg.PostgresDB, schema)
}
