// Copyright IBM Corp. 2026
//
// D3-powered SVG graph renderer for the Terraform Graph Catalog dev UI. The
// visual language (category colours + icons, curved/bundled edges, blueprint
// grid, glow-on-hover, focus-by-dimming, staggered entrance animations,
// force/stacked/radial layouts) is ported from HCP's InfraGraph, adapted to a
// dark theme and the catalog's domain (workspaces / Terraform resources /
// providers).
//
// Vanilla JS, no build step. Depends only on the vendored d3 v7 (window.d3).
// app.js builds plain {nodes, edges} objects and drives this renderer through a
// small facade: setData / setLayout plus a decoration + traversal API, so the
// data/view/inspector/chat plumbing upstream stays renderer-agnostic.

"use strict";

/* ---------------------------------------------------------------------------
 * Category → colour + icon system (catalog domain)
 *
 * InfraGraph keys colour/icon off a cloud "unifiedType" taxonomy. The catalog's
 * data is Terraform: workspaces, providers, and resources whose richest signal
 * is the resource type (aws_instance, google_sql_database_instance, …). We map
 * those into the same category set InfraGraph uses, then colour/iconize by
 * category. Palette is brightened from IBM Carbon jewel tones so nodes pop on
 * the dark canvas (the original Carbon darks are tuned for light backgrounds).
 * ------------------------------------------------------------------------- */

const CATEGORY_COLORS = {
  Workspace: "#a796ff",
  Provider: "#ff9d57",
  Compute: "#ff7eb6",
  Networking: "#4589ff",
  "Storage & Data": "#08bdba",
  Identity: "#ffb784",
  Security: "#be95ff",
  Observability: "#3ddbd9",
  Management: "#82cfff",
  Geography: "#ee5396",
  "Build Management": "#bda4ff",
  "Infrastructure as Code": "#fddc69",
  "Data Source": "#78a9ff",
  Other: "#8d95a5",
};

const CATEGORY_ICONS = {
  Workspace: "layers",
  Provider: "plug",
  Compute: "server",
  Networking: "network",
  "Storage & Data": "database",
  Identity: "user",
  Security: "lock",
  Observability: "eye",
  Management: "building",
  Geography: "globe",
  "Build Management": "box",
  "Infrastructure as Code": "code",
  "Data Source": "table",
  Other: "info",
};

// Inline icon set — clean 24×24 line glyphs, drawn white inside the node disc.
// Kept deliberately small/self-contained (no external icon font / HDS dep).
const ICONS = {
  server:
    '<rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><circle cx="7" cy="7.5" r=".7" fill="currentColor" stroke="none"/><circle cx="7" cy="16.5" r=".7" fill="currentColor" stroke="none"/>',
  network:
    '<circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="19" r="2.2"/><circle cx="19" cy="19" r="2.2"/><path d="M12 7.2v3.3M12 10.5 6.4 17M12 10.5 17.6 17"/>',
  database:
    '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6"/><path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3"/>',
  user:
    '<circle cx="12" cy="8" r="3.6"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>',
  lock:
    '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  eye:
    '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  building:
    '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
  box:
    '<path d="M21 8 12 3 3 8v8l9 5 9-5Z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  code:
    '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12"/>',
  layers:
    '<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="M3 13l9 5 9-5"/>',
  plug:
    '<path d="M9 3v4M15 3v4M7 7h10v3a5 5 0 0 1-10 0V7ZM12 15v6"/>',
  table:
    '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 9h18M3 14.5h18M9.5 4v16"/>',
  info:
    '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none"/>',
};

// Keyword → category heuristics for Terraform resource types. First match wins,
// so order matters (more specific buckets earlier).
const RESOURCE_CATEGORY_RULES = [
  [/(^|_)(security_group|securitygroup|network_acl|nacl|firewall|waf|secret|kms|key_?vault|certificate|^tls_|acm|guardduty|^vault_)/, "Security"],
  [/(iam|service_account|_role$|_role_|^.*_policy|_policy$|_user$|_group$|access_|identity|principal|_grant|directory_service)/, "Identity"],
  [/(vpc|subnet|network|route|gateway|_lb$|load_balanc|_elb|_alb|_nlb|dns|route53|_zone$|interface|peering|_nat_|eip|_address|cidr|endpoint|vpn|transit|cloudfront|_cdn|_egress|_ingress)/, "Networking"],
  [/(instance|virtual_machine|_vm$|_vm_|compute|server|node_pool|nodepool|autoscal|launch_|_lambda|function|fargate|container|ecs_|eks_|_gke|kubernet|_k8s|batch|spot)/, "Compute"],
  [/(bucket|_s3|storage|object|_blob|volume|_ebs|_efs|disk|filesystem|file_system|_fs_|database|_db$|_db_|_rds|dynamodb|_sql|spanner|bigtable|bigquery|firestore|redis|elasticache|memcache|_cache|table|datastore|backup|snapshot|archive)/, "Storage & Data"],
  [/(log|metric|alarm|monitor|cloudwatch|_trace|dashboard|alert|_sns|notification|observ|telemetry|x_ray|xray)/, "Observability"],
  [/(registry|repository|_image|artifact|_build|package|pipeline|codebuild|codedeploy|codepipeline|container_registry|_ecr)/, "Build Management"],
  [/(organization|_org_|_account|_project|_folder|resource_group|management|billing|_quota|service_catalog)/, "Management"],
  [/(region|availability_zone|_az$|location|geo_)/, "Geography"],
  [/(workspace|tfe_|terraform|_run$|state_version|agent_pool|cloud_run)/, "Infrastructure as Code"],
];

// categorizeResource maps a Terraform resource type + mode to a display
// category. Data sources fall through to "Data Source" only when no stronger
// category matched, so a `data.aws_subnet` still reads as Networking.
function categorizeResource(resourceType, mode) {
  const t = String(resourceType || "").toLowerCase();
  for (const [re, cat] of RESOURCE_CATEGORY_RULES) {
    if (re.test(t)) return cat;
  }
  if (mode === "data") return "Data Source";
  return "Other";
}

function categoryColor(cat) {
  return CATEGORY_COLORS[cat] || CATEGORY_COLORS.Other;
}

function categoryIcon(cat) {
  return CATEGORY_ICONS[cat] || "info";
}

// Expose the domain helpers app.js needs when building node objects.
window.CatalogGraph = { categorizeResource, categoryColor, categoryIcon, CATEGORY_COLORS };

/* ---------------------------------------------------------------------------
 * Ported layouts (framework-agnostic, lifted from InfraGraph's TS helpers and
 * de-typed). Each consumes nodes [{id, group}] + links [{source, target}] and
 * returns deterministic target positions / orderings.
 * ------------------------------------------------------------------------- */

