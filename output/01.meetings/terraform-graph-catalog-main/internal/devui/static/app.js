// Copyright IBM Corp. 2026
//
// Dev UI for the Terraform Graph Catalog. Vanilla JS, no build step. Renders the
// catalog as three graph views through the D3/SVG GraphRenderer (graph.js) and
// proxies a tool-using LLM chat through the service. Everything is gated behind
// GRAPH_CATALOG_DEV_UI on the server side.

"use strict";

const state = {
  grantId: null,
  expiresAt: null,
  graph: { nodes: [], edges: [] },
  view: "workspaces", // data scope: workspaces | resources | providers
  layout: "force", // graph layout: force | stacked | radial
  display: "graph", // presentation: graph | table
  depth: "direct", // resource dependents to light: direct | transitive
  selectedWorkspace: null,
  selectedResourceId: null, // address of the tapped resource node (for re-highlight)
  highlightActive: false, // a click-selection highlight is showing (suppresses hover focus)
  blastMode: false, // true while the "View blast radius" mode is active
  providerRows: [], // last-fetched flat provider rows, used by the inspector and highlighting
  chat: [], // [{ role, content }]
  busy: false,
};

let renderer = null;

// Maximum number of nodes rendered in any graph view. Matches InfraGraph's
// MAX_QUERY_RESOURCES cap: above this the SVG becomes too dense to be useful
// and the force simulation becomes slow. When the cap is hit the graph is
// truncated and a banner is shown, mirroring InfraGraph's behaviour.
const MAX_NODES = 1000;

// --- tiny DOM helpers ---

const $ = (sel) => document.querySelector(sel);
const el = (tag, attrs = {}, children = []) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c == null) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
};

// --- API ---

async function api(method, url, body) {
  const opts = { method, headers: {} };
  if (body !== undefined) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(url, opts);
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (_) {
    data = { raw: text };
  }
  if (!res.ok) {
    const err = new Error(data && data.error ? data.error : "HTTP " + res.status);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

// fetchAllCollection follows next_cursor across a grant-scoped collection
// endpoint and returns the concatenated rows plus the reported total count.
async function fetchAllCollection(path) {
  let cursor = null;
  let rows = [];
  let count = 0;
  do {
    const u = new URL(path, location.origin);
    u.searchParams.set("page_size", "1000");
    if (cursor) u.searchParams.set("cursor", cursor);
    const data = await api("GET", u.pathname + u.search);
    rows = rows.concat(data.data || []);
    count = data.count;
    cursor = data.next_cursor;
  } while (cursor);
  return { rows, count };
}

const grantPath = (suffix) => "/api/v1/grants/" + encodeURIComponent(state.grantId) + suffix;

// --- bootstrap ---

async function boot() {
  initRenderer();
  bindUI();
  await refresh();
}

async function refresh() {
  setGrantStatus("requesting grant…");
  try {
    const grant = await api("POST", "/dev/grants/all");
    state.grantId = grant.grant_id;
    state.expiresAt = grant.expires_at;
    setGrantStatus("grant " + grant.grant_id.slice(0, 8) + "…");
  } catch (e) {
    setGrantStatus("grant failed");
    showBanner("Could not create dev grant: " + e.message);
    return;
  }
  try {
    state.graph = await api("GET", "/dev/graph");
  } catch (e) {
    showBanner("Could not load catalog graph: " + e.message);
    state.graph = { nodes: [], edges: [] };
  }
  if (!state.selectedWorkspace && state.graph.nodes.length) {
    state.selectedWorkspace = state.graph.nodes[0].workspace_id;
  }
  renderView();
}

function setGrantStatus(text) {
  $("#grant-status").textContent = "grant: " + text;
}

function showBanner(text) {
  let b = $("#banner");
  if (!b) {
    b = el("div", { class: "banner", id: "banner" });
    $(".graph-pane").prepend(b);
  }
  b.textContent = text;
}

function clearBanner() {
  const b = $("#banner");
  if (b) b.remove();
}

// --- graph renderer ---

// initRenderer constructs the D3/SVG GraphRenderer once and wires its node-click
// and background-click callbacks back into the app (inspector + highlighting).
// All the heavy lifting — layouts, zoom/pan/drag, hover focus-by-dimming, glow,
// staggered entrance, decoration — lives in graph.js.
function initRenderer() {
  renderer = new GraphRenderer({
    container: $("#cy"),
    onNodeClick: (d) => onNodeTap(d),
    onBackgroundClick: () => {
      state.blastMode = false;
      setInspector(null);
      clearHighlight();
      resetWorkspaceLabels();
      renderLegend();
      state.selectedResourceId = null;
    },
  });
}

// setGraph swaps the canvas to the given {nodes, edges} and lays them out with
// the currently-selected layout. Highlight classes set afterwards survive a
// layout switch because setLayout() only repositions existing elements.
function setGraph(graph) {
  showCanvas();
  state.selectedResourceId = null;
  state.highlightActive = false;
  renderer.setData(graph.nodes, graph.edges);
  // setData lays out with the renderer's current layout; correct it if the user
  // has a non-force layout selected (no-op when already matching).
  renderer.setLayout(state.layout);
}

// showCanvas / showDataTable toggle between the graph canvas and the data table
// overlay. The legend rides with the canvas.
function showCanvas() {
  $("#cy").style.display = "block";
  $("#data-table").hidden = true;
  $("#legend").hidden = state.display !== "graph";
}

function showDataTable() {
  $("#cy").style.display = "none";
  $("#legend").hidden = true;
  $("#data-table").hidden = false;
}

// --- view routing ---

function bindUI() {
  $("#view-tabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-view]");
    if (!btn) return;
    state.view = btn.dataset.view;
    for (const b of $("#view-tabs").children) b.classList.toggle("active", b === btn);
    renderView();
  });
  $("#display-tabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-display]");
    if (!btn || btn.dataset.display === state.display) return;
    state.display = btn.dataset.display;
    syncToggleUI();
    renderView();
  });
  $("#layout-tabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-layout]");
    if (!btn || btn.dataset.layout === state.layout) return;
    state.layout = btn.dataset.layout;
    syncToggleUI();
    // Re-layout in place — no refetch, so any highlights are preserved.
    if (state.display === "graph") renderer.setLayout(state.layout);
  });
  $("#refresh-btn").addEventListener("click", refresh);
  $("#chat-form").addEventListener("submit", onChatSubmit);
  $("#chat-text").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onChatSubmit(e);
    }
  });
  syncToggleUI();
}

