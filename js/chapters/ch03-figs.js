/* ====== Chapter 3 figures: vectors, drawn as SVG in code (maths coordinates, y up) ====== */
(function (root) {
  'use strict';
  const D2R = Math.PI / 180;
  const f1 = (n) => (+n).toFixed(1);
  const defs = ['a', 'b', 'g', 'm'].map((c) => `<marker id="vh-${c}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="ah ah-${c}"/></marker>`).join('');

  /* o: {W,H,axes,items,pad,label}. items: arrow{a:[x,y],b:[x,y],c:'a|b|g|m',t,tp:[dx,dy]}, dash{a,b}, arc{c,r,a0,a1,t,tr}, text{p,t,c,anchor}, dot{p,t,tp} */
  function scene(o) {
    const W = o.W || 340, H = o.H || 230, pad = o.pad || 34, items = o.items || [];
    const pts = [[0, 0]];
    items.forEach((it) => { if (it.a) pts.push(it.a); if (it.b) pts.push(it.b); if (it.p) pts.push(it.p); if (it.k === 'arc') { pts.push([it.c[0] + it.r, it.c[1] + it.r], [it.c[0] - it.r, it.c[1] - it.r]); } });
    if (o.ext) o.ext.forEach((p) => pts.push(p));
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    const s = Math.min((W - 2 * pad) / Math.max(x1 - x0, 1e-6), (H - 2 * pad) / Math.max(y1 - y0, 1e-6));
    const ox = (W - s * (x1 - x0)) / 2 - s * x0, oy = H - (H - s * (y1 - y0)) / 2 + s * y0;
    const X = (x) => ox + s * x, Y = (y) => oy - s * y;
    let g = `<svg viewBox="0 0 ${W} ${H}" class="vis" role="img" aria-label="${o.label || 'vector diagram'}"><defs>${defs}</defs>`;
    if (o.axes) {
      g += `<line class="v-ln" x1="${X(x0) - 14}" y1="${Y(0)}" x2="${X(x1) + 18}" y2="${Y(0)}" marker-end="url(#vh-m)"/><line class="v-ln" x1="${X(0)}" y1="${Y(y0) + 14}" x2="${X(0)}" y2="${Y(y1) - 18}" marker-end="url(#vh-m)"/>`;
      g += `<text class="v-lab" x="${X(x1) + 16}" y="${Y(0) + 14}">x</text><text class="v-lab" x="${X(0) + 8}" y="${Y(y1) - 14}">y</text>`;
    }
    items.forEach((it) => {
      const k = it.k || (it.b ? 'arrow' : 'text');
      if (k === 'arrow') {
        g += `<line class="v-arr ${it.c || 'a'}" x1="${f1(X(it.a[0]))}" y1="${f1(Y(it.a[1]))}" x2="${f1(X(it.b[0]))}" y2="${f1(Y(it.b[1]))}" marker-end="url(#vh-${it.c || 'a'})"/>`;
        if (it.t) { const tp = it.tp || [0, -8]; g += `<text class="v-lab ${it.c || 'a'}" x="${f1((X(it.a[0]) + X(it.b[0])) / 2 + tp[0])}" y="${f1((Y(it.a[1]) + Y(it.b[1])) / 2 + tp[1])}" text-anchor="middle">${it.t}</text>`; }
      } else if (k === 'dash') {
        g += `<line class="v-dash" x1="${f1(X(it.a[0]))}" y1="${f1(Y(it.a[1]))}" x2="${f1(X(it.b[0]))}" y2="${f1(Y(it.b[1]))}"/>`;
        if (it.t) { const tp = it.tp || [0, -6]; g += `<text class="v-lab" x="${f1((X(it.a[0]) + X(it.b[0])) / 2 + tp[0])}" y="${f1((Y(it.a[1]) + Y(it.b[1])) / 2 + tp[1])}" text-anchor="middle">${it.t}</text>`; }
      } else if (k === 'arc') {
        const r = it.r * s, a0 = it.a0 * D2R, a1 = it.a1 * D2R, cx = X(it.c[0]), cy = Y(it.c[1]);
        const sw = a1 > a0 ? 0 : 1, large = Math.abs(it.a1 - it.a0) > 180 ? 1 : 0;
        g += `<path class="v-arc" d="M${f1(cx + r * Math.cos(a0))} ${f1(cy - r * Math.sin(a0))} A${f1(r)} ${f1(r)} 0 ${large} ${sw} ${f1(cx + r * Math.cos(a1))} ${f1(cy - r * Math.sin(a1))}"/>`;
        if (it.t) { const m = (a0 + a1) / 2, tr = (it.tr || 1.45) * r; g += `<text class="v-lab" x="${f1(cx + tr * Math.cos(m))}" y="${f1(cy - tr * Math.sin(m) + 4)}" text-anchor="middle">${it.t}</text>`; }
      } else if (k === 'dot') {
        g += `<circle class="v-pt" cx="${f1(X(it.p[0]))}" cy="${f1(Y(it.p[1]))}" r="4.5" style="fill:var(--accent)"/>`;
        if (it.t) { const tp = it.tp || [8, -8]; g += `<text class="v-lab" x="${f1(X(it.p[0]) + tp[0])}" y="${f1(Y(it.p[1]) + tp[1])}" text-anchor="${it.anchor || 'start'}">${it.t}</text>`; }
      } else {
        g += `<text class="v-lab ${it.c || ''}" x="${f1(X(it.p[0]))}" y="${f1(Y(it.p[1]))}" text-anchor="${it.anchor || 'middle'}">${it.t}</text>`;
      }
    });
    return g + '</svg>';
  }
  const pol = (r, deg) => [r * Math.cos(deg * D2R), r * Math.sin(deg * D2R)];
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];

  /* polar <-> Cartesian (first quadrant: the right triangle) */
  function polar() {
    const P = pol(6, 37);
    return scene({ axes: true, label: 'polar and Cartesian coordinates', H: 215, items: [
      { k: 'dash', a: [P[0], 0], b: P, t: 'y = r sin θ', tp: [38, 0] }, { k: 'dash', a: [0, 0], b: [P[0], 0], t: 'x = r cos θ', tp: [0, 18] },
      { a: [0, 0], b: P, c: 'a', t: 'r', tp: [-12, -6] }, { k: 'arc', c: [0, 0], r: 1.6, a0: 0, a1: 37, t: 'θ', tr: 1.5 }, { k: 'dot', p: P, t: 'P (x, y)', tp: [8, -8] }
    ] });
  }
  /* quadrant trap: calculator angle vs true angle (Example 3.1) */
  function quad() {
    const P = [-3.5, -2.5];
    return scene({ axes: true, label: 'angle in the third quadrant', H: 230, ext: [[-5, 4.2], [4.5, -4]], items: [
      { a: [0, 0], b: P, c: 'a', t: 'r = 4.30', tp: [30, 14] }, { k: 'dot', p: P, t: '(−3.50, −2.50)', tp: [-6, 18], anchor: 'start' },
      { k: 'arc', c: [0, 0], r: 0.9, a0: 0, a1: 215.5, t: 'θ = 216°', tr: 1.9 }, { k: 'arc', c: [0, 0], r: 2.2, a0: 180, a1: 215.5, t: '36°', tr: 1.25 },
      { p: [-0.5, 3.4], t: 'calculator gives −35.5°', anchor: 'end', c: 'b' }, { p: [-0.5, 2.7], t: 'x < 0 ⇒ add 180°', anchor: 'end', c: 'b' }
    ] });
  }
  /* head-to-tail addition */
  function addFig() {
    const A = [4, 1], B = [2, 3];
    return scene({ axes: false, label: 'adding two vectors head to tail', H: 215, items: [
      { a: [0, 0], b: A, c: 'a', t: 'A', tp: [0, 16] }, { a: A, b: add(A, B), c: 'b', t: 'B', tp: [14, 0] }, { a: [0, 0], b: add(A, B), c: 'g', t: 'R = A + B', tp: [-6, 30] },
      { k: 'dash', a: [0, 0], b: B }, { k: 'dash', a: B, b: add(A, B) }
    ] });
  }
  /* subtraction: A - B = A + (-B) */
  function subFig() {
    const A = [4, 3], B = [3, -1], nB = [-3, 1], R = [1, 4];
    return scene({ axes: false, label: 'subtracting vectors', H: 215, items: [
      { a: [0, 0], b: A, c: 'a', t: 'A', tp: [-8, -2] }, { a: [0, 0], b: B, c: 'b', t: 'B', tp: [0, 22] }, { k: 'dash', a: A, b: add(A, nB) }, { a: A, b: add(A, nB), c: 'b', t: '−B', tp: [0, -8] },
      { a: [0, 0], b: R, c: 'g', t: 'A − B', tp: [-30, 2] }
    ] });
  }
  /* components of a vector */
  function comps() {
    const A = pol(5.5, 35);
    return scene({ axes: true, label: 'x and y components', H: 215, ext: [[A[0] + 3.2, 0]], items: [
      { k: 'dash', a: [A[0], 0], b: A }, { a: [0, 0], b: [A[0], 0], c: 'b', t: 'Aₓ = A cos θ', tp: [0, 18] }, { a: [A[0], 0], b: A, c: 'b', t: 'A_y = A sin θ', tp: [42, 0] },
      { a: [0, 0], b: A, c: 'a', t: 'A', tp: [-12, -6] }, { k: 'arc', c: [0, 0], r: 1.5, a0: 0, a1: 35, t: 'θ', tr: 1.5 }
    ] });
  }
  /* direction words: N of E, W of N ... */
  function bearing() {
    return scene({ axes: false, label: 'direction words', H: 230, ext: [[-5, 5], [5, -5]], items: [
      { a: [-4.6, 0], b: [4.6, 0], c: 'm' }, { a: [0, -4.4], b: [0, 4.4], c: 'm' }, { p: [4.9, -0.2], t: 'E' }, { p: [-4.9, -0.2], t: 'W' }, { p: [0, 4.9], t: 'N' }, { p: [0, -4.8], t: 'S' },
      { a: [0, 0], b: pol(3.8, 37), c: 'a' }, { k: 'arc', c: [0, 0], r: 1.4, a0: 0, a1: 37, t: '37°', tr: 1.35 }, { p: [3.6, 3.3], t: '37° N of E', c: 'a', anchor: 'start' },
      { a: [0, 0], b: pol(3.8, 233), c: 'b' }, { k: 'arc', c: [0, 0], r: 1.4, a0: 270, a1: 233, t: '37°', tr: 1.5 }, { p: [-3.6, -3.7], t: '37° W of S', c: 'b', anchor: 'end' }
    ] });
  }
  /* max / min resultant */
  function maxmin() {
    const W = 340, H = 150;
    let g = `<svg viewBox="0 0 ${W} ${H}" class="vis" role="img" aria-label="maximum and minimum resultant"><defs>${defs}</defs>`;
    const row = (y, a, b, ra, lab) => {
      const s = 9.5, x0 = 20;
      g += `<line class="v-arr a" x1="${x0}" y1="${y}" x2="${x0 + a * s}" y2="${y}" marker-end="url(#vh-a)"/>`;
      if (ra === 'same') g += `<line class="v-arr b" x1="${x0 + a * s}" y1="${y}" x2="${x0 + (a + b) * s}" y2="${y}" marker-end="url(#vh-b)"/>`;
      else g += `<line class="v-arr b" x1="${x0 + a * s}" y1="${y}" x2="${x0 + (a - b) * s}" y2="${y}" marker-end="url(#vh-b)"/>`;
      g += `<text class="v-lab g" x="${x0 + 22 * s}" y="${y + 4}">${lab}</text>`;
    };
    row(40, 12, 8, 'same', 'R = 20'); row(100, 12, 8, 'opp', 'R = 4');
    g += `<text class="v-lab" x="20" y="16">same direction (θ = 0°)</text><text class="v-lab" x="20" y="76">opposite directions (θ = 180°)</text>`;
    return g + '</svg>';
  }
  /* Example 3.2: car 20 km N then 35 km at 60 deg W of N */
  function car() {
    const A = [0, 20], B = pol(35, 150), R = add(A, B);
    return scene({ axes: true, label: 'car trip: 20 km north then 35 km at 60° west of north', H: 235, pad: 34, items: [
      { a: [0, 0], b: A, c: 'a', t: 'A = 20 km', tp: [32, 0] }, { a: A, b: R, c: 'b', t: 'B = 35 km', tp: [30, -4] }, { a: [0, 0], b: R, c: 'g', t: 'R = 48.2 km', tp: [-52, 14] },
      { k: 'arc', c: A, r: 5, a0: 90, a1: 150, t: '60°', tr: 1.55 }
    ] });
  }
  /* Example 3.5: hiker */
  function hiker() {
    const A = [17.7, -17.7], B = [20, 34.6], R = add(A, B);
    return scene({ axes: true, label: 'hiker: day 1 and day 2', H: 235, items: [
      { a: [0, 0], b: A, c: 'a', t: 'A (25 km)', tp: [-52, 8] }, { a: A, b: R, c: 'b', t: 'B (40 km)', tp: [44, -12] }, { a: [0, 0], b: R, c: 'g', t: 'R', tp: [-12, 0] }
    ] });
  }
  /* 3D box */
  function box3d() {
    const W = 340, H = 235, ox = 110, oy = 190, sx = 14, sy = 14, k = [0.5, -0.4];
    // axes: x right, y into page (oblique), z up
    const px = (x, y, z) => ox + x * sx - y * sx * 0.55, py = (x, y, z) => oy - z * sy - y * sy * 0.45;
    const Rv = [8, 7, 5];
    let g = `<svg viewBox="0 0 ${W} ${H}" class="vis" role="img" aria-label="3D vector and its components"><defs>${defs}</defs>`;
    const L = (a, b, cls, extra) => `<line class="${cls}" x1="${f1(px.apply(0, a))}" y1="${f1(py.apply(0, a))}" x2="${f1(px.apply(0, b))}" y2="${f1(py.apply(0, b))}" ${extra || ''}/>`;
    g += L([0, 0, 0], [11, 0, 0], 'v-ln', 'marker-end="url(#vh-m)"') + L([0, 0, 0], [0, 11, 0], 'v-ln', 'marker-end="url(#vh-m)"') + L([0, 0, 0], [0, 0, 8], 'v-ln', 'marker-end="url(#vh-m)"');
    g += `<text class="v-lab" x="${px(11, 0, 0) + 6}" y="${py(11, 0, 0) + 4}">x</text><text class="v-lab" x="${px(0, 11, 0) + 4}" y="${py(0, 11, 0) - 4}">y</text><text class="v-lab" x="${px(0, 0, 8) - 4}" y="${py(0, 0, 8) - 6}">z</text>`;
    [[[Rv[0], 0, 0], [Rv[0], Rv[1], 0]], [[0, Rv[1], 0], [Rv[0], Rv[1], 0]], [[Rv[0], Rv[1], 0], Rv], [[Rv[0], 0, 0], [Rv[0], 0, Rv[2]]], [[0, 0, Rv[2]], [Rv[0], 0, Rv[2]]], [[Rv[0], 0, Rv[2]], Rv]].forEach((e) => { g += L(e[0], e[1], 'v-dash'); });
    g += L([0, 0, 0], Rv, 'v-arr a', 'marker-end="url(#vh-a)"');
    g += `<text class="v-lab a" x="${px.apply(0, Rv) + 8}" y="${py.apply(0, Rv) - 4}">R = (Rₓ, R_y, R_z)</text>`;
    g += `<text class="v-lab b" x="${px(4, 0, 0)}" y="${py(4, 0, 0) + 16}" text-anchor="middle">Rₓ</text><text class="v-lab b" x="${px(Rv[0], 4, 0) + 10}" y="${py(Rv[0], 4, 0) + 4}">R_y</text><text class="v-lab b" x="${px(Rv[0], 0, 2.5) + 8}" y="${py(Rv[0], 0, 2.5)}">R_z</text>`;
    return g + '</svg>';
  }

  const VEC = { scene, polar, quad, addFig, subFig, comps, bearing, maxmin, car, hiker, box3d };
  if (typeof module !== 'undefined' && module.exports) module.exports = VEC;
  root.VEC = VEC;
})(typeof window !== 'undefined' ? window : globalThis);
