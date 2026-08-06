# Explorer Resource Graph — Unified Front-End Plan

## Overview

Merge the **Agentic_TFC** Control Center / TF Signal interaction layer with the **terraform-graph-catalog** workspace relationship graph into a single, production-quality front-end app called **Explorer Resource Graph**.

The `explorer-resource-graph/` folder already exists as a partial merger. This plan specifies the targeted gaps to close:

1. The `ConversationalDrawer` inside the graph panel must be **replaced** by the existing `ControlCenter` (TF Signal) bottom bar — the Drawer is a dead-end prototype; TF Signal is the canonical NL interaction surface.
2. The `ControlCenter`'s ops-feed / triage view must gain **Explorer-scoped signals** that match the graph's mock data (blast radius, provider drift, failed runs visible in the graph).
3. TF Signal must be able to **manipulate the Explorer view** through natural language — filter the resource table, highlight nodes in the graph, switch views — using the existing `UiAction` dispatch system already wired in `App.tsx`.
4. The `GraphPanel` must remain the primary visual surface and must respond to **both** click events and `UiAction` commands from TF Signal.

The base is `explorer-resource-graph/`. No new project scaffold is needed.

---

## Architectural Blueprint

```
┌──────────────────────────────────────────────────────────────────┐
│  App.tsx  (state owner + event bus)                              │
│                                                                  │
│  State:  explorerState, workbenchOpen, pendingQuery              │
│  Refs:   graphActionRef (imperative graph handle)                │
│  Handlers: handleUiAction → routes to ExplorerView + GraphPanel  │
└──────┬───────────────────────────────────────────────┬───────────┘
       │                                               │
       ▼                                               ▼
┌──────────────────────────────┐         ┌────────────────────────┐
│  ExplorerView                │         │  ControlCenter         │
│  (left nav + main content)   │         │  "TF Signal"           │
│                              │         │  (bottom drawer bar)   │
│  ┌──────────────────────┐    │         │                        │
│  │  ResourceResultPage  │    │         │  bar ─► expanded ─►    │
│  │  ┌────┐  ┌─────────┐ │    │         │  OperationsFeed        │
│  │  │Tbl │  │ Graph   │ │    │         │  TriagePanel           │
│  │  │    │  │ Panel   │ │    │         │  AutomatedWorkflows    │
│  │  └────┘  └────┬────┘ │    │         │                        │
│  └───────────────┼──────┘    │         │  onOpenWorkbench ──────┼──► Workbench (fullscreen)
│                  │           │         │  onUiAction ───────────┼──► App.handleUiAction
└──────────────────┼───────────┘         └────────────────────────┘
                   │
        graphActionRef (imperative)
        GraphPanel.dispatchAction(UiAction)
```

**Key data flow**: NL query enters `ControlCenter` → TF Signal picks a matching op → `onOpenWorkbench(query)` fires → `Workbench` renders scenario → Workbench can emit `UiAction` via `onUiAction` prop → `App.handleUiAction` routes to both `ExplorerView` state (table filters, nav) and `GraphPanel.dispatchAction` (highlight, blast radius, focus).

---

## Component Mapping

