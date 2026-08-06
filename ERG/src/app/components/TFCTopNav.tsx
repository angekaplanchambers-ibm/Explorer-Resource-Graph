import { Search, HelpCircle, ChevronDown } from "lucide-react";
import svgPaths from "@/imports/WorkspaceOverview/svg-qfbium7f7z";

export function TFCTopNav() {
  return (
    <div
      className="flex items-center justify-between px-4 flex-shrink-0"
      style={{ backgroundColor: "#0c0c0e", height: "60px", borderBottom: "1px solid #656a76" }}
    >
      {/* Left: logo + org */}
      <div className="flex items-center gap-3">
        {/* HashiCorp Terraform logo */}
        <div style={{ width: "28px", height: "32px", position: "relative", flexShrink: 0 }}>
          <svg width="28" height="32" viewBox="0 0 23.3334 26.6" fill="none">
            <path d={svgPaths.p1b01a100} fill="white" />
            <path d={svgPaths.p30a44300} fill="white" />
            <path d={svgPaths.p31e6e700} fill="white" />
            <path d={svgPaths.p23377400} fill="white" />
          </svg>
        </div>

        {/* Org switcher */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded cursor-pointer"
          style={{ border: "1px solid #656a76", backgroundColor: "#0c0c0e", minWidth: "118px" }}
        >
          <span style={{ color: "white", fontSize: "13px", fontWeight: 500 }}>CoolCorp</span>
          <ChevronDown size={13} style={{ color: "#9B9CB8", marginLeft: "auto" }} />
        </div>
      </div>

      {/* Right: search + help + user */}
      <div className="flex items-center gap-2">
        <button
          className="flex items-center justify-center rounded"
          style={{ width: "32px", height: "32px", border: "1px solid #656a76", backgroundColor: "#0c0c0e" }}
        >
          <Search size={14} color="#9B9CB8" />
        </button>
        <button
          className="flex items-center gap-1 px-2 py-1 rounded"
          style={{ border: "1px solid #656a76", backgroundColor: "#0c0c0e", color: "#9B9CB8", fontSize: "13px" }}
        >
          <HelpCircle size={14} />
          <ChevronDown size={12} />
        </button>
        <div
          className="flex items-center justify-center rounded"
          style={{ width: "32px", height: "32px", backgroundColor: "#5C4EE5", fontSize: "12px", fontWeight: 700, color: "white", flexShrink: 0 }}
        >
          AB
        </div>
      </div>
    </div>
  );
}
