/* أدوات الأرقام والرسوم البيانية (SVG) */
(function (root) {
  'use strict';
  function num(n, d) {
    d = d == null ? 2 : d;
    let s = (+n).toFixed(d);
    if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
    if (s === '-0') s = '0';
    return s.replace('-', '−');
  }
  function niceStep(range) {
    const c = [1, 2, 5, 10, 20, 25, 50, 100];
    for (const s of c) if (range / s <= 8) return s;
    return 100;
  }
  function graph(o) {
    const W = 340, H = o.h || 230, L = 46, R = 16, T = 24, B = 38;
    const xs = o.xs || niceStep(o.xmax - o.xmin), ys = o.ys || niceStep(o.ymax - o.ymin);
    const sx = (x) => L + (x - o.xmin) / (o.xmax - o.xmin) * (W - L - R);
    const sy = (y) => H - B - (y - o.ymin) / (o.ymax - o.ymin) * (H - T - B);
    let s = `<svg viewBox="0 0 ${W} ${H}" class="graph" role="img" aria-label="${o.label || 'graph'}">`;
    for (let x = Math.ceil(o.xmin / xs) * xs; x <= o.xmax + 1e-9; x += xs) {
      s += `<line class="g-grid" x1="${sx(x)}" y1="${T}" x2="${sx(x)}" y2="${H - B}"/>`;
      s += `<text class="g-txt" x="${sx(x)}" y="${H - B + 14}" text-anchor="middle">${num(x)}</text>`;
    }
    for (let y = Math.ceil(o.ymin / ys) * ys; y <= o.ymax + 1e-9; y += ys) {
      s += `<line class="g-grid" x1="${L}" y1="${sy(y)}" x2="${W - R}" y2="${sy(y)}"/>`;
      s += `<text class="g-txt" x="${L - 6}" y="${sy(y) + 4}" text-anchor="end">${num(y)}</text>`;
    }
    if (o.ymin <= 0 && o.ymax >= 0) s += `<line class="g-axis" x1="${L}" y1="${sy(0)}" x2="${W - R}" y2="${sy(0)}"/>`;
    if (o.xmin <= 0 && o.xmax >= 0) s += `<line class="g-axis" x1="${sx(0)}" y1="${T}" x2="${sx(0)}" y2="${H - B}"/>`;
    (o.lines || []).forEach((ln) => {
      s += `<polyline class="g-line ${ln.cls || ''}" fill="none" points="${ln.pts.map((p) => sx(p[0]).toFixed(1) + ',' + sy(p[1]).toFixed(1)).join(' ')}"/>`;
    });
    (o.texts || []).forEach((tx) => { s += `<text class="g-txt g-note ${tx.cls || ''}" x="${sx(tx.x)}" y="${sy(tx.y)}" text-anchor="${tx.anchor || 'middle'}">${tx.t}</text>`; });
    (o.dots || []).forEach((p) => { s += `<circle class="g-dot" cx="${sx(p[0])}" cy="${sy(p[1])}" r="4"/>`; });
    s += `<text class="g-txt g-lab" x="${(L + W - R) / 2}" y="${H - 4}" text-anchor="middle">${o.xl}</text>`;
    s += `<text class="g-txt g-lab" x="6" y="12" text-anchor="start">${o.yl}</text>`;
    return s + '</svg>';
  }
  function rangeOf(vals, pad) {
    let lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals);
    const st = niceStep(Math.max(hi - lo, 1));
    lo = Math.floor(lo / st) * st; hi = Math.ceil(hi / st) * st;
    if (lo === hi) hi = lo + st;
    return [lo, hi, st];
  }

  function parseNum(s) {
    if (s == null) return NaN;
    s = String(s).trim()
      .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
      .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
      .replace(/[٫,،]/g, '.').replace(/[−–—]/g, '-').replace(/\s+/g, '');
    if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(s)) return NaN;
    return parseFloat(s);
  }
  function checkNum(q, input) {
    const u = parseNum(input);
    if (!isFinite(u)) return null;
    const tol = q.tol != null ? q.tol : Math.max(0.02, Math.abs(q.ans) * 0.015);
    return Math.abs(u - q.ans) <= tol;
  }
  const API = { num, graph, rangeOf, niceStep, parseNum, checkNum };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  root.FIG = API; root.ENGINE = API;
})(typeof window !== 'undefined' ? window : globalThis);
