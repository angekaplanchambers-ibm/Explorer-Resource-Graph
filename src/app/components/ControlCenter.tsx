import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown, Terminal, X, ChevronLeft,
  RefreshCw, Plus, ExternalLink, Pen,
} from "lucide-react";
import { TFSignalChat } from "./TFSignalChat";

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

function SessionList({ onCollapse }: { onCollapse?: () => void }) {
  const [activeSession] = SESSIONS.filter(s => s.status === "active");
  const otherSessions = SESSIONS.filter(s => s.status !== "active");

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: M.dark }}>
      {/* Search + collapse button */}
      <div style={{ padding: "16px 20px 16px 20px", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "8px", height: "40px", display: "flex", alignItems: "center", padding: "0 12px", flex: 1 }}>
          <input
            placeholder="Search sessions"
            className="flex-1 bg-transparent outline-none"
            style={{ color: "#777", fontSize: "12px", fontFamily: M.font }}
          />
        </div>
        {onCollapse && (
          <button
            onClick={onCollapse}
            title="Collapse sessions"
            style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, border: "none", background: "transparent", cursor: "pointer", color: M.textMuted, flexShrink: 0, transition: "background 0.12s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <svg width="18" height="15" viewBox="0 0 14 12" fill="none">
              <path d="M13 0H1C0.45 0 0 0.45 0 1V11C0 11.55 0.45 12 1 12H13C13.55 12 14 11.55 14 11V1C14 0.45 13.55 0 13 0ZM13 5.5H7.9L9.7 3.7L9 3L6 6L9 9L9.7 8.3L7.9 6.5H13V11H5V1H13V5.5Z" fill="currentColor" />
            </svg>
          </button>
        )}
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
  workbenchQuery?: string;
  suggestions?: Array<{ label: string; sublabel: string; query: string; navTo?: string }>;
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
  runDetail: [
    {
      id: "ibm-cloudability-failed",
      severity: "critical",
      icon: "🔴",
      title: "IBM Cloudability failed",
      context: "Gated cost guardrail failure will block execution",
      age: "now",
      impact: "Gated — the $588 guardrail failed and is set to block execution. This is what caused the overall task failure and prevented the Terraform apply from proceeding.",
      evidence: [
        { label: "module.rds.aws_db_instance.main[0]", value: "$943.5 final cost · +$43.51 impact", hi: true },
        { label: "module.rds.aws_db_instance.main[4]", value: "$943.5 final cost · +$43.51 impact", hi: true },
        { label: "module.rds.aws_db_instance.main[3]", value: "$943.5 final cost · +$43.51 impact", hi: true },
        { label: "gp2_description storage component", value: "adds +$12.51" },
      ],
      nextSteps: [
        { label: "Breakdown the budget that contributed to cost increase", description: "Analyze which resources and components drove the cost above the $588 guardrail threshold", workbenchQuery: "Breakdown the budget that contributed to cost increase for IBM Cloudability guardrail failure", suggestions: [{ label: "Review a remediation workflow", sublabel: "See how Workbench walks you through a structured fix — right-sizing, cost reduction, or a phased apply", query: "Show me a remediation workflow for bringing cost under the IBM Cloudability guardrail" }, { label: "Review workspace variables", sublabel: "Check if instance class or sizing is controlled by a variable you can update now", query: "review workspace variables", navTo: "variables" }, { label: "Why are there 3 separate instances?", sublabel: "Consolidate to Multi-AZ or Aurora — biggest saving", query: "Why are there 3 separate RDS instances and can they be consolidated?" }] },
        { label: "Prepare exception packet", description: "Draft a cost exception request and route it to platform-leads for approval to unblock the apply", workbenchQuery: "Prepare exception packet for IBM Cloudability guardrail failure on run-gRf9Hj2sNc" },
        { label: "Propose a cost reduction", description: "Identify which resources can be right-sized or deferred to bring the projected cost under the $588 threshold", workbenchQuery: "Propose cost reduction plan to pass IBM Cloudability guardrail on run-gRf9Hj2sNc" },
      ],
    },
    {
      id: "pre-apply-mandatory-failure",
      severity: "critical",
      icon: "🔴",
      title: "Mandatory policy check failed",
      context: "Pre-apply phase blocked · 1 mandatory failure · run cannot proceed",
      age: "now",
      impact: "The pre-apply phase recorded 1 mandatory policy failure in addition to the Cloudability guardrail. Mandatory failures cannot be bypassed with an exception — the policy itself must be satisfied before this run can apply.",
      evidence: [
        { label: "Pre-apply result",      value: "1 passed · 1 failed · 1 failed (Mandatory)", hi: true },
        { label: "Mandatory failure",     value: "Policy check blocked apply phase entirely", hi: true },
        { label: "Advisory failure",      value: "1 additional non-blocking policy failure" },
        { label: "Cloudability guardrail", value: "Separate gated failure — also blocking" },
        { label: "Resolution path",       value: "Mandatory policy must pass before apply can proceed" },
      ],
      nextSteps: [
        { label: "Inspect pre-apply policy failures", description: "View the full policy check log and identify which mandatory rule failed", workbenchQuery: "Inspect policy failure details on run-xK29f" },
        { label: "Review policy configuration", description: "Check whether the mandatory policy can be updated or if a code change is needed", workbenchQuery: "find failed production runs" },
      ],
    },
    {
      id: "resource-destruction-warning",
      severity: "warning",
      icon: "⚠️",
      title: "1 resource scheduled for destruction",
      context: "Plan shows -1 destroy · review before re-triggering run",
      age: "now",
      impact: "The current plan includes the destruction of 1 resource. Once the blocking failures are resolved and the run proceeds, this destruction will execute automatically. Confirm the deletion is intentional before unblocking the apply.",
      evidence: [
        { label: "Plan delta",     value: "+2 add · ~0 change · 1 destroy", hi: true },
        { label: "Destroy action", value: "1 resource flagged for permanent removal" },
        { label: "Risk",           value: "Destruction is irreversible — confirm intent before apply" },
        { label: "State lock",     value: "Workspace locked by johndoe · changes gated" },
      ],
      nextSteps: [
        { label: "View plan diff", description: "Identify which resource is being destroyed and confirm it is expected", workbenchQuery: "View full state diff for my-workspace" },
      ],
    },
    {
      id: "workspace-lock",
      severity: "advisory",
      icon: "🟡",
      title: "Workspace locked by johndoe",
      context: "Lock active · new runs will queue until released",
      age: "now",
      impact: "my-workspace is currently locked by johndoe. Any new runs triggered while the lock is held will queue and wait. Once the current blocking failures are resolved and the apply completes, the lock should be released or transferred.",
      evidence: [
        { label: "Lock holder",  value: "johndoe", hi: true },
        { label: "Lock state",   value: "Active · set at time of this run" },
        { label: "Effect",       value: "Queues all incoming run triggers" },
        { label: "Release path", value: "Manual unlock or automatic release after apply" },
      ],
      nextSteps: [
        { label: "Review lock status", description: "Confirm whether johndoe's lock is still needed or can be released", workbenchQuery: "inspect health of my-workspace" },
      ],
    },
  ],
  runs: [
    {
      id: "ibm-cloudability-failed",
      severity: "critical",
      icon: "🔴",
      title: "IBM Cloudability failed",
      context: "Gated cost guardrail failure will block execution",
      age: "now",
      impact: "Gated — the $588 guardrail failed and is set to block execution. This is what caused the overall task failure and prevented the Terraform apply from proceeding.",
      evidence: [
        { label: "module.rds.aws_db_instance.main[0]", value: "$943.5 final cost · +$43.51 impact", hi: true },
        { label: "module.rds.aws_db_instance.main[4]", value: "$943.5 final cost · +$43.51 impact", hi: true },
        { label: "module.rds.aws_db_instance.main[3]", value: "$943.5 final cost · +$43.51 impact", hi: true },
        { label: "gp2_description storage component", value: "adds +$12.51" },
      ],
      nextSteps: [
        { label: "Breakdown the budget that contributed to cost increase", description: "Analyze which resources and components drove the cost above the $588 guardrail threshold", workbenchQuery: "Breakdown the budget that contributed to cost increase for IBM Cloudability guardrail failure", suggestions: [{ label: "Review a remediation workflow", sublabel: "See how Workbench walks you through a structured fix — right-sizing, cost reduction, or a phased apply", query: "Show me a remediation workflow for bringing cost under the IBM Cloudability guardrail" }, { label: "Review workspace variables", sublabel: "Check if instance class or sizing is controlled by a variable you can update now", query: "review workspace variables", navTo: "variables" }, { label: "Why are there 3 separate instances?", sublabel: "Consolidate to Multi-AZ or Aurora — biggest saving", query: "Why are there 3 separate RDS instances and can they be consolidated?" }] },
        { label: "Prepare exception packet", description: "Draft a cost exception request and route it to platform-leads for approval to unblock the apply", workbenchQuery: "Prepare exception packet for IBM Cloudability guardrail failure on run-gRf9Hj2sNc" },
        { label: "Propose a cost reduction", description: "Identify which resources can be right-sized or deferred to bring the projected cost under the $588 threshold", workbenchQuery: "Propose cost reduction plan to pass IBM Cloudability guardrail on run-gRf9Hj2sNc" },
      ],
    },
    {
      id: "pre-apply-mandatory-failure",
      severity: "critical",
      icon: "🔴",
      title: "Mandatory policy check failed",
      context: "Pre-apply phase blocked · 1 mandatory failure · run cannot proceed",
      age: "now",
      impact: "The pre-apply phase recorded 1 mandatory policy failure in addition to the Cloudability guardrail. Mandatory failures cannot be bypassed with an exception — the policy itself must be satisfied before this run can apply.",
      evidence: [
        { label: "Pre-apply result",      value: "1 passed · 1 failed · 1 failed (Mandatory)", hi: true },
        { label: "Mandatory failure",     value: "Policy check blocked apply phase entirely", hi: true },
        { label: "Advisory failure",      value: "1 additional non-blocking policy failure" },
        { label: "Cloudability guardrail", value: "Separate gated failure — also blocking" },
        { label: "Resolution path",       value: "Mandatory policy must pass before apply can proceed" },
      ],
      nextSteps: [
        { label: "Inspect pre-apply policy failures", description: "View the full policy check log and identify which mandatory rule failed", workbenchQuery: "Inspect policy failure details on run-xK29f" },
        { label: "Review policy configuration", description: "Check whether the mandatory policy can be updated or if a code change is needed", workbenchQuery: "find failed production runs" },
      ],
    },
    {
      id: "iam-rotation-failed",
      severity: "critical",
      icon: "🔴",
      title: "IAM credential rotation failed",
      context: "run #run-nV8wQs4Ybc · GitHub Actions OIDC token rejected at init",
      age: "4d ago",
      impact: "The 'Rotate IAM credentials' run failed during the init phase — the GitHub Actions OIDC token used to assume the deployment role was rejected by AWS STS. All subsequent runs triggered from this pipeline will fail at the same step until the role trust policy is updated or the token is refreshed.",
      evidence: [
        { label: "Run",           value: "#run-nV8wQs4Ybc · FAILED · init phase", hi: true },
        { label: "Trigger",       value: "jdoe via GitHub Actions · 4 days ago" },
        { label: "Error",         value: "AssumeRoleWithWebIdentity: Not authorized", hi: true },
        { label: "Affected role", value: "arn:aws:iam::123456789012:role/terraform-deploy" },
        { label: "Impact",        value: "All GitHub Actions-triggered runs blocked at init" },
      ],
      nextSteps: [
        { label: "Inspect init phase error", description: "View the full STS error and identify whether the trust policy or the token audience is misconfigured", workbenchQuery: "Inspect init failure for run-nV8wQs4Ybc IAM rotation" },
        { label: "Update role trust policy", description: "Generate the corrected trust policy with the right OIDC conditions for this repository", workbenchQuery: "Generate corrected IAM trust policy for GitHub Actions OIDC on run-nV8wQs4Ybc" },
        { label: "Re-trigger rotation run", description: "Queue a new run once the trust policy is fixed to complete the credential rotation", workbenchQuery: "Re-trigger IAM credential rotation after trust policy fix" },
      ],
    },
    {
      id: "cost-optimization-run-failed",
      severity: "warning",
      icon: "💰",
      title: "Cost optimization run failed its own guardrail",
      context: "run #run-pL3kXt9Umn · cost/rds-resize branch · RDS resize pushed cost over threshold",
      age: "5d ago",
      impact: "The 'Apply cost optimization changes' run on branch cost/rds-resize was blocked by IBM Cloudability — the RDS resize it intended to apply temporarily exceeded the $588 guardrail during the transition window. The optimization is valid but needs a phased approach or a short-term exception to land.",
      evidence: [
        { label: "Run",          value: "#run-pL3kXt9Umn · FAILED · cost/rds-resize", hi: true },
        { label: "Trigger",      value: "jdoe via GitHub · 5 days ago" },
        { label: "Guardrail",    value: "IBM Cloudability $588 threshold · FAILED", hi: true },
        { label: "Cause",        value: "RDS resize peaks above threshold during migration window" },
        { label: "Net saving",   value: "-$34/mo once resize completes · optimization is valid" },
      ],
      nextSteps: [
        { label: "Propose a phased resize plan", description: "Break the RDS resize into steps that stay under the guardrail at each stage", workbenchQuery: "Propose phased RDS resize plan for cost/rds-resize to stay under IBM Cloudability threshold" },
        { label: "Prepare short-term exception", description: "Request a one-time guardrail exception for the transition window, with the final saving as justification", workbenchQuery: "Prepare guardrail exception for cost/rds-resize run-pL3kXt9Umn" },
      ],
    },
    {
      id: "workspace-trigger-config-failed",
      severity: "warning",
      icon: "⚠️",
      title: "Workspace trigger update failed",
      context: "run #run-xK29fMp7Rq · trigger configuration change blocked at plan",
      age: "4d ago",
      impact: "The 'Update workspace triggers' run failed during the plan phase. The proposed trigger configuration references a VCS branch pattern that no longer exists, causing Terraform to error before any changes could be evaluated.",
      evidence: [
        { label: "Run",      value: "#run-xK29fMp7Rq · FAILED · plan phase", hi: true },
        { label: "Trigger",  value: "jdoe via GitHub · 4 days ago" },
        { label: "Error",    value: "VCS branch pattern 'release/*' not found in repo", hi: true },
        { label: "Effect",   value: "Trigger config unchanged — workspace still on old settings" },
        { label: "Risk",     value: "Intended auto-apply rules are not active" },
      ],
      nextSteps: [
        { label: "Inspect plan error", description: "View the full plan log to confirm the missing branch pattern is the sole blocker", workbenchQuery: "Inspect plan failure for workspace trigger update run-xK29fMp7Rq" },
        { label: "Update trigger configuration", description: "Correct the branch pattern in the workspace trigger config and re-queue the run", workbenchQuery: "Fix VCS branch pattern in workspace trigger config for run-xK29fMp7Rq" },
      ],
    },
    {
      id: "sha-plan-unapplied",
      severity: "advisory",
      icon: "🟡",
      title: "Trusted SHA plan unapplied for 3 days",
      context: "run #run-bKm3Tn6xZv · plan-only · jdoe/SHA-Setup-23346 branch",
      age: "3d ago",
      impact: "The 'Use new trusted SHA' plan ran successfully 3 days ago on jdoe/SHA-Setup-23346 but has never been applied. Plan-only runs expire — if the plan drifts from current state before it is applied, the workspace will need to re-plan. The SHA update itself is low-risk but the longer it sits, the more likely a re-plan will be needed.",
      evidence: [
        { label: "Run",      value: "#run-bKm3Tn6xZv · Planned and finished · 3d ago" },
        { label: "Branch",   value: "jdoe/SHA-Setup-23346" },
        { label: "Trigger",  value: "jdoe via GitHub" },
        { label: "Status",   value: "Plan complete · apply never triggered", hi: true },
        { label: "Risk",     value: "Plan may drift if workspace state changes before apply" },
      ],
      nextSteps: [
        { label: "Apply the SHA update", description: "Trigger the apply for run #run-bKm3Tn6xZv before the plan expires or drifts", workbenchQuery: "Apply trusted SHA plan run-bKm3Tn6xZv on jdoe/SHA-Setup-23346" },
        { label: "Check for plan drift", description: "Verify the plan is still valid against current workspace state before applying", workbenchQuery: "Check plan drift for run-bKm3Tn6xZv SHA-Setup-23346" },
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

function TriagePanel({ op, onBack, onStepClick, onOpenWorkbench }: { op: RecommendedOp; onBack: () => void; onStepClick: (step: NextStep) => void; onOpenWorkbench?: (q: string) => void }) {
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
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: 1, minWidth: 0 }}>
          <span style={{ color: M.textMuted, fontSize: "12px", fontFamily: M.font, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{op.title}</span>
          <span className="px-2 py-0.5 rounded text-xs flex-shrink-0" style={{ backgroundColor: `${sevColor}20`, color: sevColor, fontFamily: M.font, fontWeight: 600 }}>{sevLabel}</span>
        </div>
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
                <div
                  key={i}
                  onClick={() => onStepClick(step)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg w-full text-left cursor-pointer"
                  style={{ backgroundColor: M.darkItem, border: `1px solid ${M.darkBorder}` }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  <div className="flex-1 min-w-0">
                    <p style={{ color: M.textDim, fontSize: "12px", fontFamily: M.font, fontWeight: 500 }}>{step.label}</p>
                    <p style={{ color: M.textMuted, fontSize: "10px", fontFamily: M.font, marginTop: "2px", lineHeight: "1.4" }}>{step.description}</p>
                  </div>
                  {isWorkbench && (
                    <span
                      role="button"
                      onClick={e => { e.stopPropagation(); onOpenWorkbench?.(step.workbenchQuery!); }}
                      style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "transparent", color: "#4f8fff", border: "1px solid rgba(79,143,255,0.5)", fontSize: "11px", fontWeight: 600, fontFamily: M.font, padding: "4px 9px", borderRadius: "4px", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(79,143,255,0.1)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                    >
                      <Terminal size={10} /> Open in Workbench
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Dock side toggle icons ─────────────────────────────────────────────────────

type DockSide = "bottom" | "right";

function DockSideToggle({ value, onChange }: { value: DockSide; onChange: (v: DockSide) => void }) {
  const btnBase: React.CSSProperties = { width: 24, height: 24, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "none", transition: "background 0.15s" };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
      <span style={{ color: M.textMuted, fontSize: "11px", fontFamily: M.font, fontWeight: 500, whiteSpace: "nowrap" }}>Dock side</span>
      <div style={{ display: "flex", gap: "2px", backgroundColor: M.darkItem, borderRadius: 5, padding: 2, border: `1px solid ${M.darkBorder}` }}>
        {/* Bottom-dock icon */}
        <button
          style={{ ...btnBase, backgroundColor: value === "bottom" ? "#2a2a40" : "transparent" }}
          onClick={() => onChange("bottom")}
          title="Dock to bottom"
        >
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
            <rect x="0.5" y="0.5" width="13" height="11" rx="1.5" stroke={value === "bottom" ? "#4f8fff" : M.textMuted} strokeWidth="1" />
            <rect x="1" y="7" width="12" height="4" rx="1" fill={value === "bottom" ? "#4f8fff" : M.textMuted} opacity={value === "bottom" ? 0.9 : 0.35} />
          </svg>
        </button>
        {/* Right-dock icon */}
        <button
          style={{ ...btnBase, backgroundColor: value === "right" ? "#2a2a40" : "transparent" }}
          onClick={() => onChange("right")}
          title="Dock to right"
        >
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
            <rect x="0.5" y="0.5" width="13" height="11" rx="1.5" stroke={value === "right" ? "#4f8fff" : M.textMuted} strokeWidth="1" />
            <rect x="8" y="1" width="5" height="10" rx="1" fill={value === "right" ? "#4f8fff" : M.textMuted} opacity={value === "right" ? 0.9 : 0.35} />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Step detail panel ─────────────────────────────────────────────────────────

function StepDetailPanel({ op, step, onBack, onOpenWorkbench, showBudgetTable, onCollapse, onNavigate, dockMode, onDockChange }: { op: RecommendedOp; step: NextStep; onBack: () => void; onOpenWorkbench?: (q: string) => void; showBudgetTable?: boolean; onCollapse?: () => void; onNavigate?: (dest: string) => void; dockMode?: "bottom" | "right"; onDockChange?: (m: "bottom" | "right") => void }) {
  const sevColor = SEV_COLOR[op.severity];
  const sevLabel = SEV_LABEL[op.severity];

  // Enter animation — fade + slide from left for main content, slide from right for evidence
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  const mainEnter: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : "translateX(-10px)",
    transition: "opacity 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)",
  };
  const evidenceEnter: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : "translateX(24px)",
    transition: "opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) 0.06s, transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) 0.06s",
  };

  const suggestions = step.suggestions ?? [
    { label: "Walk me through this step by step", sublabel: "Explain each action and its effect", query: `Walk me through step by step: ${step.workbenchQuery || step.label}` },
    { label: "What's the lowest-risk approach?", sublabel: "Prioritise safety and reversibility", query: `What's the lowest-risk approach for: ${step.workbenchQuery || step.label}` },
    { label: "What are the trade-offs?", sublabel: "Pros, cons, and alternatives", query: `What are the trade-offs for: ${step.workbenchQuery || step.label}` },
  ];

  function launch(q: string) { onOpenWorkbench?.(q); }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", backgroundColor: M.dark }}>
      {/* Breadcrumb row */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px 8px 16px", borderBottom: `1px solid ${M.darkBorder}`, flexShrink: 0 }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: "4px", color: M.textMuted, fontSize: "12px", fontFamily: M.font, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <ChevronLeft size={14} /> Back
        </button>
        <div style={{ width: 1, height: 16, backgroundColor: M.darkBorder, margin: "0 4px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: 1, minWidth: 0 }}>
          <span style={{ color: M.textMuted, fontSize: "12px", fontFamily: M.font, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{op.title}</span>
          <span style={{ backgroundColor: `${sevColor}20`, color: sevColor, fontFamily: M.font, fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "4px", flexShrink: 0 }}>{sevLabel}</span>
          {step.workbenchQuery && (
            <button
              onClick={() => onOpenWorkbench?.(step.workbenchQuery!)}
              style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "transparent", color: "#4f8fff", border: "1px solid rgba(79,143,255,0.4)", fontSize: "11px", fontWeight: 600, fontFamily: M.font, padding: "3px 9px", borderRadius: "4px", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(79,143,255,0.1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
            >
              <Terminal size={10} /> Open in Workbench
            </button>
          )}
        </div>
        <div style={{ width: 1, height: 16, backgroundColor: M.darkBorder, margin: "0 4px" }} />
        <DockSideToggle value={(dockMode ?? "bottom") as DockSide} onChange={v => onDockChange?.(v)} />
        {onCollapse && (
          <>
            <div style={{ width: 1, height: 16, backgroundColor: M.darkBorder, margin: "0 2px" }} />
            <button onClick={onCollapse} style={{ display: "flex", alignItems: "center", justifyContent: "center", color: M.textMuted, cursor: "pointer", background: "none", border: "none", padding: "2px", lineHeight: 0, flexShrink: 0 }}>
              <ChevronDown size={15} />
            </button>
          </>
        )}
      </div>

      {/* Main row: response area + evidence sidebar — animated entry */}
      <div style={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden" }}>

        {/* Left: response + suggestions footer */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden", ...mainEnter }}>

          {/* Scrollable response area */}
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 0", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: M.blue, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <Terminal size={11} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: M.text, fontSize: "13px", fontFamily: M.font, fontWeight: 500, marginBottom: "6px", lineHeight: "1.5" }}>{step.label}</p>
                <p style={{ color: M.textDim, fontSize: "12px", fontFamily: M.font, lineHeight: "1.7" }}>{step.description}</p>
                {showBudgetTable && <div style={{ width: "50%" }}><BudgetBreakdownTable /></div>}
              </div>
            </div>
          </div>

          {/* Suggestions footer */}
          <div style={{ borderTop: `1px solid ${M.darkBorder}`, backgroundColor: "#111111", padding: "10px 16px 12px", flexShrink: 0 }}>
            <p style={{ color: M.textMuted, fontSize: "10px", fontFamily: M.font, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px" }}>What would you like to do?</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
              {suggestions.map((s, i) => {
                const isNav = !!s.navTo;
                return (
                  <button
                    key={i}
                    onClick={() => isNav ? onNavigate?.(s.navTo!) : launch(s.query)}
                    style={{ backgroundColor: M.darkItem, border: `1px solid ${M.darkBorder}`, borderRadius: "6px", padding: "8px 10px", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: "2px" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = M.blue)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = M.darkBorder)}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "4px", overflow: "hidden" }}>
                      <span style={{ color: M.textDim, fontSize: "12px", fontFamily: M.font, fontWeight: 500, lineHeight: "1.5", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.label}</span>
                      {isNav && (
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ flexShrink: 0 }}>
                          <path d="M2 9L9 2M9 2H4M9 2V7" stroke={M.textMuted} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span style={{ color: M.textMuted, fontSize: "11px", fontFamily: M.font, lineHeight: "1.4", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.sublabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: evidence sidebar — slides in from right */}
        <div style={{ width: "20%", minWidth: 180, flexShrink: 0, borderLeft: `1px solid ${M.darkBorder}`, backgroundColor: "#0d0d0d", display: "flex", flexDirection: "column", overflow: "hidden", ...evidenceEnter }}>
          <div style={{ padding: "12px 16px 8px", borderBottom: `1px solid ${M.darkBorder}`, flexShrink: 0 }}>
            <p style={{ color: M.textMuted, fontSize: "10px", fontFamily: M.font, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>Evidence</p>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 12px" }}>
            <div style={{ border: `1px solid ${M.darkBorder}`, borderRadius: "10px", overflow: "hidden" }}>
              {op.evidence.map((row, i) => (
                <div key={i} style={{ padding: "8px 12px", borderBottom: i < op.evidence.length - 1 ? `1px solid ${M.darkBorder}` : "none", backgroundColor: i % 2 === 0 ? "transparent" : M.darkItem }}>
                  <p style={{ color: M.textMuted, fontSize: "10px", fontFamily: M.font, marginBottom: "1px" }}>{row.label}</p>
                  <p style={{ color: row.hi ? sevColor : M.textDim, fontSize: "11px", fontFamily: M.font, fontWeight: row.hi ? 600 : 400 }}>{row.value}</p>
                </div>
              ))}
            </div>
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
    label: "Run analyzer",
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
          <p style={{ color: "#f4f4f4", fontSize: "11px", fontWeight: 600, fontFamily: M.font, letterSpacing: "0.06em", textTransform: "uppercase" }}>Operation Catalog</p>
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

// ── Collapsed sessions strip ──────────────────────────────────────────────────

function CollapsedSessionsStrip({ onExpand }: { onExpand: () => void }) {
  const statusColors: Record<SessionStatus, string> = {
    active:   "#3A47E6",
    complete: "#2ae781",
    pending:  "#f3ff0d",
    error:    "#DA1E28",
    none:     M.darkBorder,
  };
  return (
    <div
      className="flex-shrink-0 flex flex-col items-center"
      style={{ width: "36px", borderRight: `1px solid ${M.darkBorder}`, backgroundColor: "#0e0e0e", cursor: "pointer" }}
      onClick={onExpand}
      title="Expand sessions"
    >
      {/* Expand arrow */}
      <div style={{ padding: "10px 0 6px", display: "flex", justifyContent: "center" }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4 2l4 4-4 4" stroke={M.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* Session status dots */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", padding: "4px 0" }}>
        {SESSIONS.map(s => (
          <div
            key={s.id}
            style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: statusColors[s.status] || M.darkBorder, margin: "0 auto" }}
            title={s.label}
          />
        ))}
      </div>
    </div>
  );
}

// ── Budget breakdown table ─────────────────────────────────────────────────────

function BudgetBreakdownTable({ compact }: { compact?: boolean }) {
  const rows = [
    { label: "module.rds.aws_db_instance.main[0,3,4]", value: "$943.5/mo × 3 = $2,830/mo",       dotColor: M.red,   rowBg: "transparent" },
    { label: "gp2_description storage component",       value: "+$12.51 · gp2 volume type",        dotColor: M.amber, rowBg: M.darkItem    },
    { label: "Guardrail limit",                         value: "$588 · currently exceeded by ~$2,255", dotColor: M.red, rowBg: "transparent" },
  ];

  const rowPad   = compact ? "5px 9px"  : "8px 12px";
  const fontSize = compact ? "10px"     : "11px";
  const dotGap   = compact ? "6px"      : "8px";
  const radius   = compact ? "5px"      : "10px";

  return (
    <div style={{ marginTop: compact ? "8px" : "14px", width: "100%" }}>
      <div style={{ border: `1px solid ${M.darkBorder}`, borderRadius: radius, overflow: "hidden" }}>
        {rows.map((row, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: rowPad, borderBottom: i < rows.length - 1 ? `1px solid ${M.darkBorder}` : "none", backgroundColor: row.rowBg }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: dotGap, minWidth: 0, flex: 1 }}>
              <div style={{ width: 5, height: 5, borderRadius: "2.5px", backgroundColor: row.dotColor, flexShrink: 0 }} />
              <span style={{ color: M.textMuted, fontSize, fontFamily: M.font, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.label}</span>
            </div>
            <span style={{ color: row.dotColor, fontSize, fontFamily: M.font, fontWeight: 500, textAlign: "right", whiteSpace: "nowrap", marginLeft: "12px", flexShrink: 0 }}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Side panel view (dockMode === "right") ─────────────────────────────────────

function SidePanelView({ op, step, onBack, onOpenWorkbench, onDockChange, onNavigate, showBudgetTable }: {
  op: RecommendedOp; step: NextStep; onBack: () => void;
  onOpenWorkbench?: (q: string) => void;
  onDockChange?: (m: "bottom" | "right") => void;
  onNavigate?: (dest: string) => void;
  showBudgetTable?: boolean;
}) {
  const sevColor = SEV_COLOR[op.severity];
  const sevLabel = SEV_LABEL[op.severity];
  const [visible, setVisible] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  const suggestions = step.suggestions ?? [
    { label: "Walk me through this step by step", sublabel: "Explain each action and its effect", query: `Walk me through: ${step.label}` },
    { label: "What's the lowest-risk approach?", sublabel: "Prioritise safety and reversibility", query: `Lowest-risk approach for: ${step.label}` },
    { label: "What are the trade-offs?", sublabel: "Pros, cons, and alternatives", query: `Trade-offs for: ${step.label}` },
  ];

  return (
    <div style={{
      position: "fixed", right: 0, top: 60, bottom: 0, width: 420, zIndex: 49,
      backgroundColor: M.dark, borderLeft: `1px solid ${M.darkBorder}`,
      display: "flex", flexDirection: "column", fontFamily: M.font,
      transform: visible ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.4s cubic-bezier(0.25,0.8,0.25,1)",
      boxShadow: "-4px 0 24px rgba(0,0,0,0.3)",
    }}>
      {/* Header — row 1: Back + title */}
      <div style={{ padding: "9px 12px 0", flexShrink: 0 }}>
        {/* Row 1: back + title + badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: "3px", color: M.textMuted, fontSize: "11px", fontFamily: M.font, background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}>
            <ChevronLeft size={13} /> Back
          </button>
          <div style={{ width: 1, height: 13, backgroundColor: M.darkBorder, flexShrink: 0 }} />
          <span style={{ color: M.text, fontSize: "12px", fontFamily: M.font, fontWeight: 500, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{op.title}</span>
          <span style={{ backgroundColor: `${sevColor}20`, color: sevColor, fontSize: "10px", fontWeight: 600, padding: "2px 7px", borderRadius: "4px", flexShrink: 0 }}>{sevLabel}</span>
        </div>
        {/* Row 2: Open in Workbench + dock toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "6px", paddingBottom: "9px", borderBottom: `1px solid ${M.darkBorder}` }}>
          {step.workbenchQuery ? (
            <button
              onClick={() => onOpenWorkbench?.(step.workbenchQuery!)}
              style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "transparent", color: "#4f8fff", border: "1px solid rgba(79,143,255,0.4)", fontSize: "11px", fontWeight: 600, fontFamily: M.font, padding: "3px 9px", borderRadius: "4px", cursor: "pointer", whiteSpace: "nowrap" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(79,143,255,0.1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
            >
              <Terminal size={10} /> Open in Workbench
            </button>
          ) : <div />}
          <DockSideToggle value="right" onChange={v => onDockChange?.(v)} />
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", minHeight: 0 }}>

        {/* Chat context — mirrors what was shown in bottom view */}
        <div style={{ padding: "10px 12px 8px", borderBottom: `1px solid ${M.darkBorder}` }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
            <div style={{ width: 18, height: 18, borderRadius: 3, backgroundColor: M.blue, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
              <Terminal size={10} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: M.text, fontSize: "12px", fontWeight: 500, lineHeight: "1.5", marginBottom: "4px" }}>{step.label}</p>
              <p style={{ color: M.textDim, fontSize: "11px", lineHeight: "1.6" }}>{step.description}</p>
              {showBudgetTable && <BudgetBreakdownTable compact />}
            </div>
          </div>
        </div>

        {/* Evidence — collapsible */}
        <div style={{ flexShrink: 0 }}>
          <button
            onClick={() => setEvidenceOpen(v => !v)}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "none", border: "none", cursor: "pointer", borderBottom: evidenceOpen ? "none" : `1px solid ${M.darkBorder}` }}
          >
            <p style={{ color: M.textMuted, fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>
              Evidence · {op.evidence.length} items
            </p>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, transform: evidenceOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
              <path d="M2 4l4 4 4-4" stroke={M.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {evidenceOpen && (
            <div style={{ padding: "0 12px 8px", borderBottom: `1px solid ${M.darkBorder}` }}>
              {op.evidence.map((row, i) => (
                <div key={i} style={{ padding: "7px 10px", borderRadius: "6px", marginBottom: "3px", backgroundColor: i % 2 === 0 ? M.darkItem : "transparent", border: `1px solid ${M.darkBorder}` }}>
                  <p style={{ color: M.textMuted, fontSize: "10px", marginBottom: "2px" }}>{row.label}</p>
                  <p style={{ color: row.hi ? sevColor : M.textDim, fontSize: "11px", fontWeight: row.hi ? 600 : 400, lineHeight: "1.4" }}>{row.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Suggestions — anchored above input */}
      <div style={{ borderTop: `1px solid ${M.darkBorder}`, padding: "10px 12px 8px", flexShrink: 0, backgroundColor: "#111111" }}>
        <p style={{ color: M.textMuted, fontSize: "9px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px" }}>What would you like to do?</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {suggestions.map((s, i) => {
            const isNav = !!s.navTo;
            return (
              <button
                key={i}
                onClick={() => isNav ? onNavigate?.(s.navTo!) : onOpenWorkbench?.(s.query)}
                style={{ backgroundColor: M.darkItem, border: `1px solid ${M.darkBorder}`, borderRadius: "6px", padding: "8px 10px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = M.blue)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = M.darkBorder)}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: M.textDim, fontSize: "11px", fontWeight: 500, lineHeight: "1.5", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.label}</p>
                  <p style={{ color: M.textMuted, fontSize: "10px", lineHeight: "1.5", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.sublabel}</p>
                </div>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M2.29167 5.5H8.70833" stroke={M.blue} strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.917" />
                  <path d="M5.5 2.29167L8.70833 5.5L5.5 8.70833" stroke={M.blue} strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.917" />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

// ── Main ControlCenter ────────────────────────────────────────────────────────

interface ControlCenterProps {
  initialQuery?: string;
  onQueryHandled?: () => void;
  openOpTriage?: string;
  onOpenOpTriageHandled?: () => void;
  onOpenWorkbench?: (query?: string) => void;
  pageContext?: string;
  dockMode?: "bottom" | "right";
  onDockChange?: (m: "bottom" | "right") => void;
  onStepActiveChange?: (active: boolean) => void;
}

type PanelState = "bar" | "expanded";

export function ControlCenter({ initialQuery, onQueryHandled, openOpTriage, onOpenOpTriageHandled, onOpenWorkbench, pageContext = "overview", dockMode = "bottom", onDockChange, onStepActiveChange }: ControlCenterProps) {
  const OPS = OPS_BY_PAGE[pageContext] || OPS_BY_PAGE.overview;
  const [panel, setPanel] = useState<PanelState>("bar");
  const [signalTab, setSignalTab] = useState<"ops" | "chat">("ops");
  const [activeOp, setActiveOp] = useState<RecommendedOp | null>(null);
  const [activeStep, setActiveStep] = useState<NextStep | null>(null);
  const [processing, setProcessing] = useState(false);
  const [contentFading, setContentFading] = useState(false);
  const [query, setQuery] = useState("");
  const [sessionsExpanded, setSessionsExpanded] = useState(true);
  const [panelHeight, setPanelHeight] = useState(440);
  const dragRef = useRef<{ startY: number; startH: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatSendRef = useRef<((text: string) => void) | null>(null);

  function openChat() {
    setSignalTab("chat");
    setPanel("expanded");
  }

  function expandPanel() {
    setPanel("expanded");
  }

  function togglePanel() {
    setPanel(current => current === "expanded" ? "bar" : "expanded");
  }

  function startDrag(e: React.MouseEvent) {
    e.preventDefault();
    dragRef.current = { startY: e.clientY, startH: panelHeight };
    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      const delta = dragRef.current.startY - ev.clientY;
      const next = Math.min(Math.max(dragRef.current.startH + delta, 240), window.innerHeight - 120);
      setPanelHeight(next);
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  useEffect(() => { setActiveOp(null); setActiveStep(null); }, [pageContext]);

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

  useEffect(() => {
    if (openOpTriage) {
      // Search current page OPS first, then fall back to all pages
      const match = OPS.find(op => op.id === openOpTriage)
        ?? Object.values(OPS_BY_PAGE).flat().find(op => op.id === openOpTriage);
      if (match) {
        setPanel("expanded");
        setActiveStep(null);
        setContentFading(true);
        setTimeout(() => {
          setActiveOp(match);
          setContentFading(false);
        }, 180);
      }
      onOpenOpTriageHandled?.();
    }
  }, [openOpTriage]);

  function selectOp(op: RecommendedOp) {
    setContentFading(true);
    setTimeout(() => {
      setActiveOp(op);
      setActiveStep(null);
      setProcessing(false);
      setContentFading(false);
    }, 180);
  }

  // When step detail opens, collapse the sessions panel; restore on close
  function openStep(step: NextStep) {
    setContentFading(true);
    // Collapse sessions and swap content together, let CSS transitions do the rest
    setTimeout(() => {
      setSessionsExpanded(false);
      setActiveStep(step);
      onStepActiveChange?.(true);
      setContentFading(false);
    }, 180);
  }
  function closeStep() {
    setContentFading(true);
    setTimeout(() => {
      setActiveStep(null);
      setSessionsExpanded(true);
      onStepActiveChange?.(false);
      setContentFading(false);
    }, 180);
  }

  const isBudgetStep = activeStep?.label?.toLowerCase().includes("breakdown");
  const isRightDock = dockMode === "right";

  // Side panel mode — render as a fixed right panel beside the workspace
  if (isRightDock && activeOp && activeStep) {
    return (
      <SidePanelView
        op={activeOp}
        step={activeStep}
        onBack={closeStep}
        onOpenWorkbench={onOpenWorkbench}
        onDockChange={onDockChange}
        onNavigate={(dest) => { closeStep(); }}
        showBudgetTable={isBudgetStep}
      />
    );
  }

  return (
    <div
      className="fixed bottom-0 left-0 z-50"
      style={{ width: "100vw", boxShadow: "0 -4px 32px rgba(0,0,0,0.28)", fontFamily: M.font }}
    >
      {/* ── Expanded panel ── */}
      {panel === "expanded" && (
        <div style={{ backgroundColor: M.dark, borderTop: `1px solid ${M.darkBorder}`, position: "relative" }}>
          {/* ── Expanded panel header: brand pinned top-left, collapse top-right ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px 10px 12px", borderBottom: `1px solid ${M.darkBorder}`, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ backgroundColor: M.blue, width: 20, height: 20, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Terminal size={11} color="white" />
              </div>
              <span style={{ color: M.text, fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap" }}>Terraform Signal</span>
            </div>
            <button
              onClick={() => setPanel("bar")}
              style={{ color: M.textMuted, cursor: "pointer", background: "none", border: "none", padding: 0, lineHeight: 0 }}
            >
              <ChevronDown size={16} />
            </button>
          </div>
          {/* Drag handle — only visible in step/chat view */}
          {activeStep && (
            <div
              onMouseDown={startDrag}
              style={{ height: 6, cursor: "ns-resize", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, userSelect: "none" }}
            >
              <div style={{ width: 32, height: 3, borderRadius: 2, backgroundColor: M.darkBorder }} />
            </div>
          )}
          <div className="flex" style={{ height: activeStep ? `${panelHeight}px` : "320px", overflow: "hidden" }}>
            {/* Chat tab */}
            <div style={{ display: signalTab === "chat" ? "flex" : "none", width: "100%", height: "100%" }}>
              <TFSignalChat
                query={query}
                onQueryChange={setQuery}
                sendRef={chatSendRef}
              />
            </div>
            {/* Ops tab — CLI interface */}
            <div style={{ display: signalTab === "ops" ? "flex" : "none", width: "100%", height: "100%", flexDirection: "column", backgroundColor: M.dark, fontFamily: "'IBM Plex Mono', 'Fira Code', 'Menlo', monospace" }}>
              <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ color: M.textMuted, fontSize: "11px", letterSpacing: "0.04em" }}>terraform-signal v0.1.0 — type a command or ask a question</span>
                <span style={{ color: M.darkBorder, fontSize: "11px" }}>────────────────────────────────────────────</span>
                <span style={{ color: M.textMuted, fontSize: "11px", marginTop: 8 }}>$&nbsp;<span style={{ color: M.textDim }}>_</span></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Bar ── */}
      <div style={{ backgroundColor: M.dark, borderTop: `1px solid ${M.darkBorder}` }}>
        <div style={{ display: "flex", flexDirection: "column", padding: "8px 12px 10px" }}>

          {/* Row 1: brand — only in collapsed state */}
          {panel === "bar" && (
            <button
              type="button"
              onClick={togglePanel}
              aria-label="Open Terraform Signal"
              style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", padding: 0, marginBottom: 6, cursor: "pointer", alignSelf: "flex-start" }}
            >
              <div style={{ backgroundColor: M.blue, width: 20, height: 20, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Terminal size={11} color="white" />
              </div>
              <span style={{ color: M.text, fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap" }}>Terraform Signal</span>
            </button>
          )}

          {/* Row 2: input + controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 6, backgroundColor: M.inputBg, border: `1px solid ${M.darkBorder}` }}>
              <Plus size={14} color={M.textMuted} style={{ flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={openChat}
                onKeyDown={e => {
                  if (e.key === "Escape") { setPanel("bar"); return; }
                  if (e.key === "Enter" && !e.shiftKey && query.trim()) {
                    e.preventDefault();
                    chatSendRef.current?.(query);
                    setQuery("");
                  }
                }}
                placeholder="Ask about your Terraform fleet…"
                style={{ flex: 1, background: "none", border: "none", outline: "none", color: M.text, fontSize: "13px", fontFamily: M.font }}
              />
              {query && <X size={13} color={M.textMuted} style={{ cursor: "pointer", flexShrink: 0 }} onClick={() => { setQuery(""); setActiveOp(null); }} />}
            </div>
            <button
              onClick={() => { setSignalTab("ops"); setPanel("expanded"); }}
              title="CLI"
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "0 10px", height: 28, borderRadius: 6, border: `1px solid ${M.darkBorder}`, backgroundColor: signalTab === "ops" && panel === "expanded" ? M.darkItem : "transparent", color: signalTab === "ops" && panel === "expanded" ? M.text : M.textMuted, cursor: "pointer", flexShrink: 0 }}
            >
              <Pen size={13} />
              <span style={{ fontSize: "11px", fontWeight: 500, fontFamily: M.font, whiteSpace: "nowrap" }}>CLI</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