| Component | Source | Action | Notes |
|---|---|---|---|
| `ControlCenter.tsx` | `explorer-resource-graph/src/components/ControlCenter.tsx` | **Keep + extend** | Already ported from Agentic_TFC. Add Explorer-scoped `OPS_BY_PAGE["explorer"]` entries. |
| `Workbench.tsx` | `explorer-resource-graph/src/components/Workbench.tsx` | **Keep + extend** | Already ported. Add a `onUiAction` prop so Workbench can push graph commands back to App. |
| `ConversationalDrawer.tsx` | `explorer-resource-graph/src/components/ConversationalDrawer.tsx` | **Remove** | Replaced by TF Signal (ControlCenter). Its `UiAction` routing logic migrates to Workbench. |
| `GraphPanel.tsx` | `explorer-resource-graph/src/components/GraphPanel.tsx` | **Keep** | Already implements `dispatchAction(UiAction)` via `forwardRef`. No structural change needed. |
| `ResourceResultPage.tsx` | `explorer-resource-graph/src/components/ResourceResultPage.tsx` | **Modify** | Remove `ConversationalDrawer` usage. Remove the bottom padding hack for the drawer. SignalBannerStrip `onZap` already routes to `onControlCenterTrigger`. |
| `ExplorerView.tsx` | `explorer-resource-graph/src/components/ExplorerView.tsx` | **Keep** | No change needed. Already receives `onControlCenterTrigger`. |
| `SignalBannerStrip.tsx` | `explorer-resource-graph/src/components/SignalBannerStrip.tsx` | **Keep** | Already fires `onZap(zapQuery)` which routes to `setPendingQuery` in App. |
| `App.tsx` | `explorer-resource-graph/src/App.tsx` | **Modify** | Wire `Workbench`'s new `onUiAction` prop. Remove `ConversationalDrawer` state (`chatOpen`). |
| `mockChat.ts` | `explorer-resource-graph/src/mock/mockChat.ts` | **Keep** | Powers the `ConversationalDrawer` — can stay for reference but will no longer be called. |
| `ControlCenter.tsx` OPS_BY_PAGE | `explorer-resource-graph/src/components/ControlCenter.tsx` line 174 | **Extend** | Add an `"explorer"` key that surfaces graph-aligned signals (blast radius warning, provider drift, etc.) matching `MOCK_SIGNALS`. |
| `Workbench.tsx` SCENARIOS | `explorer-resource-graph/src/components/Workbench.tsx` | **Extend** | Add an `"explorer"` scenario cluster: blast radius investigation, provider upgrade remediation visible in graph. |
| `UiAction` type | `explorer-resource-graph/src/types/chat.ts` | **Extend** | Add `highlight_workspace` action type and optional `workbench_query` tunneling. |
| `ExplorerViewState` | `explorer-resource-graph/src/types/explorer.ts` | **Modify** | Remove `chatOpen` and `dependencyPanelOpen` (no longer driven by the drawer). |

---

## Step-by-Step Implementation Plan

### Sub-Task 1 — Remove ConversationalDrawer and clean up drawer state

**Intent**: The `ConversationalDrawer` is the "Ask the Catalog" pattern from the graph catalog prototype. TF Signal (`ControlCenter`) replaces it. Removing it reduces dead code and eliminates the drawer height padding that currently distorts the graph/table layout.

**Expected Outcomes**:
- `ResourceResultPage` no longer renders `ConversationalDrawer`.
- The `DRAWER_H` padding-bottom trick in `ResourceResultPage` is gone.
- `chatOpen` is removed from `ExplorerViewState` and all prop chains.
- `dependencyPanelOpen` is similarly cleaned up if unused.
- App compiles and renders correctly with no console errors.

**Todo List**:
1. In `explorer.ts`: remove `chatOpen` and `dependencyPanelOpen` from `ExplorerViewState`.
2. In `App.tsx`: remove the initial `chatOpen: false` and `dependencyPanelOpen: false` from state init.
3. In `ResourceResultPage.tsx`: delete the `ConversationalDrawer` import and JSX, delete the `DRAWER_H` variable and the `paddingBottom: DRAWER_H` on the main content div.
4. In `ExplorerView.tsx`: remove any `chatOpen`/`dependencyPanelOpen` references in `onStateChange` calls.
5. Verify the graph/table layout fills the space correctly after removal.

**Relevant Context**:
- [`ResourceResultPage.tsx`](explorer-resource-graph/src/components/ResourceResultPage.tsx:110) — ConversationalDrawer is at line 110
- [`explorer.ts`](explorer-resource-graph/src/types/explorer.ts:43) — ExplorerViewState definition
- [`ConversationalDrawer.tsx`](explorer-resource-graph/src/components/ConversationalDrawer.tsx) — file can be deleted after removal

