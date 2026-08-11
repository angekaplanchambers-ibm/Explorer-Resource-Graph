# Plan: Table View → Viewport Modal

## Context

The current table view is a `position: fixed` right-side panel that slides in from the right edge at 50% viewport width. The request is to replace it with a popup modal that overlays the full visualization area. Two design approaches are proposed below for the user to choose from.

---

## Idea A — Full-Width Bottom Sheet

The table panel rises from the bottom of the screen, spanning the full viewport width. The graph remains partially visible above the sheet, giving spatial context while browsing data.

**Behaviour**
- Anchored at `bottom: 0`, `left: 0`, `right: 0` (full width), `position: fixed`, `top: 60px` excluded
- Default height: `60vh` — tall enough to show a useful number of rows, short enough to keep the graph visible above
- Drag handle bar at the top edge lets the user resize height (same pattern as current width resize)
- Smooth `translateY(100%) → translateY(0)` slide-up animation (300ms ease-out)
- Light semi-transparent backdrop `rgba(0,0,0,0.18)` covers only the graph area beneath the sheet; clicking it closes the sheet
- The tab button (`top: 76, right: 0`) remains as the toggle, caret flips up/down instead of left/right

**Changes required**
- `WorkspacesExplorerView.tsx` → aside: change `right-0 w-[tableViewWidth]` → `bottom-0 left-0 right-0 h-[tableViewHeight]`; animate on Y axis
- Replace `startTableResize` (X-axis) with a Y-axis version (`startTableHeightResize`)
- Add a `tableViewHeight` state (default `Math.round(window.innerHeight * 0.6)`)
- Tab: keep `position: fixed, top: 76, right: 0`; no right-position tracking needed
- Add a backdrop `<div>` inside the graph canvas that fades in behind the sheet

---

## Idea B — Centered Dialog Modal with Dimmed Backdrop

The table appears as a floating card in the center of the viewport, similar to a traditional dialog. The graph behind it dims and blurs slightly, making the table the clear focus.

**Behaviour**
- Centered: `position: fixed`, `top: 50%`, `left: 50%`, `transform: translate(-50%, -50%)`
- Size: `85vw × 80vh`, capped at `1400px` wide — large enough for a dense data table
- Entrance animation: `opacity 0→1` + `scale 0.96→1` over 220ms ease-out (via `motion/react`)
- Backdrop: `position: fixed, inset: 0`, `background: rgba(0,0,0,0.35)`, `backdrop-filter: blur(2px)` — sits between graph and modal; clicking it closes the modal
- Close button (X) in the modal's top-right header
- No resize handle — fixed proportional size that adapts via `vw`/`vh` units
- The tab button remains as the toggle at `top: 76, right: 0`

**Changes required**
- `WorkspacesExplorerView.tsx` → aside: remove slide-in positioning; apply centered fixed positioning with `AnimatePresence` + `motion.div`
- Add a `motion.div` backdrop rendered before the modal when `tableViewOpen && selectedGraphType`
- Remove `tableViewWidth`, `tableResizing`, `startTableResize`, `tableResizeRef` (no longer needed)
- Tab: remove `onMouseDown` resize handler; keep click toggle only; caret stays left/right

---

## Files that change (either approach)

- `src/app/components/WorkspacesExplorerView.tsx` — the aside, the tab button, and related state/resize logic

## Verification

1. Click the tab: modal/sheet opens over the graph
2. Click the backdrop or close button: dismisses correctly
3. Graph nodes remain interactive through backdrop (Idea B) or above sheet (Idea A)
4. Tab caret reflects open/closed state
5. `TopologyTableView` renders correctly inside the new container
