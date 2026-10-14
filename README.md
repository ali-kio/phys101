# PHYCS101 — Physics 1 Study Hub

Static site (HTML/CSS/vanilla JS). Works on GitHub Pages: push the folder, enable Pages. UI is English; formulas render with KaTeX (vendored, works offline).

## Structure
- `index.html` — loads scripts; one `<script>` line per chapter (marked block).
- `js/chapters/chNN.js` — chapter data: `{id,key,icon,title,sections,laws,traps,quick,questions,images,videos}`.
- `js/core/` — `store` (localStorage, key `phys101.v2`), `review` (Leitner boxes, mistakes), `ui`, `app` (router/pages), `fig` (SVG graphs).
- `assets/vendor/` — KaTeX and Inter font. `assets/images/chNN/` — optional PNGs (see Images guide in Settings; built-in SVG drawings show if missing).

## Add a chapter
Copy `ch02.js` shape into `ch03.js`, add `<script src="js/chapters/ch03.js"></script>` in index.html. Lessons: each section has `blocks`; `{k:'h',title}` starts a collapsible topic. Block kinds: h, arx (Arabic explanation), text, list, law, laws (several related formulas in one card), ex, sum, pit, tip, fig, tbl, img, mount, ar. Each law has `ar`, `when`, `tip` and `ex` (worked example). Each question gets a hidden `hint` {type, laws, ar}. Math: `$..$` inline, `$$..$$` display (LaTeX).

## Tests
`node tests/test-core.js` (data + review logic). `python3 -m http.server 8765` then `python3 tests/e2e.py` (Playwright).

## Chapter extensions (v4)
`chNN-ext.js` loads after `chNN.js` and only adds: per-law `not`/`alt`/`from` and Arabic lines, `families` (law-family map cards), `chooser` ("which law do I use?"), `pairs` (easily confused), section `notebook` boxes, lesson-check questions (`cap`), Arabic for pitfalls, and `words` (tap/hover glossary). `node tests/test-core.js` checks that every law has "when not", an Arabic tip and a family, and every lesson has a notebook box and a lesson-check question.