// syncToggleUI reflects state into the segmented controls and hides the layout
// switch when there is no graph to lay out (table display).
function syncToggleUI() {
  for (const b of $("#display-tabs").children) b.classList.toggle("active", b.dataset.display === state.display);
  for (const b of $("#layout-tabs").children) b.classList.toggle("active", b.dataset.layout === state.layout);
  $("#layout-tabs").style.display = state.display === "graph" ? "" : "none";
}

function renderView() {
  clearBanner();
  setInspector(null);
  renderLegend();
  if (state.view === "workspaces") renderWorkspaces();
  else if (state.view === "resources") renderResources();
  else if (state.view === "providers") renderProviders();
}

// State-highlight colours, kept in sync with graph.js STATE_COLORS so the legend
// swatches match what the renderer paints.
const STATE = { source: "#f0b429", affected: "#e3556e", dependent: "#38c172", indirect: "#4dabf7" };

// renderLegend draws a small key for the node colours relevant to the current
// scope. For the Resources scope it is data-driven: the swatches are the
// resource categories actually present in the graph (passed in via
// extra.categories) plus the selection/dependent state colours. Hidden whenever
// the data table is showing.
function renderLegend(extra) {
  const box = $("#legend");
  const C = (window.CatalogGraph && window.CatalogGraph.CATEGORY_COLORS) || {};
  box.innerHTML = "";

  if (extra && extra.blastMode) {
    // Blast mode: workspace base + source focal point + hop-distance gradient bar.
    for (const [color, label] of [[C.Workspace, "workspace"], [STATE.source, "source"]]) {
      const swatch = el("span", { class: "legend-swatch dot" });
      swatch.style.background = color;
      box.appendChild(el("span", { class: "legend-item" }, [swatch, el("span", { text: label })]));
    }
    const gradSwatch = el("span", { class: "legend-swatch legend-swatch-gradient" });
    gradSwatch.style.background = "linear-gradient(to right, #fbbf24, #78350f)";
    box.appendChild(el("span", { class: "legend-item" }, [
      gradSwatch,
      el("span", { text: `hop 1 → ${extra.maxHop || "N"}` }),
    ]));
    return;
  }

  const items = [];
  if (state.view === "resources") {
    for (const cat of (extra && extra.categories) || []) items.push([C[cat] || C.Other, cat]);
    items.push([STATE.source, "selected"], [STATE.dependent, "direct dependent"]);
    if (state.depth === "transitive") items.push([STATE.indirect, "indirect dependent"]);
  } else if (state.view === "providers") {
    items.push([C.Provider, "provider"], [C.Workspace, "workspace"]);
  } else {
    // Workspaces view: output-consumer language instead of "blast radius".
    items.push([C.Workspace, "workspace"], [STATE.source, "selected"], [STATE.dependent, "output consumer"]);
  }
  for (const [color, label] of items) {
    const swatch = el("span", { class: "legend-swatch dot" });
    swatch.style.background = color;
    box.appendChild(el("span", { class: "legend-item" }, [swatch, el("span", { text: label })]));
  }
}

function setControls(nodes) {
  const c = $("#controls");
  c.innerHTML = "";
  for (const n of [].concat(nodes)) if (n) c.appendChild(typeof n === "string" ? el("span", { class: "hint", text: n }) : n);
}

function workspaceSelect(onChange) {
  const sel = el("select");
  for (const n of state.graph.nodes) {
    const o = el("option", { value: n.workspace_id, text: `${n.workspace_id} (${n.resource_count})` });
    if (n.workspace_id === state.selectedWorkspace) o.selected = true;
    sel.appendChild(o);
  }
  sel.addEventListener("change", () => {
    state.selectedWorkspace = sel.value;
    onChange(sel.value);
  });
  return sel;
}

// depthControl is the Direct/Transitive segmented toggle for the Resources
// graph. It governs how far highlightResourceDeps() walks downstream from the
// tapped node and re-applies the highlight live to any current selection.
function depthControl() {
  const seg = el("div", { class: "seg" }, [
    el("button", { class: state.depth === "direct" ? "active" : "", "data-depth": "direct", text: "Direct", title: "Resources that depend directly on the selection" }),
    el("button", { class: state.depth === "transitive" ? "active" : "", "data-depth": "transitive", text: "Transitive", title: "Also light indirect dependents reached through a chain" }),
  ]);
  seg.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-depth]");
    if (!btn || btn.dataset.depth === state.depth) return;
    state.depth = btn.dataset.depth;
    for (const b of seg.children) b.classList.toggle("active", b === btn);
    rehighlightSelectedResource();
  });
  return seg;
}

// --- View: workspaces ---

function renderWorkspaces() {
  setControls([
    `${state.graph.nodes.length} workspaces · ${state.graph.edges.length} edges`,
    state.display === "graph"
      ? "click a workspace to trace its blast radius"
      : "click a row to inspect a workspace's blast radius",
  ]);
  if (state.display === "table") {
    renderDataTable({
      caption: `${state.graph.nodes.length} workspace(s)`,
      columns: [
        { key: "workspace_id", label: "workspace" },
        { key: "org_id", label: "org" },
        { key: "project_id", label: "project" },
        { key: "resource_count", label: "resources" },
        { key: "providers_str", label: "providers" },
      ],
      rows: state.graph.nodes.map((n) => ({ ...n, providers_str: (n.providers || []).join(", ") })),
      onRowClick: (n) =>
        inspectWorkspaceBlast({ ws: n.workspace_id, org: n.org_id, project: n.project_id, count: n.resource_count, providers: n.providers }),
    });
    return;
  }
  const { nodes: wsNodes, edges: wsEdges } = workspaceGraphElements();
  if (wsNodes.length > MAX_NODES) {
    const kept = new Set(wsNodes.slice(0, MAX_NODES).map((n) => n.id));
    showBanner(
      `Results limited: showing first ${MAX_NODES} of ${state.graph.nodes.length} workspaces. ` +
      `Narrow your grant to see more specific results.`
    );
    setGraph({
      nodes: wsNodes.slice(0, MAX_NODES),
      edges: wsEdges.filter((e) => kept.has(e.source) && kept.has(e.target)),
    });
  } else {
    setGraph({ nodes: wsNodes, edges: wsEdges });
  }
}

