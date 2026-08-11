# Plan: Two-Panel Type Dropdown Below HUD Button Group

## Context

The compact glass HUD in `ExplorerSplashView` has a 6-button entity-type group at the top. The user wants a dropdown menu inserted directly below this button group that, when opened, displays two side-by-side panels:
- **Left panel**: the 6 type categories (Workspaces, Policy Sets, Modules, Resources, Providers, Terraform Versions)
- **Right panel**: the pre-defined sub-view items for whichever type is currently highlighted on the left

This mirrors the design pattern shown in the screenshot — a two-column picker where hovering a left-panel row hydrates the right panel with its sub-items.

---

## File to modify

`src/app/components/WorkspacesExplorerView.tsx`

---

## Step 1 — Extract `USE_CASE_CATEGORIES` as a module-level constant

Currently the use-case data is an anonymous inline array literal in JSX at lines 2882–2929. Lift it to a named constant immediately before `splashItems` (~line 2308) so both the HUD dropdown and the existing Use Cases popover can share it.

```ts
const USE_CASE_CATEGORIES = [
  {
    heading: "Workspaces",
    Icon: WorkspaceIcon,
    type: "Workspaces",
    items: [
      "Workspaces without VCS", "Workspace VCS source",
      "Workspaces with failed checks", "Drifted Workspaces",
      "All workspace versions", "Workspaces by run status",
      "Latest updated workspaces", "Oldest applied workspaces",
      "Latest Terraform versions",
    ],
  },
  {
    heading: "Policy Sets",
    Icon: Shield,
    type: "Policy Sets",
    items: [
      "Policy sets with failures", "Policy sets with overrides",
      "Policy sets with runtime errors", "Global policy sets",
      "Recently updated policy sets", "tf-policy sets",
      "Sentinel policy sets", "OPA sets",
    ],
  },
  { heading: "Modules",            Icon: ModuleIcon,    type: "Modules",            items: ["Top module versions"] },
  { heading: "Resources",          Icon: ResourcesIcon, type: "Resources",          items: ["Loremipsum"] },
  { heading: "Providers",          Icon: Globe,         type: "Providers",          items: ["Loremipsum"] },
  { heading: "Terraform versions", Icon: TerraformIcon, type: "Terraform Versions", items: ["Top Terraform versions"] },
] as const;
```

Then replace the inline array in the Use Cases popover (lines 2882–2929) with `{USE_CASE_CATEGORIES.map(...)}`.

---

## Step 2 — Add two state variables inside `ExplorerSplashView`

Add to the existing state block (~line 2390):

```ts
const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
const [hoveredDropdownType, setHoveredDropdownType] = useState<string>(USE_CASE_CATEGORIES[0].type);
```

- `typeDropdownOpen`: whether the two-panel dropdown is currently open
- `hoveredDropdownType`: which left-panel type row is active (drives the right panel); defaults to `"Workspaces"`

---

## Step 3 — Insert the dropdown trigger button

Immediately after the closing `</div>` of the button group wrapper at line 2700, add a trigger row before the query builder `<div className="mt-3">`:

