// Copyright IBM Corp. 2026

package database

import (
	"context"
	"fmt"
	"strings"
	"testing"
	"time"

	"terraform-graph-catalog/internal/config"
	"terraform-graph-catalog/internal/telemetry"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/stretchr/testify/require"
)

// TestDB wraps a Database backed by a unique, throwaway Postgres schema so that
// each test runs in isolation. The schema is created on construction and dropped
// via t.Cleanup. Mirrors the Janus per-schema test pattern, adapted to pgx.
type TestDB struct {
	*Database

	schemaName string
	cfg        *config.Config
}

// NewTestDB creates an isolated schema for the test and runs migrations against
// it, returning a ready-to-use Database.
func NewTestDB(t *testing.T) *TestDB {
	t.Helper()
	db := NewEmptyTestDB(t)
	db.migrate(t)
	return db
}

// NewEmptyTestDB creates an isolated schema and connects a pool to it, but does
// not run migrations.
func NewEmptyTestDB(t *testing.T) *TestDB {
	t.Helper()

	cfg := config.NewConfigFromEnv()
	schemaName := strings.ReplaceAll("test_"+uuid.NewString(), "-", "_")

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	// Create the schema via an admin connection rooted at the public schema.
	admin, err := pgxpool.New(ctx, dsnForSchema(cfg, "public"))
	require.NoError(t, err, "connect admin pool")
	_, err = admin.Exec(ctx, fmt.Sprintf("CREATE SCHEMA %s", schemaName))
	admin.Close()
	require.NoError(t, err, "create test schema")

	// Connect the service pool with search_path pointed at the new schema.
	pool, err := pgxpool.New(ctx, dsnForSchema(cfg, schemaName))
	require.NoError(t, err, "connect test pool")
	require.NoError(t, pool.Ping(ctx), "ping test pool")

	db := &TestDB{
		Database:   NewWithPool(pool, telemetry.New(cfg, "database")),
		schemaName: schemaName,
		cfg:        cfg,
	}

	t.Cleanup(func() {
		db.Close()
		dropSchema(t, cfg, schemaName)
	})

	return db
}

// migrate runs migrations against the test schema.
func (db *TestDB) migrate(t *testing.T) {
	t.Helper()
	cfg := *db.cfg
	cfg.LogLevel = "error" // keep migration logs out of test output
	m, err := NewMigrator(&cfg, db.schemaName, telemetry.New(&cfg, "migrate"))
	require.NoError(t, err, "create migrator")
	require.NoError(t, m.Migrate(), "run migrations")
}

// SchemaName exposes the unique schema name for direct SQL in tests.
func (db *TestDB) SchemaName() string {
	return db.schemaName
}

// dropSchema removes a test schema and everything in it.
func dropSchema(t *testing.T, cfg *config.Config, schema string) {
	t.Helper()
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	admin, err := pgxpool.New(ctx, dsnForSchema(cfg, "public"))
	if err != nil {
		t.Logf("WARNING: failed connecting to drop schema %s: %v", schema, err)
		return
	}
	defer admin.Close()

	if _, err := admin.Exec(ctx, fmt.Sprintf("DROP SCHEMA IF EXISTS %s CASCADE", schema)); err != nil {
		t.Logf("WARNING: failed dropping test schema %s: %v", schema, err)
	}
}
