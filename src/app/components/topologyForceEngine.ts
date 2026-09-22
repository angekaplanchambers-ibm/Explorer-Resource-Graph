// topologyForceEngine.ts
//
// A self-contained D3 v7 engine that powers the "organic ecosystem" behaviour of
// TopologyGraph (see WorkspacesExplorerView.tsx). It is deliberately kept separate
// from the huge host component so the physics/interaction layer can be reasoned
// about (and tuned) in isolation from the JSX/rendering concerns.
//
// Responsibilities:
//  - Own a live d3.forceSimulation whose nodes ease toward whatever analytic
//    layout (force/stacked/radial/grid/arc) the host component hands it, instead
//    of the host pre-baking static coordinates once.
//  - Provide a perpetual, low-amplitude "breathing" force (sine/cosine per-node
//    micro-oscillation) so the network never looks perfectly static.
//  - Provide a "wake" force that responds to cursor velocity, gently parting
//    nearby nodes as the pointer sweeps across the canvas.
//  - Provide d3.zoom (pan/zoom) and d3.drag (per-node drag) factories that the
//    host wires onto its own SVG/refs.
//  - Expose a single mutable position map (read during React render) plus a
//    rAF-throttled "frame" ticker so the host can re-render at a smooth,
//    coalesced rate without recreating Maps every animation frame.
//
// The host component (WorkspacesExplorerView.tsx) still owns all JSX — this
// module never touches the DOM directly except via the drag/zoom behaviours,
// which act on elements the host passes in.

import * as d3 from "d3";

export type EngineNode = {
  id: string;
  // Analytic layout target (from the host's existing pure layout functions).
  tx: number;
  ty: number;
  // How strongly this node is pulled toward (tx, ty) each tick. Low for the
  // organic "force" layout (physics dominate), high for stacked/radial/grid/arc
  // (the shape should read clearly, with only gentle ambient sway on top).
  anchorK: number;
  // Collision / visual radius, used for forceCollide and wake falloff.
  r: number;
  // Per-node breathing phase + frequency jitter so nodes don't oscillate in lockstep.
  phase: number;
  freq: number;
  // Ring/depth used to stagger the radial "blooming" cascade; undefined elsewhere.
  depth?: number;
};

export type EngineLink = { source: string; target: string };

type SimNode = EngineNode & d3.SimulationNodeDatum;
type SimLink = d3.SimulationLinkDatum<SimNode>;

export type PointerState = {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  lastT: number;
};

export type FlareEntry = { start: number; duration: number };
export type TrailPoint = { x: number; y: number; t: number };

const BREATHE_BASE_AMP = 0.16;
const BREATHE_NEAR_AMP = 1.05;
const BREATHE_NEAR_RADIUS = 150;
const WAKE_RADIUS = 170;
const WAKE_MAX_STRENGTH = 15;
const TRAIL_TTL_MS = 520;

export class TopologyForceEngine {
  simulation: d3.Simulation<SimNode, SimLink>;
  private simNodes: SimNode[] = [];
  private simLinks: SimLink[] = [];
  private nodeById = new Map<string, SimNode>();

  // Live positions, mutated in place every tick. The host reads this map during
  // render instead of holding position data in React state directly, which
  // keeps re-renders cheap (one Map lookup per node) and avoids allocating a
  // fresh Map every animation frame.
  readonly positions = new Map<string, { x: number; y: number }>();

  private pointer: PointerState = { active: false, x: 0, y: 0, vx: 0, vy: 0, speed: 0, lastT: 0 };

  // Layout-transition blend, eased 0→1 with d3.easeCubicInOut whenever the host
  // calls retarget(). Drives anchor-strength ramp-in and (via getters below)
  // link curvature / grid-scatter opacity, without touching the host's existing
  // layout math.
  private blend = 1;
  private blendTimer: d3.Timer | null = null;
  // Ambient "keep it breathing forever" alphaTarget baseline. Layout
  // transitions and drag temporarily raise alphaTarget above this via
  // reheatFor()/drag start-end, then restore it here when they finish.
  private readonly baseAlphaTarget = 0.011;

  private flares = new Map<string, FlareEntry>();
  private trails = new Map<string, TrailPoint[]>();

  private onFrame: () => void;
  private width: number;
  private height: number;
  private chargeForce: d3.ForceManyBody<SimNode>;
  private linkForce: d3.ForceLink<SimNode, SimLink>;
  private collideForce: d3.ForceCollide<SimNode>;