```tsx
{/* Two-panel type dropdown trigger */}
<div className="relative mt-2" onMouseDown={event => event.stopPropagation()}>
  <button
    type="button"
    onClick={() => setTypeDropdownOpen(open => !open)}
    className="flex h-[28px] w-full items-center justify-between rounded-[5px] border border-[rgba(101,106,118,0.25)] bg-white/60 px-3 text-[11px] font-medium text-[#3b3d45] transition-colors hover:bg-white/90"
    style={{ backdropFilter: "blur(8px)" }}
  >
    <span className="flex items-center gap-1.5">
      <LayoutGrid size={13} className="text-[#656a76]" />
      Browse pre-defined views
    </span>
    <ChevronDown
      size={13}
      className={`text-[#656a76] transition-transform ${typeDropdownOpen ? "rotate-180" : ""}`}
    />
  </button>

  {/* The two-panel dropdown panel */}
  {typeDropdownOpen && (
    /* ... panel JSX — see Step 4 ... */
  )}
</div>
```

`LayoutGrid` is already available from `lucide-react`. If not imported, add it to the existing import destructure.

---

## Step 4 — Render the two-panel dropdown

Inside the `{typeDropdownOpen && (...)}` block, render a floating card that sits below the trigger. The card has two side-by-side panels sharing a fixed height.

```tsx
<div
  className="absolute left-0 top-[32px] z-50 flex overflow-hidden rounded-[8px] border shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
  style={{ background: glassSurface, borderColor: glassBorder, backdropFilter: "blur(16px)", width: "100%" }}
>
  {/* Left panel — Type categories */}
  <div className="flex w-[160px] shrink-0 flex-col border-r py-1.5" style={{ borderColor: glassBorder }}>
    {USE_CASE_CATEGORIES.map(({ heading, Icon, type }) => {
      const isActive = hoveredDropdownType === type;
      return (
        <button
          key={type}
          type="button"
          onMouseEnter={() => setHoveredDropdownType(type)}
          onClick={() => { openGraph(type, heading); setTypeDropdownOpen(false); }}
          className={`flex h-[34px] items-center gap-2.5 px-3 text-[12px] font-medium transition-colors ${
            isActive
              ? "bg-[#edf4ff] text-[#0f62fe]"
              : "text-[#3b3d45] hover:bg-[rgba(101,106,118,0.08)]"
          }`}
        >
          <Icon size={14} strokeWidth={1.7} className="shrink-0" />
          {heading}
          {isActive && <ChevronRight size={12} className="ml-auto" />}
        </button>
      );
    })}
  </div>

  {/* Right panel — Sub-items for the active type */}
  <div className="flex min-w-0 flex-1 flex-col overflow-y-auto py-1.5" style={{ maxHeight: 220 }}>
    {(() => {
      const category = USE_CASE_CATEGORIES.find(c => c.type === hoveredDropdownType);
      if (!category) return null;
      return (
        <>
          <p className="px-3 pb-1.5 pt-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#656a76]">
            {category.heading} views
          </p>
          {category.items.map(label => (
            <button
              key={label}
              type="button"
              onClick={() => { openGraph(category.type, label); setTypeDropdownOpen(false); }}
              className="flex h-[30px] items-center justify-between px-3 text-[12px] text-[#3b3d45] transition-colors hover:bg-[rgba(101,106,118,0.08)] hover:text-[#0f62fe]"
            >
              <span>{label}</span>
              <ChevronRight size={12} className="shrink-0 text-[#aeb1b8]" />
            </button>
          ))}
        </>
      );
    })()}
  </div>
</div>
```

---

## Step 5 — Close dropdown on outside click

Add a `useEffect` that listens for a `mousedown` on `document` and closes the dropdown if the click is outside the dropdown container. Use a `ref` on the outer `<div className="relative mt-2">` wrapper.

```ts
const typeDropdownRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  if (!typeDropdownOpen) return;
  const handler = (e: MouseEvent) => {
    if (typeDropdownRef.current && !typeDropdownRef.current.contains(e.target as Node)) {
      setTypeDropdownOpen(false);
    }
  };
  document.addEventListener("mousedown", handler);
  return () => document.removeEventListener("mousedown", handler);
}, [typeDropdownOpen]);
```

Attach `ref={typeDropdownRef}` to the wrapper `<div className="relative mt-2">`.

---

## Step 6 — Import `LayoutGrid` if missing

Check the existing `lucide-react` import at line 6 and add `LayoutGrid` to the destructure if it isn't already there.

---

## Verification

1. Run `npx esbuild src/app/components/WorkspacesExplorerView.tsx --bundle=false --loader=tsx` — must exit 0 with no errors.
2. Confirm the HUD renders with the "Browse pre-defined views" trigger below the 6-button group.
3. Click the trigger — the two-panel dropdown opens.
4. Hover over each type in the left panel — right panel updates immediately.
5. Click a sub-item — `openGraph` fires, the graph updates, and the dropdown closes.
6. Click anywhere outside the dropdown — it closes.
7. The Use Cases popover (rail → "Use cases" tab) still renders correctly via `USE_CASE_CATEGORIES`.
8. No regressions in HUD drag, query builder, or the rest of the splash view.
