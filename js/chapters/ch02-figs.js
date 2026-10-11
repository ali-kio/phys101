/* ====== رسومات ومشاهد تفاعلية (SVG / HTML) ====== */
(function (root) {
  'use strict';
  const G = root.FIG || require("./../core/fig.js");
  const num = G.num;

  const defs = `<defs>
    <marker id="ah-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="ah ah-a"/></marker>
    <marker id="ah-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="ah ah-b"/></marker>
    <marker id="ah-g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="ah ah-g"/></marker>
  </defs>`;

  /* خط أعداد مع علامات */
  function axis(x0, x1, step, W, L, y, labelFn) {
    const sx = (x) => L + (x - x0) / (x1 - x0) * (W - 2 * L);
    let s = `<line class="v-ln" x1="${L - 10}" y1="${y}" x2="${W - L + 14}" y2="${y}" marker-end="url(#ah-a)"/>`;
    for (let x = x0; x <= x1 + 1e-9; x += step) s += `<line class="v-tick" x1="${sx(x)}" y1="${y - 4}" x2="${sx(x)}" y2="${y + 4}"/><text class="v-lab" x="${sx(x)}" y="${y + 18}" text-anchor="middle">${labelFn ? labelFn(x) : num(x)}</text>`;
    return { s, sx };
  }

  /* 1) الإزاحة والمسافة: O → F → B */
  function disp() {
    const W = 340, H = 190, L = 22;
    const a = axis(0, 60, 10, W, L, 120);
    const sx = a.sx;
    let s = `<svg viewBox="0 0 ${W} ${H}" class="vis" role="img" aria-label="displacement vs distance">${defs}${a.s}`;
    s += `<text class="v-lab" x="${W - 6}" y="140" text-anchor="end">x (m)</text>`;
    [['O', 0], ['F', 60], ['B', 20]].forEach(([n, x]) => { s += `<circle class="v-pt" cx="${sx(x)}" cy="120" r="9"/><text class="v-pt-t" x="${sx(x)}" y="124" text-anchor="middle">${n}</text>`; });
    s += `<line class="v-arr a" x1="${sx(0)}" y1="84" x2="${sx(60) - 2}" y2="84" marker-end="url(#ah-a)"/>`;
    s += `<text class="v-lab a" x="${(sx(0) + sx(60)) / 2}" y="76" text-anchor="middle">O→F : Δx = +60 m</text>`;
    s += `<line class="v-arr b" x1="${sx(60)}" y1="100" x2="${sx(20) + 2}" y2="100" marker-end="url(#ah-b)"/>`;
    s += `<text class="v-lab b" x="${(sx(60) + sx(20)) / 2}" y="94" text-anchor="middle" dy="-0">F→B : Δx = −40 m</text>`;
    s += `<text class="v-lab" x="${W / 2}" y="168" text-anchor="middle">Δx (total) = 20 − 0 = +20 m</text>`;
    s += `<text class="v-lab g" x="${W / 2}" y="184" text-anchor="middle">d (total) = 60 + 40 = 100 m</text>`;
    return s + '</svg>';
  }

  /* 2) الحركة المنتظمة: السيارة والنخيل + ميل x–t */
  function uniform() {
    const pts = [[0, 10], [1, 20], [2, 30], [3, 40], [4, 50], [5, 60]];
    return G.graph({
      xmin: 0, xmax: 6, ymin: 0, ymax: 60, xs: 1, ys: 10, xl: 't (s)', yl: 'x (m)', label: 'uniform motion x-t',
      lines: [{ pts: [[0, 10], [5, 60]] }, { pts: [[1.5, 25], [3.5, 25], [3.5, 45]], cls: 'g-dash' }],
      dots: pts, texts: [{ x: 2.5, y: 21, t: 'Δt = 2 s', cls: 'warn' }, { x: 4.35, y: 35, t: 'Δx = 20 m', cls: 'warn' }, { x: 1.3, y: 52, t: 'v = Δx/Δt = 10 m/s', anchor: 'start' }]
    });
  }

  /* 3) جدول التسارع المنتظم (سلايد الدكتور: 0 → 24 m/s خلال 5 s) */
  function accTable() {
    const v = [0, 4.8, 9.6, 14.4, 19.2, 24], names = ['O', 'A', 'B', 'C', 'D', 'E'];
    const x = v.map((vv, i) => (i === 0 ? 0 : (v[0] + vv) / 2 * i)); // من O
    const xs = [0, 2.4, 9.6, 21.6, 38.4, 60];
    let h = '<div class="tbl-wrap"><table class="tbl"><tr><th></th>' + names.map((n) => `<th>${n}</th>`).join('') + '</tr>';
    h += '<tr><th>t (s)</th>' + v.map((_, i) => `<td>${i}</td>`).join('') + '</tr>';
    h += '<tr><th>x (m)</th>' + xs.map((q) => `<td>${num(q)}</td>`).join('') + '</tr>';
    h += '<tr><th>v (m/s)</th>' + v.map((q) => `<td>${num(q)}</td>`).join('') + '</tr>';
    h += '<tr><th>Δv</th><td>—</td>' + v.slice(1).map(() => '<td>4.8</td>').join('') + '</tr></table></div>';
    return h;
  }

  /* 4) إشارة v و a */
  function accSign() {
    const row = (v, a, res, cls) => `<div class="sg ${cls}"><div class="sg-arrs"><span>v ${v}</span><span>a ${a}</span></div><div class="sg-res">${res}</div></div>`;
    return '<div class="sg-grid">' +
      row('→ (+)', '→ (+)', 'speed increases', 'up') + row('→ (+)', '← (−)', 'speed decreases', 'down') +
      row('← (−)', '← (−)', 'speed increases', 'up') + row('← (−)', '→ (+)', 'speed decreases', 'down') + '</div>';
  }

  /* 5) السقوط الحر من السكون */
  function fall() {
    const W = 340, H = 300, ax = 90, top = 20, S = 3; // 3 px لكل متر
    let s = `<svg viewBox="0 0 ${W} ${H}" class="vis" role="img" aria-label="free fall">${defs}`;
    s += `<line class="v-ln" x1="${ax}" y1="${top - 10}" x2="${ax}" y2="${H - 6}" marker-start="url(#ah-a)"/><text class="v-lab" x="${ax + 8}" y="${top - 2}">y (m)</text>`;
    [[0, 0], [1, -5], [2, -20], [3, -45], [4, -80]].forEach(([t, y], i) => {
      const py = top + 10 - y * S * 0.9;
      s += `<circle class="v-ball" cx="${ax}" cy="${py}" r="7"/><line class="v-tick" x1="${ax - 5}" y1="${py}" x2="${ax + 5}" y2="${py}"/>`;
      s += `<text class="v-lab" x="${ax - 14}" y="${py + 4}" text-anchor="end">${y}</text>`;
      s += `<text class="v-lab ${i % 2 ? 'a' : 'b'}" x="${ax + 18}" y="${py + 4}">t = ${t} s :  v = ${-10 * t} m/s</text>`;
    });
    s += `<text class="v-lab g" x="${W - 8}" y="40" text-anchor="end">a = −g = −10 m/s²</text><line class="v-arr g" x1="${W - 22}" y1="50" x2="${W - 22}" y2="90" marker-end="url(#ah-g)"/>`;
    return s + '</svg>';
  }

  /* 6) الرمي للأعلى: تناظر الصعود والنزول (v0 = 20 m/s) */
  function updown() {
    const W = 340, H = 250, bot = 220, S = 8; // 8 px لكل متر
    const yy = (y) => bot - y * S;
    let s = `<svg viewBox="0 0 ${W} ${H}" class="vis" role="img" aria-label="up and down symmetry">${defs}`;
    s += `<line class="v-ln" x1="170" y1="${bot + 6}" x2="170" y2="14" marker-end="url(#ah-a)"/>`;
    [[0, 20, 'v₀'], [15, 10, ''], [20, 0, '']].forEach(([y, v, n]) => {
      const py = yy(y);
      s += `<line class="v-tick h" x1="40" y1="${py}" x2="300" y2="${py}"/><text class="v-lab" x="34" y="${py + 4}" text-anchor="end">${y} m</text>`;
      if (v > 0) {
        s += `<circle class="v-ball up" cx="130" cy="${py}" r="6"/><text class="v-lab a" x="118" y="${py + 4}" text-anchor="end">↑ ${v}</text>`;
        s += `<circle class="v-ball dn" cx="210" cy="${py}" r="6"/><text class="v-lab b" x="222" y="${py + 4}">↓ ${-v}</text>`;
      } else {
        s += `<circle class="v-ball top" cx="170" cy="${py}" r="6"/><text class="v-lab g" x="182" y="${py - 8}">top: v = 0 , a = −10 m/s²</text>`;
      }
    });
    s += `<text class="v-lab" x="60" y="${H - 4}">up: 2 s</text><text class="v-lab" x="230" y="${H - 4}">down: 2 s</text>`;
    return s + '</svg>';
  }

  /* مخطط سلايد الدكتور (سيارة النخيل): x–t */
  function docGraph() {
    const lin = [[0, 10], [5, 60]];
    const up = [], dn = [];
    for (let t = 5; t <= 6.0001; t += 0.1) up.push([t, 60 + 10 * (t - 5) - 5 * (t - 5) * (t - 5)]);
    for (let t = 6; t <= 8.3716; t += 0.1) dn.push([t, 65 - 6.25 * (t - 6) * (t - 6)]);
    const tail = []; const v1 = 6.25 * 2 * 2.3716; // سرعة تقريبية عند C
    for (let k = 0; k <= 10; k++) { const tt = k / 10 * 0.75; tail.push([8.3716 + tt, 30 - 28 * tt + 0.5 * 37 * tt * tt]); }
    const curve = up.concat(dn).concat(tail.map((p) => [p[0], Math.max(20, p[1])]));
    const end = tail[tail.length - 1];
    return G.graph({
      xmin: 0, xmax: 10, ymin: 0, ymax: 70, xs: 1, ys: 10, xl: 't (s)', yl: 'x (m)', h: 260, label: 'doctor x-t graph',
      lines: [{ pts: lin }, { pts: curve }], dots: [[0, 10], [1, 20], [2, 30], [3, 40], [4, 50], [5, 60], [6, 65], [8, 40], [8.3716, 30]],
      texts: [{ x: 0.35, y: 14, t: 'A' }, { x: 1.3, y: 24, t: 'B' }, { x: 2.3, y: 34, t: 'C' }, { x: 3.3, y: 44, t: 'D' }, { x: 4.3, y: 54, t: 'E' }, { x: 5.3, y: 63, t: 'F' }, { x: 6, y: 68, t: 'G' }, { x: 8.5, y: 43, t: '2nd D' }, { x: 9.25, y: 32, t: '2nd C' }]
    });
  }

  /* مخطط اختبار الدكتور: متوسط السرعة بين A و D */
  function xtTest() {
    const pts = [[0, 50], [0.5, 62], [1, 70], [1.5, 82], [2, 92], [2.4, 95], [3, 90], [3.5, 74], [4, 54], [4.5, 36], [5, 20]];
    return G.graph({
      xmin: 0, xmax: 5, ymin: 0, ymax: 100, xs: 1, ys: 20, xl: 't (s)', yl: 'x (m)', h: 250, label: 'doctor test x-t graph',
      lines: [{ pts }, { pts: [[0, 50], [3, 90]], cls: 'g-dash' }], dots: [[0, 50], [1, 70], [2, 92], [3, 90], [4, 54], [5, 20]],
      texts: [{ x: 0.25, y: 45, t: 'A' }, { x: 1, y: 76, t: 'B' }, { x: 2, y: 98, t: 'C' }, { x: 3.2, y: 95, t: 'D' }, { x: 4.2, y: 58, t: 'E' }, { x: 5, y: 26, t: 'F', anchor: 'end' }, { x: 1.5, y: 40, t: 'Δx = 40 m', cls: 'warn' }, { x: 1.5, y: 30, t: 'Δt = 3.0 s', cls: 'warn' }]
    });
  }

  /* ===== مثال الدكتور المحوري: السيارة عند الإشارة (7 خطوات) ===== */
  const STEPS = [
    { t0: 0, t1: 4, x0: -30, v0: 0, a: 2.5, ph: 'up' },
    { t0: 4, t1: 7, x0: -10, v0: 10, a: 0, ph: 'zero' },
    { t0: 7, t1: 9, x0: 20, v0: 10, a: -5, ph: 'down' },
    { t0: 9, t1: 14, x0: 30, v0: 0, a: 0, ph: 'zero' },
    { t0: 14, t1: 15.3333, x0: 30, v0: 0, a: -11.25, ph: 'up' },
    { t0: 15.3333, t1: 16, x0: 20, v0: -15, a: 0, ph: 'zero' },
    { t0: 16, t1: 18.6667, x0: 10, v0: -15, a: 5.625, ph: 'down' }
  ];
  const TEND = 18.6667;
  function state(t) {
    let s = STEPS[STEPS.length - 1];
    for (const st of STEPS) if (t >= st.t0 && t < st.t1) { s = st; break; }
    const tau = Math.min(t, TEND) - s.t0;
    return { x: s.x0 + s.v0 * tau + 0.5 * s.a * tau * tau, v: s.v0 + s.a * tau, a: s.a, ph: s.ph, step: STEPS.indexOf(s) + 1 };
  }
  function seriesLines(fn, cursorT, ymin, ymax) {
    const lines = STEPS.map((st) => {
      const pts = []; const n = 30;
      for (let k = 0; k <= n; k++) { const t = st.t0 + (st.t1 - st.t0) * k / n; pts.push([t, fn(st, t - st.t0)]); }
      return { pts, cls: 'ph-' + st.ph };
    });
    lines.push({ pts: [[cursorT, ymin], [cursorT, ymax]], cls: 'g-cursor' });
    return lines;
  }
  function carPlots(t) {
    const mk = (fn, ymin, ymax, ys, yl, h) => G.graph({ xmin: 0, xmax: 19, ymin, ymax, xs: 2, ys, xl: 't (s)', yl, h, lines: seriesLines(fn, t, ymin, ymax) });
    const px = mk((s, tau) => s.x0 + s.v0 * tau + 0.5 * s.a * tau * tau, -30, 30, 10, 'x (m)', 170);
    const pv = mk((s, tau) => s.v0 + s.a * tau, -15, 15, 5, 'v (m/s)', 170);
    const pa = mk((s) => s.a, -15, 5, 5, 'a (m/s²)', 170);
    return { px, pv, pa };
  }
  function carRoad(x) {
    const W = 340, L = 22, sx = (v) => L + (v + 35) / 70 * (W - 2 * L), y = 62;
    let s = `<svg viewBox="0 0 ${W} 96" class="vis" role="img" aria-label="car on x axis">${defs}<line class="v-ln" x1="${L - 8}" y1="${y}" x2="${W - L + 12}" y2="${y}" marker-end="url(#ah-a)"/>`;
    for (let v = -30; v <= 30; v += 10) s += `<line class="v-tick" x1="${sx(v)}" y1="${y - 4}" x2="${sx(v)}" y2="${y + 4}"/><text class="v-lab" x="${sx(v)}" y="${y + 18}" text-anchor="middle">${v}</text>`;
    s += `<rect class="v-light" x="${sx(33)}" y="14" width="10" height="26" rx="3"/><circle class="v-lamp" cx="${sx(33) + 5}" cy="21" r="3"/><circle class="v-lamp g" cx="${sx(33) + 5}" cy="33" r="3"/>`;
    const cx = sx(x);
    s += `<g class="v-car"><rect x="${cx - 18}" y="${y - 24}" width="36" height="14" rx="5"/><rect x="${cx - 10}" y="${y - 32}" width="20" height="10" rx="4"/><circle cx="${cx - 10}" cy="${y - 9}" r="5"/><circle cx="${cx + 10}" cy="${y - 9}" r="5"/></g>`;
    return s + '</svg>';
  }
  const PH = { up: ['Speeding up', 'ph-up'], down: ['Slowing down', 'ph-down'], zero: ['Constant velocity (a = 0)', 'ph-zero'] };
  function mountCarDemo(el) {
    el.innerHTML = `<div class="demo">
      <div class="demo-road"></div>
      <div class="demo-read"></div>
      <div class="demo-ctl"><button class="btn small" data-play>▶ Play</button><input type="range" min="0" max="${TEND}" step="0.02" value="0" aria-label="Time"><span class="demo-t"></span></div>
      <div class="demo-plots"></div>
      <div class="demo-legend"><span class="ph-up">Green: speeding up</span><span class="ph-zero">Grey: a = 0</span><span class="ph-down">Red: slowing down</span></div>
    </div>`;
    const range = el.querySelector('input'), road = el.querySelector('.demo-road'), read = el.querySelector('.demo-read'), plots = el.querySelector('.demo-plots'), tl = el.querySelector('.demo-t'), btn = el.querySelector('[data-play]');
    function draw(t) {
      const s = state(t);
      road.innerHTML = carRoad(s.x);
      const ph = PH[s.ph];
      read.innerHTML = `<div class="rd"><b>x</b><span class="m">${num(s.x, 1)} m</span></div><div class="rd"><b>v</b><span class="m">${num(s.v, 1)} m/s</span></div><div class="rd"><b>a</b><span class="m">${num(s.a, 2)} m/s²</span></div><div class="rd wide ${ph[1]}">Stage <span class="m">${s.step}</span> — ${ph[0]}</div>`;
      const p = carPlots(t);
      plots.innerHTML = `<div class="pl"><h4>x–t</h4>${p.px}</div><div class="pl"><h4>v–t</h4>${p.pv}</div><div class="pl"><h4>a–t</h4>${p.pa}</div>`;
      tl.textContent = 't = ' + num(t, 1) + ' s';
    }
    let timer = null;
    function stop() { if (timer) { clearInterval(timer); timer = null; btn.textContent = '▶ Play'; } }
    range.addEventListener('input', () => { stop(); draw(+range.value); });
    btn.addEventListener('click', () => {
      if (timer) { stop(); return; }
      if (+range.value >= TEND - 0.05) range.value = 0;
      btn.textContent = '⏸ Pause';
      timer = setInterval(() => { let v = +range.value + 0.1; if (v >= TEND) { v = TEND; stop(); } range.value = v; draw(v); }, 50);
    });
    draw(0);
  }


  /* 8) سيارة النخيل: سرعة 10 m/s وبين كل نخلتين 10 m */
  function palmRoad() {
    const W = 340, H = 176, sx = (x) => 30 + (x - 10) / 50 * 280;
    let s = `<svg viewBox="0 0 ${W} ${H}" class="vis" role="img" aria-label="car passing palm trees">${defs}`;
    s += `<rect x="0" y="108" width="${W}" height="30" class="v-road"/><line x1="0" y1="123" x2="${W}" y2="123" class="v-dash"/>`;
    for (let x = 10; x <= 60; x += 10) {
      const cx = sx(x);
      s += `<path d="M${cx} 108 C${cx - 2} 90 ${cx + 2} 76 ${cx} 62" class="v-trunk"/><path d="M${cx} 62 q-18 -4 -24 10 M${cx} 62 q18 -4 24 10 M${cx} 62 q-10 -14 -22 -8 M${cx} 62 q10 -14 22 -8 M${cx} 62 q0 -16 0 -18" class="v-frond"/>`;
      s += `<text class="v-lab" x="${cx}" y="152" text-anchor="middle">${x === 10 ? 'x = 10 m' : x}</text><text class="v-lab a" x="${cx}" y="28" text-anchor="middle">${(x - 10) / 10} s</text>`;
    }
    s += `<g class="v-car"><rect x="6" y="96" width="34" height="13" rx="5"/><rect x="14" y="88" width="18" height="10" rx="4"/><circle cx="16" cy="110" r="4.5"/><circle cx="31" cy="110" r="4.5"/></g>`;
    s += `<line class="v-arr a" x1="46" y1="102" x2="86" y2="102" marker-end="url(#ah-a)"/>`;
    s += `<text class="v-lab a" x="6" y="171">v = 36 km/h = 10 m/s</text><text class="v-lab g" x="${W - 6}" y="171" text-anchor="end">10 m / 1 s</text>`;
    return s + '</svg>';
  }

  /* 9) حجر من سطح مبنى 50 m (A: اليد، B: القمة، D: t = 5 s، G: الأرض) */
  function building() {
    const W = 340, H = 190, gy = 160, k = 1.7, ay = gy - 50 * k;
    const Y = (y) => ay - y * k;
    let s = `<svg viewBox="0 0 ${W} ${H}" class="vis" role="img" aria-label="stone thrown from a building roof">${defs}`;
    s += `<rect x="20" y="${gy}" width="${W - 40}" height="8" class="v-ground"/><rect x="40" y="${ay}" width="80" height="${gy - ay}" class="v-bld"/>`;
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) s += `<rect x="${52 + c * 24}" y="${ay + 10 + r * 20}" width="14" height="11" class="v-win"/>`;
    s += `<circle cx="108" cy="${ay - 9}" r="4" class="v-pt"/><line x1="108" y1="${ay - 5}" x2="108" y2="${ay}" class="v-tick"/>`;
    s += `<line x1="140" y1="${Y(25) + 14}" x2="140" y2="${gy}" class="v-dashv"/><line x1="120" y1="${ay}" x2="230" y2="${ay}" class="v-tick h"/>`;
    const pts = [['B', 20, 'top: t = 2 s, v = 0'], ['A', 0, 'hand: t = 0, v = +20'], ['D', -25, 't = 5 s: y = −25, v = −30'], ['G', -50, 'ground: y = −50']];
    pts.forEach(([n, y, t]) => { s += `<circle class="v-pt" cx="140" cy="${Y(y)}" r="8"/><text class="v-pt-t" x="140" y="${Y(y) + 4}" text-anchor="middle">${n}</text><text class="v-lab" x="154" y="${Y(y) + 4}">${t}</text>`; });
    s += `<line class="v-arr b" x1="126" y1="${Y(0)}" x2="126" y2="${Y(18)}" marker-end="url(#ah-b)"/><text class="v-lab" x="20" y="${ay - 18}">H = 50 m</text>`;
    s += `<line class="v-tick" x1="34" y1="${ay}" x2="34" y2="${gy}"/>`;
    return s + '</svg>';
  }

  const VIS = { palmRoad, building, disp, uniform, accTable, accSign, fall, updown, docGraph, xtTest, mountCarDemo, state, STEPS, TEND };
  if (typeof module !== 'undefined' && module.exports) module.exports = VIS;
  root.VIS = VIS;
})(typeof window !== 'undefined' ? window : globalThis);
