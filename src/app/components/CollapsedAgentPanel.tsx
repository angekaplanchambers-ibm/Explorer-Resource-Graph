import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUp, ChevronDown, History, Plus, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { TopoNode } from "./WorkspacesExplorerView";
import type { AgentMessage } from "./TFSignalChat";

export type AgentConversation = {
  id: string;
  title: string;
  messages: AgentMessage[];
  updatedAt: number;
};

export function CollapsedAgentPanel({ width, nodes, context, conversations, onResume, onSend, onOpen, onSelectNode }: {
  width: number;
  nodes: TopoNode[];
  context: string;
  conversations: AgentConversation[];
  onResume: (id: string) => void;
  onSend: (query: string) => void;
  onOpen: () => void;
  onSelectNode: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const historyButtonRef = useRef<HTMLButtonElement>(null);
  const workspaces = nodes.filter(node => node.type === "workspace");
  const errored = workspaces.filter(node => node.data.runStatus === "errored");
  const drifted = workspaces.filter(node => node.data.drifted === true);
  const findings = [
    ...(errored.length ? [{ title: `${errored.length} workspace${errored.length === 1 ? "" : "s"} with errored runs`, detail: errored.map(node => node.label).join(", "), color: "#da1e28", node: errored[0] }] : []),
    ...(drifted.length ? [{ title: `${drifted.length} workspace${drifted.length === 1 ? "" : "s"} with drift`, detail: drifted.map(node => node.label).join(", "), color: "#b85c00", node: drifted[0] }] : []),
  ];

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape" && historyOpen) {
        setHistoryOpen(false);
        historyButtonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !historyRef.current?.contains(event.target)) setHistoryOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [historyOpen]);

  return (
    <section aria-label="Collapsed ALBUS agent" onClick={event => {
      if (event.target instanceof Element && !event.target.closest("button, input, form, #collapsed-agent-history")) onOpen();
    }} className="@container fixed bottom-0 right-0 z-10 max-w-full cursor-pointer rounded-tl-[8px] border border-[#c8b5ff] border-t-[#78a8ff] bg-[#f1f2f3] p-4 text-[12px] text-[#0c0c0e] shadow-[0_8px_24px_rgba(0,0,0,0.16)]" style={{ width: `min(${width}px, 100vw)`, fontFamily: "'IBM Plex Sans', 'Inter', system-ui, sans-serif" }}>
      <header className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={onOpen} aria-label="Open ALBUS drawer" className="flex items-center gap-2 rounded text-[12px] font-bold">
          <Sparkles size={24} color="#5f55f5" fill="#5f55f5" /> ALBUS
        </button>
        <div className="flex min-w-0 max-w-full items-center gap-3">
          <span className="truncate rounded-[10px] bg-[#e9d1ff] px-3 py-1 text-[12px] font-medium text-[#8000db]" title={context}>findings: {context}</span>
          <span aria-hidden="true" className="h-6 border-l border-[#3b3d45]" />
          <button type="button" disabled className="flex shrink-0 items-center gap-2 text-[12px] disabled:cursor-not-allowed disabled:opacity-50">View all <ArrowRight size={22} /></button>
        </div>
      </header>
      <div className="mb-2 grid grid-cols-1 gap-2 @min-[600px]:grid-cols-2" aria-label="Current findings">
        {findings.length ? findings.map(finding => (
          <button key={finding.title} type="button" onClick={() => onSelectNode(finding.node.id)} className="flex w-full min-w-0 items-center justify-between gap-3 rounded-[22px] border border-[#1060ff] bg-transparent px-3 py-[7px] text-left text-[12px] text-[#1060ff]">
            <span className="min-w-0 flex-1">
              <span className="block text-[12px] leading-[1.5]">{finding.title}</span>
              <span className="block truncate text-[12px]" title={finding.detail}>{finding.detail}</span>
            </span>
            <span className="shrink-0">↵</span>
          </button>
        )) : <p className="col-span-full py-2 text-[12px] text-[#656a76]">{nodes.length ? "No errored runs or drift findings in the current results." : "Select a view or run a query to see contextual findings."}</p>}
      </div>
      <div className="flex items-center gap-[10px]">
        <form className="flex h-[30px] min-w-0 flex-1 items-center gap-2 rounded-[8px] border bg-white px-2" style={{ borderColor: "rgba(101,106,118,0.2)" }} onSubmit={event => {
          event.preventDefault();
          if (!query.trim()) return;
          onSend(query.trim());
          setQuery("");
        }}>
          <button type="button" disabled aria-label="Add attachment" className="shrink-0 text-[#656a76] disabled:cursor-not-allowed"><Plus size={19} /></button>
          <input ref={inputRef} value={query} onChange={event => setQuery(event.target.value)} aria-label="Ask ALBUS" placeholder="Ask about your infrastructure · ⌘K" className="min-w-0 flex-1 border-0 bg-transparent text-[12px] text-[#0c0c0e] outline-none" />
          <button type="submit" aria-label="Send to ALBUS" disabled={!query.trim()} className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-0 bg-[#1060ff] text-white disabled:cursor-not-allowed disabled:bg-[#b9c8f5]"><ArrowUp size={16} /></button>
        </form>
        <div ref={historyRef} className="relative flex shrink-0">
          <button ref={historyButtonRef} type="button" aria-label="Conversation history" aria-expanded={historyOpen} aria-controls="collapsed-agent-history" onClick={() => setHistoryOpen(open => !open)} className="flex h-[30px] w-[60px] items-center justify-center gap-[7px] rounded-[7px] border bg-white text-[#656a76]" style={{ borderColor: "rgba(101,106,118,0.2)" }}>
            <History size={18} /><ChevronDown size={16} className={historyOpen ? "rotate-180 transition-transform" : "transition-transform"} />
          </button>
          <AnimatePresence>
            {historyOpen && (
              <motion.div id="collapsed-agent-history" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.18 }} className="absolute bottom-full right-0 mb-2 max-h-[50vh] w-[360px] max-w-[calc(100vw-32px)] overflow-y-auto rounded-[10px] border border-[#dedfe3] bg-white p-2 shadow-lg">
                <h2 className="px-3 py-2 text-[12px] font-semibold">Previous conversations</h2>
                {conversations.length ? [...conversations].sort((a, b) => b.updatedAt - a.updatedAt).map(conversation => (
                  <button key={conversation.id} type="button" className="block w-full rounded px-3 py-2 text-left hover:bg-[#f1f2f3] focus:bg-[#f1f2f3]" onClick={() => { setHistoryOpen(false); onResume(conversation.id); }}>
                    <span className="block truncate text-[12px]">{conversation.title}</span>
                    <time className="text-[12px] text-[#656a76]" dateTime={new Date(conversation.updatedAt).toISOString()}>{new Date(conversation.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time>
                  </button>
                )) : <p className="px-3 py-2 text-[12px] text-[#656a76]">No conversations in this window yet.</p>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