**Status**: [ ] pending

---

### Sub-Task 2 — Add Explorer-scoped signals to ControlCenter (TF Signal)

**Intent**: The ControlCenter currently shows generic overview-level ops. The Explorer view has live mock signals (failed runs, drift, provider upgrades) that should appear in TF Signal's feed when `pageContext = "explorer"`. This makes TF Signal context-aware to what the graph is showing.

**Expected Outcomes**:
- `OPS_BY_PAGE["explorer"]` exists in `ControlCenter.tsx` with 3 ops tied to `MOCK_SIGNALS` data.
- Each op has relevant `nextSteps` with `workbenchQuery` values that launch Workbench.
- When `pageContext` changes to `"explorer"`, the feed shows Explorer-specific signals.
- The existing "overview" ops are unchanged.

**Todo List**:
1. Open `ControlCenter.tsx`. Locate `OPS_BY_PAGE` at line 174.
2. Add an `"explorer"` key with ops that mirror the three `MOCK_SIGNALS` types: `failed` (provider upgrade causing run failures), `drift` (networking-prod-core drift), `upgrade` (aws provider v5 opportunity).
3. Each op must include: `id`, `severity`, `icon`, `title`, `context`, `age`, `impact`, `evidence[]`, `nextSteps[]`.
4. At least one `nextStep` per op must have a `workbenchQuery` that maps to an existing Workbench scenario.
5. In `App.tsx`, confirm `pageContext="explorer"` is already passed to `ControlCenter` (it is, at line 79).

**Relevant Context**:
- [`ControlCenter.tsx`](explorer-resource-graph/src/components/ControlCenter.tsx:174) — `OPS_BY_PAGE` block
- [`mockCatalog.ts`](explorer-resource-graph/src/mock/mockCatalog.ts) — `MOCK_SIGNALS` data to match against
- [`App.tsx`](explorer-resource-graph/src/App.tsx:79) — `pageContext="explorer"` already set

**Status**: [ ] pending

---

### Sub-Task 3 — Wire Workbench `onUiAction` so it can command the graph

**Intent**: The Workbench is a full-screen agentic session. When a Workbench scenario identifies a workspace issue (e.g. blast radius of payments-prod-us-east), it should be able to fire a `UiAction` that updates the graph behind it — so when the user closes Workbench, the graph is already showing the relevant state.

**Expected Outcomes**:
- `Workbench` accepts an optional `onUiAction?: (action: UiAction) => void` prop.
- At scenario completion steps where a workspace is identified, the Workbench fires the appropriate `UiAction` (e.g. `show_blast_radius`, `focus_workspace`).
- `App.tsx` passes `handleUiAction` as `onUiAction` to `Workbench`.
- Closing Workbench reveals the graph already in blast-radius or focused state.

**Todo List**:
1. In `Workbench.tsx`: add `onUiAction?: (action: UiAction) => void` to `WorkbenchProps` interface (around line 2733 in the source).
2. Import `UiAction` from `../types/chat` in Workbench.
3. Identify 2-3 points in the scenario where a relevant workspace is confirmed (e.g. after "Confirm target workspaces" step) and call `onUiAction({ type: "show_blast_radius", workspace_id: "ws-payments-us" })` so the graph enters blast-radius mode. Fire `show_blast_radius` first, then `focus_workspace` as a secondary action so the affected node is also highlighted.
4. In `App.tsx`: update the `Workbench` JSX to pass `onUiAction={handleUiAction}`.
5. Test: open Workbench via TF Signal, step through a scenario, close — verify graph reflects the action.

**Relevant Context**:
- [`Workbench.tsx`](explorer-resource-graph/src/components/Workbench.tsx:1) — WorkbenchProps at line ~2733
- [`App.tsx`](explorer-resource-graph/src/App.tsx:93) — Workbench JSX at line 93
- [`types/chat.ts`](explorer-resource-graph/src/types/chat.ts) — UiAction union type
- [`GraphPanel.tsx`](explorer-resource-graph/src/components/GraphPanel.tsx:130) — `dispatchAction` handles `focus_workspace` and `show_blast_radius`

