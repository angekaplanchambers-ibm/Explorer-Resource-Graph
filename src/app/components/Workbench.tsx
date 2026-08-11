import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  X, Terminal, CheckCircle2, XCircle, AlertTriangle, Clock,
  ArrowRight, RefreshCw, Lock, Download, Plus,
  ChevronDown, Eye, FileText, Zap, ExternalLink,
} from "lucide-react";

// ── Meridian design tokens ────────────────────────────────────────────────────
const M = {
  dark: "#131313",
  darkPanel: "#1a1a1a",
  darkItem: "#262626",
  darkBorder: "#393939",
  mainBg: "#ffffff",
  rightBg: "#f4f8ff",
  rightBorder: "#e5e7eb",
  blue: "#0043ce",
  blueBg: "#edf2fc",
  blueLight: "#f0f6ff",
  green: "#24a148",
  greenBg: "#defbe6",
  amber: "#f1c21b",
  amberBg: "#fdf6dd",
  red: "#da1e28",
  redBg: "#fff1f1",
  inputBg: "#f1f3f7",
  textDark: "#161616",
  textMid: "#525252",
  textLight: "#777777",
  textWhite: "#f4f4f4",
  textDimWhite: "#c6c6c6",
  textMutedWhite: "#8d8d8d",
  metaColor: "rgba(37,37,37,0.6)",
  font: "'IBM Plex Sans', 'Inter', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

// ── Types ─────────────────────────────────────────────────────────────────────

interface DiffLine { type: "add" | "remove" | "context"; content: string; }
interface DiffFile  { name: string; changes: string; lines: DiffLine[]; }
interface CodeDiff  { prNumber: string; prTitle: string; files: DiffFile[]; }

interface Message {
  id: number;
  role: "user" | "system";
  text?: string;
  meta?: string;
  card?: WorkflowCardData;
  table?: TableData;
  finding?: FindingData;
  codeDiff?: CodeDiff;
  confirm?: { label: string; cardTitle?: string; continuation: Message[]; confirmDetails?: Array<{ label: string; value: string }>; silent?: boolean };
  confirmed?: boolean;
}

interface WorkflowCardData {
  title: string;
  description: string;
  tags: string[];
}

interface TableData {
  caption: string;
  columns: string[];
  rows: string[][];
  selectedRow?: number;
  multiSelect?: boolean;
  selectedRows?: number[];
}

interface FindingData {
  status: "failed" | "warn" | "ok" | "info";
  title: string;
  rows: Array<{ label: string; value: string; highlight?: boolean }>;
}

interface WorkflowStep {
  label: string;
  sublabel?: string;
  status: "done" | "active" | "pending";
}

interface Artifact {
  name: string;
  size: string;
}

interface Scenario {
  messages: Message[];
  steps: WorkflowStep[];
  artifacts: Artifact[];
  sessionTitle: string;
  sessionDesc: string;
  inspectorTab?: RightTab;
}

// ── Scenarios ─────────────────────────────────────────────────────────────────

let mid = 1;
function m(role: "user" | "system", text: string, meta?: string, extra?: Partial<Message>): Message {
  return { id: mid++, role, text, meta, ...extra };
}

const SCENARIOS: Record<string, Scenario> = {
  failed: {
    sessionTitle: "Failed Run Investigation · payments-prod",
    sessionDesc: "Inspect run state, policy check results, and cost impact across failed production runs.",
    steps: [
      { label: "Intent captured", status: "done" },
      { label: "Workspace bound", sublabel: "payments-prod-us-east", status: "done" },
      { label: "Run state retrieved", sublabel: "Run #run-xK29f", status: "done" },
      { label: "Policy results reviewed", sublabel: "cost-control-v2 failed", status: "active" },
      { label: "Cost impact assessed", status: "pending" },
      { label: "Next actions prepared", status: "pending" },
    ],
    artifacts: [
      { name: "Run state snapshot", size: "12 MB" },
      { name: "Policy failure report", size: "8 MB" },
      { name: "Cost delta analysis", size: "4 MB" },
    ],
    messages: [
      m("user", "Inspect failed production runs in the last hour"),
      m("system", "Select the investigation workflow you want to run:", "Checked 3 workspaces · View thinking", {
        card: {
          title: "Failed Run Investigation",
          description: "Inspect run state, policy check results, cost impact, and next valid actions for failed runs.",
          tags: ["Investigation", "Read-only"],
        },
      }),
      m("user", "Failed Run Investigation"),
      m("system", "Which workspace do you want to target?", "Workflow bound · Pulling workspace list", {
        table: {
          caption: "Select target workspace",
          columns: ["Workspace", "Status", "Last run", "Resources"],
          rows: [
            ["payments-prod-us-east", "Failed", "12m ago", "47"],
            ["payments-prod-eu-west", "Failed", "18m ago", "43"],
            ["api-gateway-prod", "Failed", "34m ago", "22"],
          ],
        },
      }),
      m("user", "payments-prod-us-east"),
      m("system", "Run #run-xK29f · Failed 12 minutes ago", "Bound to payments-prod-us-east · Pulling run data", {
        finding: {
          status: "failed",
          title: "Policy check failed · cost-control-v2",
          rows: [
            { label: "Run ID", value: "#run-xK29f" },
            { label: "Phase reached", value: "Plan completed → Policy FAILED" },
            { label: "Blocking policy", value: "cost-control-v2", highlight: true },
            { label: "Estimated cost", value: "$2,340/mo (limit: $2,000)", highlight: true },
            { label: "Cost delta", value: "+$312/mo vs previous run", highlight: true },
            { label: "Resources delta", value: "+2 add · ~3 change · 0 destroy" },
            { label: "State lock", value: "johndoe · 12 minutes ago" },
          ],
        },
        confirm: {
          cardTitle: "Failure confirmed · run #run-xK29f",
          label: "Prepare exception packet",
          continuation: [
            m("user", "Prepare exception packet"),
            m("system", "Pulling policy context and drafting exception packet for cost-control-v2…", "Routing to exception workflow"),
            m("system", "Exception packet drafted. Review and confirm to route for approval.", "Draft ready", {
              finding: {
                status: "info",
                title: "Exception request · cost-control-v2 · EXC-2024-001",
                rows: [
                  { label: "Run", value: "#run-xK29f · payments-prod-us-east" },
                  { label: "Overage", value: "+$340/mo vs $2,000 limit", hi: true },
                  { label: "Justification", value: "RDS upgrade required for performance SLA" },
                  { label: "Approver required", value: "platform-leads (any 1 of 3)" },
                ],
              },
            }),
          ],
        },
      }),
    ],
  },
  drift: {
    sessionTitle: "Drift Remediation · networking-prod",
    sessionDesc: "Inspect drifted resources and prepare a state reconciliation plan for production networking.",
    steps: [
      { label: "Intent captured", status: "done" },
      { label: "Workspaces scanned", sublabel: "2 of 6 drifted", status: "done" },
      { label: "Drift resources grouped", sublabel: "4 resources", status: "active" },
      { label: "Remediation plan generated", status: "pending" },
      { label: "Policy checks", status: "pending" },
      { label: "Approval requested", status: "pending" },
    ],
    artifacts: [
      { name: "State diff · networking-prod", size: "18 MB" },
      { name: "Remediation plan", size: "6 MB" },
    ],
    messages: [
      m("user", "Prepare drift remediation for networking-prod-core"),
      m("system", "Select the remediation workflow:", "Checked state across 6 workspaces · View thinking", {
        card: {
          title: "Drift Remediation",
          description: "Compare remote state to actual cloud state, group drifted resources, and generate a remediation plan.",
          tags: ["Mutating", "Approval required"],
        },
      }),
      m("user", "Drift Remediation"),
      m("system", "Drift detected in 2 workspaces. Confirming target:", "Bound to networking-prod-core · Pulling state", {
        finding: {
          status: "warn",
          title: "4 resources drifted outside Terraform",
          rows: [
            { label: "Workspace", value: "networking-prod-core" },
            { label: "aws_route_table.private-rt", value: "2 routes removed", highlight: true },
            { label: "aws_nat_gateway.az-b", value: "Deleted outside Terraform", highlight: true },
            { label: "payments-prod-eu-west", value: "2 additional resources" },
            { label: "Remediation", value: "modify 2, recreate 1, add 0" },
          ],
        },
        confirm: {
          cardTitle: "Drift confirmed · 4 resources · networking-prod-core",
          label: "Confirm findings · generate remediation plan",
          continuation: [
            m("user", "Confirmed — generate remediation plan"),
            m("system", "Generating remediation plan for networking-prod-core…", "Pulling current state · Checking policy compliance"),
            m("system", "Remediation plan ready. Review before requesting approval.", "Plan generated · Policy checks passed", {
              finding: {
                status: "info",
                title: "Remediation plan ready · networking-prod-core",
                rows: [
                  { label: "aws_route_table.private-rt", value: "Restore 2 removed routes", hi: true },
                  { label: "aws_nat_gateway.az-b", value: "Recreate deleted gateway", hi: true },
                  { label: "payments-prod-eu-west", value: "Revert 2 modified resources" },
                  { label: "Estimated downtime", value: "~3 min during NAT recreation" },
                  { label: "Approval required", value: "Before any changes apply" },
                ],
              },
            }),
          ],
        },
      }),
    ],
  },
  default: {
    sessionTitle: "Infrastructure Inspection",
    sessionDesc: "Search and inspect resources, workspaces, runs, and policy results across your estate.",
    steps: [
      { label: "Intent captured", status: "done" },
      { label: "Workspace context bound", status: "active" },
      { label: "State retrieved", status: "pending" },
      { label: "Results prepared", status: "pending" },
    ],
    artifacts: [],
    messages: [
      m("system", "Select the workflow you want to run:", "Ready · Awaiting intent", {
        card: {
          title: "Infrastructure Inspection",
          description: "Search and inspect resources, runs, workspaces, and policy results across your Terraform estate.",
          tags: ["Investigation", "Read-only"],
        },
      }),
    ],
  },

  // ── Drift next-step scenarios (entered from control bar summary) ─────────────

  inspect_drift: {
    sessionTitle: "Drift Inspection · my-workspace",
    sessionDesc: "Detailed analysis of the drifted resource on my-workspace.",
    inspectorTab: "Resources",
    steps: [
      { label: "Workspace bound", sublabel: "my-workspace", status: "done" },
      { label: "State snapshot retrieved", sublabel: "48 resources checked", status: "done" },
      { label: "Drift identified", sublabel: "aws_instance.worker", status: "done" },
      { label: "Change analysed", sublabel: "Type: t3.medium → t3.large", status: "active" },
      { label: "Next actions prepared", status: "pending" },
    ],
    artifacts: [
      { name: "State diff · my-workspace", size: "6 MB" },
      { name: "Drift analysis report", size: "3 MB" },
    ],
    messages: [
      m("user", "Inspect drift details"),
      m("system", "Drift confirmed on my-workspace. 1 resource changed outside Terraform.", "Bound to my-workspace · Comparing state", {
        finding: {
          status: "warn",
          title: "aws_instance.worker — instance type changed outside Terraform",
          rows: [
            { label: "Resource", value: "aws_instance.worker" },
            { label: "Expected type", value: "t3.medium (last applied)" },
            { label: "Actual type", value: "t3.large (current AWS state)", hi: true },
            { label: "Change detected", value: "18 hours ago" },
            { label: "Last Terraform apply", value: "24 hours ago" },
            { label: "Cost impact", value: "+$47/mo (t3.large is $94/mo vs $47)", hi: true },
          ],
        },
      }),
      m("system", "This change was made directly in AWS — not through Terraform. Your next Terraform apply will attempt to revert it back to t3.medium unless you update your configuration first.", "Checked AWS CloudTrail · 1 event found", {
        confirm: {
          cardTitle: "Drift analysis complete · aws_instance.worker",
          label: "Prepare remediation plan",
          continuation: [
            m("user", "Prepare remediation plan"),
            m("system", "Generating remediation plan to revert aws_instance.worker to t3.medium…", "Pulling plan · Checking policy compliance"),
            m("system", "Plan ready. Confirm to request approval and apply.", "Plan generated · No policy conflicts", {
              finding: {
                status: "info",
                title: "Remediation plan · aws_instance.worker · my-workspace",
                rows: [
                  { label: "Action", value: "Revert t3.large → t3.medium", hi: true },
                  { label: "Cost saving", value: "-$47/mo after apply" },
                  { label: "Downtime", value: "~2 min (instance restart)" },
                  { label: "Approval", value: "Required before apply" },
                ],
              },
            }),
          ],
        },
      }),
    ],
  },

  remediation_plan: {
    sessionTitle: "Drift Remediation · my-workspace",
    sessionDesc: "Generate and review a plan to reconcile drifted state on my-workspace.",
    inspectorTab: "Overview",
    steps: [
      { label: "Workspace bound", sublabel: "my-workspace", status: "done" },
      { label: "Drift confirmed", sublabel: "1 resource", status: "done" },
      { label: "Remediation plan generated", sublabel: "terraform plan ready", status: "active" },
      { label: "Policy checks", status: "pending" },
      { label: "Approval required", status: "pending" },
      { label: "Apply changes", status: "pending" },
    ],
    artifacts: [
      { name: "Remediation plan · my-workspace", size: "4 MB" },
      { name: "Cost impact analysis", size: "2 MB" },
    ],
    messages: [
      m("user", "Prepare drift remediation for my-workspace"),
      m("system", "Binding target workspace and pulling current drift state…", "Bound to my-workspace · Pulling state"),
      m("system", "Remediation plan generated. Review before approving.", "Plan generated · Policy checks pending", {
        finding: {
          status: "warn",
          title: "Proposed remediation: revert aws_instance.worker to t3.medium",
          rows: [
            { label: "Action", value: "Change instance type: t3.large → t3.medium", hi: true },
            { label: "Reason", value: "Revert to last Terraform-managed state" },
            { label: "Cost after apply", value: "-$47/mo (savings)" },
            { label: "Downtime expected", value: "~2 min (instance restart required)", hi: true },
            { label: "Policy checks", value: "Running…" },
            { label: "Approval", value: "Required before apply" },
          ],
        },
      }),
      m("system", "Review the plan above. Confirm to run policy checks and submit for approval.", undefined, {
        confirm: {
          cardTitle: "Confirm remediation plan · my-workspace",
          label: "Confirm plan · request approval",
          continuation: [
            m("user", "Plan confirmed — request approval"),
            m("system", "Running policy checks…", "Checking cost-control-v2 · compliance-v2"),
            m("system", "Policy checks passed. Approval request sent to platform-leads.", "Approval request dispatched · EXC-2024-002", {
              finding: {
                status: "ok",
                title: "Approval requested · Drift remediation · my-workspace",
                rows: [
                  { label: "Request ID", value: "EXC-2024-002" },
                  { label: "Approver", value: "platform-leads (any 1 of 3)" },
                  { label: "Policy checks", value: "Passed · no conflicts" },
                  { label: "On approval", value: "Remediation applies on next run" },
                ],
              },
            }),
          ],
        },
      }),
    ],
  },

  state_diff: {
    sessionTitle: "State Diff · my-workspace",
    sessionDesc: "Full comparison of expected vs actual infrastructure state.",
    inspectorTab: "Resources",
    steps: [
      { label: "Workspace bound", sublabel: "my-workspace", status: "done" },
      { label: "State snapshots compared", sublabel: "Expected vs actual", status: "done" },
      { label: "Divergences identified", sublabel: "1 resource", status: "active" },
      { label: "Next actions prepared", status: "pending" },
    ],
    artifacts: [
      { name: "Full state diff · my-workspace", size: "8 MB" },
    ],
    messages: [
      m("user", "View full state diff"),
      m("system", "Comparing Terraform state file to actual AWS resource state.", "Fetched state · 48 resources compared"),
      m("system", "1 divergence found. 47 resources are in sync.", "State comparison complete", {
        table: {
          caption: "Full state diff · my-workspace",
          columns: ["Resource", "Expected (Terraform)", "Actual (AWS)", "Status"],
          rows: [
            ["aws_instance.worker", "t3.medium", "t3.large", "DRIFTED"],
            ["aws_vpc.main", "10.0.0.0/16", "10.0.0.0/16", "In sync"],
            ["aws_rds_instance.db", "db.r6g.large", "db.r6g.large", "In sync"],
            ["aws_s3_bucket.artifacts", "private", "private", "In sync"],
          ],
        },
      }),
      m("system", "The drifted resource (aws_instance.worker) was resized from t3.medium to t3.large ~18 hours ago. All other 47 resources match their expected state.", undefined, {
        confirm: {
          cardTitle: "State diff confirmed · 1 divergence",
          label: "Prepare drift remediation",
          continuation: [
            m("user", "Prepare remediation"),
            m("system", "Generating remediation plan to reconcile aws_instance.worker…", "Pulling plan · Policy checks running"),
            m("system", "Plan ready. Revert instance type to expected state.", "Policy checks passed", {
              finding: {
                status: "info",
                title: "Remediation plan · revert aws_instance.worker",
                rows: [
                  { label: "Change", value: "t3.large → t3.medium (expected state)", hi: true },
                  { label: "Cost saving", value: "-$47/mo" },
                  { label: "Downtime", value: "~2 min" },
                  { label: "Approval", value: "Required before apply" },
                ],
              },
            }),
          ],
        },
      }),
    ],
  },

  // ── Policy failure next-step scenarios ──────────────────────────────────────

  inspect_policy: {
    sessionTitle: "Policy Failure Investigation · run #run-xK29f",
    sessionDesc: "Inspect why cost-control-v2 blocked this run and what drove the cost increase.",
    inspectorTab: "Policy",
    steps: [
      { label: "Run bound", sublabel: "#run-xK29f", status: "done" },
      { label: "Policy results retrieved", sublabel: "cost-control-v2 failed", status: "done" },
      { label: "Cost drivers identified", sublabel: "RDS upgrade +$286/mo", status: "active" },
      { label: "Next actions prepared", status: "pending" },
    ],
    artifacts: [
      { name: "Policy check results", size: "2 MB" },
      { name: "Cost delta report", size: "4 MB" },
    ],
    messages: [
      m("user", "Inspect policy failure details on run-xK29f"),
      m("system", "Policy check results retrieved for run #run-xK29f.", "Bound to run · Pulling policy results", {
        finding: {
          status: "failed",
          title: "cost-control-v2 · Monthly cost limit exceeded",
          rows: [
            { label: "Policy", value: "cost-control-v2" },
            { label: "Threshold", value: "$2,000/mo" },
            { label: "Estimated cost", value: "$2,340/mo", hi: true },
            { label: "Overage", value: "+$340/mo (+17% over limit)", hi: true },
            { label: "Primary cost driver", value: "RDS db.r6g.large → db.r6g.2xlarge (+$286/mo)", hi: true },
            { label: "Phase blocked", value: "Policy check (step 3 of 5)" },
          ],
        },
      }),
      m("system", "The RDS instance class upgrade accounts for $286 of the $340 overage. The policy will continue to block until cost falls under $2,000/mo or an exception is approved.", "Checked cost breakdown · 1 root cause found", {
        confirm: {
          cardTitle: "Policy failure confirmed · cost-control-v2",
          label: "Prepare exception packet",
          continuation: [
            m("user", "Prepare exception packet"),
            m("system", "Drafting exception packet for cost-control-v2 on run #run-xK29f…", "Pulling policy context · Preparing draft"),
            m("system", "Exception packet drafted. Review and confirm to route for approval.", "Draft ready · Approver lookup complete", {
              finding: {
                status: "info",
                title: "Exception request · cost-control-v2 · EXC-2024-001",
                rows: [
                  { label: "Run", value: "#run-xK29f · payments-prod-us-east" },
                  { label: "Requested amount", value: "$2,340/mo (+$340)", hi: true },
                  { label: "Justification", value: "RDS upgrade required for performance SLA" },
                  { label: "Approver required", value: "platform-leads (any 1 of 3)" },
                ],
              },
            }),
          ],
        },
      }),
    ],
  },

  policy_exception: {
    sessionTitle: "Policy Exception · cost-control-v2 · run #run-xK29f",
    sessionDesc: "Draft and route an exception packet for the cost-control-v2 policy failure.",
    inspectorTab: "Overview",
    steps: [
      { label: "Run bound", sublabel: "#run-xK29f", status: "done" },
      { label: "Policy context retrieved", sublabel: "cost-control-v2", status: "done" },
      { label: "Exception packet drafted", sublabel: "awaiting your review", status: "active" },
      { label: "Approver notified", status: "pending" },
      { label: "Exception granted", status: "pending" },
      { label: "Run unblocked", status: "pending" },
    ],
    artifacts: [
      { name: "Exception packet draft", size: "1 MB" },
      { name: "Cost justification", size: "2 MB" },
    ],
    messages: [
      m("user", "Prepare policy exception packet for run-xK29f"),
      m("system", "Pulling policy context for cost-control-v2 on run #run-xK29f…", "Bound to run · Pulling policy context"),
      m("system", "Exception packet drafted.", "Draft ready · Approver lookup complete", {
        finding: {
          status: "info",
          title: "Exception request · cost-control-v2",
          rows: [
            { label: "Run", value: "#run-xK29f · payments-prod-us-east" },
            { label: "Requested by", value: "jdoe" },
            { label: "Policy threshold", value: "$2,000/mo" },
            { label: "Requested amount", value: "$2,340/mo (+$340)", hi: true },
            { label: "Justification", value: "RDS upgrade required for performance SLA" },
            { label: "Approver required", value: "platform-leads (any 1 of 3)" },
            { label: "Exception expires", value: "30 days after approval" },
          ],
        },
        confirm: {
          cardTitle: "Confirm exception packet details",
          label: "Confirm details & select approver",
          continuation: [
            m("user", "Details confirmed — select approver"),
            m("system", "Select the approver from platform-leads:", "Approver list retrieved · 3 available", {
              table: {
                caption: "Select approver for exception EXC-2024-001",
                columns: ["Approver", "Role", "Last active", "Status"],
                rows: [
                  ["Sarah Chen", "Platform Lead", "2h ago", "Available"],
                  ["Mike Torres", "Platform Lead", "1d ago", "Available"],
                  ["Alex Kim", "Platform Lead", "3d ago", "Away"],
                ],
              },
              confirm: {
                cardTitle: "Confirm approver selection",
                label: "Confirm and send for approval",
                continuation: [
                  m("user", "Send to Sarah Chen"),
                  m("system", "Exception request sent to Sarah Chen.", "Notification dispatched · EXC-2024-001", {
                    finding: {
                      status: "info",
                      title: "Approval request sent · EXC-2024-001",
                      rows: [
                        { label: "Request ID", value: "EXC-2024-001" },
                        { label: "Approver", value: "Sarah Chen (Platform Lead)" },
                        { label: "Status", value: "Awaiting approval" },
                        { label: "Expected response", value: "24–48 hours" },
                        { label: "On approval", value: "Run #run-xK29f unblocked automatically" },
                      ],
                    },
                  }),
                  m("system", "Monitor progress in the Sessions tab. Sarah Chen will receive a one-click approval link by email."),
                ],
              },
            }),
          ],
        },
      }),
    ],
  },

  policy_cost_breakdown: {
    sessionTitle: "Cost Analysis · run #run-xK29f · payments-prod",
    sessionDesc: "Full cost breakdown for the run that triggered the cost-control-v2 policy failure.",
    inspectorTab: "Cost",
    steps: [
      { label: "Run bound", sublabel: "#run-xK29f", status: "done" },
      { label: "State file parsed", sublabel: "47 resources", status: "done" },
      { label: "Cost breakdown generated", status: "active" },
      { label: "Optimization options identified", status: "pending" },
    ],
    artifacts: [
      { name: "Cost analysis · run #run-xK29f", size: "4 MB" },
      { name: "Optimization recommendations", size: "2 MB" },
    ],
    messages: [
      m("user", "tf-audit --cost for run-xK29f"),
      m("system", "Parsing state file for run #run-xK29f. Fetching AWS pricing…", "State file loaded · 47 resources · 6 modules"),
      m("system", "Cost breakdown complete. $340/mo over the $2,000 policy threshold.", "AWS pricing API · completed", {
        finding: {
          status: "failed",
          title: "Total estimated cost: $2,340.18/mo · Budget: $2,000",
          rows: [
            { label: "RDS db.r6g.2xlarge", value: "$892.44/mo", hi: true },
            { label: "EC2 t3.xlarge ×4", value: "$583.20/mo" },
            { label: "NAT Gateway", value: "$146.00/mo" },
            { label: "Load Balancer", value: "$64.80/mo" },
            { label: "S3 + misc", value: "$653.74/mo" },
            { label: "Delta vs last run", value: "+$312/mo (RDS upgrade)", hi: true },
          ],
        },
      }),
      m("system", "To bring this run under the $2,000 threshold, revert the RDS class to db.r6g.large (-$286/mo) or request a policy exception for the new cost level.", undefined, {
        confirm: {
          cardTitle: "Cost analysis confirmed · choose next action",
          label: "Prepare exception packet",
          continuation: [
            m("user", "Prepare exception packet"),
            m("system", "Drafting cost exception packet for cost-control-v2…", "Pulling policy context · Preparing draft"),
            m("system", "Exception packet drafted. Review and confirm to route for approval.", "Draft ready", {
              finding: {
                status: "info",
                title: "Cost exception request · EXC-2024-001",
                rows: [
                  { label: "Overage", value: "+$340/mo vs $2,000 limit", hi: true },
                  { label: "Primary driver", value: "RDS db.r6g.2xlarge (+$286/mo)" },
                  { label: "Justification", value: "RDS upgrade required for performance SLA" },
                  { label: "Approver", value: "platform-leads (any 1 of 3)" },
                ],
              },
            }),
          ],
        },
      }),
    ],
  },

  // ── Automated upgrade workflows ───────────────────────────────────────────────

  terraform_upgrade: {
    sessionTitle: "Terraform Version Upgrade · 1.9.8",
    sessionDesc: "Staged upgrade campaign across 8 workspaces — constraint analysis, config PRs, 3-wave rollout with dependency-aware sequencing.",
    inspectorTab: "Overview",
    steps: [
      { label: "Version inventory",       sublabel: "8 of 24 workspaces need upgrade",   status: "done" },
      { label: "Constraint analysis",     sublabel: "2 required_version conflicts found", status: "done" },
      { label: "Dependency mapping",      sublabel: "1 remote_state ordering constraint", status: "done" },
      { label: "Risk classification",     sublabel: "2 HIGH · 3 MEDIUM · 3 LOW",         status: "done" },
      { label: "Confirm assessment",                                                       status: "active" },
      { label: "Confirm rollout plan",                                                     status: "pending" },
      { label: "Pre-flight simulation",                                                    status: "pending" },
      { label: "Wave 1",                  sublabel: "3 low-risk workspaces",              status: "pending" },
      { label: "Wave 2",                  sublabel: "3 medium-risk workspaces",           status: "pending" },
      { label: "Wave 3",                  sublabel: "2 production workspaces",            status: "pending" },
      { label: "Post-upgrade verification",                                                status: "pending" },
    ],
    artifacts: [
      { name: "Version inventory report", size: "4 MB" },
      { name: "Constraint analysis",      size: "2 MB" },
      { name: "Dependency graph",         size: "3 MB" },
      { name: "Rollout plan",             size: "5 MB" },
      { name: "Pre-flight simulation",    size: "8 MB" },
    ],
    messages: [
      m("user", "Upgrade Terraform version across all workspaces"),

      // ── PHASE 1: Inventory scan ───────────────────────────────────────────────
      m("system", "Scanning all 24 workspaces. Reading required_version constraints, current version pins, and cross-workspace remote_state references.", "Querying workspace settings · Parsing config constraints · Mapping remote_state references"),

      m("system", "8 workspaces are running Terraform versions below 1.9.8. Found 2 required_version constraint conflicts and 1 remote_state ordering dependency.", "Inventory complete · 2 constraint conflicts identified · 1 dependency chain", {
        table: {
          caption: "Version inventory · 8 workspaces eligible for upgrade · target 1.9.8",
          columns: ["Workspace", "Current", "Constraint", "Blocker"],
          rows: [
            ["auth-service-prod",        "1.7.2", "none",                 "—"],
            ["cdn-global-prod",          "1.6.5", "none",                 "—"],
            ["inventory-staging",        "1.6.1", "none",                 "—"],
            ["data-pipeline-prod",       "1.7.0", "none",                 "—"],
            ["networking-prod-core",     "1.7.4", ">= 1.6",              "—"],
            ["api-gateway-prod",         "1.6.8", "~> 1.6",              "⚠ constraint conflict"],
            ["payments-prod-us-east",    "1.5.7", "~> 1.5",              "⚠ constraint + deprecated syntax"],
            ["payments-prod-eu-west",    "1.7.1", "none",                 "blocked until networking-prod-core upgrades"],
          ],
        },
      }),

      m("system", "2 workspaces have required_version constraints that prevent upgrading to 1.9.8. Operator can auto-generate the config fixes as part of the upgrade plan.", "Constraint analysis complete · auto-fix available for both", {
        finding: {
          status: "warn",
          title: "2 required_version constraint conflicts · both auto-fixable",
          rows: [
            { label: "api-gateway-prod",       value: 'required_version = "~> 1.6" — blocks 1.9.x · PR needed', hi: true },
            { label: "Auto-fix",               value: 'versions.tf: "~> 1.6" → ">= 1.6, < 2.0" · 1 line' },
            { label: "payments-prod-us-east",  value: 'required_version = "~> 1.5" — blocks 1.6+ · PR needed', hi: true },
            { label: "Auto-fix",               value: 'versions.tf: "~> 1.5" → ">= 1.5, < 2.0" + fix deprecated terraform_remote_state backend syntax · 3 lines' },
            { label: "Config PRs",             value: "2 will be generated and must be merged before affected waves execute" },
          ],
        },
      }),

      // Confirm risk assessment before proceeding
      m("system", "Risk classification complete. Review before confirming the rollout plan.", "Risk matrix complete · Rollback window noted", {
        finding: {
          status: "warn",
          title: "8 workspaces · 2 HIGH · 3 MEDIUM · 3 LOW",
          rows: [
            { label: "HIGH (2)",        value: "payments-prod-us-east · payments-prod-eu-west · production traffic", hi: true },
            { label: "MEDIUM (3)",      value: "networking-prod-core · api-gateway-prod · data-pipeline-prod" },
            { label: "LOW (3)",         value: "auth-service-prod · cdn-global-prod · inventory-staging" },
            { label: "Rollback window", value: "Closes after each workspace's first successful run on 1.9.8 — state files sealed to new format", hi: true },
            { label: "Dependency",      value: "payments-prod-eu-west blocked until networking-prod-core completes Wave 2" },
          ],
        },
        confirm: {
          cardTitle: "Confirm risk assessment · proceed to rollout plan",
          label: "Assessment confirmed · build rollout plan",
          continuation: [
            m("user", "Assessment confirmed — build rollout plan"),

            // ── PHASE 2: Rollout plan ─────────────────────────────────────────
            m("system", "Generating 3-wave rollout plan. Ordering by risk level and remote_state dependency graph. Queuing 2 config PRs for constraint fixes.", "Building wave order · Dependency graph applied · Config PRs queued"),

            m("system", "Rollout plan ready. 2 config PRs are included — they gate the waves that depend on them.", "Rollout plan generated · Rollback scripts ready · Config PRs generated", {
              finding: {
                status: "info",
                title: "3-wave rollout · 2 config PRs gate Wave 2 and Wave 3",
                rows: [
                  { label: "Wave 1 · LOW (3)",    value: "auth-service-prod · cdn-global-prod · inventory-staging · no blockers" },
                  { label: "Wave 2 · MEDIUM (3)", value: "data-pipeline-prod · networking-prod-core · api-gateway-prod (after PR #312)" },
                  { label: "Wave 3 · HIGH (2)",   value: "payments-prod-eu-west (after Wave 2) · payments-prod-us-east (after PR #318)" },
                  { label: "PR #312",             value: "api-gateway-prod/versions.tf · ~> 1.6 → >= 1.6, < 2.0 · must merge before Wave 2", hi: true },
                  { label: "PR #318",             value: "payments-prod-us-east/versions.tf + backend syntax · must merge before Wave 3", hi: true },
                  { label: "Sequencing rule",     value: "networking-prod-core must be healthy before payments-prod-eu-west is permitted" },
                  { label: "Rollback",            value: "Automatic version revert on health check failure · window closes post-state-write" },
                ],
              },
              confirm: {
                cardTitle: "Confirm rollout plan · run pre-flight simulation",
                label: "Plan confirmed · run pre-flight simulation",
                continuation: [
                  m("user", "Plan confirmed — run pre-flight simulation"),

                  // ── PHASE 3: Pre-flight simulation ────────────────────────────
                  m("system", "Running terraform plan against 1.9.8 for all 8 workspaces. No changes will be applied — this validates plan cleanliness and surfaces any unexpected diffs before the campaign begins.", "Simulating all 8 workspaces · No runs triggered · Checking for plan deltas"),

                  m("system", "Pre-flight simulation complete. 7 clean plans. 1 cosmetic advisory on data-pipeline-prod — a CloudWatch log group type annotation that 1.9.x surfaces explicitly. Not blocking.", "Simulation complete · 7 clean · 1 advisory · 0 breaking changes", {
                    table: {
                      caption: "Pre-flight simulation · all 8 workspaces · Terraform 1.9.8",
                      columns: ["Workspace", "Wave", "Plan result", "Notes"],
                      rows: [
                        ["auth-service-prod",        "W1", "✓ Clean",    "0 resource changes"],
                        ["cdn-global-prod",           "W1", "✓ Clean",    "0 resource changes"],
                        ["inventory-staging",         "W1", "✓ Clean",    "0 resource changes"],
                        ["data-pipeline-prod",        "W2", "⚠ Advisory", "aws_cloudwatch_log_group: log_format annotation · cosmetic · no data impact"],
                        ["networking-prod-core",      "W2", "✓ Clean",    "0 resource changes"],
                        ["api-gateway-prod",          "W2", "✓ Clean",    "post PR #312 merge · 0 changes"],
                        ["payments-prod-eu-west",     "W3", "✓ Clean",    "post networking-prod-core Wave 2 · 0 changes"],
                        ["payments-prod-us-east",     "W3", "✓ Clean",    "post PR #318 merge · 0 net changes"],
                      ],
                    },
                  }),
                  m("system", "All simulations passed. Ready to begin Wave 1.", undefined, {
                    confirm: {
                      cardTitle: "Approve Wave 1 · 3 low-risk workspaces",
                      label: "Approve Wave 1 · Begin upgrades",
                      continuation: [
                        m("user", "Wave 1 approved"),
                        m("system", "Pinning Terraform 1.9.8 on 3 workspaces. Upgrade applies on each workspace's next triggered run — no force-apply issued.", "Version pinned in workspace settings · Queued runs checked · Workspace owners notified"),
                        m("system", "Wave 1 complete. All 3 workspaces healthy. State files are now sealed to 1.9.8 format — rollback beyond this point would require state manipulation.", "Health checks passed · Runs verified · State format upgraded", {
                          finding: {
                            status: "ok",
                            title: "Wave 1 complete · 3/3 on Terraform 1.9.8",
                            rows: [
                              { label: "auth-service-prod",  value: "1.9.8 · Run passed · 0 plan delta · Healthy" },
                              { label: "cdn-global-prod",     value: "1.9.8 · Run passed · 0 plan delta · Healthy" },
                              { label: "inventory-staging",   value: "1.9.8 · Run passed · 0 plan delta · Healthy" },
                              { label: "State lock",          value: "State files sealed to 1.9.8 — version revert requires state surgery if runs complete", hi: true },
                              { label: "Next",                value: "Wave 2 · PR #312 must be merged before api-gateway-prod can proceed" },
                            ],
                          },
                        }),

                        // Wave 2 pre-flight
                        m("system", "Wave 2 ready. PR #312 must be merged before api-gateway-prod proceeds. data-pipeline-prod and networking-prod-core have no blockers — they can upgrade immediately.", "Wave 2 pre-flight passed · PR #312 pending · 2 workspaces clear", {
                          finding: {
                            status: "info",
                            title: "Wave 2 · 2 clear · 1 waiting on PR #312",
                            rows: [
                              { label: "data-pipeline-prod",   value: "Clear · log_format advisory acknowledged in simulation · upgrading" },
                              { label: "networking-prod-core",  value: "Clear · 0 plan changes · upgrading" },
                              { label: "PR #312",               value: "api-gateway-prod/versions.tf · ~> 1.6 → >= 1.6, < 2.0 · ready to merge", hi: true },
                              { label: "After PR merge",        value: "api-gateway-prod will join Wave 2 automatically" },
                              { label: "Dependency note",       value: "networking-prod-core completion unblocks payments-prod-eu-west for Wave 3" },
                            ],
                          },
                          confirm: {
                            cardTitle: "PR #312 merged · approve Wave 2",
                            label: "PR #312 merged · Approve Wave 2",
                            continuation: [
                              m("user", "PR #312 merged — approve Wave 2"),
                              m("system", "Pinning 1.9.8 on data-pipeline-prod, networking-prod-core, and api-gateway-prod.", "Version pinned on 3 workspaces · Runs queued · Pre-run checks complete"),
                              m("system", "Wave 2 complete. All 3 healthy. networking-prod-core upgrade unlocks payments-prod-eu-west for Wave 3.", "Health checks passed · Dependency gate cleared · Wave 3 unblocked", {
                                finding: {
                                  status: "ok",
                                  title: "Wave 2 complete · 3/3 on Terraform 1.9.8",
                                  rows: [
                                    { label: "data-pipeline-prod",   value: "1.9.8 · Run passed · log_format annotation applied · Healthy" },
                                    { label: "api-gateway-prod",      value: "1.9.8 · Run passed · 0 net resource changes · Healthy" },
                                    { label: "networking-prod-core",  value: "1.9.8 · Run passed · Healthy · payments-prod-eu-west now unblocked", hi: true },
                                    { label: "Next",                  value: "Wave 3 · PR #318 must merge for payments-prod-us-east" },
                                  ],
                                },
                              }),

                              // Wave 3 pre-flight
                              m("system", "Wave 3 pre-flight: both production workspaces confirmed ready. PR #318 must be merged before payments-prod-us-east can proceed. payments-prod-eu-west dependency gate is now cleared.", "Wave 3 pre-flight complete · PR #318 pending · both workspaces carry live traffic", {
                                finding: {
                                  status: "warn",
                                  title: "Wave 3 · production workspaces · PR #318 pending merge",
                                  rows: [
                                    { label: "PR #318",               value: "payments-prod-us-east · versions.tf + deprecated backend syntax fix · 3 lines · ready to merge", hi: true },
                                    { label: "payments-prod-eu-west",  value: "Dependency gate cleared · 0 plan changes · ready" },
                                    { label: "Traffic",               value: "Both workspaces carry live production payment traffic" },
                                    { label: "Verification",          value: "5-point post-apply check: connectivity · DNS · TLS · latency · run health" },
                                    { label: "Rollback",              value: "Automatic version revert within 60s if any health check fails · state surgery required if runs complete", hi: true },
                                  ],
                                },
                                confirm: {
                                  cardTitle: "PR #318 merged · approve Wave 3 · Production",
                                  label: "PR #318 merged · Approve Wave 3",
                                  continuation: [
                                    m("user", "PR #318 merged — approve Wave 3"),
                                    m("system", "Pinning 1.9.8 on both production workspaces. Monitoring run health and traffic in real time.", "Version pinned · Traffic monitoring enabled · Rollback armed"),
                                    m("system", "✅ Upgrade campaign complete. All 8 workspaces on Terraform 1.9.8. 0 rollbacks. 0 incidents.", "All health checks passed · State files upgraded · Campaign closed", {
                                      finding: {
                                        status: "ok",
                                        title: "Upgrade complete · 8/8 workspaces on Terraform 1.9.8",
                                        rows: [
                                          { label: "payments-prod-us-east",  value: "1.9.8 · Healthy · 0 incidents · constraint + syntax fixed", hi: true },
                                          { label: "payments-prod-eu-west",  value: "1.9.8 · Healthy · 0 incidents", hi: true },
                                          { label: "All 8 workspaces",       value: "Terraform 1.9.8 · state files upgraded · all healthy" },
                                          { label: "Config PRs merged",      value: "2 of 2 · PR #312 · PR #318" },
                                          { label: "Campaign duration",      value: "58 minutes · 3 waves · 0 rollbacks · 0 incidents" },
                                        ],
                                      },
                                    }),
                                  ],
                                },
                              }),
                            ],
                          },
                        }),
                      ],
                    },
                  }),
                ],
              },
            }),
          ],
        },
      }),
    ],
  },
};

// ── Helper to define diff files concisely ────────────────────────────────────
function df(name: string, changes: string, lines: Array<[string, string]>): DiffFile {
  return { name, changes, lines: lines.map(([t, c]) => ({ type: t as DiffLine["type"], content: c })) };
}

SCENARIOS.provider_upgrade_failure = {
  sessionTitle: "Provider Upgrade Remediation · aws ~> 5.0",
  sessionDesc: "Multi-step campaign to identify, fix, and roll out the aws provider v5 compatibility fix across affected workspaces.",
  inspectorTab: "Overview",
  steps: [
    { label: "Runs analyzed",              sublabel: "2 failed · common error found",  status: "done" },
    { label: "Root cause identified",      sublabel: "aws_security_group_rule.type",   status: "done" },
    { label: "Impact assessment",          sublabel: "2 of 24 workspaces affected",    status: "done" },
    { label: "Dependency analysis",        sublabel: "No cross-workspace risk",        status: "done" },
    { label: "Confirm remediation scope",  sublabel: "2 workspaces affected",           status: "active" },
    { label: "Confirm remediation plan",                                                status: "pending" },
    { label: "Prepare & review PR",                                                     status: "pending" },
    { label: "Create Jira ticket",                                                       status: "pending" },
    { label: "Wave 1 rollout",             sublabel: "3 low-risk workspaces",          status: "pending" },
    { label: "Wave 2 rollout",             sublabel: "networking-prod-core",           status: "pending" },
    { label: "Wave 3 rollout",             sublabel: "payments-prod-us-east · CRITICAL", status: "pending" },
    { label: "Post-upgrade verification",                                               status: "pending" },
  ],
  artifacts: [
    { name: "Compatibility report",  size: "18 MB" },
    { name: "Impact assessment",     size: "8 MB"  },
    { name: "Remediation plan",      size: "6 MB"  },
    { name: "Pull request draft",    size: "4 MB"  },
    { name: "Rollout plan",          size: "3 MB"  },
    { name: "Verification checklist", size: "2 MB" },
  ],
  messages: [
    m("user", "Generate remediation plan for provider upgrade failure"),

    // ── Phase 1: Root cause ────────────────────────────────────────────────
    m("system", "2 failed runs analyzed. Root cause confirmed.", "Cross-referenced aws provider changelog · 1 breaking change identified", {
      finding: {
        status: "failed",
        title: "Breaking change · aws ~> 5.0 · aws_security_group_rule.type removed",
        rows: [
          { label: "Provider upgrade", value: "aws ~> 4.67 → 5.0 · 47 minutes ago", hi: true },
          { label: "Breaking change",  value: "`type` argument removed from aws_security_group_rule in v5", hi: true },
          { label: "Error message",    value: "Error: Invalid argument; An argument named 'type' is not expected here" },
          { label: "Runs failed",      value: "#run-a1b2c (payments-prod-us-east) · #run-d3e4f (networking-prod-core)" },
          { label: "First failure",    value: "47 minutes ago · immediately after provider upgrade" },
          { label: "Other workspaces", value: "22 of 24 unaffected · use different resource types" },
        ],
      },
    }),

    // ── Phase 2: Workspace assessment table ────────────────────────────────
    m("system", "Dependency scan complete. Only 2 workspaces use the deprecated resource syntax.", "Scanned 24 workspaces · Checked provider configs · Mapped module dependencies", {
      table: {
        caption: "Workspace compatibility assessment · aws ~> 5.0",
        columns: ["Workspace", "Provider", "Status", "Risk"],
        rows: [
          ["payments-prod-us-east",  "aws ~> 5.0", "FAILING",  "CRITICAL"],
          ["networking-prod-core",   "aws ~> 5.0", "FAILING",  "CRITICAL"],
          ["payments-prod-eu-west",  "aws ~> 5.0", "Passing",  "None"],
          ["auth-service-prod",      "aws ~> 5.0", "Passing",  "None"],
          ["api-gateway-prod",       "aws ~> 5.0", "Passing",  "None"],
          ["data-pipeline-prod",     "aws ~> 4.67","Passing",  "None"],
          ["cdn-global-prod",        "aws ~> 5.0", "Passing",  "None"],
          ["inventory-staging",      "aws ~> 5.0", "Passing",  "None"],
        ],
      },
    }),

    // ── Phase 3: Confirm scope + remediation plan ─────────────────────────
    m("system", "Assessment complete. 2 workspaces are affected — both are failing due to the same breaking change and both require the same fix.", "Scope confirmed · No additional workspaces at risk · Ready to generate plan", {
      confirm: {
        cardTitle: "Proceed with remediation · 2 affected workspaces",
        confirmDetails: [
          { label: "Workspace 1", value: "payments-prod-us-east · FAILING · CRITICAL" },
          { label: "Workspace 2", value: "networking-prod-core · FAILING · CRITICAL" },
          { label: "Fix",         value: "Replace deprecated aws_security_group_rule syntax in 2 files" },
          { label: "Unaffected",  value: "22 of 24 workspaces · no action required" },
        ],
        label: "Generate remediation plan",
        continuation: [
          m("user", "Generate remediation plan"),

          // ── Phase 4: Remediation options + confirm ──────────────────────
          m("system", "Two remediation paths are available. Updating the resource syntax is the recommended approach — it fixes the root cause permanently rather than masking it with a version pin.", "Risk assessment complete · Rollback strategy ready · Staging validation complete", {
      finding: {
        status: "warn",
        title: "Recommended: Update deprecated resource syntax",
        rows: [
          { label: "Change",            value: "Replace aws_security_group_rule with aws_vpc_security_group_ingress_rule", hi: true },
          { label: "Files affected",    value: "2 · modules/networking/security_groups.tf · modules/payments/security.tf" },
          { label: "Predicted success", value: "97% · validated against 3 staging workspaces" },
          { label: "Rollback strategy", value: "Automatic · reverts provider version if any wave fails within 30s" },
          { label: "Alternative",       value: "Roll back provider to ~> 4.67 — immediate but leaves root cause unresolved" },
        ],
      },
      confirm: {
        cardTitle: "Confirm remediation plan · Update resource syntax",
        label: "Confirm plan · generate PR",
        continuation: [
          m("user", "Plan confirmed — generate PR"),
          m("system", "Scanning affected modules and generating replacement code. Applying terraform fmt and validating syntax.", "Generating code changes · Running terraform validate · Verified clean plan in staging"),

          // ── PR review with code diff ──────────────────────────────────────
          m("system", "PR #247 ready for review. The changes replace the deprecated aws_security_group_rule resource with aws_vpc_security_group_ingress_rule in 2 files.", "PR generated · Terraform plan verified · Staging validation passed", {
            finding: {
              status: "info",
              title: "PR #247 · fix: replace deprecated aws_security_group_rule syntax",
              rows: [
                { label: "Branch",            value: "fix/aws-provider-v5-compat" },
                { label: "Files modified",    value: "2 · security_groups.tf · security.tf" },
                { label: "Lines changed",     value: "+14 / −8" },
                { label: "Terraform plan",    value: "✓ Validated · 0 net resource changes (replace in-place)" },
                { label: "Predicted success", value: "97% · based on 3 comparable fixes in staging" },
                { label: "Rollback",          value: "Automatic · reverts to aws ~> 4.67 if health check fails" },
              ],
            },
          }),

          m("system", "PR #247 raised. A Jira ticket has been pre-filled with the change details — review and confirm to log it before proceeding to merge.", "PR pushed to GitHub · Jira pre-filled from PR metadata", {
            confirm: {
              cardTitle: "Create Jira ticket for this change",
              confirmDetails: [
                { label: "Project",     value: "INFRA" },
                { label: "Issue type",  value: "Change Request" },
                { label: "Summary",     value: "fix: upgrade aws provider to v5 — replace deprecated aws_security_group_rule syntax" },
                { label: "Priority",    value: "High" },
                { label: "Component",   value: "terraform · networking · payments" },
                { label: "Linked PR",   value: "PR #247 · fix/aws-provider-v5-compat" },
                { label: "Affected",    value: "2 workspaces · networking-prod-core · payments-prod-us-east" },
                { label: "Reporter",    value: "Terraform Signal (automated)" },
              ],
              label: "Create Jira ticket",
              continuation: [
                m("user", "Create Jira ticket"),
                m("system", "Jira ticket INFRA-4821 created and linked to PR #247.", "INFRA-4821 created · Linked to PR #247 · Assigned to platform-infra"),
                m("system", "PR #247 has been pushed to GitHub. Review the diff below, then open it in GitHub to run your normal code review and merge process. Return here once merged to begin the rollout.", undefined, {
            codeDiff: {
              prNumber: "247",
              prTitle: "fix: replace deprecated aws_security_group_rule with aws_vpc_security_group_ingress_rule",
              files: [
                df("modules/networking/security_groups.tf", "+8 −5", [
                  ["context",  "  # Allow HTTPS inbound traffic"],
                  ["remove",   '  resource "aws_security_group_rule" "allow_https" {'],
                  ["remove",   '    type        = "ingress"'],
                  ["remove",   "    from_port   = 443"],
                  ["remove",   "    to_port     = 443"],
                  ["remove",   '    protocol    = "tcp"'],
                  ["add",      '  resource "aws_vpc_security_group_ingress_rule" "allow_https" {'],
                  ["add",      "    from_port   = 443"],
                  ["add",      "    to_port     = 443"],
                  ["add",      '    ip_protocol = "tcp"'],
                  ["add",      '    cidr_ipv4   = "0.0.0.0/0"'],
                  ["context",  '    description = "Allow HTTPS inbound"'],
                  ["context",  "  }"],
                ]),
                df("modules/payments/security.tf", "+6 −3", [
                  ["remove",   '  resource "aws_security_group_rule" "db_ingress" {'],
                  ["remove",   '    type      = "ingress"'],
                  ["remove",   "    from_port = 5432"],
                  ["add",      '  resource "aws_vpc_security_group_ingress_rule" "db_ingress" {'],
                  ["add",      "    from_port   = 5432"],
                  ["context",  "    to_port     = 5432"],
                  ["add",      '    ip_protocol = "tcp"'],
                  ["context",  "    cidr_ipv4   = var.vpc_cidr"],
                  ["context",  "  }"],
                ]),
              ],
            },
            confirm: {
              cardTitle: "PR #247 · Waiting for GitHub merge",
              label: "PR merged — begin rollout",
              continuation: [
                m("user", "PR merged in GitHub — begin rollout"),
                m("system", "PR #247 merge detected. Initiating 3-wave staged rollout across 5 workspaces. Wave 1 begins with low-risk workspaces.", "Merge detected · Rollout campaign initialized · Wave 1 ready"),

                // ── Wave 1 ────────────────────────────────────────────────
                m("system", "Wave 1 simulation passed. 3 low-risk workspaces confirmed safe to proceed.", "Wave 1 simulation complete · 0 plan changes · 0 breaking changes", {
                  finding: {
                    status: "info",
                    title: "Wave 1 · 3 low-risk workspaces · simulation passed",
                    rows: [
                      { label: "auth-service-prod",   value: "✓ Simulation passed · 0 net changes" },
                      { label: "cdn-global-prod",     value: "✓ Simulation passed · 0 net changes" },
                      { label: "inventory-staging",   value: "✓ Simulation passed · 0 net changes" },
                      { label: "Apply method",        value: "On next triggered run · no force apply" },
                      { label: "Rollback",            value: "Automatic · pins aws ~> 4.67 within 30s on failure" },
                    ],
                  },
                  confirm: {
                    cardTitle: "Approve Wave 1 · 3 low-risk workspaces",
                    label: "Approve Wave 1",
                    continuation: [
                      m("user", "Wave 1 approved"),
                      m("system", "Wave 1 complete. All 3 workspaces healthy. Verification passed.", "Health checks passed · Runs verified · No rollback required", {
                        finding: {
                          status: "ok",
                          title: "Wave 1 complete · 3/3 workspaces on aws ~> 5.0",
                          rows: [
                            { label: "auth-service-prod",  value: "Applied · Healthy · Run passed" },
                            { label: "cdn-global-prod",    value: "Applied · Healthy · Run passed" },
                            { label: "inventory-staging",  value: "Applied · Healthy · Run passed" },
                            { label: "Rollback",           value: "Not required" },
                            { label: "Next",               value: "Wave 2 · networking-prod-core (FAILING) · ready", hi: true },
                          ],
                        },
                      }),

                      // ── Wave 2 ──────────────────────────────────────────
                      m("system", "Wave 2 ready: networking-prod-core — currently failing. Simulation confirms the fix resolves the provider compatibility error.", "Wave 2 simulation complete · Breaking change resolved in plan", {
                        finding: {
                          status: "info",
                          title: "Wave 2 · networking-prod-core · compatibility error RESOLVED in simulation",
                          rows: [
                            { label: "networking-prod-core", value: "Simulation: aws_security_group_rule error RESOLVED ✓", hi: true },
                            { label: "Plan",                 value: "1 resource replaced · aws_security_group_rule → aws_vpc_security_group_ingress_rule" },
                            { label: "Downtime",             value: "None · in-place replacement · connections maintained" },
                            { label: "Rollback",             value: "Automatic pin aws ~> 4.67 if health check fails" },
                          ],
                        },
                        confirm: {
                          cardTitle: "Approve Wave 2 · networking-prod-core",
                          label: "Approve Wave 2",
                          continuation: [
                            m("user", "Wave 2 approved"),
                            m("system", "Wave 2 complete. networking-prod-core restored. Previously failing run #run-d3e4f is now passing.", "Apply complete · Run retry succeeded · Health checks passed", {
                              finding: {
                                status: "ok",
                                title: "Wave 2 complete · networking-prod-core restored",
                                rows: [
                                  { label: "networking-prod-core", value: "Applied · Healthy" },
                                  { label: "Run #run-d3e4f retry", value: "PASSING ✓ · provider error resolved", hi: true },
                                  { label: "Rollback",             value: "Not required" },
                                  { label: "Next",                 value: "Wave 3 · payments-prod-us-east · CRITICAL · production traffic", hi: true },
                                ],
                              },
                            }),

                            // ── Wave 3 ──────────────────────────────────
                            m("system", "Wave 3: payments-prod-us-east — production workspace with active traffic. This is the final and highest-risk wave. All pre-apply checks passed.", "Pre-production checks complete · Simulation validated · Approval required", {
                              finding: {
                                status: "warn",
                                title: "Wave 3 · payments-prod-us-east · CRITICAL · production traffic",
                                rows: [
                                  { label: "Workspace",        value: "payments-prod-us-east · production · active traffic", hi: true },
                                  { label: "Risk",             value: "CRITICAL · additional checks enabled" },
                                  { label: "Simulation",       value: "Passed · aws_security_group_rule error RESOLVED" },
                                  { label: "Estimated apply",  value: "~3 minutes · no downtime · in-place replacement" },
                                  { label: "Post-apply",       value: "5-point verification suite: connectivity · DNS · TLS · latency · run health" },
                                  { label: "Rollback",         value: "Automatic within 30s if any verification check fails" },
                                ],
                              },
                              confirm: {
                                cardTitle: "Approve Wave 3 · payments-prod-us-east · Production",
                                label: "Approve Wave 3 · Final production workspace",
                                continuation: [
                                  m("user", "Wave 3 approved"),
                                  m("system", "Applying to payments-prod-us-east. Monitoring health checks in real time.", "Apply in progress · Monitoring · 5/5 checks running"),
                                  m("system", "✅ Remediation complete. All workspaces restored. Evidence package generated.", "All health checks passed · Run retries succeeded · Evidence package ready", {
                                    finding: {
                                      status: "ok",
                                      title: "✅ Provider upgrade remediation complete · 5/5 workspaces healthy",
                                      rows: [
                                        { label: "payments-prod-us-east",  value: "Applied · Healthy · Run #run-a1b2c retry PASSING ✓", hi: true },
                                        { label: "networking-prod-core",   value: "Applied · Healthy · Run #run-d3e4f retry PASSING ✓", hi: true },
                                        { label: "auth-service-prod",      value: "Applied · Healthy" },
                                        { label: "Failed runs resolved",   value: "2 of 2 · both now passing", hi: true },
                                        { label: "Evidence package",       value: "Generated · 6 artifacts · ready to export" },
                                        { label: "Campaign duration",      value: "31 minutes total · 0 rollbacks required" },
                                      ],
                                    },
                                  }),
                                ],
                              },
                            }),
                          ],
                        },
                      }),
                    ],
                  },
                }),
              ],
            },
          }),
              ],            // close Jira continuation
            },              // close Jira confirm
          }),               // close Jira m()
        ],
      },
          }),   // close Phase 4 m()
        ],      // close Phase 3 continuation
      },        // close Phase 3 confirm
    }),         // close Phase 3 m()
  ],
};

SCENARIOS.cloudability_cost_breakdown = {
  sessionTitle: "Cost Breakdown · IBM Cloudability Guardrail · $588 limit",
  sessionDesc: "Analyze which resources drove the guardrail failure and walk through each reduction option.",
  inspectorTab: "Overview",
  steps: [
    { label: "Guardrail context bound",      sublabel: "$588 gated limit",              status: "done"    },
    { label: "Cost drivers identified",      sublabel: "3 RDS instances · gp2 storage", status: "done"    },
    { label: "Review Option 1",              sublabel: "Multi-AZ consolidation",        status: "active"  },
    { label: "Review Option 2",              sublabel: "Right-size instance class",     status: "pending" },
    { label: "Review Option 3",              sublabel: "Switch gp2 → gp3",             status: "pending" },
    { label: "Select and simulate option",                                               status: "pending" },
    { label: "Apply changes",                                                            status: "pending" },
  ],
  artifacts: [
    { name: "Cost breakdown · IBM Cloudability", size: "4 MB" },
    { name: "CloudWatch utilization report",     size: "3 MB" },
    { name: "Terraform change set",              size: "2 MB" },
  ],
  messages: [
    m("user", "Breakdown the budget that contributed to cost increase"),

    // ── Phase 1: Cost attribution table ──────────────────────────────────────
    m("system", "Parsing plan output against IBM Cloudability pricing data. Attributing cost per resource.", "Plan parsed · 3 RDS instances identified · gp2 storage flagged"),

    m("system", "Cost breakdown complete. Three RDS instances at ~$943.50/mo each account for the bulk of the overage — the $588 guardrail was never going to hold with this configuration.", "AWS pricing API · completed", {
      table: {
        caption: "Cost attribution · resources contributing to guardrail failure",
        columns: ["Resource", "Final cost/mo", "Impact", "Driver"],
        rows: [
          ["module.rds.aws_db_instance.main[0]", "$943.50", "+$43.51", "Instance class"],
          ["module.rds.aws_db_instance.main[4]", "$943.50", "+$43.51", "Instance class"],
          ["module.rds.aws_db_instance.main[3]", "$943.50", "+$43.51", "Instance class"],
          ["gp2_description storage component",   "—",       "+$12.51", "Storage type"],
        ],
      },
    }),

    // ── Option 1 review card ──────────────────────────────────────────────────
    m("system", "Three options identified to bring cost under the $588 guardrail. Starting with the highest-impact one.", "Options ranked by savings potential", {
      finding: {
        status: "info",
        title: "Option 1 of 3 · Use a single Multi-AZ RDS instance instead of 3 separate ones",
        rows: [
          { label: "Current state",    value: "3 independent RDS instances · $2,830.50/mo combined", highlight: true },
          { label: "Proposed",         value: "1 Multi-AZ instance · AWS manages standby replica automatically" },
          { label: "Or",               value: "Amazon Aurora cluster — shared storage, typically cheaper at this scale" },
          { label: "Terraform change", value: "Set multi_az = true · remove main[3] and main[4] blocks" },
          { label: "Saving",           value: "~$1,887/mo · eliminates 2 of the 3 billing lines", highlight: true },
        ],
      },
      confirm: {
        cardTitle: "Option 1 of 3 · Multi-AZ consolidation · ~$1,887/mo saving",
        label: "Review next option",
        silent: true,
        continuation: [
          m("user", "Review next option"),

          // ── Option 2 review card ────────────────────────────────────────
          m("system", "Option 2 — right-sizing. Each instance costs ~$943/mo, consistent with a db.r5.large or db.m5.large.", "CloudWatch utilization fetched · 14-day window", {
            finding: {
              status: "warn",
              title: "Option 2 of 3 · Right-size the instance class · instances running at <20% avg CPU",
              rows: [
                { label: "main[0]",          value: "14% avg CPU · peak 38% · db.r5.large" },
                { label: "main[3]",          value: "11% avg CPU · peak 29% · db.r5.large" },
                { label: "main[4]",          value: "17% avg CPU · peak 41% · db.r5.large" },
                { label: "Non-production",   value: "Drop to db.t3.medium or db.t4g.medium · ~$60/mo per instance" },
                { label: "Production",       value: "Review CPU/memory in CloudWatch before sizing down (t3 uses burst credits)" },
                { label: "Saving",           value: "~$345/mo total · ~$115/mo per instance (db.r5.large → db.t3.medium)", highlight: true },
              ],
            },
            confirm: {
              cardTitle: "Option 2 of 3 · Right-size instance class · ~$345/mo saving",
              label: "Review next option",
              silent: true,
              continuation: [
                m("user", "Review next option"),

                // ── Option 3 review card ──────────────────────────────────
                m("system", "Option 3 — storage type. The gp2_description line item confirms gp2 volumes are in use. gp3 is cheaper and faster.", "Terraform state parsed · storage_type = gp2 confirmed", {
                  finding: {
                    status: "info",
                    title: "Option 3 of 3 · Switch storage_type from gp2 to gp3 · zero downtime",
                    rows: [
                      { label: "Change",       value: 'storage_type = "gp2" → "gp3" · 1 line per resource block' },
                      { label: "Benefit",      value: "~20% cheaper at same volume size · independent IOPS config at no extra cost" },
                      { label: "Downtime",     value: "None — AWS modifies the volume online" },
                      { label: "Saving",       value: "~$4/mo per instance · $12/mo total", highlight: true },
                    ],
                  },
                  confirm: {
                    cardTitle: "Option 3 of 3 · gp2 → gp3 · ~$12/mo saving · zero risk",
                    label: "Select an option",
                    continuation: [
                      m("user", "Select an option"),

                      // ── Selection table ───────────────────────────────────
                      m("system", "All three options reviewed. Select the one you want to simulate and apply.", "Options ready · simulation available for all 3", {
                        table: {
                          caption: "Select a cost reduction option to simulate",
                          columns: ["Option", "Saving/mo", "Risk", "Effort"],
                          rows: [
                            ["Multi-AZ consolidation — remove 2 of 3 RDS instances", "~$1,887", "Medium", "1 PR · plan review"],
                            ["Right-size to db.t3.medium — reduce instance class", "~$345",   "Low–Medium", "1 PR per instance"],
                            ["gp2 → gp3 storage — update storage_type", "~$12",    "None", "1-line change"],
                          ],
                          selectedRow: 0,
                        },
                        confirm: {
                          cardTitle: "Confirm selection and run simulation",
                          label: "Confirm - run simulation",
                          continuation: [
                            m("user", "Confirmed — run simulation"),

                            // ── Simulation ─────────────────────────────────
                            m("system", "Running terraform plan simulation with the selected change. No resources will be modified.", "Generating plan · Fetching pricing · Checking policy compliance"),

                            m("system", "Simulation complete. The selected change resolves the guardrail failure and brings estimated cost well under the $588 threshold.", "Plan simulation passed · 0 breaking changes · Policy checks clear", {
                              finding: {
                                status: "ok",
                                title: "Simulation passed · guardrail will clear with this change",
                                rows: [
                                  { label: "Resources to modify",   value: "Remove main[3] and main[4] · set multi_az = true on main[0]" },
                                  { label: "Estimated cost after",  value: "~$943.50/mo · down from $2,830.50/mo", highlight: true },
                                  { label: "Guardrail status",      value: "$943.50 < $588 — wait, guardrail uses per-change delta · delta drops to ~$43.51 ✓" },
                                  { label: "Policy checks",         value: "Passed · no conflicts" },
                                  { label: "Downtime",              value: "~3 min · Multi-AZ failover setup · no application impact" },
                                  { label: "Rollback",              value: "Terraform plan is reversible · prior state preserved" },
                                ],
                              },
                            }),

                            // ── Confirm implementation ─────────────────────
                            m("system", "Ready to generate the Terraform change and open a PR. Confirm to proceed.", undefined, {
                              confirm: {
                                cardTitle: "Apply change · generate PR and trigger run",
                                label: "Apply changes",
                                continuation: [
                                  m("user", "Apply changes"),
                                  m("system", "Generating Terraform change set and opening PR. IBM Cloudability re-evaluation will trigger on the next run.", "Change set generated · PR #301 opened · Run queued"),
                                  m("system", "Done. PR #301 is open. Once merged and the run completes, the guardrail will pass and the blocked apply will be unblocked.", "PR opened · Guardrail re-eval queued", {
                                    finding: {
                                      status: "ok",
                                      title: "Changes applied · PR #301 open · guardrail will clear on next run",
                                      rows: [
                                        { label: "PR #301",            value: "feat: consolidate RDS to single Multi-AZ instance", highlight: true },
                                        { label: "Estimated saving",   value: "~$1,887/mo · 2 instances removed", highlight: true },
                                        { label: "Option 2 + 3",       value: "Right-sizing and gp3 migration can be applied in follow-on PRs" },
                                        { label: "Guardrail",          value: "$588 · will pass once PR is merged and run completes" },
                                        { label: "Blocked apply",      value: "Will auto-unblock after guardrail clears" },
                                      ],
                                    },
                                  }),
                                ],
                              },
                            }),
                          ],
                        },
                      }),
                    ],
                  },
                }),
              ],
            },
          }),
        ],
      },
    }),
  ],
};

function getScenario(q: string): Scenario {
  const l = q?.toLowerCase() || "";
  // IBM Cloudability cost breakdown
  if (l.includes("breakdown") || l.includes("cloudability") || l.includes("budget that contributed")) return SCENARIOS.cloudability_cost_breakdown;
  // Provider upgrade remediation
  if (l.includes("provider upgrade") || l.includes("provider-upgrade") || l.includes("remediation plan for provider")) return SCENARIOS.provider_upgrade_failure;
  // Automated workflow routing
  if (l.includes("terraform version") || l.includes("upgrade terraform")) return SCENARIOS.terraform_upgrade;
  // Drift next-step routing
  if (l.includes("inspect drift")) return SCENARIOS.inspect_drift;
  if (l.includes("remediation") || l.includes("prepare drift")) return SCENARIOS.remediation_plan;
  if (l.includes("state diff") || l.includes("full state")) return SCENARIOS.state_diff;
  // Policy next-step routing
  if (l.includes("inspect policy") || l.includes("policy failure")) return SCENARIOS.inspect_policy;
  if (l.includes("exception packet") || l.includes("exception")) return SCENARIOS.policy_exception;
  if (l.includes("tf-audit") || l.includes("cost for run")) return SCENARIOS.policy_cost_breakdown;
  // General routing
  if (l.includes("fail")) return SCENARIOS.failed;
  if (l.includes("drift")) return SCENARIOS.drift;
  return SCENARIOS.default;
}

// ── Conversation message components ──────────────────────────────────────────

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end px-6 py-1">
      <div className="px-4 py-2 rounded-xl max-w-xs" style={{ backgroundColor: M.inputBg, color: M.textDark, fontSize: "14px", lineHeight: "1.5", fontFamily: M.font }}>
        {text}
      </div>
    </div>
  );
}

function MetaLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-1.5 px-6 mb-1">
      <span style={{ color: M.metaColor, fontSize: "12px", fontFamily: M.font }}>{text}</span>
    </div>
  );
}

function SystemText({ text }: { text: string }) {
  return (
    <p style={{ color: M.textDark, fontSize: "15px", fontFamily: M.font, lineHeight: "1.6", padding: "0 24px" }}>{text}</p>
  );
}

function WorkflowCard({ card }: { card: WorkflowCardData }) {
  return (
    <div className="mx-6 my-2 p-4 rounded-lg" style={{ border: `1px solid ${M.rightBorder}`, backgroundColor: "white" }}>
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 mt-0.5" style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: M.blue, border: "2px solid white", boxShadow: `0 0 0 2px ${M.blue}` }} />
        <div className="flex-1">
          <p style={{ color: M.textDark, fontSize: "15px", fontFamily: M.font, fontWeight: 500 }}>{card.title}</p>
          <p style={{ color: M.textLight, fontSize: "14px", fontFamily: M.font, lineHeight: "1.5", marginTop: "4px" }}>{card.description}</p>
          <div className="flex items-center gap-2 mt-3">
            {card.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded" style={{ backgroundColor: M.blueBg, color: M.blue, fontSize: "12px", fontFamily: M.font }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TableCard({ table }: { table: TableData }) {
  return (
    <div className="mx-6 my-2">
      <p style={{ color: M.metaColor, fontSize: "12px", fontFamily: M.font, marginBottom: "8px" }}>{table.caption}</p>
      <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${M.rightBorder}` }}>
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: "#f9fafb" }}>
              {table.columns.map(col => (
                <th key={col} className="text-left px-3 py-2.5" style={{ color: M.textMid, fontSize: "12px", fontFamily: M.font, fontWeight: 600, borderBottom: `1px solid ${M.rightBorder}` }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: i < table.rows.length - 1 ? `1px solid ${M.rightBorder}` : "none", backgroundColor: "transparent" }}>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-2.5" style={{ color: M.textDark, fontSize: "13px", fontFamily: M.font }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Code diff card (Git-diff style, with optional confirm footer) ─────────────

function CodeDiffCard({
  diff,
  confirm,
  onConfirm,
  msgId,
}: {
  diff: CodeDiff;
  confirm?: NonNullable<Message["confirm"]>;
  onConfirm?: (msgId: number, continuation: Message[]) => void;
  msgId: number;
}) {
  const lineColor = { add: "#dcfce7", remove: "#fee2e2", context: "transparent" };
  const lineTextColor = { add: "#15803d", remove: "#dc2626", context: "#374151" };
  const linePrefix = { add: "+", remove: "−", context: " " };

  return (
    <div className="mx-6 my-3 rounded-xl overflow-hidden" style={{ border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
      {/* Dark header */}
      <div className="px-5 py-4" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="flex items-center gap-2">
          <span style={{ color: "#6ea6ff", fontSize: "13px", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500 }}>PR #{diff.prNumber}</span>
          <span style={{ color: "#8d8d8d", fontSize: "13px" }}>·</span>
          <span style={{ color: "white", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300 }}>{diff.prTitle}</span>
        </div>
      </div>

      {/* Files */}
      {diff.files.map((file, fi) => (
        <div key={fi} style={{ backgroundColor: "white" }}>
          {/* File header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-t" style={{ borderColor: "#e5e7eb", backgroundColor: "#f8fafc" }}>
            <div className="flex items-center gap-2">
              <span style={{ color: "#64748b", fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace" }}>📄</span>
              <span style={{ color: "#1e293b", fontSize: "12px", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500 }}>{file.name}</span>
            </div>
            <span style={{ color: "#64748b", fontSize: "12px", fontFamily: "'IBM Plex Mono', monospace" }}>{file.changes}</span>
          </div>
          {/* Diff lines */}
          <div style={{ fontFamily: "'IBM Plex Mono', 'Menlo', monospace", fontSize: "12px", lineHeight: "1.6" }}>
            {file.lines.map((line, li) => (
              <div key={li} className="flex items-start" style={{ backgroundColor: lineColor[line.type], paddingLeft: "16px", paddingRight: "16px", paddingTop: "1px", paddingBottom: "1px" }}>
                <span style={{ color: lineTextColor[line.type], opacity: 0.6, width: "16px", flexShrink: 0, userSelect: "none" }}>{linePrefix[line.type]}</span>
                <span style={{ color: lineTextColor[line.type] }}>{line.content}</span>
              </div>
            ))}
          </div>
          {fi < diff.files.length - 1 && <div style={{ height: "1px", backgroundColor: "#e5e7eb" }} />}
        </div>
      ))}

      {/* Footer */}
      {confirm && (
        <div style={{ backgroundColor: "white", borderTop: "1px solid #e5e7eb" }}>
          {/* GitHub handoff banner */}
          <div className="flex items-center justify-between px-5 py-3" style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e5e7eb" }}>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#374151", flexShrink: 0 }}>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span style={{ color: "#374151", fontSize: "13px", fontFamily: "'IBM Plex Sans', sans-serif" }}>
                Review and merge PR #{diff.prNumber} in GitHub, then confirm below to begin rollout.
              </span>
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full"
              style={{ backgroundColor: "#24292f", color: "white", fontSize: "13px", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap" }}
            >
              Open PR #{diff.prNumber} in GitHub
              <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                <path d="M1 11L11 1M11 1H4M11 1v7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          {/* Confirm + cancel row */}
          <div className="flex items-center justify-end gap-2 px-5 py-3">
            <button onClick={() => onConfirm?.(msgId, confirm.continuation)} className="px-5 py-2.5 rounded-full" style={{ backgroundColor: "#161616", color: "white", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}>
              {confirm.label || "PR merged — continue"}
            </button>
            <button onClick={() => window.location.reload()} className="px-4 py-2.5 rounded-full" style={{ backgroundColor: "#f4f4f4", color: "#525252", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", border: "1px solid #e5e7eb" }}>
              Refresh
            </button>
            <button className="px-4 py-2.5 rounded-full" style={{ backgroundColor: "#f4f4f4", color: "#525252", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", border: "1px solid #e5e7eb" }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Meridian-style confirmation card (finding data + dark header + footer buttons)

function MeridianConfirmCard({
  title,
  finding,
  text,
  confirm,
  onConfirm,
  msgId,
}: {
  title: string;
  finding?: FindingData;
  text?: string;
  confirm: NonNullable<Message["confirm"]>;
  onConfirm?: (msgId: number, continuation: Message[]) => void;
  msgId: number;
}) {
  const statusColor = finding
    ? { failed: M.red, warn: "#d97706", ok: M.green, info: M.blue }[finding.status]
    : M.blue;

  return (
    <div className="mx-6 my-3 rounded-xl overflow-hidden" style={{ border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
      {/* Dark header */}
      <div className="px-5 py-4" style={{ backgroundColor: "#1a1a1a" }}>
        <p style={{ color: "white", fontSize: "18px", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300 }}>{title}</p>
      </div>

      {/* Content: finding rows, confirmDetails, or plain text */}
      <div style={{ backgroundColor: "white" }}>
        {finding && (
          <>
            <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ borderColor: "#e5e7eb", backgroundColor: "#fafafa" }}>
              <span style={{ color: statusColor, fontSize: "13px", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600 }}>{finding.title}</span>
            </div>
            {finding.rows.map((row, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3" style={{ borderBottom: i < finding.rows.length - 1 ? "1px solid #f0f0f0" : "none", backgroundColor: i % 2 === 0 ? "white" : "#fafafa" }}>
                <span style={{ color: "#525252", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif" }}>{row.label}</span>
                <span style={{ color: row.hi ? statusColor : "#161616", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: row.hi ? 600 : 400 }}>{row.value}</span>
              </div>
            ))}
          </>
        )}
        {confirm.confirmDetails && !finding && (
          <>
            <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ borderColor: "#e5e7eb", backgroundColor: "#f0f7ff" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <rect x="2" y="2" width="20" height="20" rx="3" fill="#0052CC" />
                <path d="M12 6l4 4-4 4M8 10h8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ color: "#0052CC", fontSize: "12px", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600, letterSpacing: "0.04em" }}>Jira · Pre-filled from PR metadata</span>
            </div>
            {confirm.confirmDetails.map((row, i) => (
              <div key={i} className="flex items-start gap-4 px-5 py-2.5" style={{ borderBottom: i < confirm.confirmDetails!.length - 1 ? "1px solid #f0f0f0" : "none", backgroundColor: i % 2 === 0 ? "white" : "#fafafa" }}>
                <span style={{ color: "#8c8c8c", fontSize: "12px", fontFamily: "'IBM Plex Sans', sans-serif", width: "90px", flexShrink: 0, paddingTop: "1px" }}>{row.label}</span>
                <span style={{ color: "#161616", fontSize: "13px", fontFamily: "'IBM Plex Mono', monospace", lineHeight: "1.5" }}>{row.value}</span>
              </div>
            ))}
          </>
        )}
        {text && !finding && !confirm.confirmDetails && (
          <div className="px-5 py-4">
            <p style={{ color: "#525252", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: "1.6" }}>{text}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 px-5 py-4" style={{ backgroundColor: "white", borderTop: "1px solid #e5e7eb" }}>
        <button
          onClick={() => onConfirm?.(msgId, confirm.continuation)}
          className="px-5 py-2.5 rounded-full"
          style={{ backgroundColor: "#161616", color: "white", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}
        >
          {confirm.label}
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2.5 rounded-full"
          style={{ backgroundColor: "#f4f4f4", color: "#525252", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", border: "1px solid #e5e7eb" }}
        >
          Refresh
        </button>
        <button
          className="px-4 py-2.5 rounded-full"
          style={{ backgroundColor: "#f4f4f4", color: "#525252", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", border: "1px solid #e5e7eb" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// Meridian-style selection table with dark header, radio rows, footer confirm ─

function SelectionTableCard({
  table,
  confirm,
  onConfirm,
  msgId,
}: {
  table: TableData;
  confirm: NonNullable<Message["confirm"]>;
  onConfirm?: (msgId: number, continuation: Message[]) => void;
  msgId: number;
}) {
  const [selectedRow, setSelectedRow] = React.useState(table.selectedRow ?? 0);

  const selectedLabel = table.rows[selectedRow]
    ? `${table.rows[selectedRow][0]} (${table.rows[selectedRow][1]})`
    : "";

  return (
    <div className="mx-6 my-3 rounded-xl overflow-hidden" style={{ border: `1px solid #e5e7eb`, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
      {/* Dark header */}
      <div className="px-5 py-4" style={{ backgroundColor: "#1a1a1a" }}>
        <p style={{ color: "white", fontSize: "18px", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300 }}>{table.caption}</p>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: "white" }}>
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ backgroundColor: "white", borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ width: 48, padding: "14px 16px" }} />
              {table.columns.map(col => (
                <th key={col} className="text-left px-4 py-3.5" style={{ color: "#161616", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600, letterSpacing: "0.16px" }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr
                key={i}
                onClick={() => setSelectedRow(i)}
                className="cursor-pointer"
                style={{ borderBottom: i < table.rows.length - 1 ? "1px solid #e5e7eb" : "none", backgroundColor: i === selectedRow ? "#e8f0fe" : "white" }}
              >
                <td className="px-4 py-4 text-center">
                  {/* Meridian radio button */}
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${i === selectedRow ? M.blue : "#8d8d8d"}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", backgroundColor: i === selectedRow ? M.blue : "transparent" }}>
                    {i === selectedRow && <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "white" }} />}
                  </div>
                </td>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-4" style={{ color: i === selectedRow ? "#0043ce" : "#525252", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: i === selectedRow && ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 px-5 py-4" style={{ backgroundColor: "white", borderTop: "1px solid #e5e7eb" }}>
        {/* Selected indicator */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: M.blue, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <CheckCircle2 size={13} color="white" />
          </div>
          <span style={{ color: "#525252", fontSize: "13px", fontFamily: "'IBM Plex Sans', sans-serif" }}>
            Selected: <strong style={{ color: "#161616" }}>{selectedLabel}</strong>
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onConfirm?.(msgId, confirm.continuation)}
            className="px-5 py-2.5 rounded-full"
            style={{ backgroundColor: "#161616", color: "white", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}
          >
            Continue
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2.5 rounded-full"
            style={{ backgroundColor: "#f4f4f4", color: "#525252", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", border: "1px solid #e5e7eb" }}
          >
            Refresh
          </button>
          <button
            className="px-4 py-2.5 rounded-full"
            style={{ backgroundColor: "#f4f4f4", color: "#525252", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", border: "1px solid #e5e7eb" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function MeridianCheckbox({ checked, indeterminate, onChange }: { checked: boolean; indeterminate?: boolean; onChange: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={onChange}
      style={{
        width: 20, height: 20,
        border: `2px solid ${checked || indeterminate ? M.blue : "#8d8d8d"}`,
        borderRadius: "2px",
        backgroundColor: checked || indeterminate ? M.blue : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, cursor: "pointer", padding: 0,
      }}
    >
      {checked && (
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
          <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {!checked && indeterminate && (
        <div style={{ width: 10, height: 2, backgroundColor: "white", borderRadius: 1 }} />
      )}
    </button>
  );
}

function MultiSelectTableCard({
  table,
  confirm,
  onConfirm,
  msgId,
}: {
  table: TableData;
  confirm: NonNullable<Message["confirm"]>;
  onConfirm?: (msgId: number, continuation: Message[]) => void;
  msgId: number;
}) {
  const [checkedRows, setCheckedRows] = React.useState<Set<number>>(
    new Set(table.selectedRows ?? table.rows.map((_, i) => i))
  );

  const allChecked = checkedRows.size === table.rows.length;
  const someChecked = checkedRows.size > 0 && !allChecked;
  const count = checkedRows.size;

  function toggleAll() {
    setCheckedRows(allChecked ? new Set() : new Set(table.rows.map((_, i) => i)));
  }

  function toggleRow(i: number) {
    setCheckedRows(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  const noun = table.caption?.toLowerCase().includes("workspace") ? "workspace" : "item";
  const selectedLabel = `${count} ${noun}${count !== 1 ? "s" : ""} selected`;

  return (
    <div className="mx-6 my-3 rounded-xl overflow-hidden" style={{ border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
      {/* Dark header */}
      <div className="px-5 py-4" style={{ backgroundColor: "#1a1a1a" }}>
        <p style={{ color: "white", fontSize: "18px", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300 }}>{table.caption}</p>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: "white" }}>
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ backgroundColor: "white", borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ width: 52, padding: "14px 16px" }}>
                <MeridianCheckbox
                  checked={allChecked}
                  indeterminate={someChecked}
                  onChange={(e) => { e.stopPropagation(); toggleAll(); }}
                />
              </th>
              {table.columns.map(col => (
                <th key={col} className="text-left px-4 py-3.5" style={{ color: "#161616", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600, letterSpacing: "0.16px" }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => {
              const checked = checkedRows.has(i);
              return (
                <tr
                  key={i}
                  onClick={() => toggleRow(i)}
                  className="cursor-pointer"
                  style={{ borderBottom: i < table.rows.length - 1 ? "1px solid #e5e7eb" : "none", backgroundColor: checked ? "#e8f0fe" : "white" }}
                >
                  <td className="px-4 py-4 text-center">
                    <MeridianCheckbox
                      checked={checked}
                      onChange={(e) => { e.stopPropagation(); toggleRow(i); }}
                    />
                  </td>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-4" style={{ color: checked ? "#0043ce" : "#525252", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: checked && ci === 0 ? 600 : 400 }}>{cell}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 px-5 py-4" style={{ backgroundColor: "white", borderTop: "1px solid #e5e7eb" }}>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: count > 0 ? M.blue : "#d1d5db", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <CheckCircle2 size={13} color="white" />
          </div>
          <span style={{ color: "#525252", fontSize: "13px", fontFamily: "'IBM Plex Sans', sans-serif" }}>
            <strong style={{ color: "#161616" }}>{selectedLabel}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => count > 0 && onConfirm?.(msgId, confirm.continuation)}
            className="px-5 py-2.5 rounded-full"
            style={{
              backgroundColor: count > 0 ? "#161616" : "#c6c6c6",
              color: "white",
              fontSize: "14px",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 500,
              cursor: count > 0 ? "pointer" : "not-allowed",
            }}
          >
            {confirm.label || "Continue"}
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2.5 rounded-full"
            style={{ backgroundColor: "#f4f4f4", color: "#525252", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", border: "1px solid #e5e7eb" }}
          >
            Refresh
          </button>
          <button
            className="px-4 py-2.5 rounded-full"
            style={{ backgroundColor: "#f4f4f4", color: "#525252", fontSize: "14px", fontFamily: "'IBM Plex Sans', sans-serif", border: "1px solid #e5e7eb" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function FindingCard({ finding }: { finding: FindingData }) {
  const cfg = {
    failed: { color: M.red,      bg: M.redBg,     icon: <XCircle size={15} color={M.red} /> },
    warn:   { color: "#92400e",  bg: M.amberBg,   icon: <AlertTriangle size={15} color={M.amber} /> },
    ok:     { color: M.green,    bg: M.greenBg,   icon: <CheckCircle2 size={15} color={M.green} /> },
    info:   { color: M.blue,     bg: M.blueBg,    icon: <CheckCircle2 size={15} color={M.blue} /> },
  }[finding.status]!

  return (
    <div className="mx-6 my-2 rounded-lg overflow-hidden" style={{ border: `1px solid ${M.rightBorder}` }}>
      <div className="flex items-center gap-2.5 px-4 py-3" style={{ backgroundColor: cfg.bg, borderBottom: `1px solid ${M.rightBorder}` }}>
        {cfg.icon}
        <p style={{ color: cfg.color, fontSize: "14px", fontFamily: M.font, fontWeight: 600 }}>{finding.title}</p>
      </div>
      {finding.rows.map((row, i) => (
        <div key={i} className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: i < finding.rows.length - 1 ? `1px solid ${M.rightBorder}` : "none", backgroundColor: i % 2 === 0 ? "white" : "#fafafa" }}>
          <span style={{ color: M.metaColor, fontSize: "13px", fontFamily: M.font }}>{row.label}</span>
          <span style={{ color: row.highlight ? M.red : M.textDark, fontSize: "13px", fontFamily: M.font, fontWeight: row.highlight ? 600 : 400 }}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}

function ConversationMessage({ msg, onConfirm }: { msg: Message; onConfirm?: (msgId: number, continuation: Message[]) => void }) {
  if (msg.role === "user") return <UserBubble text={msg.text || ""} />;

  const hasConfirm = msg.confirm && !msg.confirmed;
  const isCodeDiffCard = !!msg.codeDiff;
  const isMultiSelectTable = hasConfirm && msg.table?.multiSelect && !isCodeDiffCard;
  const isSelectionTable = hasConfirm && msg.table && !msg.table.multiSelect && !isCodeDiffCard;
  const isMeridianCard = hasConfirm && msg.confirm!.cardTitle && !isCodeDiffCard && !isSelectionTable && !isMultiSelectTable;

  // When rendering a MeridianConfirmCard, the text is shown in the card header — don't double-render it
  // Suppress external SystemText whenever a MeridianConfirmCard is being rendered —
  // the card already includes the text or finding in its own body.
  const suppressText = !!isMeridianCard || isCodeDiffCard || isMultiSelectTable;

  return (
    <div className="py-3">
      {!suppressText && msg.meta && <MetaLine text={msg.meta} />}
      {!suppressText && msg.text && <SystemText text={msg.text} />}
      {msg.card && <WorkflowCard card={msg.card} />}

      {/* Code diff card (PR review with embedded confirm footer) */}
      {isCodeDiffCard && (
        <CodeDiffCard
          diff={msg.codeDiff!}
          confirm={hasConfirm ? msg.confirm : undefined}
          onConfirm={onConfirm}
          msgId={msg.id}
        />
      )}
      {/* Also show the plain finding above a code diff if both exist */}
      {isCodeDiffCard && msg.finding && <FindingCard finding={msg.finding} />}

      {/* Multi-select table (checkboxes, table + confirm in footer) */}
      {isMultiSelectTable && (
        <MultiSelectTableCard
          table={msg.table!}
          confirm={msg.confirm!}
          onConfirm={onConfirm}
          msgId={msg.id}
        />
      )}

      {/* Meridian selection table (radio, table + confirm in footer) */}
      {isSelectionTable && (
        <SelectionTableCard
          table={msg.table!}
          confirm={msg.confirm!}
          onConfirm={onConfirm}
          msgId={msg.id}
        />
      )}

      {/* Meridian confirm card (finding/text + dark header + Continue/Cancel footer) */}
      {!isSelectionTable && !isMultiSelectTable && isMeridianCard && (
        <MeridianConfirmCard
          title={msg.confirm!.cardTitle!}
          finding={msg.finding}
          text={!msg.finding ? msg.text : undefined}
          confirm={msg.confirm!}
          onConfirm={onConfirm}
          msgId={msg.id}
        />
      )}

      {/* Plain finding card when no confirm action */}
      {!isSelectionTable && !isMultiSelectTable && !isMeridianCard && msg.finding && (
        <FindingCard finding={msg.finding} />
      )}

      {/* Fallback plain table (no confirm) */}
      {!isSelectionTable && !isMultiSelectTable && msg.table && !hasConfirm && (
        <TableCard table={msg.table} />
      )}

      {msg.confirmed && !msg.confirm?.silent && (
        <div className="mx-6 mt-2 flex items-center gap-2 px-3 py-1.5 rounded" style={{ backgroundColor: "rgba(36,161,72,0.1)" }}>
          <CheckCircle2 size={13} color={M.green} />
          <span style={{ color: M.green, fontSize: "12px", fontFamily: M.font }}>Confirmed</span>
        </div>
      )}
    </div>
  );
}

// ── Workflow steps (right panel, Meridian style) ──────────────────────────────

// ── Overview panel data (scenario-aware) ─────────────────────────────────────

interface OverviewData {
  context: string;
  statusColor: "red" | "amber" | "blue" | "green";
  statusTitle: string;
  statusSubline: string;
  rows: Array<{ label: string; value: string; hi?: boolean }>;
  action: { text: string; agent: string; query: string };
}

function getOverviewData(scenario: Scenario): OverviewData {
  const title = scenario.sessionTitle;

  if (title.includes("Exception") || title.includes("Policy Failure") || title.includes("cost-control")) {
    return {
      context: "WORKSPACE · PAYMENTS-PROD-US-EAST",
      statusColor: "red",
      statusTitle: "Run #run-xK29f failed",
      statusSubline: "Policy check failed · cost-control-v2 threshold exceeded",
      rows: [
        { label: "Workspace ID", value: "ws-1HkX32P8UKEJ3Lmo" },
        { label: "Resources managed", value: "47" },
        { label: "Plan delta", value: "+2 add · ~3 change · 0 destroy" },
        { label: "State lock", value: "johndoe · 12 minutes ago" },
        { label: "Estimated cost", value: "$2,340/mo" },
        { label: "Policy result", value: "FAILED — cost threshold exceeded", hi: true },
      ],
      action: { text: "Prepare policy exception packet for run #run-xK29f with cost justification", agent: "policy-exception-agent", query: "Prepare exception packet for run-xK29f" },
    };
  }

  if (title.includes("Provider Upgrade Remediation")) {
    return {
      context: "CAMPAIGN · HASHICORP-DEMO · 2 PRODUCTION WORKSPACES",
      statusColor: "red",
      statusTitle: "2 production workspaces failing after provider upgrade",
      statusSubline: "aws ~> 4.67 → 5.0 · Breaking change detected · Remediation campaign in progress",
      rows: [
        { label: "Provider upgraded",  value: "aws ~> 4.67 → 5.0 · 47 minutes ago", hi: true },
        { label: "Breaking change",    value: "aws_security_group_rule.type removed in v5", hi: true },
        { label: "Failing workspaces", value: "payments-prod-us-east · networking-prod-core" },
        { label: "Failed runs",        value: "#run-a1b2c · #run-d3e4f" },
        { label: "Workspaces safe",    value: "22 of 24 unaffected" },
        { label: "Remediation",        value: "PR #247 ready · 3-wave rollout staged" },
      ],
      action: { text: "", agent: "", query: "" },
    };
  }

  if (title.includes("Drift") || title.includes("State Diff")) {
    return {
      context: "WORKSPACE · MY-WORKSPACE",
      statusColor: "amber",
      statusTitle: "Drift detected · aws_instance.worker",
      statusSubline: "Instance type changed outside Terraform · 18 hours ago",
      rows: [
        { label: "Workspace ID", value: "ws-1HkX32P8UKEJ3Lmo" },
        { label: "Resources total", value: "48 managed" },
        { label: "Drifted resource", value: "aws_instance.worker", hi: true },
        { label: "Change", value: "t3.medium → t3.large", hi: true },
        { label: "Detected", value: "18 hours ago" },
        { label: "Cost impact", value: "+$47/mo vs expected" },
      ],
      action: { text: "Prepare drift remediation plan for my-workspace and restore expected state", agent: "drift-remediation-agent", query: "Prepare drift remediation for my-workspace" },
    };
  }

  if (title.includes("Cost")) {
    return {
      context: "WORKSPACE · PAYMENTS-PROD-US-EAST",
      statusColor: "amber",
      statusTitle: "Budget threshold exceeded by $340/mo",
      statusSubline: "RDS instance upgrade is the primary cost driver (+$286/mo)",
      rows: [
        { label: "Total monthly cost", value: "$2,340.18/mo", hi: true },
        { label: "Budget limit", value: "$2,000/mo" },
        { label: "Overage", value: "+$340/mo (+17%)", hi: true },
        { label: "Primary driver", value: "RDS db.r6g.2xlarge · $892/mo" },
        { label: "Delta vs last run", value: "+$312/mo (RDS upgrade)" },
        { label: "Policy", value: "cost-control-v2 · BLOCKED" },
      ],
      action: { text: "Optimize RDS instance class to reduce monthly cost by ~$200/mo", agent: "cost-optimization-agent", query: "tf-audit --cost for run-xK29f" },
    };
  }

  if (title.includes("Terraform Upgrade Campaign")) {
    return {
      context: "CAMPAIGN · HASHICORP-DEMO · 8 WORKSPACES",
      statusColor: "amber",
      statusTitle: "Upgrade campaign in progress · Wave 1 of 3",
      statusSubline: "Risk-staged rollout · approval checkpoint before each wave",
      rows: [
        { label: "Target version", value: "Terraform 1.7.4" },
        { label: "Workspaces in scope", value: "8 of 24 total", hi: true },
        { label: "HIGH risk workspaces", value: "2 (Wave 3 · payments-prod-*)" },
        { label: "Compatibility advisory", value: "1 — payments-prod-us-east", hi: true },
        { label: "Rollback plan", value: "Ready · automatic on failure" },
        { label: "Estimated duration", value: "45 – 60 minutes" },
      ],
      action: { text: "", agent: "", query: "" },
    };
  }

  if (title.includes("Failed Run")) {
    return {
      context: "WORKSPACE · PAYMENTS-PROD-US-EAST",
      statusColor: "red",
      statusTitle: "3 failed runs detected",
      statusSubline: "payments-prod-us-east · payments-prod-eu-west · api-gateway-prod",
      rows: [
        { label: "Failed in last hour", value: "3 runs", hi: true },
        { label: "payments-prod-us-east", value: "Policy check FAILED" },
        { label: "payments-prod-eu-west", value: "Drift + policy rejected", hi: true },
        { label: "api-gateway-prod", value: "Provider error" },
        { label: "Policy", value: "cost-control-v2" },
        { label: "Common cause", value: "Cost threshold exceeded" },
      ],
      action: { text: "Inspect policy failures and prepare exception packets for affected runs", agent: "policy-exception-agent", query: "Inspect policy failure details on run-xK29f" },
    };
  }

  // Default
  return {
    context: "WORKSPACE · PAYMENTS-PROD-US-EAST",
    statusColor: "blue",
    statusTitle: "Workspace inspection ready",
    statusSubline: "Pull real-time state, runs, and policy results.",
    rows: [
      { label: "Workspace ID", value: "ws-1HkX32P8UKEJ3Lmo" },
      { label: "Resources managed", value: "47" },
      { label: "Last run", value: "#run-guDS9dmc3dn · Applied" },
      { label: "Estimated cost", value: "$2,340/mo" },
    ],
    action: { text: "Inspect workspace state and surface actionable next steps", agent: "inspection-agent", query: "inspect payments-prod" },
  };
}

function OverviewPanel({ scenario }: { scenario: Scenario }) {
  const data = getOverviewData(scenario);

  const statusStyles = {
    red: { bg: "#fff1f1", border: "rgba(218,30,40,0.2)", color: M.red, icon: <XCircle size={15} color={M.red} /> },
    amber: { bg: "#fffbf0", border: "rgba(217,119,6,0.2)", color: "#d97706", icon: <AlertTriangle size={15} color="#d97706" /> },
    blue: { bg: M.blueLight, border: "rgba(0,67,206,0.2)", color: M.blue, icon: <CheckCircle2 size={15} color={M.blue} /> },
    green: { bg: M.greenBg, border: "rgba(36,161,72,0.2)", color: M.green, icon: <CheckCircle2 size={15} color={M.green} /> },
  }[data.statusColor];

  return (
    <div className="p-5 flex flex-col gap-4">
      {/* Context breadcrumb */}
      <p style={{ color: M.textLight, fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: M.font }}>
        {data.context}
      </p>

      {/* Status card */}
      <div className="rounded-lg p-3.5" style={{ backgroundColor: statusStyles.bg, border: `1px solid ${statusStyles.border}` }}>
        <div className="flex items-center gap-2 mb-1">
          {statusStyles.icon}
          <p style={{ color: statusStyles.color, fontSize: "13px", fontFamily: M.font, fontWeight: 600 }}>{data.statusTitle}</p>
        </div>
        <p style={{ color: M.textMid, fontSize: "12px", fontFamily: M.font }}>{data.statusSubline}</p>
      </div>

      {/* Data rows */}
      <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${M.rightBorder}` }}>
        {data.rows.map((row, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: i < data.rows.length - 1 ? `1px solid ${M.rightBorder}` : "none", backgroundColor: i % 2 === 0 ? "white" : "#fafafa" }}>
            <span style={{ color: M.textLight, fontSize: "12px", fontFamily: M.font }}>{row.label}</span>
            <span style={{ color: row.hi ? M.red : M.textDark, fontSize: "12px", fontFamily: M.font, fontWeight: row.hi ? 600 : 400 }}>{row.value}</span>
          </div>
        ))}
      </div>


      {/* Workflow + Artifacts — side by side */}
      <div className="flex gap-3">
        {/* Workflow */}
        <div className="flex-1 min-w-0 rounded-lg overflow-hidden" style={{ border: `1px solid ${M.rightBorder}`, backgroundColor: "white" }}>
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: M.rightBorder }}>
            <p style={{ color: M.textDark, fontSize: "13px", fontFamily: M.font, fontWeight: 600 }}>Workflow</p>
            <ChevronDown size={14} color={M.textLight} />
          </div>
          <div className="px-4 py-4">
            <WorkflowSteps steps={scenario.steps} />
          </div>
        </div>

        {/* Artifacts */}
        <div className="flex-1 min-w-0 rounded-lg overflow-hidden" style={{ border: `1px solid ${M.rightBorder}`, backgroundColor: "white" }}>
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: M.rightBorder }}>
            <p style={{ color: M.textDark, fontSize: "13px", fontFamily: M.font, fontWeight: 600 }}>Artifacts</p>
            {scenario.artifacts.length > 0 && (
              <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: M.blueBg, color: M.blue, fontFamily: M.font }}>{scenario.artifacts.length} files</span>
            )}
          </div>
          <div className="px-4 py-3">
            {scenario.artifacts.length > 0
              ? scenario.artifacts.map((a, i) => <ArtifactRow key={i} artifact={a} />)
              : <p style={{ color: M.textLight, fontSize: "12px", fontFamily: M.font, padding: "4px 0" }}>Artifacts will appear as the workflow progresses.</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ status }: { status: WorkflowStep["status"] }) {
  if (status === "done") return (
    <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "#e8f5e9", border: `1px solid ${M.green}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <CheckCircle2 size={12} color={M.green} />
    </div>
  );
  if (status === "active") return (
    <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${M.blue}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: M.blue }} />
    </div>
  );
  return (
    <div style={{ width: 20, height: 20, borderRadius: "50%", border: "1px solid #d1d5db", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#d1d5db" }} />
    </div>
  );
}

function WorkflowSteps({ steps }: { steps: WorkflowStep[] }) {
  return (
    <div className="flex flex-col">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-3 relative" style={{ paddingBottom: i < steps.length - 1 ? "16px" : "0" }}>
          {/* Vertical connector */}
          {i < steps.length - 1 && (
            <div style={{ position: "absolute", left: 10, top: 20, bottom: 0, width: 1, backgroundColor: step.status === "done" ? M.blue : "#e5e7eb" }} />
          )}
          <StepIndicator status={step.status} />
          <div style={{ paddingTop: "1px" }}>
            <p style={{ color: step.status === "pending" ? M.textLight : M.textDark, fontSize: "13px", fontFamily: M.font, fontWeight: step.status === "active" ? 600 : 400, lineHeight: "1.4" }}>{step.label}</p>
            {step.sublabel && <p style={{ color: M.textLight, fontSize: "12px", fontFamily: M.font, marginTop: "1px" }}>{step.sublabel}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function ArtifactRow({ artifact }: { artifact: Artifact }) {
  return (
    <div className="flex items-center justify-between py-2.5" style={{ borderBottom: `1px solid ${M.rightBorder}` }}>
      <div className="flex items-center gap-2">
        <FileText size={14} color={M.textLight} />
        <div>
          <p style={{ color: M.textDark, fontSize: "13px", fontFamily: M.font }}>{artifact.name}</p>
          <p style={{ color: M.textLight, fontSize: "11px", fontFamily: M.font }}>Size · {artifact.size}</p>
        </div>
      </div>
      <button><Eye size={15} color={M.textLight} /></button>
    </div>
  );
}

// ── Right panel tab content ───────────────────────────────────────────────────

type RightTab = "Overview" | "Resources" | "Cost" | "Policy" | "Infragraph";
const RIGHT_TABS: RightTab[] = ["Overview", "Resources", "Cost", "Policy", "Infragraph"];

// Detect scenario context from session title
function ctx(title: string) {
  if (title.includes("Provider Upgrade Remediation")) return "provider_upgrade";
  if (title.includes("Exception"))       return "exception";
  if (title.includes("Policy Failure"))  return "policy_failure";
  if (title.includes("Cost Analysis"))   return "cost";
  if (title.includes("Failed Run"))      return "failed";
  if (title.includes("Drift Inspection") || title.includes("State Diff")) return "drift_inspect";
  if (title.includes("Drift Remediation") || title.includes("Upgrade Campaign") && !title.includes("Terraform")) return "drift_remediation";
  if (title.includes("Terraform Upgrade Campaign")) return "tf_upgrade";
  return "drift";
}

function TabRows({ rows }: { rows: Array<{ label: string; value: string; hi?: boolean }> }) {
  return (
    <div className="rounded-lg overflow-hidden mx-5 mt-2" style={{ border: `1px solid ${M.rightBorder}` }}>
      {rows.map((r, i) => (
        <div key={i} className="flex items-start justify-between px-4 py-2.5" style={{ borderBottom: i < rows.length - 1 ? `1px solid ${M.rightBorder}` : "none", backgroundColor: i % 2 === 0 ? "white" : "#fafafa" }}>
          <span style={{ color: M.textLight, fontSize: "12px", fontFamily: M.font }}>{r.label}</span>
          <span style={{ color: r.hi ? "#da1e28" : M.textDark, fontSize: "12px", fontFamily: M.font, fontWeight: r.hi ? 600 : 400, textAlign: "right", maxWidth: "60%" }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function TabHeader({ label, badge, badgeColor = "#fff1f1", badgeText = "#da1e28" }: { label: string; badge?: string; badgeColor?: string; badgeText?: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: M.rightBorder }}>
      <p style={{ color: M.textMid, fontSize: "11px", fontFamily: M.font, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</p>
      {badge && <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: badgeColor, color: badgeText, fontFamily: M.font, fontWeight: 600 }}>{badge}</span>}
    </div>
  );
}

function ResourcesTab({ scenario }: { scenario: Scenario }) {
  const c = ctx(scenario.sessionTitle);

  if (c === "provider_upgrade") {
    return (
      <div className="flex flex-col overflow-y-auto flex-1">
        <TabHeader label="Resources · affected" badge="3 failing" badgeColor="#fff1f1" badgeText="#da1e28" />
        <TabRows rows={[
          { label: "aws_security_group_rule.allow_https", value: "payments-prod-us-east · FAILING", hi: true },
          { label: "aws_security_group_rule.allow_ssh",   value: "payments-prod-us-east · FAILING", hi: true },
          { label: "aws_security_group_rule.db_ingress",  value: "networking-prod-core · FAILING",  hi: true },
          { label: "Root cause",     value: "`type` argument removed in aws ~> 5.0" },
          { label: "Fix",           value: "Rename to aws_vpc_security_group_ingress_rule" },
          { label: "Files affected", value: "security_groups.tf · security.tf" },
          { label: "PR",            value: "#247 · ready for review" },
          { label: "Other 22 workspaces", value: "Unaffected · different resource types" },
        ]} />
        <div className="px-5 py-4">
          <p style={{ color: M.textLight, fontSize: "11px", fontFamily: M.font, lineHeight: "1.5" }}>All 3 affected resource blocks use the deprecated <code>type</code> argument removed in provider v5. PR #247 replaces them with the v5-compatible resource type.</p>
        </div>
      </div>
    );
  }

  if (c === "exception") {
    return (
      <div className="flex flex-col overflow-y-auto flex-1">
        <TabHeader label="Resources · exception context" badge="Cost driver" />
        <TabRows rows={[
          { label: "aws_rds_instance.payments-db", value: "db.r6g.large → db.r6g.2xlarge", hi: true },
          { label: "Cost before",  value: "$606.44/mo" },
          { label: "Cost after",   value: "$892.44/mo", hi: true },
          { label: "Delta",        value: "+$286/mo · 84% of overage", hi: true },
          { label: "Justification", value: "Performance SLA requirement" },
          { label: "Other 46 resources", value: "No change · within budget" },
        ]} />
        <div className="px-5 py-4">
          <p style={{ color: M.textLight, fontSize: "11px", fontFamily: M.font, lineHeight: "1.5" }}>The RDS upgrade is the sole driver of the policy exception. All other resources are within budget.</p>
        </div>
      </div>
    );
  }

  if (c === "policy_failure" || c === "failed") {
    return (
      <div className="flex flex-col overflow-y-auto flex-1">
        <TabHeader label="Resources · blocked runs" badge="3 blocked" badgeColor="#fff1f1" badgeText="#da1e28" />
        <TabRows rows={[
          { label: "#run-xK29f · payments-prod-us-east", value: "Policy failed · cost-control-v2", hi: true },
          { label: "#run-mN84k · payments-prod-eu-west",  value: "Drift + policy rejected", hi: true },
          { label: "#run-pQ17r · api-gateway-prod",       value: "AWS credentials expired" },
          { label: "Common cause", value: "cost-control-v2 · $2,340 vs $2,000 limit" },
          { label: "Resources delta", value: "+2 add · ~3 change · 0 destroy" },
        ]} />
        <div className="px-5 py-4">
          <p style={{ color: M.textLight, fontSize: "11px", fontFamily: M.font, lineHeight: "1.5" }}>All three runs are blocked at the policy check phase. No applies can proceed until the cost exception is approved or estimated cost falls under $2,000/mo.</p>
        </div>
      </div>
    );
  }

  if (c === "cost") {
    return (
      <div className="flex flex-col overflow-y-auto flex-1">
        <TabHeader label="Resources · cost drivers" badge="Over budget" />
        <TabRows rows={[
          { label: "RDS db.r6g.2xlarge", value: "$892.44/mo · +$286 delta", hi: true },
          { label: "EC2 t3.xlarge ×4",   value: "$583.20/mo" },
          { label: "NAT Gateway",        value: "$146.00/mo · +$26 delta" },
          { label: "Load Balancer",      value: "$64.80/mo" },
          { label: "S3 + misc",          value: "$653.74/mo" },
          { label: "Total vs limit",     value: "$2,340.18 vs $2,000/mo", hi: true },
        ]} />
        <div className="px-5 py-4">
          <p style={{ color: M.textLight, fontSize: "11px", fontFamily: M.font, lineHeight: "1.5" }}>RDS upgrade accounts for $286 of the $340 overage. All other resources are within expected ranges.</p>
        </div>
      </div>
    );
  }

  if (c === "tf_upgrade") {
    return (
      <div className="flex flex-col overflow-y-auto flex-1">
        <TabHeader label="Resources · upgrade scope" badge="8 workspaces" badgeColor="#fdf6dd" badgeText="#92400e" />
        <TabRows rows={[
          { label: "payments-prod-us-east", value: "HIGH · 1.5.2 · deprecated syntax", hi: true },
          { label: "payments-prod-eu-west", value: "HIGH · 1.5.2 · cross-workspace dep", hi: true },
          { label: "networking-prod-core",  value: "MED · 1.6.3 · 61 resources" },
          { label: "api-gateway-prod",      value: "MED · 1.6.3 · shared API layer" },
          { label: "data-pipeline-prod",    value: "LOW · 1.6.1 · analytics pipeline" },
          { label: "auth-service-prod",     value: "LOW · 1.6.7 · isolated service" },
          { label: "cdn-global-prod",       value: "LOW · 1.6.0 · read-only CDN config" },
          { label: "inventory-staging",     value: "LOW · 1.5.7 · non-production" },
        ]} />
        <div className="px-5 py-4">
          <p style={{ color: M.textLight, fontSize: "11px", fontFamily: M.font, lineHeight: "1.5" }}>2 HIGH risk workspaces require special attention. Wave order is determined by risk level and cross-workspace dependencies.</p>
        </div>
      </div>
    );
  }

  // Drift scenarios (default, drift_inspect, drift_remediation)
  return (
    <div className="flex flex-col overflow-y-auto flex-1">
      <TabHeader label="Drifted resources" badge="4 resources" badgeColor="#fdf6dd" badgeText="#92400e" />
      <TabRows rows={[
        { label: "aws_route_table.private-rt",   value: "networking-prod-core · 2 routes removed", hi: true },
        { label: "aws_nat_gateway.az-b",          value: "networking-prod-core · deleted outside TF", hi: true },
        { label: "aws_instance.worker-[0-3]",     value: "payments-prod-eu-west · t3.medium → t3.large" },
        { label: "aws_security_group.web-sg",     value: "payments-prod-eu-west · 3 new ingress rules" },
        { label: "Last clean state",              value: "18 hours ago" },
        { label: "Remediation",                   value: "modify 2 · recreate 1 · revert 1" },
      ]} />
      <div className="px-5 py-4">
        <p style={{ color: M.textLight, fontSize: "11px", fontFamily: M.font, lineHeight: "1.5" }}>All drifted resources are in networking-prod-core and payments-prod-eu-west. No other workspaces are affected.</p>
      </div>
    </div>
  );
}

function CostTab({ scenario }: { scenario: Scenario }) {
  const c = ctx(scenario.sessionTitle);
  const isDriftCtx = c === "drift" || c === "drift_inspect" || c === "drift_remediation";
  const isUpgrade  = c === "tf_upgrade";
  const isProvider = c === "provider_upgrade";

  if (isProvider) {
    return (
      <div className="flex flex-col overflow-y-auto flex-1">
        <TabHeader label="Cost · provider upgrade" badge="No increase" badgeColor="#defbe6" badgeText="#24a148" />
        <TabRows rows={[
          { label: "Provider upgrade cost",  value: "No additional charge" },
          { label: "Resource replacement",   value: "In-place · no reprovisioning cost" },
          { label: "Failed run cost",        value: "2 failed runs · plan phase only · minimal" },
          { label: "Campaign cost",          value: "~31 min of operator time" },
          { label: "Without remediation",    value: "Blocked deploys → growing business impact" },
        ]} />
        <div className="px-5 py-4">
          <p style={{ color: M.textLight, fontSize: "11px", fontFamily: M.font, lineHeight: "1.5" }}>Provider version changes have no direct infrastructure cost impact. The resource rename is a logical change — no AWS resources are destroyed and recreated.</p>
        </div>
      </div>
    );
  }

  if (isDriftCtx) {
    return (
      <div className="flex flex-col overflow-y-auto flex-1">
        <TabHeader label="Cost · drift impact" badge="+$47/mo" badgeColor="#fdf6dd" badgeText="#92400e" />
        <TabRows rows={[
          { label: "aws_instance.worker (current)", value: "t3.large · $94/mo", hi: true },
          { label: "aws_instance.worker (expected)", value: "t3.medium · $47/mo" },
          { label: "Cost delta from drift", value: "+$47/mo", hi: true },
          { label: "Other 47 resources", value: "No cost change" },
          { label: "Workspace total", value: "$2,293/mo (with drift)" },
        ]} />
        <div className="px-5 py-4">
          <p style={{ color: M.textLight, fontSize: "11px", fontFamily: M.font, lineHeight: "1.5" }}>Cost drift is contained to the resized instance. Remediating will return the workspace to its expected cost baseline.</p>
        </div>
      </div>
    );
  }

  if (isUpgrade) {
    return (
      <div className="flex flex-col overflow-y-auto flex-1">
        <TabHeader label="Cost · upgrade campaign" badge="No impact" badgeColor="#defbe6" badgeText="#24a148" />
        <TabRows rows={[
          { label: "Version upgrade cost", value: "No additional cost" },
          { label: "Run execution cost", value: "Applies on next triggered run" },
          { label: "HIGH risk workspaces (2)", value: "payments-prod-* · monitor after upgrade" },
          { label: "Wave 1 estimated duration", value: "< 5 minutes per workspace" },
          { label: "Rollback overhead", value: "Negligible · revert version pin" },
        ]} />
        <div className="px-5 py-4">
          <p style={{ color: M.textLight, fontSize: "11px", fontFamily: M.font, lineHeight: "1.5" }}>Terraform version upgrades have no direct infrastructure cost impact. Runs triggered by the upgrade apply at normal pricing.</p>
        </div>
      </div>
    );
  }

  // Policy / exception / cost / failed — all share the cost breakdown with threshold context
  const isException = c === "exception";
  return (
    <div className="flex flex-col overflow-y-auto flex-1">
      <TabHeader label={isException ? "Cost · exception context" : "Cost · budget exceeded"} badge="Over budget" />
      <div className="px-5 py-3 border-b" style={{ borderColor: M.rightBorder, backgroundColor: isException ? "#fffbf0" : "#fff8f8" }}>
        <p style={{ color: isException ? "#92400e" : "#da1e28", fontSize: "12px", fontFamily: M.font, fontWeight: 600 }}>
          {isException ? "Exception requested: +$340/mo over limit" : "Budget threshold exceeded · +$340/mo over limit"}
        </p>
        <p style={{ color: M.textMid, fontSize: "12px", fontFamily: M.font, marginTop: "2px" }}>Policy limit: $2,000/mo · Estimated: $2,340/mo</p>
      </div>
      {[
        { name: "RDS db.r6g.2xlarge", cost: "$892.44", delta: "+$286", note: isException ? "Root cause of exception" : "Primary cost driver", hi: true },
        { name: "EC2 t3.xlarge ×4",  cost: "$583.20", delta: "",      note: "", hi: false },
        { name: "NAT Gateway",        cost: "$146.00", delta: "+$26",  note: "", hi: false },
        { name: "Load Balancer",      cost: "$64.80",  delta: "",      note: "", hi: false },
        { name: "S3 + misc",          cost: "$653.74", delta: "",      note: "", hi: false },
      ].map((r, i) => (
        <div key={i} className="px-5 py-2.5" style={{ borderBottom: `1px solid ${M.rightBorder}`, backgroundColor: i % 2 === 0 ? "white" : "#fafafa" }}>
          <div className="flex items-center justify-between">
            <span style={{ color: r.hi ? "#da1e28" : M.textMid, fontSize: "12px", fontFamily: M.font }}>{r.name}</span>
            <div className="flex items-center gap-2">
              {r.delta && <span style={{ color: "#92400e", fontSize: "11px", fontFamily: M.font }}>{r.delta}</span>}
              <span style={{ color: r.hi ? "#92400e" : M.textDark, fontSize: "12px", fontFamily: M.font, fontWeight: r.hi ? 600 : 400 }}>{r.cost}</span>
            </div>
          </div>
          {r.note && <p style={{ color: "#92400e", fontSize: "10px", fontFamily: M.font, marginTop: "2px" }}>{r.note}</p>}
        </div>
      ))}
      <div className="flex items-center justify-between px-5 py-2.5" style={{ backgroundColor: "#f9fafb", borderTop: `1px solid ${M.rightBorder}` }}>
        <span style={{ color: M.textMid, fontSize: "12px", fontFamily: M.font, fontWeight: 600 }}>Total</span>
        <span style={{ color: "#92400e", fontSize: "13px", fontFamily: M.font, fontWeight: 700 }}>$2,340.18/mo</span>
      </div>
      {isException && (
        <div className="px-5 py-4">
          <div className="rounded-lg p-3" style={{ backgroundColor: "#f0f6ff", border: `1px solid ${M.rightBorder}` }}>
            <p style={{ color: M.textMid, fontSize: "11px", fontFamily: M.font, fontWeight: 600, marginBottom: "4px" }}>Exception justification</p>
            <p style={{ color: M.textMid, fontSize: "12px", fontFamily: M.font, lineHeight: "1.5" }}>RDS upgrade required for production performance SLA. Duration: ongoing until Q3 architecture review.</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Infragraph tab ────────────────────────────────────────────────────────────

interface GNode { id: string; label: string; sub: string; type: string; x: number; y: number; highlight?: boolean; failed?: boolean; drifted?: boolean; }
interface GEdge { from: string; to: string; failed?: boolean; highlight?: boolean; }
interface GraphData { nodes: GNode[]; edges: GEdge[]; title: string; }

const NODE_COLORS: Record<string, { fill: string; text: string; abbr: string }> = {
  workspace: { fill: "#5C4EE5", text: "white", abbr: "TF" },
  rds:       { fill: "#D97706", text: "white", abbr: "DB" },
  ec2:       { fill: "#DC2626", text: "white", abbr: "EC2" },
  volume:    { fill: "#0D9488", text: "white", abbr: "VOL" },
  iam:       { fill: "#7C3AED", text: "white", abbr: "IAM" },
  sg:        { fill: "#6B7280", text: "white", abbr: "SG" },
  policy:    { fill: "#DC2626", text: "white", abbr: "POL" },
  network:   { fill: "#2563EB", text: "white", abbr: "ENI" },
  upgrade:   { fill: "#059669", text: "white", abbr: "↑" },
  version:   { fill: "#1B1C2B", text: "white", abbr: "1.7" },
};

function getGraphData(title: string): GraphData {
  if (title.includes("Provider Upgrade Remediation")) {
    return {
      title: "Provider upgrade impact · 2 failing · 22 safe",
      nodes: [
        { id: "pv",  label: "aws ~> 5.0",              sub: "Provider · breaking change", type: "policy",    x: 300, y: 60,  failed: true },
        { id: "ws1", label: "payments-prod-us-east",   sub: "FAILING · #run-a1b2c",       type: "workspace", x: 160, y: 180, highlight: true },
        { id: "ws2", label: "networking-prod-core",    sub: "FAILING · #run-d3e4f",       type: "workspace", x: 440, y: 180, highlight: true },
        { id: "sg1", label: "aws_security_group_rule", sub: "Deprecated resource",        type: "sg",        x: 160, y: 300, failed: true },
        { id: "sg2", label: "aws_security_group_rule", sub: "Deprecated resource",        type: "sg",        x: 440, y: 300, failed: true },
        { id: "ok1", label: "payments-prod-eu-west",   sub: "Passing · unaffected",       type: "ec2",       x: 80,  y: 340 },
        { id: "ok2", label: "auth-service-prod",       sub: "Passing · unaffected",       type: "iam",       x: 300, y: 370 },
        { id: "ok3", label: "api-gateway-prod",        sub: "Passing · unaffected",       type: "network",   x: 520, y: 340 },
      ],
      edges: [
        { from: "pv",  to: "ws1", failed: true },
        { from: "pv",  to: "ws2", failed: true },
        { from: "ws1", to: "sg1", failed: true },
        { from: "ws2", to: "sg2", failed: true },
        { from: "pv",  to: "ok1" },
        { from: "pv",  to: "ok2" },
        { from: "pv",  to: "ok3" },
      ],
    };
  }

  if (title.includes("Exception") || title.includes("Policy Failure") || title.includes("Cost")) {
    return {
      title: "payments-prod-us-east · 8 resources",
      nodes: [
        { id: "ws",   label: "payments-prod-us-east", sub: "Workspace",       type: "workspace", x: 300, y: 185 },
        { id: "rds",  label: "payments-db",            sub: "db.r6g.2xlarge", type: "rds",       x: 148, y: 95,  highlight: true },
        { id: "ec2a", label: "worker-0",               sub: "t3.xlarge",       type: "ec2",       x: 452, y: 95  },
        { id: "ec2b", label: "worker-1",               sub: "t3.xlarge",       type: "ec2",       x: 510, y: 210 },
        { id: "sg",   label: "payments-db-sg",         sub: "Security Group",  type: "sg",        x: 148, y: 275 },
        { id: "iam",  label: "lambda-executor",        sub: "IAM Role",        type: "iam",       x: 452, y: 275 },
        { id: "pol",  label: "cost-control-v2",        sub: "Policy",          type: "policy",    x: 300, y: 330, failed: true },
        { id: "vol",  label: "payments-data",          sub: "EBS Volume",      type: "volume",    x: 80,  y: 185 },
      ],
      edges: [
        { from: "ws",  to: "rds",  highlight: true },
        { from: "ws",  to: "ec2a" },
        { from: "ws",  to: "ec2b" },
        { from: "ws",  to: "iam" },
        { from: "ws",  to: "pol",  failed: true },
        { from: "rds", to: "sg" },
        { from: "rds", to: "vol" },
        { from: "ec2a", to: "sg" },
      ],
    };
  }

  if (title.includes("Drift") || title.includes("State Diff")) {
    return {
      title: "my-workspace · 6 resources",
      nodes: [
        { id: "ws",   label: "my-workspace",        sub: "Workspace",      type: "workspace", x: 280, y: 185 },
        { id: "inst", label: "aws_instance.worker", sub: "t3.large (drifted)", type: "ec2", x: 140, y: 95,  drifted: true },
        { id: "vpc",  label: "payments-vpc",        sub: "VPC",            type: "network",   x: 420, y: 95  },
        { id: "sg",   label: "web-sg",              sub: "Security Group", type: "sg",        x: 140, y: 275 },
        { id: "nat",  label: "nat-gateway-az-b",    sub: "NAT Gateway (deleted)", type: "network", x: 420, y: 275, drifted: true },
        { id: "rt",   label: "private-rt",          sub: "Route Table",    type: "network",   x: 280, y: 320 },
      ],
      edges: [
        { from: "ws",   to: "inst", highlight: true },
        { from: "ws",   to: "vpc" },
        { from: "ws",   to: "sg" },
        { from: "inst", to: "sg" },
        { from: "vpc",  to: "nat",  failed: true },
        { from: "vpc",  to: "rt" },
      ],
    };
  }

  if (title.includes("Terraform Upgrade Campaign")) {
    return {
      title: "Campaign dependency map · 3 waves · risk-staged",
      nodes: [
        // Wave 1 (LOW — green) — left cluster
        { id: "w1a", label: "auth-service-prod",    sub: "Wave 1 · LOW · 1.6.7", type: "upgrade",   x: 85,  y: 120 },
        { id: "w1b", label: "cdn-global-prod",      sub: "Wave 1 · LOW · 1.6.0", type: "upgrade",   x: 85,  y: 200 },
        { id: "w1c", label: "inventory-staging",    sub: "Wave 1 · LOW · 1.5.7", type: "upgrade",   x: 85,  y: 280 },
        { id: "w1d", label: "data-pipeline-prod",   sub: "Wave 1 · LOW · 1.6.1", type: "upgrade",   x: 85,  y: 355 },
        // Wave 2 (MEDIUM — amber) — center cluster
        { id: "w2a", label: "networking-prod-core", sub: "Wave 2 · MED · 1.6.3", type: "workspace", x: 270, y: 160 },
        { id: "w2b", label: "api-gateway-prod",     sub: "Wave 2 · MED · 1.6.3", type: "workspace", x: 270, y: 280 },
        { id: "w2c", label: "data-pipeline-prod",   sub: "Wave 2 · MED · 1.6.1", type: "network",   x: 270, y: 355 },
        // Wave 3 (HIGH — red) — right cluster
        { id: "w3a", label: "payments-us-east",     sub: "Wave 3 · HIGH · 1.5.2", type: "rds",      x: 455, y: 160, highlight: true },
        { id: "w3b", label: "payments-eu-west",     sub: "Wave 3 · HIGH · 1.5.2", type: "rds",      x: 455, y: 280, highlight: true },
        // Target version — far right
        { id: "tgt", label: "Terraform 1.7.4",      sub: "Target · all waves",    type: "version",   x: 530, y: 220 },
      ],
      edges: [
        // Dependencies between workspaces
        { from: "w2a", to: "w3b", highlight: true },   // networking → payments-eu-west (dependency)
        { from: "w2b", to: "w3a" },                     // api-gateway → payments-us-east
        // Wave 3 to target
        { from: "w3a", to: "tgt", failed: true },       // payments-us-east (advisory — dashed)
        { from: "w3b", to: "tgt" },
        // Wave 2 to target
        { from: "w2a", to: "tgt" },
        { from: "w2b", to: "tgt" },
        // Wave 1 to target
        { from: "w1a", to: "tgt" },
        { from: "w1b", to: "tgt" },
        { from: "w1c", to: "tgt" },
        { from: "w1d", to: "tgt" },
      ],
    };
  }

  // Default
  return {
    title: "my-workspace · 5 resources",
    nodes: [
      { id: "ws",  label: "my-workspace",   sub: "Workspace",     type: "workspace", x: 280, y: 185 },
      { id: "rds", label: "payments-db",    sub: "RDS Instance",  type: "rds",       x: 155, y: 110 },
      { id: "ec2", label: "worker-[0-3]",   sub: "EC2 Instance",  type: "ec2",       x: 405, y: 110 },
      { id: "sg",  label: "web-sg",         sub: "Security Group",type: "sg",        x: 155, y: 270 },
      { id: "iam", label: "lambda-role",    sub: "IAM Role",      type: "iam",       x: 405, y: 270 },
    ],
    edges: [
      { from: "ws", to: "rds" },
      { from: "ws", to: "ec2" },
      { from: "ws", to: "sg" },
      { from: "ws", to: "iam" },
    ],
  };
}

function InfragraphTab({ scenario }: { scenario: Scenario }) {
  const [layout, setLayout] = React.useState("Force directed");
  const graph = getGraphData(scenario.sessionTitle);
  const R = 26; // node radius

  // Find node position by id
  const nodePos = (id: string) => graph.nodes.find(n => n.id === id) ?? { x: 0, y: 0 };

  return (
    <div className="flex flex-col overflow-hidden flex-1">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b flex-shrink-0" style={{ borderColor: M.rightBorder }}>
        <div>
          <p style={{ color: M.textMid, fontSize: "11px", fontFamily: M.font, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>Infragraph</p>
          <p style={{ color: M.textLight, fontSize: "11px", fontFamily: M.font, marginTop: "1px" }}>{graph.title}</p>
        </div>
        <div className="flex items-center gap-1">
          {["Force directed", "Stacked", "Radial"].map(l => (
            <button key={l} onClick={() => setLayout(l)} className="px-2.5 py-1 rounded text-xs" style={{ backgroundColor: layout === l ? M.blue : "#f1f2f3", color: layout === l ? "white" : M.textLight, fontFamily: M.font, fontSize: "11px", fontWeight: layout === l ? 600 : 400 }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 px-4 py-2 border-b flex-shrink-0 flex-wrap" style={{ borderColor: M.rightBorder, backgroundColor: "#fafafa" }}>
        {Object.entries(NODE_COLORS).filter(([k]) => graph.nodes.some(n => n.type === k)).map(([type, cfg]) => (
          <div key={type} className="flex items-center gap-1">
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: cfg.fill, display: "inline-block" }} />
            <span style={{ color: M.textLight, fontSize: "10px", fontFamily: M.font, textTransform: "capitalize" }}>{type}</span>
          </div>
        ))}
        {graph.nodes.some(n => n.drifted) && (
          <div className="flex items-center gap-1">
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#D97706", border: "2px dashed #D97706", display: "inline-block" }} />
            <span style={{ color: M.textLight, fontSize: "10px", fontFamily: M.font }}>drifted</span>
          </div>
        )}
      </div>

      {/* SVG graph canvas */}
      <div className="flex-1 relative overflow-hidden" style={{ backgroundColor: "#f9fafb" }}>
        <svg width="100%" height="100%" viewBox="0 0 580 390" preserveAspectRatio="xMidYMid meet">
          {/* Edges */}
          {graph.edges.map((edge, i) => {
            const a = nodePos(edge.from);
            const b = nodePos(edge.to);
            return (
              <line
                key={i}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={edge.failed ? "#DC2626" : edge.highlight ? "#5C4EE5" : "#D1D5DB"}
                strokeWidth={edge.highlight || edge.failed ? 2 : 1}
                strokeDasharray={edge.failed ? "5,3" : undefined}
                opacity={edge.failed ? 0.7 : edge.highlight ? 0.8 : 0.5}
              />
            );
          })}

          {/* Nodes */}
          {graph.nodes.map(node => {
            const cfg = NODE_COLORS[node.type] ?? NODE_COLORS.workspace;
            const isHighlighted = node.highlight;
            const isDrifted = node.drifted;
            const isFailed = node.failed;

            return (
              <g key={node.id} style={{ cursor: "pointer" }}>
                {/* Outer glow ring for highlighted/drifted/failed */}
                {(isHighlighted || isDrifted || isFailed) && (
                  <circle
                    cx={node.x} cy={node.y} r={R + 5}
                    fill="none"
                    stroke={isFailed ? "#DC2626" : isDrifted ? "#D97706" : "#5C4EE5"}
                    strokeWidth={2}
                    opacity={0.35}
                    strokeDasharray={isDrifted ? "4,2" : undefined}
                  />
                )}
                {/* Node circle */}
                <circle
                  cx={node.x} cy={node.y} r={R}
                  fill={cfg.fill}
                  opacity={0.9}
                />
                {/* Abbreviation */}
                <text
                  x={node.x} y={node.y + 1}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={cfg.text}
                  fontSize="10"
                  fontWeight="700"
                  fontFamily="Inter, system-ui"
                >
                  {cfg.abbr}
                </text>
                {/* Resource name */}
                <text
                  x={node.x} y={node.y + R + 13}
                  textAnchor="middle"
                  fill="#374151"
                  fontSize="9.5"
                  fontFamily="Inter, system-ui"
                  fontWeight="600"
                >
                  {node.label.length > 18 ? node.label.slice(0, 18) + "…" : node.label}
                </text>
                {/* Resource sub-label */}
                <text
                  x={node.x} y={node.y + R + 25}
                  textAnchor="middle"
                  fill={isDrifted ? "#D97706" : isFailed ? "#DC2626" : "#9CA3AF"}
                  fontSize="8.5"
                  fontFamily="Inter, system-ui"
                >
                  {node.sub.length > 20 ? node.sub.slice(0, 20) + "…" : node.sub}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Expand button (bottom left, like reference) */}
        <button className="absolute bottom-3 left-3 flex items-center justify-center rounded" style={{ width: 28, height: 28, backgroundColor: "white", border: `1px solid ${M.rightBorder}` }}>
          <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
            <path d="M1 1h4M1 1v4M11 11H7M11 11V7M1 11h4M1 11V7M11 1H7M11 1v4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function PolicyTab({ scenario }: { scenario: Scenario }) {
  const c = ctx(scenario.sessionTitle);

  // Cost-control policy context (exception, policy failure, cost analysis, failed runs)
  if (c === "exception" || c === "policy_failure" || c === "cost" || c === "failed") {
    return (
      <div className="flex flex-col overflow-y-auto flex-1">
        <TabHeader label="Policy · cost-control-v2" badge={c === "exception" ? "Exception pending" : "Blocked"} />
        <TabRows rows={[
          { label: "Policy", value: "cost-control-v2" },
          { label: "Rule", value: "Monthly cost estimate ≤ $2,000/mo" },
          { label: "Estimated cost", value: "$2,340/mo", hi: true },
          { label: "Overage", value: "+$340/mo (+17%)", hi: true },
          { label: "Applies to", value: "All workspaces · production tag" },
          { label: "Run blocked", value: "#run-xK29f" },
          { label: "Exception status", value: c === "exception" ? "Draft · awaiting approver" : "Not yet requested" },
        ]} />
        <div className="px-5 py-4">
          <p style={{ color: M.textLight, fontSize: "11px", fontFamily: M.font, lineHeight: "1.5" }}>
            {c === "exception"
              ? "An approver from platform-leads must grant the exception. The run applies automatically once approved."
              : "To unblock this run, prepare a cost exception packet and route it to platform-leads for approval."}
          </p>
        </div>
      </div>
    );
  }

  // Provider upgrade context
  if (c === "provider_upgrade") {
    return (
      <div className="flex flex-col overflow-y-auto flex-1">
        <TabHeader label="Policy · provider compatibility" badge="Breaking change" />
        <TabRows rows={[
          { label: "Provider version",    value: "aws ~> 5.0 (upgraded 47m ago)", hi: true },
          { label: "Breaking change",     value: "aws_security_group_rule.type removed", hi: true },
          { label: "Affected resources",  value: "3 resource blocks across 2 workspaces" },
          { label: "Policy compliance",   value: "No policy violations · issue is API breaking change" },
          { label: "Rollback option",     value: "Pin aws ~> 4.67 to revert immediately" },
          { label: "Fix option",          value: "PR #247 · resource syntax update · permanent" },
        ]} />
        <div className="px-5 py-4">
          <p style={{ color: M.textLight, fontSize: "11px", fontFamily: M.font, lineHeight: "1.5" }}>This is not a Terraform Cloud policy violation — it is an upstream AWS provider API breaking change. No policy exception is required. The fix is a code update via PR #247.</p>
        </div>
      </div>
    );
  }

  // Drift context — no policy violations, show compliance check results
  if (c === "drift" || c === "drift_inspect" || c === "drift_remediation") {
    return (
      <div className="flex flex-col overflow-y-auto flex-1">
        <TabHeader label="Policy · compliance check" badge="No violations" badgeColor="#defbe6" badgeText="#24a148" />
        <TabRows rows={[
          { label: "compliance-v2 scan", value: "Passed · 23 rules" },
          { label: "cost-control-v2", value: "Passed · within threshold" },
          { label: "security-baseline", value: "Passed" },
          { label: "Drifted resource", value: "aws_instance.worker · no policy impact" },
          { label: "Remediation plan", value: "No policy blocks expected" },
        ]} />
        <div className="px-5 py-4">
          <p style={{ color: M.textLight, fontSize: "11px", fontFamily: M.font, lineHeight: "1.5" }}>No policy violations detected. Remediating the drift does not require policy exceptions or approvals.</p>
        </div>
      </div>
    );
  }

  // Terraform upgrade — version compatibility policies
  if (c === "tf_upgrade") {
    return (
      <div className="flex flex-col overflow-y-auto flex-1">
        <TabHeader label="Policy · upgrade compatibility" badge="1 advisory" badgeColor="#fdf6dd" badgeText="#92400e" />
        <TabRows rows={[
          { label: "Version policy", value: "Terraform ≥ 1.5.0 required · ✓ All workspaces pass" },
          { label: "Provider compatibility", value: "aws ~> 4.0 · Compatible with 1.7.4" },
          { label: "Syntax advisory", value: "payments-prod-us-east · remote_state deprecation", hi: true },
          { label: "compliance-v2", value: "No new violations expected" },
          { label: "Upgrade approval", value: "Platform approval required before Wave 3" },
        ]} />
        <div className="px-5 py-4">
          <p style={{ color: M.textLight, fontSize: "11px", fontFamily: M.font, lineHeight: "1.5" }}>One syntax advisory requires attention before Wave 3. Update the deprecated <code>remote_state</code> backend attribute in payments-prod-us-east.</p>
        </div>
      </div>
    );
  }

  // Default — standard policy scan
  const rules = [
    { sev: "fail", resource: "aws_security_group.payments-db", detail: "Port 5432 exposed to 0.0.0.0/0" },
    { sev: "fail", resource: "aws_iam_role.lambda-executor",   detail: "Wildcard action: s3:*" },
    { sev: "fail", resource: "aws_s3_bucket.artifacts",        detail: "Public-read ACL enabled" },
    { sev: "warn", resource: "aws_kms_key.payments-key",       detail: "Key rotation disabled" },
    { sev: "pass", resource: "aws_vpc.payments-vpc",           detail: "VPC flow logs enabled" },
    { sev: "pass", resource: "aws_rds_instance.payments-db",   detail: "Encryption at rest" },
  ];
  return (
    <div className="flex flex-col overflow-y-auto flex-1">
      <TabHeader label="Policy scan · compliance-v2" badge="3 critical" />
      {rules.map((r, i) => (
        <div key={i} className="flex items-start gap-3 px-5 py-3" style={{ borderBottom: `1px solid ${M.rightBorder}`, backgroundColor: i % 2 === 0 ? "white" : "#fafafa" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: r.sev === "fail" ? "#da1e28" : r.sev === "warn" ? "#f1c21b" : "#24a148", marginTop: "6px", flexShrink: 0 }} />
          <div>
            <p style={{ color: r.sev === "fail" ? "#da1e28" : r.sev === "warn" ? "#92400e" : M.textMid, fontSize: "12px", fontFamily: M.font, fontWeight: 500 }}>{r.resource}</p>
            <p style={{ color: M.textLight, fontSize: "11px", fontFamily: M.font, marginTop: "2px" }}>{r.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Session list sidebar ──────────────────────────────────────────────────────

// Shared SVG icon paths (Figma Body import)
const WB_ICON_CHECK = "M7 0C5.61553 0 4.26216 0.410543 3.11101 1.17971C1.95987 1.94888 1.06266 3.04213 0.532846 4.32122C0.00303299 5.6003 -0.13559 7.00777 0.134506 8.36563C0.404603 9.7235 1.07129 10.9708 2.05026 11.9497C3.02922 12.9287 4.2765 13.5954 5.63437 13.8655C6.99224 14.1356 8.3997 13.997 9.67879 13.4672C10.9579 12.9373 12.0511 12.0401 12.8203 10.889C13.5895 9.73785 14 8.38447 14 7C14 5.14348 13.2625 3.36301 11.9497 2.05025C10.637 0.737498 8.85652 0 7 0ZM6 9.7954L3.5 7.2954L4.2953 6.5L6 8.2046L9.705 4.5L10.5029 5.29295L6 9.7954Z";
const WB_ICON_WARN  = "M7 0C3.15 0 0 3.15 0 7C0 10.85 3.15 14 7 14C10.85 14 14 10.85 14 7C14 3.15 10.85 0 7 0ZM6.45 3H7.55V8.5H6.45V3V3ZM7 11.5C6.6 11.5 6.25 11.15 6.25 10.75C6.25 10.35 6.6 10 7 10C7.4 10 7.75 10.35 7.75 10.75C7.75 11.15 7.4 11.5 7 11.5Z";

type WbSessionStatus = "complete" | "pending" | "error" | "none";

const ALL_SESSIONS: Array<{ status: WbSessionStatus; label: string; desc: string }> = [
  { status: "pending",  label: "Failed run · payments-prod",      desc: "Investigating policy failure on cost-control-v2 · 3 runs blocked"  },
  { status: "complete", label: "Policy exception · cost-control",  desc: "Exception packet drafted and routed to platform-leads for approval" },
  { status: "none",     label: "Provider upgrade · payments",      desc: "Staged upgrade campaign ready — awaiting Wave 1 approval"          },
  { status: "error",    label: "Drift remediation · networking",   desc: "Remediation plan failed policy checks · manual review required"    },
  { status: "none",     label: "Approval handoff · api-gateway",   desc: "Awaiting approval from platform-leads before rollout can proceed"  },
  { status: "none",     label: "Approval package review",          desc: "Package assembled — under review by compliance team"              },
];

function WbStatusIcon({ status }: { status: WbSessionStatus }) {
  if (status === "complete") return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7 0C3.134 0 0 3.134 0 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm-1.5 10.295L3 7.796l.993-.993 1.507 1.507L8.507 4.8l.993.993L5.5 10.295z" fill="#24a148" />
    </svg>
  );
  if (status === "pending") return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7 0C3.15 0 0 3.15 0 7s3.15 7 7 7 7-3.15 7-7-3.15-7-7-7zm-.55 3.5h1.1V8H6.45V3.5zm.55 8c-.44 0-.75-.31-.75-.75s.31-.75.75-.75.75.31.75.75-.31.75-.75.75z" fill="#f1c21b" />
    </svg>
  );
  if (status === "error") return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7 0C3.15 0 0 3.15 0 7s3.15 7 7 7 7-3.15 7-7-3.15-7-7-7zm-.55 3.5h1.1V8H6.45V3.5zm.55 8c-.44 0-.75-.31-.75-.75s.31-.75.75-.75.75.31.75.75-.31.75-.75.75z" fill="#da1e28" />
    </svg>
  );
  return null;
}

function SessionSidebar({ currentTitle, currentDesc, started, collapsed, onCollapse }: { currentTitle: string; currentDesc: string; started: boolean; collapsed: boolean; onCollapse: () => void }) {
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "white" }}>
      {/* Search + collapse button */}
      <div className="px-4 py-4 flex items-center gap-2">
        <div className="flex items-center px-3 flex-1" style={{ backgroundColor: "#f7f8fa", borderRadius: "8px", height: "40px" }}>
          <input
            placeholder="Search sessions"
            className="flex-1 bg-transparent outline-none"
            style={{ color: "#2b2c2c", fontSize: "12px", fontFamily: "'IBM Plex Sans', sans-serif" }}
          />
        </div>
        <button
          onClick={onCollapse}
          title={collapsed ? "Expand sessions" : "Collapse sessions"}
          style={{
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: M.textLight,
            flexShrink: 0,
            transition: "background 0.12s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#f0f0f0")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <svg
            width="18"
            height="15"
            viewBox="0 0 14 12"
            fill="none"
            style={{
              transform: collapsed ? "scaleX(-1)" : "scaleX(1)",
              transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <path
              d="M13 0H1C0.45 0 0 0.45 0 1V11C0 11.55 0.45 12 1 12H13C13.55 12 14 11.55 14 11V1C14 0.45 13.55 0 13 0ZM13 5.5H7.9L9.7 3.7L9 3L6 6L9 9L9.7 8.3L7.9 6.5H13V11H5V1H13V5.5Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      {/* Recent label */}
      <div className="px-5 pb-1">
        <p style={{ color: "#525252", fontSize: "11px", letterSpacing: "0.32px", fontFamily: "'IBM Plex Sans', sans-serif" }}>Recent</p>
      </div>
      {/* Active session — shown when workflow is running */}
      {started && (
        <div style={{ padding: "12px 20px", borderBottom: "1px solid #f0f0f0" }}>
          <div className="flex items-center gap-1.5" style={{ marginBottom: "6px" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" style={{ flexShrink: 0 }}>
              <circle cx="5" cy="5" r="5" fill="#3A47E6" />
            </svg>
            <span style={{ color: "#161616", fontSize: "11px", fontFamily: "'IBM Plex Sans', sans-serif" }}>Active</span>
          </div>
          <p style={{ color: "#161616", fontSize: "12px", fontWeight: 500, fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: "1.4" }}>{currentTitle}</p>
          <p style={{ color: "#525252", fontSize: "11px", letterSpacing: "0.32px", fontFamily: "'IBM Plex Sans', sans-serif", marginTop: "3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentDesc}</p>
        </div>
      )}
      {/* Previous sessions */}
      <div className="flex-1 overflow-y-auto">
        {ALL_SESSIONS.map((s, i) => (
          <div
            key={i}
            className="cursor-pointer"
            style={{ padding: "10px 20px", borderBottom: "1px solid #f0f0f0", backgroundColor: "transparent" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f7f8fa")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <div className="flex items-center gap-2">
              <WbStatusIcon status={s.status} />
              <p style={{ color: "#161616", fontSize: "12px", fontWeight: 500, fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: "1.4" }}>{s.label}</p>
            </div>
            <p style={{ color: "#525252", fontSize: "11px", letterSpacing: "0.32px", fontFamily: "'IBM Plex Sans', sans-serif", marginTop: "3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Workbench ────────────────────────────────────────────────────────────

interface WorkbenchProps {
  onClose: () => void;
  initialQuery?: string;
  pageContext?: string;
}

const CONTEXT_HINTS: Record<string, { intro: string; examples: string[] }> = {
  overview: {
    intro: "You're viewing the my-workspace overview. Ask about this workspace's state, health, drift, or runs.",
    examples: ["review drift on my-workspace", "tf-audit --cost", "inspect health of my-workspace"],
  },
  runs: {
    intro: "You're on the Runs page for my-workspace. Ask about run failures, plan diffs, or evidence exports.",
    examples: ["inspect errored run run-xK29f", "summarize 12 errored runs", "export evidence for run #290"],
  },
};

const LANDING_WORKFLOWS = [
  {
    id: "inspect",
    label: "Infrastructure Inspection",
    desc: "Search and inspect resources, runs, workspaces, and policy results across your Terraform estate.",
    query: "inspect health of my-workspace",
    color: "#0043ce",
    tags: ["Investigation", "Read-only"],
    iconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
  {
    id: "provider_upgrade",
    label: "Provider Upgrade",
    desc: "Scan for outdated providers, run compatibility checks, and roll out safely across workspaces.",
    query: "Plan upgrade aws-provider across all workspaces",
    color: "#4589ff",
    tags: ["Remediation", "Multi-workspace"],
    iconPath: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
  {
    id: "drift",
    label: "Drift Remediation",
    desc: "Detect configuration drift across workspaces and generate targeted remediation plans.",
    query: "check drift across all workspaces",
    color: "#08bdba",
    tags: ["Analysis", "Remediation"],
    iconPath: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    id: "failed_runs",
    label: "Failed Run Triage",
    desc: "Triage errored runs automatically, identify root causes, and prepare targeted fixes.",
    query: "find failed production runs",
    color: "#f1c21b",
    tags: ["Triage", "Remediation"],
    iconPath: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  },
  {
    id: "policy",
    label: "Policy Review",
    desc: "Review policy failures, draft exception packages, and prepare compliance documentation.",
    query: "audit policy failures",
    color: "#7C6FED",
    tags: ["Compliance", "Review"],
    iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    id: "tf_upgrade",
    label: "Terraform Version Upgrade",
    desc: "Staged upgrade across all workspaces with risk analysis, dry-run validation, and approval checkpoints.",
    query: "Upgrade Terraform version across all workspaces",
    color: "#7C3AED",
    tags: ["Upgrade", "Multi-workspace"],
    iconPath: "M5 10l7-7m0 0l7 7m-7-7v18",
  },
];

export function Workbench({ onClose, initialQuery, pageContext = "overview" }: WorkbenchProps) {
const [scenario, setScenario] = useState<Scenario>(SCENARIOS.default);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [started, setStarted] = useState(false);
  const [selectedLanding, setSelectedLanding] = useState<string | null>(null);
  const [rightTab, setRightTab] = useState<RightTab>("Overview");
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [sessionsPanelCollapsed, setSessionsPanelCollapsed] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (initialQuery) {
      setTimeout(() => runQuery(initialQuery), 200);
    }
  }, [initialQuery]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function runQuery(q: string) {
    if (!q.trim()) return;
    setInput("");
    setStarted(true);
    setProcessing(true);

    const sc = getScenario(q);
    setScenario(sc);
    // Set inspector tab based on query intent
    // Use scenario's preferred tab if set, otherwise auto-detect from query
    if (sc.inspectorTab) setRightTab(sc.inspectorTab);
    else if (q.toLowerCase().includes("drift")) setRightTab("Resources");
    else if (q.toLowerCase().includes("cost") || q.toLowerCase().includes("audit")) setRightTab("Cost");
    else if (q.toLowerCase().includes("policy") || q.toLowerCase().includes("security")) setRightTab("Policy");
    else setRightTab("Overview");

    // User bubble first
    const userMsg: Message = { id: mid++, role: "user", text: q };
    setMessages([userMsg]);

    // Then load scenario messages after a brief delay
    let delay = 600;
    sc.messages.forEach((msg, i) => {
      if (msg.role === "system") {
        setTimeout(() => {
          setMessages(prev => [...prev, { ...msg, id: mid++ }]);
          if (i === sc.messages.length - 1) setProcessing(false);
        }, delay);
        delay += 500;
      }
    });
  }

  function handleConfirm(msgId: number, continuation: Message[]) {
    // Mark the message as confirmed
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, confirmed: true } : m));
    // Append continuation messages with staggered delay
    let delay = 300;
    continuation.forEach((msg, i) => {
      setTimeout(() => {
        setMessages(prev => [...prev, { ...msg, id: mid++ }]);
      }, delay);
      delay += 500;
    });
    // Advance workflow steps: mark current "active" as done, next "pending" as active
    setScenario(prev => ({
      ...prev,
      steps: prev.steps.map((step, i, arr) => {
        const activeIdx = arr.findIndex(s => s.status === "active");
        if (i === activeIdx) return { ...step, status: "done" };
        if (i === activeIdx + 1) return { ...step, status: "active" };
        return step;
      }),
    }));
  }

  return (
    <div className="flex flex-col" style={{ fontFamily: M.font, width: "100%", height: "100%", overflow: "hidden" }}>
      {/* ── Top nav bar (persistent, always visible) ── */}
      {/* ── Top nav: brand + context + exit only ── */}
      <div className="flex items-center justify-between flex-shrink-0 px-4" style={{ height: "48px", backgroundColor: M.dark, borderBottom: `1px solid ${M.darkBorder}` }}>
        <div className="flex items-center gap-2.5">
          <div style={{ backgroundColor: M.blue, width: 20, height: 20, borderRadius: 4 }} className="flex items-center justify-center flex-shrink-0">
            <Terminal size={11} color="white" />
          </div>
          <span style={{ color: M.textWhite, fontSize: "13px", fontWeight: 600 }}>Terraform Signal</span>
          <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: "rgba(0,67,206,0.2)", color: "#6ea6ff", border: "1px solid rgba(0,67,206,0.4)", fontWeight: 600 }}>Workbench</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: M.green, display: "inline-block" }} className="animate-pulse" />
            <span style={{ color: M.textMutedWhite, fontSize: "12px" }}>payments-prod-us-east</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded" style={{ color: M.textDimWhite, fontSize: "11px", fontWeight: 600, backgroundColor: M.darkItem, border: `1px solid ${M.darkBorder}`, whiteSpace: "nowrap", cursor: "pointer" }}>
              <ExternalLink size={13} />Open in new tab
            </button>
            <button onClick={onClose} className="flex items-center gap-1.5 px-3 py-1.5 rounded" style={{ backgroundColor: M.blue, color: "white", fontSize: "11px", fontWeight: 600, whiteSpace: "nowrap", cursor: "pointer" }}>
              <X size={13} />Exit workbench
            </button>
          </div>
        </div>
      </div>

      {/* ── Body: session sidebar + main + right panel ── */}
      <div className="flex flex-1 min-h-0">
        {/* ── Session sidebar ── */}
        {!sessionsPanelCollapsed ? (
          <div
            className="flex-shrink-0 relative"
            style={{
              width: "260px",
              overflow: "hidden",
              borderRight: `1px solid ${M.rightBorder}`,
              transition: "width 0.28s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div style={{ width: "260px", height: "100%" }}>
              <SessionSidebar
                currentTitle={scenario.sessionTitle}
                currentDesc={scenario.sessionDesc}
                started={started}
                collapsed={sessionsPanelCollapsed}
                onCollapse={() => setSessionsPanelCollapsed(v => !v)}
              />
            </div>
          </div>
        ) : (
          /* Collapsed strip — expand button + vertical label */
          <div
            className="flex flex-col items-center flex-shrink-0"
            style={{ width: "36px", backgroundColor: "white", borderRight: `1px solid ${M.rightBorder}` }}
          >
            <button
              onClick={() => setSessionsPanelCollapsed(false)}
              title="Expand sessions"
              className="flex items-center justify-center"
              style={{ width: "36px", height: "40px", borderBottom: `1px solid ${M.rightBorder}`, color: M.textLight, cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = M.blueLight)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <svg width="18" height="15" viewBox="0 0 14 12" fill="none" style={{ transform: "scaleX(-1)" }}>
                <path d="M13 0H1C0.45 0 0 0.45 0 1V11C0 11.55 0.45 12 1 12H13C13.55 12 14 11.55 14 11V1C14 0.45 13.55 0 13 0ZM13 5.5H7.9L9.7 3.7L9 3L6 6L9 9L9.7 8.3L7.9 6.5H13V11H5V1H13V5.5Z" fill="currentColor" />
              </svg>
            </button>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: M.textLight, fontSize: "11px", fontFamily: M.font, fontWeight: 500, letterSpacing: "0.06em", writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)", userSelect: "none" }}>
                Sessions
              </span>
            </div>
          </div>
        )}

        {/* ── Main content area (50% of remaining space) ── */}
        <div className="flex flex-col" style={{ flex: "1 1 0", minWidth: 0, backgroundColor: M.mainBg }}>

          {/* ── Landing: workflow selection (shown before any session starts) ── */}
          {!started && (
            <div className="flex-1 overflow-y-auto flex flex-col px-8 py-8" style={{ minHeight: 0 }}>
              <div className="mb-6">
                <h1 style={{ color: M.textDark, fontSize: "22px", fontWeight: 300, fontFamily: M.font, margin: 0 }}>What would you like to work on?</h1>
                <p style={{ color: M.textLight, fontSize: "14px", fontFamily: M.font, marginTop: "6px" }}>Select a workflow to start a guided session, or type a custom query below.</p>
              </div>

              {/* Workflow grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {LANDING_WORKFLOWS.map(wf => {
                  const selected = selectedLanding === wf.id;
                  return (
                    <button
                      key={wf.id}
                      onClick={() => setSelectedLanding(selected ? null : wf.id)}
                      className="flex flex-col text-left rounded-xl p-4 w-full"
                      style={{
                        backgroundColor: selected ? `${wf.color}0d` : "white",
                        border: `1.5px solid ${selected ? wf.color : M.rightBorder}`,
                        transition: "border-color 0.15s, background-color 0.15s",
                        cursor: "pointer",
                      }}
                    >
                      {/* Icon + radio */}
                      <div className="flex items-start justify-between mb-3">
                        <div style={{ width: 36, height: 36, borderRadius: "10px", backgroundColor: `${wf.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={wf.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d={wf.iconPath} />
                          </svg>
                        </div>
                        {/* Radio circle */}
                        <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${selected ? wf.color : "#d1d5db"}`, backgroundColor: selected ? wf.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                          {selected && <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "white" }} />}
                        </div>
                      </div>

                      {/* Label + desc */}
                      <p style={{ color: M.textDark, fontSize: "13px", fontWeight: 600, fontFamily: M.font, marginBottom: "4px" }}>{wf.label}</p>
                      <p style={{ color: M.textLight, fontSize: "12px", fontFamily: M.font, lineHeight: "1.5", marginBottom: "10px" }}>{wf.desc}</p>

                      {/* Tags */}
                      <div className="flex gap-1.5 flex-wrap">
                        {wf.tags.map(tag => (
                          <span key={tag} style={{ fontSize: "10px", fontFamily: M.font, fontWeight: 500, color: selected ? wf.color : M.textLight, backgroundColor: selected ? `${wf.color}15` : "#f3f4f6", borderRadius: "4px", padding: "2px 7px" }}>{tag}</span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Confirm button */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => { if (selectedLanding) { const wf = LANDING_WORKFLOWS.find(w => w.id === selectedLanding); if (wf) runQuery(wf.query); } }}
                  disabled={!selectedLanding}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg"
                  style={{ backgroundColor: selectedLanding ? M.blue : "#e0e0e0", color: selectedLanding ? "white" : "#9e9e9e", fontSize: "13px", fontWeight: 600, fontFamily: M.font, cursor: selectedLanding ? "pointer" : "not-allowed", transition: "background-color 0.15s" }}
                >
                  Start session
                  <ArrowRight size={14} />
                </button>
                {selectedLanding && (
                  <span style={{ color: M.textLight, fontSize: "12px", fontFamily: M.font }}>
                    {LANDING_WORKFLOWS.find(w => w.id === selectedLanding)?.label}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* ── Active session: header + conversation ── */}
          {started && (
            <>
          {/* Session header */}
          <div className="px-8 py-4 border-b" style={{ borderColor: M.rightBorder }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 style={{ color: M.textDark, fontSize: "18px", fontWeight: 300, fontFamily: M.font, margin: 0 }}>{scenario.sessionTitle}</h1>
                <p style={{ color: M.textLight, fontSize: "14px", fontFamily: M.font, marginTop: "4px" }}>{scenario.sessionDesc}</p>
              </div>
              <span className="px-2.5 py-0.5 rounded text-xs flex-shrink-0 mt-1" style={{ backgroundColor: M.greenBg, color: M.green, fontFamily: M.font, fontWeight: 500 }}>Active</span>
            </div>
          </div>

          {/* Conversation */}
        <div className="flex-1 overflow-y-auto py-4">
          {messages.map(msg => (
            <ConversationMessage key={msg.id} msg={msg} onConfirm={handleConfirm} />
          ))}
          {processing && (
            <div className="flex items-center gap-2.5 px-6 py-3">
              <RefreshCw size={14} color={M.blue} className="animate-spin" />
              <span style={{ color: M.metaColor, fontSize: "13px", fontFamily: M.font }}>Querying workspace state…</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
            </>
          )}

        {/* Input bar (Meridian style) */}
        <div className="border-t px-6 pt-3 pb-3" style={{ borderColor: M.rightBorder }}>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full mb-2" style={{ backgroundColor: M.inputBg, border: `1px solid ${M.rightBorder}` }}>
            <Plus size={16} color={M.textLight} className="flex-shrink-0" />
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") runQuery(input); if (e.key === "Escape") onClose(); }}
              placeholder="Or type a response…"
              className="flex-1 bg-transparent outline-none"
              style={{ color: M.textDark, fontSize: "14px", fontFamily: M.font }}
              disabled={processing}
            />
          </div>
        </div>
      </div>

        {/* ── Right panel: tabbed inspector (collapsible) ── */}
        {rightPanelOpen ? (
          <div className="flex flex-col" style={{ flex: "1 1 0", minWidth: 0, backgroundColor: M.rightBg, borderLeft: `1px solid ${M.rightBorder}` }}>
            {/* Tab bar with collapse button */}
            <div className="flex items-center border-b flex-shrink-0" style={{ borderColor: M.rightBorder, backgroundColor: "white", height: "40px" }}>
              {RIGHT_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setRightTab(tab)}
                  className="flex items-center justify-center h-full px-3 border-b-2 text-xs"
                  style={{
                    color: rightTab === tab ? M.blue : M.textLight,
                    borderColor: rightTab === tab ? M.blue : "transparent",
                    fontFamily: M.font,
                    fontWeight: rightTab === tab ? 600 : 400,
                    backgroundColor: rightTab === tab ? M.blueLight : "transparent",
                    flex: 1,
                  }}
                >
                  {tab}
                </button>
              ))}
              {/* Collapse button */}
              <button
                onClick={() => setRightPanelOpen(false)}
                title="Collapse panel"
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: "36px", height: "40px", borderLeft: `1px solid ${M.rightBorder}`, color: M.textLight, backgroundColor: "white", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = M.blueLight)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "white")}
              >
                <svg width="18" height="15" viewBox="0 0 14 12" fill="none" style={{ transform: "scaleX(-1)" }}>
                  <path d="M13 0H1C0.45 0 0 0.45 0 1V11C0 11.55 0.45 12 1 12H13C13.55 12 14 11.55 14 11V1C14 0.45 13.55 0 13 0ZM13 5.5H7.9L9.7 3.7L9 3L6 6L9 9L9.7 8.3L7.9 6.5H13V11H5V1H13V5.5Z" fill="currentColor" />
                </svg>
              </button>
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto flex flex-col">
              {rightTab === "Overview" && <OverviewPanel scenario={scenario} />}
              {rightTab === "Resources" && <ResourcesTab scenario={scenario} />}
              {rightTab === "Cost" && <CostTab scenario={scenario} />}
              {rightTab === "Policy" && <PolicyTab scenario={scenario} />}
              {rightTab === "Infragraph" && <InfragraphTab scenario={scenario} />}
            </div>
          </div>
        ) : (
          /* Collapsed strip — just a thin border + expand button */
          <div
            className="flex flex-col items-center flex-shrink-0"
            style={{ width: "36px", backgroundColor: "white", borderLeft: `1px solid ${M.rightBorder}` }}
          >
            <button
              onClick={() => setRightPanelOpen(true)}
              title="Expand panel"
              className="flex items-center justify-center"
              style={{ width: "36px", height: "40px", borderBottom: `1px solid ${M.rightBorder}`, color: M.textLight, cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = M.blueLight)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <svg width="18" height="15" viewBox="0 0 14 12" fill="none">
                <path d="M13 0H1C0.45 0 0 0.45 0 1V11C0 11.55 0.45 12 1 12H13C13.55 12 14 11.55 14 11V1C14 0.45 13.55 0 13 0ZM13 5.5H7.9L9.7 3.7L9 3L6 6L9 9L9.7 8.3L7.9 6.5H13V11H5V1H13V5.5Z" fill="currentColor" />
              </svg>
            </button>
            {/* Vertical label */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span
                style={{
                  color: M.textLight,
                  fontSize: "11px",
                  fontFamily: M.font,
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transform: "rotate(180deg)",
                  userSelect: "none",
                }}
              >
                {rightTab}
              </span>
            </div>
          </div>
        )}
      </div>{/* end body flex row */}
    </div>
  );
}
