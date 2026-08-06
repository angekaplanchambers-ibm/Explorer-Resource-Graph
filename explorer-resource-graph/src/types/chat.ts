export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  toolCalls?: ToolCallRecord[];
  actions?: UiAction[];
}

export interface ToolCallRecord {
  name: string;
  args: Record<string, unknown>;
  resultCount?: number;
}

export type UiAction =
  | { type: "navigate_view"; view: "workspaces" | "resources" | "providers" }
  | { type: "focus_workspace"; workspace_id: string }
  | { type: "show_blast_radius"; workspace_id: string }
  | { type: "show_provider_version"; provider_source: string; version_exact?: string }
  | { type: "filter_table"; resource_type?: string; workspace_id?: string; search?: string };

export interface ChatResponse {
  reply: string;
  tool_calls: ToolCallRecord[];
  actions: UiAction[];
}
