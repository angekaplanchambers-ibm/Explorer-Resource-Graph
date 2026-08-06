// Copyright IBM Corp. 2026

package http

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync"
	"testing"

	"terraform-graph-catalog/internal/config"
	"terraform-graph-catalog/internal/database"
	"terraform-graph-catalog/internal/redisstore"
	"terraform-graph-catalog/internal/telemetry"

	"github.com/stretchr/testify/require"
)

// newTestServerWithLLM is newTestServer plus an OpenAI-compatible LLM endpoint.
func newTestServerWithLLM(t *testing.T, llmURL string) *httptest.Server {
	t.Helper()
	db := database.NewTestDB(t)

	cfg := config.NewConfigFromEnv()
	cfg.DevUIEnabled = true
	cfg.LogLevel = "error"
	cfg.LLMAPIURL = llmURL
	cfg.LLMModel = "test-model"

	rs, err := redisstore.New(cfg)
	require.NoError(t, err, "connect redis")
	t.Cleanup(func() { _ = rs.Close() })

	srv := NewServer(cfg, db.Database, rs, telemetry.New(cfg, "test"))
	ts := httptest.NewServer(srv.server.Handler)
	t.Cleanup(ts.Close)
	return ts
}

func TestDevGraph(t *testing.T) {
	ts := newTestServer(t)
	seedViaHTTP(t, ts.URL)

	resp, body := doReq(t, http.MethodGet, ts.URL+"/dev/graph", "", nil)
	require.Equal(t, http.StatusOK, resp.StatusCode)

	var graph database.WorkspaceGraphResult
	require.NoError(t, json.Unmarshal(body, &graph))

	nodes := map[string]database.WorkspaceGraphNode{}
	for _, n := range graph.Nodes {
		nodes[n.WorkspaceID] = n
	}
	require.Len(t, graph.Nodes, 2)

	a, ok := nodes["ws-a"]
	require.True(t, ok)
	require.Equal(t, 2, a.ResourceCount)
	require.Equal(t, []string{"registry.terraform.io/hashicorp/aws"}, a.Providers)

	b, ok := nodes["ws-b"]
	require.True(t, ok)
	require.Equal(t, 1, b.ResourceCount)
	require.Empty(t, b.Providers)

	// One directed edge: ws-a (producer) -> ws-b (consumer).
	require.Len(t, graph.Edges, 1)
	require.Equal(t, "ws-a", graph.Edges[0].ProducerWorkspaceID)
	require.Equal(t, "ws-b", graph.Edges[0].ConsumerWorkspaceID)
}

func TestDevWorkspaceResources(t *testing.T) {
	ts := newTestServer(t)
	seedViaHTTP(t, ts.URL)

	resp, body := doReq(t, http.MethodGet, ts.URL+"/dev/graph/workspace/ws-a", "", nil)
	require.Equal(t, http.StatusOK, resp.StatusCode)

	var ws struct {
		WorkspaceID string                    `json:"workspace_id"`
		Resources   []database.ResourceResult `json:"resources"`
	}
	require.NoError(t, json.Unmarshal(body, &ws))
	require.Equal(t, "ws-a", ws.WorkspaceID)
	require.Len(t, ws.Resources, 2)
	// Ordered by (address, instance_key).
	require.Equal(t, "aws_instance.web", ws.Resources[0].Address)
	require.Equal(t, "aws_vpc.main", ws.Resources[1].Address)
	// The web instance records its dependency on the VPC.
	require.Equal(t, []string{"aws_vpc.main"}, ws.Resources[0].Dependencies)
}

func TestChatUnconfigured(t *testing.T) {
	ts := newTestServer(t) // default config: no LLM URL
	seedViaHTTP(t, ts.URL)
	grant := devGrant(t, ts.URL)

	resp, _ := doReq(t, http.MethodPost, ts.URL+"/dev/chat", "", map[string]any{
		"grant_id": grant,
		"messages": []map[string]any{{"role": "user", "content": "hi"}},
	})
	require.Equal(t, http.StatusServiceUnavailable, resp.StatusCode)
}

func TestChatToolLoop(t *testing.T) {
	var (
		mu              sync.Mutex
		calls           int
		lastToolContent string
	)

	// Stub OpenAI-compatible endpoint: first call asks to run list_resources,
	// second call (after seeing the tool result) returns a final answer.
	llm := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var req struct {
			Messages []struct {
				Role    string `json:"role"`
				Content string `json:"content"`
			} `json:"messages"`
		}
		require.NoError(t, json.NewDecoder(r.Body).Decode(&req))

		sawToolResult := false
		for _, m := range req.Messages {
			if m.Role == "tool" {
				sawToolResult = true
				mu.Lock()
				lastToolContent = m.Content
				mu.Unlock()
			}
		}

		mu.Lock()
		calls++
		mu.Unlock()

		w.Header().Set("Content-Type", "application/json")
		if !sawToolResult {
			_, _ = w.Write([]byte(`{"choices":[{"finish_reason":"tool_calls","message":{"role":"assistant","content":null,"tool_calls":[{"id":"call_1","type":"function","function":{"name":"list_resources","arguments":"{\"resource_type\":\"aws_instance\"}"}}]}}]}`))
			return
		}
		_, _ = w.Write([]byte(`{"choices":[{"finish_reason":"stop","message":{"role":"assistant","content":"There is exactly 1 aws_instance."}}]}`))
	}))
	t.Cleanup(llm.Close)

	ts := newTestServerWithLLM(t, llm.URL)
	seedViaHTTP(t, ts.URL)
	grant := devGrant(t, ts.URL)

	resp, body := doReq(t, http.MethodPost, ts.URL+"/dev/chat", "", map[string]any{
		"grant_id": grant,
		"messages": []map[string]any{{"role": "user", "content": "How many aws_instance resources are there?"}},
	})
	require.Equal(t, http.StatusOK, resp.StatusCode)

	var cr chatResponse
	require.NoError(t, json.Unmarshal(body, &cr))
	require.Equal(t, "There is exactly 1 aws_instance.", cr.Reply)

	require.Len(t, cr.ToolCalls, 1)
	require.Equal(t, "list_resources", cr.ToolCalls[0].Name)
	require.Equal(t, 1, cr.ToolCalls[0].Count)
	require.Empty(t, cr.ToolCalls[0].Error)

	mu.Lock()
	defer mu.Unlock()
	require.Equal(t, 2, calls, "expected one tool-call round trip then a final answer")
	// The catalog's exact total count was handed back to the model.
	require.True(t, strings.Contains(lastToolContent, `"count":1`),
		"tool result should carry the exact match count, got: %s", lastToolContent)
}

func TestChatBadGrant(t *testing.T) {
	llm := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t.Error("LLM should not be called when the grant is invalid")
	}))
	t.Cleanup(llm.Close)

	ts := newTestServerWithLLM(t, llm.URL)

	resp, _ := doReq(t, http.MethodPost, ts.URL+"/dev/chat", "", map[string]any{
		"grant_id": "not-a-real-grant",
		"messages": []map[string]any{{"role": "user", "content": "hi"}},
	})
	require.Equal(t, http.StatusBadRequest, resp.StatusCode)
}
