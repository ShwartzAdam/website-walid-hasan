/**
 * GENERATED asset tier (Asset Strategy §3): engineering-drawing style
 * illustrations used wherever no original or permitted web photo exists yet.
 *
 * They are deliberately abstract — plans, sections and profiles — so they can
 * never be mistaken for documentation of a real project, and every one is
 * labelled "Illustration" on the site. No words are drawn inside the images
 * (numbers and symbols only) so they work in Hebrew, Arabic and English.
 *
 *   node scripts/generate-illustrations.mjs   → public/generated/*.svg
 *
 * Output is deterministic (seeded), so re-running produces identical files.
 */
import { contours } from "d3-contour";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = "public/generated";
mkdirSync(OUT, { recursive: true });

// ── Palette (matches src/app/globals.css) ────────────────────────────────────
const C = {
  bg: "#111315",
  grid: "rgba(236,235,230,0.045)",
  contour: "#343a3f",
  contourMajor: "#50565c",
  ink: "#d8d3c8",
  muted: "#8d8a83",
  steel: "#5b6066",
  signal: "#e3a82b",
  asphalt: "#1f2326",
  block: "#1a1d20",
};
const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

// ── Deterministic randomness & noise ─────────────────────────────────────────
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function valueNoise(seed) {
  const r = rng(seed);
  const size = 256;
  const perm = Array.from({ length: size }, (_, i) => i).sort(() => r() - 0.5);
  const vals = Array.from({ length: size }, () => r());
  const lattice = (x, y) => vals[perm[(perm[x & 255] + y) & 255]];
  const smooth = (t) => t * t * (3 - 2 * t);
  return (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = smooth(x - xi), yf = smooth(y - yi);
    const a = lattice(xi, yi), b = lattice(xi + 1, yi);
    const c = lattice(xi, yi + 1), d = lattice(xi + 1, yi + 1);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  };
}

function terrain(seed, { scale = 0.004, slope = [0.25, 0.1], octaves = 5 } = {}) {
  const n = valueNoise(seed);
  return (x, y) => {
    let v = 0, amp = 1, f = scale, norm = 0;
    for (let o = 0; o < octaves; o++) {
      v += n(x * f + o * 17.3, y * f + o * 9.1) * amp;
      norm += amp;
      amp *= 0.5;
      f *= 2;
    }
    return v / norm + (x / 1600) * slope[0] + (y / 1000) * slope[1];
  };
}

// ── SVG helpers ──────────────────────────────────────────────────────────────
const f1 = (n) => Math.round(n * 10) / 10;
const pts = (list) => list.map(([x, y]) => `${f1(x)},${f1(y)}`).join(" ");
const poly = (list, attrs) => `<polygon points="${pts(list)}" ${attrs}/>`;
const line = (list, attrs) => `<polyline points="${pts(list)}" fill="none" ${attrs}/>`;
/** Monospace label. `opts` may override fill / font-size (no duplicate attributes — keeps the SVG valid). */
const text = (x, y, s, opts = "") => {
  const fill = /fill="([^"]+)"/.exec(opts)?.[1] ?? C.muted;
  const size = /font-size="([^"]+)"/.exec(opts)?.[1] ?? "13";
  return `<text x="${f1(x)}" y="${f1(y)}" font-family="${MONO}" font-size="${size}" fill="${fill}">${s}</text>`;
};