// workspaceGraphElements builds the cross-workspace remote-state graph for the
// Workspaces scope. Clicking a node traces that workspace's blast radius over
// these same elements (see highlightWorkspaceBlast).
function workspaceGraphElements() {
  const nodes = state.graph.nodes.map((n) => ({
    id: "ws:" + n.workspace_id,
    kind: "workspace",
    category: "Workspace",
    group: n.org_id || "—",
    colorSubKey: n.org_id || "—",
    displayText: n.workspace_id,
    subText: `${n.resource_count} res`,
    ws: n.workspace_id,
    org: n.org_id,
    project: n.project_id,
    count: n.resource_count,
    providers: n.providers || [],
  }));
  const edges = state.graph.edges.map((e) => ({
    id: `wse:${e.producer_workspace_id}>${e.consumer_workspace_id}`,
    source: "ws:" + e.producer_workspace_id,
    target: "ws:" + e.consumer_workspace_id,
  }));
  return { nodes, edges };
}

// --- View: resources ---

async function renderResources() {
  setControls([
    el("label", { text: "Workspace:" }),
    workspaceSelect(() => renderResources()),
    state.display === "graph" ? depthControl() : null,
    state.display === "graph" ? "click a resource to highlight what depends on it" : "click a row to inspect",
  ]);
  if (!state.selectedWorkspace) {
    if (state.display === "graph") setGraph([]);
    else renderDataTable({ caption: "no workspace selected", columns: resourceColumns(), rows: [] });
    return;
  }
  let payload;
  try {
    payload = await api("GET", "/dev/graph/workspace/" + encodeURIComponent(state.selectedWorkspace));
  } catch (e) {
    showBanner("Could not load workspace resources: " + e.message);
    return;
  }
  const resources = payload.resources || [];

  if (state.display === "table") {
    renderDataTable({
      caption: `${resources.length} resource(s) in ${state.selectedWorkspace}`,
      columns: resourceColumns(),
      rows: resources.map((r) => ({ ...r, dep_count: (r.dependencies || []).length })),
      onRowClick: (r) => inspectResource(r),
    });
    return;
  }

  const idSet = new Set(resources.map((r) => r.address));
  const byBare = {};
  for (const r of resources) {
    const bare = stripKey(r.address);
    (byBare[bare] = byBare[bare] || []).push(r.address);
  }

  // Apply the same MAX_NODES cap InfraGraph uses. Truncate the resource list
  // before building nodes/edges so edge endpoints are always present.
  const graphResources = resources.length > MAX_NODES ? resources.slice(0, MAX_NODES) : resources;
  const graphIdSet = resources.length > MAX_NODES ? new Set(graphResources.map((r) => r.address)) : idSet;

  const cats = new Set();
  const nodes = graphResources.map((r) => {
    const category = window.CatalogGraph.categorizeResource(r.resource_type, r.mode);
    cats.add(category);
    return {
      id: r.address,
      kind: "resource",
      mode: r.mode,
      category,
      // group keys the stacked/radial layouts; colorSubKey gives intra-category
      // brightness variation so distinct resource types stay distinguishable.
      group: r.resource_type || r.mode || "—",
      colorSubKey: r.resource_type || category,
      displayText: resourceLabel(r),
      subText: r.resource_type || r.mode || "",
      ws: r.workspace_id,
      resource: r,
    };
  });

  const edges = [];
  const seen = new Set();
  for (const r of graphResources) {
    for (const dep of r.dependencies || []) {
      let targets = [];
      if (graphIdSet.has(dep)) targets = [dep];
      else if (byBare[dep]) targets = byBare[dep].filter((t) => graphIdSet.has(t));
      else if (byBare[stripKey(dep)]) targets = byBare[stripKey(dep)].filter((t) => graphIdSet.has(t));
      for (const t of targets) {
        const id = `dep:${t}>${r.address}`;
        if (seen.has(id)) continue;
        seen.add(id);
        edges.push({ id, source: t, target: r.address });
      }
    }
  }

  // Legend reflects the categories actually present in this workspace.
  renderLegend({ categories: [...cats].sort() });
  if (!nodes.length) {
    showBanner("No resources indexed for this workspace yet.");
  } else if (resources.length > MAX_NODES) {
    showBanner(
      `Results limited: showing first ${MAX_NODES} of ${resources.length} resources. ` +
      `Narrow your workspace selection to see more specific results.`
    );
  }
  setGraph({ nodes, edges });
}

function resourceColumns() {
  return [
    { key: "address", label: "address" },
    { key: "resource_type", label: "type" },
    { key: "mode", label: "mode" },
    { key: "provider", label: "provider" },
    { key: "module", label: "module" },
    { key: "dep_count", label: "deps" },
  ];
}

// inspectResource fills the inspector for a resource (table mode — no canvas
// highlight) and then enriches it with the resource's dependents.
async function inspectResource(r) {
  setInspector(resourceInspector(r));
  const bare = stripKey(r.address);
  try {
    const { rows } = await fetchAllCollection(grantPath("/resources/" + encodeURIComponent(bare) + "/dependents"));
    setInspector(resourceInspector(r, { dependents: rows }));
  } catch (e) {
    /* keep the base inspector if the dependents query fails */
  }
}

// clearHighlight resets all selection styling (dimming, source/dependent/
// affected node colours, and lit edges) back to the neutral graph, and releases
// the hover-suppression flag so hover-to-focus works again.
function clearHighlight() {
  renderer.clearHighlight();
  state.highlightActive = false;
}

// highlightResourceDeps dims the whole graph, then lights the dependency
// subgraph downstream of `node` — i.e. the resources that depend on it. Direct
// dependents are green with an ochre edge; in transitive mode the indirect
// (knock-on) dependents reached through a chain are teal with a fainter edge, so
// you can tell first-order impact from second-order. Returns {direct, indirect}
// node counts. Edge direction in this graph is dependency → dependent, so a
// node's outgoers() are its direct dependents and successors() are all of its
// transitive dependents.
//
// TODO(graph-catalog): this walks the dependency graph CLIENT-SIDE using the
// graph elements already loaded for the single selected workspace. That's a
// deliberate PoC shortcut — it works only because the Resources view eagerly
// loads the entire workspace resource graph, and it can't see cross-workspace
// chains. The catalog's only dependents query (/resources/{address}/dependents)
// is single-hop (dependencies @> ARRAY[address]); there is no transitive
// dependents endpoint yet. This must be replaced with a proper server-side
// recursive query (a resource-level analogue of the blast-radius CTE, returning
// hop_distance) so transitive impact is computed authoritatively and at scale
// rather than being inferred in the browser.
function highlightResourceDeps(d) {
  renderer.clearHighlight();
  renderer.dimAll();
  renderer.markNode(d.id, "source");

  // Direct dependents: one hop along outgoing (dependency → dependent) edges.
  const direct = renderer.outNodeIds(d.id);
  for (const id of direct) renderer.markNode(id, "dependent");

  let indirect = [];
  if (state.depth === "transitive") {
    // Everything else reachable downstream, minus the direct ring.
    const directSet = new Set(direct);
    indirect = renderer.descendantNodeIds(d.id).filter((id) => id !== d.id && !directSet.has(id));
    for (const id of indirect) renderer.markNode(id, "dependent-indirect");
    // Light every edge deeper in the chain faint; the direct spokes are re-lit
    // bright below so first-order impact still dominates.
    const directEdges = new Set(renderer.outEdgeIds(d.id));
    for (const eid of renderer.descendantEdgeIds(d.id)) {
      if (!directEdges.has(eid)) renderer.markEdge(eid, "edge-hi-faint");
    }
  }
  for (const eid of renderer.outEdgeIds(d.id)) renderer.markEdge(eid, "edge-hi");

  renderer.applyHighlight();
  state.highlightActive = true;
  return { direct: direct.length, indirect: indirect.length };
}

