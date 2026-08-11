# ERG Modal Query Unification

## Overview

The Explorer Splash view has the correct Query element — the collapsible `InlineQueryBuilder`
inside the HUD card. The Table View popup modal (opened by the tab button when a graph type is
selected) must show that same Query element above the table results. Currently the modal has a
non-functional text pill labeled "Query" that is never wired to the table data. Additionally,
`SlideInWorkspacesTable` and `SlideInTypeDataTable` each embed their own private
`InlineQueryBuilder` instance, which creates a duplicate query UI that should be removed.

The 3-dot Actions button and its Save view / Download CSV popover stay in the modal toolbar.
The popover currently has a z-index bug that prevents it from appearing above the modal's
`overflow: hidden` shell — that is fixed in Task 1.

**Goal:** One query element in the modal — `InlineQueryBuilder`, collapsed by default —
controlling all table types consistently. The 3-dot actions popover works correctly.
No other query UI inside the modal.

**Scope:** `src/app/components/WorkspacesExplorerView.tsx` only.

---

## Sub-Tasks

### Task 1 — Replace dead query pill with InlineQueryBuilder; fix actions popover z-index

**Intent:** Remove the inert text-pill "Query" input from the modal toolbar and replace it with
`InlineQueryBuilder` rendered in the modal body. Keep the 3-dot actions button and fix its
popover so it appears above the modal shell.

**Expected Outcomes:**
- `tableQuery` state and its setter are gone from `ExplorerSplashView`.
- The `<label>` pill block (the "Query" text input, lines 2738–2759) is removed from the modal
  toolbar. The toolbar row now contains only `<div className="flex-1" />` and the 3-dot button.
- `modalConditions` state (`useState<ConditionFilter[]>([])`) is added to `ExplorerSplashView`.
- `modalQueryColumns` derived value maps `selectedGraphType` to the right column set:
  - `"Policy Sets"` → `policySetColumns`
  - `"Modules"` → `moduleTableColumns`
  - `"Providers"` → `providerTableColumns`
  - `"Terraform Versions"` → `terraformVersionTableColumns`
  - `"Resources"` → `resourceTableColumns`
  - default (Workspaces / anything else) → `tableColumns`
- A `useEffect` resets `modalConditions` to `[]` when `selectedGraphType` changes.
- `<InlineQueryBuilder queryColumns={modalQueryColumns} onApplyConditions={setModalConditions} />`
  is rendered inside the modal body, just above the `<TopologyTableView>` call, inside the
  existing `<div className="min-h-0 flex-1 overflow-auto p-5">` wrapper.
- The 3-dot actions popover dropdown `z-20` is raised to `z-50` so it renders above the modal
  shell (which has `zIndex: 41` and `overflow: hidden`).

**Todo List:**
1. Remove `tableQuery` / `setTableQuery` from `ExplorerSplashView` state declarations (line 2434).
2. Remove the `useEffect` that references `tableQuery` (line 2436–2438 — update it to only
   reset `tableActionsOpen` when `tableViewOpen` changes, keeping the rest of the effect).
3. Delete the `<label>` pill block (lines 2738–2759) from the modal toolbar. Keep the
   `<div className="flex-1" />` and the 3-dot actions `<div className="relative">` block.
4. Add `const [modalConditions, setModalConditions] = useState<ConditionFilter[]>([]);` in
   `ExplorerSplashView`.
5. Add `modalQueryColumns` derived value (a `const`, no memo needed — it's derived from
   `selectedGraphType` which is already state).
6. Add `useEffect(() => { setModalConditions([]); }, [selectedGraphType]);` in
   `ExplorerSplashView`.
7. In the modal body (`<div className="min-h-0 flex-1 overflow-auto p-5">`), add
   `<InlineQueryBuilder queryColumns={modalQueryColumns} onApplyConditions={setModalConditions} />`
   immediately before the `<TopologyTableView>` call.
8. In the 3-dot actions popover dropdown `<div role="menu" ...>`, change `z-20` to `z-50`.

**Relevant Context:**
- `ExplorerSplashView` state: lines 2427–2444.
- `tableQuery` at line 2434; `useEffect` with `tableQuery` reference at line 2436.
- Modal toolbar: lines 2736–2805.
- Modal body: lines 2807–2809.
- Popover dropdown `z-20`: line 2784.
- `InlineQueryBuilder` component: lines 1839–2031.
- Column arrays: `tableColumns` (line 105), `moduleTableColumns` (line 134),
  `providerTableColumns` (line 142), `resourceTableColumns` (line 151),
  `terraformVersionTableColumns` (line 167), `policySetColumns` (line 675).