function doc(w, h, body, { bg = C.bg } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">
<defs>
  <pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="10" stroke="${C.muted}" stroke-width="1.4" opacity="0.8"/></pattern>
  <pattern id="hatchSignal" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="9" stroke="${C.signal}" stroke-width="1.5" opacity="0.95"/></pattern>
  <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="${C.muted}" opacity="0.5"/></pattern>
</defs>
${bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ""}
${body}
</svg>
`;
}

function grid(w, h, step = 50) {
  let s = `<g stroke="${C.grid}" stroke-width="1">`;
  for (let x = 0; x <= w; x += step) s += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
  for (let y = 0; y <= h; y += step) s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
  return s + "</g>";
}

/** Contour lines of a height field, via marching squares (d3-contour). */
function contourLines(field, w, h, { levels = 28, opacity = 1, cell = 7 } = {}) {
  const gw = Math.ceil(w / cell) + 1, gh = Math.ceil(h / cell) + 1;
  const values = new Float64Array(gw * gh);
  let min = Infinity, max = -Infinity;
  for (let j = 0; j < gh; j++)
    for (let i = 0; i < gw; i++) {
      const v = field(i * cell, j * cell);
      values[j * gw + i] = v;
      if (v < min) min = v;
      if (v > max) max = v;
    }
  const thresholds = Array.from({ length: levels }, (_, k) => min + ((k + 0.5) * (max - min)) / levels);
  const polys = contours().size([gw, gh]).thresholds(thresholds)(values);
  let s = `<g fill="none" opacity="${opacity}">`;
  polys.forEach((mp, k) => {
    const major = k % 5 === 0;
    let d = "";
    for (const polygon of mp.coordinates)
      for (const ring of polygon) {
        let last = null;
        const kept = ring.filter(([x, y], idx) => {
          if (idx === 0 || idx === ring.length - 1) return true;
          if (last && Math.hypot(x - last[0], y - last[1]) < 0.9) return false;
          last = [x, y];
          return true;
        });
        d += "M" + kept.map(([x, y]) => `${f1(x * cell)},${f1(y * cell)}`).join("L") + "Z";
      }
    if (d) s += `<path d="${d}" stroke="${major ? C.contourMajor : C.contour}" stroke-width="${major ? 1.3 : 0.8}"/>`;
  });
  return s + "</g>";
}

function northArrow(x, y) {
  return `<g transform="translate(${x},${y})" stroke="${C.ink}" fill="none" stroke-width="1.2">
  <circle r="22" stroke="${C.steel}"/><path d="M0,-18 L7,8 L0,3 L-7,8 Z" fill="${C.ink}"/></g>`;
}

function scaleBar(x, y) {
  let s = `<g transform="translate(${x},${y})">`;
  for (let i = 0; i < 4; i++) s += `<rect x="${i * 40}" y="0" width="40" height="6" fill="${i % 2 ? C.ink : "none"}" stroke="${C.ink}" stroke-width="1"/>`;
  s += text(0, 22, "0") + text(76, 22, "50") + text(150, 22, "100");
  return s + "</g>";
}

function surveyMark(x, y, label) {
  return `<g transform="translate(${f1(x)},${f1(y)})"><path d="M-7,0H7M0,-7V7" stroke="${C.signal}" stroke-width="1.5"/><circle r="3.5" fill="none" stroke="${C.signal}"/></g>${text(x + 10, y - 8, label, `fill="${C.ink}"`)}`;
}

// Centripetal-ish Catmull-Rom sampling for smooth curves without a DOM.
function catmull(points, samples = 20) {
  const out = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)], p1 = points[i], p2 = points[i + 1], p3 = points[Math.min(points.length - 1, i + 2)];
    for (let s = 0; s < samples; s++) {
      const t = s / samples, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map((k) =>
        0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3),
      ));
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

function offsetLine(path, d) {
  return path.map((p, i) => {
    const a = path[Math.max(0, i - 1)], b = path[Math.min(path.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
    return [p[0] - (dy / len) * d, p[1] + (dx / len) * d];
  });
}

function along(path) {
  const acc = [0];
  for (let i = 1; i < path.length; i++) acc.push(acc[i - 1] + Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]));
  return acc;
}

const W = 1600, H = 1000;
const files = {};

// ── 1. Topography (hero / earthworks backdrop) ───────────────────────────────
{
  const field = terrain(11, { scale: 0.0032, slope: [0.35, 0.15] });
  const r = rng(5);
  let marks = "";
  for (let i = 0; i < 7; i++) {
    const x = 180 + r() * 1250, y = 140 + r() * 700;
    marks += surveyMark(x, y, `+${(380 + field(x, y) * 120).toFixed(2)}`);
  }
  // No north arrow / scale bar: this one sits behind the hero headline and header.
  files.topography = doc(W, H, grid(W, H, 80) + contourLines(field, W, H, { levels: 34 }) + marks);
}

// ── 2. Earthworks — cut & fill cross-section ─────────────────────────────────
{
  const field = terrain(23, { scale: 0.006, octaves: 4, slope: [0.9, 0] });
  const raw = [];
  for (let x = 0; x <= W; x += 8) raw.push(field(x, 300));
  const lo = Math.min(...raw), hi = Math.max(...raw);
  // Normalise the profile into y 250..720 so it always frames the design line.
  const ground = raw.map((v, i) => [i * 8, 720 - ((v - lo) / (hi - lo)) * 470]);
  // Design: three terraces joined by 1:2 batters.
  const levels = [[0, 520], [470, 520], [560, 430], [980, 430], [1070, 340], [W, 340]];
  const design = levels;
  const gAt = (x) => {
    const i = Math.min(ground.length - 2, Math.floor(x / 8));
    const t = (x - ground[i][0]) / 8;
    return ground[i][1] + (ground[i + 1][1] - ground[i][1]) * t;
  };
  const dAt = (x) => {
    for (let i = 0; i < design.length - 1; i++)
      if (x >= design[i][0] && x <= design[i + 1][0]) {
        const t = (x - design[i][0]) / (design[i + 1][0] - design[i][0] || 1);
        return design[i][1] + (design[i + 1][1] - design[i][1]) * t;
      }
    return design[design.length - 1][1];
  };
  // Cut (ground above design → smaller y) and fill regions as strips.
  let cut = "", fill = "";
  for (let x = 0; x < W; x += 4) {
    const g0 = gAt(x), d0 = dAt(x), g1 = gAt(x + 4), d1 = dAt(x + 4);
    const quad = [[x, g0], [x + 4, g1], [x + 4, d1], [x, d0]];
    if (g0 < d0 && g1 < d1) cut += poly(quad, `fill="url(#hatch)"`);
    else if (g0 > d0 && g1 > d1) fill += poly(quad, `fill="url(#hatchSignal)"`);
  }
  let axis = `<line x1="0" y1="880" x2="${W}" y2="880" stroke="${C.steel}"/>`;
  for (let x = 0; x <= W; x += 100) {
    axis += `<line x1="${x}" y1="874" x2="${x}" y2="${x % 500 ? 886 : 894}" stroke="${C.steel}"/>`;
    if (x % 200 === 0) axis += text(x + 4, 910, `0+${String(x / 2).padStart(3, "0")}`);
  }
  const lvl = [[235, 520], [770, 430], [1335, 340]].map(([x, y]) =>
    `<path d="M${x - 8},${y - 14} L${x + 8},${y - 14} L${x},${y - 2} Z" fill="${C.signal}"/>` + text(x + 14, y - 8, `+${(452 - y / 10).toFixed(2)}`, `fill="${C.ink}"`),
  ).join("");
  // Soil strata below.
  let strata = "";
  for (let k = 1; k <= 3; k++) strata += line(ground.map(([x, y]) => [x, y + k * 55 + Math.sin(x / 90 + k) * 8]), `stroke="${C.contour}" stroke-dasharray="2 6"`);
  files.earthworks = doc(W, H,
    grid(W, H, 50) + strata + cut + fill +
    line(ground, `stroke="${C.ink}" stroke-width="2"`) +
    line(design, `stroke="${C.signal}" stroke-width="3"`) + lvl + axis,
  );
}

// ── 3. Road — plan view with chainage ────────────────────────────────────────
{
  const field = terrain(37, { scale: 0.003 });
  const center = catmull([[-80, 780], [260, 690], [560, 520], [860, 470], [1120, 330], [1400, 250], [1700, 230]], 24);
  const branch = catmull([[860, 470], [900, 640], [880, 820], [920, 1080]], 20);
  const road = (p, wdt) =>
    line(p, `stroke="${C.ink}" stroke-width="${wdt + 6}" stroke-linecap="butt" stroke-linejoin="round"`) +
    line(p, `stroke="${C.asphalt}" stroke-width="${wdt}" stroke-linejoin="round"`);
  const acc = along(center);
  let ticks = "";
  let next = 0;
  center.forEach((p, i) => {
    if (acc[i] >= next) {
      const [a, b] = [offsetLine(center, 62)[i], offsetLine(center, 76)[i]];
      ticks += `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="${C.signal}" stroke-width="1.5"/>`;
      if (next % 400 === 0) ticks += text(b[0] + 6, b[1] + 4, `0+${String(Math.round(next)).padStart(3, "0")}`, `fill="${C.ink}"`);
      next += 100;
    }
  });
  files.road = doc(W, H,
    grid(W, H, 80) + contourLines(field, W, H, { levels: 26, opacity: 0.8 }) +
    road(branch, 64) + road(center, 104) +
    line(offsetLine(center, -38), `stroke="${C.muted}" stroke-width="1.5"`) + line(offsetLine(center, 38), `stroke="${C.muted}" stroke-width="1.5"`) +
    line(center, `stroke="${C.signal}" stroke-width="2" stroke-dasharray="26 18"`) +
    line(branch, `stroke="${C.ink}" stroke-width="1.5" stroke-dasharray="14 12"`) +
    ticks + northArrow(120, 110) + scaleBar(1360, 930),
  );
}

// ── 4. Networks — plan view of water / sewer / drainage in a street grid ─────
function networkPlan(focus) {
  const field = terrain(focus === "water" ? 51 : 47, { scale: 0.0035 });
  let s = grid(W, H, 80) + contourLines(field, W, H, { levels: 22, opacity: 0.45 });
  const xs = [120, 460, 800, 1140, 1480], ys = [150, 500, 850];
  // Blocks + plots.
  for (let i = 0; i < xs.length - 1; i++)
    for (let j = 0; j < ys.length - 1; j++) {
      const x0 = xs[i] + 40, x1 = xs[i + 1] - 40, y0 = ys[j] + 40, y1 = ys[j + 1] - 40;
      s += `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="${C.block}" stroke="${C.contourMajor}"/>`;
      for (let x = x0 + 52; x < x1 - 10; x += 52) s += `<line x1="${x}" y1="${y0}" x2="${x}" y2="${y1}" stroke="${C.contour}"/>`;
      s += `<line x1="${x0}" y1="${(y0 + y1) / 2}" x2="${x1}" y2="${(y0 + y1) / 2}" stroke="${C.contour}"/>`;
    }
  const pipe = (a, b, style) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" ${style}/>`;
  const water = `stroke="${C.signal}" stroke-width="${focus === "water" ? 4 : 3}"`;
  const sewer = `stroke="${C.ink}" stroke-width="${focus === "sewer" ? 3 : 2}" stroke-dasharray="12 7"`;
  const drain = `stroke="${C.muted}" stroke-width="2" stroke-dasharray="3 5"`;
  for (const y of ys) {
    s += pipe([60, y - 12], [W - 60, y - 12], water);
    if (focus !== "water") s += pipe([60, y + 12], [W - 60, y + 12], sewer);
    s += pipe([60, y + 24], [W - 60, y + 24], drain);
  }
  for (const x of xs) {
    s += pipe([x - 12, 80], [x - 12, H - 80], water);
    if (focus !== "water") s += pipe([x + 12, 80], [x + 12, H - 80], sewer);
  }
  for (const x of xs)
    for (const y of ys) {
      s += `<circle cx="${x + 12}" cy="${y + 12}" r="9" fill="${C.bg}" stroke="${C.ink}" stroke-width="2"/>`;
      s += `<path d="M${x - 24},${y - 20} L${x},${y - 12} L${x - 24},${y - 4} Z M${x},${y - 20} L${x - 24},${y - 12} L${x},${y - 4}" fill="none" stroke="${C.signal}" stroke-width="1.5"/>`;
      if (focus === "water") s += `<path d="M${x + 20},${y - 30} l10,-18 l10,18 z" fill="${C.signal}"/>`;
    }
  // House connections.
  for (let i = 0; i < xs.length - 1; i++)
    for (let x = xs[i] + 66; x < xs[i + 1] - 50; x += 52)
      for (const y of ys.slice(0, -1)) s += `<line x1="${x}" y1="${y - 12}" x2="${x}" y2="${y + 40}" stroke="${C.signal}" stroke-width="1" opacity="0.7"/>`;
  return doc(W, H, s + northArrow(1510, 80));
}
files.network = networkPlan("all");
files.water = networkPlan("water");

