import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  GitBranch,
  RefreshCw,
  ChevronDown,
  ExternalLink,
  MoreHorizontal,
  Zap,
} from "lucide-react";

type RunStatus = "applied" | "failed" | "running" | "planned" | "pending" | "drifted";

interface Workspace {
  id: string;
  name: string;
  project: string;
  status: RunStatus;
  lastRun: string;
  resources: number;
  provider: string;
  branch: string;
  driftDetected?: boolean;
  cost?: string;
}

const workspaces: Workspace[] = [
  {
    id: "ws-1",
    name: "payments-prod-us-east",
    project: "payments",
    status: "failed",
    lastRun: "12m ago",
    resources: 47,
    provider: "aws",
    branch: "main",
    driftDetected: false,
    cost: "$2,340/mo",
  },
  {
    id: "ws-2",
    name: "payments-prod-eu-west",
    project: "payments",
    status: "failed",
    lastRun: "18m ago",
    resources: 43,
    provider: "aws",
    branch: "main",
    driftDetected: true,
    cost: "$1,980/mo",
  },
  {
    id: "ws-3",
    name: "api-gateway-prod",
    project: "platform",
    status: "failed",
    lastRun: "34m ago",
    resources: 22,
    provider: "aws",
    branch: "main",
    driftDetected: false,
    cost: "$890/mo",
  },
  {
    id: "ws-4",
    name: "networking-prod-core",
    project: "platform",
    status: "drifted",
    lastRun: "2h ago",
    resources: 61,
    provider: "aws",
    branch: "main",
    driftDetected: true,
    cost: "$1,120/mo",
  },
  {
    id: "ws-5",
    name: "inventory-service-staging",
    project: "inventory",
    status: "applied",
    lastRun: "45m ago",
    resources: 18,
    provider: "aws",
    branch: "feature/v2",
    cost: "$340/mo",
  },
  {
    id: "ws-6",
    name: "auth-service-prod",
    project: "platform",
    status: "applied",
    lastRun: "1h ago",
    resources: 29,
    provider: "aws",
    branch: "main",
    cost: "$670/mo",
  },
  {
    id: "ws-7",
    name: "data-pipeline-prod",
    project: "analytics",
    status: "running",
    lastRun: "now",
    resources: 35,
    provider: "aws",
    branch: "main",
    cost: "$1,450/mo",
  },
  {
    id: "ws-8",
    name: "cdn-global-prod",
    project: "platform",
    status: "planned",
    lastRun: "5m ago",
    resources: 12,
    provider: "aws",
    branch: "main",
    cost: "$210/mo",
  },
];

const statusConfig: Record<RunStatus, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  applied: {
    label: "Applied",
    icon: <CheckCircle2 size={13} />,
    color: "#10B981",
    bg: "rgba(16, 185, 129, 0.1)",
  },
  failed: {
    label: "Failed",
    icon: <XCircle size={13} />,
    color: "#EF4444",
    bg: "rgba(239, 68, 68, 0.1)",
  },
  running: {
    label: "Running",
    icon: <RefreshCw size={13} className="animate-spin" />,
    color: "#5C4EE5",
    bg: "rgba(92, 78, 229, 0.1)",
  },
  planned: {
    label: "Planned",
    icon: <Clock size={13} />,
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.1)",
  },
  pending: {
    label: "Pending",
    icon: <Clock size={13} />,
    color: "#6B7280",
    bg: "rgba(107, 114, 128, 0.1)",
  },
  drifted: {
    label: "Drift Detected",
    icon: <AlertCircle size={13} />,
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.1)",
  },
};

interface WorkspacesViewProps {
  onControlCenterTrigger?: (query: string) => void;
}