**Status:** [ ] pending

---

### Task 2 — Thread conditions through TopologyTableView

**Intent:** `TopologyTableView` currently passes `conditions={[]}` hard-coded to every table
sub-component. It needs to accept and forward `modalConditions` from the modal.

**Expected Outcomes:**
- `TopologyTableView` accepts a `conditions: ConditionFilter[]` prop.
- Every table component called inside `TopologyTableView` receives those conditions instead of `[]`.
- `SlideInWorkspacesTable` accepts a new `conditions: ConditionFilter[]` prop.
- The call site in `ExplorerSplashView` passes `conditions={modalConditions}`.

**Todo List:**
1. Add `conditions: ConditionFilter[]` to `TopologyTableView`'s prop signature (line 2300).
2. Replace each hard-coded `conditions={[]}` with `conditions={conditions}` in the five explicit
   table calls inside `TopologyTableView` (lines 2302–2306).
3. Add `conditions: ConditionFilter[]` prop to `SlideInWorkspacesTable` (line 2033).
4. Wire it into the `filteredRows` useMemo inside `SlideInWorkspacesTable` — replace
   `appliedConditions` with the incoming `conditions` prop (the memo at line 2057).
5. Update the `<TopologyTableView>` call in `ExplorerSplashView` (line 2808) to
   `<TopologyTableView type={selectedGraphType} conditions={modalConditions} onNavigate={...} />`.

**Relevant Context:**
- `TopologyTableView`: lines 2300–2308.
- `SlideInWorkspacesTable`: lines 2033–2177; `filteredRows` memo at line 2057.
- Call site in `ExplorerSplashView`: line 2808.

**Status:** [ ] pending

---

### Task 3 — Remove InlineQueryBuilder from SlideInWorkspacesTable and SlideInTypeDataTable

**Intent:** Now that conditions arrive as props, the private `InlineQueryBuilder` instances and
the local `appliedConditions` state inside each table component are redundant. Remove them.

**Expected Outcomes:**
- `SlideInWorkspacesTable` has no `appliedConditions` state and no `<InlineQueryBuilder>`.
- `SlideInTypeDataTable` has no `appliedConditions` state and no `<InlineQueryBuilder>`. It
  accepts a `conditions: ConditionFilter[]` prop and uses it directly in `filteredRows`.
- All other table branches (`PolicySetsTable`, `RegistryTable`, `TerraformVersionsTable`,
  `ResourcesTable`) already accept conditions as props — no changes needed there.

**Todo List:**
1. `SlideInWorkspacesTable`: remove `appliedConditions` state (line 2040) and its
   `setAppliedConditions` usage; remove `<InlineQueryBuilder ... />` JSX (line 2100).
   The `filteredRows` memo now reads from the `conditions` prop (already wired in Task 2).
2. `SlideInTypeDataTable`: remove `appliedConditions` state (line 2186) and its
   `setAppliedConditions` usage; remove `<InlineQueryBuilder ... />` JSX (line 2221);
   add `conditions: ConditionFilter[]` prop; use it in `filteredRows` instead of `appliedConditions`.
3. Update the `SlideInTypeDataTable` call inside `TopologyTableView` (line 2307 area) to pass
   `conditions={conditions}` if it is not already covered by step 2.

**Relevant Context:**
- `SlideInWorkspacesTable`: `appliedConditions` at line 2040, `<InlineQueryBuilder>` at line 2100.
- `SlideInTypeDataTable`: `appliedConditions` at line 2186, `<InlineQueryBuilder>` at line 2221.

**Status:** [ ] pending

---

## Execution Order

Task 1 → Task 2 → Task 3

Task 2 depends on Task 1 (modal must own conditions before passing them down).
Task 3 depends on Task 2 (embedded builders cannot be removed until props flow in from above).

## Notes for Implementation

- `InlineQueryBuilder` starts collapsed by default — its internal `expanded` state initialises
  to `false`, so no extra prop is needed.
- `policySetColumns` is defined at line 675 — use it as-is for Policy Sets column mapping.
- Do not touch the HUD query builder — it is a separate surface for the graph view, not the modal.
- The `tableActionsOpen` state, its toggle, and the Save view / Download CSV menu items are
  untouched except for the `z-20` → `z-50` fix on the dropdown wrapper.
- `SlideInTypeDataTable` is currently not called directly from `TopologyTableView` — it is
  used by the specific table components (`PolicySetsTable` etc.) via their internal rendering.
  Verify the actual call chain during implementation before adding props.
