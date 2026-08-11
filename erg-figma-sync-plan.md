# ERG Figma Sync Plan

## Overview

Full replacement of `ERG/` with the latest source from the Figma Make project
(`NWVbgeaU6GNqwbj6gLfX8U`). Figma is the source of truth. Every file in `ERG/` that has a
counterpart in Figma is overwritten without preservation. Local-only files that have no Figma
counterpart (e.g. `node_modules/`, `package-lock.json`, PNG screenshots) are left in place but
not treated as authoritative.

**Approach:** Delete the `ERG/` directory tree (excluding `node_modules/`), then write every file
from the Figma MCP source into place. This guarantees no stale local files survive.

**Non-goals:** No code changes, no refactoring, no dependency installs, no build.

---

## Figma source file inventory

The Figma Make MCP exposes these files via `file://figma/make/source/NWVbgeaU6GNqwbj6gLfX8U/` URIs.

### Group A — Root config files (7 files)
- `package.json`
- `pnpm-workspace.yaml`
- `vite.config.ts`
- `postcss.config.mjs`
- `index.html`
- `default_shadcn_theme.css`
- `ATTRIBUTIONS.md`

### Group B — Guidelines and plans (8 files)
- `guidelines/Guidelines.md`
- `plans/background-i-m-building-abundant-gray.md`
- `plans/background-i-m-building-elegant-wilkes.md`
- `plans/background-i-m-building-glittery-snowflake.md`
- `plans/background-i-m-building-indexed-elephant.md`
- `plans/background-i-m-building-synchronous-lagoon.md`
- `plans/background-i-m-building-tingly-dolphin.md`
- `plans/previous-conversation-summary-backgroun-hashed-feigenbaum.md`

### Group C — Entry points and styles (5 files)
- `src/main.tsx`
- `src/styles/fonts.css`
- `src/styles/index.css`
- `src/styles/tailwind.css`
- `src/styles/theme.css`

### Group D — App components (11 files)
- `src/app/App.tsx`
- `src/app/components/ControlCenter.tsx`
- `src/app/components/Workbench.tsx`
- `src/app/components/WorkspacesExplorerView.tsx`
- `src/app/components/WorkspacesView.tsx`
- `src/app/components/RunDetailsView.tsx`
- `src/app/components/RunsView.tsx`
- `src/app/components/TFCSidebar.tsx`
- `src/app/components/TFCTopNav.tsx`
- `src/app/components/TFCWorkspaceView.tsx`
- `src/app/components/figma/ImageWithFallback.tsx`

### Group E — shadcn/ui components (49 files)
All files under `src/app/components/ui/`:
accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card,
carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form,
hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress,
radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner,
switch, table, tabs, textarea, toggle, toggle-group, tooltip, use-mobile.ts, utils.ts.

### Group F — Import components (42 folders, 2 files each = ~84 files)
Each folder under `src/imports/` contains one `index.tsx` and one `svg-*.ts` file.

Folders: App, Badge, BigTable, BigTable-1, Body, Button, Button-1, Collections, Container,
Container-1, DotBackgroundGraph, ExplorerViewTypes, Frame631990, GlobalControlBarPrototype,
GlobalControlBarPrototype-1, GlobalControlBarPrototype-2, Group2147222192-1, Layout, MeridianV115,
MeridianV115-2, Module, NavTfcSideNav, Phase1GlobalControlBarPrototype,
Phase1GlobalControlBarPrototype-1, Phase1GlobalControlBarPrototype-2,
Phase1GlobalControlBarPrototype-3, PolicySetsExpanded, RadioSelectDataTable,
RadioSelectDataTable-1, RadioSelectDataTable-2, RadioSelectDataTable-4, SessionHistory-1,
SessionHistory-2, WorkspaceOverview, WorkspaceOverview-1, WorkspaceOverviewResources,
WorkspaceRuns, WorkspaceRunsDetails, WorkspaceRunsDetails-1, WorkspaceRunsDetails-2,
WorkspaceRunsDetails-3, Workspaces.

### Group G — Import reference files (2 files)
- `src/imports/Terraform_Control_Center_MVP_v1.md`
- `src/imports/Terraform_Control_Center.txt`

---

## Sub-Tasks

### Task 1 — Clear ERG/ source tree

**Intent:** Remove all tracked source files and directories from `ERG/` so no stale local content
survives. Preserve `node_modules/` (large, not Figma-owned) and `package-lock.json` (generated).

