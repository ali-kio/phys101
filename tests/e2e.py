# Playwright end-to-end test: python3 tests/e2e.py  (serve the project on :8765 first)
from playwright.sync_api import sync_playwright
U = 'http://localhost:8765/index.html'
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    for vp in [{'width': 390, 'height': 844}, {'width': 820, 'height': 1180}, {'width': 1280, 'height': 800}]:
        pg = b.new_page(viewport=vp); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(U); pg.wait_for_selector('.hero')
        for r, sel in [('#/ch/ch02/learn', '.sec'), ('#/ch/ch02/practice/4', '.q'), ('#/laws', '.formula'), ('#/settings', '.seg'), ('#/print', 'form')]:
            pg.evaluate('h=>location.hash=h', r); pg.wait_for_selector(sel)
            assert not pg.evaluate('document.documentElement.scrollWidth>innerWidth'), ('hscroll', vp, r)
        pg.evaluate("location.hash='#/laws'"); pg.wait_for_selector('.formula')
        assert pg.locator('.formula .katex .mfrac').count() > 0, 'fractions render'
        assert not errs, errs
    pg = b.new_page(viewport={'width': 390, 'height': 844})
    pg.goto(U); pg.wait_for_selector('.hero')
    # hint + collapsible lesson
    pg.evaluate("location.hash='#/ch/ch02/practice/4'"); pg.wait_for_selector('.q')
    assert pg.locator('.hintbox').first.is_hidden(); pg.click('[data-act=hint]'); assert pg.locator('.hintbox').first.is_visible()
    pg.evaluate("location.hash='#/ch/ch02/learn'"); pg.wait_for_selector('details.sec')
    assert pg.locator('details.sec[open]').count() == 1 and pg.locator('details.topic').count() > 6
    pg.evaluate("location.hash='#/'"); pg.wait_for_selector('.hero')
    # review session
    pg.click('[data-act=sess-start]'); pg.wait_for_selector('.fc, .q')
    pg.click('[data-act=flip]'); pg.click('[data-act=know][data-v="0"]')
    # exam with blanks: mistakes must stay unchanged
    pg.evaluate("location.hash='#/exam'"); pg.wait_for_selector('form[data-form=exam]')
    before = pg.evaluate('Object.keys(__TEST__.ST.S.mistakes).length')
    pg.click('form[data-form=exam] button[type=submit]'); pg.wait_for_selector('.timer')
    for _ in range(14):
        pg.click('[data-act=exam-next]'); pg.wait_for_timeout(50)
    pg.click('[data-act=exam-next]'); pg.wait_for_selector('.stats')
    assert pg.evaluate('Object.keys(__TEST__.ST.S.mistakes).length') == before, 'blank questions must not enter mistakes'
    # print + backup
    pg.evaluate("location.hash='#/print'"); pg.wait_for_selector('form[data-form=print]')
    pg.click('form[data-form=print] button[type=submit]'); pg.wait_for_selector('.pr-cols .katex')
    j = pg.evaluate('__TEST__.ST.exportJSON()'); pg.evaluate('__TEST__.ST.reset()'); pg.evaluate('j=>__TEST__.ST.importJSON(j)', j)
    # image fallbacks
    pg.evaluate("location.hash='#/ch/ch02/learn'"); pg.wait_for_selector('.sec'); pg.wait_for_timeout(500)
    assert pg.locator('.imgslot.missing').count() == 4
    b.close()
print('E2E OK')
