# Plan: Replace "View columns" button with 3-dot MoreHorizontal button in Table view

## Context
The slide-in Table view panels (`SlideInWorkspacesTable` and `SlideInTypeDataTable`) currently use a labeled "View columns" button (with a ChevronUp/Down icon) to open the column chooser dropdown. The user wants to swap this for a compact 3-dot (`MoreHorizontal`) icon button — consistent with the MoreHorizontal button pattern already used in the main `WorkspacesExplorerView` toolbar (line ~2830).

## Files to modify

**Single file:** `src/app/components/WorkspacesExplorerView.tsx`

Two components inside that file:
1. `SlideInWorkspacesTable` — column chooser trigger at ~line 1746
2. `SlideInTypeDataTable` — column chooser trigger at ~line 1815

## Changes

### `SlideInWorkspacesTable` (~line 1746-1753)
Replace the labeled "View columns" `<button>` with a square icon button using `<MoreHorizontal size={15} strokeWidth={1.8} />`.

**Before:**
```jsx
<button
  type="button"
  onClick={() => { setColumnsOpen(open => !open); setDraftColumnIds(visibleColumnIds); setColumnSearch(""); }}
  className={`flex h-9 items-center gap-2 ... ${columnsOpen ? "border-[#0f62fe] ring-2 ..." : "..."}`}
  aria-expanded={columnsOpen}
>
  View columns {columnsOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
</button>
```

**After:**
```jsx
<button
  type="button"
  onClick={() => { setColumnsOpen(open => !open); setDraftColumnIds(visibleColumnIds); setColumnSearch(""); }}
  className={`flex h-7 w-7 items-center justify-center rounded-[4px] border ... ${columnsOpen ? "border-[#0f62fe] bg-[#edf4ff] ring-2 ring-[#0f62fe]/20" : "border-[#c9ccd2] bg-white hover:bg-[#f2f3f5]"}`}
  aria-label="View columns"
  aria-expanded={columnsOpen}
>
  <MoreHorizontal size={15} strokeWidth={1.8} />
</button>
```

Remove the `ChevronUp` / `ChevronDown` imports if they become unused after this change (check other usages first).

### `SlideInTypeDataTable` (~line 1815)
Apply the same replacement — same button shape, same `MoreHorizontal` icon, same `aria-label="View columns"`, same active/inactive class pattern.

## Verification
- The 3-dot button should appear in the Table view toolbar (both the Workspaces-specific table and the generic type data table).
- Clicking it opens the column chooser dropdown; clicking again closes it.
- The active (open) state applies the blue ring/border to signal selection.
- The dropdown position, search, checkboxes, and Apply button are unchanged.
- No visual regression on the rest of the toolbar or the main-view MoreHorizontal button (separate component, untouched).
