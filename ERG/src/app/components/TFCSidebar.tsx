import React, { useState } from "react";
import {
  LayoutGrid,
  GitBranch,
  Package,
  Shield,
  Settings,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  Activity,
  BookOpen,
  Users,
  Key,
  Bell,
  Building2,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  badge?: string;
  badgeColor?: string;
  children?: { label: string; active?: boolean }[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <LayoutGrid size={16} />, active: false },
  {
    label: "Workspaces",
    icon: <GitBranch size={16} />,
    active: true,
    badge: "3",
    badgeColor: "bg-red-500",
  },
  { label: "Registry", icon: <Package size={16} /> },
  {
    label: "Policy",
    icon: <Shield size={16} />,
    children: [
      { label: "Policy Sets" },
      { label: "Policies" },
    ],
  },
  { label: "Runs", icon: <Activity size={16} /> },
  { label: "Projects", icon: <Building2 size={16} /> },
];

const bottomNavItems = [
  { label: "Documentation", icon: <BookOpen size={16} /> },
  { label: "Teams", icon: <Users size={16} /> },
  { label: "SSH Keys", icon: <Key size={16} /> },
  { label: "Notifications", icon: <Bell size={16} /> },
  { label: "Settings", icon: <Settings size={16} /> },
];

export function TFCSidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>(["Policy"]);

  const toggle = (label: string) =>
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );

  return (
    <aside
      style={{ backgroundColor: "#1B1C2B", width: "220px", minWidth: "220px" }}
      className="flex flex-col h-full border-r border-white/10 text-sm"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/10">
        <div
          style={{ backgroundColor: "#5C4EE5" }}
          className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5.8 3.2L5.8 9.6L8 8.4L8 2L5.8 3.2Z" fill="white" />
            <path d="M10.2 6.4L10.2 12.8L8 14L8 7.6L10.2 6.4Z" fill="white" />
            <path d="M2 5L4.2 3.8L4.2 10.2L2 11.4L2 5Z" fill="white" opacity="0.7" />
            <path d="M11.8 5.6L14 4.4L14 10.8L11.8 12L11.8 5.6Z" fill="white" opacity="0.7" />
          </svg>
        </div>
        <div>
          <div className="text-white leading-tight" style={{ fontSize: "12px", fontWeight: 600 }}>
            HCP Terraform
          </div>
          <div style={{ color: "#8B8CA8", fontSize: "11px" }}>hashicorp-demo</div>
        </div>
      </div>

      {/* Org selector */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 cursor-pointer hover:bg-white/5"
        style={{ color: "#C5C6D8" }}
      >
        <div className="flex items-center gap-2">
          <div
            style={{ backgroundColor: "#5C4EE5", width: "18px", height: "18px", fontSize: "9px" }}
            className="rounded flex items-center justify-center text-white font-bold flex-shrink-0"
          >
            H
          </div>
          <span style={{ fontSize: "12px" }}>hashicorp-demo</span>
        </div>
        <ChevronDown size={12} style={{ color: "#8B8CA8" }} />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {navItems.map((item) => {
          const isExpanded = expandedItems.includes(item.label);
          return (
            <div key={item.label}>
              <div
                onClick={() => item.children && toggle(item.label)}
                className="flex items-center justify-between px-4 py-2 cursor-pointer rounded mx-1 my-0.5"
                style={{
                  backgroundColor: item.active ? "rgba(92, 78, 229, 0.2)" : "transparent",
                  color: item.active ? "#A89FF7" : "#9B9CB8",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <span style={{ color: item.active ? "#A89FF7" : "#6B6C88" }}>{item.icon}</span>
                  <span style={{ fontSize: "13px" }}>{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`${item.badgeColor} text-white rounded-full px-1.5`}
                      style={{ fontSize: "10px", lineHeight: "16px", minWidth: "16px", textAlign: "center" }}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.children && (
                    <span style={{ color: "#6B6C88" }}>
                      {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    </span>
                  )}
                </div>
              </div>
              {item.children && isExpanded && (
                <div className="ml-6 border-l border-white/10 pl-3 mb-1">
                  {item.children.map((child) => (
                    <div
                      key={child.label}
                      className="py-1.5 px-2 cursor-pointer rounded hover:bg-white/5"
                      style={{ color: "#9B9CB8", fontSize: "12px" }}
                    >
                      {child.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="border-t border-white/10 py-2">
        {bottomNavItems.slice(0, 3).map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2.5 px-4 py-2 cursor-pointer hover:bg-white/5 rounded mx-1"
            style={{ color: "#6B6C88", fontSize: "12px" }}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* User */}
      <div className="border-t border-white/10 px-4 py-3 flex items-center gap-2.5">
        <div
          style={{ backgroundColor: "#3D3E54", width: "28px", height: "28px", fontSize: "11px" }}
          className="rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
        >
          JD
        </div>
        <div>
          <div style={{ color: "#C5C6D8", fontSize: "12px" }}>Jane Doe</div>
          <div style={{ color: "#6B6C88", fontSize: "10px" }}>jane@hashicorp.com</div>
        </div>
      </div>
    </aside>
  );
}