// rehighlightSelectedResource re-runs the dependency highlight for the currently
// selected resource node. Called when the Direct/Transitive depth toggle flips
// so the canvas updates live without needing another tap.
function rehighlightSelectedResource() {
  if (state.view !== "resources" || state.display !== "graph" || !state.selectedResourceId) return;
  if (!renderer.hasNode(state.selectedResourceId)) return;
  const d = renderer.node(state.selectedResourceId);
  const counts = highlightResourceDeps(d);
  setInspector(resourceInspector(d.resource, { directGraph: counts.direct, indirectGraph: counts.indirect }));
}

async function onResourceNodeTap(d) {
  const r = d.resource;
  state.selectedResourceId = d.id;
  // Light the dependency subgraph immediately from the loaded graph (no await),
  // then enrich the inspector with the per-dependent reasons from the API.
  const counts = highlightResourceDeps(d);
  setInspector(resourceInspector(r, { directGraph: counts.direct, indirectGraph: counts.indirect }));
  if (!counts.direct && !counts.indirect) showBannerTransient("Nothing in this workspace depends on " + r.address + ".");
  const bare = stripKey(r.address);
  try {
    const { rows } = await fetchAllCollection(grantPath("/resources/" + encodeURIComponent(bare) + "/dependents"));
    setInspector(resourceInspector(r, { dependents: rows, directGraph: counts.direct, indirectGraph: counts.indirect }));
  } catch (e) {
    showBanner("Dependents query failed: " + e.message);
  }
}

// --- blast radius (a click-to-trace feature of the Workspaces scope) ---

// fetchWorkspaceBlast queries a workspace's downstream blast radius (the
// workspaces/resources reachable from it via terraform_remote_state) and
// aggregates the affected resources per workspace. Shared by the graph
// highlight and the table-row inspector. Returns
// { rows, perWs, affected, resources } where perWs maps workspace_id →
// { count, hop } (hop = nearest hop distance).
async function fetchWorkspaceBlast(ws) {
  const { rows } = await fetchAllCollection(grantPath("/workspaces/" + encodeURIComponent(ws) + "/blast-radius"));
  const perWs = {};
  for (const r of rows) {
    const w = r.workspace_id;
    if (!perWs[w]) perWs[w] = { count: 0, hop: r.hop_distance };
    perWs[w].count++;
    if (r.hop_distance != null) perWs[w].hop = Math.min(perWs[w].hop, r.hop_distance);
  }
  return { rows, perWs, affected: Object.keys(perWs).length, resources: rows.length };
}

// highlightWorkspaceSharing traces the direct output-sharing relationships for
// a workspace on the already-laid-out graph: mark the source (amber/selected)
// and its hop-1 output consumers (green/dependent) — workspaces that access
// this workspace's outputs via terraform_remote_state. No dimming; this is
// informational rather than alarming. Edges from source to consumers are lit.
// Returns the full fetchWorkspaceBlast summary (perWs covers all hops; callers
// show only hop-1 in the inspector; blast mode uses all hops).
async function highlightWorkspaceSharing(ws) {
  const summary = await fetchWorkspaceBlast(ws);
  resetWorkspaceLabels();
  renderer.clearHighlight();
  renderer.markNode("ws:" + ws, "source");
  for (const [w, info] of Object.entries(summary.perWs)) {
    if (info.hop === 1) {
      const id = "ws:" + w;
      if (renderer.hasNode(id)) renderer.markNode(id, "dependent");
    }
  }
  // Light only the direct edges out of the source node.
  for (const eid of renderer.outEdgeIds("ws:" + ws)) renderer.markEdge(eid, "edge-hi");
  renderer.applyHighlight();
  state.highlightActive = true;
  return summary;
}

// blastHopColor returns a colour on a bright-to-dim gradient keyed to hop
// distance. Hop 1 (closest) is vivid gold; higher hops fade to dark amber.
function blastHopColor(hop, maxHop) {
  const t = maxHop <= 1 ? 0 : (hop - 1) / (maxHop - 1);
  return d3.interpolateRgb("#fbbf24", "#78350f")(t);
}

// enterBlastMode activates the full blast-radius view for a workspace: dim
// all non-affected nodes, paint affected nodes on a hop-distance gradient
// (bright = close, dim = far), relabel them with their hop and resource count,
// and switch the inspector to the blast-focused detail panel.
async function enterBlastMode(ws) {
  state.blastMode = true;
  state.selectedWorkspace = ws;
  const nd = renderer && renderer.hasNode("ws:" + ws) ? renderer.node("ws:" + ws) : null;
  const meta = nd
    ? { ws: nd.ws, org: nd.org, project: nd.project, count: nd.count, providers: nd.providers }
    : { ws, org: "—", project: "—", count: "—", providers: [] };

  setInspector(blastInspector(meta, null)); // loading state

  let summary;
  try {
    summary = await fetchWorkspaceBlast(ws);
  } catch (e) {
    showBanner("Blast radius query failed: " + e.message);
    state.blastMode = false;
    return;
  }

  resetWorkspaceLabels();
  renderer.clearHighlight();
  renderer.dimAll();
  renderer.markNode("ws:" + ws, "source");
  const maxHop = summary.affected
    ? Math.max(...Object.values(summary.perWs).map((v) => v.hop))
    : 1;
  for (const [w, info] of Object.entries(summary.perWs)) {
    const id = "ws:" + w;
    if (renderer.hasNode(id)) {
      renderer.markNode(id, "affected", blastHopColor(info.hop, maxHop));
      renderer.setNodeLabel(id, w, `${info.count} res · hop ${info.hop}`);
    }
  }
  renderer.lightLitEdges("edge-hi");
  renderer.applyHighlight();
  state.highlightActive = true;

  setInspector(blastInspector(meta, summary));
  renderLegend({ blastMode: true, maxHop });
}