  constructor(opts: { width: number; height: number; onFrame: () => void }) {
    this.width = opts.width;
    this.height = opts.height;
    this.onFrame = opts.onFrame;

    this.chargeForce = d3.forceManyBody<SimNode>().strength(-190).distanceMax(460);
    this.linkForce = d3.forceLink<SimNode, SimLink>([]).id(d => d.id).distance(92).strength(0.32);
    this.collideForce = d3.forceCollide<SimNode>(d => d.r + 10).strength(0.92);
    this.simulation = d3.forceSimulation<SimNode, SimLink>([])
      .force("charge", this.chargeForce)
      .force("link", this.linkForce)
      .force("collide", this.collideForce)
      // Custom anchor force (not d3.forceX/forceY) — those cache their x/y and
      // strength accessor results once at initialize() time, so mutating
      // n.tx/n.ty/n.anchorK later (as retarget() does on every layout switch)
      // would silently have no effect. Reading everything fresh every tick,
      // the same way breatheForce/wakeForce already do, keeps retargeting live.
      .force("anchor", (alpha: number) => this.anchorForce(alpha))
      .force("breathe", (alpha: number) => this.breatheForce(alpha))
      .force("wake", (alpha: number) => this.wakeForce(alpha))
      // Keep a very low ambient simmer alive forever instead of letting alpha
      // fully cool to 0 — this is what makes the breathing force perpetual
      // rather than a one-shot settle. alphaDecay/velocityDecay are tuned to
      // stay smooth (no jitter) at this scale of node count.
      .alphaTarget(this.baseAlphaTarget)
      .alphaDecay(0.028)
      .velocityDecay(0.42)
      .on("tick", () => this.tick());
  }

  // Pulls each node toward its current (tx, ty) analytic-layout target at
  // strength n.anchorK * this.blend. Reads both fresh every tick so
  // retarget() (which mutates tx/ty/anchorK on the live node objects) takes
  // effect immediately instead of needing the simulation to be re-initialized.
  private anchorForce(alpha: number) {
    const k = this.blend * alpha;
    for (const n of this.simNodes) {
      if (n.fx != null || n.fy != null) continue; // pinned while dragging
      n.vx = (n.vx ?? 0) + (n.tx - (n.x ?? n.tx)) * n.anchorK * k;
      n.vy = (n.vy ?? 0) + (n.ty - (n.y ?? n.ty)) * n.anchorK * k;
    }
  }

  private tick() {
    // d3-force's internal timer already runs on requestAnimationFrame and
    // coalesces multiple restarts into one tick per real frame, so we can
    // notify the host directly here without a second rAF wrapper.
    for (const n of this.simNodes) {
      this.positions.set(n.id, { x: n.x ?? n.tx, y: n.y ?? n.ty });
    }
    this.pruneTrails();
    this.onFrame();
  }

