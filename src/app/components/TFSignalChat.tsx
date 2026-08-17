import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

// ── Tokens (copied from ControlCenter.tsx) ────────────────────────────────────
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

// ── SVG icon paths (copied from ControlCenter.tsx) ────────────────────────────
const ICON_CHECK = "M7 0C5.61553 0 4.26216 0.410543 3.11101 1.17971C1.95987 1.94888 1.06266 3.04213 0.532846 4.32122C0.00303299 5.6003 -0.13559 7.00777 0.134506 8.36563C0.404603 9.7235 1.07129 10.9708 2.05026 11.9497C3.02922 12.9287 4.2765 13.5954 5.63437 13.8655C6.99224 14.1356 8.3997 13.997 9.67879 13.4672C10.9579 12.9373 12.0511 12.0401 12.8203 10.889C13.5895 9.73785 14 8.38447 14 7C14 5.14348 13.2625 3.36301 11.9497 2.05025C10.637 0.737498 8.85652 0 7 0ZM6 9.7954L3.5 7.2954L4.2953 6.5L6 8.2046L9.705 4.5L10.5029 5.29295L6 9.7954Z";
const ICON_WARN  = "M7 0C3.15 0 0 3.15 0 7C0 10.85 3.15 14 7 14C10.85 14 14 10.85 14 7C14 3.15 10.85 0 7 0ZM6.45 3H7.55V8.5H6.45V3V3ZM7 11.5C6.6 11.5 6.25 11.15 6.25 10.75C6.25 10.35 6.6 10 7 10C7.4 10 7.75 10.35 7.75 10.75C7.75 11.15 7.4 11.5 7 11.5Z";

// ── Mock responses ─────────────────────────────────────────────────────────────
const RESPONSES: Record<string, string> = {
  workspaces: `Found 12 workspaces across 5 projects.\n\n● payments-prod-us-east   ✅ v1.6.2   47 resources   Last run: applied\n● payments-prod-eu-west   ✅ v1.6.2   43 resources   Last run: applied\n● networking-prod-core    ✅ v1.6.2   61 resources   Last run: applied\n● api-gateway-prod        ⚠️ v1.5.8   22 resources   Last run: planned  (outdated — upgrade required)\n● auth-service-prod       ✅ v1.6.2   29 resources   Last run: applied\n● data-pipeline-prod      ❌ v1.4.1   35 resources   Last run: errored  (drift detected)\n● cdn-global-prod         ✅ v1.6.2   12 resources   Last run: applied\n● inventory-service-stg   ⚠️ v1.5.8   18 resources   Last run: planned  (outdated — upgrade required)\n\n3 workspaces require attention. Run tfc workspace upgrade or open the Workspaces Explorer for details.`,

  resources: `Scanning resources across all tracked workspaces...\n\naws_instance            ✅  142 compliant    0 drifted\naws_s3_bucket           ✅   89 compliant    0 drifted\naws_security_group      ⚠️   61 compliant    4 drifted   (networking-prod-core, data-pipeline-prod)\naws_rds_instance        ❌    0 compliant   12 drifted   (data-pipeline-prod — manual remediation required)\naws_iam_role            ✅   38 compliant    0 drifted\naws_lambda_function     ⚠️   22 compliant    2 drifted   (api-gateway-prod)\ngoogle_compute_instance ✅   15 compliant    0 drifted\n\nTotal: 367 resources.  18 require remediation.`,

  providers: `Provider inventory across 12 workspaces:\n\nhashicorp/aws        ✅ 5.0.1   → used in 9 workspaces   (target: ≥5.0)\nhashicorp/aws        ⚠️ 4.67.0  → used in 2 workspaces   (outdated — blocked by cost-control-v2 policy)\nhashicorp/google     ✅ 5.12.0  → used in 2 workspaces\nhashicorp/kubernetes ✅ 2.29.0  → used in 3 workspaces\nhashicorp/random     ✅ 3.6.0   → used in 7 workspaces\nhashicorp/null       ⚠️ 3.1.0   → used in 4 workspaces   (deprecated — migrate to hashicorp/null ≥3.2)\n\n2 providers need upgrading. Workspaces on aws 4.67.0: api-gateway-prod, inventory-service-stg.`,

  versions: `Terraform version compliance across fleet:\n\nv1.6.2   ✅  8 workspaces   (target — fully compliant)\nv1.5.8   ⚠️  2 workspaces   (outdated — upgrade path available: api-gateway-prod, inventory-service-stg)\nv1.4.1   ❌  1 workspace    (end-of-life — immediate upgrade required: data-pipeline-prod)\nv1.3.x   ❌  1 workspace    (end-of-life — immediate upgrade required: cos-rekcepfi-dedwez)\n\nFleet compliance: 66.7%.  Target: 100% on v1.6.x.  4 workspaces need action.`,

  drift: `Active drift detected in 2 workspaces:\n\ndata-pipeline-prod\n  aws_rds_instance.primary   ❌ drifted   expected: db.t3.large   actual: db.t3.xlarge\n  aws_rds_instance.replica   ❌ drifted   expected: db.t3.large   actual: db.t3.xlarge\n  aws_security_group.default ⚠️ drifted   1 unexpected ingress rule added\n\nnetworking-prod-core\n  aws_security_group.egress  ⚠️ drifted   CIDR range widened: 10.0.0.0/8 → 0.0.0.0/0\n\nRemediation options:\n  1. Run speculative plan to preview changes.\n  2. Trigger targeted apply to restore expected state.\n  3. Update configuration to match current state (intentional drift).`,

  fallback: `I can help you explore your Terraform fleet. Try asking about:\n\n  workspaces   — list all workspaces with status and version compliance\n  resources    — scan resources for drift across the fleet\n  providers    — check provider versions and upgrade blockers\n  versions     — Terraform version compliance across all workspaces\n  drift        — show active drift and remediation options\n\nWhat would you like to explore?`,
};

