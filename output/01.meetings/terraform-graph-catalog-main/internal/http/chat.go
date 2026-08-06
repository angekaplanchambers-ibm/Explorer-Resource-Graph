// Copyright IBM Corp. 2026

package http

import (
	"bytes"
	"context"
	_ "embed"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"terraform-graph-catalog/internal/database"
)

// This file implements the LLM-facing side of the dev chat proxy: the tool
// schema advertised to the model, the dispatch from a tool call to a catalog
// query, and the thin OpenAI-compatible chat-completions client. All catalog
// access goes through the dev grant supplied by the browser, so the LLM can
// never see data outside that grant's workspace set.

const (
	// chatToolPageSize bounds how many rows a single tool call returns to the
	// model. The total match count is always reported separately, so counting
	// questions stay exact even when the row list is truncated.
	chatToolPageSize = 50

	// maxChatIterations bounds the tool-calling loop so a misbehaving model
	// cannot spin forever.
	maxChatIterations = 6

	// llmRequestTimeout bounds a single upstream chat-completions call.
	llmRequestTimeout = 90 * time.Second
)

// --- OpenAI-compatible wire types ---

// llmMessage is one chat message in either direction. Content is a pointer so it
// can be encoded as JSON null (assistant messages that only carry tool calls).
type llmMessage struct {
	Role       string        `json:"role"`
	Content    *string       `json:"content"`
	ToolCalls  []llmToolCall `json:"tool_calls,omitempty"`
	ToolCallID string        `json:"tool_call_id,omitempty"`
}

// llmToolCall is a function tool call requested by the model.
type llmToolCall struct {
	ID       string `json:"id"`
	Type     string `json:"type"`
	Function struct {
		Name      string `json:"name"`
		Arguments string `json:"arguments"`
	} `json:"function"`
}

// llmTool is a tool advertised to the model.
type llmTool struct {
	Type     string          `json:"type"`
	Function llmToolFunction `json:"function"`
}

type llmToolFunction struct {
	Name        string         `json:"name"`
	Description string         `json:"description"`
	Parameters  map[string]any `json:"parameters"`
}

// llmRequest is the chat-completions request body.
type llmRequest struct {
	Model      string       `json:"model"`
	Messages   []llmMessage `json:"messages"`
	Tools      []llmTool    `json:"tools"`
	ToolChoice string       `json:"tool_choice"`
}

// llmResponse is the (subset of the) chat-completions response we consume.
type llmResponse struct {
	Choices []struct {
		Message      llmMessage `json:"message"`
		FinishReason string     `json:"finish_reason"`
	} `json:"choices"`
	Error *struct {
		Message string `json:"message"`
	} `json:"error"`
}

// strPtr is a small helper for building *string content values.
func strPtr(s string) *string { return &s }

// chatSystemPromptText is the system prompt sent at the head of every chat. It
// lives in chat_system_prompt.md (embedded at build time) so the wording can be
// updated without touching code.
//
//go:embed chat_system_prompt.md
var chatSystemPromptText string