  // --- breathing (ambient sine/cosine micro-oscillation) --------------------
  private breatheForce(alpha: number) {
    const t = performance.now() / 1000;
    const pointerActive = this.isPointerFresh();
    for (const n of this.simNodes) {
      if (n.fx != null || n.fy != null) continue; // being dragged — no breathing jitter
      let amp = BREATHE_BASE_AMP;
      if (pointerActive) {
        const dx = (n.x ?? n.tx) - this.pointer.x;
        const dy = (n.y ?? n.ty) - this.pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < BREATHE_NEAR_RADIUS) {
          // Elastic-feeling ramp as the cursor approaches: amplitude scales with
          // proximity and with recent cursor speed (faster sweep = bigger sway).
          const proximity = 1 - dist / BREATHE_NEAR_RADIUS;
          const speedBoost = Math.min(2.2, 1 + this.pointer.speed / 500);
          amp = BREATHE_BASE_AMP + BREATHE_NEAR_AMP * proximity * speedBoost;
        }
      }
      const osc1 = Math.sin(t * n.freq + n.phase) * amp;
      const osc2 = Math.cos(t * n.freq * 0.82 + n.phase * 1.31) * amp;
      n.vx = (n.vx ?? 0) + osc2 * 0.045 * alpha;
      n.vy = (n.vy ?? 0) + osc1 * 0.045 * alpha;
    }
  }

  // --- kinetic wake (mouse sweep parts nearby nodes, drifts back after) -----
  private wakeForce(alpha: number) {
    if (!this.isPointerFresh() || this.pointer.speed < 4) return;
    const strength = Math.min(1, this.pointer.speed / 900) * WAKE_MAX_STRENGTH;
    if (strength <= 0) return;
    for (const n of this.simNodes) {
      if (n.fx != null || n.fy != null) continue;
      const dx = (n.x ?? n.tx) - this.pointer.x;
      const dy = (n.y ?? n.ty) - this.pointer.y;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < WAKE_RADIUS) {
        const f = (1 - dist / WAKE_RADIUS) * strength * alpha;
        n.vx = (n.vx ?? 0) + (dx / dist) * f;
        n.vy = (n.vy ?? 0) + (dy / dist) * f;
      }
    }
  }

  // A pointer position is only "live" for a short window after the last real
  // mousemove — otherwise a fast swipe right before the cursor stops moving
  // (or leaving without a mouseleave, e.g. during automated testing) would
  // leave a stale nonzero speed sitting in `this.pointer` forever, exerting a
  // phantom wake force / breathing boost at a location nothing is happening.
  private isPointerFresh(): boolean {
    return this.pointer.active && (performance.now() - this.pointer.lastT) < 120;
  }

  // --- pointer tracking (feeds both wake + breathing-near-cursor) -----------
  updatePointer(x: number, y: number) {
    const now = performance.now();
    if (this.pointer.active && this.pointer.lastT > 0) {
      const dt = Math.max(1, now - this.pointer.lastT);
      const vx = ((x - this.pointer.x) / dt) * 1000;
      const vy = ((y - this.pointer.y) / dt) * 1000;
      // Light smoothing so a single jumpy sample doesn't spike the wake force.
      this.pointer.vx = this.pointer.vx * 0.6 + vx * 0.4;
      this.pointer.vy = this.pointer.vy * 0.6 + vy * 0.4;
      this.pointer.speed = Math.hypot(this.pointer.vx, this.pointer.vy);
    }
    this.pointer.x = x;
    this.pointer.y = y;
    this.pointer.lastT = now;
    this.pointer.active = true;
  }

  clearPointer() {
    this.pointer.active = false;
    this.pointer.speed = 0;
  }

  // --- data binding: entry/update/exit for nodes + links ---------------------
  // Called whenever the host's node/edge arrays change identity. Existing nodes
  // (matched by id) keep their live x/y/vx/vy so the graph doesn't teleport;
  // new nodes seed from the host-provided target (or a small jitter around the
  // centroid) so they animate in rather than popping at (0,0).
  setData(nodes: EngineNode[], links: EngineLink[]) {
    const prevById = this.nodeById;
    const nextNodes: SimNode[] = nodes.map(n => {
      const prev = prevById.get(n.id);
      if (prev) {
        // Update mutable target/meta fields in place; keep physical state (x/y/vx/vy).
        prev.tx = n.tx; prev.ty = n.ty; prev.anchorK = n.anchorK; prev.r = n.r; prev.depth = n.depth;
        return prev;
      }
      const jitter = () => (Math.random() - 0.5) * 40;
      return {
        ...n,
        x: n.tx + jitter(),
        y: n.ty + jitter(),
        vx: 0,
        vy: 0,
      } as SimNode;
    });

    const nextById = new Map(nextNodes.map(n => [n.id, n]));
    this.simNodes = nextNodes;
    this.nodeById = nextById;

    this.simLinks = links
      .filter(l => nextById.has(l.source) && nextById.has(l.target))
      .map(l => ({ source: l.source, target: l.target }));

    // Drop stale positions/trails/flares for removed nodes.
    for (const id of Array.from(this.positions.keys())) {
      if (!nextById.has(id)) { this.positions.delete(id); this.trails.delete(id); this.flares.delete(id); }
    }
    for (const n of nextNodes) {
      this.positions.set(n.id, { x: n.x!, y: n.y! });
    }

    this.simulation.nodes(this.simNodes);
    this.linkForce.links(this.simLinks);
    this.simulation.alpha(Math.max(this.simulation.alpha(), 0.6)).restart();
  }

  // --- layout retargeting (Force/Stacked/Radial/Grid/Arc switch) ------------
  // Does NOT touch the host's analytic layout math — it just re-points each
  // node's (tx, ty) anchor and eases the pull-in with a cubic in/out blend
  // (Global Fluidity), optionally staggered by `depth` (Celestial Blooming for
  // Radial) so the new shape reads as though it grew outward from the center.
  retarget(targets: Map<string, { x: number; y: number; depth?: number; r?: number }>, opts: { anchorK: number; stagger?: boolean; staggerMs?: number }) {
    const staggerMs = opts.staggerMs ?? 42;
    let maxDepth = 0;
    for (const n of this.simNodes) {
      const t = targets.get(n.id);
      if (!t) continue;
      n.tx = t.x; n.ty = t.y; n.anchorK = opts.anchorK; n.depth = t.depth;
      if (t.r != null) n.r = t.r;
      if (t.depth != null) maxDepth = Math.max(maxDepth, t.depth);
    }

    // The "force" layout deliberately keeps a weak anchor so charge/link
    // physics dominate (organic clustering). Every other layout needs a much
    // firmer anchor to read clearly — but full organic-mode charge/link
    // strength would otherwise fight that anchor pull hard enough to stall
    // migrations partway. In particular, forceLink keeps trying to hold every
    // connected pair ~92px apart regardless of where the deterministic layout
    // wants them — with a well-connected graph that adds up to real, lasting
    // resistance even at a small strength, so it's fully disabled (not just
    // reduced) while a deterministic shape is in charge; edges become purely
    // visual connectors again, matching the original static layouts. Charge
    // and collision are only softened, since they're still useful for keeping
    // nodes from fully overlapping mid-migration.
    const deterministic = opts.anchorK > 0.1;
    this.chargeForce.strength(deterministic ? -30 : -190);
    this.linkForce.strength(deterministic ? 0 : 0.32);
    // Collision still keeps nodes from fully overlapping at rest, but at full
    // strength it turns a 100-node migration into gridlock as everyone jostles
    // through the same congested region on the way to their new slot — soften
    // it during the migration so the anchor can actually win, then it settles
    // back to normal once the transition's reheat window ends (see below).
    this.collideForce.strength(deterministic ? 0.45 : 0.92);

    this.blendTimer?.stop();
    if (opts.stagger) {
      // Blooming cascade: inner rings (low depth) ramp in first, outer rings
      // follow after a small incremental delay — approximated here by giving
      // each node its own eased-start time based on depth, all driven by a
      // single d3.timer rather than per-node timeouts. Per-node anchorK below
      // already encodes the eased-in strength, so `blend` stays a neutral 1×
      // multiplier here (it's only used as the *global* ramp for the
      // non-staggered branch below).
      const start = performance.now();
      this.blend = 1;
      // Keep alpha elevated for the *entire* cascade (deepest ring's delay +
      // its own ramp), not just a fixed 700ms — otherwise alpha decays back to
      // the near-zero ambient baseline before outer rings ever get a chance to
      // move, and the "bloom" stalls partway through.
      this.reheatFor(maxDepth * staggerMs + 2200, 0.5);
      this.blendTimer = d3.timer(() => {
        const now = performance.now();
        let allDone = true;
        for (const n of this.simNodes) {
          const nodeDelay = (n.depth ?? 0) * staggerMs;
          const local = Math.min(1, Math.max(0, (now - start - nodeDelay) / 650));
          if (local < 1) allDone = false;
          n.anchorK = opts.anchorK * d3.easeCubicInOut(local);
        }
        if (allDone) this.blendTimer?.stop();
      });
    } else {
      this.blend = 0;
      const start = performance.now();
      // Same fix as above: sustain alpha well past the 700ms strength ramp so
      // nodes actually have time to travel to their new (tx, ty) before the
      // simulation cools back down to its ambient breathing baseline.
      this.reheatFor(3200, 0.6);
      this.blendTimer = d3.timer(() => {
        const t = Math.min(1, (performance.now() - start) / 700);
        this.blend = d3.easeCubicInOut(t);
        if (t >= 1) this.blendTimer?.stop();
      });
    }
  }

  // Temporarily raises alphaTarget so the simulation stays "hot" long enough
  // for a layout migration to actually complete, then eases back down to the
  // perpetual ambient-breathing baseline. Without this, alphaDecay pulls alpha
  // back toward baseAlphaTarget almost immediately and anchor forces stall.
  private reheatTimer: ReturnType<typeof setTimeout> | null = null;
  private reheatFor(durationMs: number, alphaTargetDuring: number) {
    this.simulation.alphaTarget(alphaTargetDuring);
    this.simulation.alpha(Math.max(this.simulation.alpha(), alphaTargetDuring)).restart();
    if (this.reheatTimer != null) clearTimeout(this.reheatTimer);
    this.reheatTimer = setTimeout(() => {
      this.simulation.alphaTarget(this.baseAlphaTarget);
      this.reheatTimer = null;
    }, durationMs);
  }

  // --- drag behaviour ---------------------------------------------------------
  // Returns a d3.drag behaviour the host attaches to each node's <g ref>. Pins
  // the node (fx/fy) while dragging — d3's fixed-position semantics mean the
  // built-in forceX/forceY anchors simply no-op for a pinned node, so no extra
  // bookkeeping is needed there. On release the pin is cleared and the node
  // drifts back to equilibrium under its own anchor/charge/link forces.
  makeDragBehavior(onDragStateChange?: (id: string, dragging: boolean) => void): d3.DragBehavior<SVGGElement, string, d3.SubjectPosition | string> {
    return d3.drag<SVGGElement, string>()
      // A few pixels of tolerance so a plain click isn't mistaken for a drag
      // (and, per d3's semantics, the resulting synthetic "click" is suppressed
      // only when the pointer actually moved past this distance).
      .clickDistance(4)
      .subject((_event, id) => {
        const n = this.nodeById.get(id);
        return n ? { x: n.x ?? n.tx, y: n.y ?? n.ty } : { x: 0, y: 0 };
      })
      .on("start", (event, id) => {
        const n = this.nodeById.get(id);
        if (!n) return;
        this.reheatFor(1200, 0.35);
        n.fx = n.x; n.fy = n.y;
        this.trails.set(id, []);
        onDragStateChange?.(id, true);
      })
      .on("drag", (event, id) => {
        const n = this.nodeById.get(id);
        if (!n) return;
        n.fx = event.x; n.fy = event.y;
        const trail = this.trails.get(id) ?? [];
        trail.push({ x: event.x, y: event.y, t: performance.now() });
        if (trail.length > 40) trail.shift();
        this.trails.set(id, trail);
      })
      .on("end", (event, id) => {
        const n = this.nodeById.get(id);
        if (!n) return;
        n.fx = null; n.fy = null;
        // Keep alpha elevated a little longer post-release so the node visibly
        // drifts back toward equilibrium under the anchor/charge/link forces
        // instead of freezing the instant the pointer lets go.
        this.reheatFor(900, 0.22);
        onDragStateChange?.(id, false);
        // Let the trail fade out naturally (pruned by TRAIL_TTL_MS in tick()).
      });
  }

  // --- zoom behaviour ----------------------------------------------------------
  makeZoomBehavior(scaleExtent: [number, number] = [0.25, 6]) {
    return d3.zoom<SVGSVGElement, unknown>().scaleExtent(scaleExtent);
  }

  // --- bioluminescent flare (click/hold flash, decays back to baseline) -----
  flareNode(id: string, duration = 900) {
    this.flares.set(id, { start: performance.now(), duration });
    // The simulation's alphaTarget keeps it perpetually ticking, so the next
    // natural tick (within ~16ms) will pick this flare up — no extra kick needed.
    // Self-clean after the flare fully decays.
    window.setTimeout(() => {
      const f = this.flares.get(id);
      if (f && performance.now() - f.start >= f.duration) this.flares.delete(id);
    }, duration + 50);
  }

  getFlareIntensity(id: string): number {
    const f = this.flares.get(id);
    if (!f) return 0;
    const t = Math.min(1, (performance.now() - f.start) / f.duration);
    return 1 - d3.easeCubicOut(t);
  }

  // --- light trails (fading path left behind a dragged node) -----------------
  private pruneTrails() {
    const now = performance.now();
    for (const [id, pts] of this.trails) {
      const kept = pts.filter(p => now - p.t < TRAIL_TTL_MS);
      if (kept.length === 0) this.trails.delete(id); else this.trails.set(id, kept);
    }
  }

  getTrail(id: string): TrailPoint[] {
    return this.trails.get(id) ?? [];
  }

  getBlend() {
    return this.blend;
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  destroy() {
    this.blendTimer?.stop();
    this.simulation.stop();
  }
}

// Deterministic per-node breathing phase/frequency so re-renders don't reshuffle
// the sway pattern; derived from the id's char codes rather than Math.random()
// so it stays stable across re-mounts with the same node set.
export function breathingSeed(id: string): { phase: number; freq: number } {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const phase = (h % 6283) / 1000; // 0..2π
  const freq = 0.55 + ((h >> 8) % 40) / 100; // ~0.55..0.95 Hz
  return { phase, freq };
}
