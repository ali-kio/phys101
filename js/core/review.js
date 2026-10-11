/* منطق المراجعة: صناديق Leitner (1/1/2/4/8/16 يوم) + دفتر الأخطاء + بناء جلسة اليوم */
(function (root) {
  'use strict';
  const ST = root.STORE || require('./store.js');
  const INT = [0, 1, 2, 4, 8, 16];          // الفاصل (أيام) حسب رقم الصندوق 1..5
  const IDX = { q: {}, l: {}, t: {}, ch: {}, all: [] };

  const numLike = (t) => /^[\u2212\-]?\$?[\d.]/.test(String(t).replace(/<[^>]+>/g, '').trim());
  function typeOf(q) {
    if (/<svg/.test(q.html + (q.options || []).map((o) => o.t).join(''))) return 'graph';
    if (q.kind === 'num' || (q.options && q.options.every((o) => numLike(o.t)))) return 'calc';
    return 'concept';
  }
  function index(chapters) {
    IDX.q = {}; IDX.l = {}; IDX.t = {}; IDX.ch = {}; IDX.all = [];
    chapters.forEach((ch) => {
      IDX.ch[ch.key] = ch;
      ch.laws.forEach((x) => { const g = ch.key + ':l:' + x.id; IDX.l[g] = { gid: g, ch, x }; IDX.all.push(g); });
      ch.traps.forEach((x) => { const g = ch.key + ':t:' + x.id; IDX.t[g] = { gid: g, ch, x }; });
      ch.questions.forEach((x) => { if (!x.type) x.type = typeOf(x); const g = ch.key + ':q:' + x.id; IDX.q[g] = { gid: g, ch, x }; IDX.all.push(g); });
    });
    return IDX;
  }
  const kind = (gid) => gid.split(':')[1];                   // 'l' | 'q' | 't'
  const get = (gid) => ST.S.items[gid];
  const seen = (gid) => !!get(gid);
  const box = (gid) => (get(gid) ? get(gid).box : 0);
  const isDue = (gid) => { const it = get(gid); return !!it && it.due <= ST.today(); };

  /* تسجيل نتيجة عنصر (قانون/سؤال) */
  function grade(gid, ok) {
    const S = ST.S, t = ST.today();
    const it = S.items[gid] || (S.items[gid] = { box: 0, due: t, r: 0, w: 0 });
    if (ok) { it.box = Math.min(5, Math.max(1, it.box + 1)); it.r++; } else { it.box = 1; it.w++; }
    it.due = t + (ok ? INT[it.box] : 1);
    it.last = t;
    if (kind(gid) === 'q') {
      if (!ok) S.mistakes[gid] = { streak: 0, ts: Date.now() };
      else if (S.mistakes[gid] && ++S.mistakes[gid].streak >= 2) delete S.mistakes[gid];
    }
    ST.save();
    return it;
  }
  function toggleStar(gid) { const S = ST.S; if (S.stars[gid]) delete S.stars[gid]; else S.stars[gid] = Date.now(); ST.save(); return !!S.stars[gid]; }

  function shuffle(a, rnd) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor((rnd || Math.random)() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  /* جلسة اليوم: المستحق أولًا ثم جديد (قوانين أولًا ثم أسئلة الدكتور) */
  function buildQueue(o) {
    o = o || {};
    const cap = o.cap || 20, newMax = o.newMax == null ? 6 : o.newMax, rnd = o.rnd;
    const okCh = (g) => !o.chapters || o.chapters.indexOf(g.split(':')[0]) >= 0;
    const okKind = (g) => !o.kinds || o.kinds.indexOf(kind(g)) >= 0;
    const pool = IDX.all.filter((g) => okCh(g) && okKind(g));
    const due = shuffle(pool.filter(isDue), rnd);
    let q = due.slice(0, cap);
    const fresh = pool.filter((g) => !seen(g));
    const laws = fresh.filter((g) => kind(g) === 'l'), qs = fresh.filter((g) => kind(g) === 'q' && IDX.q[g].x.imp === 3);
    const add = laws.slice(0, Math.ceil(newMax * 0.6)).concat(qs.slice(0, newMax));
    q = q.concat(add.slice(0, newMax)).slice(0, cap);
    return { queue: q, due: due.length, fresh: Math.min(newMax, add.length) };
  }
  const dueCount = (chs) => IDX.all.filter((g) => isDue(g) && (!chs || chs.indexOf(g.split(':')[0]) >= 0)).length;
  function boxCounts() { const c = [0, 0, 0, 0, 0, 0]; IDX.all.forEach((g) => { c[box(g)]++; }); return c; }
  function chapterProgress(ch) {
    const gids = IDX.all.filter((g) => g.indexOf(ch.key + ':') === 0);
    const mastered = gids.filter((g) => box(g) >= 3).length;
    const secs = ch.sections.length, read = ch.sections.filter((s) => ST.S.read[ch.key + ':s:' + s.id]).length;
    return { total: gids.length, seen: gids.filter(seen).length, mastered, secs, read, pct: gids.length ? Math.round(100 * mastered / gids.length) : 0 };
  }
  const API = { INT, IDX, index, kind, get, seen, box, isDue, grade, toggleStar, shuffle, buildQueue, dueCount, boxCounts, chapterProgress };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  root.REV = API;
})(typeof window !== 'undefined' ? window : globalThis);