**Expected Outcomes:** `ERG/` contains only `node_modules/`, `package-lock.json`, and any PNG
screenshots. All other files and directories are gone.

**Todo List:**
1. Delete all non-`node_modules` files and directories inside `ERG/` using a shell command.
   Command: `find ERG -mindepth 1 -not -path 'ERG/node_modules*' -not -name 'package-lock.json' -not -name '*.png' -delete`

**Status:** [ ] pending

---

### Task 2 — Write root config files (Group A)

**Intent:** Lay down the project's build configuration and entry HTML from Figma.

**Expected Outcomes:** `ERG/package.json`, `ERG/vite.config.ts`, `ERG/postcss.config.mjs`,
`ERG/index.html`, `ERG/pnpm-workspace.yaml`, `ERG/default_shadcn_theme.css`, `ERG/ATTRIBUTIONS.md`
all written from Figma MCP source.

**Todo List:**
1. Read each of the 7 files via Figma MCP.
2. Write each to `ERG/<filename>`.

**Relevant Context:** Figma MCP URIs prefixed `file://figma/make/source/NWVbgeaU6GNqwbj6gLfX8U/`

**Status:** [ ] pending

---

### Task 3 — Write guidelines and plans (Group B)

**Intent:** Restore the 8 internal planning/guideline markdown files from Figma.

**Expected Outcomes:** `ERG/guidelines/` and `ERG/plans/` exist and contain all 8 files.

**Todo List:**
1. Read each of the 8 markdown files from Figma MCP.
2. Write each to its path under `ERG/` (create directories as needed).

**Status:** [ ] pending

---

### Task 4 — Write entry points and styles (Group C)

**Intent:** Restore `main.tsx` and all CSS style files.

**Expected Outcomes:** `ERG/src/main.tsx` and `ERG/src/styles/*.css` (4 files) are written.

**Todo List:**
1. Read 5 files from Figma MCP.
2. Write each to `ERG/src/` or `ERG/src/styles/`.

**Status:** [ ] pending

---

### Task 5 — Write app components (Group D)

**Intent:** Restore all hand-authored app-layer components.

**Expected Outcomes:** `ERG/src/app/App.tsx` and all 10 component files exist with Figma content.

**Todo List:**
1. Read 11 files from Figma MCP.
2. Write each to `ERG/src/app/` or `ERG/src/app/components/`.

**Status:** [ ] pending

---

### Task 6 — Write shadcn/ui components (Group E)

**Intent:** Restore the full shadcn/ui component library.

**Expected Outcomes:** All ~49 files under `ERG/src/app/components/ui/` are written from Figma.

**Todo List:**
1. Read each ui file from Figma MCP.
2. Write each to `ERG/src/app/components/ui/<filename>`.

**Status:** [ ] pending

---

### Task 7 — Write import components (Group F)

**Intent:** Restore all 42 import component folders. This is the largest batch.

**Expected Outcomes:** All 42 folders under `ERG/src/imports/` exist, each with `index.tsx` and
`svg-*.ts` matching Figma. Includes 2 new folders (`DotBackgroundGraph/`, `NavTfcSideNav/`) not
previously present locally.

**Todo List:**
1. Process folders in batches of ~10.
2. For each folder: read `index.tsx` and `svg-*.ts` from Figma MCP, write to `ERG/src/imports/<Folder>/`.

**Status:** [ ] pending

---

### Task 8 — Write import reference files (Group G)

**Intent:** Restore the two text reference files in `src/imports/`.

**Expected Outcomes:** `ERG/src/imports/Terraform_Control_Center_MVP_v1.md` and
`ERG/src/imports/Terraform_Control_Center.txt` are written from Figma.

**Todo List:**
1. Read 2 files from Figma MCP.
2. Write each to `ERG/src/imports/`.

**Status:** [ ] pending

---

## Execution order

1 (clear) → 2 (root config) → 3 (guidelines/plans) → 4 (styles) → 5 (app components) →
6 (shadcn/ui) → 7 (imports — largest batch) → 8 (reference files)

Task 1 must complete before any write tasks. Tasks 2-8 can otherwise run in any order.

## Notes for implementation

- Use `write_file` for every file (creates directories automatically).
- The Figma MCP resource URIs are the canonical source — read them, do not guess content.
- After Task 7 completes, a quick `ls ERG/src/imports/` confirms the two new folders are present.
- No build or install step is included — that is out of scope.