// --- stacked (layered DAG) layout ------------------------------------------
// MIN_COL_W: minimum horizontal distance between column centres (px).
// Labels are truncated to 26/30 chars (~180px wide when centred); 220px gives
// comfortable clearance so labels never bleed into the adjacent column.
// The stacked world can grow wider than the viewport — fitToContent() zooms out.
const STK = { RANK_ITERATIONS: 80, RANK_EPSILON: 0.0001, SWEEPS: 6, MIN_V: 18, MAX_V: 72, MIN_COL_W: 220 };

function incNested(map, from, to, amt) {
  if (!map.has(from)) map.set(from, new Map());
  const inner = map.get(from);
  inner.set(to, (inner.get(to) || 0) + amt);
}
function getNested(map, from, to) {
  return (map.get(from) && map.get(from).get(to)) || 0;
}

function stackedBuildTypeEdgeWeights(links, typeByNode) {
  const incoming = new Map(), outgoing = new Map();
  const outDir = new Map(), undirected = new Map(), neighbor = new Map();
  for (const l of links) {
    const s = typeByNode.get(l.source), t = typeByNode.get(l.target);
    if (!s || !t) continue;
    incNested(neighbor, l.source, l.target, 1);
    incNested(neighbor, l.target, l.source, 1);
    if (s === t) continue;
    incNested(undirected, s, t, 1);
    incNested(undirected, t, s, 1);
    incNested(outDir, s, t, 1);
    outgoing.set(s, (outgoing.get(s) || 0) + 1);
    incoming.set(t, (incoming.get(t) || 0) + 1);
  }
  return { incoming, outgoing, outDir, undirected, neighbor };
}

function stackedBuildTypeOrder(types, outDir, incomingByType, outgoingByType) {
  const inDir = new Map();
  outDir.forEach((targets, src) => targets.forEach((w, tgt) => incNested(inDir, tgt, src, w)));
  const ranks = new Map();
  for (const type of types) {
    const inc = incomingByType.get(type) || 0, out = outgoingByType.get(type) || 0;
    const total = inc + out;
    ranks.set(type, total === 0 ? 0 : (inc - out) / total);
  }
  for (let it = 0; it < STK.RANK_ITERATIONS; it++) {
    let maxDelta = 0;
    for (const type of types) {
      const inc = inDir.get(type), out = outDir.get(type);
      let sum = 0, tw = 0;
      if (inc) inc.forEach((w, src) => { sum += ((ranks.get(src) || 0) + 1) * w; tw += w; });
      if (out) out.forEach((w, tgt) => { sum += ((ranks.get(tgt) || 0) - 1) * w; tw += w; });
      if (tw === 0) continue;
      const cur = ranks.get(type) || 0;
      const next = (sum / tw) * 0.7 + cur * 0.3;
      ranks.set(type, next);
      maxDelta = Math.max(maxDelta, Math.abs(next - cur));
    }
    if (maxDelta < STK.RANK_EPSILON) break;
  }
  return types.slice().sort((a, b) => {
    const d = (ranks.get(a) || 0) - (ranks.get(b) || 0);
    if (Math.abs(d) > STK.RANK_EPSILON) return d;
    const na = (incomingByType.get(a) || 0) - (outgoingByType.get(a) || 0);
    const nb = (incomingByType.get(b) || 0) - (outgoingByType.get(b) || 0);
    if (na !== nb) return na - nb;
    return a.localeCompare(b);
  });
}

function stackedReorderByConnectivity(ranked, undirected) {
  if (ranked.length <= 2) return ranked;
  const [first, ...rest] = ranked;
  const baseIdx = new Map(ranked.map((t, i) => [t, i]));
  const ordered = [first];
  const unplaced = new Set(rest);
  while (unplaced.size > 0) {
    const prev = ordered[ordered.length - 1];
    const candidates = Array.from(unplaced).sort((a, b) => (baseIdx.get(a) || 0) - (baseIdx.get(b) || 0));
    let best = candidates[0], bestPrev = -1, bestPlaced = -1, bestBase = baseIdx.get(best) || 0;
    for (const c of candidates) {
      const toPrev = getNested(undirected, prev, c);
      const toPlaced = ordered.reduce((acc, p) => acc + getNested(undirected, p, c), 0);
      const cBase = baseIdx.get(c) || 0;
      if (toPrev > bestPrev ||
        (toPrev === bestPrev && toPlaced > bestPlaced) ||
        (toPrev === bestPrev && toPlaced === bestPlaced && cBase < bestBase)) {
        best = c; bestPrev = toPrev; bestPlaced = toPlaced; bestBase = cBase;
      }
    }
    ordered.push(best);
    unplaced.delete(best);
  }
  return ordered;
}

function stackedRowIndex(orderedIdsByType) {
  const row = new Map();
  orderedIdsByType.forEach((ids) => ids.forEach((id, i) => row.set(id, i)));
  return row;
}

function stackedBarycenter(nodeId, col, dir, neighbor, colByNode, rowByNode) {
  const neigh = neighbor.get(nodeId);
  if (!neigh) return { value: null, weight: 0 };
  let wr = 0, tw = 0;
  neigh.forEach((w, nb) => {
    const nc = colByNode.get(nb), nr = rowByNode.get(nb);
    if (nc === undefined || nr === undefined) return;
    if (dir === "ltr" && nc >= col) return;
    if (dir === "rtl" && nc <= col) return;
    const dist = Math.abs(nc - col);
    const we = w * (1 / Math.max(1, dist));
    wr += nr * we; tw += we;
  });
  if (tw === 0) return { value: null, weight: 0 };
  return { value: wr / tw, weight: tw };
}

function stackedRefineRows(orderedTypes, orderedIdsByType, neighbor, colByNode) {
  let rowByNode = stackedRowIndex(orderedIdsByType);
  const sweep = (dir) => {
    const start = dir === "ltr" ? 1 : orderedTypes.length - 2;
    const end = dir === "ltr" ? orderedTypes.length : -1;
    const step = dir === "ltr" ? 1 : -1;
    for (let col = start; col !== end; col += step) {
      const type = orderedTypes[col];
      if (!type) continue;
      const cur = orderedIdsByType.get(type) || [];
      const orig = new Map(cur.map((id, i) => [id, i]));
      const sorted = cur.map((id) => {
        const b = stackedBarycenter(id, col, dir, neighbor, colByNode, rowByNode);
        return { id, bc: b.value, w: b.weight, oi: orig.get(id) || 0 };
      }).sort((a, b) => {
        if (a.bc !== null && b.bc !== null) {
          const d = a.bc - b.bc;
          if (Math.abs(d) > STK.RANK_EPSILON) return d;
        } else if (a.bc !== null) return -1;
        else if (b.bc !== null) return 1;
        const dw = b.w - a.w;
        if (Math.abs(dw) > STK.RANK_EPSILON) return dw;
        if (a.oi !== b.oi) return a.oi - b.oi;
        return a.id.localeCompare(b.id);
      }).map((x) => x.id);
      orderedIdsByType.set(type, sorted);
      rowByNode = stackedRowIndex(orderedIdsByType);
    }
  };
  for (let i = 0; i < STK.SWEEPS; i++) { sweep("ltr"); sweep("rtl"); }
  return rowByNode;
}