// ── Intent resolver ────────────────────────────────────────────────────────────
function resolveIntent(text: string): keyof typeof RESPONSES {
  const t = text.toLowerCase();
  if (t.includes("workspace") || t.includes(" ws ")) return "workspaces";
  if (t.includes("resource"))                          return "resources";
  if (t.includes("provider"))                          return "providers";
  if (t.includes("version"))                           return "versions";
  if (t.includes("drift") || t.includes("remediate")) return "drift";
  return "fallback";
}

// ── Icon renderer ─────────────────────────────────────────────────────────────
function renderWithIcons(text: string): React.ReactNode {
  const parts = text.split(/(✅|⚠️|❌)/g);
  return (
    <span style={{ whiteSpace: "pre-wrap", fontFamily: M.font }}>
      {parts.map((part, i) => {
        if (part === "✅") return (
          <svg key={i} width="12" height="12" viewBox="0 0 14 14" style={{ display: "inline", verticalAlign: "middle", marginBottom: 1, flexShrink: 0 }}>
            <path d={ICON_CHECK} fill={M.green} />
          </svg>
        );
        if (part === "⚠️") return (
          <svg key={i} width="12" height="12" viewBox="0 0 14 14" style={{ display: "inline", verticalAlign: "middle", marginBottom: 1, flexShrink: 0 }}>
            <path d={ICON_WARN} fill={M.amber} />
          </svg>
        );
        if (part === "❌") return (
          <svg key={i} width="12" height="12" viewBox="0 0 14 14" style={{ display: "inline", verticalAlign: "middle", marginBottom: 1, flexShrink: 0 }}>
            <path d={ICON_WARN} fill={M.red} />
          </svg>
        );
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
}

// ── Loading dots ──────────────────────────────────────────────────────────────
function LoadingDots() {
  return (
    <div style={{ display: "flex", gap: 5, padding: "6px 0", alignItems: "center" }}>
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: M.textMuted, display: "block" }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

// ── Message types ─────────────────────────────────────────────────────────────
type Role = "user" | "assistant";
interface Msg { id: number; role: Role; text: string; streaming?: boolean; }

// ── Props ─────────────────────────────────────────────────────────────────────
export interface TFSignalChatProps {
  /** Current value of the shared bar input */
  query: string;
  /** Called when a hint chip is clicked — sets the bar input value */
  onQueryChange: (value: string) => void;
  /** Imperative handle — ControlCenter calls this to fire a send */
  sendRef: React.MutableRefObject<((text: string) => void) | null>;
}

// ── TFSignalChat ──────────────────────────────────────────────────────────────
export function TFSignalChat({ query: _query, onQueryChange, sendRef }: TFSignalChatProps) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll whenever messages or loading state change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, loading]);

  // Expose send function via ref so ControlCenter can trigger it from the bar input
  useEffect(() => {
    sendRef.current = (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: Msg = { id: Date.now(), role: "user", text: trimmed };
      setMsgs(prev => [...prev, userMsg]);
      setLoading(true);

      const delay = 800 + Math.random() * 400;
      setTimeout(() => {
        setLoading(false);
        const fullText = RESPONSES[resolveIntent(trimmed)];
        const words = fullText.split(" ");
        let i = 0;
        const assistantId = Date.now() + 1;
        setMsgs(prev => [...prev, { id: assistantId, role: "assistant", text: "", streaming: true }]);
        const iv = setInterval(() => {
          i++;
          setMsgs(prev => prev.map(m =>
            m.id === assistantId ? { ...m, text: words.slice(0, i).join(" ") } : m
          ));
          if (i >= words.length) {
            clearInterval(iv);
            setMsgs(prev => prev.map(m =>
              m.id === assistantId ? { ...m, streaming: false } : m
            ));
          }
        }, 60);
      }, delay);
    };
  }, [loading, sendRef]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", backgroundColor: M.dark, fontFamily: M.font }}>
      {/* Message list */}
      <div
        ref={scrollRef}
        style={{ flex: 1, overflowY: "auto", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}
      >
        {msgs.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, margin: "auto 0" }}>
            <p style={{ color: M.textMuted, fontSize: "11px", letterSpacing: "0.32px" }}>Ask about your Terraform fleet</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Show workspaces", "Check versions", "Scan resources", "Drift status", "Provider upgrades"].map(hint => (
                <button
                  key={hint}
                  onClick={() => onQueryChange(hint)}
                  style={{ padding: "3px 10px", borderRadius: 12, border: `1px solid ${M.darkBorder}`, background: M.darkItem, color: M.textDim, fontSize: "11px", cursor: "pointer", fontFamily: M.font }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = M.blue)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = M.darkBorder)}
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>
        )}

        {msgs.map(msg => (
          <div
            key={msg.id}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              maxWidth: msg.role === "user" ? "70%" : "100%",
            }}
          >
            {msg.role === "user" ? (
              <div style={{ backgroundColor: M.darkItem, color: M.text, padding: "6px 12px", borderRadius: 14, fontSize: "12px", lineHeight: 1.5 }}>
                {msg.text}
              </div>
            ) : (
              <div style={{ color: M.textDim, fontSize: "12px", lineHeight: 1.6 }}>
                {renderWithIcons(msg.text)}
                {msg.streaming && (
                  <motion.span
                    style={{ display: "inline-block", width: 6, height: 12, backgroundColor: M.blue, borderRadius: 1, marginLeft: 2, verticalAlign: "middle" }}
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ alignSelf: "flex-start" }}>
            <LoadingDots />
          </div>
        )}
      </div>
    </div>
  );
}
