import { useState } from "react";
import { ChevronDown, ChevronRight, MoreHorizontal, Zap, ArrowUpCircle } from "lucide-react";
import { DependencyPanel } from "./DependencyPanel";
import type { ResourceInstance, ExplorerViewState } from "../types/explorer";

const T = {
  border: "#E5E5EA",
  headerBg: "#F7F7F9",
  rowHover: "#F7F7F9",
  textPrimary: "#1B1C2B",
  textSecondary: "#6B6C88",
  textMono: "#4B4C68",
};

const STATUS_STYLE: Record<string, { color: string; bg: string; label: string }> = {
  failed:  { color: "#EF4444", bg: "rgba(239,68,68,0.1)",   label: "Failed"   },
  drifted: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)",  label: "Drifted"  },
  healthy: { color: "#10B981", bg: "rgba(16,185,129,0.1)",  label: "Healthy"  },
  unknown: { color: "#9CA3AF", bg: "rgba(156,163,175,0.1)", label: "Unknown"  },
};

interface Props {
  resources: ResourceInstance[];
  state: ExplorerViewState;
  onStateChange: (s: ExplorerViewState) => void;
  onZap: (query: string) => void;
}

export function ResourceTable({ resources, state, onStateChange, onZap }: Props) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [expandedAttr, setExpandedAttr] = useState<Set<string>>(new Set());

  const filtered = resources.filter(r => {
    if (state.filters.resourceType && r.resourceType !== state.filters.resourceType) return false;
    if (state.filters.workspaceId && r.workspaceId !== state.filters.workspaceId) return false;
    if (state.filters.searchTerm) {
      const q = state.filters.searchTerm.toLowerCase();
      return r.address.toLowerCase().includes(q) || r.resourceType.toLowerCase().includes(q) || r.workspace.toLowerCase().includes(q);
    }
    return true;
  });

  const filterActive = !!(state.filters.resourceType || state.filters.workspaceId || state.filters.searchTerm);

  return (
    <div className="flex flex-col overflow-hidden flex-1">
      {/* Active filter chip */}
      {filterActive && (
        <div className="flex items-center gap-2 px-6 py-2 border-b" style={{ borderColor: T.border, backgroundColor: "#fafafe" }}>
          <span style={{ fontSize: 12, color: "#6B6C88" }}>Filtered by:</span>
          {state.filters.resourceType && (
            <FilterChip label={`type: ${state.filters.resourceType}`} onRemove={() => onStateChange({ ...state, filters: { ...state.filters, resourceType: undefined } })} />
          )}
          {state.filters.workspaceId && (
            <FilterChip label={`workspace: ${state.filters.workspaceId}`} onRemove={() => onStateChange({ ...state, filters: { ...state.filters, workspaceId: undefined } })} />
          )}
          {state.filters.searchTerm && (
            <FilterChip label={`search: ${state.filters.searchTerm}`} onRemove={() => onStateChange({ ...state, filters: { ...state.filters, searchTerm: undefined } })} />
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-auto flex-1">
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr style={{ backgroundColor: T.headerBg, borderBottom: `1px solid ${T.border}` }}>
              {["", "Workspace", "Address", "Type", "Module", "Provider", "Status", ""].map((col, i) => (
                <th key={i} style={{
                  textAlign: "left", padding: "8px 16px",
                  color: "#6B6C88", fontSize: 11, fontWeight: 600,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => {
              const isSelected = state.selectedResourceId === r.id;
              const isAttrOpen = expandedAttr.has(r.id);
              const s = STATUS_STYLE[r.status] ?? STATUS_STYLE.unknown;
              return (
                <>
                  <tr
                    key={r.id}
                    onMouseEnter={() => setHoveredRow(r.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => {
                      const nowSelected = isSelected ? null : r.id;
                      onStateChange({
                        ...state,
                        selectedResourceId: nowSelected,
                        dependencyPanelOpen: !!nowSelected,
                      });
                    }}
                    style={{
                      borderBottom: `1px solid ${T.border}`,
                      backgroundColor: isSelected ? "rgba(16,96,255,0.04)" : hoveredRow === r.id ? T.rowHover : "white",
                      cursor: "pointer",
                    }}
                  >
                    {/* Expand attr */}
                    <td style={{ padding: "10px 8px 10px 16px", width: 24 }}>
                      <button
                        onClick={e => { e.stopPropagation(); setExpandedAttr(s => { const n = new Set(s); n.has(r.id) ? n.delete(r.id) : n.add(r.id); return n; }); }}
                        style={{ color: "#9B9CB8", lineHeight: 0 }}
                      >
                        {isAttrOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                      </button>
                    </td>

                    <td style={{ padding: "10px 16px" }}>
                      <span style={{ fontSize: 13, color: T.textSecondary }}>{r.workspace}</span>
                    </td>

                    <td style={{ padding: "10px 16px", maxWidth: 280 }}>
                      <span style={{ fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", color: T.textPrimary }}>{r.address}</span>
                    </td>

                    <td style={{ padding: "10px 16px" }}>
                      <span style={{ fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", color: "#5C4EE5" }}>{r.resourceType}</span>
                    </td>

                    <td style={{ padding: "10px 16px" }}>
                      <span style={{ fontSize: 12, color: r.module ? T.textSecondary : "#C0C0CE" }}>
                        {r.module || "—"}
                      </span>
                    </td>

                    <td style={{ padding: "10px 16px" }}>
                      <span style={{ fontSize: 12, color: T.textSecondary }}>
                        {r.provider.replace("registry.terraform.io/", "")}
                      </span>
                    </td>

                    <td style={{ padding: "10px 16px" }}>
                      <span className="inline-flex items-center gap-1" style={{
                        fontSize: 12, padding: "2px 8px", borderRadius: 4,
                        backgroundColor: s.bg, color: s.color,
                      }}>
                        {s.label}
                      </span>
                    </td>

                    {/* Contextual Zap buttons */}
                    <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>
                      <div className="flex items-center gap-1">
                        {r.status === "failed" && (
                          <ZapBtn
                            label="Inspect failure"
                            color="#5C4EE5" borderColor="rgba(92,78,229,0.25)" bg="rgba(92,78,229,0.05)"
                            onClick={e => { e.stopPropagation(); onZap(`Inspect failure: ${r.address} in ${r.workspace}`); }}
                          />
                        )}
                        {r.status === "drifted" && (
                          <ZapBtn
                            label="Prepare remediation"
                            color="#D97706" borderColor="rgba(245,158,11,0.25)" bg="rgba(245,158,11,0.05)"
                            onClick={e => { e.stopPropagation(); onZap(`Prepare drift remediation for ${r.address} in ${r.workspace}`); }}
                          />
                        )}
                        {r.hasDownstreamConsumers && (
                          <ZapBtn
                            label="Show blast radius"
                            color="#EF4444" borderColor="rgba(239,68,68,0.25)" bg="rgba(239,68,68,0.05)"
                            onClick={e => { e.stopPropagation(); onZap(`Show blast radius of ${r.workspace}`); }}
                          />
                        )}
                        {r.providerUpgradeAvailable && (
                          <button
                            onClick={e => { e.stopPropagation(); onZap(`Plan provider upgrade for ${r.workspace}`); }}
                            className="flex items-center gap-1 px-2 py-1 rounded border"
                            style={{ fontSize: 11, color: "#1060ff", borderColor: "rgba(16,96,255,0.25)", backgroundColor: "rgba(16,96,255,0.05)" }}
                          >
                            <ArrowUpCircle size={11} />
                            Plan upgrade
                          </button>
                        )}
                        <button className="p-1 rounded hover:bg-gray-100">
                          <MoreHorizontal size={14} style={{ color: "#9B9CB8" }} />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Attributes expansion */}
                  {isAttrOpen && (
                    <tr key={`${r.id}-attrs`} style={{ backgroundColor: "#fafafe", borderBottom: `1px solid ${T.border}` }}>
                      <td colSpan={8} style={{ padding: "10px 48px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "6px 24px" }}>
                          {Object.entries(r.attributes).map(([k, v]) => (
                            <div key={k} style={{ fontSize: 12 }}>
                              <span style={{ color: "#9B9CB8", fontFamily: "'IBM Plex Mono', monospace" }}>{k}: </span>
                              <span style={{
                                fontFamily: "'IBM Plex Mono', monospace",
                                color: v === "<sensitive>" ? "#9B9CB8" : "#4B4C68",
                                fontStyle: v === "<sensitive>" ? "italic" : "normal",
                              }}>
                                {v}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* Dependency panel */}
                  {isSelected && state.dependencyPanelOpen && (
                    <tr key={`${r.id}-deps`} style={{ borderBottom: `1px solid ${T.border}` }}>
                      <td colSpan={8} style={{ padding: 0 }}>
                        <DependencyPanel resourceAddress={r.address} workspace={r.workspace} />
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ padding: "48px 24px", textAlign: "center", color: "#9B9CB8", fontSize: 13 }}>
            No resources match the current filters.
          </div>
        )}
      </div>

      {/* Pagination stub */}
      <div className="flex items-center justify-between px-6 py-2 border-t" style={{ borderColor: T.border, backgroundColor: T.headerBg }}>
        <span style={{ fontSize: 12, color: "#9B9CB8" }}>
          Showing {filtered.length} of {resources.length} resources
        </span>
        <div className="flex gap-2">
          <button style={{ fontSize: 12, color: "#9B9CB8", padding: "2px 8px", borderRadius: 4, border: `1px solid ${T.border}` }}>← Prev</button>
          <button style={{ fontSize: 12, color: "#9B9CB8", padding: "2px 8px", borderRadius: 4, border: `1px solid ${T.border}` }}>Next →</button>
        </div>
      </div>
    </div>
  );
}

function ZapBtn({ label, color, borderColor, bg, onClick }: { label: string; color: string; borderColor: string; bg: string; onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-2 py-1 rounded border"
      style={{ fontSize: 11, color, borderColor, backgroundColor: bg }}
    >
      <Zap size={11} />
      {label}
    </button>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1 px-2 py-0.5 rounded" style={{ fontSize: 11, backgroundColor: "rgba(16,96,255,0.08)", color: "#1060ff", border: "1px solid rgba(16,96,255,0.2)" }}>
      {label}
      <button onClick={onRemove} style={{ lineHeight: 0, marginLeft: 2 }}>×</button>
    </span>
  );
}
