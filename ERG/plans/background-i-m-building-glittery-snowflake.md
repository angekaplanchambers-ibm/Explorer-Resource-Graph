# Explorer Splash — Full-Canvas FigJam Layout Plan

## Context

The current Explorer splash page nests the topology graph inside a scrollable column view with the breadcrumb, title row, and query builder sitting *above* the graph in document flow. The goal is to invert this: the graph becomes the full viewport canvas (minus TopNav), and all UI elements float on top as overlays — matching FigJam's canvas-first interaction model.

---

## Structural Elements Inventory

The following elements currently live in `WorkspacesExplorerView.tsx` (splash page) and must be repositioned as floating overlays:

| # | Element | Current Position | Role |
|---|---|---|---|
| 1 | **Breadcrumb** | Above graph, document flow | Location context |
| 2 | **Title row** (`h1` "Explorer" + subtitle) | Above graph, document flow | Page identification |
| 3 | **"New query" button** | Title row right | Opens query panel |
| 4 | **Query / Conditions section** | Above graph, collapsible card | Filter builder (WHERE/AND rows + Run Query) |
| 5 | **Topology Graph SVG** | Full area of a `min-h-[500px]` container | Main canvas content |
| 6 | **Vertical tab bar** | `position: absolute` inside graph, top-left | Opens Types / Use cases / Saved views panels |
| 7 | **Popup modal** | `position: absolute` inside graph, left of tabs | Entity picker / use case list / saved views |
| 8 | **Legend** | `position: absolute` inside graph, bottom-left | Node-type color key |
| 9 | **Layout + Mode controls** | `position: absolute` inside graph, bottom-right | Force/Stacked/Radial + Light/Dark toggle |
| 10 | **Node inspector panel** | `position: absolute` inside graph, top-right | Per-node detail on hover/click |
| 11 | **Left aside (220px)** | Document flow, left of graph area | Empty in splash mode — vestigial |

---

## Layout Option A — "Floating HUD" (Heads-Up Display)

**Philosophy:** Everything floats as discrete, dismissible panels over a full-bleed graph. No sidebars, no document-flow chrome.

```
┌────────────────────────────────────────────────────────────────┐
│  TopNav (60px, fixed)                                          │
├────────────────────────────────────────────────────────────────┤
│  [FULL VIEWPORT GRAPH — bg fills entire remaining area]        │
│                                                                │
│  ╔══════════════════════════╗   ← floating top-left corner box │
│  ║ Explorer    [≡ Query ▾]  ║     breadcrumb + title merged    │
│  ╚══════════════════════════╝     into compact pill header     │
│                                                                │
│  ┌──────────────────┐                                           │
│  │ 🗂  Types        │  ← icon + label tab strip, ~160px wide   │
│  │ 💡  Use cases    │    left-center, glass bg                 │
│  │ ⭐  Saved views  │                                           │
│  └──────────────────┘                                           │
│        ┌────────────────────────────────┐                      │
│        │  Slide-in panel (480px wide)   │ ← opens when tab     │
│        │  Types / Use cases / Saved…   │   icon is clicked;   │
│        └────────────────────────────────┘   left-docked        │
│                                                                │
│  ┌──────────────────────────────────────────┐ ← query drawer  │
│  │  WHERE  [field ▾] [op ▾] [value ——]  +  │   collapses to  │
│  │  AND    [field ▾] [op ▾] [value ——]     │   thin top bar  │
│  │  [Run Query]  [Cancel]                  │   by default    │
│  └──────────────────────────────────────────┘                  │
│                                                                │
│                              ┌──────────────┐ ← node inspect  │
│                              │ Node detail  │   top-right      │
│                              └──────────────┘                  │
│                                                                │
│  [Legend — bottom-left]          [Controls — bottom-right]    │
└────────────────────────────────────────────────────────────────┘
```

