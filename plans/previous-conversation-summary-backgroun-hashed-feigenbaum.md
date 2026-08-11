# Plan: Network Topology Graph View for WorkspacesExplorerView

## Context
The `WorkspacesExplorerView` component already has a Table/Graph segmented control that sets `activeView` state, but the Graph branch is entirely unimplemented — the state is set but never read. This plan wires up the Graph view with an SVG-based network topology diagram styled after infrastructure mapping tools (Datadog, Dynatrace, AWS CloudMap).

---

## Implementation Approach

### File to modify
`src/app/components/WorkspacesExplorerView.tsx`

### New component (inline or extracted)
A `TopologyGraph` component, written inline in the same file (or extracted to `src/app/components/TopologyGraph.tsx` if size warrants). It receives the current view's rows and type, and renders the SVG graph.

---

## Node Color Palette

| Node Type | Color | Hex |
|---|---|---|
| Workspaces | Medium Purple | `#8b5cf6` |
| Modules | Slate Blue | `#6366f1` |
| Providers | Emerald | `#10b981` |
| Terraform Versions | Sky | `#0ea5e9` |
| Resources (Compute) | Pink | `#ec4899` |
| Resources (Identity) | Orange | `#f97316` |
| Resources (Networking) | Blue | `#3b82f6` |
| Resources (Security) | Light Purple | `#a78bfa` |
| Resources (Storage & Data) | Teal | `#14b8a6` |
| Policy Sets | Amber | `#f59e0b` |

Selected node: Orange `#f97316` with white 1px border.

Resource sub-type is inferred from `resource.type` substring matching (compute, identity, network, security, storage/data).

---

## Graph Layout Algorithm

Use a **force-directed layout** computed once on mount (not continuous simulation) to avoid the need for D3:

1. Place nodes in an approximate circular arrangement as the initial seed.
2. Run 200–300 iterations of a simple spring-repulsion model in plain JS (no D3 dependency):
   - **Repulsion**: nodes push each other away (inverse-square).
   - **Attraction**: connected nodes pull together (spring).
   - **Centering**: weak pull toward canvas center.
3. After convergence, freeze positions and render as static SVG.

This keeps the implementation self-contained with zero new dependencies.

**Connections / edges:**
- For the **Workspaces** view: connect each workspace node to the Terraform Version node it uses (`metadata[6]`), and to any modules/providers it references (via `metadata[3]`/`metadata[5]`).
- For other views (Modules, Providers, Terraform Versions): connect nodes that share a common `workspaces` string value (i.e. workspaces that use the same module/provider/version).
- For **Resources**: connect resources that share the same `workspace` field value.
- Edge weight does not affect visual thickness — all connectors are identical.

**Edge rendering:**
- SVG `<path>` with a cubic Bézier curve (slight arc, not straight), stroke white, opacity 0.35, strokeWidth 1.5.
- The control points are offset perpendicular to the midpoint by a fixed fraction of the edge length (e.g. 20%) to create the gentle curve effect.

---

## SVG Canvas

- Fill the same container div that currently holds the table (100% width, fixed height `calc(100vh - 220px)` or similar).
- Dark background to match infrastructure-map aesthetic: `#0f1117` (near-black slate).
- A subtle radial gradient overlay for depth.
- Nodes are `<circle>` elements with radius 28px and an inner icon (SVG path or a text label abbreviation).
- Node labels: small white text centered below the circle, max 16 chars truncated with ellipsis.

---

## Node Interaction

**Click to select:**
- `selectedNode` state (string id or null).
- On click: set selectedNode to that node's id.
- Selected node: fill becomes `#f97316`, stroke `white` 1px.
- Neighbor filtering: compute neighbor set from edge list; non-neighbor, non-selected nodes get `opacity-0` (hidden via SVG `opacity` attribute transition).
- Click on SVG background (`<rect>` covering canvas): reset selectedNode to null → all nodes return to full opacity.

**Popover on selection:**
- Positioned near the selected node (offset by ~40px to avoid overlap).
- Constrained to stay within the SVG viewport.
- Shows a dark card (`bg-[#1a1d27]`, `border border-[rgba(255,255,255,0.12)]`, `rounded-xl`, `p-4`) with:
  - Node name (bold, white)
  - Type badge (colored dot + label)
  - Up to 5 key fields from the row, formatted as `label: value` pairs in small muted text.
- Rendered as a `<foreignObject>` in the SVG, or as an absolutely positioned div layered over the SVG using `position: absolute` and computed pixel coords from the node's SVG position.

---

## Integration into WorkspacesExplorerView

1. **Read `activeView` in the render tree** — currently set but never consumed. Add a conditional below the query-builder section:
   ```tsx
   {activeView === "table" ? (
     /* existing table render */
   ) : (
     <TopologyGraph activeType={activeType} rows={currentRows} />
   )}
   ```
2. Pass the appropriate `rows` array to `TopologyGraph` based on `activeType` (same switch the table render already uses).
3. The `TopologyGraph` component re-runs the layout when `activeType` or `rows` changes (via `useEffect` / `useMemo`).

---

## Verification

1. Click the "Graph" button — the dark topology canvas should replace the table.
2. Nodes should be spaced without heavy overlap after force-layout settles.
3. Clicking a node: it turns orange, neighbors stay visible, others fade; popover appears.
4. Clicking empty canvas: all nodes restore opacity, no popover.
5. Switching to a different nav item (e.g. Modules → Resources) while in Graph view: graph re-renders with new node set and colors.
6. Clicking "Table" button: table re-appears, graph unmounts.