// exitBlastMode returns to the normal output-consumer view for the workspace
// that was being inspected, restoring the calm single-hop highlight.
async function exitBlastMode() {
  state.blastMode = false;
  const ws = state.selectedWorkspace;
  renderLegend(); // restore normal legend immediately
  if (!ws || !renderer || !renderer.hasNode("ws:" + ws)) {
    clearHighlight();
    resetWorkspaceLabels();
    setInspector(null);
    return;
  }
  const nd = renderer.node("ws:" + ws);
  const meta = { ws: nd.ws, org: nd.org, project: nd.project, count: nd.count, providers: nd.providers };
  setInspector(workspaceInspector(meta));
  let shareInfo;
  try {
    shareInfo = await highlightWorkspaceSharing(ws);
  } catch (_) { /* keep base inspector on failure */ }
  setInspector(workspaceInspector(meta, shareInfo));
}

// resetWorkspaceLabels restores every workspace node's label to its default
// (id + resource count). Blast highlighting relabels affected nodes in place,
// and because clicks don't rebuild the graph those relabels would otherwise
// persist across selections and background clicks.
function resetWorkspaceLabels() {
  if (!renderer) return;
  for (const n of state.graph.nodes) {
    const id = "ws:" + n.workspace_id;
    if (renderer.hasNode(id)) renderer.setNodeLabel(id, n.workspace_id, `${n.resource_count} res`);
  }
}

// inspectWorkspaceBlast fills the inspector for a workspace (table mode — no
// canvas highlight) and then enriches it with its output-consumer summary.
async function inspectWorkspaceBlast(meta) {
  state.selectedWorkspace = meta.ws;
  setInspector(workspaceInspector(meta));
  try {
    const shareInfo = await fetchWorkspaceBlast(meta.ws);
    setInspector(workspaceInspector(meta, shareInfo));
  } catch (_) {
    /* keep the base inspector if the query fails */
  }
}

// --- View: providers ---

async function renderProviders() {
  const sourceInput = el("input", { type: "text", placeholder: "provider_source", id: "prov-source" });
  const constraintInput = el("input", { type: "text", placeholder: "version_constraint", id: "prov-constraint" });
  const apply = el("button", { text: "Filter" });
  apply.addEventListener("click", () => loadProviders(sourceInput.value.trim(), constraintInput.value.trim()));
  setControls([el("label", { text: "Providers:" }), sourceInput, constraintInput, apply]);
  await loadProviders("", "");
}

async function loadProviders(source, constraint) {
  const u = new URL(grantPath("/providers"), location.origin);
  if (source) u.searchParams.set("provider_source", source);
  if (constraint) u.searchParams.set("version_constraint", constraint);
  let rows = [];
  let count = 0;
  try {
    const r = await fetchAllCollection(u.pathname + u.search);
    rows = r.rows;
    count = r.count;
  } catch (e) {
    showBanner("Provider query failed: " + e.message);
    return;
  }
  state.providerRows = rows;
  if (state.display === "table") {
    renderDataTable({
      caption: `${count} provider configuration(s)`,
      columns: [
        { key: "provider_source", label: "provider_source" },
        { key: "alias", label: "alias" },
        { key: "version_constraint", label: "version_constraint" },
        { key: "version_exact", label: "version_exact" },
        { key: "workspace_id", label: "workspace_id" },
      ],
      rows,
    });
    return;
  }
  const { nodes: provNodes, edges: provEdges } = providerGraphElements(rows);
  if (!provNodes.length) {
    showBanner("No provider configurations match.");
    setGraph({ nodes: [], edges: [] });
    return;
  }
  if (provNodes.length > MAX_NODES) {
    const kept = new Set(provNodes.slice(0, MAX_NODES).map((n) => n.id));
    showBanner(
      `Results limited: showing first ${MAX_NODES} of ${provNodes.length} provider graph nodes. ` +
      `Narrow your filter to see more specific results.`
    );
    setGraph({
      nodes: provNodes.slice(0, MAX_NODES),
      edges: provEdges.filter((e) => kept.has(e.source) && kept.has(e.target)),
    });
    return;
  }
  setGraph({ nodes: provNodes, edges: provEdges });
}

// providerGraphElements builds a bipartite provider_source ↔ workspace graph so
// the Providers scope has a meaningful Graph view (which provider feeds which
// workspaces).
function providerGraphElements(rows) {
  const provNodes = new Map();
  const wsNodes = new Map();
  const edges = [];
  const seen = new Set();
  for (const p of rows) {
    const pid = "prov:" + p.provider_source;
    if (!provNodes.has(pid)) {
      provNodes.set(pid, {
        id: pid,
        kind: "provider",
        category: "Provider",
        group: "provider",
        colorSubKey: p.provider_source,
        displayText: shortProvider(p.provider_source),
        subText: "provider",
        source: p.provider_source,
      });
    }
    const wid = "ws:" + p.workspace_id;
    if (!wsNodes.has(wid)) {
      const meta = state.graph.nodes.find((n) => n.workspace_id === p.workspace_id) || {};
      wsNodes.set(wid, {
        id: wid,
        kind: "workspace",
        category: "Workspace",
        group: "workspace",
        colorSubKey: meta.org_id || "—",
        displayText: p.workspace_id,
        subText: `${meta.resource_count || 0} res`,
        ws: p.workspace_id,
        org: meta.org_id,
        project: meta.project_id,
        count: meta.resource_count || 0,
        providers: meta.providers || [],
      });
    }
    const eid = pid + ">" + wid;
    if (!seen.has(eid)) {
      seen.add(eid);
      edges.push({ id: eid, source: pid, target: wid, kind: "uses" });
    }
  }
  return { nodes: [...provNodes.values(), ...wsNodes.values()], edges };
}

// --- data table overlay (generic) ---