// ── 5. Sewer — longitudinal profile ──────────────────────────────────────────
{
  const n = terrain(61, { scale: 0.005, octaves: 3, slope: [0, 0] });
  const ground = [];
  for (let x = 80; x <= 1520; x += 10) ground.push([x, 300 - n(x, 0) * 160 + x * 0.05]);
  const mh = [80, 380, 700, 1000, 1280, 1520];
  const inv = (x) => 560 + (x - 80) * 0.14;
  let s = grid(W, H, 40);
  s += line(ground, `stroke="${C.ink}" stroke-width="2"`);
  s += poly([...ground, [1520, 900], [80, 900]], `fill="url(#dots)" opacity="0.5"`);
  s += `<line x1="80" y1="${inv(80)}" x2="1520" y2="${inv(1520)}" stroke="${C.signal}" stroke-width="10" stroke-linecap="round"/>`;
  s += `<line x1="80" y1="${inv(80) - 9}" x2="1520" y2="${inv(1520) - 9}" stroke="${C.bg}" stroke-width="3"/>`;
  const gy = (x) => ground.reduce((b, p) => (Math.abs(p[0] - x) < Math.abs(b[0] - x) ? p : b))[1];
  mh.forEach((x, i) => {
    const top = gy(x);
    s += `<rect x="${x - 16}" y="${top}" width="32" height="${inv(x) - top + 14}" fill="${C.block}" stroke="${C.ink}" stroke-width="2"/>`;
    s += `<line x1="${x}" y1="${top - 40}" x2="${x}" y2="${top}" stroke="${C.steel}" stroke-dasharray="3 4"/>`;
    s += text(x - 22, top - 48, `${i + 1}`.padStart(2, "0"), `fill="${C.ink}" font-size="15"`);
    s += text(x - 30, inv(x) + 44, `${(412 - inv(x) / 20).toFixed(2)}`);
    if (i < mh.length - 1) {
      const mx = (x + mh[i + 1]) / 2;
      s += `<path d="M${mx - 30},${inv(mx) - 40} L${mx + 30},${inv(mx) - 32}" stroke="${C.signal}" stroke-width="1.5" marker-end=""/>`;
      s += `<path d="M${mx + 30},${inv(mx) - 32} l-10,-7 l1,11 z" fill="${C.signal}"/>`;
      s += text(mx - 24, inv(mx) - 52, "1.4%", `fill="${C.signal}"`);
    }
  });
  let axis = `<line x1="80" y1="900" x2="1520" y2="900" stroke="${C.steel}"/>`;
  for (let x = 80; x <= 1520; x += 60) axis += `<line x1="${x}" y1="894" x2="${x}" y2="906" stroke="${C.steel}"/>`;
  mh.forEach((x) => (axis += text(x - 24, 930, `0+${String(Math.round((x - 80) / 1.2)).padStart(3, "0")}`)));
  files.sewer = doc(W, H, s + axis);
}

