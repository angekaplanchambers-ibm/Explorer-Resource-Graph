# Group Key Table View Plan

## Overview

When a user selects a specific project or status key from panel 3 of the
dropdown (e.g. "payments" or "applied"), the table view button in the graph
toolbar does not appear. Every other pre-defined view shows it.

The cause is a single gate: `PREDEFINED_VIEW_TITLES.has(selectedGraphTitle)`.
This Set is built from USE_CASE_CATEGORIES items plus "View All {type}"
synthetic titles. Titles like "project:payments" and "status:applied" are not
in the Set, so `onTableViewToggle` is passed as `undefined` to TopologyGraph,
hiding the button.

Everything downstream already works correctly:
- `getWorkspaceRowsForTitle` handles "project:" and "status:" prefixes
- `tableResultCount` calls `getWorkspaceRowsForTitle(selectedGraphTitle)` for Workspaces
- `WorkspacesTable` receives `wsGroupMode` and renders grouped sections
- The modal header subtitle reflects the correct filtered count

Scope: one condition change at the `onTableViewToggle` prop site.

---

## Sub-Tasks

### Sub-Task 1 — Allow table view for project: and status: titles

**Intent**
Extend the `onTableViewToggle` gate to also enable the table view button
when `selectedGraphTitle` starts with "project:" or "status:". No new state,
no new components, no new data flow changes needed.

**Expected Outcomes**
- Clicking "payments" in panel 3 shows the table view button in the graph toolbar
- Clicking the button opens the modal with only payments workspaces in the table
- Modal header shows "Workspaces organized by payments (25) showing"
- Grouped section headers appear in the table (one group: "payments")
- Same behaviour for all status keys (applied, planned, errored)
- Existing pre-defined views are unaffected

**Todo List**
1. In `ERG/src/app/components/WorkspacesExplorerView.tsx` at the
   `onTableViewToggle` prop (~line 3478), extend the condition from:
   `selectedGraphTitle && PREDEFINED_VIEW_TITLES.has(selectedGraphTitle)`
   to also include titles starting with "project:" or "status:"
2. Mirror the same change in `src/app/components/WorkspacesExplorerView.tsx`

**Relevant Context**
- Gate condition: `ERG/src/app/components/WorkspacesExplorerView.tsx` ~line 3478
- `PREDEFINED_VIEW_TITLES` definition: ~line 3204
- `getWorkspaceRowsForTitle` prefix handling: lines 122-135
- `tableResultCount` default case: ~line 3447
- `WorkspacesTable` wsGroupMode rendering: already wired

**Status**
[x] done
