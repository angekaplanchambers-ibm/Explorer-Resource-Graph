import { useState } from "react";
import { XCircle, AlertCircle, ArrowUpCircle, Zap, X } from "lucide-react";
import type { SignalBanner } from "../types/explorer";

interface Props {
  banners: SignalBanner[];
  onZap: (query: string) => void;
}

const CONFIG: Record<SignalBanner["type"], { color: string; border: string; bg: string; icon: React.ReactNode; zapColor: string; zapBorder: string; zapBg: string }> = {
  failed:  { color: "#EF4444", border: "rgba(239,68,68,0.2)",   bg: "rgba(239,68,68,0.06)",   icon: <XCircle size={15} color="#EF4444" />, zapColor: "#5C4EE5", zapBorder: "rgba(92,78,229,0.3)",  zapBg: "rgba(92,78,229,0.05)"  },
  drift:   { color: "#F59E0B", border: "rgba(245,158,11,0.2)",  bg: "rgba(245,158,11,0.06)",  icon: <AlertCircle size={15} color="#F59E0B" />, zapColor: "#D97706", zapBorder: "rgba(245,158,11,0.3)", zapBg: "rgba(245,158,11,0.05)" },
  upgrade: { color: "#3B82F6", border: "rgba(59,130,246,0.2)",  bg: "rgba(59,130,246,0.06)",  icon: <ArrowUpCircle size={15} color="#3B82F6" />, zapColor: "#1060ff", zapBorder: "rgba(16,96,255,0.3)",  zapBg: "rgba(16,96,255,0.05)"  },
};

export function SignalBannerStrip({ banners, onZap }: Props) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const visible = banners.filter(b => !dismissed.has(b.id));
  if (visible.length === 0) return null;

  return (
    <div>
      {visible.map(banner => {
        const c = CONFIG[banner.type];
        return (
          <div
            key={banner.id}
            className="flex items-center justify-between px-6 py-2.5 border-b"
            style={{ backgroundColor: c.bg, borderColor: c.border }}
          >
            <div className="flex items-center gap-2.5">
              {c.icon}
              <span style={{ color: "#1B1C2B", fontSize: 13 }}>
                <strong>{banner.message}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onZap(banner.zapQuery)}
                className="flex items-center gap-1.5 px-3 py-1 rounded border"
                style={{ fontSize: 12, color: c.zapColor, borderColor: c.zapBorder, backgroundColor: c.zapBg }}
              >
                <Zap size={12} />
                {banner.zapLabel}
              </button>
              <button
                onClick={() => setDismissed(d => new Set([...d, banner.id]))}
                className="p-1 rounded"
                style={{ color: "#9B9CB8" }}
              >
                <X size={13} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