// ── 6. Drainage — flow field converging on a channel & culvert ───────────────
{
  const field = terrain(73, { scale: 0.0026, slope: [0, 0.6] });
  let s = grid(W, H, 80) + contourLines(field, W, H, { levels: 24, opacity: 0.7 });
  const e = 4;
  for (let y = 40; y < H; y += 46)
    for (let x = 40; x < W; x += 46) {
      const gx = (field(x + e, y) - field(x - e, y)) / (2 * e);
      const gy = (field(x, y + e) - field(x, y - e)) / (2 * e);
      const len = Math.hypot(gx, gy) || 1;
      const dx = (-gx / len) * 16, dy = (-gy / len) * 16;
      const a = Math.atan2(dy, dx);
      s += `<g stroke="${C.muted}" stroke-width="1.2" opacity="0.8"><line x1="${f1(x - dx / 2)}" y1="${f1(y - dy / 2)}" x2="${f1(x + dx / 2)}" y2="${f1(y + dy / 2)}"/>` +
        `<path d="M${f1(x + dx / 2)},${f1(y + dy / 2)} l${f1(-6 * Math.cos(a - 0.5))},${f1(-6 * Math.sin(a - 0.5))} M${f1(x + dx / 2)},${f1(y + dy / 2)} l${f1(-6 * Math.cos(a + 0.5))},${f1(-6 * Math.sin(a + 0.5))}" fill="none"/></g>`;
    }
  const channel = catmull([[1700, 820], [1300, 760], [980, 800], [700, 740], [380, 790], [-100, 740]], 20);
  s += line(channel, `stroke="${C.signal}" stroke-width="22" opacity="0.18"`);
  s += line(channel, `stroke="${C.signal}" stroke-width="3"`);
  s += `<g transform="translate(700,742)"><rect x="-44" y="-26" width="88" height="52" fill="${C.bg}" stroke="${C.ink}" stroke-width="2.5"/><line x1="-44" y1="0" x2="44" y2="0" stroke="${C.ink}" stroke-dasharray="4 4"/></g>`;
  for (const [x, y] of [[980, 800], [380, 790], [1300, 760]]) s += `<rect x="${x - 10}" y="${y - 10}" width="20" height="20" fill="${C.signal}"/>`;
  files.drainage = doc(W, H, s + northArrow(120, 100));
}

