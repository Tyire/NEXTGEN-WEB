/**
 * Data for the home hero network map (components/sections/NetworkHero.tsx).
 * Pattern: animations library #22 "Route map", first built on Modish Formals.
 *
 * Projection (same as lib/reach-land.ts): azimuthal equidistant around Abuja
 * (9.0765 N, 7.3986 E), radius linear 0.27 per km out to 950 km and
 * log-compressed beyond (D = 130, solved from the Modish reference cities).
 * Offsets below are from Abuja in viewBox units, computed once in a scratch
 * script and stored as integers, so server and browser strings match.
 *
 * Illustrative only: lines show how traffic reaches the world, not exact
 * fibre or cable routes.
 */

export const VIEW = { w: 840, h: 800 };
/** Projection centre (Abuja) in viewBox units. */
export const HUB = { x: 450, y: 404 };
/** NextGen's hub: Lagos (6.5244 N, 3.3792 E). */
export const LAGOS = { x: HUB.x - 120, y: HUB.y + 76 };

/** Opening camera: close on Lagos and the south-west, then pull back. */
export const CAMERA = { s: 2.6, tx: -620, ty: -734, inv: 0.3846 };

export type Node = {
  name: string;
  x: number;
  y: number;
  /** 1 Nigeria, 2 West Africa, 3 subsea cable landings / world */
  tier: 1 | 2 | 3;
  /** show a label (others are dots only) */
  label?: boolean;
  lx?: number;
  ly?: number;
  anchor?: "start" | "middle" | "end";
};

export const NODES: Node[] = [
  { name: "Ibadan", x: -103, y: 51, tier: 1 },
  { name: "Ilorin", x: -85, y: 17, tier: 1 },
  { name: "Benin City", x: -54, y: 82, tier: 1 },
  { name: "Port Harcourt", x: -10, y: 128, tier: 1, label: true, lx: 14, ly: 22, anchor: "start" },
  { name: "Enugu", x: 4, y: 79, tier: 1 },
  { name: "Abuja", x: 0, y: 0, tier: 1, label: true, lx: 14, ly: 6, anchor: "start" },
  { name: "Kaduna", x: 1, y: -43, tier: 1 },
  { name: "Kano", x: 35, y: -88, tier: 1, label: true, lx: 14, ly: 6, anchor: "start" },
  { name: "Accra", x: -227, y: 102, tier: 2 },
  { name: "Abidjan", x: -291, y: 91, tier: 2 },
  { name: "Dakar", x: -341, y: -94, tier: 2 },
  { name: "Lisbon", x: -149, y: -336, tier: 3, label: true, lx: -14, ly: 6, anchor: "end" },
  { name: "London", x: -45, y: -376, tier: 3, label: true, lx: 14, ly: 6, anchor: "start" },
  { name: "Cape Town", x: 86, y: 370, tier: 3, label: true, lx: 14, ly: 6, anchor: "start" },
  { name: "Dubai", x: 345, y: -167, tier: 3, label: true, lx: -14, ly: -14, anchor: "end" },
];

const TIER_START = { 1: 1.9, 2: 2.9, 3: 3.4 } as const;
const TIER_STEP = { 1: 0.12, 2: 0.15, 3: 0.22 } as const;
const IDLE_START = 5.2;
const IDLE_STEP = 0.53;
/** Seconds between two pulses on one route (the CSS uses the same figure). */
export const IDLE_PERIOD = 8;

/** Quadratic arc out of Lagos, bowed away from the equator line like a flight path. */
function arcPath(n: Node) {
  const ex = HUB.x + n.x;
  const ey = HUB.y + n.y;
  const dx = ex - LAGOS.x;
  const dy = ey - LAGOS.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  let nx = -dy / len;
  let ny = dx / len;
  if (ny > 0 || (ny === 0 && nx > 0)) {
    nx = -nx;
    ny = -ny;
  }
  const bow = len * (n.tier === 1 ? 0.16 : 0.24);
  const cx = Math.round(LAGOS.x + dx / 2 + nx * bow);
  const cy = Math.round(LAGOS.y + dy / 2 + ny * bow);
  return `M${LAGOS.x} ${LAGOS.y} Q${cx} ${cy} ${ex} ${ey}`;
}

export const ROUTES = (() => {
  const seen = { 1: 0, 2: 0, 3: 0 };
  return NODES.map((n, k) => {
    const i = seen[n.tier]++;
    const delay = Math.round((TIER_START[n.tier] + i * TIER_STEP[n.tier]) * 100) / 100;
    const idle = Math.round((IDLE_START + k * IDLE_STEP) * 100) / 100;
    return { ...n, d: arcPath(n), delay, idle };
  });
})();

export const MAP_LABEL =
  "Illustrative map: NextGen's network starts in Lagos, reaches cities across Nigeria such as Abuja, Port Harcourt and Kano, runs on to West Africa, and connects to the world through subsea cable landings towards Lisbon, London, Cape Town and Dubai.";
