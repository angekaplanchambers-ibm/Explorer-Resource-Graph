import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, ArrowUp, ChevronDown, ChevronsLeft, ChevronsRight, History, Plus, Sparkles } from "lucide-react";
import { TFCWorkspaceView } from "./components/TFCWorkspaceView";
import { ControlCenter } from "./components/ControlCenter";
import { Workbench } from "./components/Workbench";
import NavTfcSideNav from "@/imports/NavTfcSideNav";
import { TFCTopNav } from "./components/TFCTopNav";
import type { SelectedNodeInfo, NodeOverlayInfo, TopoNode } from "./components/WorkspacesExplorerView";

/* MARKER-MAKE-KIT-INVOKED */

export type PageContext = "overview" | "runs" | "runDetail";
export type DockMode = "left" | "right";
const SIDE_PANEL_MIN = 280;
const SIDE_PANEL_MAX = 720;
const SIDE_PANEL_DEFAULT = 420;

function AgentCollapsedTrigger({ width, onToggle, hiddenBehindDrawer }: {
  width: number;
  onToggle: () => void;
  hiddenBehindDrawer: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle Advisor drawer"
      aria-hidden={hiddenBehindDrawer}
      tabIndex={hiddenBehindDrawer ? -1 : 0}
      style={{
        position: "fixed",
        right: hiddenBehindDrawer ? 0 : 12,
        bottom: 12,
        zIndex: 10,
        width: `min(${width}px, calc(100vw - 24px))`,
        padding: "12px",
        border: "1px solid #c8b5ff",
        borderTopColor: "#78a8ff",
        borderRadius: 7,
        background: "#f1f2f3",
        boxShadow: "0 8px 24px rgba(0,0,0,0.16)",
        color: "#0c0c0e",
        fontFamily: "'IBM Plex Sans', 'Inter', system-ui, sans-serif",
        fontSize: 12,
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <Sparkles size={18} color="#5f55f5" fill="#5f55f5" />
        <strong style={{ fontSize: 12, lineHeight: 1.2 }}>Advisor</strong>
      </div>

      <div style={{
        height: 32,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "0 12px",
        marginBottom: 8,
        border: "1px solid #a21caf",
        borderRadius: 4,
        background: "#fff",
      }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#9218e8", flexShrink: 0 }} />
        <span style={{ minWidth: 0, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 12 }}>
          Production workspaces <span style={{ color: "#656a76" }}>2s ago</span>
        </span>
        <ArrowRight size={14} />
      </div>

      <div style={{ display: "flex", alignItems: "stretch", gap: 6 }}>
        <div style={{
          minWidth: 0,
          flex: 1,
          height: 36,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 8px 0 10px",
          border: "1px solid rgba(59,61,69,0.4)",
          borderRadius: 4,
          background: "#fff",
          color: "#656a76",
        }}>
          <Plus size={14} />
          <span style={{ minWidth: 0, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 12 }}>
            Ask about your infrastructure · ⌘K
          </span>
          <span style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "#1060ff", color: "#fff", flexShrink: 0 }}>
            <ArrowUp size={16} />
          </span>
        </div>
        <div style={{
          width: 52,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          border: "1px solid rgba(59,61,69,0.4)",
          borderRadius: 4,
          background: "#fff",
          color: "#3b3d45",
          flexShrink: 0,
        }}>
          <History size={14} />
          <ChevronDown size={14} />
        </div>
      </div>
    </button>
  );
}

export default function App() {
  const [workbenchOpen, setWorkbenchOpen] = useState(false);
  const [workbenchVisible, setWorkbenchVisible] = useState(false);
  const [workbenchQuery, setWorkbenchQuery] = useState<string | undefined>(undefined);
  const [pendingQuery, setPendingQuery] = useState<string | undefined>(undefined);
  const [explorerQuery, setExplorerQuery] = useState<{ query: string; nodes: Array<{ id: string; label: string; type: string; secondary?: string; data?: Record<string, string | number | boolean> }> } | undefined>(undefined);
  const [selectedExplorerNodeId, setSelectedExplorerNodeId] = useState<string | null>(null);
  const [returnedNodes, setReturnedNodes] = useState<TopoNode[]>([]);
  const [returnedNodesTheme, setReturnedNodesTheme] = useState<"light" | "dark">("light");
  const handleReturnedNodesChange = useCallback((nodes: TopoNode[], themeMode: "light" | "dark") => {
    setReturnedNodes(nodes);
    setReturnedNodesTheme(themeMode);
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
                      initialQuery={pendingQuery}
                      explorerQuery={explorerQuery}
                      selectedExplorerNodeId={selectedExplorerNodeId}
                      returnedNodes={returnedNodes}
                      returnedNodesTheme={returnedNodesTheme}
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
                  setExplorerQuery({ query, nodes });
                  setAgentOpen(true);
                }}
                onExplorerNodeSelect={(nodeId) => {
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
                      initialQuery={pendingQuery}
                      explorerQuery={explorerQuery}
                      selectedExplorerNodeId={selectedExplorerNodeId}
                      returnedNodes={returnedNodes}
                      returnedNodesTheme={returnedNodesTheme}
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

      {!workbenchOpen && (
        <AgentCollapsedTrigger
          width={panelW}
          onToggle={() => setAgentOpen(open => !open)}
          hiddenBehindDrawer={agentOpen && dockMode === "right"}
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