// renderDataTable presents any scope's rows as a sortable-looking table. spec:
//   { columns: [{key,label}], rows: [obj], caption?, onRowClick?(row) }
function renderDataTable(spec) {
  showDataTable();
  const wrap = $("#data-table");
  wrap.innerHTML = "";
  wrap.appendChild(el("div", { class: "hint", text: spec.caption || `${spec.rows.length} row(s)` }));
  const head = el("tr", {}, spec.columns.map((c) => el("th", { text: c.label })));
  const body = spec.rows.map((row) => {
    const tr = el(
      "tr",
      {},
      spec.columns.map((c) => {
        const v = row[c.key];
        return el("td", { text: v === null || v === undefined || v === "" ? "—" : String(v) });
      }),
    );
    if (spec.onRowClick) {
      tr.classList.add("clickable");
      tr.addEventListener("click", () => spec.onRowClick(row));
    }
    return tr;
  });
  wrap.appendChild(el("table", {}, [el("thead", {}, head), el("tbody", {}, body)]));
  if (!spec.rows.length) wrap.appendChild(el("div", { class: "inspector-empty", text: "No rows." }));
}

// --- node tap dispatch ---

function onNodeTap(d) {
  if (d.kind === "workspace") onWorkspaceNodeTap(d);
  else if (d.kind === "resource") onResourceNodeTap(d);
  else if (d.kind === "provider") onProviderNodeTap(d);
}

async function onWorkspaceNodeTap(d) {
  // In blast-radius mode every workspace click re-runs the blast analysis for
  // the clicked node rather than switching to the normal sharing view.
  if (state.blastMode) {
    await enterBlastMode(d.ws);
    return;
  }

  state.selectedWorkspace = d.ws;
  const meta = { ws: d.ws, org: d.org, project: d.project, count: d.count, providers: d.providers };
  // Show metadata immediately, then trace + enrich once the sharing query returns.
  setInspector(workspaceInspector(meta));
  if (state.display !== "graph") return;
  if (state.view === "workspaces") {
    let shareInfo;
    try {
      shareInfo = await highlightWorkspaceSharing(d.ws);
    } catch (e) {
      showBanner("Output sharing query failed: " + e.message);
      return;
    }
    setInspector(workspaceInspector(meta, shareInfo));
  } else if (state.view === "providers") {
    // Providers bipartite view: flip to the workspace's perspective — dim
    // everything, mark this workspace as the focal point, and light its
    // connected provider nodes and edges.
    highlightWorkspaceProviders(d);
  }
}

// highlightWorkspaceProviders marks a workspace as the focal point in the
// Providers bipartite graph. Mirrors onProviderNodeTap but from the workspace
// side: the workspace is source (amber), its providers are lit (green), and
// everything else is dimmed.
function highlightWorkspaceProviders(d) {
  renderer.clearHighlight();
  renderer.dimAll();
  renderer.markNode(d.id, "source");
  for (const id of renderer.inNodeIds(d.id)) renderer.markNode(id, "dependent");
  for (const eid of renderer.connectedEdgeIds(d.id)) renderer.markEdge(eid, "edge-hi");
  renderer.applyHighlight();
  state.highlightActive = true;
}

function onProviderNodeTap(d) {
  const src = d.source;
  renderer.clearHighlight();
  renderer.dimAll();
  renderer.markNode(d.id, "source");
  for (const id of renderer.outNodeIds(d.id)) renderer.markNode(id, "dependent");
  for (const eid of renderer.outEdgeIds(d.id)) renderer.markEdge(eid, "edge-hi");
  renderer.applyHighlight();
  // Reset sublabel to "provider" — it may have been set to a version string by
  // a prior highlightProviderVersion call.
  renderer.setNodeLabel(d.id, null, "provider");
  state.highlightActive = true;
  setInspector(providerInspector(d));
}

// providerInspector renders a version-breakdown panel for a provider node.
// Rows are grouped by version_exact; each group is a clickable bar that
// re-highlights the workspaces on that specific version.
function providerInspector(d) {
  const src = d.source;
  const rows = state.providerRows.filter((r) => r.provider_source === src);

  // Group workspace IDs by version_exact (null = no lock file entry).
  const groups = new Map();
  for (const r of rows) {
    const ver = r.version_exact || null;
    if (!groups.has(ver)) groups.set(ver, new Set());
    groups.get(ver).add(r.workspace_id);
  }

  // Sort: real versions descending (semver-ish numeric), null last.
  const sorted = [...groups.entries()].sort((a, b) => {
    if (a[0] === null) return 1;
    if (b[0] === null) return -1;
    return b[0].localeCompare(a[0], undefined, { numeric: true, sensitivity: "base" });
  });

  const total = [...groups.values()].reduce((s, set) => s + set.size, 0);

  const versionRows = sorted.map(([ver, wsSet]) => {
    const pct = total > 0 ? Math.round((wsSet.size / total) * 100) : 0;
    const label = ver || "(no lock)";

    const header = el("div", { class: "version-row-header" }, [
      el("span", { class: "version-label", text: label }),
      el("span", { class: "version-count", text: String(wsSet.size) }),
    ]);
    const barWrap = el("div", { class: "version-bar-wrap" });
    const fill = el("div", { class: "version-bar-fill" });
    fill.style.width = pct + "%";
    barWrap.appendChild(fill);

    const row = el("div", { class: "version-row", title: "Click to highlight these workspaces" });
    row.appendChild(header);
    row.appendChild(barWrap);
    row.addEventListener("click", () => highlightProviderVersion(src, ver));
    return row;
  });

  const subtitle = total > 0
    ? `${sorted.length} version(s) across ${total} workspace(s)`
    : "no workspaces";

  return el("div", {}, [
    el("h3", { text: shortProvider(src) }),
    el("div", { class: "inspector-section-head", text: subtitle }),
    el("div", { class: "version-list" }, versionRows),
  ]);
}

// highlightProviderVersion dims everything, then lights the provider node and
// the subset of workspace nodes using a specific version of that provider.
// versionExact is the exact version string, or null to highlight workspaces
// with no lock-file entry for this provider.
function highlightProviderVersion(source, versionExact) {
  const provNodeId = "prov:" + source;
  const matchingWsNodeIds = state.providerRows
    .filter((r) => r.provider_source === source &&
      (versionExact === null ? !r.version_exact : r.version_exact === versionExact))
    .map((r) => "ws:" + r.workspace_id);

  renderer.clearHighlight();
  renderer.dimAll();
  renderer.markNode(provNodeId, "source");
  for (const wsNodeId of matchingWsNodeIds) {
    renderer.markNode(wsNodeId, "dependent");
    renderer.markEdge(provNodeId + ">" + wsNodeId, "edge-hi");
  }
  renderer.applyHighlight();

  // Update the provider node's sublabel so it reads the version, not "provider".
  const verLabel = versionExact || "(no lock)";
  renderer.setNodeLabel(provNodeId, null, verLabel);

  // Mark the active version row in the inspector (remove from others first).
  for (const row of document.querySelectorAll(".version-row")) {
    const lbl = row.querySelector(".version-label");
    row.classList.toggle("active", lbl && lbl.textContent === verLabel);
  }

  state.highlightActive = true;
}