**Status**: [ ] pending

---

### Sub-Task 4 — TF Signal NL query → graph manipulation (extend UiAction + ControlCenter dispatch)

**Intent**: This is the core "TF Signal can manipulate the Explorer view through natural language" requirement. When the user types a query into the TF Signal bar and presses Enter (or triggers via a signal banner Zap), the query should route through `setPendingQuery` → `ControlCenter` → identify a matching op → fire a `UiAction` that updates the graph in real time without opening Workbench.

**Expected Outcomes**:
- Typing "show blast radius of networking" into the TF Signal bar and pressing Enter causes the graph to enter blast-radius mode for `ws-networking`.
- Typing "focus payments workspace" highlights `ws-payments-us` in the graph.
- These commands work while TF Signal stays in its bar/expanded state (no Workbench required).
- The existing flow to open Workbench for deeper workflows remains unchanged.

**Todo List**:
1. In `ControlCenter.tsx`: add an `onUiAction?: (action: UiAction) => void` prop to `ControlCenterProps`.
2. Import `UiAction` from `../types/chat`. Import `mockChat` from `../mock/mockChat`.
3. In the query `onKeyDown` handler (around line 820), when the user presses Enter:
   a. Expand the panel to the "expanded" state.
   b. Add the user's query as a visible message in the expanded panel (right side, below the ops feed).
   c. Call `mockChat(query)` — show a brief loading indicator.
   d. On response: display the reply text in the panel. Then dispatch each returned `UiAction` via `onUiAction` with sequential 400ms delays (matching the ConversationalDrawer pattern).
4. Language rules: reply text must use machine-state voice — "3 workspaces affected" not "I found 3 workspaces for you".
5. In `App.tsx`: pass `handleUiAction` as `onUiAction` to `ControlCenter`.

**Relevant Context**:
- [`ControlCenter.tsx`](explorer-resource-graph/src/components/ControlCenter.tsx:716) — ControlCenterProps interface
- [`App.tsx`](explorer-resource-graph/src/App.tsx:40) — `handleUiAction` already handles all UiAction types
- [`types/chat.ts`](explorer-resource-graph/src/types/chat.ts:15) — UiAction union
- [`GraphPanel.tsx`](explorer-resource-graph/src/components/GraphPanel.tsx:130) — receives actions via `dispatchAction`
- [`mockChat.ts`](explorer-resource-graph/src/mock/mockChat.ts) — existing query → UiAction engine to reuse

**Status**: [ ] pending

---

### Sub-Task 5 — Visual polish: unified layout with TF Signal bar always visible

**Intent**: The current layout has a `paddingBottom: "72px"` reserved for the TF Signal bar. After removing the `ConversationalDrawer`, the layout must feel clean: the graph and table fill available space, the signal strip is visible, and TF Signal anchors to the bottom without clipping the graph.

**Expected Outcomes**:
- No visual overlap between the TF Signal bar and graph content.
- The `ExplorerView` left nav, resource table, and graph panel fill the full height cleanly.
- Signal banners remain visible above the table.
- TF Signal bar collapses cleanly to its bar state and expands without covering the graph unexpectedly.

**Todo List**:
1. Verify `paddingBottom: "72px"` in `App.tsx` (line 63) is the correct TF Signal bar height — adjust if the bar renders taller after any changes in Sub-Task 2.
2. Confirm `ResourceResultPage`'s flex layout fills height correctly after removing the drawer padding.
3. Check the Workbench full-screen overlay (`position: fixed; inset: 0`) still covers the TF Signal bar (it should, since it uses `zIndex: 50`).
4. Review the ControlCenter expanded panel `maxHeight: "320px"` — ensure it does not clip signal content on smaller viewports.
5. Smoke test at 1280×800 and 1440×900 viewport sizes.

