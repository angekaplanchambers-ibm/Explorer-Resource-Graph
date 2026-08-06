// Copyright IBM Corp. 2026

package database

import (
	"embed"
	"errors"
	"fmt"
	"os"
	"strings"

	"terraform-graph-catalog/internal/config"
	"terraform-graph-catalog/internal/telemetry"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/pgx/v5"
	"github.com/golang-migrate/migrate/v4/source"
	"github.com/golang-migrate/migrate/v4/source/iofs"
	"github.com/hashicorp/go-hclog"
)

//go:embed migrations/*
var migrationFS embed.FS

// Migrator is a database migration manager built on golang-migrate.
type Migrator struct {
	migrate *migrate.Migrate
	driver  source.Driver
	t       telemetry.Telemetry
}

// NewMigrator creates a new migrator.
func NewMigrator(cfg *config.Config, schema string, t telemetry.Telemetry) (*Migrator, error) {
	src, err := iofs.New(migrationFS, "migrations")
	if err != nil {
		return nil, fmt.Errorf("failed getting migration sources: %w", err)
	}

	dsn := migratorDSN(cfg, schema)

	m, err := migrate.NewWithSourceInstance("embedded", src, dsn)
	if err != nil {
		return nil, fmt.Errorf("failed connecting to database: %w", err)
	}
	m.Log = &migrateLogger{log: t.Logger}

	return &Migrator{migrate: m, driver: src, t: t}, nil
}

// migratorDSN builds a Postgres DSN using the pgx5:// scheme required by the
// golang-migrate pgx/v5 driver.
func migratorDSN(cfg *config.Config, schema string) string {
	return fmt.Sprintf("pgx5://%s:%s@%s/%s?search_path=%s",
		cfg.PostgresUser, cfg.PostgresPass, cfg.PostgresAddr, cfg.PostgresDB, schema)
}

// Migrate applies any unrun migrations to the database schema.
func (m *Migrator) Migrate() error {
	m.t.Logger.Info("Running migrations")
	if err := m.migrate.Up(); err != nil {
		if errors.Is(err, migrate.ErrNoChange) {
			m.t.Logger.Info("All migrations already applied")
			return nil
		}
		return fmt.Errorf("failed running migrations: %w", err)
	}

	m.t.Logger.Info("Successfully applied all migrations")
	return nil
}

// MigrateTo migrates the database to a specific version.
func (m *Migrator) MigrateTo(version uint) error {
	m.t.Logger.Info("Migrating to specific version", "schema_version", version)
	if err := m.migrate.Migrate(version); err != nil {
		if errors.Is(err, migrate.ErrNoChange) {
			m.t.Logger.Info("Already at version", "schema_version", version)
			return nil
		}
		return fmt.Errorf("failed migrating to version %d: %w", version, err)
	}

	m.t.Logger.Info("Successfully migrated to version", "schema_version", version)
	return nil
}

// Status collects information about the current state of known migrations.
func (m *Migrator) Status() ([]*Migration, error) {
	ms := make([]*Migration, 0)

	currentVersion, _, err := m.migrate.Version()
	if err != nil {
		if !errors.Is(err, migrate.ErrNilVersion) {
			return nil, fmt.Errorf("failed getting current version: %w", err)
		}
	}

	for v, err := m.driver.First(); ; v, err = m.driver.Next(v) {
		if err != nil {
			if errors.Is(err, os.ErrNotExist) {
				return ms, nil
			}
			return nil, fmt.Errorf("failed reading migration %d: %w", v, err)
		}

		r, name, err := m.driver.ReadUp(v)
		if err != nil {
			return nil, fmt.Errorf("failed reading up migration %d: %w", v, err)
		}
		r.Close()

		status := "down"
		if currentVersion >= v {
			status = "up"
		}

		ms = append(ms, &Migration{Version: v, Name: name, Status: status})
	}
}

// Migration represents an individual migration and its status (up/down).
type Migration struct {
	Version uint
	Name    string
	Status  string
}

// migrateLogger adapts golang-migrate's Logger interface to hclog.
type migrateLogger struct {
	log hclog.Logger
}

func (l *migrateLogger) Printf(format string, v ...interface{}) {
	l.log.Info(strings.TrimSpace(fmt.Sprintf(format, v...)))
}

func (l *migrateLogger) Verbose() bool {
	return false
}
