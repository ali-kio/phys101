/* التخزين المحلي (localStorage) مع نسخة احتياطية في الذاكرة لو كان ممنوعًا */
(function (root) {
  'use strict';
  const KEY = 'phys101.v2';
  const fresh = () => ({ v: 2, theme: 'auto', items: {}, stars: {}, mistakes: {}, read: {}, exam: null, hist: [] });
  let mem = null;
  function load() {
    try { const s = localStorage.getItem(KEY); if (s) return Object.assign(fresh(), JSON.parse(s)); } catch (e) { /* ignore */ }
    return mem || fresh();
  }
  let S = load();
  function save() { mem = S; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }
  function today() { const d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 864e5); }
  function exportJSON() { return JSON.stringify(S); }
  function importJSON(txt) {
    const o = JSON.parse(txt);
    if (!o || typeof o !== 'object' || o.v !== 2 || typeof o.items !== 'object') throw new Error('bad backup');
    S = Object.assign(fresh(), o); save();
  }
  function reset() { S = fresh(); save(); }
  const API = { get S() { return S; }, save, today, exportJSON, importJSON, reset };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  root.STORE = API;
})(typeof window !== 'undefined' ? window : globalThis);