// ── 7. Retaining walls — terraced section ────────────────────────────────────
{
  let s = grid(W, H, 40);
  const n = terrain(83, { scale: 0.008, octaves: 3, slope: [0, 0] });
  const original = [];
  for (let x = 0; x <= W; x += 10) original.push([x, 860 - x * 0.42 - n(x, 5) * 60]);
  s += line(original, `stroke="${C.muted}" stroke-width="1.5" stroke-dasharray="10 8"`);
  const steps = [[0, 800], [380, 800], [380, 620], [760, 620], [760, 440], [1140, 440], [1140, 280], [W, 280]];
  s += poly([...steps, [W, H], [0, H]], `fill="${C.block}"`);
  // Walls: thick concrete stems with footing, backfill hatch and drain behind.
  for (const [x, top, bottom] of [[380, 620, 800], [760, 440, 620], [1140, 280, 440]]) {
    s += poly([[x - 70, top], [x, top], [x, bottom], [x - 70, bottom]], `fill="url(#hatch)"`);
    s += `<rect x="${x - 4}" y="${top - 8}" width="26" height="${bottom - top + 8}" fill="${C.steel}" stroke="${C.ink}" stroke-width="2"/>`;
    s += `<rect x="${x - 40}" y="${bottom}" width="96" height="22" fill="${C.steel}" stroke="${C.ink}" stroke-width="2"/>`;
    s += `<circle cx="${x - 22}" cy="${bottom - 12}" r="9" fill="${C.bg}" stroke="${C.signal}" stroke-width="2"/>`;
    for (let y = top + 30; y < bottom - 20; y += 40) s += `<line x1="${x - 4}" y1="${y}" x2="${x + 22}" y2="${y + 6}" stroke="${C.signal}" stroke-width="2"/>`;
    s += `<line x1="${x + 60}" y1="${top}" x2="${x + 60}" y2="${bottom}" stroke="${C.steel}"/>` +
      `<path d="M${x + 54},${top + 10} l6,-10 l6,10 M${x + 54},${bottom - 10} l6,10 l6,-10" fill="none" stroke="${C.steel}"/>` +
      text(x + 68, (top + bottom) / 2 + 4, `${((bottom - top) / 50).toFixed(1)}`, `fill="${C.ink}"`);
  }
  s += line(steps, `stroke="${C.ink}" stroke-width="2.5"`);
  files.retaining = doc(W, H, s);
}

