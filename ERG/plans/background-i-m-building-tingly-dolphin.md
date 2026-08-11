# Plan: Saved Views → Slide-In Panel

## Context

Currently the "Saved Views" tab in the navigation rail opens an overlay popover (the same floating panel used by "Types" and "Use Cases" tabs) that embeds a table inline inside it. The user wants the saved views table to appear in a dedicated slide-in aside container — identical in behavior to the Types table panel that slides in from the right and pushes the topology graph into a 50/50 split — instead of inside the popover.

## File to Modify

`src/app/components/WorkspacesExplorerView.tsx`

---

## Implementation Steps

### 1. Add `savedViewsOpen` state (near line 2378)

```tsx
const [savedViewsOpen, setSavedViewsOpen] = useState(false);
```

### 2. Change the "Saved Views" nav button handler (line ~2737)

The nav rail currently calls `setActiveTab(current => current === tab ? null : tab)` for all three tabs. For the "saved" tab, instead toggle `savedViewsOpen` and ensure the overlay popover stays closed:

```tsx
// In the button onClick for tab === "saved":
onClick={() => {
  if (tab === "saved") {
    setSavedViewsOpen(open => !open);
    setActiveTab(null); // ensure popover stays closed
  } else {
    setActiveTab(current => current === tab ? null : tab);
    setSavedViewsOpen(false); // close saved panel when switching to other tabs
  }
}}
```

Also ensure that when `savedViewsOpen` is toggled off, it resets (the panel already starts at the closed state).

### 3. Extend the graph container's `right` style (line ~2540)

Update the condition that squeezes the topology graph into the left half to also account for `savedViewsOpen`:

```tsx
right: (tableViewOpen && selectedGraphType) || savedViewsOpen ? "50%" : 0,
```

### 4. Add a new `<aside>` for Saved Views (after the existing aside, line ~2576)

Add a second slide-in aside, styled identically to the existing type-table aside, controlled by `savedViewsOpen`. Place it immediately after the closing `</aside>` of the existing type-table panel.

```tsx
{/* Saved Views slide-in panel */}
<aside
  className={`
    absolute bottom-0 right-0 top-0 z-40
    flex flex-col border-l
    shadow-[-18px_0_40px_rgba(0,0,0,0.18)]
    backdrop-blur-xl
    transition-all duration-300 ease-out
    ${savedViewsOpen ? "translate-x-0" : "pointer-events-none translate-x-full"}
  `}
  style={{ width: "50%", background: glassSurface, borderColor: glassBorder }}
  aria-hidden={!savedViewsOpen}
>
  {/* Header */}
  <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: glassBorder }}>
    <span className="text-sm font-semibold text-foreground">Saved Views</span>
    <button onClick={() => setSavedViewsOpen(false)} className="...close button styles...">
      <X size={16} />
    </button>
  </div>

  {/* Search + filter bar — lift existing JSX from popover lines 2879–2898 */}
  {/* Result count — line 2900 */}
  {/* Saved views table — lines 2901–2926 */}
</aside>
```

The content (search input, type dropdown, result count, `<table>` with 5 columns, `filteredSavedViews.map(...)`) is **lifted verbatim from the existing popover block** (lines 2879–2929). The saved state variables (`savedSearch`, `savedType`, `filteredSavedViews`) remain unchanged.

### 5. Remove "saved" content from the overlay popover

Remove the `{activeTab === "saved" && (...)}` block (lines 2877–2929) from the overlay popover since it's now rendered in its own aside. Optionally remove `"saved"` from the `activeTab` type union and all related checks — or leave the union type and simply never set it to `"saved"` anymore.

### 6. Active state for the Saved Views nav button

Update the nav button's active indicator (which currently keys off `activeTab === tab`) for the "saved" button to instead key off `savedViewsOpen`:

```tsx
// For the saved tab button:
isActive={tab === "saved" ? savedViewsOpen : activeTab === tab}
```

This keeps the button highlighted while the slide-in is open.

### 7. Close Saved Views when opening a Type

In `openGraph` (line ~2396), add `setSavedViewsOpen(false)` so clicking a saved view row (which calls `openGraph(view.type, view.name)`) closes the saved views panel and transitions to the type-specific graph + table:

```tsx
const openGraph = (type: string, title: string) => {
  setSelectedGraphType(type);
  setSelectedGraphTitle(title);
  setActiveTab(null);
  setSavedViewsOpen(false); // close saved panel if open
};
```

---

## Verification

1. Click "Saved Views" in the nav rail → overlay popover does NOT appear; slide-in panel glides in from the right; topology graph squeezes to the left 50%.
2. Search/filter controls in the slide-in work identically to the old popover.
3. Clicking a saved view row → slide-in closes, type-specific topology graph loads, type-table aside opens.
4. Click "Saved Views" again (while open) → panel closes, graph expands back to full width.
5. Switching to "Types" or "Use Cases" tabs → saved views panel closes, overlay popover opens normally.
6. "Saved Views" nav button is highlighted while panel is open, matches style of other active tabs.
