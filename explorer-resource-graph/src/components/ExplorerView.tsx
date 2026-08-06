import React from "react";
import { Layers, Package, Server, Terminal, Code2, BarChart3 } from "lucide-react";
import { ResourceResultPage } from "./ResourceResultPage";
import type { ExplorerViewState } from "../types/explorer";
import type { UiAction } from "../types/chat";

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
};

interface TypeCard {
  id: ExplorerViewState["activeType"];
  label: string;
  icon: React.ReactNode;
  description: string;
  count?: string;
}

const TYPE_CARDS: TypeCard[] = [
  { id: "modules",    label: "Modules",            icon: <Package size={16} />,  description: "Registry modules in use",          count: "42" },
  { id: "providers",  label: "Providers",           icon: <Layers size={16} />,   description: "Providers across workspaces",       count: "3"  },
  { id: "workspaces", label: "Workspaces",          icon: <Server size={16} />,   description: "All workspaces in this org",        count: "8"  },
  { id: "tf-versions",label: "Terraform Versions",  icon: <Terminal size={16} />, description: "Versions in use across workspaces", count: "4"  },
  { id: "resources",  label: "Resources",           icon: <Code2 size={16} />,    description: "Managed resource instances",        count: "341", },
];

interface ExplorerViewProps {
  state: ExplorerViewState;
  onStateChange: (s: ExplorerViewState) => void;
  onControlCenterTrigger: (query: string) => void;
  onOpenWorkbench: (query?: string) => void;
  graphActionRef: React.MutableRefObject<((action: UiAction) => void) | null>;
  onUiAction: (action: UiAction) => void;
}

export function ExplorerView({
  state, onStateChange, onControlCenterTrigger, onOpenWorkbench, graphActionRef, onUiAction,
}: ExplorerViewProps) {
  const isResources = state.activeType === "resources";

  return (
    <div className="flex" style={{ height: "100%", backgroundColor: T.bg }}>
      {/* Left sidebar */}
      <div className="flex flex-col flex-shrink-0" style={{ width: 220, borderRight: `1px solid ${T.border}`, backgroundColor: T.bgSidebar }}>
        {/* Org / breadcrumb */}
        <div className="px-4 py-3 border-b" style={{ borderColor: T.border }}>
          <div style={{ color: T.textSecondary, fontSize: 12 }}>hashicorp-demo</div>
          <div style={{ color: T.textPrimary, fontSize: 13, fontWeight: 600, marginTop: 2 }}>Explorer</div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col py-2">
          {TYPE_CARDS.map(card => (
            <button
              key={card.id}
              onClick={() => onStateChange({ ...state, activeType: card.id })}
              className="flex items-center gap-2 px-4 py-2 text-left"
              style={{
                fontSize: 13,
                color: state.activeType === card.id ? T.blue : T.textSecondary,
                backgroundColor: state.activeType === card.id ? "rgba(16,96,255,0.06)" : "transparent",
                borderLeft: state.activeType === card.id ? `2px solid ${T.blue}` : "2px solid transparent",
                fontWeight: state.activeType === card.id ? 500 : 400,
              }}
            >
              <span style={{ color: state.activeType === card.id ? T.blue : T.textSecondary }}>
                {card.icon}
              </span>
              <span>{card.label}</span>
              <span className="ml-auto" style={{ fontSize: 11, color: T.textSecondary, backgroundColor: T.bgTableHeader, borderRadius: 10, padding: "1px 6px" }}>
                {card.count}
              </span>
            </button>
          ))}
        </nav>

        {/* Saved views stub */}
        <div className="mt-auto px-4 py-3 border-t" style={{ borderColor: T.border }}>
          <button className="flex items-center gap-2" style={{ color: T.textSecondary, fontSize: 12 }}>
            <BarChart3 size={13} />
            Saved views
            <span style={{ fontSize: 11, backgroundColor: T.bgTableHeader, borderRadius: 10, padding: "1px 6px" }}>3</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {isResources ? (
          <ResourceResultPage
            state={state}
            onStateChange={onStateChange}
            onControlCenterTrigger={onControlCenterTrigger}
            onOpenWorkbench={onOpenWorkbench}
            graphActionRef={graphActionRef}
            onUiAction={onUiAction}
          />
        ) : (
          <NotAvailable type={state.activeType} />
        )}
      </div>
    </div>
  );
}

function NotAvailable({ type }: { type: string }) {
  return (
    <div className="flex items-center justify-center flex-1" style={{ color: T.textSecondary, fontSize: 14 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: T.textPrimary, marginBottom: 4 }}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
        <div style={{ fontSize: 12 }}>Not available in this prototype — switch to Resources.</div>
      </div>
    </div>
  );
}
