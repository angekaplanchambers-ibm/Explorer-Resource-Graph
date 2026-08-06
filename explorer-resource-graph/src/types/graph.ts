export interface GNode {
  id: string;
  label: string;
  sub: string;
  type: string;
  x: number;
  y: number;
  highlight?: boolean;
  failed?: boolean;
  drifted?: boolean;
}

export interface GEdge {
  from: string;
  to: string;
  highlight?: boolean;
  failed?: boolean;
  dashed?: boolean;
}

export interface GraphData {
  title: string;
  nodes: GNode[];
  edges: GEdge[];
}

export interface GraphWorkspaceNode {
  id: string;
  label: string;
  resourceCount: number;
  status: "healthy" | "failed" | "drifted";
  org: string;
}

export interface GraphWorkspaceEdge {
  source: string;
  target: string;
}

export type GraphView = "workspaces" | "resources" | "providers";

export interface GraphPanelState {
  view: GraphView;
  blastSourceId: string | null;
  focusedId: string | null;
  providerFilter: string | null;
}
