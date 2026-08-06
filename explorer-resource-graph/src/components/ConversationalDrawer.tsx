import { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown, Send, RefreshCw, Terminal } from "lucide-react";
import { mockChat, SUGGESTIONS } from "../mock/mockChat";
import type { ChatMessage, UiAction } from "../types/chat";

interface Props {
  onUiAction: (action: UiAction) => void;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

const M = {
  dark: "#131313",
  darkPanel: "#1a1a1a",
  darkItem: "#262626",
  darkBorder: "#393939",
  blue: "#0043ce",
  text: "#f4f4f4",
  textDim: "#c6c6c6",
  textMuted: "#8d8d8d",
  inputBg: "rgba(236,238,242,0.1)",
  font: "'IBM Plex Sans', 'Inter', system-ui, sans-serif",
  mono: "'IBM Plex Mono', monospace",
};

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, `<code style="font-family:${M.mono};background:rgba(255,255,255,0.1);padding:1px 4px;border-radius:3px;font-size:11px">$1</code>`)
    .replace(/\n/g, '<br/>');
}

export function ConversationalDrawer({ onUiAction, open, onOpenChange }: Props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(query: string) {
    if (!query.trim() || loading) return;
    const userMsg: ChatMessage = { id: Date.now(), role: "user", content: query };
    setMessages(ms => [...ms, userMsg]);
    setInput("");
    setLoading(true);
    if (!open) onOpenChange(true);

    try {
      const res = await mockChat(query);
      const assistantMsg: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: res.reply,
        toolCalls: res.tool_calls,
        actions: res.actions,
      };
      setMessages(ms => [...ms, assistantMsg]);
      // Dispatch UI actions sequentially with small delay
      res.actions.forEach((action, i) => {
        setTimeout(() => onUiAction(action), (i + 1) * 400);
      });
    } finally {
      setLoading(false);
    }
  }

  const DRAWER_HEIGHT = 340;

  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      backgroundColor: M.dark,
      borderTop: `1px solid ${M.darkBorder}`,
      transition: "height 0.25s cubic-bezier(0.32,0.72,0,1)",
      height: open ? DRAWER_HEIGHT : 44,
      overflow: "hidden",
      zIndex: 10,
    }}>
      {/* Collapsed affordance / header */}
      <div
        className="flex items-center justify-between px-4"
        style={{ height: 44, borderBottom: open ? `1px solid ${M.darkBorder}` : "none", cursor: "pointer" }}
        onClick={() => onOpenChange(!open)}
      >
        <div className="flex items-center gap-2">
          <Terminal size={13} color={M.blue} />
          <span style={{ color: M.textDim, fontSize: 12, fontFamily: M.font }}>
            Ask about your infrastructure
          </span>
          {messages.length > 0 && (
            <span style={{ fontSize: 10, color: M.textMuted, backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "1px 6px" }}>
              {messages.length} message{messages.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <div style={{ color: M.textMuted }}>
          {open ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </div>
      </div>

      {/* Expanded content */}
      {open && (
        <>
          {/* Suggestions (only when no messages) */}
          {messages.length === 0 && (
            <div className="flex gap-2 px-4 py-2">
              {SUGGESTIONS.map(s => (
                <button
                  key={s.key}
                  onClick={() => send(s.label)}
                  style={{
                    fontSize: 11, padding: "4px 10px", borderRadius: 12,
                    border: `1px solid ${M.darkBorder}`,
                    color: M.textDim, backgroundColor: M.darkItem,
                    fontFamily: M.font, whiteSpace: "nowrap",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Message thread */}
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px", maxHeight: DRAWER_HEIGHT - 100 }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ marginBottom: 12 }}>
                {msg.role === "user" ? (
                  <div style={{ textAlign: "right" }}>
                    <span style={{
                      display: "inline-block", fontSize: 12, color: M.text,
                      backgroundColor: M.darkItem, padding: "6px 12px",
                      borderRadius: "12px 12px 2px 12px", maxWidth: "80%",
                      fontFamily: M.font,
                    }}>
                      {msg.content}
                    </span>
                  </div>
                ) : (
                  <div>
                    <div
                      style={{ fontSize: 12, color: M.text, fontFamily: M.font, lineHeight: "1.6", marginBottom: 4 }}
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                    />
                    {msg.toolCalls && msg.toolCalls.length > 0 && (
                      <div style={{ marginTop: 4, padding: "4px 8px", backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 4, borderLeft: `2px solid ${M.darkBorder}` }}>
                        <div style={{ fontSize: 10, color: M.textMuted, fontFamily: M.mono, marginBottom: 2 }}>Tool calls:</div>
                        {msg.toolCalls.map((tc, i) => (
                          <div key={i} style={{ fontSize: 10, color: M.textMuted, fontFamily: M.mono }}>
                            {tc.name}({Object.entries(tc.args).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(", ")})
                            {tc.resultCount !== undefined ? ` → ${tc.resultCount} results` : ""}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                <RefreshCw size={12} color={M.blue} className="animate-spin" />
                <span style={{ fontSize: 11, color: M.textMuted, fontFamily: M.font }}>Querying resource catalog…</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "8px 12px", borderTop: `1px solid ${M.darkBorder}` }}>
            <div className="flex items-center gap-2" style={{ backgroundColor: M.inputBg, border: `1px solid ${M.darkBorder}`, borderRadius: 8, padding: "6px 10px" }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                placeholder="Ask about resources, blast radius, dependencies…"
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  fontSize: 12, color: M.text, fontFamily: M.font,
                }}
              />
              <button onClick={() => send(input)} disabled={!input.trim() || loading} style={{ color: input.trim() ? M.blue : M.textMuted, lineHeight: 0 }}>
                <Send size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
