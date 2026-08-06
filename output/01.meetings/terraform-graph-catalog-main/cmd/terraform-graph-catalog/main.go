// Copyright IBM Corp. 2026

// terraform-graph-catalog is a standalone service providing a queryable index of
// Terraform-managed resources, configuration, and provider metadata across HCP
// Terraform workspaces, optimized for cross-workspace queries, dependency
// traversal, and LLM agent use cases.
package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	"terraform-graph-catalog/internal/config"
	"terraform-graph-catalog/internal/database"
	"terraform-graph-catalog/internal/http"
	"terraform-graph-catalog/internal/redisstore"
	"terraform-graph-catalog/internal/telemetry"
	"terraform-graph-catalog/internal/version"
)

func main() {
	var migrationStatus, showVersion bool
	var migrateTo uint

	fs := flag.NewFlagSet("terraform-graph-catalog", flag.ExitOnError)
	fs.BoolVar(&migrationStatus, "migrate-status", false, "Show migration status")
	fs.UintVar(&migrateTo, "migrate-to", 0, "Migrate to a specific version")
	fs.BoolVar(&showVersion, "version", false, "Show app version")
	_ = fs.Parse(os.Args[1:])

	if showVersion {
		fmt.Fprintln(os.Stdout, "terraform-graph-catalog "+version.GitCommit)
		os.Exit(0)
	}

	cfg := config.NewConfigFromEnv()

	t := telemetry.New(cfg, "graph-catalog")
	defer t.Stop()

	m, err := database.NewMigrator(cfg, cfg.PostgresSchema, t.Named("migrate"))
	if err != nil {
		t.Logger.Error("Error creating migrator", "error", err)
		os.Exit(1)
	}

	// Migration-specific flag handling.
	switch {
	case migrationStatus:
		ms, err := m.Status()
		if err != nil {
			t.Logger.Error("Failed getting migration status", "error", err)
			os.Exit(1)
		}
		for _, mig := range ms {
			fmt.Fprintf(os.Stdout, "%15d %5s %s\n", mig.Version, mig.Status, mig.Name)
		}
		os.Exit(0)

	case migrateTo > 0:
		if err := m.MigrateTo(migrateTo); err != nil {
			t.Logger.Error("Failed migrating to version", "version", migrateTo, "error", err)
			os.Exit(1)
		}
		os.Exit(0)

	default:
		if len(os.Args) != 1 {
			fmt.Println("Usage:")
			fs.PrintDefaults()
			os.Exit(1)
		}
	}

	t.Logger.Info("Starting terraform-graph-catalog...")

	// database.New runs outstanding migrations on startup.
	db, err := database.New(cfg, t.Named("database"))
	if err != nil {
		t.Logger.Error("Failed to initialize database", "error", err)
		os.Exit(1)
	}
	defer db.Close()

	redis, err := redisstore.New(cfg)
	if err != nil {
		t.Logger.Error("Failed to initialize redis", "error", err)
		os.Exit(1)
	}
	defer func() { _ = redis.Close() }()

	httpServer := http.NewServer(cfg, db, redis, t.Named("http"))

	errCh := make(chan error, 1)
	go func() {
		if err := httpServer.Run(cfg.HTTPListenAddr); err != nil {
			errCh <- err
		}
	}()

	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)

	select {
	case err := <-errCh:
		t.Logger.Error("Server error", "error", err)
	case sig := <-sigCh:
		t.Logger.Info("Received signal, shutting down", "signal", sig)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := httpServer.Shutdown(ctx); err != nil {
		t.Logger.Error("HTTP server shutdown error", "error", err)
	}

	t.Logger.Info("Shutdown complete")
	os.Exit(0)
}