export function WorkspacesView({ onControlCenterTrigger }: WorkspacesViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const failedCount = workspaces.filter((w) => w.status === "failed").length;
  const driftedCount = workspaces.filter((w) => w.driftDetected).length;

  const filtered = workspaces.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedFilter === "failed") return w.status === "failed" && matchesSearch;
    if (selectedFilter === "drift") return w.driftDetected && matchesSearch;
    if (selectedFilter === "running") return (w.status === "running" || w.status === "planned") && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "#F7F7F9" }}>
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-3 border-b"
        style={{ backgroundColor: "white", borderColor: "#E5E5EA" }}
      >
        <div className="flex items-center gap-2" style={{ color: "#6B6C88", fontSize: "13px" }}>
          <span>hashicorp-demo</span>
          <span>/</span>
          <span style={{ color: "#1B1C2B" }}>Workspaces</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border text-sm"
            style={{ borderColor: "#E5E5EA", color: "#4B4C68", backgroundColor: "white", fontSize: "13px" }}
          >
            <Filter size={13} />
            Filter
            <ChevronDown size={12} />
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-white text-sm"
            style={{ backgroundColor: "#5C4EE5", fontSize: "13px" }}
          >
            <Plus size={13} />
            New workspace
          </button>
        </div>
      </div>

      {/* Alert banners */}
      {failedCount > 0 && (
        <div
          className="flex items-center justify-between px-6 py-2.5 border-b"
          style={{ backgroundColor: "rgba(239, 68, 68, 0.06)", borderColor: "rgba(239, 68, 68, 0.2)" }}
        >
          <div className="flex items-center gap-2.5">
            <XCircle size={15} color="#EF4444" />
            <span style={{ color: "#1B1C2B", fontSize: "13px" }}>
              <strong>{failedCount} workspaces</strong> have failed runs — last 60 minutes
            </span>
          </div>
          <button
            onClick={() => onControlCenterTrigger?.("Find failed production runs in the last hour")}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-sm border"
            style={{
              fontSize: "12px",
              color: "#5C4EE5",
              borderColor: "rgba(92, 78, 229, 0.3)",
              backgroundColor: "rgba(92, 78, 229, 0.05)",
            }}
          >
            <Zap size={12} />
            Inspect failures
          </button>
        </div>
      )}
      {driftedCount > 0 && (
        <div
          className="flex items-center justify-between px-6 py-2.5 border-b"
          style={{ backgroundColor: "rgba(245, 158, 11, 0.06)", borderColor: "rgba(245, 158, 11, 0.2)" }}
        >
          <div className="flex items-center gap-2.5">
            <AlertCircle size={15} color="#F59E0B" />
            <span style={{ color: "#1B1C2B", fontSize: "13px" }}>
              <strong>Drift detected</strong> in {driftedCount} workspaces
            </span>
          </div>
          <button
            onClick={() => onControlCenterTrigger?.("Prepare drift remediation for production networking")}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-sm border"
            style={{
              fontSize: "12px",
              color: "#D97706",
              borderColor: "rgba(245, 158, 11, 0.3)",
              backgroundColor: "rgba(245, 158, 11, 0.05)",
            }}
          >
            <Zap size={12} />
            Prepare remediation
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-4">
        {/* Header + search */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 style={{ color: "#1B1C2B", fontSize: "20px", fontWeight: 600 }}>Workspaces</h1>
            <p style={{ color: "#6B6C88", fontSize: "13px", marginTop: "2px" }}>
              {workspaces.length} workspaces across 4 projects
            </p>
          </div>
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "#9B9CB8" }}
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search workspaces…"
              className="pl-8 pr-3 py-1.5 rounded border outline-none"
              style={{
                borderColor: "#E5E5EA",
                fontSize: "13px",
                width: "220px",
                backgroundColor: "white",
                color: "#1B1C2B",
              }}
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 mb-4">
          {[
            { id: "all", label: "All workspaces", count: workspaces.length },
            { id: "failed", label: "Failed", count: failedCount },
            { id: "drift", label: "Drift detected", count: driftedCount },
            { id: "running", label: "Active runs", count: workspaces.filter((w) => w.status === "running" || w.status === "planned").length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded"
              style={{
                fontSize: "13px",
                backgroundColor: selectedFilter === tab.id ? "white" : "transparent",
                color: selectedFilter === tab.id ? "#5C4EE5" : "#6B6C88",
                border: selectedFilter === tab.id ? "1px solid #E5E5EA" : "1px solid transparent",
                fontWeight: selectedFilter === tab.id ? 500 : 400,
              }}
            >
              {tab.label}
              <span
                className="rounded-full px-1.5"
                style={{
                  fontSize: "11px",
                  backgroundColor:
                    tab.id === "failed"
                      ? "rgba(239,68,68,0.12)"
                      : tab.id === "drift"
                      ? "rgba(245,158,11,0.12)"
                      : "#F0F0F5",
                  color:
                    tab.id === "failed"
                      ? "#EF4444"
                      : tab.id === "drift"
                      ? "#D97706"
                      : "#6B6C88",
                  lineHeight: "18px",
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Workspace table */}
        <div className="rounded-lg border overflow-hidden" style={{ borderColor: "#E5E5EA", backgroundColor: "white" }}>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "#F7F7F9", borderBottom: "1px solid #E5E5EA" }}>
                {["Workspace", "Project", "Status", "Resources", "Last run", "Est. cost", ""].map((col) => (
                  <th
                    key={col}
                    className="text-left px-4 py-2.5"
                    style={{ color: "#6B6C88", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((ws, i) => {
                const s = statusConfig[ws.status];
                return (
                  <tr
                    key={ws.id}
                    className="hover:bg-[#F7F7F9] cursor-pointer transition-colors"
                    style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F0F0F5" : "none" }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <GitBranch size={13} style={{ color: "#9B9CB8" }} />
                        <span style={{ color: "#1B1C2B", fontSize: "13px", fontWeight: 500 }}>{ws.name}</span>
                        {ws.driftDetected && (
                          <span
                            className="px-1.5 rounded"
                            style={{ fontSize: "10px", backgroundColor: "rgba(245,158,11,0.12)", color: "#D97706", lineHeight: "18px" }}
                          >
                            drift
                          </span>
                        )}
                      </div>
                      <div style={{ color: "#9B9CB8", fontSize: "11px", marginTop: "2px", paddingLeft: "21px" }}>
                        {ws.branch}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ color: "#6B6C88", fontSize: "13px" }}>{ws.project}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded"
                        style={{ backgroundColor: s.bg, color: s.color, fontSize: "12px" }}
                      >
                        {s.icon}
                        {s.label}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ color: "#4B4C68", fontSize: "13px" }}>{ws.resources}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ color: "#6B6C88", fontSize: "13px" }}>{ws.lastRun}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ color: "#6B6C88", fontSize: "13px" }}>{ws.cost}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {ws.status === "failed" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onControlCenterTrigger?.(`Inspect failure: ${ws.name}`);
                            }}
                            className="flex items-center gap-1 px-2 py-1 rounded border"
                            style={{ fontSize: "11px", color: "#5C4EE5", borderColor: "rgba(92,78,229,0.25)", backgroundColor: "rgba(92,78,229,0.05)" }}
                          >
                            <Zap size={11} />
                            Inspect failure
                          </button>
                        )}
                        {ws.driftDetected && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onControlCenterTrigger?.(`Prepare drift remediation for ${ws.name}`);
                            }}
                            className="flex items-center gap-1 px-2 py-1 rounded border"
                            style={{ fontSize: "11px", color: "#D97706", borderColor: "rgba(245,158,11,0.25)", backgroundColor: "rgba(245,158,11,0.05)" }}
                          >
                            <Zap size={11} />
                            Prepare remediation
                          </button>
                        )}
                        <button className="p-1 rounded hover:bg-gray-100">
                          <MoreHorizontal size={14} style={{ color: "#9B9CB8" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