function computeStackedLayout(nodes, links, dims) {
  const nodesByType = new Map(), typeByNode = new Map();
  for (const n of nodes) {
    const t = n.group || "unknown";
    if (!nodesByType.has(t)) nodesByType.set(t, []);
    nodesByType.get(t).push(n);
    typeByNode.set(n.id, t);
  }
  const types = Array.from(nodesByType.keys());
  const w = stackedBuildTypeEdgeWeights(links, typeByNode);
  const ranked = stackedBuildTypeOrder(types, w.outDir, w.incoming, w.outgoing);
  const orderedTypes = stackedReorderByConnectivity(ranked, w.undirected);

  const orderedIdsByType = new Map();
  nodesByType.forEach((typed, type) => {
    orderedIdsByType.set(type, typed.map((n) => n.id).sort((a, b) => a.localeCompare(b)));
  });
  const colByNode = new Map();
  orderedTypes.forEach((type, ci) => (orderedIdsByType.get(type) || []).forEach((id) => colByNode.set(id, ci)));
  const rowByNode = stackedRefineRows(orderedTypes, orderedIdsByType, w.neighbor, colByNode);

  const colCount = orderedTypes.length;
  // Use at least MIN_COL_W per column so labels don't bleed across column
  // boundaries. When the natural per-column share of the viewport is wider,
  // use that instead (small graphs stay compact). The world may be wider than
  // the viewport; fitToContent() zooms out to frame everything.
  const naturalColW = colCount > 0 ? dims.width / (colCount + 1) : dims.width;
  const columnWidth = Math.max(STK.MIN_COL_W, naturalColW);
  const maxCol = Math.max(1, ...orderedTypes.map((t) => (nodesByType.get(t) || []).length));
  const availH = Math.max(dims.height - 80, STK.MIN_V);
  const fit = maxCol > 1 ? availH / (maxCol - 1) : STK.MAX_V;
  const verticalSpacing = Math.max(STK.MIN_V, Math.min(STK.MAX_V, fit));

  // Resolve absolute target positions per node.
  const positionByNodeId = new Map();
  orderedTypes.forEach((type, ci) => {
    const ids = orderedIdsByType.get(type) || [];
    const total = Math.max(ids.length, 1);
    const totalV = (total - 1) * verticalSpacing;
    const startY = (dims.height - totalV) / 2;
    const x = columnWidth * (ci + 1);
    ids.forEach((id) => {
      const ri = rowByNode.get(id) || 0;
      positionByNodeId.set(id, { x, y: startY + ri * verticalSpacing });
    });
  });
  const columnByNodeId = colByNode;
  return { positionByNodeId, columnByNodeId };
}

// --- radial (hierarchical edge bundling) layout ----------------------------
const RAD = { NODE_ARC: 44, TYPE_GAP: 110, MIN_R: 120, OUTER_MARGIN: 80, SWEEPS: 12 };

function radialOrderTypes(types, undirected) {
  if (types.length <= 1) return types.slice();
  const totalByType = new Map();
  for (const t of types) {
    let total = 0;
    const n = undirected.get(t);
    if (n) n.forEach((w) => (total += w));
    totalByType.set(t, total);
  }
  const remaining = new Set(types);
  const ordered = [];
  const first = [...types].sort((a, b) => {
    const d = (totalByType.get(b) || 0) - (totalByType.get(a) || 0);
    return d !== 0 ? d : a.localeCompare(b);
  })[0];
  ordered.push(first);
  remaining.delete(first);
  while (remaining.size > 0) {
    const prev = ordered[ordered.length - 1];
    const pn = undirected.get(prev);
    let best = null, bestW = -1;
    for (const c of remaining) {
      const w = (pn && pn.get(c)) || 0;
      if (best === null || w > bestW || (w === bestW && c.localeCompare(best) < 0)) { best = c; bestW = w; }
    }
    ordered.push(best);
    remaining.delete(best);
  }
  return ordered;
}

function radialUndirected(links, typeByNode) {
  const weights = new Map();
  const inc = (from, to) => { if (!weights.has(from)) weights.set(from, new Map()); const m = weights.get(from); m.set(to, (m.get(to) || 0) + 1); };
  for (const l of links) {
    const s = typeByNode.get(l.source), t = typeByNode.get(l.target);
    if (!s || !t || s === t) continue;
    inc(s, t); inc(t, s);
  }
  return weights;
}