// ── 8. Neighborhood plan — shared by the scroll story layers ─────────────────
const hood = (() => {
  const cx = 900, cy = 520, ang = (-10 * Math.PI) / 180;
  const T = ([u, v]) => [cx + u * Math.cos(ang) - v * Math.sin(ang), cy + u * Math.sin(ang) + v * Math.cos(ang)];
  const r = rng(99);
  const us = [-620, -330, -40, 250, 540], vs = [-300, 0, 300];
  const blocks = [];
  for (let i = 0; i < us.length - 1; i++)
    for (let j = 0; j < vs.length - 1; j++) blocks.push({ u0: us[i] + 34, u1: us[i + 1] - 34, v0: vs[j] + 34, v1: vs[j + 1] - 34, park: i === 1 && j === 1 });
  const plots = [], buildings = [], trees = [];
  for (const b of blocks) {
    if (b.park) {
      for (let k = 0; k < 26; k++) trees.push(T([b.u0 + 20 + r() * (b.u1 - b.u0 - 40), b.v0 + 20 + r() * (b.v1 - b.v0 - 40)]));
      continue;
    }
    const mid = (b.v0 + b.v1) / 2;
    for (const [a, c] of [[b.v0, mid], [mid, b.v1]])
      for (let u = b.u0; u < b.u1 - 20; u += 46) {
        const u1 = Math.min(u + 46, b.u1);
        plots.push([[u, a], [u1, a], [u1, c], [u, c]].map(T));
        const inset = 8 + r() * 4, depth = 0.45 + r() * 0.25;
        const near = a === b.v0 ? a : c;
        const far = near + (a === b.v0 ? 1 : -1) * (c - a) * depth;
        const [y0, y1] = [Math.min(near + (a === b.v0 ? 10 : -10), far), Math.max(near + (a === b.v0 ? 10 : -10), far)];
        buildings.push([[u + inset, y0], [u1 - inset, y0], [u1 - inset, y1], [u + inset, y1]].map(T));
      }
  }
  const streets = [...vs.map((v) => [[-760, v], [700, v]].map(T)), ...us.map((u) => [[u, -380], [u, 380]].map(T))];
  for (const v of vs) for (let u = -700; u < 680; u += 44) { trees.push(T([u, v - 26])); trees.push(T([u + 22, v + 26])); }
  const pads = blocks.map((b) => [[b.u0 - 6, b.v0 - 6], [b.u1 + 6, b.v0 - 6], [b.u1 + 6, b.v1 + 6], [b.u0 - 6, b.v1 + 6]].map(T));
  const nodes = [];
  for (const u of us) for (const v of vs) nodes.push(T([u, v]));
  return { T, blocks, plots, buildings, trees, streets, pads, nodes, us, vs };
})();
const hoodField = terrain(107, { scale: 0.003, slope: [0.3, 0.2] });

