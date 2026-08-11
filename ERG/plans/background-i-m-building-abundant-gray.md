# Plan: Suggested Queries Overlay on Graph Container

## Context

The Terraform Signal Explorer splash page has a full-viewport topology graph container. The bottom-center of that container is completely empty — the only occupants are the `TopoLegend` (bottom-left), layout/theme switcher (bottom-right), and zoom controls (above the switcher, bottom-right). The goal is to add a glass-style "Suggested Queries" overlay panel, centered at the bottom of the graph area, inspired by the attached screenshot ("Try the following queries based on your usage." with icon rows and a → arrow).

## File to Modify

`src/app/components/WorkspacesExplorerView.tsx` — four targeted edits, no new files.

---

## Change 1 — Add `motion/react` import (after line 1)

Insert after the existing React import at line 1:

```ts
import { motion, AnimatePresence } from "motion/react";
```

---

## Change 2 — Add `SUGGESTED_QUERIES` constant (after line 2381)

Insert immediately after `] as const;` that closes `USE_CASE_CATEGORIES` (line 2381), before `ExplorerSplashView` at line 2383:

```ts
type SuggestedQuery = {
  type: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
};

const SUGGESTED_QUERIES: SuggestedQuery[] = [
  { type: "Workspaces",         label: "Workspaces with failed checks", Icon: WorkspaceIcon, color: "#9b8ff5" },
  { type: "Workspaces",         label: "Drifted Workspaces",            Icon: WorkspaceIcon, color: "#9b8ff5" },
  { type: "Workspaces",         label: "Workspace VCS source",          Icon: WorkspaceIcon, color: "#9b8ff5" },
  { type: "Terraform Versions", label: "Top Terraform versions",        Icon: TerraformIcon, color: "#38bdf8" },
  { type: "Modules",            label: "Top module versions",           Icon: ModuleIcon,    color: "#818cf8" },
];
```

Colors are pulled from the existing `NODE_COLORS` map to stay consistent with graph node palette. All five labels match verbatim items in `USE_CASE_CATEGORIES` so `openGraph()` routes correctly.

---

## Change 3 — Add `suggestedQueriesVisible` state (after line 2422)

Inside `ExplorerSplashView`, after `const [savedType, setSavedType] = useState("All types");` at line 2422:

```ts
const [suggestedQueriesVisible, setSuggestedQueriesVisible] = useState(true);
```

---

## Change 4 — Insert overlay JSX (between lines 2572 and 2573)

The graph container div spans lines 2549–2573. It currently has one child: a ternary rendering either `<TopologyGraph>` or the empty-state div. The overlay is a second sibling child, inserted between the closing `)}` at line 2572 and the container's closing `</div>` at line 2573.

**Visibility condition:** `suggestedQueriesVisible && !tableViewOpen && !savedViewsOpen`
- Hide when table split-screen opens (would clip under `overflow-hidden`)
- Hide when saved views panel opens (same reason — container shrinks to 50%)
- Dismissed permanently per session by clicking any query row or the ✕ button

**Positioning:** `absolute bottom-20 left-1/2 z-20 -translate-x-1/2`  
`bottom-20` = 80px clears the zoom controls at `bottom: 62px`. `maxWidth: calc(100% - 48px)` guards against narrow viewports.

```tsx
{/* ── Suggested Queries Overlay ─────────────────────────────── */}
<AnimatePresence>
  {suggestedQueriesVisible && !tableViewOpen && !savedViewsOpen && (
    <motion.div
      key="suggested-queries"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute bottom-20 left-1/2 z-20 -translate-x-1/2"
      style={{ width: 520, maxWidth: "calc(100% - 48px)" }}
    >
      <div
        className="rounded-2xl p-4 shadow-xl"
        style={{
          background: themeMode === "light" ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: themeMode === "light" ? "1px solid rgba(209,213,219,0.60)" : "1px solid rgba(255,255,255,0.10)",
        }}
      >
        {/* Header row */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[12px] font-medium" style={{ color: glassMuted }}>
            Try the following queries based on your usage.
          </span>
          <button
            type="button"
            onClick={() => setSuggestedQueriesVisible(false)}
            className="ml-2 flex size-5 shrink-0 items-center justify-center rounded hover:bg-black/5"
            style={{ color: glassMuted, background: "none", border: "none", cursor: "pointer" }}
            aria-label="Dismiss suggestions"
          >
            <X size={12} />
          </button>
        </div>

        {/* Query rows */}
        <div className="flex flex-col gap-1">
          {SUGGESTED_QUERIES.map((query) => (
            <button
              key={`${query.type}::${query.label}`}
              type="button"
              className="flex w-full items-center gap-3 rounded-xl border-none p-3 text-left"
              style={{ background: "transparent", cursor: "pointer" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  themeMode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              onClick={() => {
                openGraph(query.type, query.label);
                setSuggestedQueriesVisible(false);
              }}
            >
              {/* Icon badge */}
              <div
                className="flex shrink-0 items-center justify-center rounded-lg"
                style={{ width: 36, height: 36, background: query.color }}
              >
                <query.Icon size={18} className="text-white" />
              </div>

              {/* Query label */}
              <span className="flex-1 text-[13px] font-medium" style={{ color: glassText }}>
                {query.label}
              </span>

              {/* Arrow */}
              <ChevronRight size={16} style={{ color: glassMuted, flexShrink: 0 }} />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
```

**Reused tokens in scope:** `glassMuted`, `glassText`, `glassBorder`, `glassSurface` (computed at ~line 2531), `openGraph()` (line 2429), `X` and `ChevronRight` (already imported from lucide-react at line 5).

---

## Verification

1. Open the splash page — the overlay should appear centered at the bottom of the graph area with a fade-in.
2. Click any query row → graph loads for that type, overlay disappears.
3. Click ✕ → overlay disappears.
4. Open table view → overlay hides while split-screen is active.
5. Open saved views slide-in → overlay hides.
6. Toggle light/dark → overlay adapts colors correctly.
7. esbuild / TypeScript: no type errors (all icons satisfy `{ size?: number; className?: string }`, `SuggestedQuery` type is explicit).
