import { useState, useEffect, useRef } from "react";
import { ControlCenter } from "./components/ControlCenter";
import { Workbench } from "./components/Workbench";
import { ExplorerView } from "./components/ExplorerView";
import type { ExplorerViewState } from "./types/explorer";
import type { UiAction } from "./types/chat";

export default function App() {
  const [workbenchOpen, setWorkbenchOpen] = useState(false);
  const [workbenchVisible, setWorkbenchVisible] = useState(false);
  const [workbenchQuery, setWorkbenchQuery] = useState<string | undefined>(undefined);
  const [pendingQuery, setPendingQuery] = useState<string | undefined>(undefined);

  const [explorerState, setExplorerState] = useState<ExplorerViewState>({
    activeType: "resources",
    filters: {},
    chatOpen: false,
    graphVisible: true,
    selectedResourceId: null,
    dependencyPanelOpen: false,
  });

  // Ref for imperative graph manipulation from ConversationalDrawer
  const graphActionRef = useRef<((action: UiAction) => void) | null>(null);

  function openWorkbench(query?: string) {
    setWorkbenchQuery(query);
    setWorkbenchOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setWorkbenchVisible(true)));
  }

  function closeWorkbench() {
    setWorkbenchVisible(false);
    setTimeout(() => {
      setWorkbenchOpen(false);
      setWorkbenchQuery(undefined);
    }, 560);
  }

  function handleUiAction(action: UiAction) {
    if (action.type === "filter_table") {
      setExplorerState(s => ({
        ...s,
        filters: {
          ...s.filters,
          resourceType: action.resource_type,
          workspaceId: action.workspace_id,
          searchTerm: action.search,
        },
      }));
    } else if (action.type === "navigate_view") {
      const typeMap: Record<string, ExplorerViewState["activeType"]> = {
        workspaces: "workspaces", resources: "resources", providers: "providers",
      };
      setExplorerState(s => ({ ...s, activeType: typeMap[action.view] ?? s.activeType }));
    }
    // Graph-specific actions dispatched imperatively to GraphPanel
    if (graphActionRef.current) graphActionRef.current(action);
  }

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', 'Inter', system-ui, sans-serif", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div className="flex-1 min-h-0" style={{ paddingBottom: "72px" }}>
        <ExplorerView
          state={explorerState}
          onStateChange={setExplorerState}
          onControlCenterTrigger={(q) => setPendingQuery(q)}
          onOpenWorkbench={openWorkbench}
          graphActionRef={graphActionRef}
          onUiAction={handleUiAction}
        />
      </div>

      {!workbenchOpen && (
        <ControlCenter
          initialQuery={pendingQuery}
          onQueryHandled={() => setPendingQuery(undefined)}
          onOpenWorkbench={openWorkbench}
          pageContext="explorer"
        />
      )}

      {workbenchOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            transform: workbenchVisible ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.55s cubic-bezier(0.32, 0.72, 0, 1)",
            willChange: "transform",
          }}
        >
          <Workbench
            onClose={closeWorkbench}
            initialQuery={workbenchQuery}
            pageContext="explorer"
          />
        </div>
      )}
    </div>
  );
}
