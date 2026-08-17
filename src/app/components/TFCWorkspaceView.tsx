import { useState } from "react";
import type { PageContext } from "@/app/App";
import { RunsView } from "./RunsView";
import { RunDetailsView } from "./RunDetailsView";
import svgPaths from "@/imports/WorkspaceOverview-1/svg-l5nyzsu1t3";
import imgUser from "@/imports/WorkspaceOverview-1/9ebc1ce39d50aa79cb3431fd2f56d7e4c9c0ad57.png";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { WorkspacesExplorerView } from "./WorkspacesExplorerView";

// ── Design tokens from Figma ──────────────────────────────────────────────────
const T = {
  navy: "#0c0c0e",
  blue: "#1060ff",
  blueHover: "#0c56e9",
  textPrimary: "#0c0c0e",
  textSecondary: "#656a76",
  textTertiary: "#3b3d45",
  bg: "#ffffff",
  bgSidebar: "#fafafa",
  bgTableHeader: "#f1f2f3",
  border: "rgba(101,106,118,0.2)",
  borderLight: "rgba(101,106,118,0.1)",
  green: "#00781e",
  greenBg: "#cceeda",
  red: "#c00005",
  amber: "#d97706",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function Badge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded" style={{ backgroundColor: bg, color, fontSize: "13px", fontWeight: 500 }}>
      {label}
    </span>
  );
}

// ── Left Sidebar ──────────────────────────────────────────────────────────────

const NAV_ITEMS: Array<{ label: string; page?: PageContext; chevron?: boolean }> = [
  { label: "Overview", page: "overview" },
  { label: "Runs", page: "runs" },
  { label: "States" },
  { label: "Search & Import" },
  { label: "Variables" },
  { label: "Change requests" },
  { label: "Health", chevron: true },
  { label: "Settings", chevron: true },
];

