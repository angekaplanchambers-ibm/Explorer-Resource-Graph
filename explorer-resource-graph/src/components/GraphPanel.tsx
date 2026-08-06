import { forwardRef, useImperativeHandle, useCallback, useState, useEffect } from "react";
import {
  ReactFlow, Background, Controls,
  type Node, type Edge, MarkerType,
  useNodesState, useEdgesState,
  Handle, Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { MOCK_WORKSPACE_NODES, MOCK_WORKSPACE_EDGES, BLAST_RADIUS } from "../mock/mockGraph";
import type { GraphView } from "../types/graph";
import type { UiAction } from "../types/chat";

// ── Node colors (match Agentic TFC Workbench NODE_COLORS) ─────────────────────
const NODE_COLORS: Record<string, string> = {
  workspace: "#5C4EE5",
  failed:    "#EF4444",
  drifted:   "#F59E0B",
  healthy:   "#10B981",
  affected1: "#fbbf24",
  affected2: "#f59e0b",
  affected3: "#d97706",
  provider:  "#2563EB",
};

function wsColor(status: string, blastHop?: number, isFocused?: boolean): string {
  if (isFocused) return "#fbbf24";
  if (blastHop !== undefined) {
    if (blastHop === 1) return "#fbbf24";
    if (blastHop === 2) return "#f59e0b";
    return "#d97706";
  }
  return NODE_COLORS[status] ?? NODE_COLORS.workspace;
}

// ── Custom WorkspaceNode ───────────────────────────────────────────────────────
function WorkspaceNode({ data }: { data: { label: string; resourceCount: number; status: string; dimmed: boolean; color: string; sub?: string } }) {
  return (
    <div style={{
      minWidth: 140, padding: "8px 12px",
      background: data.dimmed ? "rgba(255,255,255,0.15)" : "#fff",
      border: `2px solid ${data.dimmed ? "rgba(229,229,234,0.3)" : data.color}`,
      borderRadius: 8,
      opacity: data.dimmed ? 0.25 : 1,
      transition: "opacity 0.25s, border-color 0.25s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: data.color, flexShrink: 0 }} />
        <span style={{ fontSize: 12, fontWeight: 500, color: "#1B1C2B", fontFamily: "'IBM Plex Sans', system-ui", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {data.label}
        </span>
      </div>
      <div style={{ fontSize: 11, color: "#9B9CB8", marginTop: 2, fontFamily: "'IBM Plex Sans', system-ui" }}>
        {data.sub ?? `${data.resourceCount} resources`}
      </div>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}

const NODE_TYPES = { workspace: WorkspaceNode };

// ── Build ReactFlow nodes/edges from workspace graph ─────────────────────────
function buildWorkspaceGraph(blastSourceId: string | null, focusedId: string | null) {
  const COLS = 4;
  const blastAffected = blastSourceId ? new Map(BLAST_RADIUS[blastSourceId]?.map(b => [b.workspaceId, b.hop]) ?? []) : new Map<string, number>();
  const inBlastMode = !!blastSourceId;

  const nodes: Node[] = MOCK_WORKSPACE_NODES.map((ws, i) => {
    const hop = blastAffected.get(ws.id);
    const isSource = ws.id === blastSourceId;
    const isFocused = ws.id === focusedId;
    const isDimmed = inBlastMode && !isSource && hop === undefined;
    const color = isSource ? "#fbbf24" : wsColor(ws.status, hop, isFocused);
    const sub = isSource ? "Blast source" : hop !== undefined ? `Hop ${hop} · affected` : `${ws.resourceCount} resources`;
    return {
      id: ws.id,
      type: "workspace",
      position: { x: (i % COLS) * 190 + 24, y: Math.floor(i / COLS) * 110 + 24 },
      data: { label: ws.label, resourceCount: ws.resourceCount, status: ws.status, dimmed: isDimmed, color, sub },
    };
  });

  const edges: Edge[] = MOCK_WORKSPACE_EDGES.map((e, i) => {
    const sourceHop = blastAffected.get(e.source);
    const targetHop = blastAffected.get(e.target);
    const isSourceEdge = e.source === blastSourceId;
    const highlighted = inBlastMode && (isSourceEdge || (sourceHop !== undefined && targetHop !== undefined));
    return {
      id: `e${i}`,
      source: e.source,
      target: e.target,
      style: {
        stroke: highlighted ? "#fbbf24" : (inBlastMode ? "rgba(200,200,210,0.2)" : "rgba(92,78,229,0.35)"),
        strokeWidth: highlighted ? 2 : 1,
      },
      markerEnd: { type: MarkerType.ArrowClosed, color: highlighted ? "#fbbf24" : "rgba(92,78,229,0.35)" },
      animated: highlighted,
    };
  });

  return { nodes, edges };
}

// ── GraphPanel ────────────────────────────────────────────────────────────────
export interface GraphPanelHandle {
  dispatchAction: (action: UiAction) => void;
}

interface Props {
  onWorkspaceClick?: (workspaceId: string) => void;
}

export const GraphPanel = forwardRef<GraphPanelHandle, Props>(function GraphPanel({ onWorkspaceClick }, ref) {
  const [view, setView] = useState<GraphView>("workspaces");
  const [blastSourceId, setBlastSourceId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [legend, setLegend] = useState<string | null>(null);

  const { nodes: builtNodes, edges: builtEdges } = buildWorkspaceGraph(blastSourceId, focusedId);
  const [nodes, setNodes, onNodesChange] = useNodesState(builtNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(builtEdges);

  useEffect(() => {
    const { nodes: n, edges: e } = buildWorkspaceGraph(blastSourceId, focusedId);
    setNodes(n);
    setEdges(e);
  }, [blastSourceId, focusedId]);

  const dispatchAction = useCallback((action: UiAction) => {
    if (action.type === "show_blast_radius") {
      setBlastSourceId(action.workspace_id);
      setFocusedId(null);
      setView("workspaces");
      setLegend(`Blast radius from ${action.workspace_id}`);
    } else if (action.type === "focus_workspace") {
      setFocusedId(action.workspace_id);
      setBlastSourceId(null);
      setView("workspaces");
    } else if (action.type === "navigate_view") {
      const viewMap: Record<string, GraphView> = { workspaces: "workspaces", resources: "workspaces", providers: "workspaces" };
      setView(viewMap[action.view] ?? "workspaces");
    } else if (action.type === "show_provider_version") {
      setView("workspaces");
      setLegend(`Provider: ${action.provider_source}${action.version_exact ? ` @ ${action.version_exact}` : ""}`);
    }
  }, []);

  useImperativeHandle(ref, () => ({ dispatchAction }), [dispatchAction]);

  return (
    <div className="flex flex-col" style={{ height: "100%", borderLeft: "1px solid #E5E5EA", backgroundColor: "#fafafe" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: "#E5E5EA", backgroundColor: "#fff" }}>
        <div className="flex items-center gap-1">
          {(["workspaces", "resources", "providers"] as GraphView[]).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              fontSize: 11, fontWeight: view === v ? 600 : 400,
              color: view === v ? "#1060ff" : "#9B9CB8",
              padding: "2px 8px", borderRadius: 4,
              backgroundColor: view === v ? "rgba(16,96,255,0.08)" : "transparent",
              textTransform: "capitalize",
            }}>
              {v}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {blastSourceId && (
            <button onClick={() => { setBlastSourceId(null); setLegend(null); }} style={{ fontSize: 11, color: "#EF4444", padding: "2px 8px", borderRadius: 4, border: "1px solid rgba(239,68,68,0.25)", backgroundColor: "rgba(239,68,68,0.05)" }}>
              Exit blast mode ×
            </button>
          )}
          {focusedId && (
            <button onClick={() => setFocusedId(null)} style={{ fontSize: 11, color: "#9B9CB8" }}>
              Clear focus ×
            </button>
          )}
        </div>
      </div>

      {/* Legend */}
      {legend && (
        <div style={{ padding: "4px 12px", backgroundColor: "rgba(251,191,36,0.08)", borderBottom: "1px solid rgba(251,191,36,0.2)", fontSize: 11, color: "#D97706" }}>
          {legend}
        </div>
      )}

      {/* Graph */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={NODE_TYPES}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) => onWorkspaceClick?.(node.id)}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.3}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#e5e7eb" gap={20} />
          <Controls position="bottom-right" />
        </ReactFlow>
      </div>
    </div>
  );
});
