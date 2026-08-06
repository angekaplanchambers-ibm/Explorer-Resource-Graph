// Copyright IBM Corp. 2026

package database

import (
	"encoding/json"
	"time"
)

// --- Ingest input types ---

// ResourceInstanceInput is one resource instance delivered by the state parser.
// Attributes is expected to be pre-sanitized (sensitive values already replaced
// with the "<sensitive>" sentinel; keys preserved; nil on sanitization failure).
type ResourceInstanceInput struct {
	Address      string          `json:"address"`
	ResourceType string          `json:"resource_type"`
	ResourceName string          `json:"resource_name"`
	Module       string          `json:"module"`
	Provider     string          `json:"provider"`
	Mode         string          `json:"mode"`
	InstanceKey  string          `json:"instance_key"`
	Attributes   json.RawMessage `json:"attributes"`
	Dependencies []string        `json:"dependencies"`
}

// StateOutputInput is one root output delivered by the state parser. Value is
// nil when Sensitive is true (whole-value sensitivity; no path-level map).
type StateOutputInput struct {
	Name         string          `json:"name"`
	Value        json.RawMessage `json:"value"`
	Sensitive    bool            `json:"sensitive"`
	DetailedType json.RawMessage `json:"detailed_type"`
}

// StateVersionIngest is the full payload for POST /ingest/state-version.
type StateVersionIngest struct {
	WorkspaceID    string                  `json:"workspace_id"`
	OrgID          string                  `json:"org_id"`
	ProjectID      *string                 `json:"project_id"`
	StateVersionID string                  `json:"state_version_id"`
	Serial         int64                   `json:"serial"`
	Resources      []ResourceInstanceInput `json:"resources"`
	Outputs        []StateOutputInput      `json:"outputs"`
}

// ResourceConfigInput is one resource's configuration from plan JSON
// (resource-level, shared across instances). Expressions is the raw plan JSON
// expression map (reference paths, not sensitive values).
type ResourceConfigInput struct {
	ResourceAddress string          `json:"resource_address"`
	ResourceType    string          `json:"resource_type"`
	Provider        string          `json:"provider"`
	ConfigDependsOn []string        `json:"config_depends_on"`
	Expressions     json.RawMessage `json:"expressions"`
}

// ProviderConfigInput is one provider configuration from plan JSON. Configuration
// is expected to be redacted by the ingest handler before reaching the database
// (expression objects marked "sensitive": true replaced with "<sensitive>").
type ProviderConfigInput struct {
	ProviderSource    string          `json:"provider_source"`
	Alias             string          `json:"alias"`
	VersionConstraint *string         `json:"version_constraint"`
	VersionExact      *string         `json:"version_exact"`
	Configuration     json.RawMessage `json:"configuration"`
}

// WorkspaceEdgeInput is one resolved cross-workspace dependency edge. The
// consumer is the ingesting workspace; producer is a workspace it reads outputs
// from via terraform_remote_state.
type WorkspaceEdgeInput struct {
	ProducerWorkspaceID string `json:"producer_workspace_id"`
}

// PlanIngest is the full payload for POST /ingest/plan.
type PlanIngest struct {
	WorkspaceID    string                `json:"workspace_id"`
	OrgID          string                `json:"org_id"`
	ProjectID      *string               `json:"project_id"`
	StateVersionID string                `json:"state_version_id"`
	Resources      []ResourceConfigInput `json:"resources"`
	Providers      []ProviderConfigInput `json:"providers"`
	WorkspaceEdges []WorkspaceEdgeInput  `json:"workspace_edges"`
}

// --- Query result types (also serialized directly in API responses) ---

// ResourceResult is one resource instance in a query response. DependencyReason
// and HopDistance are only populated by the dependents and blast-radius
// endpoints respectively.
type ResourceResult struct {
	WorkspaceID  string          `json:"workspace_id"`
	OrgID        string          `json:"org_id"`
	ProjectID    *string         `json:"project_id"`
	Address      string          `json:"address"`
	ResourceType string          `json:"resource_type"`
	ResourceName string          `json:"resource_name"`
	Module       string          `json:"module"`
	Provider     string          `json:"provider"`
	Mode         string          `json:"mode"`
	InstanceKey  string          `json:"instance_key"`
	Attributes   json.RawMessage `json:"attributes"`
	Dependencies []string        `json:"dependencies"`
	IndexedAt    time.Time       `json:"indexed_at"`
	UpdatedAt    time.Time       `json:"updated_at"`

	DependencyReason *string `json:"dependency_reason,omitempty"`
	HopDistance      *int    `json:"hop_distance,omitempty"`
}

// ProviderResult is one provider configuration in a query response.
type ProviderResult struct {
	WorkspaceID       string          `json:"workspace_id"`
	OrgID             string          `json:"org_id"`
	ProjectID         *string         `json:"project_id"`
	ProviderSource    string          `json:"provider_source"`
	Alias             string          `json:"alias"`
	VersionConstraint *string         `json:"version_constraint"`
	VersionExact      *string         `json:"version_exact"`
	Configuration     json.RawMessage `json:"configuration"`
}

// --- Query parameter types ---

// ResourceCursor is the keyset position for resource/dependent pagination,
// sorting on (workspace_id, address, instance_key) ASC.
type ResourceCursor struct {
	WorkspaceID string
	Address     string
	InstanceKey string
	Set         bool
}

// ProviderCursor is the keyset position for provider pagination, sorting on
// (workspace_id, provider_source, alias) ASC.
type ProviderCursor struct {
	WorkspaceID    string
	ProviderSource string
	Alias          string
	Set            bool
}

// ResourceQuery carries filters for the resources endpoint.
type ResourceQuery struct {
	GrantID      string
	WorkspaceID  string
	ResourceType string
	OrgID        string
	ProjectID    string
	AttrFilters  map[string]string
	Cursor       ResourceCursor
	PageSize     int
}

// ProviderQuery carries filters for the providers endpoint.
type ProviderQuery struct {
	GrantID           string
	ProviderSource    string
	VersionConstraint string
	VersionExact      string
	Cursor            ProviderCursor
	PageSize          int
}

// ProviderVersionUpdate carries the resolved lock-file version for a single
// provider, as reported by the runtime-report pipeline after an apply.
// ProviderSource is the fully-qualified source address
// (e.g. "registry.terraform.io/hashicorp/random"). Version is the exact locked
// version string from .terraform.lock.hcl.
type ProviderVersionUpdate struct {
	ProviderSource string `json:"source"`
	Version        string `json:"version"`
}

// ProviderVersionsIngest is the full payload for
// PATCH /ingest/workspaces/{workspace_id}/provider-versions.
type ProviderVersionsIngest struct {
	Providers []ProviderVersionUpdate `json:"providers"`
}

// WorkspaceSummary is a lightweight workspace record returned by the
// list_workspaces chat tool. Carries enough context for the model to identify
// and select workspaces without the full provider list.
type WorkspaceSummary struct {
	WorkspaceID          string  `json:"workspace_id"`
	OrgID                string  `json:"org_id"`
	ProjectID            *string `json:"project_id"`
	ResourceCount        int     `json:"resource_count"`
	DownstreamWorkspaces int     `json:"downstream_workspaces"`
}