**Key layout decisions:**
- Remove the 220px left aside entirely in splash mode
- Merge breadcrumb + title into a compact floating pill (top-left, ~240px wide, ~56px tall, blurred glass bg)
- "New query" button becomes a toggle on that pill that expands a horizontal query bar below the pill (slides down from top)
- Tab bar becomes a ~160px wide strip with icon + text label side-by-side per row, vertically centered left-middle
- Popup panel slides in from the left edge when a tab is active (overlaps graph, not the tab strip)
- All overlays use `backdrop-filter: blur(8px)` + semi-transparent bg for depth cues
- Existing absolute-positioned legend and controls stay, just gain glass treatment

**Tradeoff:** The query bar appears below the header pill and could feel slightly disconnected from the "New query" trigger. Works best if query is usually collapsed.

---

## Layout Option B — "Command Strip" (FigJam-style top toolbar)

**Philosophy:** A single unified horizontal strip at the top consolidates navigation and action triggers. Panels drop down or slide in. The graph breathes underneath.

```
┌────────────────────────────────────────────────────────────────┐
│  TopNav (60px, fixed)                                          │
├────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Explorer ▸ Types  │ Types │ Use cases │ Saved views  │ 🔍 Query │
│  └──────────────────────────────────────────────────────────┘  │
│     ← unified floating command strip, ~44px tall, full width   │
│       centered / horizontally spaced, glass bg, top:8px        │
│                                                                │
│  [FULL VIEWPORT GRAPH — fills beneath and around the strip]    │
│                                                                │
│       ┌────────────────────────────────────┐                   │
│       │ Dropdown panel (Types/UseCases/…) │ ← drops from strip │
│       │  480px wide, anchored to its tab  │                    │
│       └────────────────────────────────────┘                   │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ WHERE [field▾] [op▾] [value ————]  AND [field▾]…  Run  │  │
│  └──────────────────────────────────────────────────────────┘  │
│     ← query bar drops down from "Query" button, full-width     │
│       glass strip just below command strip                     │
│                                                                │
│                              ┌──────────────┐ node inspector   │
│                              │ Node detail  │ top-right        │
│                              └──────────────┘                  │
│                                                                │
│  [Legend — bottom-left]          [Controls — bottom-right]    │
└────────────────────────────────────────────────────────────────┘
```

**Key layout decisions:**
- Single horizontal command strip floats over the graph at `top: 68px` (just below TopNav)
- Strip contains: "Explorer" breadcrumb label → "Types" | "Use cases" | "Saved views" tab triggers → "Query" button on far right
- Clicking a tab opens a dropdown panel anchored below that tab button (480px wide, max-h scrollable)
- Clicking "Query" expands a second floating strip directly below the first (full-width, query builder rows)
- Both panels collapse on outside-click or explicit close
- No left sidebar at all in splash mode
- Graph controls and legend stay at bottom corners
- Node inspector stays top-right

**Tradeoff:** The full-width command strip can feel more Figma/Linear-like than FigJam, and anchoring panels to the strip makes their trigger origin clearer. However it competes vertically with the graph more than Option A's icon strip.

---

## Recommendation

**Option A** is closer to FigJam's spatial feel — icon-only tab strip on the left, compact header pill, graph truly fills the frame. **Option B** is more Figma-toolbar-like — everything is reachable from one horizontal strip, which may be more discoverable but less immersive.

---

## Files to Modify

- `src/app/components/WorkspacesExplorerView.tsx` — primary layout target (splash page section)
- `src/styles/theme.css` — may need glass/overlay token additions
- `src/app/App.tsx` — verify the aside (220px) is conditionally removed in splash mode

## Verification

1. Graph fills full viewport height below TopNav with no whitespace
2. All overlay panels are reachable and render without layout shift
3. Query builder expands/collapses cleanly
4. Tab bar / command strip panels open and close correctly
5. Light/Dark toggle still functions; graph controls and legend visible at bottom corners
6. Node inspector appears on hover without being clipped
