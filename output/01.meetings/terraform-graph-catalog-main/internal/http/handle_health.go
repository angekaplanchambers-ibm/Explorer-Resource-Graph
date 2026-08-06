// Copyright IBM Corp. 2026

package http

import (
	"context"
	"net/http"
	"time"
)

// handleHealth reports service liveness by pinging Postgres and Redis.
func (s *Server) handleHealth(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	if err := s.db.Ping(ctx); err != nil {
		s.respondError(w, http.StatusServiceUnavailable, "database unavailable")
		return
	}
	if err := s.redis.Ping(ctx); err != nil {
		s.respondError(w, http.StatusServiceUnavailable, "redis unavailable")
		return
	}

	s.respondJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}