// The four story layers follow the brief's narrative:
// GROUND → INFRASTRUCTURE → DEVELOPMENT → COMMUNITY.
const layer = {
  ground: () => grid(W, H, 80) + contourLines(hoodField, W, H, { levels: 32 }),
  infrastructure: () => {
    let s = "";
    for (const p of hood.pads) s += poly(p, `fill="url(#hatch)" stroke="${C.muted}" stroke-width="1.5" stroke-dasharray="8 6"`);
    hood.blocks.forEach((b, i) => {
      const [x, y] = hood.T([(b.u0 + b.u1) / 2, (b.v0 + b.v1) / 2]);
      s += `<path d="M${f1(x - 8)},${f1(y - 16)} L${f1(x + 8)},${f1(y - 16)} L${f1(x)},${f1(y - 4)} Z" fill="${C.signal}"/>` + text(x + 12, y - 6, `+${(402 + i * 1.5).toFixed(2)}`, `fill="${C.ink}"`);
    });
    for (const st of hood.streets)
      s += line(offsetLine(st, 10), `stroke="${C.signal}" stroke-width="3"`) +
        line(offsetLine(st, -10), `stroke="${C.ink}" stroke-width="2.5" stroke-dasharray="12 7"`) +
        line(st, `stroke="${C.muted}" stroke-width="2" stroke-dasharray="3 5"`);
    for (const [x, y] of hood.nodes) s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="9" fill="${C.bg}" stroke="${C.ink}" stroke-width="2"/>`;
    return s;
  },
  development: () => {
    let s = "";
    for (const st of hood.streets) s += line(st, `stroke="${C.ink}" stroke-width="50" opacity="0.9"`);
    for (const st of hood.streets) s += line(st, `stroke="${C.asphalt}" stroke-width="46" opacity="0.94"`);
    for (const st of hood.streets) s += line(st, `stroke="${C.signal}" stroke-width="2" stroke-dasharray="18 14"`);
    for (const [x, y] of hood.nodes) s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="5" fill="none" stroke="${C.ink}" stroke-width="1.5"/>`;
    return s;
  },
  community: () => {
    let s = "";
    for (const p of hood.plots) s += poly(p, `fill="none" stroke="${C.contourMajor}" stroke-width="1"`);
    for (const b of hood.buildings) s += poly(b, `fill="#262a2e" stroke="${C.ink}" stroke-width="1.2"`);
    for (const [x, y] of hood.trees) s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="7" fill="rgba(216,211,200,0.10)" stroke="${C.muted}" stroke-width="1"/>`;
    const r = rng(7);
    for (const b of hood.buildings) if (r() < 0.35) {
      const cxp = b.reduce((a, p) => a + p[0], 0) / 4, cyp = b.reduce((a, p) => a + p[1], 0) / 4;
      s += `<circle cx="${f1(cxp)}" cy="${f1(cyp)}" r="2.6" fill="${C.signal}"/>`;
    }
    return s;
  },
};

// Story layers are transparent (except the ground) so the site can stack and reveal them on scroll.
files["story-ground"] = doc(W, H, layer.ground());
files["story-infrastructure"] = doc(W, H, layer.infrastructure(), { bg: null });
files["story-development"] = doc(W, H, layer.development(), { bg: null });
files["story-community"] = doc(W, H, layer.community(), { bg: null });
files.neighborhood = doc(W, H, grid(W, H, 80) + contourLines(hoodField, W, H, { levels: 32, opacity: 0.5 }) + layer.development() + layer.community() + northArrow(1510, 80));
files.residential = doc(W, H, grid(W, H, 80) + contourLines(hoodField, W, H, { levels: 32, opacity: 0.6 }) + layer.infrastructure() + layer.community());

// ── 9. Public space — terraced plaza & park plan ─────────────────────────────
{
  const field = terrain(131, { scale: 0.003 });
  let s = grid(W, H, 80) + contourLines(field, W, H, { levels: 26, opacity: 0.55 });
  const [cx, cy] = [800, 520];
  for (let k = 0; k < 6; k++) s += `<path d="M${cx - 170 - k * 40},${cy} A${170 + k * 40},${170 + k * 40} 0 0 1 ${cx + 170 + k * 40},${cy}" fill="none" stroke="${k === 0 ? C.signal : C.ink}" stroke-width="${k === 0 ? 3 : 1.6}"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="120" fill="${C.block}" stroke="${C.ink}" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="8" fill="${C.signal}"/>`;
  for (const p of [catmull([[-50, 900], [400, 760], [cx - 120, cy + 60]], 20), catmull([[cx + 120, cy + 60], [1200, 760], [1650, 880]], 20), catmull([[cx, cy + 120], [820, 800], [760, 1050]], 20)])
    s += line(p, `stroke="${C.ink}" stroke-width="26" opacity="0.14"`) + line(p, `stroke="${C.muted}" stroke-width="1.5" stroke-dasharray="6 6"`);
  const r = rng(3);
  for (let k = 0; k < 90; k++) {
    const a = r() * Math.PI * 2, d = 440 + r() * 380;
    const x = cx + Math.cos(a) * d * 1.2, y = cy + Math.sin(a) * d * 0.7;
    if (x > 20 && x < W - 20 && y > 20 && y < H - 20) s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(9 + r() * 7)}" fill="rgba(216,211,200,0.08)" stroke="${C.muted}"/>`;
  }
  files.public = doc(W, H, s + northArrow(1510, 90));
}

// ── 10. Equipment — blueprint side elevations ────────────────────────────────
function machine(body, lengthLabel) {
  const w = 1200, h = 750;
  const s = grid(w, h, 30) +
    `<line x1="60" y1="600" x2="1140" y2="600" stroke="${C.steel}" stroke-width="2"/>` +
    `<g fill="none" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${body}</g>` +
    `<g stroke="${C.muted}" stroke-width="1.2"><line x1="170" y1="660" x2="1030" y2="660"/><line x1="170" y1="645" x2="170" y2="675"/><line x1="1030" y1="645" x2="1030" y2="675"/>` +
    `<path d="M170,660 l14,-6 v12 z M1030,660 l-14,-6 v12 z" fill="${C.muted}"/></g>` +
    text(560, 690, lengthLabel, `fill="${C.ink}" font-size="16"`);
  return doc(w, h, s);
}
const track = (x0, x1, y = 600) =>
  `<rect x="${x0}" y="${y - 70}" width="${x1 - x0}" height="70" rx="35"/>` +
  Array.from({ length: Math.floor((x1 - x0 - 70) / 70) + 1 }, (_, i) => `<circle cx="${x0 + 35 + i * 70}" cy="${y - 35}" r="20"/>`).join("") +
  `<line x1="${x0 + 30}" y1="${y - 70}" x2="${x1 - 30}" y2="${y - 70}" stroke="${C.signal}" stroke-width="3"/>`;
