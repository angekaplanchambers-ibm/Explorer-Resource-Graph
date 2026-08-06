// Copyright IBM Corp. 2026

// Package http implements the HTTP API for the Terraform Graph Catalog: ingest
// endpoints (state parser + Atlas), grant creation, and the grant-scoped query
// surface. It mirrors the Janus HTTP server shape (stdlib ServeMux with method
// patterns, buffered JSON responses), minus the DataDog tracing wrapper which is
// deferred for the PoC.
package http

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"terraform-graph-catalog/internal/config"
	"terraform-graph-catalog/internal/database"
	"terraform-graph-catalog/internal/devui"
	"terraform-graph-catalog/internal/redisstore"
	"terraform-graph-catalog/internal/telemetry"

	"github.com/hashicorp/go-hclog"
)

// Server is the HTTP API server with its dependencies.
type Server struct {
	cfg    *config.Config
	db     *database.Database
	redis  *redisstore.Store
	t      telemetry.Telemetry
	server *http.Server
}

// NewServer constructs a Server and registers its routes.
func NewServer(cfg *config.Config, db *database.Database, redis *redisstore.Store, t telemetry.Telemetry) *Server {
	mux := http.NewServeMux()

	s := &Server{
		cfg:   cfg,
		db:    db,
		redis: redis,
		t:     t,
		server: &http.Server{
			Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				logRequest(r, t.Logger)
				mux.ServeHTTP(w, r)
			}),
			ReadHeaderTimeout: 10 * time.Second,
			ReadTimeout:       60 * time.Second,
			WriteTimeout:      120 * time.Second,
		},
	}

	s.registerRoutes(mux)
	return s
}

// registerRoutes wires every route. Query routes carry the grant_id in the path;
// ingest and grant-creation routes are protected by shared secrets.
func (s *Server) registerRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /healthz", s.handleHealth)

	// Ingest (shared-secret authenticated).
	mux.HandleFunc("POST /ingest/state-version", s.handleIngestStateVersion)
	mux.HandleFunc("POST /ingest/plan", s.handleIngestPlan)
	mux.HandleFunc("PATCH /ingest/workspaces/{workspace_id}/provider-versions", s.handleIngestProviderVersions)

	// Grant creation (service-secret authenticated).
	mux.HandleFunc("POST /api/v1/grants", s.handleCreateGrant)

	// Query surface (authorized by a valid grant_id in the path).
	mux.HandleFunc("GET /api/v1/grants/{grant_id}/resources", s.handleResources)
	mux.HandleFunc("GET /api/v1/grants/{grant_id}/resources/{address}/dependents", s.handleDependents)
	mux.HandleFunc("GET /api/v1/grants/{grant_id}/providers", s.handleProviders)
	mux.HandleFunc("GET /api/v1/grants/{grant_id}/workspaces/{id}/blast-radius", s.handleBlastRadius)

	// Development-only, unauthenticated routes.
	if s.cfg.DevUIEnabled {
		mux.HandleFunc("POST /dev/grants/all", s.handleDevGrantAll)
		mux.HandleFunc("GET /dev/graph", s.handleDevGraph)
		mux.HandleFunc("GET /dev/graph/workspace/{id}", s.handleDevWorkspaceGraph)
		mux.HandleFunc("POST /dev/chat", s.handleChat)
		// Single-page app served from the embedded asset FS. More specific
		// patterns above take precedence over this subtree handler.
		mux.Handle("GET /dev/", http.StripPrefix("/dev/", http.FileServerFS(devui.FS())))
		s.t.Logger.Warn("Development UI routes enabled - never enable this in production")
	}
}

// Run starts the HTTP server and a background health-check loop.
func (s *Server) Run(address string) error {
	s.server.Addr = address

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	go s.runHealthChecks(ctx, 30*time.Second)
	go s.runGrantCleanup(ctx, 15*time.Minute)

	s.t.Logger.Info("Starting HTTP server", "address", address)
	return s.server.ListenAndServe()
}

// Shutdown gracefully stops the HTTP server.
func (s *Server) Shutdown(ctx context.Context) error {
	s.t.Logger.Info("Shutting down HTTP server")
	return s.server.Shutdown(ctx)
}

// runHealthChecks periodically pings dependencies and logs degraded state.
func (s *Server) runHealthChecks(ctx context.Context, interval time.Duration) {
	ticker := time.NewTicker(interval)
	defer ticker.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			c, cancel := context.WithTimeout(ctx, 5*time.Second)
			if err := s.db.Ping(c); err != nil {
				s.t.Logger.Warn("Database health check failed", "error", err)
			}
			if err := s.redis.Ping(c); err != nil {
				s.t.Logger.Warn("Redis health check failed", "error", err)
			}
			cancel()
		}
	}
}

// respondJSON writes a JSON response with HTML escaping disabled so that the
// "<sensitive>" sentinel stays human-readable.
func (s *Server) respondJSON(w http.ResponseWriter, code int, payload any) {
	var buf bytes.Buffer
	enc := json.NewEncoder(&buf)
	enc.SetEscapeHTML(false)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("X-Content-Type-Options", "nosniff")

	if err := enc.Encode(payload); err != nil {
		s.t.Logger.Error("Failed encoding JSON response", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
		_, _ = w.Write([]byte(fmt.Sprintf(`{"error":%q}`+"\n", http.StatusText(http.StatusInternalServerError))))
		return
	}

	w.WriteHeader(code)
	if _, err := w.Write(buf.Bytes()); err != nil {
		s.t.Logger.Error("Failed writing response", "error", err)
	}
}

// respondError writes a JSON error body with the given status code.
func (s *Server) respondError(w http.ResponseWriter, code int, message string) {
	s.respondJSON(w, code, map[string]string{"error": message})
}

// runGrantCleanup periodically deletes expired grant rows from Postgres.
func (s *Server) runGrantCleanup(ctx context.Context, interval time.Duration) {
	ticker := time.NewTicker(interval)
	defer ticker.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			c, cancel := context.WithTimeout(ctx, 10*time.Second)
			n, err := s.db.DeleteExpiredGrants(c)
			cancel()
			if err != nil {
				s.t.Logger.Warn("Grant cleanup failed", "error", err)
			} else if n > 0 {
				s.t.Logger.Info("Cleaned up expired grants", "count", n)
			}
		}
	}
}

func logRequest(r *http.Request, log hclog.Logger) {
	log.Debug("Handling request", "method", r.Method, "path", r.URL.Path)
}

// decodeJSON reads and decodes a JSON request body, rejecting unknown fields.
func decodeJSON(r *http.Request, dst any) error {
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()
	if err := dec.Decode(dst); err != nil {
		return err
	}
	return nil
}

// bearerToken extracts a bearer token from the Authorization header.
func bearerToken(r *http.Request) string {
	h := r.Header.Get("Authorization")
	if !strings.HasPrefix(h, "Bearer ") {
		return ""
	}
	return strings.TrimSpace(strings.TrimPrefix(h, "Bearer "))
}