function computeRadialLayout(nodes, links, dims) {
  const centerX = dims.width / 2, centerY = dims.height / 2;
  const nodesByType = new Map(), typeByNode = new Map();
  for (const n of nodes) {
    const t = n.group || "unknown";
    if (!nodesByType.has(t)) nodesByType.set(t, []);
    nodesByType.get(t).push(n);
    typeByNode.set(n.id, t);
  }
  const types = Array.from(nodesByType.keys());
  const undirected = radialUndirected(links, typeByNode);
  const orderedTypes = radialOrderTypes(types, undirected);
  const positionByNodeId = new Map();
  if (nodes.length === 0) return { positionByNodeId, centerX, centerY, radius: RAD.MIN_R };

  const viewportFit = Math.max(RAD.MIN_R, Math.min(dims.width, dims.height) / 2 - RAD.OUTER_MARGIN);
  const intraArc = orderedTypes.reduce((s, t) => s + Math.max(0, (nodesByType.get(t) || []).length - 1) * RAD.NODE_ARC, 0);
  const interArc = orderedTypes.length * RAD.TYPE_GAP;
  const requiredR = (intraArc + interArc) / (2 * Math.PI);
  const radius = Math.max(RAD.MIN_R, viewportFit, requiredR);
  const slack = 2 * Math.PI * radius - (intraArc + interArc);
  const extraGap = orderedTypes.length > 0 ? slack / orderedTypes.length : 0;
  const nodeArc = RAD.NODE_ARC, typeGap = RAD.TYPE_GAP + extraGap, startAngle = -Math.PI / 2;

  const orderByType = new Map();
  orderedTypes.forEach((t) => orderByType.set(t, (nodesByType.get(t) || []).map((n) => n.id).sort((a, b) => a.localeCompare(b))));

  const crossNeighbors = new Map();
  for (const l of links) {
    const s = typeByNode.get(l.source), t = typeByNode.get(l.target);
    if (!s || !t || s === t) continue;
    if (!crossNeighbors.has(l.source)) crossNeighbors.set(l.source, []);
    if (!crossNeighbors.has(l.target)) crossNeighbors.set(l.target, []);
    crossNeighbors.get(l.source).push(l.target);
    crossNeighbors.get(l.target).push(l.source);
  }

  const computeAngles = (obt) => {
    const angleBy = new Map(), centerBy = new Map();
    let pos = 0;
    orderedTypes.forEach((type) => {
      const ids = obt.get(type) || [];
      const startPos = pos;
      ids.forEach((id, i) => angleBy.set(id, startAngle + (startPos + i * nodeArc) / radius));
      const lastPos = startPos + Math.max(0, ids.length - 1) * nodeArc;
      centerBy.set(type, startAngle + ((startPos + lastPos) / 2) / radius);
      pos += Math.max(0, ids.length - 1) * nodeArc + typeGap;
    });
    return { angleBy, centerBy };
  };
  const wrapToPi = (d) => { while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return d; };
  const cwDistance = (from, to) => { const diff = (from - to) % (2 * Math.PI); return diff < 0 ? diff + 2 * Math.PI : diff; };

  let { angleBy, centerBy } = computeAngles(orderByType);
  for (let it = 0; it < RAD.SWEEPS; it++) {
    let changed = false;
    orderedTypes.forEach((type) => {
      const ids = orderByType.get(type) || [];
      if (ids.length <= 1) return;
      const arcCenter = centerBy.get(type) || 0;
      const orig = new Map(ids.map((id, i) => [id, i]));
      const scored = ids.map((id) => {
        const neigh = crossNeighbors.get(id) || [];
        let ss = 0, sc = 0, c = 0;
        neigh.forEach((nb) => { const a = angleBy.get(nb); if (a === undefined) return; ss += Math.sin(a); sc += Math.cos(a); c++; });
        if (c === 0) return { id, distance: 0, has: false };
        return { id, distance: cwDistance(arcCenter, wrapToPi(Math.atan2(ss, sc))), has: true };
      });
      const sorted = scored.slice().sort((a, b) => {
        if (a.has && b.has) { if (a.distance !== b.distance) return a.distance - b.distance; return (orig.get(a.id) || 0) - (orig.get(b.id) || 0); }
        if (a.has) return -1;
        if (b.has) return 1;
        return (orig.get(a.id) || 0) - (orig.get(b.id) || 0);
      }).map((s) => s.id);
      if (sorted.some((id, i) => id !== ids[i])) {
        orderByType.set(type, sorted);
        changed = true;
        ({ angleBy, centerBy } = computeAngles(orderByType));
      }
    });
    if (!changed) break;
  }

  let pos = 0;
  orderedTypes.forEach((type) => {
    const ids = orderByType.get(type) || [];
    ids.forEach((id, i) => {
      const angle = startAngle + (pos + i * nodeArc) / radius;
      positionByNodeId.set(id, { x: centerX + radius * Math.cos(angle), y: centerY + radius * Math.sin(angle) });
    });
    pos += Math.max(0, ids.length - 1) * nodeArc + typeGap;
  });
  return { positionByNodeId, centerX, centerY, radius };
}

/* ---------------------------------------------------------------------------
 * GraphRenderer
 * ------------------------------------------------------------------------- */

const LABEL_THRESHOLD = 0.55;
const ZOOM_EXTENT = [0.1, 3];
const DRAG_THRESHOLD = 5;

// Performance thresholds. Above these, skip DOM-expensive operations that
// don't scale — fitToContent() + user zoom replace transitions and animation.
//   ANIM_THRESHOLD  — skip staggered entrance transitions (9s at 1k nodes)
//   SIM_THRESHOLD   — skip physics sim for deterministic layouts; place directly
//   LINK_THRESHOLD  — skip rendering edge <path> elements (349k paths at 1k nodes)
//   LINK_FORCE_CAP  — skip forceLink physics even without rendering (O(edges/tick))
const ANIM_THRESHOLD  = 300;
const SIM_THRESHOLD   = 300;
const LINK_THRESHOLD  = 300;
const LINK_FORCE_CAP  = 5000;

const STATE_COLORS = {
  source: "#f0b429",
  affected: "#e3556e",
  dependent: "#38c172",
  "dependent-indirect": "#4dabf7",
};

class GraphRenderer {
  constructor(opts) {
    this.onNodeClick = opts.onNodeClick || (() => {});
    this.onBackgroundClick = opts.onBackgroundClick || (() => {});
    const container = typeof opts.container === "string" ? document.querySelector(opts.container) : opts.container;
    this.container = container;

    this.nodes = [];
    this.links = [];
    this.nodeById = new Map();
    this.edgeById = new Map();
    this.adjOut = new Map(); // id -> Set(id)
    this.adjIn = new Map();
    this.outEdges = new Map(); // id -> [edgeId]
    this.inEdges = new Map();

    this.layout = "force";
    this.simulation = null;
    this.highlightActive = false;
    this.hoveredId = null;
    this.userInteracted = false;
    this.radialCenter = null;
    this._didInitialFrame = false;

    const rect = container.getBoundingClientRect();
    this.width = rect.width || 800;
    this.height = rect.height || 600;

    const svg = d3.select(container).append("svg").attr("class", "graph-svg").attr("width", "100%").attr("height", "100%");
    this.svg = svg;
    this.viewport = svg.append("g").attr("class", "graph-viewport");
    this.gLinks = this.viewport.append("g").attr("class", "links");
    this.gNodes = this.viewport.append("g").attr("class", "nodes");
    this.gLabels = this.viewport.append("g").attr("class", "labels");

    // Zoom / pan.
    this.zoom = d3.zoom().scaleExtent(ZOOM_EXTENT).on("zoom", (event) => {
      this.viewport.attr("transform", event.transform.toString());
      if (event.sourceEvent) this.userInteracted = true;
      // Compact-grid layout (LINK_FORCE_CAP path) places 1k nodes at 26px spacing;
      // labels are unreadable until the user zooms in to ~2×.
      const labelThresh = this._compactGrid ? 2.0 : LABEL_THRESHOLD;
      this.gLabels.classed("zoomed-out", event.transform.k < labelThresh);
    });
    svg.call(this.zoom).on("dblclick.zoom", null);
    svg.on("click", (event) => { if (event.target === svg.node()) { this.clearHover(); this.onBackgroundClick(); } });

    // Drag behaviour shared by node groups.
    this.drag = d3.drag()
      .subject((event, d) => d)
      .on("start", (event, d) => {
        this._dragStart = { x: event.x, y: event.y };
        this._dragMoved = false;
        d.fx = d.x; d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x; d.fy = event.y;
        if (!this._dragMoved && this._dragStart) {
          const dist = Math.hypot(event.x - this._dragStart.x, event.y - this._dragStart.y);
          if (dist > DRAG_THRESHOLD) { this._dragMoved = true; this.userInteracted = true; this.simulation && this.simulation.alphaTarget(0.1).alpha(0.25).restart(); }
        }
      })
      .on("end", (event, d) => {
        if (this._dragMoved && !event.active) this.simulation && this.simulation.alphaTarget(0);
        this._suppressClick = this._dragMoved;
        this._dragStart = null; this._dragMoved = false;
        if (this.layout === "stacked") { d.fx = null; d.fy = null; }
      });

    // Re-frame on container resize (debounced; no relayout, so no jitter).
    this._resizeRAF = null;
    this.resizeObserver = new ResizeObserver(() => {
      if (this._resizeRAF) cancelAnimationFrame(this._resizeRAF);
      this._resizeRAF = requestAnimationFrame(() => {
        const r = container.getBoundingClientRect();
        // Ignore collapses to a zero-size box — the canvas is hidden (e.g. while
        // the Table view is showing). There's nothing to re-frame, and running a
        // zoom transition against a 0×0 viewport makes d3.interpolateZoom divide
        // by zero, spraying "translate(NaN,NaN)" transforms for the whole
        // transition. Keep the last good dimensions until the canvas is visible.
        if (r.width === 0 || r.height === 0) return;
        this.width = r.width;
        this.height = r.height;
        if (this.nodes.length && !this.userInteracted) this.fitToContent();
      });
    });
    this.resizeObserver.observe(container);
  }