function Sidebar({ page, onPageChange }: { page: PageContext; onPageChange: (p: PageContext) => void }) {
  return (
    <aside style={{ width: "224px", minWidth: "224px", backgroundColor: T.bgSidebar, borderRight: `1px solid ${T.border}` }} className="flex flex-col h-full overflow-y-auto">
      {/* Back + collapse — one row, no wrap */}
      <div className="flex items-center justify-between px-3 pt-4 pb-2">
        <button className="flex items-center gap-1.5 flex-shrink-0" style={{ color: T.textSecondary, whiteSpace: "nowrap" }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
            <path d="M9 2L4 7l5 5" stroke={T.textSecondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: "13px" }}>Back to Workspaces</span>
        </button>
        <button style={{ color: T.textSecondary, padding: "2px", flexShrink: 0, marginLeft: "6px" }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
            <path d="M9 2L4 7l5 5M13 2l-5 5 5 5" stroke={T.textSecondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Workspace label */}
      <div className="px-4 pt-2 pb-1">
        <p style={{ color: T.textSecondary, fontSize: "13px", fontWeight: 600, padding: "4px 8px 10px" }}>my-workspace</p>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-px px-3 pb-4">
        {NAV_ITEMS.map(({ label, page: itemPage, chevron }) => {
          const active = itemPage === page;
          return (
            <div
              key={label}
              onClick={() => itemPage && onPageChange(itemPage)}
              className="relative flex items-center justify-between rounded"
              style={{
                backgroundColor: active ? "#f1f2f3" : "transparent",
                cursor: itemPage ? "pointer" : "default",
                padding: "8px 8px",
              }}
            >
              {/* Blue active indicator — left edge */}
              {active && (
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", backgroundColor: T.blue, borderRadius: "2px 0 0 2px" }} />
              )}
              <span style={{
                color: active ? T.textPrimary : T.textSecondary,
                fontSize: "13px",
                fontWeight: 400,
                paddingLeft: "4px",
              }}>
                {label}
              </span>
              {chevron && (
                <svg width="10" height="10" fill="none" viewBox="0 0 10 10" style={{ flexShrink: 0 }}>
                  <path d="M3 2l3 3-3 3" stroke={T.textSecondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

// ── Run Summary Card ──────────────────────────────────────────────────────────

function RunCard() {
  return (
    <div className="rounded" style={{ border: `1px solid ${T.borderLight}`, backgroundColor: "white" }}>
      <div className="flex flex-col gap-3 p-4">
        {/* Run name + status */}
        <div className="flex items-center justify-between gap-2">
          <span style={{ color: T.textSecondary, fontSize: "16px", fontWeight: 600 }}>
            Login to AWS accounts using Doormat (#290)
          </span>
          <Badge label="✓ Applied" color={T.green} bg={T.greenBg} />
        </div>

        {/* Trigger info */}
        <div className="flex items-center gap-1.5">
          <ImageWithFallback src={imgUser} alt="jdoe avatar" style={{ width: "20px", height: "20px", borderRadius: "2px", objectFit: "cover" }} />
          <span style={{ color: T.textSecondary, fontSize: "13px", fontWeight: 600 }}>jdoe</span>
          <span style={{ color: T.textSecondary, fontSize: "12px" }}>triggered a run 30 seconds ago via</span>
          {/* Terraform logo inline */}
          <svg width="16" height="16" viewBox="0 0 20 22.8" fill="none" style={{ flexShrink: 0 }}>
            <path clipRule="evenodd" d={svgPaths.p58df900} fill="#7B42BC" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p1243fc00} fill="#7B42BC" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p3a109f00} fill="#7B42BC" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p1e0b1780} fill="#7B42BC" fillRule="evenodd" />
          </svg>
          <span style={{ color: T.textSecondary, fontSize: "12px" }}>CLI</span>
        </div>

        {/* Metrics row */}
        <div className="flex items-end gap-0">
          {[
            { label: "Policy checks", value: "2 Passed, 1 failed" },
            { label: "Cost estimation", value: "$323.30 / mo" },
            { label: "Plan & apply duration", value: "Less than a minute" },
            { label: "Resources changed", value: null },
          ].map((m, i) => (
            <div key={m.label} className="flex-1 flex flex-col gap-2 pr-8">
              <p style={{ color: T.textSecondary, fontSize: "13px", fontWeight: 500 }}>{m.label}</p>
              {m.value ? (
                <p style={{ color: T.textPrimary, fontSize: "13px" }}>{m.value}</p>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span style={{ color: T.green, fontSize: "14px" }}>+1</span>
                  <span style={{ color: T.blue, fontSize: "14px" }}>~1</span>
                  <span style={{ color: T.red, fontSize: "14px" }}>-1</span>
                </div>
              )}
            </div>
          ))}
          <button className="flex-shrink-0 px-4 py-2.5 rounded" style={{ border: `1px solid rgba(59,61,69,0.4)`, backgroundColor: "#fafafa", color: T.textTertiary, fontSize: "14px", fontWeight: 500 }}>
            See details
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Resources Table ───────────────────────────────────────────────────────────

const resources = [
  { name: "assume_tfc_tflo...", provider: "hashicorp/aws", type: "data.aws_iam...", module: "root", created: "Mar 14 2022" },
  { name: "current", provider: "hashicorp/aws", type: "data.aws_cal...", module: "datadog_integra...", created: "Sep 21 2022" },
  { name: "dd_integration", provider: "hashicorp/aws", type: "data.aws_iam...", module: "datadog_integra...", created: "Sep 21 2022" },
  { name: "dd_integration", provider: "hashicorp/aws", type: "aws_iam_role", module: "datadog_integra...", created: "Sep 21 2022" },
  { name: "dd_integration", provider: "hashicorp/aws", type: "aws_iam_role", module: "datadog_integra...", created: "Sep 21 2022" },
  { name: "integration", provider: "hashicorp/aws", type: "datadog_inte...", module: "datadog_integra...", created: "Jan 23 2024" },
  { name: "integration_trust", provider: "hashicorp/aws", type: "datadog_inte...", module: "datadog_integra...", created: "Jan 23 2024" },
  { name: "packer", provider: "hashicorp/aws", type: "data.aws_iam...", module: "root", created: "Jan 23 2024" },
];

function ResourcesTable() {
  return (
    <div className="overflow-hidden rounded" style={{ border: `1px solid ${T.border}` }}>
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ backgroundColor: T.bgTableHeader }}>
            {["Name", "Provider", "Type", "Module", "Created"].map((col, i) => (
              <th
                key={col}
                className="text-left px-4 py-3"
                style={{ color: T.textPrimary, fontSize: "14px", fontWeight: 600, borderBottom: `1px solid ${T.border}`, borderLeft: i > 0 ? `1px solid ${T.border}` : "none" }}
              >
                {col}
                {col === "Created" && (
                  <button className="ml-1.5 inline-flex items-center">
                    <svg width="13" height="16" fill="none" viewBox="0 0 13.5 16">
                      <path d={svgPaths.p30fef300} fill={T.textSecondary} />
                      <path d={svgPaths.p27f1de00} fill={T.textSecondary} />
                    </svg>
                  </button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {resources.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < resources.length - 1 ? `1px solid ${T.border}` : "none" }}>
              {[r.name, r.provider, r.type, r.module, r.created].map((val, ci) => (
                <td key={ci} className="px-4 py-3" style={{ color: T.textTertiary, fontSize: "14px", borderLeft: ci > 0 ? `1px solid ${T.border}` : "none" }}>
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Right Panel ───────────────────────────────────────────────────────────────

function RightPanel() {
  return (
    <aside style={{ width: "260px", minWidth: "260px", borderLeft: `1px solid ${T.borderLight}` }} className="flex flex-col overflow-y-auto px-5 py-4 gap-5">
      {/* Links */}
      <div className="flex flex-col gap-1">
        {[
          { icon: "◎", label: "CoolCorp/aws-tf-testci" },
          { icon: "☰", label: "Readme" },
          { icon: "⚡", label: "Execution mode: Remote" },
          { icon: "⟳", label: "Auto-apply API, CLI, & VCS runs: On" },
          { icon: "⟳", label: "Auto-apply: On triggers" },
          { icon: "◻", label: "Project: Default Project" },
        ].map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-2 py-0.5">
            <span style={{ color: T.blue, fontSize: "13px", width: "16px", textAlign: "center" }}>{icon}</span>
            <span style={{ color: T.blue, fontSize: "13px" }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ borderTop: `1px solid ${T.borderLight}` }} />

      {/* Health */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span style={{ color: T.textPrimary, fontSize: "14px", fontWeight: 600 }}>Health</span>
          <span style={{ color: T.textSecondary, fontSize: "13px" }}>18 hours ago</span>
        </div>

        {/* Drift */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <span style={{ color: T.amber, fontSize: "13px" }}>⚠</span>
            <span style={{ color: T.textPrimary, fontSize: "13px" }}>Drift</span>
          </div>
          <span style={{ color: T.blue, fontSize: "13px" }}>View details</span>
        </div>
        <div className="rounded-full overflow-hidden mb-2" style={{ height: "6px", backgroundColor: "#e5e7eb" }}>
          <div style={{ width: "2%", height: "100%", backgroundColor: T.amber }} />
        </div>
        <div className="flex justify-between mb-3">
          <div><p style={{ color: T.red, fontSize: "14px", fontWeight: 600 }}>1</p><p style={{ color: T.textSecondary, fontSize: "12px" }}>Drifted resources</p></div>
          <div><p style={{ color: T.textPrimary, fontSize: "14px", fontWeight: 600 }}>47</p><p style={{ color: T.textSecondary, fontSize: "12px" }}>Not drifted</p></div>
        </div>

        {/* Checks */}
        <div className="flex items-center justify-between mb-1">
          <span style={{ color: T.textPrimary, fontSize: "13px" }}>Checks</span>
          <span style={{ color: T.blue, fontSize: "13px" }}>View details</span>
        </div>
        <div className="rounded-full overflow-hidden mb-2" style={{ height: "6px", backgroundColor: "#e5e7eb" }}>
          <div style={{ width: "50%", height: "100%", backgroundColor: T.green }} />
        </div>
        <div className="flex justify-between">
          {[{ label: "Fail", val: "8", color: T.red }, { label: "Unknown", val: "0", color: T.textSecondary }, { label: "Passed", val: "8", color: T.green }].map(({ label, val, color }) => (
            <div key={label}>
              <p style={{ color, fontSize: "14px", fontWeight: 600 }}>{val}</p>
              <p style={{ color: T.textSecondary, fontSize: "12px" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${T.borderLight}` }} />

      {/* Metrics */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span style={{ color: T.textPrimary, fontSize: "14px", fontWeight: 600 }}>Metrics</span>
          <span style={{ color: T.textSecondary, fontSize: "12px" }}>(last 30 runs)</span>
        </div>
        {[
          { label: "Average plan duration", val: "<1 min" },
          { label: "Average apply duration", val: "<1 min" },
          { label: "Total failed runs", val: "0" },
          { label: "Policy check failures", val: "0" },
        ].map(({ label, val }) => (
          <div key={label} className="flex items-center justify-between py-1">
            <span style={{ color: T.textSecondary, fontSize: "13px" }}>{label}</span>
            <span style={{ color: T.textPrimary, fontSize: "13px" }}>{val}</span>
          </div>
        ))}
      </div>

      <div style={{ borderTop: `1px solid ${T.borderLight}` }} />

      {/* Tags */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span style={{ color: T.textPrimary, fontSize: "14px", fontWeight: 600 }}>Tags</span>
            <span style={{ color: T.textSecondary, fontSize: "13px" }}>(3)</span>
          </div>
          <button className="flex items-center gap-1 px-2 py-1 rounded text-xs" style={{ border: `1px solid ${T.border}`, color: T.textTertiary }}>
            ⊕ Manage tags
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["Env : Dev", "Autoapply : Off"].map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: "#f1f2f3", color: T.textTertiary, border: `1px solid ${T.border}` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ── Main content ──────────────────────────────────────────────────────────────

function MainContent({ onControlCenterTrigger }: { onControlCenterTrigger?: (q: string) => void }) {
  const [activeTab, setActiveTab] = useState("Resources");

  return (
    <div className="flex-1 min-w-0 overflow-y-auto px-8 py-5 flex flex-col gap-6" style={{ backgroundColor: T.bg }}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1" style={{ fontSize: "13px" }}>
        <span style={{ color: T.blue, textDecoration: "underline", cursor: "pointer" }}>CoolCorp</span>
        <span style={{ color: T.textSecondary }}>/</span>
        <span style={{ color: T.blue, textDecoration: "underline", cursor: "pointer" }}>Workspaces</span>
        <span style={{ color: T.textSecondary }}>/</span>
        <span style={{ color: T.textPrimary, fontWeight: 500 }}>my-workspace</span>
      </div>

      {/* Title + actions */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 style={{ color: T.textPrimary, fontSize: "30px", fontWeight: 700, letterSpacing: "-0.5px", margin: 0 }}>my-workspace</h1>
          <div className="flex items-center gap-1.5">
            <span style={{ color: T.textTertiary, fontSize: "13px", fontFamily: "monospace" }}>ID: ws-1HkX32P8UKEJ3Lmo</span>
            <button style={{ color: T.blue }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 15 16">
                <path d={svgPaths.p13271880} fill={T.blue} />
              </svg>
            </button>
          </div>
          <span style={{ color: T.textTertiary, fontSize: "14px", textDecoration: "underline", cursor: "pointer", fontWeight: 500 }}>Add workspace description</span>
          {/* Metadata row */}
          <div className="flex items-center gap-6 flex-wrap mt-1">
            {[
              { icon: svgPaths.p37a3cc00, viewBox: "0 0 12 15", label: "Locked by", val: "johndoe" },
              { icon: svgPaths.pf42b00, viewBox: "0 0 16 14", label: "Resources", val: "211" },
              { icon: svgPaths.p1641bd80, viewBox: "0 0 14.1286 14.1286", label: "Tags", val: "3" },
            ].map(({ icon, viewBox, label, val }) => (
              <div key={label} className="flex items-center gap-1.5">
                <svg width="16" height="16" fill="none" viewBox={viewBox} style={{ flexShrink: 0 }}>
                  <path d={icon} fill={T.textSecondary} />
                </svg>
                <span style={{ color: T.textSecondary, fontSize: "14px" }}>{label}</span>
                <span style={{ color: T.textPrimary, fontSize: "14px" }}>{val}</span>
              </div>
            ))}
            {/* Terraform version */}
            <div className="flex items-center gap-1.5">
              <svg width="16" height="16" fill="none" viewBox="0 0 14 16" style={{ flexShrink: 0 }}>
                <path d={svgPaths.p3d990f40} fill={T.textSecondary} />
                <path d={svgPaths.p7e6e000} fill={T.textSecondary} />
                <path d={svgPaths.p24a11800} fill={T.textSecondary} />
                <path d={svgPaths.p9584200} fill={T.textSecondary} />
              </svg>
              <span style={{ color: T.textSecondary, fontSize: "14px" }}>Terraform</span>
              <span style={{ color: T.textTertiary, fontSize: "13px", textDecoration: "underline", fontWeight: 500 }}>v0.12.4</span>
            </div>
            {/* Updated */}
            <div className="flex items-center gap-1.5">
              <svg width="16" height="16" fill="none" viewBox="0 0 14 14.5" style={{ flexShrink: 0 }}>
                <path d={svgPaths.p15442080} fill={T.textSecondary} />
              </svg>
              <span style={{ color: T.textSecondary, fontSize: "14px" }}>Updated</span>
              <span style={{ color: T.textPrimary, fontSize: "14px" }}>today at 10:12 AM</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded" style={{ border: `1px solid rgba(59,61,69,0.4)`, backgroundColor: "#fafafa", color: T.textTertiary, fontSize: "14px", fontWeight: 500 }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 12 15"><path d={svgPaths.p37a3cc00} fill={T.textTertiary} /></svg>
            Lock
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded" style={{ backgroundColor: T.blue, border: `1px solid ${T.blueHover}`, color: "white", fontSize: "14px", fontWeight: 500 }}>
            <svg width="10" height="10" fill="none" viewBox="0 0 10 10"><path d={svgPaths.p1a8e2700} fill="white" /></svg>
            New Run
          </button>
        </div>
      </div>

      {/* Latest Run */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 style={{ color: T.textTertiary, fontSize: "24px", fontWeight: 600, margin: 0 }}>Latest Run</h2>
          <span style={{ color: T.blue, fontSize: "14px", cursor: "pointer" }}>View all runs</span>
        </div>
        <RunCard />
      </div>

      {/* Tabs + table */}
      <div className="flex flex-col gap-0">
        {/* Tab bar */}
        <div className="flex items-center" style={{ borderBottom: `1px solid ${T.border}` }}>
          {[{ label: "Resources", count: 71 }, { label: "Outputs", count: 8 }].map(({ label, count }) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className="flex items-center gap-1.5 px-3 pt-1.5 pb-2.5"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: activeTab === label ? T.blue : T.textTertiary,
                borderBottom: activeTab === label ? `3px solid ${T.blue}` : "3px solid transparent",
                marginBottom: "-1px",
              }}
            >
              {label}
              <span className="px-2 py-0.5 rounded-full" style={{ fontSize: "13px", backgroundColor: "#dedfe3", color: T.textTertiary }}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {activeTab === "Resources" && <ResourcesTable />}
        {activeTab === "Outputs" && (
          <div className="py-8 text-center" style={{ color: T.textSecondary, fontSize: "14px" }}>No outputs to display.</div>
        )}
      </div>
    </div>
  );
}

// ── Top nav ───────────────────────────────────────────────────────────────────

function TopNav() {
  return (
    <div
      className="flex items-center justify-between px-4 flex-shrink-0"
      style={{ backgroundColor: T.navy, height: "60px", borderBottom: "1px solid #656a76" }}
    >
      <div className="flex items-center gap-3">
        <div style={{ width: "28px", height: "32px", flexShrink: 0 }}>
          <svg width="28" height="32" viewBox="0 0 23.3334 26.6" fill="none">
            <path d={svgPaths.p1b01a100} fill="white" />
            <path d={svgPaths.p30a44300} fill="white" />
            <path d={svgPaths.p31e6e700} fill="white" />
            <path d={svgPaths.p23377400} fill="white" />
          </svg>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded" style={{ border: "1px solid #656a76", backgroundColor: T.navy }}>
          <span style={{ color: "white", fontSize: "13px", fontWeight: 500 }}>CoolCorp</span>
          <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
            <path d="M2 4l4 4 4-4" stroke="#9B9CB8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center justify-center rounded" style={{ width: "32px", height: "32px", border: "1px solid #656a76", backgroundColor: T.navy }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
            <circle cx="7" cy="7" r="4.5" stroke="#9B9CB8" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="#9B9CB8" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button className="flex items-center gap-1 px-2 py-1 rounded" style={{ border: "1px solid #656a76", backgroundColor: T.navy }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9.5" stroke="#9B9CB8" strokeWidth="1.5" />
            <path d="M12 8v1M12 12v4" stroke="#9B9CB8" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
            <path d="M2 4l4 4 4-4" stroke="#9B9CB8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center justify-center rounded" style={{ width: "32px", height: "32px", backgroundColor: "#5C4EE5", fontSize: "12px", fontWeight: 700, color: "white", flexShrink: 0 }}>
          AB
        </div>
      </div>
    </div>
  );
}

// ── Root export ───────────────────────────────────────────────────────────────

interface TFCWorkspaceViewProps {
  onControlCenterTrigger?: (query: string) => void;
  onOpenOpTriage?: (opId: string) => void;
  page: PageContext;
  onPageChange: (p: PageContext) => void;
  rightInset?: number;
  hideTopNav?: boolean;
  navOpen?: boolean;
}

export function TFCWorkspaceView({ onControlCenterTrigger, onOpenOpTriage, page, onPageChange, rightInset = 0, hideTopNav = false, navOpen = false }: TFCWorkspaceViewProps) {
  const [selectedRun, setSelectedRun] = useState<{ id: string; runId: string } | null>(null);

  // This imported Figma frame replaces the single-workspace overview with the
  // requested multi-workspace explorer. The runs/detail routes remain intact.
  if (page === "overview") {
    return (
      <div className="flex h-full flex-col overflow-hidden" style={{ backgroundColor: T.bg }}>
        {!hideTopNav && <TopNav />}
        <div
          className="min-h-0 flex-1 overflow-auto bg-white"
          style={{ paddingRight: rightInset, transition: "padding-right 0.4s cubic-bezier(0.25,0.8,0.25,1)" }}
        >
          <WorkspacesExplorerView navOpen={navOpen} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ backgroundColor: T.bg }}>
      {!hideTopNav && <TopNav />}
      <div
        className="flex flex-1 min-h-0 overflow-hidden"
        style={{ paddingRight: rightInset, transition: "padding-right 0.4s cubic-bezier(0.25,0.8,0.25,1)" }}
      >
        <Sidebar page={page} onPageChange={(p) => { setSelectedRun(null); onPageChange(p); }} />
        {page === "runs" && !selectedRun && (
          <RunsView
            onControlCenterTrigger={onControlCenterTrigger}
            onRunClick={(id, runId) => { setSelectedRun({ id, runId }); onPageChange("runDetail"); }}
          />
        )}
        {page === "runDetail" && selectedRun && (
          <RunDetailsView onBack={() => { setSelectedRun(null); onPageChange("runs"); }} runId={selectedRun.runId} onOpenOpTriage={onOpenOpTriage} />
        )}
      </div>
    </div>
  );
}