const wheel = (x, r = 70, y = 600) => `<circle cx="${x}" cy="${y - r}" r="${r}"/><circle cx="${x}" cy="${y - r}" r="${r * 0.45}" stroke="${C.signal}"/>`;

files["equipment-excavator"] = machine(
  track(200, 640) +
  `<path d="M240,530 L240,420 L360,420 L360,330 L470,330 L500,420 L620,420 L620,530 Z"/>` +
  `<path d="M372,342 L462,342 L482,410 L372,410 Z" stroke="${C.signal}"/>` +
  `<path d="M560,430 L760,190 L800,210 L620,470" />` +
  `<path d="M760,190 L940,330 L915,355 L775,235"/>` +
  `<path d="M930,330 L1000,380 L985,470 L915,470 L900,395 Z" stroke="${C.signal}"/>` +
  `<circle cx="760" cy="200" r="10"/><circle cx="930" cy="340" r="10"/>`,
  "10 250",
);
files["equipment-loader"] = machine(
  wheel(330, 95) + wheel(760, 95) +
  `<path d="M200,480 L200,400 L300,400 L330,300 L520,300 L540,400 L860,400 L880,470 L860,505 L200,505 Z"/>` +
  `<path d="M345,315 L505,315 L520,395 L345,395 Z" stroke="${C.signal}"/>` +
  `<path d="M820,420 L990,470 L980,500 L810,455"/>` +
  `<path d="M980,420 L1080,440 L1070,580 L960,580 L955,470 Z" stroke="${C.signal}"/>`,
  "8 900",
);
files["equipment-dump-truck"] = machine(
  wheel(290, 70) + wheel(700, 70) + wheel(860, 70) +
  `<path d="M180,510 L180,330 L240,300 L360,300 L380,430 L950,430 L950,510 Z"/>` +
  `<path d="M200,330 L300,320 L320,410 L200,410 Z" stroke="${C.signal}"/>` +
  `<path d="M400,420 L420,250 L1000,250 L960,420 Z"/>` +
  `<path d="M430,275 L975,275" stroke="${C.signal}" stroke-width="2"/>`,
  "9 400",
);
files["equipment-roller"] = machine(
  `<circle cx="880" cy="490" r="110"/><circle cx="880" cy="490" r="18" stroke="${C.signal}"/>` + wheel(330, 85) +
  `<path d="M220,480 L220,380 L560,380 L600,420 L760,420 L770,480 Z"/>` +
  `<path d="M360,380 L380,230 L540,230 L560,380"/><path d="M395,248 L525,248 L540,370 L385,370 Z" stroke="${C.signal}"/>` +
  `<path d="M760,400 L990,400 L990,470"/>`,
  "5 900",
);
files["equipment-grader"] = machine(
  wheel(210, 62) + wheel(820, 62) + wheel(960, 62) +
  `<path d="M150,470 L150,420 L760,360 L760,470 L1030,470 L1030,380 L760,380"/>` +
  `<path d="M760,380 L780,230 L930,230 L950,380" /><path d="M795,248 L915,248 L930,370 L785,370 Z" stroke="${C.signal}"/>` +
  `<path d="M400,420 L420,520 L640,560 L660,430" stroke="${C.signal}"/>` +
  `<line x1="330" y1="560" x2="720" y2="570" stroke="${C.signal}" stroke-width="6"/>`,
  "9 100",
);
files["equipment-bulldozer"] = machine(
  track(260, 800) +
  `<path d="M280,530 L280,380 L620,380 L640,300 L780,300 L800,530 Z"/>` +
  `<path d="M652,315 L768,315 L782,420 L645,420 Z" stroke="${C.signal}"/>` +
  `<path d="M800,420 L930,470 M800,500 L930,520"/>` +
  `<path d="M930,300 Q1000,420 960,590 L930,590 Z" stroke="${C.signal}"/>` +
  `<path d="M260,480 L180,560 M200,540 L240,590"/>`,
  "6 700",
);
files["equipment-crusher"] = machine(
  track(260, 900) +
  `<path d="M240,530 L240,440 L940,440 L940,530 Z"/>` +
  `<path d="M300,440 L260,260 L560,260 L520,440 Z"/><path d="M285,300 L545,300" stroke="${C.signal}" stroke-width="2"/>` +
  `<rect x="560" y="330" width="170" height="110"/><circle cx="645" cy="385" r="34" stroke="${C.signal}"/>` +
  `<path d="M720,470 L1110,330 L1120,352 L735,495"/>` +
  Array.from({ length: 6 }, (_, i) => `<line x1="${770 + i * 58}" y1="${460 - i * 21}" x2="${780 + i * 58}" y2="${490 - i * 21}"/>`).join(""),
  "14 900",
);

for (const [name, svg] of Object.entries(files)) writeFileSync(`${OUT}/${name}.svg`, svg);
console.log(`generated ${Object.keys(files).length} illustrations → ${OUT}/`);
