// Copyright IBM Corp. 2026

package http

import (
	"net/http"

	"terraform-graph-catalog/internal/database"
)

// handleDevGraph serves the whole-catalog workspace graph (workspaces as nodes,
// cross-workspace edges) for the dev UI's workspace graph view. Dev-only and
// unauthenticated; registered only when the dev UI is enabled.
func (s *Server) handleDevGraph(w http.ResponseWriter, r *http.Request) {
	graph, err := s.db.WorkspaceGraph(r.Context())
	if err != nil {
		s.t.Logger.Error("Failed building workspace graph", "error", err)
		s.respondError(w, http.StatusInternalServerError, "failed building workspace graph")
		return
	}
	if graph.Nodes == nil {
		graph.Nodes = []database.WorkspaceGraphNode{}
	}
	if graph.Edges == nil {
		graph.Edges = []database.WorkspaceGraphEdge{}
	}
	s.respondJSON(w, http.StatusOK, graph)
}

// devWorkspaceResponse carries one workspace's full resource set; the UI builds
// the within-workspace dependency DAG from the dependencies arrays.
type devWorkspaceResponse struct {
	WorkspaceID string                    `json:"workspace_id"`
	Resources   []database.ResourceResult `json:"resources"`
}

// handleDevWorkspaceGraph serves every resource instance in a single workspace so
// the dev UI can render the within-workspace dependency DAG. Dev-only and
// unauthenticated.
func (s *Server) handleDevWorkspaceGraph(w http.ResponseWriter, r *http.Request) {
	workspaceID := r.PathValue("id")
	if workspaceID == "" {
		s.respondError(w, http.StatusBadRequest, "workspace id is required")
		return
	}

	resources, err := s.db.WorkspaceResources(r.Context(), workspaceID)
	if err != nil {
		s.t.Logger.Error("Failed listing workspace resources", "workspace_id", workspaceID, "error", err)
		s.respondError(w, http.StatusInternalServerError, "failed listing workspace resources")
		return
	}
	if resources == nil {
		resources = []database.ResourceResult{}
	}

	s.respondJSON(w, http.StatusOK, devWorkspaceResponse{
		WorkspaceID: workspaceID,
		Resources:   resources,
	})
}