// chatTools returns the tool definitions advertised to the model.
func chatTools() []llmTool {
	strProp := func(desc string) map[string]any {
		return map[string]any{"type": "string", "description": desc}
	}
	intProp := func(desc string) map[string]any {
		return map[string]any{"type": "integer", "description": desc}
	}
	return []llmTool{
		// --- Data tools ---
		{
			Type: "function",
			Function: llmToolFunction{
				Name:        "list_workspaces",
				Description: "List workspaces accessible in this session. Always call this first when you need workspace IDs — never guess or invent them. Each row includes resource_count (workspace's own resources) and downstream_workspaces (# of workspaces that directly depend on it, i.e. its direct blast radius).",
				Parameters: map[string]any{
					"type": "object",
					"properties": map[string]any{
						"sort_by": map[string]any{
							"type":        "string",
							"description": "Sort order: \"resource_count\" (default, largest workspaces first) or \"blast_radius\" (most downstream dependents first). Use blast_radius when asked to find the workspace with the largest blast radius.",
							"enum":        []string{"resource_count", "blast_radius"},
						},
						"page_size": intProp("Max workspaces to return (default and max 50)."),
					},
				},
			},
		},
		{
			Type: "function",
			Function: llmToolFunction{
				Name:        "list_resources",
				Description: "List resource instances across all accessible workspaces, with optional filters. Use the returned count for exact totals. Pass workspace_id to scope to a single workspace (e.g. to answer \"what's provisioned in workspace X\").",
				Parameters: map[string]any{
					"type": "object",
					"properties": map[string]any{
						"workspace_id":  strProp("Restrict to one workspace id, e.g. ws-abc123."),
						"resource_type": strProp("Exact resource type, e.g. aws_instance."),
						"org_id":        strProp("Restrict to one organization id."),
						"project_id":    strProp("Restrict to one project id."),
						"attr_filters": map[string]any{
							"type":                 "object",
							"description":          "Exact whole-value match on literal attribute values, e.g. {\"instance_type\":\"m5.xlarge\"}. Matches only when the attribute equals the value exactly — NOT substrings, words inside a value, or semantic categories. To classify resources or find a word embedded in names/ids (e.g. which resources are insects), do NOT use this; list the rows and inspect their values instead.",
							"additionalProperties": map[string]any{"type": "string"},
						},
						"page_size": intProp("Max rows to return (default and max 50)."),
					},
				},
			},
		},
		{
			Type: "function",
			Function: llmToolFunction{
				Name:        "get_dependents",
				Description: "List resources that depend on a given resource address (without instance key), annotated with the dependency reason.",
				Parameters: map[string]any{
					"type": "object",
					"properties": map[string]any{
						"address":   strProp("Resource address without instance key, e.g. aws_vpc.main."),
						"page_size": intProp("Max rows to return (default and max 50)."),
					},
					"required": []string{"address"},
				},
			},
		},
		{
			Type: "function",
			Function: llmToolFunction{
				Name:        "get_blast_radius",
				Description: "List resources in workspaces that directly or transitively consume outputs from the given workspace via terraform_remote_state.",
				Parameters: map[string]any{
					"type": "object",
					"properties": map[string]any{
						"workspace_id": strProp("Source workspace id, e.g. ws-abc123."),
						"page_size":    intProp("Max rows to return (default and max 50)."),
					},
					"required": []string{"workspace_id"},
				},
			},
		},
		{
			Type: "function",
			Function: llmToolFunction{
				Name:        "list_providers",
				Description: "List provider configurations across accessible workspaces, with optional filters.",
				Parameters: map[string]any{
					"type": "object",
					"properties": map[string]any{
						"provider_source":    strProp("Exact provider source, e.g. registry.terraform.io/hashicorp/aws."),
						"version_constraint": strProp("Substring match on the version constraint string."),
						"version_exact":      strProp("Exact resolved provider version."),
						"page_size":          intProp("Max rows to return (default and max 50)."),
					},
				},
			},
		},

		// --- UI-action tools ---
		// These do not query the catalog; they instruct the browser to update its
		// graph display. The server records them in chatResponse.Actions and feeds
		// {"acknowledged":true} back to the model so the loop continues normally.
		{
			Type: "function",
			Function: llmToolFunction{
				Name:        "focus_workspace",
				Description: "Highlight a specific workspace in the graph and show its direct output-sharing connections. Switches the view to Workspaces if needed. Use this when the user asks to 'show', 'highlight', or 'find' a specific workspace, or when your answer references a workspace the user should look at.",
				Parameters: map[string]any{
					"type": "object",
					"properties": map[string]any{
						"workspace_id": strProp("The workspace id to focus, e.g. ws-abc123."),
					},
					"required": []string{"workspace_id"},
				},
			},
		},
		{
			Type: "function",
			Function: llmToolFunction{
				Name:        "show_blast_radius",
				Description: "Enter blast-radius mode for a workspace: dim unrelated nodes and paint downstream consumers on a hop-distance gradient. Use this whenever the user asks to 'show the blast radius of X', 'what depends on X', or wants to visualise downstream impact of a workspace change.",
				Parameters: map[string]any{
					"type": "object",
					"properties": map[string]any{
						"workspace_id": strProp("The workspace id whose blast radius to visualise, e.g. ws-abc123."),
					},
					"required": []string{"workspace_id"},
				},
			},
		},
		{
			Type: "function",
			Function: llmToolFunction{
				Name:        "navigate_view",
				Description: "Switch the main graph to a different view. Use 'workspaces' for the cross-workspace dependency graph, 'resources' for the resource-instance graph filtered to one workspace, 'providers' for the provider bipartite graph. When switching to 'resources' for a specific workspace, always pass workspace_id so the correct workspace is selected in that view.",
				Parameters: map[string]any{
					"type": "object",
					"properties": map[string]any{
						"view": map[string]any{
							"type":        "string",
							"enum":        []string{"workspaces", "resources", "providers"},
							"description": "The view to switch to.",
						},
						"workspace_id": strProp("Workspace id to select when view is 'resources', e.g. ws-abc123. Ignored for other views."),
					},
					"required": []string{"view"},
				},
			},
		},
		{
			Type: "function",
			Function: llmToolFunction{
				Name:        "show_provider_version",
				Description: "Switch to the Providers view, filter to a specific provider, and highlight the workspaces using a particular exact version of that provider. Use this when the user asks to see which workspaces use version X of provider Y, or wants to visualise version adoption across workspaces.",
				Parameters: map[string]any{
					"type": "object",
					"properties": map[string]any{
						"provider_source": strProp("Full provider source, e.g. registry.terraform.io/hashicorp/random."),
						"version_exact":   strProp("Exact resolved version to highlight, e.g. 3.6.1. Omit to highlight workspaces with no locked version."),
					},
					"required": []string{"provider_source"},
				},
			},
		},
	}
}

