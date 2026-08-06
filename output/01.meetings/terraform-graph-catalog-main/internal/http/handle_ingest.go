// Copyright IBM Corp. 2026

package http

import (
	"encoding/json"
	"net/http"

	"terraform-graph-catalog/internal/database"
)

// maxIngestBodyBytes caps the size of ingest request bodies to prevent a
// misconfigured or malicious caller from allocating unbounded memory.
const maxIngestBodyBytes = 32 << 20 // 32 MB

// handleIngestStateVersion receives a sanitized state version from the state
// parser (authenticated with the ingest secret) and replaces the workspace's
// resource instances and outputs.
func (s *Server) handleIngestStateVersion(w http.ResponseWriter, r *http.Request) {
	if !s.requireSecret(w, r, s.cfg.IngestSecret) {
		return
	}
	r.Body = http.MaxBytesReader(w, r.Body, maxIngestBodyBytes)

	var in database.StateVersionIngest
	if err := decodeJSON(r, &in); err != nil {
		s.respondError(w, http.StatusBadRequest, "invalid request body: "+err.Error())
		return
	}
	if in.WorkspaceID == "" || in.OrgID == "" || in.StateVersionID == "" {
		s.respondError(w, http.StatusBadRequest, "workspace_id, org_id, and state_version_id are required")
		return
	}

	ingested, err := s.db.IngestStateVersion(r.Context(), in)
	if err != nil {
		s.t.Logger.Error("Failed ingesting state version", "workspace_id", in.WorkspaceID, "error", err)
		s.respondError(w, http.StatusInternalServerError, "failed ingesting state version")
		return
	}

	s.respondJSON(w, http.StatusOK, map[string]any{"ingested": ingested})
}

// handleIngestPlan receives plan-derived configuration from Atlas (authenticated
// with the service secret), redacts sensitive provider-configuration expressions,
// and replaces the workspace's resource configs, providers, and edges.
func (s *Server) handleIngestPlan(w http.ResponseWriter, r *http.Request) {
	if !s.requireSecret(w, r, s.cfg.ServiceSecret) {
		return
	}
	r.Body = http.MaxBytesReader(w, r.Body, maxIngestBodyBytes)

	var in database.PlanIngest
	if err := decodeJSON(r, &in); err != nil {
		s.respondError(w, http.StatusBadRequest, "invalid request body: "+err.Error())
		return
	}
	if in.WorkspaceID == "" || in.OrgID == "" || in.StateVersionID == "" {
		s.respondError(w, http.StatusBadRequest, "workspace_id, org_id, and state_version_id are required")
		return
	}

	// Redact sensitive expression objects in provider configurations before they
	// reach the database. Resource expressions are reference paths (not sensitive
	// values) and are stored as-is.
	for i := range in.Providers {
		in.Providers[i].Configuration = redactSensitive(in.Providers[i].Configuration)
	}

	ingested, err := s.db.IngestPlan(r.Context(), in)
	if err != nil {
		s.t.Logger.Error("Failed ingesting plan", "workspace_id", in.WorkspaceID, "error", err)
		s.respondError(w, http.StatusInternalServerError, "failed ingesting plan")
		return
	}

	s.respondJSON(w, http.StatusOK, map[string]any{"ingested": ingested})
}

// handleIngestProviderVersions receives resolved lock-file provider versions
// from Atlas (authenticated with the service secret) and patches version_exact
// on matching workspace_providers rows. Rows that do not yet exist (e.g. plan
// ingest has not run yet) are silently skipped.
func (s *Server) handleIngestProviderVersions(w http.ResponseWriter, r *http.Request) {
	if !s.requireSecret(w, r, s.cfg.ServiceSecret) {
		return
	}
	r.Body = http.MaxBytesReader(w, r.Body, maxIngestBodyBytes)

	workspaceID := r.PathValue("workspace_id")
	if workspaceID == "" {
		s.respondError(w, http.StatusBadRequest, "workspace_id is required")
		return
	}

	var in database.ProviderVersionsIngest
	if err := decodeJSON(r, &in); err != nil {
		s.respondError(w, http.StatusBadRequest, "invalid request body: "+err.Error())
		return
	}

	if err := s.db.UpdateProviderVersions(r.Context(), workspaceID, in.Providers); err != nil {
		s.t.Logger.Error("Failed updating provider versions", "workspace_id", workspaceID, "error", err)
		s.respondError(w, http.StatusInternalServerError, "failed updating provider versions")
		return
	}

	s.respondJSON(w, http.StatusOK, map[string]any{"updated": len(in.Providers)})
}

// redactSensitive walks a plan-JSON value and replaces any object carrying
// "sensitive": true with the "<sensitive>" sentinel string, recursively. Keys are
// otherwise preserved. Invalid JSON is returned unchanged.
func redactSensitive(raw json.RawMessage) json.RawMessage {
	if len(raw) == 0 {
		return raw
	}
	var v any
	if err := json.Unmarshal(raw, &v); err != nil {
		return raw
	}
	out, err := json.Marshal(redactValue(v))
	if err != nil {
		return raw
	}
	return out
}

// redactValue recursively redacts sensitive objects within a decoded JSON value.
func redactValue(v any) any {
	switch t := v.(type) {
	case map[string]any:
		if sensitive, ok := t["sensitive"].(bool); ok && sensitive {
			return "<sensitive>"
		}
		for k, val := range t {
			t[k] = redactValue(val)
		}
		return t
	case []any:
		for i, val := range t {
			t[i] = redactValue(val)
		}
		return t
	default:
		return v
	}
}
