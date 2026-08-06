import type { GraphWorkspaceNode, GraphWorkspaceEdge } from "../types/graph";

export const MOCK_WORKSPACE_NODES: GraphWorkspaceNode[] = [
  { id: "ws-networking",  label: "networking-prod-core",      resourceCount: 61, status: "drifted",  org: "hashicorp-demo" },
  { id: "ws-payments-us", label: "payments-prod-us-east",     resourceCount: 47, status: "failed",   org: "hashicorp-demo" },
  { id: "ws-payments-eu", label: "payments-prod-eu-west",     resourceCount: 43, status: "failed",   org: "hashicorp-demo" },
  { id: "ws-api-gw",      label: "api-gateway-prod",          resourceCount: 22, status: "failed",   org: "hashicorp-demo" },
  { id: "ws-auth",        label: "auth-service-prod",         resourceCount: 29, status: "healthy",  org: "hashicorp-demo" },
  { id: "ws-data",        label: "data-pipeline-prod",        resourceCount: 35, status: "healthy",  org: "hashicorp-demo" },
  { id: "ws-cdn",         label: "cdn-global-prod",           resourceCount: 12, status: "healthy",  org: "hashicorp-demo" },
  { id: "ws-inventory",   label: "inventory-service-staging", resourceCount: 18, status: "healthy",  org: "hashicorp-demo" },
];

export const MOCK_WORKSPACE_EDGES: GraphWorkspaceEdge[] = [
  { source: "ws-networking",  target: "ws-payments-us" },
  { source: "ws-networking",  target: "ws-payments-eu" },
  { source: "ws-networking",  target: "ws-api-gw" },
  { source: "ws-networking",  target: "ws-auth" },
  { source: "ws-networking",  target: "ws-data" },
  { source: "ws-data",        target: "ws-cdn" },
  { source: "ws-auth",        target: "ws-payments-us" },
];

export const BLAST_RADIUS: Record<string, { hop: number; workspaceId: string }[]> = {
  "ws-networking": [
    { hop: 1, workspaceId: "ws-payments-us" },
    { hop: 1, workspaceId: "ws-payments-eu" },
    { hop: 1, workspaceId: "ws-api-gw" },
    { hop: 1, workspaceId: "ws-auth" },
    { hop: 1, workspaceId: "ws-data" },
    { hop: 2, workspaceId: "ws-cdn" },
  ],
};