// uiActionTools is the set of tool names that trigger browser-side graph
// actions rather than catalog queries. They return {"acknowledged":true} to the
// model and are separately collected in chatResponse.Actions for the frontend.
var uiActionTools = map[string]bool{
	"focus_workspace":       true,
	"show_blast_radius":     true,
	"navigate_view":         true,
	"show_provider_version": true,
}

// toolResult is the JSON envelope handed back to the model for every tool call.
// Count is the exact total across all matches; Data is the (bounded) row list.
type toolResult struct {
	Count int `json:"count"`
	Data  any `json:"data"`
}

// clampChatPageSize bounds a model-requested page size to [1, chatToolPageSize].
func clampChatPageSize(n int) int {
	if n <= 0 || n > chatToolPageSize {
		return chatToolPageSize
	}
	return n
}

// dispatchTool runs one tool call against the catalog using the dev grant and
// returns the JSON-encodable result plus the total match count. A tool-level
// error (bad arguments, query failure) is returned as a normal error so the
// caller can hand it back to the model for self-correction.
func (s *Server) dispatchTool(ctx context.Context, grantID, name, rawArgs string) (toolResult, error) {
	switch name {
	case "list_workspaces":
		var a struct {
			SortBy   string `json:"sort_by"`
			PageSize int    `json:"page_size"`
		}
		if err := unmarshalArgs(rawArgs, &a); err != nil {
			return toolResult{}, err
		}
		data, total, err := s.db.ListGrantWorkspaces(ctx, grantID, clampChatPageSize(a.PageSize), a.SortBy)
		if err != nil {
			return toolResult{}, err
		}
		return toolResult{Count: total, Data: data}, nil

	case "list_resources":
		var a struct {
			WorkspaceID  string            `json:"workspace_id"`
			ResourceType string            `json:"resource_type"`
			OrgID        string            `json:"org_id"`
			ProjectID    string            `json:"project_id"`
			AttrFilters  map[string]string `json:"attr_filters"`
			PageSize     int               `json:"page_size"`
		}
		if err := unmarshalArgs(rawArgs, &a); err != nil {
			return toolResult{}, err
		}
		data, _, total, err := s.db.QueryResources(ctx, database.ResourceQuery{
			GrantID:      grantID,
			WorkspaceID:  a.WorkspaceID,
			ResourceType: a.ResourceType,
			OrgID:        a.OrgID,
			ProjectID:    a.ProjectID,
			AttrFilters:  a.AttrFilters,
			PageSize:     clampChatPageSize(a.PageSize),
		})
		if err != nil {
			return toolResult{}, err
		}
		if data == nil {
			data = []database.ResourceResult{}
		}
		return toolResult{Count: total, Data: data}, nil

	case "get_dependents":
		var a struct {
			Address  string `json:"address"`
			PageSize int    `json:"page_size"`
		}
		if err := unmarshalArgs(rawArgs, &a); err != nil {
			return toolResult{}, err
		}
		if a.Address == "" {
			return toolResult{}, fmt.Errorf("address is required")
		}
		data, _, total, err := s.db.GetDependents(ctx, grantID, a.Address, database.ResourceCursor{}, clampChatPageSize(a.PageSize))
		if err != nil {
			return toolResult{}, err
		}
		if data == nil {
			data = []database.ResourceResult{}
		}
		return toolResult{Count: total, Data: data}, nil

	case "get_blast_radius":
		var a struct {
			WorkspaceID string `json:"workspace_id"`
			PageSize    int    `json:"page_size"`
		}
		if err := unmarshalArgs(rawArgs, &a); err != nil {
			return toolResult{}, err
		}
		if a.WorkspaceID == "" {
			return toolResult{}, fmt.Errorf("workspace_id is required")
		}
		data, _, total, err := s.db.BlastRadius(ctx, grantID, a.WorkspaceID, database.ResourceCursor{}, clampChatPageSize(a.PageSize))
		if err != nil {
			return toolResult{}, err
		}
		if data == nil {
			data = []database.ResourceResult{}
		}
		return toolResult{Count: total, Data: data}, nil

	case "list_providers":
		var a struct {
			ProviderSource    string `json:"provider_source"`
			VersionConstraint string `json:"version_constraint"`
			VersionExact      string `json:"version_exact"`
			PageSize          int    `json:"page_size"`
		}
		if err := unmarshalArgs(rawArgs, &a); err != nil {
			return toolResult{}, err
		}
		data, _, total, err := s.db.QueryProviders(ctx, database.ProviderQuery{
			GrantID:           grantID,
			ProviderSource:    a.ProviderSource,
			VersionConstraint: a.VersionConstraint,
			VersionExact:      a.VersionExact,
			PageSize:          clampChatPageSize(a.PageSize),
		})
		if err != nil {
			return toolResult{}, err
		}
		if data == nil {
			data = []database.ProviderResult{}
		}
		return toolResult{Count: total, Data: data}, nil

	default:
		return toolResult{}, fmt.Errorf("unknown tool %q", name)
	}
}

