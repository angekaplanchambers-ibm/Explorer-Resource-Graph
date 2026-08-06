// Copyright IBM Corp. 2026

package http

import (
	"net/http"
	"time"
)

// grantRequest is the POST /api/v1/grants body.
type grantRequest struct {
	WorkspaceIDs []string `json:"workspace_ids"`
	TTLSeconds   int      `json:"ttl_seconds"`
}

// grantResponse is returned by both grant-creation endpoints.
type grantResponse struct {
	GrantID   string    `json:"grant_id"`
	ExpiresAt time.Time `json:"expires_at"`
}

// handleCreateGrant creates a query grant over a set of workspace IDs. Atlas
// calls this (authenticated with the service secret) after evaluating the
// caller's workspace permissions.
func (s *Server) handleCreateGrant(w http.ResponseWriter, r *http.Request) {
	if !s.requireSecret(w, r, s.cfg.ServiceSecret) {
		return
	}

	var req grantRequest
	if err := decodeJSON(r, &req); err != nil {
		s.respondError(w, http.StatusBadRequest, "invalid request body: "+err.Error())
		return
	}

	s.createGrant(w, r, req.WorkspaceIDs, req.TTLSeconds)
}

// handleDevGrantAll creates a grant covering every workspace currently in the
// catalog. Development-only and unauthenticated; registered only when the dev UI
// is enabled.
func (s *Server) handleDevGrantAll(w http.ResponseWriter, r *http.Request) {
	ids, err := s.db.AllWorkspaceIDs(r.Context())
	if err != nil {
		s.t.Logger.Error("Failed listing workspace IDs", "error", err)
		s.respondError(w, http.StatusInternalServerError, "failed listing workspaces")
		return
	}
	s.createGrant(w, r, ids, 0)
}

// createGrant clamps the TTL, persists the grant and its workspace set in
// Postgres, records the validity key in Redis, and responds. If the Redis write
// fails after Postgres commits, the Postgres rows are deleted so no orphaned
// grant survives that can never be validated.
func (s *Server) createGrant(w http.ResponseWriter, r *http.Request, workspaceIDs []string, ttlSeconds int) {
	ttl := s.resolveTTL(ttlSeconds)

	grant, err := s.db.CreateGrant(r.Context(), workspaceIDs, ttl)
	if err != nil {
		s.t.Logger.Error("Failed creating grant", "error", err)
		s.respondError(w, http.StatusInternalServerError, "failed creating grant")
		return
	}

	if err := s.redis.SetGrant(r.Context(), grant.GrantID, ttl); err != nil {
		s.t.Logger.Error("Failed recording grant validity, rolling back Postgres row",
			"grant_id", grant.GrantID, "error", err)
		if derr := s.db.DeleteGrant(r.Context(), grant.GrantID); derr != nil {
			s.t.Logger.Error("Failed removing orphaned grant row",
				"grant_id", grant.GrantID, "error", derr)
		}
		s.respondError(w, http.StatusInternalServerError, "failed recording grant")
		return
	}

	s.respondJSON(w, http.StatusOK, grantResponse{GrantID: grant.GrantID, ExpiresAt: grant.ExpiresAt})
}

// resolveTTL applies the configured default and maximum grant lifetimes.
func (s *Server) resolveTTL(ttlSeconds int) time.Duration {
	if ttlSeconds <= 0 {
		ttlSeconds = s.cfg.GrantDefaultTTLSeconds
	}
	if ttlSeconds > s.cfg.GrantMaxTTLSeconds {
		ttlSeconds = s.cfg.GrantMaxTTLSeconds
	}
	return time.Duration(ttlSeconds) * time.Second
}
