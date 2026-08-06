import type { ChatResponse } from "../types/chat";

const RESPONSES: Record<string, ChatResponse> = {
  blast: {
    reply: "**Blast radius of networking-prod-core**: 6 workspaces consume its outputs directly or transitively.\n\n**Hop 1** (5 workspaces): payments-prod-us-east, payments-prod-eu-west, api-gateway-prod, auth-service-prod, data-pipeline-prod\n**Hop 2** (1 workspace): cdn-global-prod (via data-pipeline-prod)\n\nA change to the VPC or subnet resources in this workspace would propagate to all 6 consumers. High blast-radius candidate — recommend opening a Workbench session for remediation planning.",
    tool_calls: [
      { name: "list_workspaces", args: { sort_by: "blast_radius" }, resultCount: 8 },
      { name: "get_blast_radius", args: { workspace_id: "networking-prod-core" }, resultCount: 6 },
      { name: "show_blast_radius", args: { workspace_id: "ws-networking" } },
    ],
    actions: [{ type: "show_blast_radius", workspace_id: "ws-networking" }],
  },
  instances: {
    reply: "Found **12 aws_instance resources** across 3 workspaces:\n\n- `payments-prod-us-east`: 4 instances (t3.xlarge, t3.large)\n- `api-gateway-prod`: 2 instances\n- `inventory-service-staging`: 6 instances\n\nFiltering table to show only `aws_instance` resources.",
    tool_calls: [
      { name: "list_resources", args: { resource_type: "aws_instance" }, resultCount: 12 },
    ],
    actions: [{ type: "filter_table", resource_type: "aws_instance" }],
  },
  providers: {
    reply: "Switching to Providers view. Your estate uses 3 providers:\n\n- `hashicorp/aws` — 6 workspaces\n- `hashicorp/azurerm` — 1 workspace\n- `hashicorp/google` — 1 workspace",
    tool_calls: [
      { name: "list_providers", args: {}, resultCount: 3 },
      { name: "navigate_view", args: { view: "providers" } },
    ],
    actions: [{ type: "navigate_view", view: "providers" }],
  },
  focus: {
    reply: "Focusing on **payments-prod-us-east** in the graph. This workspace has 47 resources and currently has **failed runs** due to a provider version conflict (`aws_security_group_rule.type` was removed in v5).\n\nDirect consumers: auth-service-prod (via IAM role outputs).",
    tool_calls: [
      { name: "list_workspaces", args: {}, resultCount: 8 },
      { name: "focus_workspace", args: { workspace_id: "ws-payments-us" } },
    ],
    actions: [{ type: "focus_workspace", workspace_id: "ws-payments-us" }],
  },
  provider_version: {
    reply: "Found **1 workspace** using `hashicorp/aws` at exact version `4.67.0`:\n\n- `payments-prod-eu-west` — version constraint `~> 4.0`, resolved to `4.67.0`\n\nHighlighting in the Providers graph view.",
    tool_calls: [
      { name: "list_providers", args: { provider_source: "hashicorp/aws", version_exact: "4.67.0" }, resultCount: 1 },
      { name: "show_provider_version", args: { provider_source: "hashicorp/aws", version_exact: "4.67.0" } },
    ],
    actions: [{ type: "show_provider_version", provider_source: "hashicorp/aws", version_exact: "4.67.0" }],
  },
  dependents: {
    reply: "Resources that depend on `aws_vpc.main` in networking-prod-core:\n\n**Direct (explicit)**:\n- `aws_instance.app_server[0]` (payments-prod-us-east)\n\n**Implicit attribute references**:\n- `aws_subnet.private_a` — via `vpc_id`\n- `aws_security_group.web_sg` — via `vpc_id`\n- `aws_nat_gateway.az_b` — via `subnet_id`\n- `aws_api_gateway_rest_api.main` — via explicit `depends_on`\n\nTotal: 5 dependents across 2 workspaces.",
    tool_calls: [
      { name: "list_workspaces", args: {}, resultCount: 8 },
      { name: "get_dependents", args: { address: "aws_vpc.main" }, resultCount: 5 },
    ],
    actions: [],
  },
};

const SUGGESTIONS = [
  { label: "Show blast radius of networking-prod-core", key: "blast" },
  { label: "Find all aws_instance resources", key: "instances" },
  { label: "Go to providers view", key: "providers" },
];

export function mockChat(query: string): Promise<ChatResponse> {
  const q = query.toLowerCase();
  let key = "dependents";
  if (q.includes("blast") || q.includes("networking")) key = "blast";
  else if (q.includes("instance") || q.includes("ec2")) key = "instances";
  else if (q.includes("provider") && q.includes("view")) key = "providers";
  else if (q.includes("payments") && q.includes("focus")) key = "focus";
  else if (q.includes("4.67") || q.includes("version")) key = "provider_version";

  return new Promise(resolve => setTimeout(() => resolve(RESPONSES[key]), 900));
}

export { SUGGESTIONS };