// workspaceInspector renders workspace metadata. When shareInfo is supplied
// (from highlightWorkspaceSharing / fetchWorkspaceBlast) it adds an
// "output consumers" section listing workspaces that access this one's outputs.
// The "View blast radius" button is shown in graph mode only (it drives a
// graph-specific visualisation).
function workspaceInspector(d, shareInfo) {
  const drillBtn = el("button", { text: "View resources →" });
  drillBtn.addEventListener("click", () => {
    state.selectedWorkspace = d.ws;
    selectView("resources");
  });

  const buttons = [drillBtn];
  if (state.view === "workspaces" && state.display === "graph") {
    const blastBtn = el("button", { class: "btn-blast", text: "View blast radius →" });
    blastBtn.addEventListener("click", () => enterBlastMode(d.ws));
    buttons.push(blastBtn);
  }

  const providers = d.providers || [];
  return el("div", {}, [
    el("h3", { text: d.ws }),
    el("dl", {}, [
      el("dt", { text: "org" }),
      el("dd", { text: d.org || "—" }),
      el("dt", { text: "project" }),
      el("dd", { text: d.project || "—" }),
      el("dt", { text: "resources" }),
      el("dd", { text: String(d.count == null ? "—" : d.count) }),
    ]),
    shareInfo ? outputConsumersSummary(shareInfo) : null,
    providers.length ? el("div", { html: "<strong>providers</strong>" }) : null,
    providers.length ? el("ul", {}, providers.map((p) => el("li", { text: p }))) : null,
    el("div", { class: "inspector-btns" }, buttons),
  ]);
}

// outputConsumersSummary renders the "output consumers" section in the normal
// (non-blast) workspace inspector. Shows only hop-1 workspaces — those that
// directly access this workspace's outputs via terraform_remote_state.
function outputConsumersSummary(shareInfo) {
  const hop1 = Object.entries(shareInfo.perWs)
    .filter(([, v]) => v.hop === 1)
    .map(([w]) => w);
  return el("div", { class: "sharing-summary" }, [
    el("div", { class: "sharing-summary-head", text: "output consumers" }),
    hop1.length
      ? el("ul", {}, hop1.map((w) => el("li", { text: w })))
      : el("div", { text: "no workspaces access this workspace's outputs" }),
  ]);
}

// blastInspector renders the blast-radius detail panel shown when the user
// explicitly enters blast mode. Groups affected workspaces by hop distance and
// colours each hop header to match the gradient painted on the graph.
function blastInspector(meta, blast) {
  const exitBtn = el("button", { class: "btn-exit-blast", text: "← exit blast view" });
  exitBtn.addEventListener("click", () => exitBlastMode());

  if (!blast) {
    return el("div", { class: "blast-inspector" }, [
      exitBtn,
      el("h3", { text: meta.ws }),
      el("div", { class: "hint", text: "loading blast radius…" }),
    ]);
  }

  // Group affected workspaces by hop distance.
  const byHop = {};
  for (const [w, info] of Object.entries(blast.perWs)) {
    (byHop[info.hop] = byHop[info.hop] || []).push({ ws: w, count: info.count });
  }
  const hops = Object.keys(byHop).map(Number).sort((a, b) => a - b);
  const maxHop = hops[hops.length - 1] || 1;

  const hopSections = hops.map((h) => {
    const head = el("div", { class: "blast-hop-head", text: `hop ${h} — ${byHop[h].length} workspace(s)` });
    head.style.color = blastHopColor(h, maxHop);
    return el("div", { class: "blast-hop" }, [
      head,
      el("ul", {}, byHop[h].map(({ ws, count }) => el("li", { text: `${ws} · ${count} resource(s)` }))),
    ]);
  });

  return el("div", { class: "blast-inspector" }, [
    exitBtn,
    el("h3", { text: meta.ws }),
    el("div", {
      class: "blast-total",
      text: blast.affected
        ? `${blast.affected} downstream workspace(s) · ${blast.resources} affected resource(s)`
        : "no downstream workspaces",
    }),
    ...hopSections,
  ]);
}

// selectView switches the active data scope and re-renders.
function selectView(view) {
  state.view = view;
  for (const b of $("#view-tabs").children) b.classList.toggle("active", b.dataset.view === view);
  renderView();
}

// --- inspector ---

function setInspector(content) {
  const box = $("#inspector");
  box.innerHTML = "";
  if (!content) {
    // Hide entirely when empty so it doesn't cover the table/graph behind it.
    box.hidden = true;
    return;
  }
  box.hidden = false;
  box.appendChild(content);
}

function resourceInspector(r, extra = {}) {
  const children = [
    el("h3", { text: r.address }),
    el("dl", {}, [
      el("dt", { text: "type" }),
      el("dd", { text: r.resource_type }),
      el("dt", { text: "mode" }),
      el("dd", { text: r.mode }),
      el("dt", { text: "provider" }),
      el("dd", { text: r.provider }),
      el("dt", { text: "module" }),
      el("dd", { text: r.module }),
    ]),
  ];
  if (r.dependencies && r.dependencies.length) {
    children.push(el("div", { html: "<strong>depends on</strong>" }));
    children.push(el("ul", {}, r.dependencies.map((d) => el("li", { text: d }))));
  }
  // Graph-derived impact for the loaded workspace (see highlightResourceDeps).
  if (extra.directGraph != null) {
    const parts = [`${extra.directGraph} direct`];
    if (state.depth === "transitive") parts.push(`${extra.indirectGraph} indirect`);
    children.push(el("div", { class: "hint", text: `dependents in this workspace: ${parts.join(", ")}` }));
  }
  if (extra.dependents) {
    // The /dependents API is grant-wide and single-hop, so this list can span
    // workspaces and differ from the in-workspace graph counts above.
    children.push(el("div", { html: `<strong>direct dependents · all workspaces (${extra.dependents.length})</strong>` }));
    children.push(
      el(
        "ul",
        {},
        extra.dependents.map((d) => el("li", { text: `${d.address} — ${d.dependency_reason}` })),
      ),
    );
  }
  if (r.attributes) {
    children.push(el("div", { html: "<strong>attributes</strong>" }));
    children.push(el("pre", { text: JSON.stringify(r.attributes, null, 2) }));
  }
  return el("div", {}, children);
}

// --- chat ---

