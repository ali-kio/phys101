/* Shared view components: icons, math (KaTeX), formula cards, examples, questions */
(function (root) {
  'use strict';
  const ST = root.STORE, REV = root.REV, FIG = root.FIG;

  const P = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-5h4v5"/>',
    repeat: '<path d="M17 2.5 21 6l-4 3.5"/><path d="M3 11V9.5A3.5 3.5 0 0 1 6.5 6H21"/><path d="M7 21.5 3 18l4-3.5"/><path d="M21 13v1.5a3.5 3.5 0 0 1-3.5 3.5H3"/>',
    sigma: '<path d="M18 6.5V4.5H6.5L12.5 12l-6 7.5H18v-2"/>',
    star: '<path d="m12 3.2 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    alert: '<path d="M12 3.5 22 20.5H2z"/><path d="M12 10v4.5M12 17.5h.01"/>',
    notebook: '<path d="M6 3.5h12v17H6z"/><path d="M9.5 8h5M9.5 12h5M9.5 16h3"/>',
    timer: '<circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2.5 2M9.5 2.5h5"/>',
    printer: '<path d="M7 9V3.5h10V9"/><rect x="3.5" y="9" width="17" height="8" rx="2"/><path d="M7 14h10v6.5H7z"/>',
    image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m20.5 16-5-5-8 8.5"/>',
    sliders: '<path d="M4 6.5h9M17 6.5h3M4 12h3M11 12h9M4 17.5h11M19 17.5h1"/><circle cx="15" cy="6.5" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="17.5" r="2"/>',
    menu: '<path d="M4 6.5h16M4 12h16M4 17.5h16"/>',
    arrow: '<path d="M3 12h15M13 6.5l5.5 5.5-5.5 5.5"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    bolt: '<path d="M13 2.5 4.5 14H11l-1 7.5L19.5 10H13z"/>',
    download: '<path d="M12 3.5v12M7 11l5 5 5-5M4.5 20.5h15"/>',
    upload: '<path d="M12 16V4M7 8.5l5-5 5 5M4.5 20.5h15"/>',
    copy: '<rect x="8.5" y="8.5" width="12" height="12" rx="2"/><path d="M15.5 8.5v-3a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/>',
    book: '<path d="M2.5 5.5h6.5a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2h-7.5z"/><path d="M21.5 5.5H15a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7.5z"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    list: '<path d="M8 6.5h12M8 12h12M8 17.5h12M4 6.5h.01M4 12h.01M4 17.5h.01"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".6"/>'
  };
  const ic = (n, cls) => `<svg class="ic ${cls || ''}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || ''}</svg>`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const num = FIG.num;
  const gid = (ch, t, id) => ch.key + ':' + t + ':' + id;

  function math(el) {
    if (!el) return;
    if (root.renderMathInElement) { try { root.renderMathInElement(el, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false }); } catch (e) { /* ignore */ } }
    try { terms(el); } catch (e) { /* ignore */ }
  }

  /* ---------- hard words: dotted underline; hover (laptop) or tap shows a small box with the Arabic meaning ---------- */
  let TERM = null;
  function termIndex() {
    if (TERM) return TERM;
    const map = {};
    (root.CHAPTERS || []).forEach((ch) => (ch.glossary || []).concat(ch.words || []).forEach((g) => { const k = g[0].toLowerCase(); if (!/[\/(]/.test(k) && !map[k]) map[k] = g[1]; }));
    const keys = Object.keys(map).sort((a, b) => b.length - a.length);
    const pat = keys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + (/^[a-z]+$/.test(k) ? '(?:s|es|ed|d|ing)?' : ''));
    TERM = { map, re: pat.length ? new RegExp('\\b(' + pat.join('|') + ')\\b', 'gi') : null };
    return TERM;
  }
  const termAr = (w) => { const m = termIndex().map, t = w.toLowerCase(); if (m[t]) return m[t]; for (const suf of ['ing', 'ed', 'es', 's', 'd']) if (t.endsWith(suf) && m[t.slice(0, -suf.length)]) return m[t.slice(0, -suf.length)]; return null; };
  const TERM_SEL = '.qb, .prob, .fnote, .chg, .pairg p, .pairt, .fwhen, .fnot, .falt, .ffrom, .ltip, .note, .famuse, .famwhen, .recaprow, .tablewrap td, .tablewrap th, .tbody > p, .hintbox .htype, .steps, .subst, .nbh + ul';
  function terms(el) {
    const T = termIndex(); if (!T.re) return;
    const list = el.matches && el.matches(TERM_SEL) ? [el] : Array.from(el.querySelectorAll(TERM_SEL));
    list.forEach((c) => {
      if (c.closest('[data-exam]') || c.closest('.ar2,.exp,.ar')) return;
      const w = document.createTreeWalker(c, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.parentElement.closest('.katex,.term,button,input,svg,code,.ar2,.exp,.ar,script,style') || !/[A-Za-z]{3}/.test(n.nodeValue)) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
      const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
      nodes.forEach((n) => {
        T.re.lastIndex = 0; const txt = n.nodeValue; let last = 0, m, frag = null;
        while ((m = T.re.exec(txt))) {
          const ar = termAr(m[0]); if (!ar) continue;
          frag = frag || document.createDocumentFragment();
          frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
          const sp = document.createElement('span'); sp.className = 'term'; sp.tabIndex = 0; sp.dataset.ar = ar; sp.textContent = m[0]; frag.appendChild(sp); last = m.index + m[0].length;
        }
        if (frag) { frag.appendChild(document.createTextNode(txt.slice(last))); n.parentNode.replaceChild(frag, n); }
      });
    });
  }
  let pop = null, popT = null, popFor = null;
  function hidePop() { clearTimeout(popT); if (pop) pop.hidden = true; popFor = null; }
  function showPop(t) {
    if (!pop) { pop = document.createElement('div'); pop.id = 'termpop'; pop.setAttribute('role', 'tooltip'); document.body.appendChild(pop); }
    pop.innerHTML = `<b></b> <span dir="rtl"></span>`; pop.firstChild.textContent = t.textContent; pop.lastChild.textContent = '(' + t.dataset.ar + ')';
    pop.hidden = false; popFor = t;
    const r = t.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
    let x = Math.min(Math.max(8, r.left + r.width / 2 - pw / 2), window.innerWidth - pw - 8), y = r.bottom + 8;
    if (y + ph > window.innerHeight - 8) y = Math.max(8, r.top - ph - 8);
    pop.style.left = x + 'px'; pop.style.top = y + 'px';
  }
  function initTerms() {
    if (typeof document === 'undefined' || initTerms.done) return; initTerms.done = true;
    document.addEventListener('mouseover', (e) => { const t = e.target.closest && e.target.closest('.term'); if (!t) return; clearTimeout(popT); popT = setTimeout(() => showPop(t), 280); });
    document.addEventListener('mouseout', (e) => { const t = e.target.closest && e.target.closest('.term'); if (t) { clearTimeout(popT); popT = setTimeout(hidePop, 120); } });
    document.addEventListener('click', (e) => { const t = e.target.closest && e.target.closest('.term'); if (t) { if (popFor === t && pop && !pop.hidden) hidePop(); else showPop(t); } else hidePop(); });
    document.addEventListener('focusin', (e) => { if (e.target.classList && e.target.classList.contains('term')) showPop(e.target); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hidePop(); });
    window.addEventListener('scroll', hidePop, { passive: true });
  }

  const star = (g) => { const on = ST.S.stars[g]; return `<button class="star ${on ? 'on' : ''}" data-act="star" data-gid="${g}" aria-label="Save" aria-pressed="${!!on}">${ic('star')}</button>`; };

  /* several formulas written side by side (\qquad / \quad) are stacked one under another */
  const stack = (tex) => { const parts = String(tex).split(/\s*\\q{1,2}uad\s*/).filter(Boolean); return parts.length > 1 ? `\\begin{gathered}${parts.join('\\\\[7pt]')}\\end{gathered}` : tex; };
  const ftex = (tex) => `<div class="ftex">$$${stack(tex)}$$</div>`;
  const bi = (en, ar) => `${en || ''}${ar ? `<span class="ar2">${ar}</span>` : ''}`;
  const byId = (ch, id) => ch.laws.find((x) => x.id === id);

  /* Example: problem, then the LAW, then neat substitution lines, then the answer */
  function exBody(b) {
    return `<div class="example"><div class="eh"><span>Example</span>${b.src ? `<span class="src">${b.src}</span>` : ''}</div><div class="eb"><p class="prob">${b.p}</p>${b.fig ? `<div class="visbox">${b.fig}</div>` : ''}${b.law ? `<div class="exlaw"><span class="exl">Law</span>${ftex(b.law)}</div>` : ''}<div class="exl2">Substitute</div><ol class="subst">${b.steps.map((st) => `<li>${st}</li>`).join('')}</ol><div class="ans"><span class="exl">Answer</span>${b.a}</div>${b.ar ? `<div class="exp small">${b.ar}</div>` : ''}</div></div>`;
  }
  const exDet = (ex, open) => `<details class="lex" ${open ? 'open' : ''}><summary>Worked example</summary>${exBody(ex)}</details>`;
  function lawInner(ch, l, o) {
    o = o || {};
    const from = l.from ? (l.from.ids || []).map((id) => byId(ch, id)).filter(Boolean).map((x) => `<span class="chip">${x.name}</span>`).join(' ') : '';
    return `${l.ar ? `<div class="exp lar">${l.ar}</div>` : ''}
      ${l.when ? `<p class="fwhen"><b>Use it when:</b> ${bi(l.when, l.whenAr)}</p>` : ''}
      ${l.not ? `<p class="fnot"><b>Do not use it when:</b> ${bi(l.not, l.notAr)}</p>` : ''}
      ${l.alt ? `<p class="falt"><b>Other method (not solved here):</b> ${bi(l.alt, l.altAr)}</p>` : ''}
      ${l.from ? `<p class="ffrom"><b>Comes from:</b> ${from} ${bi(l.from.en, l.from.ar)}</p>` : ''}
      ${l.tip ? `<div class="ltip">${ic('bulb')}<div>${bi(l.tip, l.tipAr)}</div></div>` : ''}${l.ex ? exDet(Object.assign({ law: l.exlaw || l.tex }, l.ex), o.exOpen) : ''}`;
  }
  function lawCard(ch, l, o) {
    const g = gid(ch, 'l', l.id);
    return `<div class="formula" data-gid="${g}"><div class="fh"><span class="fn">${l.name}</span>${star(g)}</div>
      ${ftex(l.tex)}${l.note ? `<p class="fnote">${bi(l.note, l.noteAr)}</p>` : ''}${lawInner(ch, l, o)}</div>`;
  }
  /* several related formulas in ONE card, stacked; each keeps its own "use it when", tip and example */
  function lawGroup(ch, title, ids, o) {
    return `<div class="formula multi"><div class="fh"><span class="fn">${title}</span></div>${ids.map((id) => {
      const l = byId(ch, id), g = gid(ch, 'l', id);
      return `<div class="fsub" data-gid="${g}"><div class="fsh"><b>${l.name}</b>${star(g)}</div>${ftex(l.tex)}${l.note ? `<p class="fnote">${bi(l.note, l.noteAr)}</p>` : ''}${lawInner(ch, l, o)}</div>`;
    }).join('')}</div>`;
  }

  /* ---- law family card: one glance = all laws of a topic, what each one is for, how they connect ---- */
  function famCard(ch, f) {
    const row = (id) => { const l = byId(ch, id); return l ? `<div class="famrow"><b>${l.name}</b>${ftex(l.tex)}<span class="famwhen">${l.when || ''}</span></div>` : ''; };
    return `<section class="fam"><div class="famh"><span class="famt">${f.title}</span>${f.titleAr ? `<span class="famar">${f.titleAr}</span>` : ''}</div>
      <p class="famuse"><b>Use this family when:</b> ${bi(f.use, f.useAr)}</p>
      ${f.groups.map((g) => `<div class="famg"><div class="famgl">${g.label}${g.ar ? `<span class="famar"> · ${g.ar}</span>` : ''}</div>${g.ids.map(row).join('')}</div>`).join('')}
      ${f.not ? `<p class="fnot"><b>Not for:</b> ${bi(f.not, f.notAr)}</p>` : ''}
      ${f.links && f.links.length ? `<div class="famg"><div class="famgl">How they connect</div><ul class="famlinks">${f.links.map((k) => `<li><span class="chip">${(byId(ch, k.a) || { name: k.a }).name}</span> <span class="arr">→</span> <span class="chip">${(byId(ch, k.b) || { name: k.b }).name}</span> ${bi(k.en, k.ar)}</li>`).join('')}</ul></div>` : ''}</section>`;
  }
  /* ---- "Which law do I use?": given -> need -> law ---- */
  function chooser(ch) {
    if (!ch.chooser || !ch.chooser.length) return '';
    return `<h2>Which law do I use?</h2><p class="muted small">Look at what the question gives and what it asks for.</p><div class="choose">${ch.chooser.map((r) => {
      const l = byId(ch, r.law);
      return `<div class="chrow"><div class="chg"><span class="chl">Given</span>${r.given}</div><div class="chg"><span class="chl">Find</span>${r.need}</div><div class="chu"><span class="chl">Use</span><span class="chip">${l ? l.name : r.law}</span>${r.ar ? `<span class="ar2">${r.ar}</span>` : ''}</div></div>`;
    }).join('')}</div>`;
  }
  /* ---- easily confused pairs ---- */
  function pairs(ch) {
    if (!ch.pairs || !ch.pairs.length) return '';
    return `<h2>Easily confused</h2><p class="muted small">Pairs that students mix up in exams.</p>${ch.pairs.map((x) => `<section class="pair"><div class="pairt">${x.a} <span class="vs">vs</span> ${x.b}</div><div class="pairg"><div><b>${x.a}</b><p class="fnote">${x.ea}</p></div><div><b>${x.b}</b><p class="fnote">${x.eb}</p></div></div>${x.rule ? `<p class="famuse"><b>Rule:</b> ${bi(x.rule, x.ar)}</p>` : ''}</section>`).join('')}`;
  }
  /* end of a lesson: law-family map, quick recap, notebook box, capstone question */
  function sectionEnd(ch, s) {
    const ls = ch.laws.filter((l) => l.sec === s.id), fams = (ch.families || []).filter((f) => (f.secs || []).includes(s.id));
    let h = '';
    if (fams.length) h += `<details class="topic famwrap"><summary><span>Law family map for this lesson</span>${ic('chevron', 'chev')}</summary><div class="tbody">${fams.map((f) => famCard(ch, f)).join('')}</div></details>`;
    if (ls.length) h += `<div class="recap"><div class="recapt">${ic('sigma')} Quick recap of the laws</div>${ls.map((l) => `<div class="recaprow"><b>${l.name}</b>${ftex(l.tex)}<span class="famwhen">${l.when || ''}</span></div>`).join('')}</div>`;
    const nb = s.notebook;
    if (nb) h += `<div class="notebook"><div class="recapt">${ic('notebook')} Write in your notebook</div>
      ${ls.length ? `<div class="nbh">Laws</div><ul>${ls.map((l) => `<li>${l.name}</li>`).join('')}</ul>` : ''}
      ${nb.notes && nb.notes.length ? `<div class="nbh">Notes</div><ul>${nb.notes.map((x) => `<li>${bi(x[0], x[1])}</li>`).join('')}</ul>` : ''}
      ${nb.tricks && nb.tricks.length ? `<div class="nbh">Tricks</div><ul>${nb.tricks.map((x) => `<li>${bi(x[0], x[1])}</li>`).join('')}</ul>` : ''}
      ${nb.problems && nb.problems.length ? `<div class="nbh">Copy these problems</div><ul>${nb.problems.map((id) => { const q = ch.questions.find((x) => x.id === id); return q ? `<li>${esc(q.ref)} <span class="muted small">(${q.hint ? esc(q.hint.type) : ''})</span></li>` : ''; }).join('')}</ul>` : ''}</div>`;
    const caps = ch.questions.filter((q) => q.cap && q.sec === s.id);
    if (caps.length) h += `<div class="capstone"><div class="recapt">${ic('target')} Lesson check — exam style</div>${caps.map((q) => qcard(gid(ch, 'q', q.id), {})).join('')}</div>`;
    return h;
  }

  function imgSlot(ch, id) {
    const im = ch.images.find((x) => x.id === id); if (!im) return '';
    const src = 'assets/images/' + ch.key + '/' + im.file;
    const ph = im.fallback ? `<div class="visbox ph">${im.fallback}</div>` : `<div class="ph ph-empty"><b>Image goes here</b><br><span class="small">${esc(im.alt)}</span><br><code>${src}</code></div>`;
    return `<figure class="imgslot" style="margin:14px 0"><img src="${src}" alt="${esc(im.alt)}" onerror="this.parentNode.classList.add('missing')">${ph}</figure>`;
  }

  function blockHTML(ch, b) {
    switch (b.k) {
      case 'text': return `<p>${b.html}</p>`;
      case 'arx': return `<div class="exp">${b.html}</div>`;
      case 'list': return `<ul class="pts">${b.items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
      case 'law': return lawCard(ch, ch.laws.find((l) => l.id === b.id), { exOpen: true });
      case 'laws': return lawGroup(ch, b.title, b.ids, { exOpen: true });
      case 'ex': return exBody(b);
      case 'sum': return `<div class="note sum">${ic('check')}<div><span class="nl">In short</span><ul>${b.items.map((i, k) => `<li>${bi(i, b.arItems && b.arItems[k])}</li>`).join('')}</ul></div></div>`;
      case 'pit': return `<div class="note pit">${ic('alert')}<div><span class="nl">Watch out</span><p>${bi(b.html, b.ar)}</p></div></div>`;
      case 'tip': return `<div class="note tip">${ic('bulb')}<div><span class="nl">Tip</span><p>${bi(b.html, b.ar)}</p></div></div>`;
      case 'fig': return `<div class="visbox">${b.html}</div>`;
      case 'tbl': return `<div class="tablewrap"><table class="t"><tr>${b.head.map((h) => `<th>${h}</th>`).join('')}</tr>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
      case 'img': return imgSlot(ch, b.id);
      case 'mount': return `<div class="mount" data-mount="${b.id}"></div>`;
      case 'ar': return `<div class="ar">${b.html}</div>`;
      default: return '';
    }
  }
  /* a block 'h' starts a collapsible topic that holds everything until the next 'h' */
  function blocks(ch, list) {
    let out = '', open = false;
    list.forEach((b) => {
      if (b.k === 'h') {
        if (open) out += '</div></details>';
        out += `<details class="topic" open><summary><span>${b.title}</span>${ic('chevron', 'chev')}</summary><div class="tbody">`; open = true;
      } else out += blockHTML(ch, b);
    });
    return out + (open ? '</div></details>' : '');
  }

  /* ---------- questions ---------- */
  const TYPE = { concept: 'Concept', calc: 'Calculation', graph: 'Graph' };
  const qAns = (q) => (q.kind === 'mcq' ? q.options.find((o) => o.ok).t : `<b>${num(q.ans)}</b> ${q.unit}`);
  const isoLatin = (t) => t.replace(/[A-Za-zΔ][A-Za-z0-9²]*(?:\s*[=÷×+−·]\s*[−]?[A-Za-zΔ0-9²½().]+)+/g, (m) => `<span class="en">${m.trim()}</span>`);
  function hintBlock(g) {
    const { ch, x: q } = REV.IDX.q[g], h = q.hint; if (!h) return '';
    const laws = (h.laws || []).map((id) => ch.laws.find((l) => l.id === id)).filter(Boolean);
    return `<div class="hrow"><button class="btn ghost small" data-act="hint">${ic('bulb')} Show hint</button></div><div class="hintbox" hidden><p class="htype"><b>Problem type:</b> ${h.type}</p>${h.ar ? `<div class="exp small">${isoLatin(h.ar)}</div>` : ''}${laws.length ? `<div class="hlaws"><span class="hlt">Formulas to use</span>${laws.map((l) => `<div class="hl"><b>${l.name}</b>${ftex(l.tex)}</div>`).join('')}</div>` : ''}</div>`;
  }
  function qcard(g, o) {
    o = o || {};
    const { x: q } = REV.IDX.q[g];
    const m = ST.S.mistakes[g];
    let body;
    if (q.kind === 'mcq') body = `<div class="opts ${q.options.every((p) => p.t.length < 28 && p.t.indexOf('<svg') < 0) ? 'two' : ''}">${q.options.map((op, i) => `<button class="opt" data-act="opt" data-i="${i}"><span class="lt">${'ABCDEFGH'[i]}</span><span>${op.t}</span></button>`).join('')}</div>`;
    else body = `<div class="numrow"><input type="text" inputmode="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Your answer" aria-label="Your answer"><span class="unit">${q.unit}</span><button class="btn" data-act="check">Check</button></div>`;
    return `<article class="q" data-gid="${g}" ${o.exam ? 'data-exam="1"' : ''}>
      <div class="qh">${o.n ? `<span class="qn">Q${o.n}</span>` : ''}<span class="tag ${q.type}">${TYPE[q.type]}</span>${m && !o.exam ? '<span class="tag bad">Missed before</span>' : ''}<span class="sp"></span>${o.exam ? '' : star(g)}</div>
      <div class="qb">${q.html}</div>${body}${o.exam ? '' : hintBlock(g)}<div class="fb" aria-live="polite"></div>${o.exam ? '' : `<div class="qref">${esc(q.ref)}</div>`}</article>`;
  }
  /* split "a \Rightarrow b \Rightarrow c" chains into one neat line per step */
  const steps = (html) => html.replace(/\$([^$]+?)\$/g, (m, t) => { const parts = t.split(/\\Rightarrow/); return parts.length < 2 ? m : parts.map((p, i) => `$${i ? '\\Rightarrow ' : ''}${p.trim()}$`).join('<br>'); });
  function solHTML(g, q) {
    const ch = REV.IDX.q[g].ch;
    if (q.sol) return `<div class="sol"><h4>Law</h4>${ftex(q.sol.law)}</div><div class="sol"><h4>Substitute and solve</h4><ol class="subst">${q.sol.steps.map((x) => `<li>${x}</li>`).join('')}</ol>${q.sol.note ? `<p class="small muted">${q.sol.note}</p>` : ''}</div>`;
    const laws = ((q.hint && q.hint.laws) || []).map((id) => byId(ch, id)).filter(Boolean).slice(0, 2);
    return `${laws.length ? `<div class="sol"><h4>Law${laws.length > 1 ? 's' : ''}</h4>${laws.map((l) => `<div class="hl"><b>${l.name}</b>${ftex(l.tex)}</div>`).join('')}</div>` : ''}<div class="sol"><h4>Substitute and solve</h4><div class="steps">${steps(q.expl)}</div></div>`;
  }
  function verdictHTML(g, ok, o) {
    const q = REV.IDX.q[g].x;
    let h = `<div class="verdict ${ok ? 'ok' : 'no'}">${ic(ok ? 'check' : 'x')}${ok ? 'Correct' : 'Not quite'}</div>`;
    if (!ok) h += `<div class="sol"><h4>Correct answer</h4>${qAns(q)}</div>`;
    h += solHTML(g, q);
    h += o && o.session ? `<div class="row"><button class="btn" data-act="next">Next ${ic('arrow')}</button></div>` : '<div class="row"><button class="btn ghost small" data-act="retry">Try again</button></div>';
    return h;
  }
  function answerCard(card, value, o) {
    if (card.classList.contains('done')) return false;
    const g = card.dataset.gid, q = REV.IDX.q[g].x;
    let ok;
    if (q.kind === 'mcq') {
      ok = q.options[+value].ok;
      card.querySelectorAll('.opt').forEach((b, i) => { b.disabled = true; if (q.options[i].ok) b.classList.add('ok'); else if (i === +value) b.classList.add('no'); });
    } else {
      ok = FIG.checkNum(q, value);
      if (ok === null) { card.querySelector('.fb').innerHTML = '<div class="hint">Enter a number only (e.g. −2.5 or 13.3).</div>'; return false; }
      card.querySelector('input').disabled = true; card.querySelector('[data-act=check]').disabled = true;
    }
    card.classList.add('done', ok ? 'right' : 'wrong');
    if (!(o && o.norecord)) REV.grade(g, ok);
    const fb = card.querySelector('.fb'); fb.innerHTML = verdictHTML(g, ok, o); math(fb);
    return ok;
  }

  initTerms();
  root.UI = { ic, esc, num, gid, star, lawCard, lawGroup, famCard, chooser, pairs, sectionEnd, stack, ftex, imgSlot, blocks, qcard, answerCard, qAns, verdictHTML, math, terms, TYPE };
})(typeof window !== 'undefined' ? window : globalThis);