// unmarshalArgs decodes a tool-call arguments string. An empty string is treated
// as an empty object so tools with all-optional parameters work.
func unmarshalArgs(raw string, dst any) error {
	if raw == "" {
		raw = "{}"
	}
	if err := json.Unmarshal([]byte(raw), dst); err != nil {
		return fmt.Errorf("invalid tool arguments: %w", err)
	}
	return nil
}

// callLLM performs one chat-completions request and returns the assistant
// message from the first choice.
func (s *Server) callLLM(ctx context.Context, messages []llmMessage) (llmMessage, error) {
	body, err := json.Marshal(llmRequest{
		Model:      s.cfg.LLMModel,
		Messages:   messages,
		Tools:      chatTools(),
		ToolChoice: "auto",
	})
	if err != nil {
		return llmMessage{}, fmt.Errorf("marshal llm request: %w", err)
	}

	reqCtx, cancel := context.WithTimeout(ctx, llmRequestTimeout)
	defer cancel()

	req, err := http.NewRequestWithContext(reqCtx, http.MethodPost, s.cfg.LLMAPIURL, bytes.NewReader(body))
	if err != nil {
		return llmMessage{}, fmt.Errorf("build llm request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	if s.cfg.LLMAPIKey != "" {
		req.Header.Set("Authorization", "Bearer "+s.cfg.LLMAPIKey)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return llmMessage{}, fmt.Errorf("call llm: %w", err)
	}
	defer func() { _ = resp.Body.Close() }()

	raw, err := io.ReadAll(io.LimitReader(resp.Body, 8<<20))
	if err != nil {
		return llmMessage{}, fmt.Errorf("read llm response: %w", err)
	}
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return llmMessage{}, fmt.Errorf("llm returned status %d: %s", resp.StatusCode, string(raw))
	}

	var parsed llmResponse
	if err := json.Unmarshal(raw, &parsed); err != nil {
		return llmMessage{}, fmt.Errorf("decode llm response: %w", err)
	}
	if parsed.Error != nil {
		return llmMessage{}, fmt.Errorf("llm error: %s", parsed.Error.Message)
	}
	if len(parsed.Choices) == 0 {
		return llmMessage{}, fmt.Errorf("llm returned no choices")
	}
	return parsed.Choices[0].Message, nil
}
