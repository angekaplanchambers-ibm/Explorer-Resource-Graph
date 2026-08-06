// Copyright IBM Corp. 2026

package http

import (
	"net/http"

	"terraform-graph-catalog/internal/database"
)

// handleResources serves grant-scoped resource instances with optional
// workspace_id / resource_type / org_id / project_id / attribute filters and
// keyset pagination.
func (s *Server) handleResources(w http.ResponseWriter, r *http.Request) {
	grantID, ok := s.authorizeGrant(w, r)
	if !ok {
		return
	}

	q := r.URL.Query()
	cursor, err := decodeResourceCursor(q.Get("cursor"))
	if err != nil {
		s.respondError(w, http.StatusBadRequest, err.Error())
		return
	}

	results, next, total, err := s.db.QueryResources(r.Context(), database.ResourceQuery{
		GrantID:      grantID,
		WorkspaceID:  q.Get("workspace_id"),
		ResourceType: q.Get("resource_type"),
		OrgID:        q.Get("org_id"),
		ProjectID:    q.Get("project_id"),
		AttrFilters:  attrFilters(q),
		Cursor:       cursor,
		PageSize:     parsePageSize(q),
	})
	if err != nil {
		s.t.Logger.Error("Failed querying resources", "error", err)
		s.respondError(w, http.StatusInternalServerError, "failed querying resources")
		return
	}
	if results == nil {
		results = []database.ResourceResult{}
	}

	s.respondJSON(w, http.StatusOK, collectionResponse{
		Data:       results,
		NextCursor: encodeResourceCursor(next),
		Count:      total,
	})
}

// handleDependents serves all resource instances that depend on the given
// address, annotated with the dependency reason.
func (s *Server) handleDependents(w http.ResponseWriter, r *http.Request) {
	grantID, ok := s.authorizeGrant(w, r)
	if !ok {
		return
	}

	address := r.PathValue("address")
	if address == "" {
		s.respondError(w, http.StatusBadRequest, "address is required")
		return
	}

	q := r.URL.Query()
	cursor, err := decodeResourceCursor(q.Get("cursor"))
	if err != nil {
		s.respondError(w, http.StatusBadRequest, err.Error())
		return
	}

	results, next, total, err := s.db.GetDependents(r.Context(), grantID, address, cursor, parsePageSize(q))
	if err != nil {
		s.t.Logger.Error("Failed querying dependents", "address", address, "error", err)
		s.respondError(w, http.StatusInternalServerError, "failed querying dependents")
		return
	}
	if results == nil {
		results = []database.ResourceResult{}
	}

	s.respondJSON(w, http.StatusOK, collectionResponse{
		Data:       results,
		NextCursor: encodeResourceCursor(next),
		Count:      total,
	})
}
