/* اختبار منطق المراجعة وسلامة بيانات الفصول (node tests/test-core.js) */
const assert = require('assert');
global.window = undefined; global.localStorage = undefined;
global.FIG = require('../js/core/fig.js'); global.VIS = require('../js/chapters/ch02-figs.js'); global.VEC = require('../js/chapters/ch03-figs.js');
const fs = require('fs'), path = require('path');
global.CHAPTERS = [];
fs.readdirSync(path.join(__dirname, '../js/chapters')).filter((f) => /^ch\d+\.js$/.test(f)).forEach((f) => require('../js/chapters/' + f));
const ST = require('../js/core/store.js'); global.STORE = ST;
const REV = require('../js/core/review.js');
REV.index(CHAPTERS);

// 1) سلامة بيانات كل فصل
CHAPTERS.forEach((ch) => {
  const ids = new Set();
  ch.questions.forEach((q) => {
    assert(!ids.has(q.id), 'duplicate q ' + q.id); ids.add(q.id);
    assert(q.html && q.expl && [1, 2, 3].includes(q.imp), 'bad q ' + q.id);
    assert(ch.sections.some((s) => s.id === q.sec), 'bad sec ' + q.id);
    if (q.kind === 'mcq') { assert.strictEqual(q.options.filter((o) => o.ok).length, 1, 'one correct ' + q.id); assert(q.options.length >= 2); }
    else { assert(isFinite(q.ans) && q.unit, 'num q ' + q.id); }
  });
  const lawIds = new Set(ch.laws.map((l) => l.id));
  ch.sections.forEach((s) => s.blocks.forEach((b) => { if (b.k === 'law') assert(lawIds.has(b.id), 'law ref ' + b.id); if (b.k === 'laws') b.ids.forEach((i) => assert(lawIds.has(i), 'laws ref ' + i)); if (b.k === 'img') assert(ch.images.some((i) => i.id === b.id), 'img ' + b.id); }));
  ch.laws.forEach((l) => assert(l.ar && l.ex && l.ex.steps.length && l.tip, 'law needs ar/ex/tip ' + l.id) || assert(l.tex && l.name && l.when && ch.sections.some((s) => s.id === l.sec), 'law ' + l.id));
  ch.images.forEach((i) => assert(i.prompt.includes('STYLE') && i.file.endsWith('.png')));
  console.log(ch.key, 'questions', ch.questions.length, 'laws', ch.laws.length, 'traps', ch.traps.length, 'images', ch.images.length);
});

// 2) Leitner
const g = Object.keys(REV.IDX.q)[0], l = Object.keys(REV.IDX.l)[0], t0 = ST.today();
assert(!REV.seen(g));
REV.grade(g, true); assert.strictEqual(REV.box(g), 1); assert.strictEqual(ST.S.items[g].due, t0 + 1);
REV.grade(g, true); assert.strictEqual(REV.box(g), 2); assert.strictEqual(ST.S.items[g].due, t0 + 2);
REV.grade(g, true); REV.grade(g, true); REV.grade(g, true); REV.grade(g, true); assert.strictEqual(REV.box(g), 5); assert.strictEqual(ST.S.items[g].due, t0 + 16);
REV.grade(g, false); assert.strictEqual(REV.box(g), 1); assert(ST.S.mistakes[g]);
REV.grade(g, true); assert(ST.S.mistakes[g]); REV.grade(g, true); assert(!ST.S.mistakes[g], 'mistake resolved after 2 right');
// 3) due logic
ST.S.items[l] = { box: 2, due: t0 - 1, r: 1, w: 0 }; assert(REV.isDue(l));
ST.S.items[g].due = t0 + 5; assert(!REV.isDue(g));
const q = REV.buildQueue({}); assert(q.queue.includes(l)); assert(q.queue.length <= 20 && new Set(q.queue).size === q.queue.length);
assert(q.fresh <= 6);
REV.toggleStar(l); assert(ST.S.stars[l]); REV.toggleStar(l); assert(!ST.S.stars[l]);
// 4) backup roundtrip
const j = ST.exportJSON(); ST.reset(); assert(!REV.seen(l)); ST.importJSON(j); assert(REV.seen(l));
assert.throws(() => ST.importJSON('{"v":1}'));
console.log('CORE OK');
CHAPTERS.forEach((ch) => ch.questions.forEach((q) => assert(q.ref && ['concept', 'calc', 'graph'].includes(q.type), 'ref/type ' + q.id)));
console.log('META OK');
CHAPTERS.forEach((ch) => ch.questions.forEach((q) => { assert(q.hint && q.hint.type && q.hint.ar, 'hint ' + q.id); q.hint.laws.forEach((i) => assert(ch.laws.some((l) => l.id === i), 'hint law ' + q.id)); }));
console.log('HINTS OK');
