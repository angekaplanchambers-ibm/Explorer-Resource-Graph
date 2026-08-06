// Copyright IBM Corp. 2026

package http

import (
	"crypto/subtle"
	"net/http"
)

// requireSecret authenticates a request against a shared secret carried in the
// Authorization header as a bearer token. It writes a 401 and returns false on
// failure. The comparison is constant-time.
func (s *Server) requireSecret(w http.ResponseWriter, r *http.Request, expected string) bool {
	got := bearerToken(r)
	if got == "" {
		s.respondError(w, http.StatusUnauthorized, "authorization required")
		return false
	}
	if subtle.ConstantTimeCompare([]byte(got), []byte(expected)) != 1 {
		s.respondError(w, http.StatusUnauthorized, "authorization failed")
		return false
	}
	return true
}

// authorizeGrant resolves and validates the grant_id path parameter. A missing,
// malformed, or expired grant returns 404 (per the API contract) and false. On
// success it returns the grant ID. Validity is determined by the Redis key,
// which is the authoritative expiry signal; the Postgres workspace set persists
// for query-time joins but is not proof of validity on its own.
func (s *Server) authorizeGrant(w http.ResponseWriter, r *http.Request) (string, bool) {
	grantID := r.PathValue("grant_id")
	if grantID == "" {
		s.respondError(w, http.StatusNotFound, "grant not found")
		return "", false
	}

	valid, err := s.redis.GrantValid(r.Context(), grantID)
	if err != nil {
		s.t.Logger.Error("Failed checking grant validity", "error", err)
		s.respondError(w, http.StatusInternalServerError, "failed validating grant")
		return "", false
	}
	if !valid {
		s.respondError(w, http.StatusNotFound, "grant not found or expired")
		return "", false
	}

	return grantID, true
}