  /* --- data ------------------------------------------------------------- */

  setData(nodes, edges) {
    // Preserve positions across re-renders so re-fetches don't teleport nodes.
    const prev = this.nodeById;
    const cx = this.width / 2, cy = this.height / 2;

    this.nodes = nodes.map((n, i) => {
      const old = prev.get(n.id);
      return Object.assign({}, n, {
        x: old ? old.x : cx + (Math.random() - 0.5) * 60,
        y: old ? old.y : cy + (Math.random() - 0.5) * 60,
        vx: 0, vy: 0, fx: null, fy: null,
        nodeIndex: i,
        hl: null, dim: false,
      });
    });
    this.nodeById = new Map(this.nodes.map((n) => [n.id, n]));

    const present = this.nodeById;
    this.links = edges
      .filter((e) => present.has(e.source) && present.has(e.target))
      .map((e) => Object.assign({}, e, { source: e.source, target: e.target, hl: null, dim: false }));
    this.edgeById = new Map(this.links.map((e) => [e.id, e]));

    this._buildAdjacency();
    this._assignColors();
    this._assignRadii();

    this.highlightActive = false;
    this.hoveredId = null;

    this._joinNodes();
    this._joinLabels();
    this._joinLinks();
    // Reconcile decoration to the freshly-neutral data. Re-used DOM elements
    // (matched by id in the update join) would otherwise keep stale highlight
    // classes (dim / is-source / edge-hi …) from a previous selection, so a plain
    // re-render of the same graph must explicitly clear them.
    this._refreshDecoration();
    this._startSimulation();

    if (!this._didInitialFrame && this.nodes.length) {
      // Centre the viewport on the force origin so the entrance animation is on-screen.
      const k = 0.85;
      const t = d3.zoomIdentity.translate(this.width * (1 - k) / 2, this.height * (1 - k) / 2).scale(k);
      this.svg.call(this.zoom.transform, t);
      this._didInitialFrame = true;
    }
  }

  _buildAdjacency() {
    this.adjOut = new Map(); this.adjIn = new Map();
    this.outEdges = new Map(); this.inEdges = new Map();
    for (const n of this.nodes) {
      this.adjOut.set(n.id, new Set()); this.adjIn.set(n.id, new Set());
      this.outEdges.set(n.id, []); this.inEdges.set(n.id, []);
    }
    for (const e of this.links) {
      this.adjOut.get(e.source).add(e.target);
      this.adjIn.get(e.target).add(e.source);
      this.outEdges.get(e.source).push(e.id);
      this.inEdges.get(e.target).push(e.id);
    }
  }

  // Colour by category, with InfraGraph's intra-category brightness variation so
  // distinct subtypes in one category are related but distinguishable.
  _assignColors() {
    const subkeysByCat = new Map();
    for (const n of this.nodes) {
      const cat = n.category || "Other";
      if (!subkeysByCat.has(cat)) subkeysByCat.set(cat, new Set());
      subkeysByCat.get(cat).add(n.colorSubKey || cat);
    }
    const orderedSub = new Map();
    subkeysByCat.forEach((set, cat) => orderedSub.set(cat, Array.from(set).sort()));
    for (const n of this.nodes) {
      const cat = n.category || "Other";
      const base = categoryColor(cat);
      const subs = orderedSub.get(cat) || [];
      const idx = subs.indexOf(n.colorSubKey || cat);
      n.color = idx <= 0 || subs.length <= 1
        ? base
        : d3.color(base).brighter(Math.min(idx, 3) * 0.28).formatHex();
      n.icon = n.icon || categoryIcon(cat);
    }
  }

  _assignRadii() {
    // Shrink nodes slightly for large graphs so they don't crowd each other
    // at the zoomed-out overview scale. Clamped at 0.72× so nodes stay
    // large enough to click. Below 20 nodes: no change.
    const n = this.nodes.length;
    const rScale = Math.max(0.72, Math.sqrt(20 / Math.max(20, n)));
    for (const node of this.nodes) {
      const deg = (this.adjOut.get(node.id).size + this.adjIn.get(node.id).size) || 0;
      const base = (node.kind === "workspace" ? 16 : node.kind === "provider" ? 15 : 13) * rScale;
      node.radius = Math.max(9, Math.min(30, base + Math.min(deg, 12) * 0.95 * rScale));
      node.iconSize = Math.max(10, Math.min(22, Math.round(node.radius * 1.05)));
    }
  }

  /* --- DOM joins -------------------------------------------------------- */

