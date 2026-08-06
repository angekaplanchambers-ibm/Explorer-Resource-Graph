# Explorer Resource Graph — Prototype

A unified React/TypeScript prototype combining three design initiatives:

1. **Agentic TFC** (`030.Agentic_TFC`) — TF Operator interaction model: ControlCenter, Workbench, signal banners, Zap triggers
2. **Graph Catalog PoC** (`terraform-graph-catalog-main`) — graph data model, LLM tool-calling contract, blast-radius visualization, conversational query pattern
3. **Skyway Merge synthesis** — Explorer View design decisions: table-first, bottom drawer, Option B IA, D3-free graph, dependency panel

## Running

```bash
# From workspace root
just explorer-dev

# Or directly
cd explorer-resource-graph
npm install
npm run dev -- --port 5176
```

Opens at **http://localhost:5176**

## What to explore

### Explorer table (center panel)
- 15 fixture resources across 5 workspaces and 3 providers
- Click ▶ to expand attributes (JSONB; `<sensitive>` values shown as muted placeholder)
- Click a row to open the DependencyPanel (shows depends-on + depended-on-by with `dependency_reason` badges)
- Per-row Zap buttons appear based on status: `failed` → Inspect failure, `drifted` → Prepare remediation, `hasDownstreamConsumers` → Show blast radius, `providerUpgradeAvailable` → Plan upgrade
- Filter chips appear above table when LLM filters are active

### Signal banners (top of table)
Three banners pre-loaded: failed workspaces, drift, provider upgrade. Each has a Zap button that opens ControlCenter with the op pre-selected.

### Graph panel (right 40%)
- Workspace dependency graph (React Flow, D3-free)
- Three view tabs: Workspaces, Resources, Providers (Workspaces is the functional view)
- Click workspace node → filters table to that workspace's resources
- LLM-manipulable: chat queries trigger blast-mode, focus, and view navigation

### Conversational drawer (bottom)
- Collapsed strip at bottom of table area — click to expand
- Three suggestion chips for quick demos
- Scripted responses for 6 query patterns:
  - `"show blast radius of networking-prod-core"` → blast-mode visualization + text answer
  - `"find all aws_instance resources"` → filters table + text answer
  - `"go to providers view"` → navigates graph view
  - `"focus on payments-prod"` → highlights workspace in graph
  - `"4.67"` or `"version"` → show_provider_version action
  - Any other query → dependency traversal response

### ControlCenter (bottom bar)
- Always visible below the main content
- `Explorer` page context loads 4 Explorer-specific recommended ops: blast-radius candidate, provider upgrade exposure, drift cluster, resource-count anomaly
- Click an op → TriagePanel with evidence + next steps
- "Open Workbench" next steps launch the Workbench with a pre-bound query

### Workbench (full-screen)
Opens from ControlCenter. Explorer-specific sessions:
- **Blast-Radius Analysis** landing workflow → runs `SCENARIOS.blast_radius`
- **Dependency Traversal** landing workflow → runs `SCENARIOS.dependency_traversal`
- InfraGraph tab auto-opens on blast_radius scenario; shows blast-mode SVG graph
- All existing Agentic TFC scenarios (provider_upgrade_failure, drift, etc.) still work

## Architecture

```
App.tsx  (state machine: workbenchOpen, workbenchVisible, workbenchQuery, pendingQuery, explorerState)
├── ExplorerView (left nav + type selector)
│   └── ResourceResultPage (table + graph + drawer)
│       ├── SignalBannerStrip (3 banners → onControlCenterTrigger)
│       ├── ResourceTable (15 rows, expandable attrs, per-row Zap, DependencyPanel)
│       ├── GraphPanel (React Flow workspace graph, forwardRef for LLM actions)
│       └── ConversationalDrawer (mockChat → UI actions → GraphPanel.dispatchAction)
├── ControlCenter (bottom bar, OPS_BY_PAGE["explorer"])
└── Workbench (full-screen, SCENARIOS.blast_radius + dependency_traversal)
```

## Mock limitations

- Chat responses are scripted fixtures (6 patterns) — not a live LLM
- Graph shows workspace-level nodes only (resource and provider views are stubs)
- Pagination shows count but prev/next buttons are decorative
- DependencyPanel has fixture data for `aws_vpc.main` and `aws_instance.app_server[0]` only
- No persistence — all state resets on page reload

## Design tokens

Matches `030.Agentic_TFC` exactly: IBM Plex Sans/Mono, Meridian dark panel (`#131313`/`#1a1a1a`), TFC shell tokens (navy `#0c0c0e`, blue `#1060ff`).
