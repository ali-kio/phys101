/* App: pages, navigation (hash routing) and UI events. All text is English. */
(function () {
  'use strict';
  const ST = window.STORE, REV = window.REV, U = window.UI, FIG = window.FIG, esc = U.esc, ic = U.ic;
  const CH = window.CHAPTERS.slice().sort((a, b) => a.id - b.id);
  REV.index(CH);
  const IDX = REV.IDX;
  const $app = document.getElementById('app');
  let cleanups = [];
  const onLeave = (f) => cleanups.push(f);
  let sess = null;                                      // running review session
  const flt = { type: 'all', stat: 'all', laws: '' };   // filters

  const chOf = (k) => CH.find((c) => c.key === k);
  const mistakeGids = () => Object.keys(ST.S.mistakes).filter((g) => IDX.q[g]);
  const starGids = () => Object.keys(ST.S.stars).filter((g) => IDX.q[g] || IDX.l[g] || IDX.t[g]);
  const pctOf = (a, b) => (b ? Math.round(100 * a / b) : 0);
  const plural = (n, w) => n + ' ' + w + (n === 1 ? '' : 's');

  /* a question card; follow-up questions of a group get a collapsible "full setup" so they make sense out of context */
  function qc(g, o) {
    o = o || {};
    let h = U.qcard(g, o);
    const { ch, x } = IDX.q[g];
    if (x.grp && o.ctx !== false) {
      const first = ch.questions.find((q) => q.grp === x.grp);
      if (first && first.id !== x.id) h = h.replace('<div class="qb">', `<details class="ctx"><summary>Show the full problem setup</summary><div class="qb">${first.html}</div></details><div class="qb">`);
    }
    return h;
  }
  const trapCard = (ch, t) => { const g = ch.key + ':t:' + t.id; return `<div class="note pit" data-gid="${g}">${ic('alert')}<div><p>${t.html}</p></div>${U.star(g)}</div>`; };

  /* ---------- shell: sidebar + bottom tabs ---------- */
  const TOOLS = [['#/laws', 'sigma', 'Formula sheet'], ['#/mistakes', 'notebook', 'Mistakes notebook'], ['#/saved', 'star', 'Saved'], ['#/exam', 'timer', 'Mock exam'], ['#/print', 'printer', 'Print sheets'], ['#/settings', 'sliders', 'Settings']];
  const TABS = [['#/', 'home', 'Home'], ['#/review', 'repeat', 'Review'], ['#/laws', 'sigma', 'Formulas'], ['#/saved', 'star', 'Saved'], ['#/more', 'menu', 'More']];
  function badge(h) {
    if (h === '#/review') { const n = REV.dueCount(); return n ? `<i class="bdg">${n}</i>` : ''; }
    if (h === '#/mistakes') { const n = mistakeGids().length; return n ? `<i class="bdg r">${n}</i>` : ''; }
    return '';
  }
  const navA = (h, i, t) => `<a href="${h}" data-nav="${h}">${ic(i)}<span>${t}</span>${badge(h)}</a>`;
  function shell() {
    const side = `<aside class="side" aria-label="Menu"><div class="brand"><i>${ic('arrow')}</i><span>PHYCS101<small>Physics 1 study hub</small></span></div><nav>
      ${navA('#/', 'home', 'Home')}${navA('#/review', 'repeat', "Today's review")}
      <h5>Chapters</h5>${CH.map((c) => navA('#/ch/' + c.key, c.icon, 'Ch ' + c.id + ' · ' + esc(c.title))).join('')}
      <h5>Tools</h5>${TOOLS.map((t) => navA(t[0], t[1], t[2])).join('')}</nav></aside>`;
    const tabs = `<nav class="tabs" aria-label="Main">${TABS.map((t) => navA(t[0], t[1], t[2])).join('')}</nav>`;
    document.getElementById('shell').innerHTML = side + tabs;
  }
  function markNav(route) {
    document.querySelectorAll('[data-nav]').forEach((a) => {
      const h = a.dataset.nav;
      a.classList.toggle('on', h === '#/' ? route === '#/' : route.indexOf(h) === 0 || (h === '#/more' && /^#\/(more|exam|print|images|settings|mistakes|ch)/.test(route)));
    });
  }
  const head = (icon, title, sub) => `<div class="pagehead"><div class="ico">${ic(icon)}</div><div><h1>${title}</h1>${sub ? `<small>${sub}</small>` : ''}</div></div>`;

  /* ---------- home ---------- */
  function viewHome() {
    const due = REV.dueCount(), plan = REV.buildQueue({}), bc = REV.boxCounts();
    const hero = `<section class="hero"><h2>Today's review</h2>
      ${plan.queue.length ? `<div class="nums"><div><b>${due}</b><span>due</span></div><div><b>${plan.fresh}</b><span>new</span></div><div><b>~${Math.max(3, Math.round(plan.queue.length * 0.7))}</b><span>minutes</span></div></div><a class="btn light" href="#/review/run" data-act="sess-start" data-ch="">Start review ${ic('arrow')}</a>`
        : '<p>You are all caught up for today. Come back tomorrow, or try a mock exam.</p><a class="btn light" href="#/exam">Mock exam</a>'}</section>`;
    const chs = CH.map((c) => {
      const p = REV.chapterProgress(c);
      return `<a class="rowlink" href="#/ch/${c.key}"><span class="ico">${ic(c.icon)}</span><span class="tx"><b>Chapter ${c.id} · ${esc(c.title)}</b><small>${c.questions.length} questions · ${c.laws.length} formulas · ${p.mastered}/${p.total} mastered</small><div class="meter"><i style="width:${p.pct}%"></i></div></span><span class="go">${p.pct}%</span></a>`;
    }).join('');
    const tool = (h, i, t, s) => `<a class="rowlink" href="${h}"><span class="ico">${ic(i)}</span><span class="tx"><b>${t}</b><small>${s}</small></span><span class="go">${ic('chevron')}</span></a>`;
    return hero + `<h2>Chapters</h2><div class="list">${chs}</div>
      <h2>Review tools</h2><div class="list">${tool('#/laws', 'sigma', 'Formula sheet', 'Every formula so far, in one place')}${tool('#/mistakes', 'notebook', 'Mistakes notebook', plural(mistakeGids().length, 'question'))}${tool('#/saved', 'star', 'Saved', plural(starGids().length, 'item'))}${tool('#/exam', 'timer', 'Mock exam', 'Timed, answers hidden until the end')}${tool('#/print', 'printer', 'Print sheets', 'Quiz, midterm or final cheat sheet')}</div>
      <p class="muted small" style="margin-top:14px">Boxes: ${[1, 2, 3, 4, 5].map((i) => 'B' + i + ' ' + bc[i]).join(' · ')} · new ${bc[0]}</p>`;
  }

  /* ---------- chapter ---------- */
  const TABLIST = [['learn', 'Learn'], ['formulas', 'Formulas'], ['practice', 'Practice'], ['sheet', 'Sheet']];
  function viewChapter(key, tab, topic) {
    const c = chOf(key); if (!c) return '<div class="empty">Chapter not found</div>';
    tab = tab || 'learn';
    const p = REV.chapterProgress(c);
    let h = `${head(c.icon, esc(c.title), 'Chapter ' + c.id)}
      <div class="row" style="margin-bottom:10px"><a class="btn small" href="#/review/run" data-act="sess-start" data-ch="${c.key}">${ic('repeat')} Review this chapter</a><a class="btn small ghost" href="#/print?ch=${c.key}">${ic('printer')} Print</a><span class="muted small">${p.mastered}/${p.total} mastered</span></div>
      <div class="seg tabs2" role="tablist">${TABLIST.map((t) => `<a class="${t[0] === tab ? 'on' : ''}" href="#/ch/${c.key}/${t[0]}" role="tab">${t[1]}</a>`).join('')}</div>`;
    if (tab === 'learn') {
      h += `<div class="row" style="margin-bottom:12px;justify-content:space-between"><span class="muted small">Tap a lesson to open it. Tap a topic inside to fold it.</span><span class="row"><button class="btn small ghost" data-act="expand" data-v="1">Open all</button><button class="btn small ghost" data-act="expand" data-v="0">Close all</button></span></div>`;
      h += c.sections.map((s, i) => {
        const done = ST.S.read[c.key + ':s:' + s.id];
        return `<details class="sec" id="sec${s.id}" ${i === 0 ? 'open' : ''}><summary><span class="no">${done ? ic('check') : s.id}</span><span><h2>${esc(s.title)}</h2>${s.tr ? `<small>${s.tr}</small>` : ''}</span>${ic('chevron', 'chev')}</summary><div class="sbody">${U.blocks(c, s.blocks)}
          <div class="row" style="margin-top:14px"><button class="btn small ${done ? 'ghost' : ''}" data-act="read" data-key="${c.key}:s:${s.id}">${ic('check')} ${done ? 'Marked as done' : 'Mark lesson as done'}</button><a class="btn small ghost" href="#/ch/${c.key}/practice/${s.id}">Practice this lesson</a></div></div></details>`;
      }).join('');
      if (c.videos && c.videos.length) h += '<h2>Suggested videos</h2><div class="list">' + c.videos.map((v) => `<a class="rowlink" target="_blank" rel="noopener" href="${esc(v.url)}"><span class="tx"><b>${esc(v.title)}</b></span></a>`).join('') + '</div>';
    } else if (tab === 'formulas') h += lawsList([c]);
    else if (tab === 'sheet') h += `<div class="note sum">${ic('bolt')}<div><span class="nl">3-minute review</span><ol style="margin:4px 0 0;padding-inline-start:20px">${c.quick.map((x) => `<li>${x}</li>`).join('')}</ol></div></div><h2>Pitfalls</h2>${c.traps.map((t) => trapCard(c, t)).join('')}${c.glossary ? `<h2>Key terms · المصطلحات</h2><div class="card glos">${c.glossary.map((g) => `<div>${g[0]}</div><div>${g[1]}</div>`).join('')}</div>` : ''}`;
    else h += topic ? practiceTopic(c, +topic) : practiceHome(c);
    return h;
  }
  function practiceHome(c) {
    const rows = c.sections.map((s) => {
      const qs = c.questions.filter((q) => q.sec === s.id), done = qs.filter((q) => REV.box(c.key + ':q:' + q.id) >= 3).length;
      return `<a class="rowlink" href="#/ch/${c.key}/practice/${s.id}"><span class="ico"><b>${s.id}</b></span><span class="tx"><b>${esc(s.title)}</b><small>${qs.length} questions · ${done} mastered</small><div class="meter"><i style="width:${pctOf(done, qs.length)}%"></i></div></span><span class="go">${ic('chevron')}</span></a>`;
    }).join('');
    const mm = c.questions.filter((q) => ST.S.mistakes[c.key + ':q:' + q.id]).length;
    return `<p class="muted">Pick a topic. Inside each topic questions are ordered: concept, then calculation, then graph, with multi-part problems kept together. Every answer feeds your review boxes.</p><div class="list">${rows}</div>${mm ? `<p class="muted small" style="margin-top:12px">${plural(mm, 'question')} from this chapter in your <a href="#/mistakes">mistakes notebook</a>.</p>` : ''}`;
  }
  function practiceTopic(c, secId) {
    const s = c.sections.find((x) => x.id === secId); if (!s) return practiceHome(c);
    const gid = (q) => c.key + ':q:' + q.id;
    const pass = (q) => {
      if (flt.type !== 'all' && q.type !== flt.type) return false;
      const g = gid(q);
      if (flt.stat === 'new') return !REV.seen(g);
      if (flt.stat === 'missed') return !!ST.S.mistakes[g];
      if (flt.stat === 'saved') return !!ST.S.stars[g];
      return true;
    };
    const all = c.questions.filter((q) => q.sec === secId);
    const free = all.filter((q) => !q.grp), grp = {}, gorder = [];
    all.filter((q) => q.grp).forEach((q) => { if (!grp[q.grp]) { grp[q.grp] = []; gorder.push(q.grp); } grp[q.grp].push(q); });
    let n = 0, shown = 0, body = '';
    ['concept', 'calc', 'graph'].forEach((t) => {
      const qs = free.filter((q) => q.type === t && pass(q)); if (!qs.length) return;
      body += `<div class="qgroup">${U.TYPE[t]} questions</div>` + qs.map((q) => { n++; shown++; return qc(gid(q), { n, ctx: false }); }).join('');
    });
    gorder.forEach((name) => {
      const qs = grp[name].filter(pass); if (!qs.length) return;
      body += `<div class="qgroup">${esc(name)}</div>` + qs.map((q) => { n++; shown++; return qc(gid(q), { n, ctx: false }); }).join('');
    });
    const seg = (key, list) => `<div class="seg" style="margin-bottom:8px">${list.map((x) => `<button class="${flt[key] === x[0] ? 'on' : ''}" data-act="flt" data-k="${key}" data-v="${x[0]}">${x[1]}</button>`).join('')}</div>`;
    return `<p><a href="#/ch/${c.key}/practice" class="small">${ic('arrow')} All topics</a></p><h2 style="margin-top:6px">${s.id}. ${esc(s.title)}</h2>
      ${seg('type', [['all', 'All'], ['concept', 'Concept'], ['calc', 'Calculation'], ['graph', 'Graph']])}${seg('stat', [['all', 'Any status'], ['new', 'New'], ['missed', 'Missed'], ['saved', 'Saved']])}
      <p class="muted small">${plural(shown, 'question')}</p>${body || '<div class="empty">No questions match these filters.</div>'}`;
  }

  /* ---------- formula sheet ---------- */
  function lawsList(chs) {
    let h = '';
    chs.forEach((c) => {
      if (chs.length > 1) h += `<h2>Chapter ${c.id} · ${esc(c.title)}</h2>`;
      c.sections.forEach((s) => {
        const ls = c.laws.filter((l) => l.sec === s.id);
        if (ls.length) h += `<div class="lgrp"><div class="qgroup">${esc(s.title)}</div>${ls.map((l) => U.lawCard(c, l)).join('')}</div>`;
      });
    });
    return h;
  }
  function viewLaws() {
    return `${head('sigma', 'Formula sheet', 'Everything you need, chapter by chapter')}
      <input class="search" type="search" placeholder="Search (e.g. free fall, velocity)" data-act="search" value="${esc(flt.laws)}" aria-label="Search formulas">
      <div id="lawsbox">${lawsList(CH)}<h2>Pitfalls</h2>${CH.map((c) => c.traps.map((t) => trapCard(c, t)).join('')).join('')}</div>
      <div class="row" style="margin-top:16px"><a class="btn" href="#/print">${ic('printer')} Print as a sheet</a><a class="btn ghost" href="#/review">${ic('repeat')} Test myself</a></div>`;
  }
  function filterLaws(t) {
    t = t.trim().toLowerCase();
    document.querySelectorAll('#lawsbox .formula, #lawsbox .note.pit').forEach((e) => { e.hidden = !!t && e.textContent.toLowerCase().indexOf(t) < 0; });
    document.querySelectorAll('#lawsbox .lgrp').forEach((g) => { g.hidden = !!t && !g.querySelector('.formula:not([hidden])'); });
  }

  /* ---------- review session ---------- */
  function startSession(queue, title) {
    sess = { queue: queue.slice(), i: 0, right: 0, wrong: 0, again: {}, title: title || 'Review' };
    if (location.hash === '#/review/run') render(); else location.hash = '#/review/run';
  }
  function viewReviewStart(chKey) {
    const chs = chKey ? [chKey] : null, plan = REV.buildQueue({ chapters: chs }), bc = REV.boxCounts();
    return `${head('repeat', chKey ? 'Review · Chapter ' + chOf(chKey).id : "Today's review")}
      <div class="info"><b>How it works.</b> Every formula and question lives in a box from 1 to 5. A correct answer moves it up and delays it (1, 2, 4, 8, then 16 days). A wrong answer sends it back to box 1 and it returns tomorrow. A few minutes a day is enough.</div>
      <div class="stats"><div><b>${plan.due}</b>due</div><div><b>${plan.fresh}</b>new</div><div><b>${plan.queue.length}</b>today</div></div>
      ${plan.queue.length ? `<button class="btn block" data-act="sess-start" data-ch="${chKey || ''}">Start (${plan.queue.length}) ${ic('arrow')}</button>` : '<div class="empty">Nothing is due right now.</div>'}
      <h2>Custom session</h2><div class="stack">
      <button class="btn ghost" data-act="sess-kind" data-k="l" data-ch="${chKey || ''}">Formulas only</button>
      <button class="btn ghost" data-act="sess-kind" data-k="q" data-ch="${chKey || ''}">Questions only</button>
      <button class="btn ghost" data-act="sess-mist">Mistakes (${mistakeGids().length})</button>
      <button class="btn ghost" data-act="sess-star">Saved (${starGids().filter((g) => !IDX.t[g]).length})</button>
      <button class="btn ghost" data-act="sess-all" data-ch="${chKey || ''}">Free practice (20 random)</button></div>
      <h2>Your boxes</h2><div class="boxes">${[0, 1, 2, 3, 4, 5].map((i) => `<div class="bx"><b>${bc[i]}</b>${i ? 'Box ' + i : 'New'}</div>`).join('')}</div>`;
  }
  function viewSession() {
    if (!sess) return '<div class="empty">No session running. <a href="#/review">Start one</a></div>';
    if (sess.i >= sess.queue.length) {
      const n = sess.right + sess.wrong, tm = REV.dueCount();
      return `${head('check', 'Session complete')}<div class="stats"><div><b>${sess.right}</b>correct</div><div><b>${sess.wrong}</b>wrong</div><div><b>${pctOf(sess.right, n)}%</b>score</div></div>
        <p class="muted">Wrong answers return to box 1 and come back tomorrow. ${tm ? tm + ' still due.' : ''}</p>
        <div class="stack"><a class="btn" href="#/review">Back to review</a><a class="btn ghost" href="#/mistakes">Mistakes notebook</a><a class="btn ghost" href="#/">Home</a></div>`;
    }
    const g = sess.queue[sess.i], k = REV.kind(g);
    const top = `<div class="sess-h"><span>${sess.i + 1} / ${sess.queue.length}</span><div class="meter"><i style="width:${pctOf(sess.i, sess.queue.length)}%"></i></div><a class="small" href="#/review" data-act="sess-quit">End</a></div>`;
    if (k === 'q') return top + qc(g, { session: true });
    const { ch, x } = IDX.l[g];
    return top + `<article class="fc" data-gid="${g}"><div class="qh"><span class="tag">Formula · Ch ${ch.id}</span><span class="sp"></span>${U.star(g)}</div>
      <div class="fq">${x.name}</div><p class="muted small">Recall the formula, then check.</p>
      <div class="back" hidden><div class="ftex">$$${x.tex}$$</div>${x.note ? `<p class="small">${x.note}</p>` : ''}${x.when ? `<p class="small"><b>Use it when:</b> ${x.when}</p>` : ''}</div>
      <div class="show"><button class="btn block" data-act="flip">Show formula</button></div>
      <div class="grade" hidden><button class="btn good" data-act="know" data-v="1">${ic('check')} Knew it</button><button class="btn bad" data-act="know" data-v="0">${ic('x')} Missed it</button></div></article>`;
  }
  function sessNext(ok, g) {
    if (ok) sess.right++; else { sess.wrong++; if (!sess.again[g]) { sess.again[g] = 1; sess.queue.push(g); } }
    sess.i++; render();
  }

  /* ---------- mistakes / saved ---------- */
  function viewMistakes() {
    const ms = mistakeGids().sort((a, b) => ST.S.mistakes[b].ts - ST.S.mistakes[a].ts);
    return `${head('notebook', 'Mistakes notebook', 'A question leaves after 2 correct answers in a row')}
      ${ms.length ? `<button class="btn block" data-act="sess-mist" style="margin-bottom:14px">Review mistakes (${ms.length})</button>${ms.map((g) => qc(g)).join('')}` : '<div class="empty">Nothing here. Wrong answers will appear automatically.</div>'}`;
  }
  function viewSaved() {
    const gs = starGids(), L = gs.filter((g) => IDX.l[g]), T = gs.filter((g) => IDX.t[g]), Q = gs.filter((g) => IDX.q[g]);
    if (!gs.length) return head('star', 'Saved') + '<div class="empty">Tap the star on any formula, pitfall or question to keep it here.</div>';
    return `${head('star', 'Saved', plural(gs.length, 'item'))}<div class="row" style="margin-bottom:6px"><button class="btn" data-act="sess-star">${ic('repeat')} Review them</button><a class="btn ghost" href="#/print?saved=1">${ic('printer')} Print</a></div>
      ${L.length ? '<h2>Formulas</h2>' + L.map((g) => U.lawCard(IDX.l[g].ch, IDX.l[g].x)).join('') : ''}
      ${T.length ? '<h2>Pitfalls</h2>' + T.map((g) => trapCard(IDX.t[g].ch, IDX.t[g].x)).join('') : ''}
      ${Q.length ? '<h2>Questions</h2>' + Q.map((g) => qc(g)).join('') : ''}`;
  }

  /* ---------- mock exam ---------- */
  const fmt = (s) => { s = Math.max(0, s); return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0'); };
  function viewExamConfig() {
    const e = ST.S.exam;
    let h = head('timer', 'Mock exam', 'Timed. Answers are hidden until the end.');
    if (e && !e.done) h += `<div class="info"><b>You have an unfinished exam</b> (${e.i + 1}/${e.gids.length})<div class="row" style="margin-top:8px"><a class="btn small" href="#/exam/run">Continue</a><button class="btn small ghost" data-act="exam-drop">Discard</button></div></div>`;
    const maxN = IDX.all.filter((g) => IDX.q[g]).length;
    h += `<form data-form="exam"><fieldset><legend>Chapters</legend>${CH.map((c) => `<label class="chk"><input type="checkbox" name="ch" value="${c.key}" checked> Chapter ${c.id} · ${esc(c.title)}</label>`).join('')}</fieldset>
      <fieldset><legend>Number of questions</legend>${[10, 15, 20, 30].filter((n) => n <= maxN).map((n, i) => `<label class="chk"><input type="radio" name="n" value="${n}" ${n === 15 || (i === 0 && maxN < 15) ? 'checked' : ''}> ${n}</label>`).join('')}</fieldset>
      <p class="muted small">Time allowed: 1.5 minutes per question. Questions you leave blank count as wrong in the score, but they are <b>not</b> added to your mistakes notebook or review boxes.</p><button class="btn block" type="submit">Start exam ${ic('arrow')}</button></form>`;
    if (ST.S.hist.length) h += `<h2>Recent exams</h2>` + ST.S.hist.slice(-5).reverse().map((x) => `<div class="tagrow"><span>${new Date(x.t).toLocaleDateString('en-GB')} · ${plural(x.n, 'question')}</span><b>${x.score}%</b></div>`).join('');
    return h;
  }
  function examStart(form) {
    const fd = new FormData(form), chs = fd.getAll('ch'), n = +fd.get('n') || 15;
    // units: a standalone question, or a whole multi-part group (kept together and in order)
    const units = []; const seenG = {};
    chs.forEach((k) => { const c = chOf(k); c.questions.forEach((q) => {
      const g = c.key + ':q:' + q.id;
      if (!q.grp) units.push([g]); else { const key = k + q.grp; if (!seenG[key]) { seenG[key] = []; units.push(seenG[key]); } seenG[key].push(g); }
    }); });
    if (!units.length) { alert('Pick at least one chapter.'); return; }
    let gids = [];
    REV.shuffle(units).forEach((u) => { if (gids.length < n) gids = gids.concat(u); });
    gids = gids.slice(0, Math.max(n, 1));
    ST.S.exam = { gids, i: 0, ans: {}, endAt: Date.now() + Math.round(gids.length * 1.5 * 60000), done: false };
    ST.save(); location.hash = '#/exam/run';
  }
  function examFinish() {
    const e = ST.S.exam; if (!e || e.done) return;
    let right = 0, blank = 0; e.res = {};
    e.gids.forEach((g) => {
      const q = IDX.q[g].x, a = e.ans[g];
      if (a == null || String(a).trim() === '') { e.res[g] = null; blank++; return; }   // unanswered: counts as wrong, but is NOT graded into review
      const ok = q.kind === 'mcq' ? !!q.options[+a].ok : FIG.checkNum(q, a) === true;
      e.res[g] = ok; if (ok) right++;
      REV.grade(g, ok);
    });
    e.done = true; e.right = right; e.blank = blank; e.score = pctOf(right, e.gids.length);
    ST.S.hist.push({ t: Date.now(), n: e.gids.length, score: e.score }); ST.save();
    location.hash = '#/exam/result';
  }
  function viewExamRun() {
    const e = ST.S.exam;
    if (!e || e.done) return '<div class="empty">No exam running. <a href="#/exam">Start one</a></div>';
    if (Date.now() >= e.endAt) { setTimeout(examFinish, 0); return '<div class="empty">Time is up…</div>'; }
    const g = e.gids[e.i], last = e.i === e.gids.length - 1;
    const tick = setInterval(() => { const el = document.getElementById('xt'); if (!el) return; const left = Math.round((e.endAt - Date.now()) / 1000); el.textContent = fmt(left); if (left <= 0) { clearInterval(tick); examFinish(); } }, 500);
    onLeave(() => clearInterval(tick));
    return `<div class="timer"><span>Question ${e.i + 1} / ${e.gids.length}</span><span class="t" id="xt">${fmt(Math.round((e.endAt - Date.now()) / 1000))}</span></div>${qc(g, { exam: true })}
      <div class="row" style="margin-top:12px"><button class="btn block" data-act="exam-next">${last ? 'Finish and see result' : 'Next ' }${last ? '' : ic('arrow')}</button></div>`;
  }
  function restoreExamAnswer() {
    const e = ST.S.exam, card = $app.querySelector('.q[data-exam]'); if (!e || !card) return;
    const a = e.ans[card.dataset.gid]; if (a == null) return;
    const o = card.querySelectorAll('.opt'); if (o.length) { if (o[+a]) o[+a].classList.add('sel'); } else { const i = card.querySelector('input'); if (i) i.value = a; }
  }
  function viewExamResult() {
    const e = ST.S.exam; if (!e || !e.done) return '<div class="empty"><a href="#/exam">No result yet</a></div>';
    const wrong = e.gids.filter((g) => e.res[g] === false), blank = e.gids.filter((g) => e.res[g] === null);
    const item = (g, answered) => {
      const q = IDX.q[g].x, a = e.ans[g], mine = !answered ? 'Not answered' : q.kind === 'mcq' ? q.options[+a].t : esc(a);
      return `<article class="q"><div class="qb">${q.html}</div><div class="sol"><h4>Your answer</h4>${mine}</div><div class="sol"><h4>Correct answer</h4>${U.qAns(q)}</div><div class="sol"><h4>Explanation</h4>${q.expl}</div></article>`;
    };
    return `${head('timer', 'Exam result')}<div class="stats"><div><b>${e.score}%</b>score</div><div><b>${e.right}/${e.gids.length}</b>correct</div><div><b>${e.blank || 0}</b>blank</div></div>
      <div class="stack"><a class="btn" href="#/exam">New exam</a>${wrong.length ? '<button class="btn ghost" data-act="sess-mist">Review my mistakes</button>' : ''}</div>
      ${wrong.length ? `<h2>Answered wrongly (${wrong.length})</h2><p class="muted small">These were added to your mistakes notebook.</p>` + wrong.map((g) => item(g, true)).join('') : ''}
      ${blank.length ? `<h2>Left blank (${blank.length})</h2><p class="muted small">Not added to the notebook. Try them in Practice when you are ready.</p>` + blank.map((g) => item(g, false)).join('') : ''}
      ${!wrong.length && !blank.length ? '<div class="empty">Every answer was correct.</div>' : ''}`;
  }

  /* ---------- print sheets ---------- */
  function viewPrint(params) {
    const pre = params.get('ch'), saved = params.get('saved');
    return `${head('printer', 'Print sheets', 'Pick content, get a compact two-column sheet')}
      <form data-form="print" class="noprint"><fieldset><legend>Chapters</legend>${CH.map((c) => `<label class="chk"><input type="checkbox" name="ch" value="${c.key}" ${!pre || pre === c.key ? 'checked' : ''}> Chapter ${c.id} · ${esc(c.title)}</label>`).join('')}</fieldset>
      <fieldset><legend>Content</legend>${[['laws', 'Formulas', 1], ['quick', '3-minute review', 1], ['traps', 'Pitfalls', 1], ['mist', 'My mistakes (with solutions)', 0], ['saved', 'Saved items', saved ? 1 : 0]].map((x) => `<label class="chk"><input type="checkbox" name="inc" value="${x[0]}" ${x[2] ? 'checked' : ''}> ${x[1]}</label>`).join('')}</fieldset>
      <fieldset><legend>Title</legend>${['Quiz sheet', 'Midterm sheet', 'Final sheet'].map((t, i) => `<label class="chk"><input type="radio" name="ttl" value="${t}" ${i === 0 ? 'checked' : ''}> ${t}</label>`).join('')}</fieldset>
      <button class="btn block" type="submit">Create sheet</button></form><div id="printarea"></div>`;
  }
  function buildPrint(form) {
    const fd = new FormData(form), chs = fd.getAll('ch'), inc = fd.getAll('inc'), ttl = fd.get('ttl'), has = (k) => inc.indexOf(k) >= 0;
    const plain = (q) => q.html.replace(/<svg[\s\S]*?<\/svg>/g, '');
    const lawP = (l) => `<div class="pl"><b>${l.name}</b>$$${l.tex}$$${l.note ? `<small>${l.note}</small>` : ''}</div>`;
    const qP = (g) => { const q = IDX.q[g].x; return `<div class="pq">${plain(q)}<small>Answer: ${U.qAns(q)}. ${q.expl}</small></div>`; };
    let h = `<div class="pr-head"><h1>${esc(ttl)} · PHYCS101</h1><button class="btn small noprint" onclick="window.print()">${ic('printer')} Print / PDF</button></div><div class="pr-cols">`;
    chs.forEach((k) => {
      const c = chOf(k); h += `<section><h3>Chapter ${c.id} · ${esc(c.title)}</h3>`;
      if (has('laws')) h += c.laws.map(lawP).join('');
      if (has('quick')) h += `<h4>3-minute review</h4><ol>${c.quick.map((x) => `<li>${x}</li>`).join('')}</ol>`;
      if (has('traps')) h += `<h4>Pitfalls</h4><ul>${c.traps.map((t) => `<li>${t.html}</li>`).join('')}</ul>`;
      h += '</section>';
    });
    if (has('saved')) {
      const gs = starGids();
      h += '<section><h3>Saved</h3>' + gs.filter((g) => IDX.l[g]).map((g) => lawP(IDX.l[g].x)).join('') + '<ul>' + gs.filter((g) => IDX.t[g]).map((g) => `<li>${IDX.t[g].x.html}</li>`).join('') + '</ul>' + gs.filter((g) => IDX.q[g]).map(qP).join('') + '</section>';
    }
    if (has('mist')) h += '<section><h3>My mistakes</h3>' + (mistakeGids().map(qP).join('') || '<p>No mistakes yet.</p>') + '</section>';
    const area = document.getElementById('printarea'); area.innerHTML = h + '</div>'; U.math(area);
    area.scrollIntoView({ behavior: 'smooth' });
  }

  /* ---------- images guide ---------- */
  function viewImages() {
    let h = head('image', 'Images guide') + `<div class="info"><b>How it works.</b> Copy a prompt, paste it into an image generator, save the PNG with exactly the file name shown, put it in the folder shown, and push to GitHub. The site shows it automatically in place of the built-in drawing.</div>`;
    CH.forEach((c) => {
      h += `<h2>Chapter ${c.id}</h2>`;
      c.images.forEach((im) => {
        const src = 'assets/images/' + c.key + '/' + im.file;
        h += `<div class="card imgcard" style="margin-bottom:12px" data-src="${src}"><div class="row" style="justify-content:space-between"><b>${esc(im.alt)}</b><span class="tag st">Not added</span></div>
          <p class="small muted">File: <code>${src}</code><br>Used in: ${esc(im.where)}</p>
          <details><summary>Prompt (English)</summary><pre class="prompt" dir="ltr">${esc(im.prompt)}</pre></details>
          <div class="row" style="margin-top:8px"><button class="btn small" data-act="copy" data-id="${c.key}:${im.id}">${ic('copy')} Copy prompt</button></div></div>`;
      });
    });
    return h;
  }
  function checkImages() {
    document.querySelectorAll('.imgcard').forEach((el) => {
      const im = new Image(); im.onload = () => { const p = el.querySelector('.st'); p.className = 'tag graph st'; p.textContent = 'Added'; };
      im.src = el.dataset.src;
    });
  }

  /* ---------- settings / more ---------- */
  function viewSettings() {
    const n = IDX.all.length, bc = REV.boxCounts();
    return `${head('sliders', 'Settings')}<h2 style="margin-top:6px">Appearance</h2>
      <div class="seg">${[['auto', 'Auto'], ['light', 'Light'], ['dark', 'Dark']].map((t) => `<button class="${ST.S.theme === t[0] ? 'on' : ''}" data-act="theme" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>
      <h2>Arabic explanations</h2><p class="muted small">Arabic explanations appear in the lessons, under every formula and in question hints. Terms stay in English.</p>
      <div class="seg"><button class="${!ST.S.noAr ? 'on' : ''}" data-act="ar" data-v="1">Show</button><button class="${ST.S.noAr ? 'on' : ''}" data-act="ar" data-v="0">Hide</button></div>
      <h2>Backup</h2><p class="muted small">Progress is stored in this browser only. To move it between phone, iPad and laptop, export a file and import it on the other device.</p>
      <div class="row"><button class="btn" data-act="export">${ic('download')} Export</button><label class="btn ghost" style="cursor:pointer">${ic('upload')} Import<input type="file" accept="application/json,.json" data-act="import" hidden></label></div>
      <h2>Stats</h2><div class="stats"><div><b>${n - bc[0]}</b>started</div><div><b>${bc[4] + bc[5]}</b>strong</div><div><b>${mistakeGids().length}</b>mistakes</div></div>
      <h2>More</h2><div class="list"><a class="rowlink" href="#/images"><span class="ico">${ic('image')}</span><span class="tx"><b>Images guide</b><small>Prompts for the optional illustrations</small></span><span class="go">${ic('chevron')}</span></a></div>
      <h2>Reset</h2><button class="btn danger small" data-act="reset">Erase all progress</button>`;
  }
  function viewMore() {
    const row = (h, i, t, s) => `<a class="rowlink" href="${h}"><span class="ico">${ic(i)}</span><span class="tx"><b>${t}</b>${s ? `<small>${s}</small>` : ''}</span>${badge(h)}<span class="go">${ic('chevron')}</span></a>`;
    return `${head('menu', 'More')}<h2 style="margin-top:6px">Chapters</h2><div class="list">${CH.map((c) => row('#/ch/' + c.key, c.icon, 'Chapter ' + c.id + ' · ' + esc(c.title), c.questions.length + ' questions')).join('')}</div>
      <h2>Tools</h2><div class="list">${TOOLS.filter((t) => ['#/mistakes', '#/exam', '#/print', '#/settings'].indexOf(t[0]) >= 0).map((t) => row(t[0], t[1], t[2])).join('')}</div>`;
  }

  /* ---------- router ---------- */
  function render() {
    cleanups.forEach((f) => f()); cleanups = [];
    const raw = location.hash || '#/', qi = raw.indexOf('?'), route = qi < 0 ? raw : raw.slice(0, qi), params = new URLSearchParams(qi < 0 ? '' : raw.slice(qi + 1));
    const p = route.split('/').filter(Boolean).slice(1);
    let h, title = '';
    switch (p[0]) {
      case undefined: h = viewHome(); break;
      case 'ch': h = viewChapter(p[1], p[2], p[3]); title = 'Chapter'; break;
      case 'review': h = p[1] === 'run' ? viewSession() : viewReviewStart(p[1]); title = 'Review'; break;
      case 'laws': h = viewLaws(); title = 'Formula sheet'; break;
      case 'mistakes': h = viewMistakes(); title = 'Mistakes'; break;
      case 'saved': h = viewSaved(); title = 'Saved'; break;
      case 'exam': h = p[1] === 'run' ? viewExamRun() : p[1] === 'result' ? viewExamResult() : viewExamConfig(); title = 'Mock exam'; break;
      case 'print': h = viewPrint(params); title = 'Print'; break;
      case 'images': h = viewImages(); title = 'Images'; break;
      case 'settings': h = viewSettings(); title = 'Settings'; break;
      case 'more': h = viewMore(); break;
      default: h = '<div class="empty">Page not found. <a href="#/">Home</a></div>';
    }
    $app.innerHTML = h;
    shell(); markNav(route);
    U.math($app);
    $app.querySelectorAll('.mount[data-mount=car]').forEach((m) => window.VIS.mountCarDemo(m));
    if (p[0] === 'exam' && p[1] === 'run') restoreExamAnswer();
    if (p[0] === 'images') checkImages();
    if (p[0] === 'laws' && flt.laws) filterLaws(flt.laws);
    if (!(p[0] === 'review' && p[1] === 'run' && sess && sess.i > 0)) window.scrollTo(0, 0);
    document.title = 'PHYCS101' + (title ? ' · ' + title : '');
  }

  /* ---------- events ---------- */
  function applyTheme() {
    const t = ST.S.theme; if (t === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', t);
    document.body.classList.toggle('no-ar', !!ST.S.noAr);
  }
  function download(name, text) { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' })); a.download = name; document.body.appendChild(a); a.click(); a.remove(); }
  const inSession = () => !!sess && /review\/run/.test(location.hash);

  document.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-act]'); if (!b || b.tagName === 'INPUT') return;
    const act = b.dataset.act, card = b.closest('.q'), fc = b.closest('.fc');
    switch (act) {
      case 'star': {
        const on = REV.toggleStar(b.dataset.gid);
        document.querySelectorAll(`.star[data-gid="${b.dataset.gid}"]`).forEach((s) => { s.classList.toggle('on', on); s.setAttribute('aria-pressed', on); });
        break;
      }
      case 'opt':
        if (card.dataset.exam) { card.querySelectorAll('.opt').forEach((o) => o.classList.remove('sel')); b.classList.add('sel'); ST.S.exam.ans[card.dataset.gid] = b.dataset.i; ST.save(); break; }
        U.answerCard(card, b.dataset.i, { session: inSession() }); break;
      case 'check': U.answerCard(card, card.querySelector('input').value, { session: inSession() }); break;
      case 'retry': { const g = card.dataset.gid, tmp = document.createElement('div'); tmp.innerHTML = qc(g, { ctx: false }); const nc = tmp.firstElementChild; card.replaceWith(nc); U.math(nc); break; }
      case 'next': sessNext(card.classList.contains('right'), card.dataset.gid); break;
      case 'hint': { const hb = b.closest('.q').querySelector('.hintbox'); hb.hidden = !hb.hidden; b.lastChild.textContent = hb.hidden ? ' Show hint' : ' Hide hint'; break; }
      case 'flip': fc.querySelector('.back').hidden = false; fc.querySelector('.grade').hidden = false; fc.querySelector('.show').hidden = true; break;
      case 'know': { const g = fc.dataset.gid, ok = b.dataset.v === '1'; REV.grade(g, ok); sessNext(ok, g); break; }
      case 'read': ST.S.read[b.dataset.key] = ST.S.read[b.dataset.key] ? 0 : 1; ST.save(); { const y = window.scrollY; render(); window.scrollTo(0, y); } break;
      case 'expand': document.querySelectorAll('details.sec, details.topic').forEach((d) => { d.open = b.dataset.v === '1'; }); break;
      case 'jump': { const el = document.getElementById(b.dataset.id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); break; }
      case 'flt': flt[b.dataset.k] = b.dataset.v; render(); break;
      case 'theme': ST.S.theme = b.dataset.v; ST.save(); applyTheme(); render(); break;
      case 'ar': ST.S.noAr = b.dataset.v === '0'; ST.save(); applyTheme(); render(); break;
      case 'sess-start': { ev.preventDefault(); const ch = b.dataset.ch ? [b.dataset.ch] : null; startSession(REV.buildQueue({ chapters: ch }).queue); break; }
      case 'sess-kind': { const ch = b.dataset.ch ? [b.dataset.ch] : null; const q = REV.buildQueue({ chapters: ch, kinds: [b.dataset.k], newMax: 8 }).queue; if (q.length) startSession(q); else alert('Nothing suitable right now.'); break; }
      case 'sess-mist': { const q = REV.shuffle(mistakeGids()); if (q.length) startSession(q); else alert('Your mistakes notebook is empty.'); break; }
      case 'sess-star': { const q = REV.shuffle(starGids().filter((g) => !IDX.t[g])); if (q.length) startSession(q); else alert('Nothing saved that can be reviewed.'); break; }
      case 'sess-all': { const ch = b.dataset.ch ? [b.dataset.ch] : null; startSession(REV.shuffle(IDX.all.filter((g) => !ch || ch.indexOf(g.split(':')[0]) >= 0)).slice(0, 20)); break; }
      case 'sess-quit': sess = null; break;
      case 'exam-next': {
        const e = ST.S.exam, c = $app.querySelector('.q'), inp = c.querySelector('input');
        if (inp) e.ans[c.dataset.gid] = inp.value;
        if (e.i >= e.gids.length - 1) examFinish(); else { e.i++; ST.save(); render(); }
        break;
      }
      case 'exam-drop': ST.S.exam = null; ST.save(); render(); break;
      case 'export': download('phycs101-backup-' + new Date().toISOString().slice(0, 10) + '.json', ST.exportJSON()); break;
      case 'reset': if (confirm('Erase all progress (reviews, mistakes, saved items)?')) { ST.reset(); sess = null; applyTheme(); render(); } break;
      case 'copy': {
        const [k, id] = b.dataset.id.split(':'), im = chOf(k).images.find((x) => x.id === id), box = b.closest('.imgcard').querySelector('details');
        const done = () => { const t = b.innerHTML; b.textContent = 'Copied'; setTimeout(() => (b.innerHTML = t), 1800); };
        if (navigator.clipboard) navigator.clipboard.writeText(im.prompt).then(done, () => { box.open = true; }); else box.open = true;
        break;
      }
      default:
    }
  });
  document.addEventListener('input', (ev) => {
    const t = ev.target;
    if (t.dataset && t.dataset.act === 'search') { flt.laws = t.value; filterLaws(t.value); }
    if (t.tagName === 'INPUT' && t.type === 'text' && t.closest('.q[data-exam]')) { ST.S.exam.ans[t.closest('.q').dataset.gid] = t.value; ST.save(); }
  });
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' && ev.target.matches('.q input[type=text]') && !ev.target.closest('[data-exam]')) ev.target.closest('.q').querySelector('[data-act=check]').click();
  });
  document.addEventListener('change', (ev) => {
    const t = ev.target;
    if (t.dataset && t.dataset.act === 'import' && t.files[0]) {
      const r = new FileReader(); r.onload = () => { try { ST.importJSON(r.result); applyTheme(); alert('Imported.'); render(); } catch (e) { alert('That file is not a valid backup.'); } }; r.readAsText(t.files[0]);
    }
  });
  document.addEventListener('submit', (ev) => {
    const f = ev.target; if (!f.dataset.form) return; ev.preventDefault();
    if (f.dataset.form === 'exam') examStart(f); else if (f.dataset.form === 'print') buildPrint(f);
  });
  window.addEventListener('hashchange', render);
  window.__TEST__ = { REV, ST, get sess() { return sess; } };
  applyTheme(); render();
})();