  _joinNodes() {
    const self = this;
    const sel = this.gNodes.selectAll("g.node-group").data(this.nodes, (d) => d.id);
    sel.exit().remove();
    const enter = sel.enter().append("g")
      .attr("class", "node-group")
      .attr("data-id", (d) => d.id)
      .style("--node-color", (d) => d.color)
      .on("mouseenter", (event, d) => self._onHover(d))
      .on("mouseleave", () => self.clearHover())
      .on("click", (event, d) => {
        event.stopPropagation();
        if (self._suppressClick) { self._suppressClick = false; return; }
        self.onNodeClick(d);
      })
      .call(this.drag);

    enter.append("circle").attr("class", "node-dot").attr("r", 0).attr("fill-opacity", 0);
    enter.append("svg").attr("class", "node-icon").attr("viewBox", "0 0 24 24")
      .attr("fill", "none").attr("stroke", "currentColor").attr("stroke-width", 2)
      .attr("stroke-linecap", "round").attr("stroke-linejoin", "round");

    this.nodeSel = enter.merge(sel);

    // Static (data-derived) attributes — refreshed on every join in case colour/
    // icon/size changed for a re-used id.
    this.nodeSel.style("--node-color", (d) => d.color)
      .attr("data-mode", (d) => d.mode || null);
    this.nodeSel.select("circle.node-dot")
      .attr("fill", (d) => d.color).attr("stroke", (d) => d.color);
    this.nodeSel.select("svg.node-icon")
      .attr("width", (d) => d.iconSize).attr("height", (d) => d.iconSize)
      .attr("x", (d) => -d.iconSize / 2).attr("y", (d) => -d.iconSize / 2)
      .html((d) => ICONS[d.icon] || ICONS.info);

    // Staggered entrance on freshly-entered circles only.
    // Skip above ANIM_THRESHOLD — at 1k nodes the stagger runs for 9+ seconds.
    if (this.nodes.length <= ANIM_THRESHOLD) {
      enter.select("circle.node-dot")
        .transition().duration(800).delay((d) => 250 + d.nodeIndex * 9)
        .ease(d3.easeBackOut)
        .attr("r", (d) => d.radius).attr("fill-opacity", 1);
    } else {
      enter.select("circle.node-dot").attr("r", (d) => d.radius).attr("fill-opacity", 1);
    }
    // Make sure re-used nodes carry their final radius immediately.
    sel.select("circle.node-dot").attr("r", (d) => d.radius).attr("fill-opacity", 1);
  }

  _joinLabels() {
    const sel = this.gLabels.selectAll("g.label-group").data(this.nodes, (d) => d.id);
    sel.exit().remove();
    const enter = sel.enter().append("g").attr("class", "label-group");
    enter.append("text").attr("class", "label-name").attr("text-anchor", "middle");
    enter.append("text").attr("class", "label-type").attr("text-anchor", "middle");
    this.labelSel = enter.merge(sel);
    this.labelSel.select("text.label-name")
      .attr("y", (d) => d.radius + 12)
      .text((d) => truncate(d.displayText || d.id, 26));
    this.labelSel.select("text.label-type")
      .attr("y", (d) => d.radius + 23)
      .text((d) => truncate(d.subText || "", 30));
    if (this.nodes.length <= ANIM_THRESHOLD) {
      // Clear the inline style after the fade-in so that CSS class rules (e.g.
      // .label-group.dim { opacity: 0.12 }) are not overridden by a stale
      // inline style="opacity: 1".
      enter.style("opacity", 0).transition().duration(400).delay((d) => 450 + d.nodeIndex * 9).ease(d3.easeCubicOut).style("opacity", 1).on("end", function() { d3.select(this).style("opacity", null); });
    } else {
      // No inline style — let CSS class rules govern opacity from the start.
      enter.style("opacity", null);
    }
  }

  _joinLinks() {
    // Above LINK_THRESHOLD nodes, edge paths are too numerous to render
    // (349k paths for a 1k-node fully-connected graph) and too small to read.
    // Remove any previously rendered links and bail; hover still works via
    // adjacency state but won't draw lines (acceptable at this density).
    if (this.nodes.length > LINK_THRESHOLD) {
      this.gLinks.selectAll("path.link").remove();
      this.linkSel = this.gLinks.selectAll("path.link"); // empty selection
      return;
    }
    const sel = this.gLinks.selectAll("path.link").data(this.links, (d) => d.id);
    sel.exit().remove();
    const enter = sel.enter().append("path").attr("class", "link").attr("fill", "none");
    this.linkSel = enter.merge(sel);
    // data-kind lets CSS style relationship types differently (e.g. the
    // provider→workspace "uses" edge is dashed).
    this.linkSel.attr("data-kind", (d) => d.kind || null);
    enter.attr("stroke-opacity", 0).transition().duration(400).delay((d, i) => 600 + i * 4).ease(d3.easeCubicOut).attr("stroke-opacity", null);
  }

  /* --- simulation + layouts -------------------------------------------- */

  // _placeDirectly: skip physics entirely for large deterministic layouts.
  // Sets each node's (x,y) to the precomputed target, ticks once to flush DOM,
  // then fits the viewport. fitFn overrides fitToContent (used by radial).
  _placeDirectly(positionByNodeId, fitFn) {
    const cx = this.width / 2, cy = this.height / 2;
    this.nodes.forEach((n) => {
      const pos = positionByNodeId.get(n.id);
      n.x = pos ? pos.x : cx;
      n.y = pos ? pos.y : cy;
      n.vx = n.vy = 0;
    });
    this._tick();
    // For large graphs the fit zoom will be well below LABEL_THRESHOLD.
    // Pre-suppress labels so they don't flash as a wall of text before the
    // fitToContent transition fires and the zoom event updates the class.
    if (this.nodes.length > ANIM_THRESHOLD) {
      this.gLabels.classed("zoomed-out", true);
    }
    requestAnimationFrame(() => (fitFn ? fitFn() : this.fitToContent()));
  }