**Relevant Context**:
- [`App.tsx`](explorer-resource-graph/src/App.tsx:63) — paddingBottom wrapper
- [`ControlCenter.tsx`](explorer-resource-graph/src/components/ControlCenter.tsx:771) — expanded panel maxHeight
- [`ResourceResultPage.tsx`](explorer-resource-graph/src/components/ResourceResultPage.tsx:85) — main flex container

**Status**: [ ] pending

---

## ASCII Layout: Explorer Resource Graph — Unified View

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  hashicorp-demo  /  Explorer                                                │
├────────┬────────────────────────────────────────────────────────────────────┤
│ [Nav]  │  Resources  ·  341 managed resources across 8 workspaces           │
│        │  [Search…]  [Filter]  [Show/Hide graph]                            │
│ Modules│  ╔══════════════════════════════════════════════════════════════╗  │
│  42    │  ║ 🔴  2 runs failed after aws provider upgrade  [⚡ Fix now] ║  │
│        │  ╠══════════════════════════════════════════════════════════════╣  │
│Provider│  ║ 🟠  Drift detected in networking-prod-core   [⚡ Inspect]  ║  │
│   3    │  ╚══════════════════════════════════════════════════════════════╝  │
│        │                                                                    │
│Workspce│  ┌─────────────────────────────┬──────────────────────────────┐   │
│   8    │  │ Resource Table              │ Workspace Graph              │   │
│        │  │                             │                              │   │
│TF Vers │  │ Type  Name  WS  Status      │  [ws] ──► [ws-pay-us] ●     │   │
│   4    │  │ ───────────────────────     │   │                          │   │
│        │  │ aws_  main  net  ⚠ drift    │   ├──► [ws-pay-eu] ●        │   │
│Resrces │  │ aws_  web   pay  ✗ failed   │   │                          │   │
│  341   │  │ aws_  sg    pay  ✗ failed   │   ├──► [ws-api-gw] ●        │   │
│        │  │ azr_  vnet  pay  ✓ healthy  │   │                          │   │
│ ─────  │  │ …                           │   └──► [ws-auth]   ✓        │   │
│Saved   │  │                             │                              │   │
│ views  │  └─────────────────────────────┴──────────────────────────────┘   │
│   3    │                                                                    │
└────────┴────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│ TF Signal  [█]  Search, inspect, or prepare infrastructure changes…   [▲]  │
│                                               [Open Workbench]              │
└─────────────────────────────────────────────────────────────────────────────┘

  TF Signal expanded:
┌─────────────────────────────────────────────────────────────────────────────┐
│ ┌──────────────────┐  ┌───────────────────────────────┐  ┌───────────────┐ │
│ │ Sessions         │  │ Explorer Signals               │  │ Workflows     │ │
│ │ ● Provider upg…  │  │ 🔴 Provider upgrade · CRITICAL  │  │ Drift detect  │ │
│ │ ○ Drift inspect  │  │ 🟠 Drift · networking-prod-core │  │ Upgrade plan  │ │
│ │ ○ Cost audit…    │  │ 🔵 aws upgrade opportunity      │  │ Cost audit    │ │
│ │                  │  │                                 │  │               │ │
│ └──────────────────┘  └───────────────────────────────┘  └───────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
│ TF Signal  [█]  show blast radius of networking…          [▲]  [Workbench] │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Notes for Implementation

- **Do not introduce shadcn/ui** into `explorer-resource-graph`. It uses inline styles and Tailwind only. Agentic_TFC's shadcn components stay in the Agentic_TFC source.
- **ReactFlow stays**. The `GraphPanel` using `@xyflow/react` is already working. Do not swap it for D3.
- **Mock data stays**. No backend integration is in scope. All data remains in `mock/`.
- **`ConversationalDrawer` is the only component being deleted**. Everything else is extended, not replaced.
- The `pageContext` prop already gates which ops appear in TF Signal — this is the primary extension mechanism for Sub-Task 2.