async function onChatSubmit(e) {
  e.preventDefault();
  if (state.busy) return;
  const ta = $("#chat-text");
  const text = ta.value.trim();
  if (!text) return;
  if (!state.grantId) {
    appendChat("error", "No dev grant yet — try Refresh.");
    return;
  }
  ta.value = "";
  state.chat.push({ role: "user", content: text });
  appendChat("user", text);

  state.busy = true;
  $("#chat-send").disabled = true;
  const pending = appendPending();

  try {
    const resp = await api("POST", "/dev/chat", { grant_id: state.grantId, messages: state.chat });
    pending.remove();
    if (resp.tool_calls && resp.tool_calls.length) appendToolCalls(resp.tool_calls);
    const reply = resp.reply || "(no reply)";
    state.chat.push({ role: "assistant", content: reply });
    appendChat("assistant", reply);
    // Dispatch UI actions after the reply is rendered so the user sees the
    // text answer before the graph changes.
    if (resp.actions && resp.actions.length) {
      for (const action of resp.actions) {
        await dispatchChatAction(action);
      }
    }
  } catch (err) {
    pending.remove();
    // Drop the user turn we couldn't answer so retry doesn't double it.
    state.chat.pop();
    appendChat("error", "Chat failed: " + err.message);
  } finally {
    state.busy = false;
    $("#chat-send").disabled = false;
    ta.focus();
  }
}

function appendChat(role, text) {
  const log = $("#chat-log");
  // Assistant replies may contain Markdown; render a safe subset to HTML.
  // User/error/system messages stay as plain text.
  const node =
    role === "assistant"
      ? el("div", { class: "msg assistant md", html: renderMarkdown(text) })
      : el("div", { class: "msg " + role, text });
  log.appendChild(node);
  log.scrollTop = log.scrollHeight;
}

function appendPending() {
  const log = $("#chat-log");
  const node = el("div", { class: "msg assistant" }, [el("span", { class: "spinner" }), " thinking…"]);
  log.appendChild(node);
  log.scrollTop = log.scrollHeight;
  return node;
}

function appendToolCalls(calls) {
  const log = $("#chat-log");
  const box = el("div", { class: "tools" });
  for (const c of calls) {
    const args = typeof c.arguments === "string" ? c.arguments : JSON.stringify(c.arguments);
    let line, cls;
    if (c.ui_action) {
      line = `▶ ${c.name}(${args})`;
      cls = "tool ui-action";
    } else if (c.error) {
      line = `⚙ ${c.name}(${args}) → error: ${c.error}`;
      cls = "tool err";
    } else {
      line = `⚙ ${c.name}(${args}) → ${c.count} result(s)`;
      cls = "tool";
    }
    box.appendChild(el("div", { class: cls, text: line }));
  }
  log.appendChild(box);
  log.scrollTop = log.scrollHeight;
}

// dispatchChatAction executes a single UI action requested by the chat model,
// updating the graph display to match what the model is describing.
async function dispatchChatAction(action) {
  const args = action.args || {};

  // Helper: switch to a named view and re-render it.
  function switchToView(view) {
    if (state.view === view) return;
    state.view = view;
    for (const b of $("#view-tabs").children) b.classList.toggle("active", b.dataset.view === view);
    renderView();
  }

  switch (action.type) {
    case "navigate_view": {
      const view = args.view;
      if (!["workspaces", "resources", "providers"].includes(view)) return;
      if (view === "resources" && typeof args.workspace_id === "string" && args.workspace_id) {
        const changed = state.selectedWorkspace !== args.workspace_id;
        state.selectedWorkspace = args.workspace_id;
        if (state.view === view) {
          // Already on this view: switchToView() would no-op, so re-render
          // directly to pick up the newly selected workspace.
          if (changed) renderView();
        } else {
          switchToView(view);
        }
      } else {
        switchToView(view);
      }
      break;
    }

    case "focus_workspace": {
      const wsId = args.workspace_id;
      if (!wsId) return;
      switchToView("workspaces");
      if (!state.graph.nodes.find((n) => n.workspace_id === wsId)) return;
      await highlightWorkspaceSharing(wsId);
      break;
    }

    case "show_blast_radius": {
      const wsId = args.workspace_id;
      if (!wsId) return;
      switchToView("workspaces");
      if (!state.graph.nodes.find((n) => n.workspace_id === wsId)) return;
      await enterBlastMode(wsId);
      break;
    }

    case "show_provider_version": {
      const src = args.provider_source;
      // version_exact may be omitted (highlight workspaces with no lock entry).
      const ver = typeof args.version_exact === "string" ? args.version_exact : null;
      if (!src) return;
      // Switch to providers view manually to avoid a race between renderProviders'
      // automatic loadProviders("","") and our source-filtered load below.
      state.view = "providers";
      for (const b of $("#view-tabs").children) b.classList.toggle("active", b.dataset.view === "providers");
      clearBanner();
      setInspector(null);
      renderLegend();
      await loadProviders(src, "");
      highlightProviderVersion(src, ver);
      break;
    }
  }
}

// --- markdown ---

function renderMarkdown(src) {
  return marked.parse(String(src || ""));
}

// --- misc ---

function stripKey(address) {
  return address.replace(/\[.*\]$/, "");
}

// resourceLabel builds a short, human-scannable node label from a resource
// result, in place of its full Terraform address (e.g.
// "module.vpc.module.subnets.aws_route_table.private[1]"). The resource_type
// is already shown as the node's subText, so it's dropped here to avoid
// repeating it; only the leaf module name (if nested), resource_name, and
// instance_key are kept — e.g. "subnets.private[1]".
function resourceLabel(r) {
  let name = r.resource_name || stripKey(r.address).split(".").pop() || r.address;
  if (r.instance_key) name += `[${r.instance_key}]`;
  const modParts = String(r.module || "")
    .split(".")
    .filter((p) => p && p !== "module" && p !== "root");
  const leafModule = modParts[modParts.length - 1];
  return leafModule ? `${leafModule}.${name}` : name;
}

// shortProvider trims a provider source like
// "registry.terraform.io/hashicorp/aws" to its meaningful tail
// ("hashicorp/aws") for the node label. The full source stays on the node datum
// for the inspector and highlighting.
function shortProvider(src) {
  const parts = String(src || "").split("/").filter(Boolean);
  return parts.slice(-2).join("/") || String(src || "");
}

let bannerTimer = null;
function showBannerTransient(text) {
  showBanner(text);
  clearTimeout(bannerTimer);
  bannerTimer = setTimeout(clearBanner, 4000);
}

boot();