  _startSimulation() {
    if (this.simulation) this.simulation.stop();
    this.userInteracted = false;
    this.radialCenter = null;
    this._compactGrid = false;
    const cx = this.width / 2, cy = this.height / 2;

    if (!this.nodes.length) { this.simulation = null; return; }

    const linkForce = d3.forceLink(this.links).id((d) => d.id).distance(62);
    // Resolve source/target string IDs → node objects immediately, regardless of
    // which layout is selected.  Layouts that omit linkForce from their simulation
    // (e.g. stacked) never call forceLink.initialize(), so without this line the
    // link objects keep string ids and _linkPath(d) computes d.source.x = undefined,
    // producing "M undefined undefined" paths even after _tick() runs.
    linkForce.initialize(this.nodes, Math.random);

    if (this.layout === "radial") {
      const radial = computeRadialLayout(this.nodes, this.links, { width: this.width, height: this.height });
      this.radialCenter = { x: radial.centerX, y: radial.centerY };
      this._radial = radial;
      this.nodes.forEach((n) => { n.stackedColumn = undefined; });
      if (this.nodes.length > SIM_THRESHOLD) {
        this._placeDirectly(radial.positionByNodeId,
          () => this.fitToCircle(radial.centerX, radial.centerY, radial.radius));
        return;
      }
      this.simulation = d3.forceSimulation(this.nodes)
        .force("link", linkForce.strength(0))
        .force("x", d3.forceX((d) => { const t = radial.positionByNodeId.get(d.id); return t ? t.x : cx; }).strength(0.5))
        .force("y", d3.forceY((d) => { const t = radial.positionByNodeId.get(d.id); return t ? t.y : cy; }).strength(0.5))
        .force("collide", d3.forceCollide().radius((d) => d.radius + 2).iterations(1).strength(0.2))
        .velocityDecay(0.4).alpha(1).alphaDecay(0.02);
    } else if (this.layout === "stacked") {
      const stacked = computeStackedLayout(this.nodes, this.links, { width: this.width, height: this.height });
      this.nodes.forEach((n) => { const c = stacked.columnByNodeId.get(n.id); n.stackedColumn = c; });
      if (this.nodes.length > SIM_THRESHOLD) {
        this._placeDirectly(stacked.positionByNodeId);
        return;
      }
      this.simulation = d3.forceSimulation(this.nodes)
        // No link force: column assignment already captures the macro-structure;
        // letting link forces run fights the column placement.
        .force("x", d3.forceX((d) => { const t = stacked.positionByNodeId.get(d.id); return t ? t.x : cx; }).strength(0.9))
        .force("y", d3.forceY((d) => { const t = stacked.positionByNodeId.get(d.id); return t ? t.y : cy; }).strength(0.4))
        .force("collide", d3.forceCollide().radius((d) => d.radius + 6).iterations(2).strength(0.6))
        .velocityDecay(0.45).alpha(0.7).alphaDecay(0.028);
    } else {
      // Scale the simulation's "world size" with node count so large graphs
      // spread over a larger physical canvas. fitToContent() zooms to fit, so
      // the initial view is always framed — users zoom in to read detail.
      // scale = 1× at ≤12 nodes, ~2× at 50, ~2.9× at 100, ~4× at 200.
      const nodeCount = this.nodes.length;
      const scale    = Math.max(1, Math.sqrt(nodeCount / 12));
      const linkDist = 120  * scale;  // 62→120: workspace IDs are ~100px wide; need room
      const charge   = -2500 * scale; // -1500→-2500: more repulsion keeps labels clear
      const distMax  = Math.max(600, linkDist * 3);
      const collideR = Math.max(35, 35 * Math.sqrt(scale)); // 18→35: bigger exclusion zone

      this.nodes.forEach((n) => { n.stackedColumn = undefined; });

      // When there are too many edges to simulate (forceLink would be O(edges/tick)
      // and there are no visible edges to justify the cost), place nodes in a compact
      // grid directly and skip physics entirely. Without a link force the charge
      // repulsion has no counter-force and scatters nodes across a huge canvas.
      if (this.links.length > LINK_FORCE_CAP) {
        this._compactGrid = true;
        const cols = Math.ceil(Math.sqrt(this.nodes.length));
        const rows = Math.ceil(this.nodes.length / cols);
        const spacing = 26;
        const posMap = new Map();
        this.nodes.forEach((n, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          posMap.set(n.id, {
            x: cx + (col - cols / 2) * spacing,
            y: cy + (row - rows / 2) * spacing,
          });
        });
        this._placeDirectly(posMap);
        return;
      }

      this.simulation = d3.forceSimulation(this.nodes)
        .force("link", linkForce.strength(1.4).iterations(3).distance(linkDist))
        .force("charge", d3.forceManyBody().strength(charge).theta(0.8).distanceMin(80).distanceMax(distMax))
        .force("collide", d3.forceCollide().radius((d) => d.radius + collideR).iterations(Math.min(4, 2 + Math.floor(nodeCount / 50))).strength(0.75))
        .force("x", d3.forceX(cx).strength(0.03))
        .force("y", d3.forceY(cy).strength(0.03))
        .velocityDecay(0.4).alpha(0.9).alphaDecay(0.045);
    }

    this.simulation.on("tick", () => this._tick());
    this.simulation.on("end", () => { if (!this.userInteracted) this.fitToContent(); });
  }

  setLayout(name) {
    if (this.layout === name) return;
    this.layout = name;
    this.clearHover();
    this._startSimulation();
    if (name === "radial" && this._radial) {
      this.fitToCircle(this._radial.centerX, this._radial.centerY, this._radial.radius);
    }
  }

  _tick() {
    if (this.nodeSel) this.nodeSel.attr("transform", (d) => `translate(${d.x},${d.y})`);
    if (this.labelSel) this.labelSel.attr("transform", (d) => `translate(${d.x},${d.y})`);
    if (this.linkSel) this.linkSel.attr("d", (d) => this._linkPath(d));
  }

