import { useState } from "react";
import svgPaths from "@/imports/WorkspaceRuns/svg-fh3cwtglqk";
import imgUser from "@/imports/WorkspaceRuns/9ebc1ce39d50aa79cb3431fd2f56d7e4c9c0ad57.png";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Search, Filter, Plus, CheckCircle2, XCircle, Clock, AlertTriangle, Zap } from "lucide-react";

const T = {
  navy: "#0c0c0e",
  blue: "#1060ff",
  textPrimary: "#0c0c0e",
  textSecondary: "#656a76",
  textTertiary: "#3b3d45",
  bg: "#ffffff",
  bgSidebar: "#fafafa",
  bgTableHeader: "#f1f2f3",
  border: "rgba(101,106,118,0.2)",
  borderLight: "rgba(101,106,118,0.1)",
  green: "#006619",
  greenBg: "#cceeda",
  red: "#c00005",
  redBg: "#ffd7d9",
  amber: "#92400e",
  amberBg: "#fef3c7",
  blueBg: "#e8f0fc",
};

type RunStatus = "applied" | "planned" | "errored" | "running" | "on-hold";

interface Run {
  id: string;
  name: string;
  runId: string;
  trigger: string;
  branch: string;
  commit: string;
  status: RunStatus;
  time: string;
  isCurrent?: boolean;
}

const runs: Run[] = [
  { id: "1", name: "Login to AWS accounts using Doormat (#290)", runId: "#run-guDS9dmc3dn", trigger: "jdoe triggered via CLI", branch: "Main", commit: "d972f24", status: "applied", time: "22 minutes ago", isCurrent: true },
  { id: "2", name: "Triggered by CLI", runId: "#run-gRf9Hj2sNc", trigger: "jdoe triggered via CLI", branch: "Main", commit: "b81e7g9", status: "errored", time: "30 minutes ago" },
  { id: "3", name: "Use new trusted SHA", runId: "#run-tYs5Lp8qJa", trigger: "jdoe triggered via GitHub", branch: "Main", commit: "h53i1a8", status: "applied", time: "3 days ago" },
  { id: "4", name: "Use new trusted SHA", runId: "#run-bKm3Tn6xZv", trigger: "plan-only-run  jdoe triggered via GitHub", branch: "jdoe/SHA-Setup-23346", commit: "j49c2e6", status: "planned", time: "3 days ago" },
  { id: "5", name: "Update workspace triggers", runId: "#run-xK29fMp7Rq", trigger: "jdoe triggered via GitHub", branch: "Main", commit: "k72m3p1", status: "errored", time: "4 days ago" },
  { id: "6", name: "Rotate IAM credentials", runId: "#run-nV8wQs4Ybc", trigger: "jdoe triggered via GitHub Actions", branch: "Main", commit: "m18n5q2", status: "errored", time: "4 days ago" },
  { id: "7", name: "Apply cost optimization changes", runId: "#run-pL3kXt9Umn", trigger: "jdoe triggered via GitHub", branch: "cost/rds-resize", commit: "a29b4c3", status: "errored", time: "5 days ago" },
];

const statusConfig: Record<RunStatus, { label: string; color: string; bg: string; icon: JSX.Element }> = {
  applied: { label: "Applied", color: T.green, bg: T.greenBg, icon: <CheckCircle2 size={13} /> },
  planned: { label: "Planned and finished", color: "#374151", bg: "#f1f3f5", icon: <Clock size={13} /> },
  errored: { label: "Failed", color: T.red, bg: T.redBg, icon: <XCircle size={13} /> },
  running: { label: "Running", color: "#1d4ed8", bg: T.blueBg, icon: <Clock size={13} /> },
  "on-hold": { label: "On Hold", color: T.amber, bg: T.amberBg, icon: <AlertTriangle size={13} /> },
};

interface RunsViewProps {
  onControlCenterTrigger?: (query: string) => void;
  onRunClick?: (id: string, runId: string) => void;
}

