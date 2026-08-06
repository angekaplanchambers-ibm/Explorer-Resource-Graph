// Copyright IBM Corp. 2026

package http

import (
	"encoding/json"
	"net/http"
)

// chatRequest is the POST /dev/chat body sent by the dev UI. grant_id is the dev
// grant (from POST /dev/grants/all); messages is the running conversation of
// user/assistant turns (no system or tool messages — the server owns those).
type chatRequest struct {
	GrantID  string           `json:"grant_id"`
	Messages []inboundMessage `json:"messages"`
}

// inboundMessage is one user/assistant turn from the browser.
type inboundMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

// chatToolCallLog is a transparency record of one tool invocation, surfaced to
// the UI so the operator can see exactly which catalog queries the model ran.
// UIAction is true for UI-action tools (no catalog query; triggers a graph
// interaction in the browser instead).
type chatToolCallLog struct {
	Name      string          `json:"name"`
	Arguments json.RawMessage `json:"arguments"`
	Count     int             `json:"count"`
	Error     string          `json:"error,omitempty"`
	UIAction  bool            `json:"ui_action,omitempty"`
}

// chatUIAction is one browser-side graph action to execute after the chat
// response is rendered. Type is the tool name (e.g. "show_blast_radius"); Args
// is the raw JSON arguments object the model supplied.
type chatUIAction struct {
	Type string          `json:"type"`
	Args json.RawMessage `json:"args"`
}

// chatResponse is the POST /dev/chat reply: the model's final text, the log of
// tool calls it made, and any UI actions the model requested.
type chatResponse struct {
	Reply     string            `json:"reply"`
	ToolCalls []chatToolCallLog `json:"tool_calls"`
	Actions   []chatUIAction    `json:"actions"`
}

// handleChat proxies a chat turn to the configured OpenAI-compatible LLM, running
// the tool-calling loop server-side: it advertises the catalog query tools,
// dispatches any tool calls against the dev grant, feeds results back, and
// returns the model's final answer. Dev-only and unauthenticated.
func (s *Server) handleChat(w http.ResponseWriter, r *http.Request) {
	if s.cfg.LLMAPIURL == "" {
		s.respondError(w, http.StatusServiceUnavailable,
			"LLM not configured: set GRAPH_CATALOG_LLM_API_URL (and GRAPH_CATALOG_LLM_API_KEY)")
		return
	}

	var req chatRequest
	if err := decodeJSON(r, &req); err != nil {
		s.respondError(w, http.StatusBadRequest, "invalid request body: "+err.Error())
		return
	}
	if req.GrantID == "" {
		s.respondError(w, http.StatusBadRequest, "grant_id is required")
		return
	}
	if len(req.Messages) == 0 {
		s.respondError(w, http.StatusBadRequest, "messages is required")
		return
	}

	// Validate the dev grant up front so tool dispatch can trust it.
	valid, err := s.redis.GrantValid(r.Context(), req.GrantID)
	if err != nil {
		s.t.Logger.Error("Failed checking grant validity", "error", err)
		s.respondError(w, http.StatusInternalServerError, "failed validating grant")
		return
	}
	if !valid {
		s.respondError(w, http.StatusBadRequest, "grant_id is invalid or expired")
		return
	}

	// Seed the conversation: system prompt + the browser's turns.
	messages := make([]llmMessage, 0, len(req.Messages)+1)
	messages = append(messages, llmMessage{Role: "system", Content: strPtr(chatSystemPromptText)})
	for _, m := range req.Messages {
		c := m.Content
		messages = append(messages, llmMessage{Role: m.Role, Content: &c})
	}

	var toolLog []chatToolCallLog
	var actions []chatUIAction

	for i := 0; i < maxChatIterations; i++ {
		assistant, err := s.callLLM(r.Context(), messages)
		if err != nil {
			s.t.Logger.Error("LLM call failed", "error", err)
			s.respondError(w, http.StatusBadGateway, "LLM call failed: "+err.Error())
			return
		}

		// No tool calls -> this is the final answer.
		if len(assistant.ToolCalls) == 0 {
			reply := ""
			if assistant.Content != nil {
				reply = *assistant.Content
			}
			s.respondJSON(w, http.StatusOK, chatResponse{Reply: reply, ToolCalls: toolLog, Actions: actions})
			return
		}

		// Echo the assistant's tool-call message back into the history, then
		// append one tool result per call.
		messages = append(messages, assistant)
		for _, tc := range assistant.ToolCalls {
			logEntry := chatToolCallLog{
				Name:      tc.Function.Name,
				Arguments: json.RawMessage(argsOrNull(tc.Function.Arguments)),
			}

			var toolContent string

			if uiActionTools[tc.Function.Name] {
				// UI-action tools do not query the catalog. Record the action for
				// the browser and acknowledge to the model so it can continue.
				logEntry.UIAction = true
				actions = append(actions, chatUIAction{
					Type: tc.Function.Name,
					Args: json.RawMessage(argsOrNull(tc.Function.Arguments)),
				})
				toolContent = `{"acknowledged":true}`
			} else {
				result, derr := s.dispatchTool(r.Context(), req.GrantID, tc.Function.Name, tc.Function.Arguments)

				if derr != nil {
					logEntry.Error = derr.Error()
					toolContent = `{"error":` + jsonString(derr.Error()) + `}`
				} else {
					logEntry.Count = result.Count
					if b, merr := json.Marshal(result); merr == nil {
						toolContent = string(b)
					} else {
						toolContent = `{"error":"failed encoding tool result"}`
					}
				}
			}

			toolLog = append(toolLog, logEntry)
			messages = append(messages, llmMessage{
				Role:       "tool",
				ToolCallID: tc.ID,
				Content:    &toolContent,
			})
		}
	}

	// Loop budget exhausted without a final text answer.
	s.respondJSON(w, http.StatusOK, chatResponse{
		Reply:     "I wasn't able to finish answering within the tool-call budget. Try narrowing the question.",
		ToolCalls: toolLog,
		Actions:   actions,
	})
}

// argsOrNull returns a valid JSON value for the tool-call arguments log, coercing
// an empty string to an empty object and a non-JSON blob to a JSON string so the
// response envelope always marshals.
func argsOrNull(raw string) string {
	if raw == "" {
		return "{}"
	}
	if !json.Valid([]byte(raw)) {
		return jsonString(raw)
	}
	return raw
}

// jsonString safely encodes s as a JSON string literal (including quotes).
func jsonString(s string) string {
	b, err := json.Marshal(s)
	if err != nil {
		return `""`
	}
	return string(b)
}
