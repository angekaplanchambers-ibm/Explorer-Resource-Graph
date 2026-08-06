import { useRef } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { SignalBannerStrip } from "./SignalBannerStrip";
import { ResourceTable } from "./ResourceTable";
import { GraphPanel, type GraphPanelHandle } from "./GraphPanel";
import { ConversationalDrawer } from "./ConversationalDrawer";
import { MOCK_RESOURCES, MOCK_SIGNALS } from "../mock/mockCatalog";
import type { ExplorerViewState } from "../types/explorer";
import type { UiAction } from "../types/chat";

const T = {
  border: "#E5E5EA",
  headerBg: "#fff",
  textPrimary: "#1B1C2B",
  textSecondary: "#6B6C88",
};

interface Props {
  state: ExplorerViewState;
  onStateChange: (s: ExplorerViewState) => void;
  onControlCenterTrigger: (query: string) => void;
  onOpenWorkbench: (query?: string) => void;
  graphActionRef: React.MutableRefObject<((action: UiAction) => void) | null>;
  onUiAction: (action: UiAction) => void;
}

export function ResourceResultPage({ state, onStateChange, onControlCenterTrigger, onOpenWorkbench, graphActionRef, onUiAction }: Props) {
  const graphPanelRef = useRef<GraphPanelHandle>(null);

  // Wire graph action ref up to App
  graphActionRef.current = (action: UiAction) => {
    graphPanelRef.current?.dispatchAction(action);
  };

  const DRAWER_H = state.chatOpen ? 340 : 44;

  return (
    <div className="flex flex-col" style={{ height: "100%", position: "relative" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: T.border, backgroundColor: T.headerBg, flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 600, color: T.textPrimary }}>Resources</h1>
          <p style={{ fontSize: 12, color: T.textSecondary, marginTop: 2 }}>
            {MOCK_RESOURCES.length} managed resources across {new Set(MOCK_RESOURCES.map(r => r.workspace)).size} workspaces
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9B9CB8" }} />
            <input
              placeholder="Search resources…"
              value={state.filters.searchTerm ?? ""}
              onChange={e => onStateChange({ ...state, filters: { ...state.filters, searchTerm: e.target.value || undefined } })}
              style={{
                paddingLeft: 30, paddingRight: 10, paddingTop: 6, paddingBottom: 6,
                border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 12,
                color: T.textPrimary, backgroundColor: "#fff", width: 200, outline: "none",
              }}
            />
          </div>
          {/* Filter stub */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded border" style={{ borderColor: T.border, fontSize: 12, color: T.textSecondary, backgroundColor: "#fff" }}>
            <Filter size={12} />
            Filter
          </button>
          {/* Toggle graph */}
          <button
            onClick={() => onStateChange({ ...state, graphVisible: !state.graphVisible })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border"
            style={{ borderColor: T.border, fontSize: 12, color: state.graphVisible ? "#1060ff" : T.textSecondary, backgroundColor: state.graphVisible ? "rgba(16,96,255,0.06)" : "#fff" }}
          >
            <SlidersHorizontal size={12} />
            {state.graphVisible ? "Hide graph" : "Show graph"}
          </button>
        </div>
      </div>

      {/* Signal banners */}
      <div style={{ flexShrink: 0 }}>
        <SignalBannerStrip banners={MOCK_SIGNALS} onZap={onControlCenterTrigger} />
      </div>

      {/* Main: table + graph */}
      <div className="flex flex-1 min-h-0" style={{ paddingBottom: DRAWER_H, overflow: "hidden" }}>
        {/* Table */}
        <div style={{ flex: state.graphVisible ? "0 0 60%" : "1", minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <ResourceTable
            resources={MOCK_RESOURCES}
            state={state}
            onStateChange={onStateChange}
            onZap={onControlCenterTrigger}
          />
        </div>

        {/* Graph panel */}
        {state.graphVisible && (
          <div style={{ flex: "0 0 40%", minWidth: 0, overflow: "hidden" }}>
            <GraphPanel
              ref={graphPanelRef}
              onWorkspaceClick={(wsId) => {
                onStateChange({ ...state, filters: { ...state.filters, workspaceId: wsId } });
              }}
            />
          </div>
        )}
      </div>

      {/* Conversational drawer (absolute positioned at bottom of this container) */}
      <ConversationalDrawer
        onUiAction={onUiAction}
        open={state.chatOpen}
        onOpenChange={(o) => onStateChange({ ...state, chatOpen: o })}
      />
    </div>
  );
}
