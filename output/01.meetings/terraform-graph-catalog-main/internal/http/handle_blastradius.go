// Copyright IBM Corp. 2026

package http

import (
	"net/http"

	"terraform-graph-catalog/internal/database"
)

// handleBlastRadius serves all resource instances in workspaces that directly or
// transitively consume outputs from the given workspace, annotated with hop
// distance. Scoped to the grant.
func (s *Server) handleBlastRadius(w http.ResponseWriter, r *http.Request) {
	grantID, ok := s.authorizeGrant(w, r)
	if !ok {
		return
	}

	workspaceID := r.PathValue("id")
	if workspaceID == "" {
		s.respondError(w, http.StatusBadRequest, "workspace id is required")
		return
	}

	q := r.URL.Query()
	cursor, err := decodeResourceCursor(q.Get("cursor"))
	if err != nil {
		s.respondError(w, http.StatusBadRequest, err.Error())
		return
	}

	results, next, total, err := s.db.BlastRadius(r.Context(), grantID, workspaceID, cursor, parsePageSize(q))
	if err != nil {
		s.t.Logger.Error("Failed querying blast radius", "workspace_id", workspaceID, "error", err)
		s.respondError(w, http.StatusInternalServerError, "failed querying blast radius")
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
