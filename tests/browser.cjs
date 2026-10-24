/* Optional browser QA: npm install --no-save playwright, then node tests/browser.cjs.
   Set BROWSER_EXECUTABLE for a local Chrome/Edge install. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
    process.env.PORT = '4191';
    const server = require('../tools/serve.cjs');
    const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
    const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.route('https://fonts.googleapis.com/**', r => r.abort());
    const out = path.resolve(__dirname, '../test-results');
    fs.mkdirSync(out, { recursive: true });
    try {
        await page.goto('http://127.0.0.1:4191');
        await page.waitForSelector('.home');
        await page.screenshot({ path: path.join(out, 'home-desktop.png'), fullPage: true });
        // The radio group works with arrows and keeps focus on the new selection.
        await page.locator('[role="radio"]').first().focus();
        await page.keyboard.press('ArrowRight');
        assert.equal(await page.evaluate(() => App.grade), 2);
        assert.equal(await page.locator('[role="radio"][aria-checked="true"]').getAttribute('aria-label').then(v => v.startsWith('Grade 2')), true);
        // Dialog entry, focus wrapping, Escape, and return to the opener.
        await page.locator('#btn-settings').click();
        assert.equal(await page.locator('.modal-close').evaluate(el => el === document.activeElement), true);
        await page.keyboard.press('Shift+Tab');
        assert.equal(await page.evaluate(() => document.activeElement.closest('#modal') !== null), true);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#btn-settings').evaluate(el => el === document.activeElement), true);
        await page.locator('[role="radio"]').first().click();
        await page.locator('.play-card').click();
        await page.screenshot({ path: path.join(out, 'island-desktop.png'), fullPage: true });
        // Complete the first mission through the delegated controls, including keyboard placement.
        await page.locator('.mission-card').first().click();
        await page.getByRole('button', { name: /Make a prediction/ }).click();
        await page.locator('.choice').first().click();
        await page.getByRole('button', { name: /Open the lab/ }).click();
        assert.ok(await page.locator('#play-bar').evaluate(el => el.getBoundingClientRect().height >= 44), 'mission controls must not be clipped by home progress styles');
        const items = await page.evaluate(() => Mission.m.lab.items.map(it => ({ id: it.id, target: it.target })));
        for (const it of items) {
            await page.locator(`[data-focus="card-${it.id}"]`).focus();
            await page.keyboard.press('Enter');
            await page.locator(`[data-focus="slot-${it.target}"]`).focus();
            await page.keyboard.press('Enter');
        }
        await page.getByRole('button', { name: /Run trial/ }).click();
        await page.getByRole('button', { name: /Explain it/ }).click();
        const explain = await page.evaluate(() => Mission.m.explainChoices.findIndex(c => c.correct));
        await page.locator('.choice').nth(explain).click();
        await page.getByRole('button', { name: /Check my reason/ }).click();
        const transfer = await page.evaluate(() => Mission.m.transferCorrect);
        await page.locator('.choice').nth(transfer).click();
        await page.getByRole('button', { name: /Finish the rescue/ }).click();
        await page.waitForSelector('.summary');
        assert.equal(await page.evaluate(() => IHR.store.isRestored('habitat-g1-01')), true);
        await page.reload();
        await page.waitForSelector('.home');
        assert.equal(await page.evaluate(() => IHR.store.mission('habitat-g1-01').stars), 3);
        // Every mission renders every step and lab in the real browser.
        const checked = await page.evaluate(() => {
            for (const m of IHR.MISSIONS) {
                App.go('mission', { id: m.id });
                Mission.pickPrediction(m.correctPrediction);
                Mission.go('PLAY');
                if (!document.querySelector('#lab-canvas').children.length) throw new Error(m.id);
                for (const step of ['EVIDENCE', 'EXPLAIN', 'TRANSFER']) Mission.go(step);
            }
            App.go('home');
            return IHR.MISSIONS.length;
        });
        assert.equal(checked, 66);
        // Screenshots of diagram states at useful sizes.
        for (const [width, height] of [[1366, 900], [390, 844], [320, 568], [844, 390]]) {
            await page.setViewportSize({ width, height });
            await page.evaluate(() => App.go('home'));
            assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `home overflow ${width}`);
            await page.screenshot({ path: path.join(out, `home-${width}.png`), fullPage: true });
            for (const kind of ['links', 'cascade', 'choice']) {
                await page.evaluate(kind => {
                    const m = IHR.MISSIONS.find(m => m.lab.kind === kind && (kind !== 'choice' || m.lab.visual?.type === 'models'));
                    App.go('mission', { id: m.id });
                    Mission.pickPrediction(m.correctPrediction);
                    Mission.go('PLAY');
                    if (kind === 'links') {
                        Mission.rt.lab.links = m.lab.pairs.map(p => p.expect);
                        Mission.refresh();
                        Mission.run();
                    }
                    if (kind === 'cascade') { Mission.rt.lab.value = m.lab.target; Mission.refresh(); Mission.run(); }
                }, kind);
                if (kind === 'cascade') await page.waitForSelector('.trial-outcome', { timeout: 10000 });
                await page.evaluate(() => IHR.sippy.hide());
                assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${kind} overflow ${width}`);
                await page.screenshot({ path: path.join(out, `${kind}-${width}.png`), fullPage: true });
            }
        }
        // Real browser repeated-click and timer cleanup checks.
        await page.evaluate(() => { App.go('rush'); IHR.screens.rush.start(); });
        const score = await page.evaluate(() => {
            const r = IHR.screens.rush, zone = IHR.SPECIES[r.state.current].zone;
            for (let i = 0; i < 8; i++) document.getElementById(`rush-${zone}`).click();
            App.go('home');
            return r.state.score;
        });
        assert.equal(score, 10);
        await page.waitForTimeout(1000);
        // Loading corrupt saved data keeps the page usable.
        await page.evaluate(() => localStorage.setItem('ihr_island_v2', '{"missions":null,"grade":99,"daily":{"done":null}}'));
        await page.reload();
        await page.waitForSelector('.home');
        assert.equal(await page.locator('#storage-notice').isVisible(), true);
        assert.deepEqual(errors, []);
        console.log('Browser QA passed: complete mission + persistence, 66 mission renders, keyboard matching, dialog focus, radio navigation, 4 viewport sizes, diagrams, rapid taps, malformed saves.');
    } finally { await browser.close(); server.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
