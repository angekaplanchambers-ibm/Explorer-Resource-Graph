import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { TFCWorkspaceView } from "./components/TFCWorkspaceView";
import { ControlCenter } from "./components/ControlCenter";
import { Workbench } from "./components/Workbench";
import NavTfcSideNav from "@/imports/NavTfcSideNav";
import { TFCTopNav } from "./components/TFCTopNav";
import type { SelectedNodeInfo, NodeOverlayInfo, TopoNode } from "./components/WorkspacesExplorerView";
import { CollapsedAgentPanel, type AgentConversation } from "./components/CollapsedAgentPanel";
import type { AgentMessage } from "./components/TFSignalChat";

/* MARKER-MAKE-KIT-INVOKED */

export type PageContext = "overview" | "runs" | "runDetail";
export type DockMode = "left" | "right";
const SIDE_PANEL_MIN = 280;
const SIDE_PANEL_MAX = 720;
const SIDE_PANEL_DEFAULT = 420;

export default function App() {
  const [conversations, setConversations] = useState<AgentConversation[]>([]);
  const [conversationId, setConversationId] = useState<string>(() => crypto.randomUUID());
  const [agentChatOpen, setAgentChatOpen] = useState(false);
  const activeConversation = conversations.find(conversation => conversation.id === conversationId);
  const updateMessages = useCallback((update: AgentMessage[] | ((previous: AgentMessage[]) => AgentMessage[])) => {
    setConversations(previous => {
      const current = previous.find(conversation => conversation.id === conversationId);
      const messages = typeof update === "function" ? update(current?.messages ?? []) : update;
      const title = messages.find(message => message.role === "user")?.text;
      if (!title) return previous;
      const conversation = { id: conversationId, title, messages, updatedAt: Date.now() };
      return current ? previous.map(item => item.id === conversationId ? conversation : item) : [...previous, conversation];
    });
  }, [conversationId]);
  const [workbenchOpen, setWorkbenchOpen] = useState(false);
  const [workbenchVisible, setWorkbenchVisible] = useState(false);
  const [workbenchQuery, setWorkbenchQuery] = useState<string | undefined>(undefined);
  const [pendingQuery, setPendingQuery] = useState<string | undefined>(undefined);
  const [explorerQuery, setExplorerQuery] = useState<{ query: string; nodes: Array<{ id: string; label: string; type: string; secondary?: string; data?: Record<string, string | number | boolean> }> } | undefined>(undefined);
  const [selectedExplorerNodeId, setSelectedExplorerNodeId] = useState<string | null>(null);
  const [returnedNodes, setReturnedNodes] = useState<TopoNode[]>([]);
  const [returnedNodesTheme, setReturnedNodesTheme] = useState<"light" | "dark">("light");
  const [returnedNodesContext, setReturnedNodesContext] = useState<{ title: string; conditionCount: number } | null>(null);
  const handleReturnedNodesChange = useCallback((nodes: TopoNode[], themeMode: "light" | "dark", context?: { title: string; conditionCount: number } | null) => {
    setReturnedNodes(nodes);
    setReturnedNodesTheme(themeMode);
    setReturnedNodesContext(context ?? null);
  }, []);
  const [explorerNodeAction, setExplorerNodeAction] = useState<{ action: "resources" | "modules" | "providers" | "blast-radius" | "exit-blast-radius" | "close" | "exit-overlay"; nodeId: string; nodeLabel?: string; nonce: number } | null>(null);
  // Node detail panel — the graph's former on-canvas "Node Popover" now reports its
  // selected node (and blast-radius data) up here so it can render inside the Agent
  // Drawer instead. This state lives in App so it survives the drawer opening,
  // closing, docking, or resizing.
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<SelectedNodeInfo | null>(null);
  // Same idea for the on-canvas Resources/Modules/Providers overlay panel — it also
  // now renders inside the Agent Drawer instead of floating over the graph.
  const [nodeOverlayInfo, setNodeOverlayInfo] = useState<NodeOverlayInfo | null>(null);
  const [pendingOpTriage, setPendingOpTriage] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<PageContext>("overview");
  const [dockMode, setDockMode] = useState<DockMode>("right");
  const [agentOpen, setAgentOpen] = useState(false);
  // Auto-open the Agent Drawer whenever a node popover/overlay is triggered (canvas
  // click, HUD "Returned Nodes" list, or an explorerNodeAction like View Blast Radius/
  // Resources/Modules/Providers) so its content isn't hidden behind the collapsed
  // trigger. Closing/collapsing remains a manual action — this effect only opens.
  useEffect(() => {
    if (selectedNodeInfo || nodeOverlayInfo) {
      setAgentOpen(true);
    }
  }, [selectedNodeInfo, nodeOverlayInfo]);
  const [stepActive, setStepActive] = useState(false); // mirrors whether a step is open in ControlCenter
  const [navOpen, setNavOpen] = useState(false);
  const [panelW, setPanelW] = useState(SIDE_PANEL_DEFAULT);
  const dragRef = useRef<{ startX: number; startW: number } | null>(null);

  const startPanelDrag = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragRef.current = { startX: e.clientX, startW: panelW };
    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      const delta = dragRef.current.startX - ev.clientX;
      setPanelW(Math.min(SIDE_PANEL_MAX, Math.max(SIDE_PANEL_MIN, dragRef.current.startW + delta)));
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [panelW]);

  function openWorkbench(query?: string) {
    setWorkbenchQuery(query);
    setWorkbenchOpen(true);
    // Defer to next frame so the initial translateY renders before we animate in
    requestAnimationFrame(() => requestAnimationFrame(() => setWorkbenchVisible(true)));
  }

  function closeWorkbench() {
    setWorkbenchVisible(false);
    // Wait for slide-out to finish before unmounting
    setTimeout(() => {
      setWorkbenchOpen(false);
      setWorkbenchQuery(undefined);
    }, 760);
  }

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Full-width top bar */}
      <TFCTopNav />

      {/* Below top bar: nav + content side by side */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "row", overflow: "hidden" }}>
        {/* Left navigation — zero-width container so nothing is pushed right */}
        <div style={{ position: "relative", flexShrink: 0, width: 0, height: "100%", overflow: "visible", zIndex: 20 }}>
          {/* Sliding nav panel */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 280,
              height: "100%",
              overflow: "hidden",
              borderRight: "1px solid #DEDFE3",
              transform: navOpen ? "translateX(0)" : "translateX(-280px)",
              transition: "transform 0.3s cubic-bezier(0.25,0.8,0.25,1)",
            }}
          >
            <NavTfcSideNav />
          </div>
          {/* Toggle button — floats over content at the nav's right edge */}
          <button
            type="button"
            onClick={() => setNavOpen(o => !o)}
            aria-label={navOpen ? "Collapse navigation" : "Expand navigation"}
            style={{
              position: "absolute",
              left: navOpen ? 280 : 0,
              top: 16,
              width: 36,
              height: 40,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              background: "#fafafa",
              border: "1px solid #DEDFE3",
              borderLeft: "none",
              borderRadius: "0 6px 6px 0",
              boxShadow: "3px 0 8px rgba(0,0,0,0.08)",
              cursor: "pointer",
              color: "#656a76",
              transition: "left 0.3s cubic-bezier(0.25,0.8,0.25,1)",
            }}
          >
            {navOpen ? <ChevronsLeft size={14} /> : <ChevronsRight size={14} />}
          </button>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden", paddingLeft: navOpen ? 280 : 0, transition: "padding-left 0.3s cubic-bezier(0.25,0.8,0.25,1)" }}>
          <div
            className="flex-1 min-h-0"
            style={{
              display: "flex", flexDirection: "row", overflow: "hidden",
            }}
          >
            {/* Left-dock panel — in-flow flex column, shown only when dockMode=left */}
            {dockMode === "left" && !workbenchOpen && (
              <div style={{ position: "relative", order: -1, zIndex: 20, flexShrink: 0, width: agentOpen ? panelW : 0, height: "100%", overflow: "visible", transition: "width 0.3s cubic-bezier(0.25,0.8,0.25,1)" }}>
                {agentOpen && (
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <ControlCenter
                      initialChat={agentChatOpen}
                      onNewConversation={() => setConversationId(crypto.randomUUID())}
                      messages={activeConversation?.messages}
                      onMessagesChange={updateMessages}
                      initialQuery={pendingQuery}
                      explorerQuery={explorerQuery}
                      selectedExplorerNodeId={selectedExplorerNodeId}
                      returnedNodes={returnedNodes}
                      returnedNodesTheme={returnedNodesTheme}
                      returnedNodesContext={returnedNodesContext}
                      selectedNodeInfo={selectedNodeInfo}
                      nodeOverlayInfo={nodeOverlayInfo}
                      onExplorerNodeAction={(action, nodeId) => setExplorerNodeAction({ action, nodeId, nodeLabel: explorerQuery?.nodes.find(node => node.id === nodeId)?.label, nonce: Date.now() })}
                      onExplorerNodeSelect={setSelectedExplorerNodeId}
                      onExplorerNodeClose={() => setSelectedExplorerNodeId(null)}
                      onQueryHandled={() => setPendingQuery(undefined)}
                      openOpTriage={pendingOpTriage}
                      onOpenOpTriageHandled={() => setPendingOpTriage(undefined)}
                      onOpenWorkbench={openWorkbench}
                      pageContext={page}
                      dockMode={dockMode}
                      onDockChange={setDockMode}
                      onStepActiveChange={setStepActive}
                      onClose={() => setAgentOpen(false)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Workspace content — shrinks to make room for docked panel */}
            <div style={{
              flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden",
              paddingBottom: 0,
              transition: "padding-bottom 0.4s cubic-bezier(0.25,0.8,0.25,1)",
            }}>
              <TFCWorkspaceView
                page={page}
                onPageChange={setPage}
                onControlCenterTrigger={(q) => setPendingQuery(q)}
                onExplorerQuery={(query, nodes) => {
                  setAgentChatOpen(false);
                  setExplorerQuery({ query, nodes });
                  setAgentOpen(true);
                }}
                onExplorerNodeSelect={(nodeId) => {
                  setAgentChatOpen(false);
                  setSelectedExplorerNodeId(nodeId);
                  setAgentOpen(true);
                }}
                onReturnedNodesChange={handleReturnedNodesChange}
                onExplorerNodeClose={() => setSelectedExplorerNodeId(null)}
                selectedExplorerNodeId={selectedExplorerNodeId}
                explorerNodeAction={explorerNodeAction}
                onExplorerNodeAction={(action, nodeId) => setExplorerNodeAction({ action, nodeId, nodeLabel: explorerQuery?.nodes.find(node => node.id === nodeId)?.label, nonce: Date.now() })}
                onSelectedNodeInfoChange={setSelectedNodeInfo}
                onNodeOverlayChange={setNodeOverlayInfo}
                onOpenOpTriage={(opId) => setPendingOpTriage(opId)}
                rightInset={0}
                hideTopNav
                navOpen={navOpen}
              />
            </div>

            {/* Right-dock panel — in-flow flex column, shown only when dockMode=right */}
            {dockMode === "right" && !workbenchOpen && (
              <div style={{ position: "relative", zIndex: 20, flexShrink: 0, width: agentOpen ? panelW : 0, height: "100%", overflow: "visible", transition: "width 0.3s cubic-bezier(0.25,0.8,0.25,1)" }}>
                {/* Resize handle — only active when panel is open */}
                {agentOpen && (
                  <div
                    onMouseDown={startPanelDrag}
                    style={{
                      position: "absolute",
                      left: -6,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 12,
                      height: 48,
                      cursor: "ew-resize",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                    }}
                    title="Drag to resize panel"
                  >
                    <div
                      style={{
                        width: 4,
                        height: 32,
                        borderRadius: 2,
                        backgroundColor: "rgba(101,106,118,0.25)",
                        transition: "background-color 0.15s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(16,96,255,0.5)")}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(101,106,118,0.25)")}
                    />
                  </div>
                )}

                {/* Panel content */}
                {agentOpen && (
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <ControlCenter
                      initialChat={agentChatOpen}
                      onNewConversation={() => setConversationId(crypto.randomUUID())}
                      messages={activeConversation?.messages}
                      onMessagesChange={updateMessages}
                      initialQuery={pendingQuery}
                      explorerQuery={explorerQuery}
                      selectedExplorerNodeId={selectedExplorerNodeId}
                      returnedNodes={returnedNodes}
                      returnedNodesTheme={returnedNodesTheme}
                      returnedNodesContext={returnedNodesContext}
                      selectedNodeInfo={selectedNodeInfo}
                      nodeOverlayInfo={nodeOverlayInfo}
                      onExplorerNodeAction={(action, nodeId) => setExplorerNodeAction({ action, nodeId, nodeLabel: explorerQuery?.nodes.find(node => node.id === nodeId)?.label, nonce: Date.now() })}
                      onExplorerNodeSelect={setSelectedExplorerNodeId}
                      onExplorerNodeClose={() => setSelectedExplorerNodeId(null)}
                      onQueryHandled={() => setPendingQuery(undefined)}
                      openOpTriage={pendingOpTriage}
                      onOpenOpTriageHandled={() => setPendingOpTriage(undefined)}
                      onOpenWorkbench={openWorkbench}
                      pageContext={page}
                      dockMode={dockMode}
                      onDockChange={setDockMode}
                      onStepActiveChange={setStepActive}
                      onClose={() => setAgentOpen(false)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {!workbenchOpen && !agentOpen && (
        <CollapsedAgentPanel
          width={panelW}
          nodes={selectedNodeInfo ? [selectedNodeInfo.node] : returnedNodes}
          context={selectedNodeInfo ? `${selectedNodeInfo.activeType} · ${selectedNodeInfo.node.label}` : returnedNodesContext?.title ?? page}
          conversations={conversations}
          onOpen={() => { setAgentChatOpen(false); setAgentOpen(true); }}
          onSelectNode={nodeId => { setAgentChatOpen(false); setSelectedExplorerNodeId(nodeId); setAgentOpen(true); }}
          onSend={query => { setAgentChatOpen(true); setConversationId(crypto.randomUUID()); setPendingQuery(query); setAgentOpen(true); }}
          onResume={id => { setAgentChatOpen(true); setConversationId(id); setAgentOpen(true); }}
        />
      )}

      {workbenchOpen && (
        <div
          style={{
            position: "fixed",
            top: "60px",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            transform: workbenchVisible ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.75s cubic-bezier(0.22, 0.9, 0.36, 1)",
            willChange: "transform",
          }}
        >
          <Workbench
            onClose={closeWorkbench}
            initialQuery={workbenchQuery}
            pageContext={page}
          />
        </div>
      )}
    </div>
  );
}
