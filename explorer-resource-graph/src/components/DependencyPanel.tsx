import { ChevronRight } from "lucide-react";
import { MOCK_DEPENDENCIES } from "../mock/mockCatalog";

interface Props {
  resourceAddress: string;
  workspace: string;
}

const REASON_STYLE: Record<string, { color: string; bg: string }> = {
  explicit:  { color: "#1060ff", bg: "rgba(16,96,255,0.08)"   },
  unknown:   { color: "#9B9CB8", bg: "rgba(155,156,184,0.1)"  },
};

function reasonStyle(reason: string) {
  if (reason.startsWith("implicit:")) return { color: "#D97706", bg: "rgba(245,158,11,0.08)" };
  return REASON_STYLE[reason] ?? REASON_STYLE.unknown;
}

export function DependencyPanel({ resourceAddress, workspace }: Props) {
  const deps = MOCK_DEPENDENCIES[resourceAddress] ?? {
    dependsOn: [],
    dependedOnBy: [],
  };

  return (
    <div style={{ backgroundColor: "#f8faff", borderTop: "1px solid #e0e8ff", padding: "12px 48px 16px" }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#1060ff", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
        <ChevronRight size={12} />
        Dependencies for <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{resourceAddress}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Depends on */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#9B9CB8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
            Depends on ({deps.dependsOn.length})
          </div>
          {deps.dependsOn.length === 0 ? (
            <div style={{ fontSize: 12, color: "#C0C0CE" }}>No dependencies</div>
          ) : deps.dependsOn.map((d, i) => {
            const rs = reasonStyle(d.reason);
            return (
              <div key={i} className="flex items-center gap-2 mb-1.5">
                <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: "#4B4C68" }}>{d.address}</span>
                <span style={{ fontSize: 10, color: "#9B9CB8" }}>in {d.workspace}</span>
                <span style={{ fontSize: 10, padding: "1px 5px", borderRadius: 3, color: rs.color, backgroundColor: rs.bg, fontWeight: 500 }}>
                  {d.reason}
                </span>
              </div>
            );
          })}
        </div>

        {/* Depended on by */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#9B9CB8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
            Depended on by ({deps.dependedOnBy.length})
          </div>
          {deps.dependedOnBy.length === 0 ? (
            <div style={{ fontSize: 12, color: "#C0C0CE" }}>No dependents</div>
          ) : deps.dependedOnBy.slice(0, 5).map((d, i) => {
            const rs = reasonStyle(d.reason);
            return (
              <div key={i} className="flex items-center gap-2 mb-1.5">
                <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: "#4B4C68" }}>{d.address}</span>
                <span style={{ fontSize: 10, color: "#9B9CB8" }}>in {d.workspace}</span>
                <span style={{ fontSize: 10, padding: "1px 5px", borderRadius: 3, color: rs.color, backgroundColor: rs.bg, fontWeight: 500 }}>
                  {d.reason}
                </span>
              </div>
            );
          })}
          {deps.dependedOnBy.length > 5 && (
            <button style={{ fontSize: 11, color: "#1060ff", marginTop: 4 }}>
              Show all {deps.dependedOnBy.length} dependents
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
