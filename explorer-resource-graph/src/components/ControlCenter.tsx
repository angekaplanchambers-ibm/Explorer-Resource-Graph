import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown, ChevronUp, Terminal, X, ArrowRight, ChevronLeft,
  RefreshCw, Plus, SlidersHorizontal, ExternalLink,
} from "lucide-react";

// ── Tokens ────────────────────────────────────────────────────────────────────
const M = {
  dark: "#131313",
  darkItem: "#262626",
  darkBorder: "#393939",
  blue: "#0043ce",
  green: "#24a148",
  amber: "#D97706",
  red: "#da1e28",
  text: "#f4f4f4",
  textDim: "#c6c6c6",
  textMuted: "#8d8d8d",
  inputBg: "rgba(236,238,242,0.1)",
  font: "'IBM Plex Sans', 'Inter', system-ui, sans-serif",
};

// SVG status icons (from Figma Body import)
const ICON_CHECK = "M7 0C5.61553 0 4.26216 0.410543 3.11101 1.17971C1.95987 1.94888 1.06266 3.04213 0.532846 4.32122C0.00303299 5.6003 -0.13559 7.00777 0.134506 8.36563C0.404603 9.7235 1.07129 10.9708 2.05026 11.9497C3.02922 12.9287 4.2765 13.5954 5.63437 13.8655C6.99224 14.1356 8.3997 13.997 9.67879 13.4672C10.9579 12.9373 12.0511 12.0401 12.8203 10.889C13.5895 9.73785 14 8.38447 14 7C14 5.14348 13.2625 3.36301 11.9497 2.05025C10.637 0.737498 8.85652 0 7 0ZM6 9.7954L3.5 7.2954L4.2953 6.5L6 8.2046L9.705 4.5L10.5029 5.29295L6 9.7954Z";
const ICON_WARN  = "M7 0C3.15 0 0 3.15 0 7C0 10.85 3.15 14 7 14C10.85 14 14 10.85 14 7C14 3.15 10.85 0 7 0ZM6.45 3H7.55V8.5H6.45V3V3ZM7 11.5C6.6 11.5 6.25 11.15 6.25 10.75C6.25 10.35 6.6 10 7 10C7.4 10 7.75 10.35 7.75 10.75C7.75 11.15 7.4 11.5 7 11.5Z";

// ── Session data ──────────────────────────────────────────────────────────────

type SessionStatus = "active" | "complete" | "pending" | "error" | "none";

const SESSIONS: Array<{ id: string; label: string; desc: string; status: SessionStatus }> = [
  { id: "s1", label: "Failed run · payments-prod",      desc: "Investigating policy failure on cost-control-v2 · 3 runs blocked",  status: "active"   },
  { id: "s2", label: "Policy exception · cost-control", desc: "Exception packet drafted and routed to platform-leads for approval", status: "complete" },
  { id: "s3", label: "Provider upgrade · payments",     desc: "Staged upgrade campaign ready — awaiting Wave 1 approval",          status: "pending"  },
  { id: "s4", label: "Drift remediation · networking",  desc: "Remediation plan failed policy checks · manual review required",    status: "error"    },
  { id: "s5", label: "Approval handoff · api-gateway",  desc: "Awaiting approval from platform-leads before rollout can proceed",  status: "none"     },
  { id: "s6", label: "Approval package review",         desc: "Package assembled — under review by compliance team",               status: "none"     },
];

function CcStatusIcon({ status }: { status: SessionStatus }) {
  if (status === "complete") return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7 0C3.134 0 0 3.134 0 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm-1.5 10.295L3 7.796l.993-.993 1.507 1.507L8.507 4.8l.993.993L5.5 10.295z" fill="#2ae781" />
    </svg>
  );
  if (status === "pending") return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7 0C3.15 0 0 3.15 0 7s3.15 7 7 7 7-3.15 7-7-3.15-7-7-7zm-.55 3.5h1.1V8H6.45V3.5zm.55 8c-.44 0-.75-.31-.75-.75s.31-.75.75-.75.75.31.75.75-.31.75-.75.75z" fill="#f3ff0d" />
    </svg>
  );
  if (status === "error") return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7 0C3.15 0 0 3.15 0 7s3.15 7 7 7 7-3.15 7-7-3.15-7-7-7zm-.55 3.5h1.1V8H6.45V3.5zm.55 8c-.44 0-.75-.31-.75-.75s.31-.75.75-.75.75.31.75.75-.31.75-.75.75z" fill="#DA1E28" />
    </svg>
  );
  return null;
}

