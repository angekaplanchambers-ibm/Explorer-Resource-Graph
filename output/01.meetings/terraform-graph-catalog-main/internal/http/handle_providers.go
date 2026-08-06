// Copyright IBM Corp. 2026

package http

import (
	"net/http"

	"terraform-graph-catalog/internal/database"
)

// handleProviders serves grant-scoped provider configurations with optional
// provider_source / version_constraint / version_exact filters.
func (s *Server) handleProviders(w http.ResponseWriter, r *http.Request) {
	grantID, ok := s.authorizeGrant(w, r)
	if !ok {
		return
	}

	q := r.URL.Query()
	cursor, err := decodeProviderCursor(q.Get("cursor"))
	if err != nil {
		s.respondError(w, http.StatusBadRequest, err.Error())
		return
	}

	results, next, total, err := s.db.QueryProviders(r.Context(), database.ProviderQuery{
		GrantID:           grantID,
		ProviderSource:    q.Get("provider_source"),
		VersionConstraint: q.Get("version_constraint"),
		VersionExact:      q.Get("version_exact"),
		Cursor:            cursor,
		PageSize:          parsePageSize(q),
	})
	if err != nil {
		s.t.Logger.Error("Failed querying providers", "error", err)
		s.respondError(w, http.StatusInternalServerError, "failed querying providers")
		return
	}
	if results == nil {
		results = []database.ProviderResult{}
	}

	s.respondJSON(w, http.StatusOK, collectionResponse{
		Data:       results,
		NextCursor: encodeProviderCursor(next),
		Count:      total,
	})
}