export function RunsView({ onControlCenterTrigger, onRunClick }: RunsViewProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filterCounts = {
    all: 126, attention: 0, errored: 12, running: 0, "on-hold": 0, success: 114,
  };

  const currentRun = runs.find(r => r.isCurrent);
  const listRuns = runs.filter(r => activeFilter === "all" || r.status === activeFilter);

  return (
    <div className="flex-1 min-w-0 overflow-y-auto px-8 py-5 flex flex-col gap-6" style={{ backgroundColor: T.bg }}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1" style={{ fontSize: "13px" }}>
        {["CoolCorp", "Workspaces", "my-workspace", "Runs"].map((crumb, i, arr) => (
          <span key={crumb} className="flex items-center gap-1">
            <span style={{ color: i < arr.length - 1 ? T.blue : T.textPrimary, textDecoration: i < arr.length - 1 ? "underline" : "none", fontWeight: i === arr.length - 1 ? 500 : 400, cursor: i < arr.length - 1 ? "pointer" : "default" }}>{crumb}</span>
            {i < arr.length - 1 && <span style={{ color: T.textSecondary }}>/</span>}
          </span>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h1 style={{ color: T.textPrimary, fontSize: "30px", fontWeight: 700, letterSpacing: "-0.5px", margin: 0 }}>my-workspace</h1>
            <div style={{ width: 20, height: 20 }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 16 17">
                <path d={svgPaths.p13271880} fill={T.blue} />
              </svg>
            </div>
          </div>
          <div style={{ color: T.textTertiary, fontSize: "13px", fontFamily: "monospace" }}>ID: ws-1HkX32P8UKEJ3Lmo</div>
          <span style={{ color: T.textTertiary, fontSize: "14px", textDecoration: "underline", cursor: "pointer", fontWeight: 500 }}>Add workspace description</span>
          <div className="flex items-center gap-6 flex-wrap mt-1" style={{ fontSize: "14px", color: T.textSecondary }}>
            <span>🔒 Locked by <span style={{ color: T.textPrimary }}>johndoe</span></span>
            <span>📋 Resources <span style={{ color: T.textPrimary }}>211</span></span>
            <span>🏷 Tags <span style={{ color: T.textPrimary }}>3</span></span>
            <span>⚡ Terraform <span style={{ color: T.textTertiary, textDecoration: "underline" }}>v0.12.4</span></span>
            <span>🕐 Updated <span style={{ color: T.textPrimary }}>today at 10:12 AM</span></span>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded" style={{ border: `1px solid rgba(59,61,69,0.4)`, backgroundColor: "#fafafa", color: T.textTertiary, fontSize: "14px", fontWeight: 500 }}>🔒 Lock</button>
          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded" style={{ backgroundColor: T.blue, color: "white", fontSize: "14px", fontWeight: 500 }}><Plus size={14} /> New Run</button>
        </div>
      </div>

      {/* Current Run */}
      {currentRun && (
        <div className="flex flex-col gap-3">
          <h2 style={{ color: T.textPrimary, fontSize: "24px", fontWeight: 600, margin: 0 }}>Current Run</h2>
          <div
            className="flex items-center p-4 rounded"
            style={{ border: `1px solid ${T.borderLight}`, backgroundColor: "white", cursor: "pointer" }}
            onClick={() => onRunClick?.(currentRun.id, currentRun.runId)}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <ImageWithFallback src={imgUser} alt="jdoe" style={{ width: 32, height: 32, borderRadius: "2px", objectFit: "cover", flexShrink: 0 }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span style={{ color: T.textPrimary, fontSize: "14px", fontWeight: 500 }}>{currentRun.name}</span>
                  <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: "#f1f2f3", color: T.textTertiary, border: `1px solid ${T.border}` }}>Current</span>
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap" style={{ fontSize: "12px", color: T.textSecondary }}>
                  <span style={{ color: T.textTertiary }}>{currentRun.runId}</span>
                  <span style={{ fontWeight: 600, color: T.textPrimary }}>jdoe</span>
                  <span>triggered via CLI</span>
                  <span>Branch</span>
                  <span className="px-1.5 rounded text-xs" style={{ backgroundColor: "#e8f0fc", color: "#1d4ed8", fontWeight: 600 }}>{currentRun.branch}</span>
                  <span style={{ color: T.blue }}>{currentRun.commit}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded" style={{ backgroundColor: T.greenBg, color: T.green, fontSize: "13px", fontWeight: 500 }}>
                <CheckCircle2 size={14} /> Applied
              </div>
              <span style={{ color: T.textSecondary, fontSize: "13px" }}>{currentRun.time}</span>
            </div>
          </div>
        </div>
      )}

      {/* Run List */}
      <div className="flex flex-col gap-3">
        <h2 style={{ color: T.textPrimary, fontSize: "24px", fontWeight: 600, margin: 0 }}>Run List</h2>

        {/* Filter tabs */}
        <div className="flex items-center gap-0" style={{ borderBottom: `1px solid ${T.border}` }}>
          {[
            { id: "all", label: "All", count: filterCounts.all },
            { id: "attention", label: "Needs Attention", count: filterCounts.attention },
            { id: "errored", label: "Failed", count: filterCounts.errored },
            { id: "running", label: "Running", count: filterCounts.running },
            { id: "on-hold", label: "On Hold", count: filterCounts["on-hold"] },
            { id: "success", label: "Success", count: filterCounts.success },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className="flex items-center gap-1.5 px-3 py-2 border-b-2"
              style={{ fontSize: "13px", color: activeFilter === tab.id ? T.blue : T.textSecondary, borderColor: activeFilter === tab.id ? T.blue : "transparent", marginBottom: "-1px" }}
            >
              {tab.label}
              <span className="px-1.5 rounded-full" style={{ fontSize: "11px", backgroundColor: tab.id === "errored" ? "#ffd7d9" : "#f1f2f3", color: tab.id === "errored" ? T.red : T.textSecondary }}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Search + filters */}
        <div className="flex items-center gap-2">
          <div className="relative" style={{ width: "280px" }}>
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: T.textSecondary }} />
            <input placeholder="Search Runs" className="w-full pl-8 pr-3 py-2 rounded border outline-none" style={{ borderColor: T.border, fontSize: "13px", backgroundColor: "white" }} />
          </div>
          {["Status", "Operation", "Source"].map(f => (
            <button key={f} className="flex items-center gap-1.5 px-3 py-2 rounded border" style={{ borderColor: T.border, color: T.textSecondary, fontSize: "13px", backgroundColor: "white" }}>
              <Filter size={13} /> {f} <span style={{ fontSize: "11px" }}>↕</span>
            </button>
          ))}
        </div>

        {/* Run list */}
        <div className="rounded border overflow-hidden" style={{ borderColor: T.border }}>
          {listRuns.map((run, i) => {
            const s = statusConfig[run.status];
            return (
              <div key={run.id} className="flex items-center p-4" onClick={() => run.trigger.includes("CLI") ? onRunClick?.(run.id, run.runId) : undefined} style={{ borderBottom: i < listRuns.length - 1 ? `1px solid ${T.borderLight}` : "none", backgroundColor: "white", cursor: run.trigger.includes("CLI") ? "pointer" : "default" }}>
                <div className="w-1.5 self-stretch rounded-l mr-3 flex-shrink-0" style={{ backgroundColor: run.status === "errored" ? T.red : run.status === "applied" ? T.green : T.border, width: "4px" }} />
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <ImageWithFallback src={imgUser} alt="avatar" style={{ width: 28, height: 28, borderRadius: "2px", objectFit: "cover", flexShrink: 0 }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span style={{ color: T.textPrimary, fontSize: "14px", fontWeight: 500 }}>{run.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap" style={{ fontSize: "12px", color: T.textSecondary }}>
                      <span style={{ color: T.textTertiary, fontFamily: "monospace" }}>{run.runId}</span>
                      <span style={{ fontWeight: 600, color: T.textPrimary }}>jdoe</span>
                      <span>{run.trigger.includes("CLI") ? "triggered via CLI" : "triggered via GitHub"}</span>
                      <span>Branch</span>
                      <span className="px-1.5 rounded text-xs" style={{ backgroundColor: "#e8f0fc", color: "#1d4ed8", fontWeight: 600 }}>{run.branch}</span>
                      <span style={{ color: T.blue }}>{run.commit}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded" style={{ backgroundColor: s.bg, color: s.color, fontSize: "12px", fontWeight: 500 }}>
                    {s.icon} {s.label}
                  </div>
                  <span style={{ color: T.textSecondary, fontSize: "12px" }}>{run.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