function SessionList() {
  const [activeSession] = SESSIONS.filter(s => s.status === "active");
  const otherSessions = SESSIONS.filter(s => s.status !== "active");

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: M.dark }}>
      {/* Search — matches Figma px-[20px] py-[16px] wrapper */}
      <div style={{ padding: "16px 20px" }}>
        <div style={{ backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "8px", height: "40px", display: "flex", alignItems: "center", padding: "0 12px" }}>
          <input
            placeholder="Search sessions"
            className="flex-1 bg-transparent outline-none"
            style={{ color: "#777", fontSize: "12px", fontFamily: M.font }}
          />
        </div>
      </div>

      {/* Recent label — matches Figma px-[20px] */}
      <div style={{ padding: "0 20px 8px" }}>
        <p style={{ color: "#777", fontSize: "11px", letterSpacing: "0.32px", fontFamily: M.font }}>Recent</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Active session — special treatment: blue dot + "Active" row, then title + ⋮, then desc */}
        {activeSession && (
          <div
            className="cursor-pointer"
            style={{ padding: "12px 20px", borderBottom: `1px solid ${M.darkBorder}` }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            {/* Blue dot + Active */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
              <svg width="10" height="10" viewBox="0 0 10 10" style={{ flexShrink: 0 }}>
                <circle cx="5" cy="5" r="5" fill="#3A47E6" />
              </svg>
              <span style={{ color: "#c6c6c6", fontSize: "11px", fontFamily: M.font }}>Active</span>
            </div>
            {/* Title */}
            <p style={{ color: "#f4f4f4", fontSize: "12px", fontWeight: 500, fontFamily: M.font, lineHeight: "1.4" }}>
              {activeSession.label}
            </p>
            {/* Description */}
            <p style={{ color: "#777", fontSize: "11px", letterSpacing: "0.32px", fontFamily: M.font, marginTop: "3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {activeSession.desc}
            </p>
          </div>
        )}

        {/* Remaining sessions — icon + title, desc below */}
        {otherSessions.map(s => (
          <div
            key={s.id}
            className="cursor-pointer"
            style={{ padding: "10px 20px", borderBottom: `1px solid ${M.darkBorder}`, backgroundColor: "transparent" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <CcStatusIcon status={s.status} />
              <p style={{ color: "#c6c6c6", fontSize: "12px", fontWeight: 500, fontFamily: M.font, lineHeight: "1.4" }}>
                {s.label}
              </p>
            </div>
            <p style={{ color: "#777", fontSize: "11px", letterSpacing: "0.32px", fontFamily: M.font, marginTop: "3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Recommended Operations types ──────────────────────────────────────────────

type OpSeverity = "critical" | "warning" | "advisory" | "opportunity" | "info";

interface EvidenceRow { label: string; value: string; hi?: boolean; }
interface NextStep {
  label: string;
  description: string;
  workbenchQuery?: string; // if set → launches Workbench
}

interface RecommendedOp {
  id: string;
  severity: OpSeverity;
  icon: string;
  title: string;
  context: string;
  age: string;
  impact: string;
  evidence: EvidenceRow[];
  nextSteps: NextStep[];
}

const SEV_COLOR: Record<OpSeverity, string> = {
  critical:    "#DA1E28",
  warning:     "#D97706",
  advisory:    "#F59E0B",
  opportunity: "#059669",
  info:        "#0043CE",
};

const SEV_LABEL: Record<OpSeverity, string> = {
  critical:    "Critical",
  warning:     "Warning",
  advisory:    "Advisory",
  opportunity: "Opportunity",
  info:        "Info",
};

// ── Operations data ───────────────────────────────────────────────────────────

const OPS_BY_PAGE: Record<string, RecommendedOp[]> = {
  overview: [
    {
      id: "provider-upgrade-failure",
      severity: "critical",
      icon: "🔴",
      title: "Provider upgrade causing failed runs",
      context: "aws ~> 5.0 breaks 2 production workspaces · Failures began 5m ago",
      age: "5m ago",
      impact: "Two production workspaces began failing immediately after the AWS provider was upgraded from ~> 4.67 to ~> 5.0. The root cause is a breaking change — the `type` argument was removed from `aws_security_group_rule` in provider v5. No applies can proceed in the affected workspaces until the provider is pinned or module code is updated.",
      evidence: [
        { label: "payments-prod-us-east", value: "FAILED · #run-a1b2c · 47m ago · aws_security_group_rule.type", hi: true },
        { label: "networking-prod-core",  value: "FAILED · #run-d3e4f · 47m ago · same error", hi: true },
        { label: "Provider upgrade",      value: "aws ~> 4.67 → 5.0 · 47 minutes ago", hi: true },
        { label: "Root cause",            value: "Breaking change: `type` argument removed in aws v5" },
        { label: "Other workspaces",      value: "22 of 24 not affected · different resource usage" },
        { label: "Business impact",       value: "Production deploys blocked · HIGH severity" },
      ],
      nextSteps: [
        { label: "Review root cause analysis", description: "Full compatibility report with breaking change details and affected code paths", workbenchQuery: "Generate remediation plan for provider upgrade failure" },
        { label: "Generate remediation plan", description: "Multi-step campaign to fix and roll out the provider fix across all workspaces", workbenchQuery: "Generate remediation plan for provider upgrade failure" },
        { label: "Roll back provider version", description: "Pin aws ~> 4.67 immediately to unblock production — buy time for a proper fix", workbenchQuery: "Generate remediation plan for provider upgrade failure" },
      ],
    },
    {
      id: "failed-runs",
      severity: "critical",
      icon: "🔴",
      title: "Failed runs in payments-prod",
      context: "3 runs failed in the last hour · policy check blocked",
      age: "12m ago",
      impact: "3 production workspaces are blocked. No applies can proceed until the policy exception is approved or estimated cost is reduced below the $2,000/mo threshold.",
      evidence: [
        { label: "payments-prod-us-east", value: "FAILED · cost-control-v2 · 12m ago", hi: true },
        { label: "payments-prod-eu-west", value: "FAILED · policy + drift detected · 18m ago", hi: true },
        { label: "api-gateway-prod", value: "FAILED · AWS credentials expired · 34m ago", hi: true },
        { label: "Common cause", value: "cost-control-v2 · $2,340 vs $2,000 limit" },
      ],
      nextSteps: [
        { label: "Inspect failure details", description: "See per-run error logs and phase breakdown", workbenchQuery: "Inspect policy failure details on run-xK29f" },
        { label: "Prepare exception packet", description: "Draft and route approval for cost-control-v2", workbenchQuery: "Prepare exception packet for run-xK29f" },
        { label: "Review cost breakdown", description: "Identify which resource is driving the overage", workbenchQuery: "tf-audit --cost for run-xK29f" },
      ],
    },
    {
      id: "drift",
      severity: "warning",
      icon: "🟠",
      title: "Drift detected in my-workspace",
      context: "1 resource changed outside Terraform · 18 hours ago",
      age: "18h ago",
      impact: "aws_instance.worker was resized from t3.medium to t3.large directly in AWS. Your next Terraform apply will attempt to revert this change unless you update your configuration or run a remediation.",
      evidence: [
        { label: "Resource", value: "aws_instance.worker", hi: true },
        { label: "Change", value: "t3.medium → t3.large (outside Terraform)", hi: true },
        { label: "Detected", value: "18 hours ago" },
        { label: "Cost impact", value: "+$47/mo vs expected state" },
        { label: "Risk", value: "Next apply will revert this change" },
      ],
      nextSteps: [
        { label: "Inspect drift details", description: "View the full state diff for this resource", workbenchQuery: "Inspect drift details on my-workspace" },
        { label: "Prepare remediation plan", description: "Generate a plan to reconcile drift state", workbenchQuery: "Prepare drift remediation for my-workspace" },
        { label: "View full state diff", description: "Compare expected vs actual for all 48 resources", workbenchQuery: "View full state diff for my-workspace" },
      ],
    },
    {
      id: "tf-upgrades",
      severity: "advisory",
      icon: "🟡",
      title: "8 workspaces need Terraform upgrades",
      context: "Versions 1.5.2 – 1.6.7 detected · Latest stable: 1.7.4",
      age: "2d ago",
      impact: "8 workspaces are running outdated Terraform CLI versions. Upgrading ensures access to the latest provider compatibility, security patches, and performance improvements.",
      evidence: [
        { label: "HIGH risk (2)", value: "payments-prod-* · production + advisory", hi: true },
        { label: "MEDIUM risk (3)", value: "networking-prod-core, api-gateway-prod, data-pipeline" },
        { label: "LOW risk (3)", value: "auth-service-prod, cdn-global-prod, inventory-staging" },
        { label: "Compatibility advisory", value: "1 · deprecated syntax in payments-prod-us-east" },
        { label: "Estimated campaign duration", value: "45 – 60 minutes" },
      ],
      nextSteps: [
        { label: "Run upgrade campaign", description: "Staged 3-wave rollout with risk analysis, simulation, and approval checkpoints", workbenchQuery: "Upgrade Terraform version across all workspaces" },
      ],
    },
    {
      id: "policy-exception",
      severity: "warning",
      icon: "⚠️",
      title: "Policy exception required",
      context: "cost-control-v2 blocking run #run-xK29f · +$340/mo over budget",
      age: "12m ago",
      impact: "Run #run-xK29f is blocked at the policy check phase. The RDS instance class upgrade pushed estimated monthly cost to $2,340, exceeding the $2,000/mo limit set by cost-control-v2.",
      evidence: [
        { label: "Run", value: "#run-xK29f · payments-prod-us-east" },
        { label: "Policy", value: "cost-control-v2 · FAILED", hi: true },
        { label: "Estimated cost", value: "$2,340/mo vs $2,000 limit", hi: true },
        { label: "Root cause", value: "RDS db.r6g.large → db.r6g.2xlarge (+$286/mo)" },
        { label: "Approver required", value: "platform-leads (any 1 of 3)" },
      ],
      nextSteps: [
        { label: "Prepare exception packet", description: "Draft and route to platform-leads for approval", workbenchQuery: "Prepare exception packet for run-xK29f" },
        { label: "Inspect policy failure", description: "See full policy check results and cost breakdown", workbenchQuery: "Inspect policy failure details on run-xK29f" },
        { label: "Review cost breakdown", description: "Identify the primary cost driver", workbenchQuery: "tf-audit --cost for run-xK29f" },
      ],
    },
    {
      id: "cost-increase",
      severity: "warning",
      icon: "💰",
      title: "Cost increase detected",
      context: "+$340/mo over policy threshold · RDS upgrade is the driver",
      age: "12m ago",
      impact: "The RDS instance class upgrade in run #run-xK29f added $286/mo, pushing the total estimated cost to $2,340/mo — above the $2,000/mo budget limit enforced by cost-control-v2.",
      evidence: [
        { label: "Total monthly cost", value: "$2,340.18/mo", hi: true },
        { label: "Budget limit", value: "$2,000/mo" },
        { label: "Overage", value: "+$340/mo (+17%)", hi: true },
        { label: "Primary driver", value: "RDS db.r6g.2xlarge · +$286/mo" },
        { label: "Delta vs last run", value: "+$312/mo" },
      ],
      nextSteps: [
        { label: "Review full cost breakdown", description: "See all cost line items for this run", workbenchQuery: "tf-audit --cost for run-xK29f" },
        { label: "Prepare exception packet", description: "Route cost exception for approval", workbenchQuery: "Prepare exception packet for run-xK29f" },
      ],
    },
    {
      id: "provider-upgrade",
      severity: "info",
      icon: "🔗",
      title: "AWS provider upgrade available",
      context: "aws ~> 5.0 available · 3 workspaces on older versions",
      age: "3d ago",
      impact: "AWS provider v5.x is available and includes improved resource coverage, security patches, and better support for newer AWS services. 3 workspaces still use aws ~> 4.0.",
      evidence: [
        { label: "Current", value: "aws ~> 4.0 (3 workspaces)" },
        { label: "Available", value: "aws ~> 5.0" },
        { label: "Affected", value: "payments-prod-us-east, payments-prod-eu-west, networking-prod-core" },
        { label: "Breaking changes", value: "None confirmed · backwards compatible" },
        { label: "Recommendation", value: "Upgrade in non-production first" },
      ],
      nextSteps: [
        { label: "Plan provider upgrade campaign", description: "Staged rollout with compatibility checks and approval gates", workbenchQuery: "Upgrade Terraform version across all workspaces" },
      ],
    },
  ],
  runs: [
    {
      id: "errored-runs",
      severity: "critical",
      icon: "🔴",
      title: "12 errored runs need attention",
      context: "3 failure patterns identified · most recent 4 days ago",
      age: "4d ago",
      impact: "12 runs in my-workspace have failed with 3 distinct root causes. AWS credential expiry accounts for 5 failures and is the highest-priority fix.",
      evidence: [
        { label: "AWS credential expiry", value: "5 runs blocked at init", hi: true },
        { label: "cost-control-v2 policy", value: "4 runs blocked at policy check", hi: true },
        { label: "Provider version conflict", value: "3 runs blocked at plan" },
        { label: "Most recent failure", value: "#run-xK29f · 4 days ago" },
      ],
      nextSteps: [
        { label: "Find root causes", description: "View all 3 failure patterns with remediation paths", workbenchQuery: "find failed production runs" },
        { label: "Inspect errored run", description: "Deep-dive into run #run-xK29f", workbenchQuery: "inspect errored run run-xK29f" },
        { label: "Prepare policy exception", description: "Unblock the 4 policy-failed runs", workbenchQuery: "Prepare exception packet for run-xK29f" },
      ],
    },
    {
      id: "policy-blocking",
      severity: "warning",
      icon: "⚠️",
      title: "Policy exception blocking deployment",
      context: "cost-control-v2 · run #run-xK29f · +$340/mo over limit",
      age: "12m ago",
      impact: "Run #run-xK29f cannot apply because estimated monthly cost exceeds the cost-control-v2 threshold. An exception must be approved before the workspace can proceed.",
      evidence: [
        { label: "Run", value: "#run-xK29f · FAILED", hi: true },
        { label: "Policy", value: "cost-control-v2 · threshold $2,000/mo" },
        { label: "Est. cost", value: "$2,340/mo", hi: true },
        { label: "Approver", value: "platform-leads (3 available)" },
      ],
      nextSteps: [
        { label: "Prepare exception packet", description: "Draft, review, and route for approval", workbenchQuery: "Prepare exception packet for run-xK29f" },
        { label: "Inspect failure details", description: "See full policy check log", workbenchQuery: "Inspect policy failure details on run-xK29f" },
      ],
    },
    {
      id: "cost-overage-run",
      severity: "warning",
      icon: "💰",
      title: "Cost overage in last run",
      context: "+$312/mo vs previous run · RDS upgrade is the driver",
      age: "12m ago",
      impact: "The last run upgraded the RDS instance class from db.r6g.large to db.r6g.2xlarge, adding $286/mo. This pushed the total above the $2,000/mo policy threshold.",
      evidence: [
        { label: "Run", value: "#run-xK29f (Applied)" },
        { label: "Cost delta", value: "+$312/mo vs run #290", hi: true },
        { label: "RDS class change", value: "db.r6g.large → db.r6g.2xlarge" },
        { label: "New total", value: "$2,340/mo vs $2,000 limit" },
      ],
      nextSteps: [
        { label: "Review cost breakdown", description: "Full cost analysis for this run", workbenchQuery: "tf-audit --cost for run-xK29f" },
        { label: "Prepare cost exception", description: "Route for approval with justification", workbenchQuery: "Prepare exception packet for run-xK29f" },
      ],
    },
    {
      id: "root-cause",
      severity: "info",
      icon: "🔍",
      title: "Root cause analysis available",
      context: "3 patterns found · credential expiry is primary",
      age: "4d ago",
      impact: "An automated root cause analysis has grouped 12 errored runs into 3 failure patterns. Rotating AWS credentials would resolve 5 of the 12 failures immediately.",
      evidence: [
        { label: "Pattern 1", value: "Credential expiry · 5 runs · rotate IAM keys", hi: true },
        { label: "Pattern 2", value: "Policy threshold · 4 runs · exception needed" },
        { label: "Pattern 3", value: "Provider conflict · 3 runs · pin aws ~> 4.0" },
        { label: "Quick win", value: "Rotate credentials → resolves 5 failures" },
      ],
      nextSteps: [
        { label: "View full root cause report", description: "All 3 patterns with remediation paths", workbenchQuery: "find failed production runs" },
        { label: "Export run history", description: "Generate evidence artifact for audit", workbenchQuery: "export evidence run-guDS9dmc3dn" },
      ],
    },
    {
      id: "evidence-ready",
      severity: "opportunity",
      icon: "📋",
      title: "Evidence packet ready for run #290",
      context: "Applied run · full audit trail available",
      age: "3d ago",
      impact: "Run #290 (Login to AWS accounts using Doormat) applied successfully. An evidence packet with full audit trail, policy checks, and cost estimation is ready to export.",
      evidence: [
        { label: "Run", value: "#run-guDS9dmc3dn · Applied" },
        { label: "Policy checks", value: "2 passed · 1 advisory" },
        { label: "Cost estimation", value: "$323.30/mo" },
        { label: "Triggered by", value: "jdoe via GitHub CLI · 3 days ago" },
      ],
      nextSteps: [
        { label: "Generate evidence packet", description: "Export full audit trail with approvals and artifacts", workbenchQuery: "export evidence run-guDS9dmc3dn" },
      ],
    },
    {
      id: "plan-diff",
      severity: "info",
      icon: "🔗",
      title: "Plan diff ready for review",
      context: "run #290 · +2 add · ~3 change · 0 destroy",
      age: "3d ago",
      impact: "The last applied plan modified 5 resources. The RDS instance class upgrade accounts for the largest cost delta and was the trigger for the subsequent policy exception.",
      evidence: [
        { label: "Resources added", value: "+2 · new EC2 instances" },
        { label: "Resources changed", value: "~3 · RDS class, security groups, IAM role" },
        { label: "Resources destroyed", value: "0" },
        { label: "Cost impact", value: "+$312/mo vs previous run", hi: true },
      ],
      nextSteps: [
        { label: "View full plan diff", description: "Compare all resource changes in this run", workbenchQuery: "View full state diff for my-workspace" },
        { label: "Inspect cost impact", description: "See per-resource cost breakdown", workbenchQuery: "tf-audit --cost for run-xK29f" },
      ],
    },
  ],
  explorer: [
    {
      id: "blast-radius-candidate",
      severity: "critical",
      icon: "🔴",
      title: "Blast-radius candidate: networking-prod-core",
      context: "networking-prod-core · 6 downstream consumers · 3d ago",
      age: "3d ago",
      impact: "Changes to networking-prod-core would propagate to 6 downstream workspaces: payments-prod-us-east, payments-prod-eu-west, api-gateway-prod, auth-service-prod, data-pipeline-prod (hop 1), and cdn-global-prod (hop 2). Any VPC, subnet, or NAT gateway modification carries cross-workspace blast risk.",
      evidence: [
        { label: "Source workspace",   value: "networking-prod-core",      hi: true },
        { label: "Hop-1 consumers",    value: "5 workspaces",              hi: true },
        { label: "Hop-2 consumers",    value: "1 workspace (cdn-global)"              },
        { label: "Drifted resources",  value: "3 (vpc, subnet, nat-gw)",   hi: true },
        { label: "Last ETL update",    value: "3 min ago"                             },
      ],
      nextSteps: [
        { label: "Open blast-radius session",   description: "Full dependency traversal and remediation planning", workbenchQuery: "Show blast radius of networking-prod-core" },
        { label: "Inspect drifted resources",   description: "Review the 3 drifted resources in networking-prod-core" },
        { label: "Show in graph",               description: "Highlight blast-radius in graph panel" },
      ],
    },
    {
      id: "provider-upgrade-exposure",
      severity: "warning",
      icon: "⚠️",
      title: "Provider upgrade exposure: aws, azurerm",
      context: "3 workspaces · upgrade available · 1d ago",
      age: "1d ago",
      impact: "Resources in api-gateway-prod, data-pipeline-prod, and inventory-service-staging use provider versions with an upgrade available. aws resources in api-gateway-prod are currently in a failed run state which may be upgrade-related.",
      evidence: [
        { label: "Provider",         value: "hashicorp/aws — upgrade available",   hi: true },
        { label: "Workspaces",       value: "api-gateway-prod, data-pipeline-prod, inventory-staging" },
        { label: "Provider (azure)", value: "hashicorp/azurerm — upgrade available"               },
        { label: "Resources at risk",value: "4 resources across 3 workspaces",     hi: true },
      ],
      nextSteps: [
        { label: "Plan upgrade campaign",  description: "Staged provider upgrade across affected workspaces", workbenchQuery: "Plan provider upgrade for aws and azurerm resources" },
        { label: "Review affected resources", description: "Filter table to provider-upgrade-eligible resources" },
      ],
    },
    {
      id: "drift-resource-cluster",
      severity: "warning",
      icon: "⚠️",
      title: "Drift cluster: networking-prod-core",
      context: "3 resources changed · 18h ago",
      age: "18h ago",
      impact: "3 resources in networking-prod-core have attributes that differ from their last applied plan: aws_vpc.main, aws_subnet.private_a, and aws_nat_gateway.az_b. The NAT gateway shows a deleted state in the live environment.",
      evidence: [
        { label: "aws_vpc.main",          value: "1 attribute changed",     hi: true },
        { label: "aws_subnet.private_a",  value: "CIDR drift detected"               },
        { label: "aws_nat_gateway.az_b",  value: "Deleted in live env",     hi: true },
        { label: "Blast-radius risk",     value: "6 downstream workspaces", hi: true },
      ],
      nextSteps: [
        { label: "Prepare drift remediation", description: "Generate remediation plan for 3 drifted resources", workbenchQuery: "Prepare drift remediation for networking-prod-core resources" },
        { label: "View in dependency panel", description: "Expand dependency panel for aws_vpc.main" },
      ],
    },
    {
      id: "resource-count-anomaly",
      severity: "advisory",
      icon: "ℹ️",
      title: "Resource count spike: data-pipeline-prod",
      context: "35 resources · +12 vs org avg · 6h ago",
      age: "6h ago",
      impact: "data-pipeline-prod has 35 managed resources, 12 above the organization average of 23. The recent addition of azurerm_eventhub_namespace and azurerm_storage_account resources accounts for most of the increase.",
      evidence: [
        { label: "Current count", value: "35 resources"         },
        { label: "Org average",   value: "23 resources"         },
        { label: "Delta",         value: "+12 resources", hi: true },
        { label: "New providers", value: "azurerm (+3 resources)"  },
      ],
      nextSteps: [
        { label: "Inspect resource inventory", description: "Review all resources in data-pipeline-prod", workbenchQuery: "Inspect resource inventory for data-pipeline-prod" },
      ],
    },
  ],
};

// ── Operations feed ───────────────────────────────────────────────────────────

function OperationsFeed({ ops, onSelect }: { ops: RecommendedOp[]; onSelect: (op: RecommendedOp) => void }) {
  return (
    <div className="flex flex-col overflow-y-auto flex-1">
      <p style={{ color: M.textMuted, fontSize: "10px", padding: "6px 40px 4px 14px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, fontFamily: M.font }}>
        Recommended Operations
      </p>
      {ops.map((op, i) => (
        <button
          key={op.id}
          onClick={() => onSelect(op)}
          className="flex items-start gap-3 py-3 text-left w-full border-b"
          style={{ borderColor: M.darkBorder, paddingLeft: "16px", paddingRight: "40px" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = M.darkItem)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          {/* Severity indicator bar */}
          <div style={{ width: 3, alignSelf: "stretch", borderRadius: "2px", backgroundColor: SEV_COLOR[op.severity], flexShrink: 0, marginTop: "2px" }} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <span style={{ color: M.text, fontSize: "13px", fontFamily: M.font, fontWeight: 500, lineHeight: "1.4" }}>{op.title}</span>
              <span style={{ color: M.textMuted, fontSize: "11px", fontFamily: M.font, flexShrink: 0, marginTop: "1px" }}>{op.age}</span>
            </div>
            <p style={{ color: M.textMuted, fontSize: "12px", fontFamily: M.font, marginTop: "2px", lineHeight: "1.4" }}>{op.context}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

// ── Triage panel ──────────────────────────────────────────────────────────────

function TriagePanel({ op, onBack, onOpenWorkbench }: { op: RecommendedOp; onBack: () => void; onOpenWorkbench?: (q: string) => void }) {
  const sevColor = SEV_COLOR[op.severity];
  const sevLabel = SEV_LABEL[op.severity];

  return (
    <div className="flex flex-col overflow-y-auto flex-1">
      {/* Back row */}
      <div className="flex items-center gap-2 py-2.5 border-b" style={{ borderColor: M.darkBorder, paddingLeft: "16px", paddingRight: "40px" }}>
        <button onClick={onBack} className="flex items-center gap-1.5" style={{ color: M.textMuted, fontSize: "12px", fontFamily: M.font }}>
          <ChevronLeft size={14} /> Back
        </button>
        <div className="w-px h-4 mx-1" style={{ backgroundColor: M.darkBorder }} />
        <span style={{ color: M.textMuted, fontSize: "12px", fontFamily: M.font, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{op.title}</span>
        <span className="px-2 py-0.5 rounded text-xs flex-shrink-0" style={{ backgroundColor: `${sevColor}20`, color: sevColor, fontFamily: M.font, fontWeight: 600 }}>{sevLabel}</span>
        <span style={{ color: M.textMuted, fontSize: "11px", fontFamily: M.font, flexShrink: 0 }}>{op.age}</span>
      </div>

      {/* Impact */}
      <div className="px-4 py-3 border-b" style={{ borderColor: M.darkBorder }}>
        <p style={{ color: M.textMuted, fontSize: "10px", fontFamily: M.font, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "6px" }}>Impact</p>
        <p style={{ color: M.textDim, fontSize: "13px", fontFamily: M.font, lineHeight: "1.6" }}>{op.impact}</p>
      </div>

      {/* Evidence + Next steps — side by side */}
      <div className="flex gap-0 flex-1 min-h-0">
        {/* Evidence */}
        <div className="flex flex-col px-4 py-3 border-r overflow-y-auto" style={{ borderColor: M.darkBorder, flex: "1 1 0", minWidth: 0 }}>
          <p style={{ color: M.textMuted, fontSize: "10px", fontFamily: M.font, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px" }}>Evidence</p>
          <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${M.darkBorder}` }}>
            {op.evidence.map((row, i) => (
              <div key={i} className="flex items-start justify-between gap-2 px-3 py-2" style={{ borderBottom: i < op.evidence.length - 1 ? `1px solid ${M.darkBorder}` : "none", backgroundColor: i % 2 === 0 ? "transparent" : M.darkItem }}>
                <span style={{ color: M.textMuted, fontSize: "11px", fontFamily: M.font, flexShrink: 0 }}>{row.label}</span>
                <span style={{ color: row.hi ? sevColor : M.textDim, fontSize: "11px", fontFamily: M.font, fontWeight: row.hi ? 600 : 400, textAlign: "right" }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next steps */}
        <div className="flex flex-col px-4 py-3 overflow-y-auto" style={{ flex: "1 1 0", minWidth: 0 }}>
          <p style={{ color: M.textMuted, fontSize: "10px", fontFamily: M.font, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px" }}>Next steps</p>
          <div className="flex flex-col gap-2">
            {op.nextSteps.map((step, i) => {
              const isWorkbench = !!step.workbenchQuery;
              return (
                <button
                  key={i}
                  onClick={() => isWorkbench && onOpenWorkbench?.(step.workbenchQuery!)}
                  className="flex items-start gap-2 px-3 py-2.5 rounded-lg w-full text-left"
                  style={{ backgroundColor: M.darkItem, border: `1px solid ${M.darkBorder}` }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span style={{ color: M.textDim, fontSize: "12px", fontFamily: M.font, fontWeight: 500 }}>{step.label}</span>
                      {isWorkbench && (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded" style={{ backgroundColor: "rgba(0,67,206,0.15)", color: "#6ea6ff", fontFamily: M.font, fontSize: "10px", fontWeight: 600 }}>
                          <Terminal size={8} /> Workbench
                        </span>
                      )}
                    </div>
                    <p style={{ color: M.textMuted, fontSize: "10px", fontFamily: M.font, marginTop: "2px", lineHeight: "1.4" }}>{step.description}</p>
                  </div>
                  <ArrowRight size={12} color={M.textMuted} style={{ flexShrink: 0, marginTop: "3px" }} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Automated workflows column ────────────────────────────────────────────────

const WORKFLOWS = [
  {
    label: "Terraform version upgrades",
    desc: "Staged upgrade across all workspaces with risk analysis and approval checkpoints",
    query: "Upgrade Terraform version across all workspaces",
    color: "#7C6FED",
    bg: "rgba(124,111,237,0.12)",
    border: "rgba(124,111,237,0.25)",
    svgPath: "M12 4v8M8 8l4-4 4 4M4 16h16",  // upload arrow
  },
  {
    label: "Provider version upgrades",
    desc: "Scan for outdated providers, run compatibility checks, and roll out safely",
    query: "Plan upgrade aws-provider across all workspaces",
    color: "#4589ff",
    bg: "rgba(69,137,255,0.12)",
    border: "rgba(69,137,255,0.25)",
    svgPath: "M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm8-4v4l3 3",  // clock
  },
  {
    label: "Module upgrades",
    desc: "Identify stale module versions and coordinate upgrades across workspaces",
    query: "Plan module upgrades across all workspaces",
    color: "#08bdba",
    bg: "rgba(8,189,186,0.12)",
    border: "rgba(8,189,186,0.25)",
    svgPath: "M4 6h16M4 12h16M4 18h16",  // list
  },
  {
    label: "Fix failing runs",
    desc: "Automatically triage errored runs, identify root causes, and prepare fixes",
    query: "find failed production runs",
    color: "#f1c21b",
    bg: "rgba(241,194,27,0.12)",
    border: "rgba(241,194,27,0.25)",
    svgPath: "M12 8v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",  // warning
  },
];

function AutomatedWorkflows({ onOpenWorkbench }: { onOpenWorkbench?: (q?: string) => void }) {
  return (
    <div className="flex flex-col overflow-y-auto flex-1 min-w-0" style={{ borderLeft: `1px solid ${M.darkBorder}`, backgroundColor: "#0e0e0e" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-3 pb-2 flex-shrink-0">
        <div>
          <p style={{ color: "#f4f4f4", fontSize: "11px", fontWeight: 600, fontFamily: M.font, letterSpacing: "0.06em", textTransform: "uppercase" }}>Automated Workflows</p>
          <p style={{ color: M.textMuted, fontSize: "11px", fontFamily: M.font, marginTop: "1px" }}>Launch a multi-step campaign in the Workbench</p>
        </div>
      </div>

      {/* Workflow cards */}
      <div className="flex flex-col gap-2 px-4 pb-3">
        {WORKFLOWS.map((w) => (
          <button
            key={w.label}
            onClick={() => onOpenWorkbench?.(w.query)}
            className="flex items-start gap-3 w-full text-left rounded-lg px-3 py-3"
            style={{ backgroundColor: w.bg, border: `1px solid ${w.border}`, transition: "opacity 0.1s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            {/* Colored icon */}
            <div style={{ width: 32, height: 32, borderRadius: "8px", backgroundColor: w.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={w.svgPath} />
              </svg>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p style={{ color: "#f4f4f4", fontSize: "12px", fontFamily: M.font, fontWeight: 600, lineHeight: "1.4" }}>{w.label}</p>
              <p style={{ color: M.textMuted, fontSize: "11px", fontFamily: M.font, marginTop: "3px", lineHeight: "1.5" }}>{w.desc}</p>
            </div>

            {/* Arrow */}
            <div style={{ flexShrink: 0, marginTop: "7px" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke={w.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Main ControlCenter ────────────────────────────────────────────────────────

interface ControlCenterProps {
  initialQuery?: string;
  onQueryHandled?: () => void;
  onOpenWorkbench?: (query?: string) => void;
  pageContext?: string;
}

type PanelState = "bar" | "expanded";

export function ControlCenter({ initialQuery, onQueryHandled, onOpenWorkbench, pageContext = "overview" }: ControlCenterProps) {
  const OPS = OPS_BY_PAGE[pageContext] || OPS_BY_PAGE.overview;
  const [panel, setPanel] = useState<PanelState>("bar");
  const [activeOp, setActiveOp] = useState<RecommendedOp | null>(null);
  const [processing, setProcessing] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setActiveOp(null); }, [pageContext]);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setPanel("expanded");
      // Find matching op by keyword
      const match = OPS.find(op =>
        initialQuery.toLowerCase().includes(op.title.toLowerCase().split(" ")[0].toLowerCase()) ||
        op.nextSteps.some(s => s.workbenchQuery && initialQuery.toLowerCase().includes(s.workbenchQuery.split(" ")[0].toLowerCase()))
      );
      setProcessing(true);
      setTimeout(() => { setActiveOp(match || OPS[0]); setProcessing(false); }, 400);
      onQueryHandled?.();
    }
  }, [initialQuery]);

  function selectOp(op: RecommendedOp) {
    setProcessing(true);
    setActiveOp(null);
    setTimeout(() => { setActiveOp(op); setProcessing(false); }, 250);
  }

  return (
    <div
      className="fixed bottom-0 left-0 z-50"
      style={{ width: "100vw", boxShadow: "0 -4px 32px rgba(0,0,0,0.28)", fontFamily: M.font }}
    >
      {/* ── Expanded panel ── */}
      {panel === "expanded" && (
        <div style={{ backgroundColor: M.dark, borderTop: `1px solid ${M.darkBorder}`, position: "relative" }}>
          {/* Collapse button — top-right of drawer */}
          <button
            onClick={() => setPanel("bar")}
            style={{ position: "absolute", top: 11, right: 14, color: M.textMuted, cursor: "pointer", zIndex: 10, background: "none", border: "none", padding: 0, lineHeight: 0 }}
          >
            <ChevronDown size={16} />
          </button>
          <div className="flex" style={{ maxHeight: "320px" }}>
            {/* Session list */}
            <div className="flex-shrink-0 overflow-y-auto" style={{ width: "300px", borderRightWidth: "1px", borderRightStyle: "solid", borderRightColor: M.darkBorder }}>
              <SessionList />
            </div>

            {/* Center: feed or triage — expands to fill when workflows hidden */}
            <div className="flex-1 overflow-y-auto flex flex-col min-w-0" style={{ borderRight: (!activeOp && !processing) ? `1px solid ${M.darkBorder}` : "none", backgroundColor: M.dark }}>
              {processing && (
                <div className="flex items-center gap-3 px-5 py-5">
                  <RefreshCw size={14} color={M.blue} className="animate-spin" />
                  <p style={{ color: M.textDim, fontSize: "13px" }}>Loading…</p>
                </div>
              )}
              {!processing && activeOp && (
                <TriagePanel op={activeOp} onBack={() => setActiveOp(null)} onOpenWorkbench={onOpenWorkbench} />
              )}
              {!processing && !activeOp && (
                <OperationsFeed ops={OPS} onSelect={selectOp} />
              )}
            </div>

            {/* Right: automated workflows — only shown on feed view */}
            {!activeOp && !processing && (
              <AutomatedWorkflows onOpenWorkbench={onOpenWorkbench} />
            )}
          </div>
        </div>
      )}

      {/* ── Bar ── */}
      <div style={{ backgroundColor: M.dark, borderTop: `1px solid ${M.darkBorder}` }}>
        <div className="flex items-center gap-2 px-3 py-2">
          {/* Brand */}
          <div className="flex items-center gap-2 pr-3 border-r flex-shrink-0" style={{ borderColor: M.darkBorder }}>
            <div style={{ backgroundColor: M.blue, width: 20, height: 20, borderRadius: 4 }} className="flex items-center justify-center">
              <Terminal size={11} color="white" />
            </div>
            <span style={{ color: M.text, fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap" }}>Terraform Operator</span>
          </div>

          {/* Input */}
          <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: M.inputBg, border: `1px solid ${M.darkBorder}` }}>
            <Plus size={14} color={M.textMuted} className="flex-shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setPanel("expanded")}
              onKeyDown={e => {
                if (e.key === "Escape") setPanel("bar");
              }}
              placeholder="Search, inspect, or prepare infrastructure changes"
              className="flex-1 bg-transparent outline-none"
              style={{ color: M.text, fontSize: "13px" }}
            />
            {query && <X size={13} color={M.textMuted} className="cursor-pointer flex-shrink-0" onClick={() => { setQuery(""); setActiveOp(null); }} />}
            <div className="w-px h-4 flex-shrink-0" style={{ backgroundColor: M.darkBorder }} />
            <SlidersHorizontal size={14} color={M.textMuted} className="flex-shrink-0" />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {onOpenWorkbench && (
              <button onClick={() => onOpenWorkbench(query || undefined)} className="flex items-center gap-1.5 px-3 py-1.5 rounded" style={{ backgroundColor: M.blue, color: "white", fontSize: "11px", fontWeight: 600, whiteSpace: "nowrap", cursor: "pointer" }}>
                <Terminal size={12} />Open Workbench
              </button>
            )}
            {panel === "bar" && (
              <button
                onClick={() => setPanel("expanded")}
                className="flex items-center justify-center rounded"
                style={{ width: 28, height: 28, backgroundColor: M.darkItem, border: `1px solid ${M.darkBorder}`, color: M.textMuted, cursor: "pointer" }}
              >
                <ChevronUp size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