  _linkPath(d) {
    const s = d.source, t = d.target;
    const sx = s.x, sy = s.y, tx = t.x, ty = t.y;
    if (this.radialCenter) {
      const beta = 0.85;
      const mx = (sx + tx) / 2, my = (sy + ty) / 2;
      const cxp = mx + beta * (this.radialCenter.x - mx);
      const cyp = my + beta * (this.radialCenter.y - my);
      return `M ${sx} ${sy} Q ${cxp} ${cyp} ${tx} ${ty}`;
    }
    const dx = tx - sx, dy = ty - sy;
    const dist = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx) + Math.PI / 2;
    const off = Math.min(dist * 0.3, 80);
    const mx = (sx + tx) / 2 + Math.cos(angle) * off;
    const my = (sy + ty) / 2 + Math.sin(angle) * off;
    return `M ${sx} ${sy} Q ${mx} ${my} ${tx} ${ty}`;
  }

  /* --- viewport framing ------------------------------------------------- */

  fitToContent(padding = 70) {
    if (!this.nodes.length) return;
    // Bail when the viewport hasn't been measured or is hidden: a zoom
    // transition against a zero/NaN-size viewport produces NaN transforms.
    if (!(this.width > 0) || !(this.height > 0)) return;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const n of this.nodes) {
      const r = n.radius + 24; // include label space
      minX = Math.min(minX, n.x - r); maxX = Math.max(maxX, n.x + r);
      minY = Math.min(minY, n.y - r); maxY = Math.max(maxY, n.y + r);
    }
    const w = maxX - minX, h = maxY - minY;
    // !(w > 0) also rejects NaN (NaN > 0 is false), which `w <= 0` would miss.
    if (!(w > 0) || !(h > 0)) return;
    const k = Math.max(ZOOM_EXTENT[0], Math.min(ZOOM_EXTENT[1], Math.min((this.width - padding * 2) / w, (this.height - padding * 2) / h)));
    const tx = this.width / 2 - (minX + w / 2) * k;
    const ty = this.height / 2 - (minY + h / 2) * k;
    if (!Number.isFinite(k) || !Number.isFinite(tx) || !Number.isFinite(ty)) return;
    this.svg.transition().duration(450).call(this.zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(k));
  }

  fitToCircle(cx, cy, r) {
    if (!(this.width > 0) || !(this.height > 0)) return;
    const target = (r + 50) * 2;
    const k = Math.max(ZOOM_EXTENT[0], Math.min(ZOOM_EXTENT[1], Math.min(this.width, this.height) / target));
    const tx = this.width / 2 - cx * k, ty = this.height / 2 - cy * k;
    if (!Number.isFinite(k) || !Number.isFinite(tx) || !Number.isFinite(ty)) return;
    this.svg.interrupt().transition().duration(500).call(this.zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(k));
  }

  /* --- traversal (graph adjacency helpers used by app.js) --------------- */

  hasNode(id) { return this.nodeById.has(id); }
  node(id) { return this.nodeById.get(id); }
  currentNodes() { return this.nodes; }
  outNodeIds(id) { return Array.from(this.adjOut.get(id) || []); }
  inNodeIds(id) { return Array.from(this.adjIn.get(id) || []); }
  outEdgeIds(id) { return (this.outEdges.get(id) || []).slice(); }
  connectedEdgeIds(id) { return (this.outEdges.get(id) || []).concat(this.inEdges.get(id) || []); }

  descendantNodeIds(id) {
    const seen = new Set(), out = [];
    const stack = Array.from(this.adjOut.get(id) || []);
    while (stack.length) {
      const cur = stack.pop();
      if (seen.has(cur)) continue;
      seen.add(cur); out.push(cur);
      for (const nb of this.adjOut.get(cur) || []) if (!seen.has(nb)) stack.push(nb);
    }
    return out;
  }

  descendantEdgeIds(id) {
    const reach = new Set([id, ...this.descendantNodeIds(id)]);
    const out = [];
    for (const e of this.links) if (reach.has(e.source.id || e.source) && reach.has(e.target.id || e.target)) out.push(e.id);
    return out;
  }

  setNodeLabel(id, displayText, subText) {
    const n = this.nodeById.get(id);
    if (!n) return;
    if (displayText != null) n.displayText = displayText;
    if (subText != null) n.subText = subText;
    if (this.labelSel) {
      this.labelSel.filter((d) => d.id === id).select("text.label-name").text(truncate(n.displayText || n.id, 26));
      this.labelSel.filter((d) => d.id === id).select("text.label-type").text(truncate(n.subText || "", 30));
    }
  }

  /* --- decoration / highlight API --------------------------------------- */

  clearHighlight() {
    for (const n of this.nodes) { n.hl = null; n.hlColor = null; n.dim = false; }
    for (const e of this.links) { e.hl = null; e.dim = false; }
    this.highlightActive = false;
    this.clearHover();
    this._refreshDecoration();
  }

  dimAll() {
    for (const n of this.nodes) n.dim = true;
    for (const e of this.links) e.dim = true;
  }

  markNode(id, cls, color = null) {
    const n = this.nodeById.get(id);
    if (!n) return false;
    n.dim = false; n.hl = cls; n.hlColor = color;
    return true;
  }

  // markEdge lights an edge only when both endpoints are lit (not dimmed), so
  // edges never dangle into dimmed nodes.
  markEdge(id, cls) {
    const e = this.edgeById.get(id);
    if (!e) return false;
    const s = e.source.id || e.source, t = e.target.id || e.target;
    const sn = this.nodeById.get(s), tn = this.nodeById.get(t);
    if ((sn && sn.dim) || (tn && tn.dim)) return false;
    e.dim = false; e.hl = cls;
    return true;
  }

  lightLitEdges(cls) {
    for (const e of this.links) {
      const s = e.source.id || e.source, t = e.target.id || e.target;
      const sn = this.nodeById.get(s), tn = this.nodeById.get(t);
      if (sn && !sn.dim && tn && !tn.dim) { e.dim = false; e.hl = cls; }
    }
  }

  lightEdgesFrom(id, cls) {
    for (const eid of this.connectedEdgeIds(id)) this.markEdge(eid, cls);
  }

  applyHighlight() {
    this.highlightActive = true;
    this.clearHover();
    this._refreshDecoration();
  }

  _refreshDecoration() {
    if (this.nodeSel) {
      this.nodeSel
        .classed("dim", (d) => d.dim)
        .classed("is-source", (d) => d.hl === "source")
        .classed("is-affected", (d) => d.hl === "affected")
        .classed("is-dependent", (d) => d.hl === "dependent")
        .classed("is-dependent-indirect", (d) => d.hl === "dependent-indirect");
      this.nodeSel.select("circle.node-dot").attr("fill", (d) => d.hlColor || STATE_COLORS[d.hl] || d.color).attr("stroke", (d) => d.hlColor || STATE_COLORS[d.hl] || d.color);
    }
    if (this.labelSel) this.labelSel.classed("dim", (d) => d.dim);
    if (this.linkSel) {
      this.linkSel
        .classed("dim", (d) => d.dim)
        .classed("edge-hi", (d) => d.hl === "edge-hi")
        .classed("edge-hi-faint", (d) => d.hl === "edge-hi-faint");
    }
  }

  /* --- hover focus-by-dimming ------------------------------------------- */

  _onHover(d) {
    if (this.highlightActive) return;
    this.hoveredId = d.id;
    const neigh = new Set([d.id, ...this.outNodeIds(d.id), ...this.inNodeIds(d.id)]);
    const incident = new Set(this.connectedEdgeIds(d.id));
    if (this.nodeSel) this.nodeSel.classed("hover-dim", (n) => !neigh.has(n.id)).classed("hover-focus", (n) => n.id === d.id);
    if (this.labelSel) this.labelSel.classed("hover-dim", (n) => !neigh.has(n.id));
    if (this.linkSel) this.linkSel.classed("hover-hide", (e) => !incident.has(e.id)).classed("hover-hi", (e) => incident.has(e.id));
  }

  clearHover() {
    this.hoveredId = null;
    if (this.nodeSel) this.nodeSel.classed("hover-dim", false).classed("hover-focus", false);
    if (this.labelSel) this.labelSel.classed("hover-dim", false);
    if (this.linkSel) this.linkSel.classed("hover-hide", false).classed("hover-hi", false);
  }
}

function truncate(s, n) {
  s = String(s == null ? "" : s);
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

window.GraphRenderer = GraphRenderer;
