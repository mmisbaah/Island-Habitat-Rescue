const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = p => fs.readFileSync(path.join(root, p), 'utf8');
const dataFiles = ['species', 'missions', ...[1, 2, 3, 4, 5, 6].map(g => `missions-g${g}`), 'catalog'].map(n => `js/data/${n}.js`);
function environment(saved) {
    let now = 0, id = 0;
    const timers = new Map(), elements = new Map();
    const element = key => {
        if (!elements.has(key)) elements.set(key, { innerHTML: '', textContent: '', style: {}, classList: { add() {}, remove() {} } });
        return elements.get(key);
    };
    const values = new Map(saved === undefined ? [] : [['ihr_island_v2', JSON.stringify(saved)]]);
    const c = { console, Date: class extends Date { static now() { return now; } },
        setTimeout(fn) { timers.set(++id, fn); return id; }, clearTimeout(key) { timers.delete(key); },
        setInterval(fn) { timers.set(++id, fn); return id; }, clearInterval(key) { timers.delete(key); },
        document: { getElementById: element, querySelectorAll() { return []; } },
        localStorage: { getItem(k) { return values.get(k) ?? null; }, setItem(k, v) { values.set(k, v); } }
    };
    c.window = c;
    vm.createContext(c);
    const load = p => vm.runInContext(source(p), c, { filename: p });
    dataFiles.forEach(load);
    ['ui', 'store'].forEach(n => load(`js/core/${n}.js`));
    c.IHR.audio = new Proxy({}, { get: () => () => {} });
    c.IHR.sippy = { say() {} };
    c.IHR.icon = () => '';
    c.App = { grade: 1, updateTopbar() {} };
    return { c, load, timers, values, setNow(n) { now = n; } };
}
test('all 66 missions have valid references, renderable labs, and passing solutions', () => {
    const { c, load } = environment();
    const kinds = ['match', 'sequence', 'choice', 'dials', 'links', 'cascade'];
    kinds.forEach(k => load(`js/labs/${k}.js`));
    assert.equal(c.IHR.MISSIONS.length, 66);
    assert.equal(Object.keys(c.IHR.SPECIES).length, 52);
    assert.equal(new Set(c.IHR.MISSIONS.map(m => m.id)).size, 66);
    for (const grade of c.IHR.GRADES) assert.equal(c.IHR.missionsForGrade(grade).length, 11);
    for (const m of c.IHR.MISSIONS) {
        assert.ok(m.predictions[m.correctPrediction], m.id);
        assert.ok(m.transferChoices[m.transferCorrect], m.id);
        assert.equal(m.explainChoices.filter(v => v.correct).length, 1, m.id);
        m.rewards.forEach(id => assert.ok(c.IHR.SPECIES[id], id));
        const lab = m.lab, engine = c.IHR.labs[lab.kind], state = engine.init(lab);
        assert.ok(engine.render(lab, state).length > 20, m.id);
        if (lab.kind === 'match') lab.items.forEach(it => { state.placements[it.id] = it.target; assert.ok(lab.slots.some(s => s.id === it.target)); });
        if (lab.kind === 'sequence') state.order = lab.correctOrder.slice();
        if (lab.kind === 'choice') { state.picked = lab.correct.slice(); lab.correct.forEach(id => assert.ok(lab.options.some(o => o.id === id))); }
        if (lab.kind === 'dials') lab.dials.forEach(d => { state.values[d.key] = (d.min + d.max) / 2; });
        if (lab.kind === 'links') state.links = lab.pairs.map(p => p.expect);
        if (lab.kind === 'cascade') state.value = lab.target;
        assert.equal(engine.check(lab, state).ok, true, m.id);
    }
});
test('mission identity and progress survive reordering and insertion', () => {
    const { c, load } = environment();
    const before = Object.fromEntries(c.IHR.MISSIONS.map(m => [m.title, m.id]));
    c.IHR.store.setStars('habitat-g1-04', 3);
    c.IHR.MISSIONS.reverse();
    c.IHR.MISSIONS.unshift({ id: 'new-permanent-id', grade: 1, title: 'New site' });
    load('js/data/catalog.js');
    for (const m of c.IHR.MISSIONS) if (m.title !== 'New site') assert.equal(m.id, before[m.title]);
    assert.equal(c.IHR.store.mission('habitat-g1-04').stars, 3);
});
test('malformed saves recover field by field, keeping valid progress', () => {
    const { c } = environment({ grade: 99, missions: { 'habitat-g1-01': { status: 'demonstrated', stars: 3 }, 'habitat-g1-02': null }, journal: null, quizBest: [], daily: { done: null, streak: -3 }, rushBest: 'bad' });
    c.IHR.store.load();
    assert.equal(c.IHR.store.data.grade, 1);
    assert.equal(c.IHR.store.totalStars(), 3);
    assert.equal(c.IHR.store.isRestored('habitat-g1-01'), true);
    assert.equal(c.IHR.store.dailyDone(1), false);
    assert.equal(c.IHR.store.recovered, true);
    assert.equal(c.IHR.store.data.version, 3);
});
test('old version saves keep scores and upgrades do not claim a repair', () => {
    const e = environment();
    const saved = JSON.parse(JSON.stringify(e.c.IHR.store.data));
    delete saved.version;
    saved.missions['habitat-g1-04'] = { status: 'demonstrated', stars: 2 };
    const { c } = environment(saved);
    c.IHR.store.load();
    assert.equal(c.IHR.store.recovered, false);
    assert.equal(c.IHR.store.totalStars(), 2);
    c.IHR.store.setStars('habitat-g1-04', 1);
    c.IHR.store.setStatus('habitat-g1-04', 'explored');
    assert.equal(c.IHR.store.totalStars(), 2);
    assert.equal(c.IHR.store.isRestored('habitat-g1-04'), true);
});
test('invalid JSON and blocked storage do not crash the game', () => {
    const { c, values } = environment();
    values.set('ihr_island_v2', '{broken');
    c.IHR.store.load();
    assert.equal(c.IHR.store.totalStars(), 0);
    c.localStorage.setItem = () => { throw new Error('blocked'); };
    c.IHR.store.setStars('habitat-g1-01', 2);
    assert.equal(c.IHR.store.storageError, true);
    assert.equal(c.IHR.store.totalStars(), 2);
});
function round() {
    const env = environment();
    env.load('js/screens/reef-rush.js');
    const r = env.c.IHR.screens.rush;
    r.active = true;
    r.state = { score: 0, combo: 0, left: 45, endsAt: 45000, current: 'turtle', answers: [], locked: false };
    // Pick a real species without coupling the test to a species key.
    r.state.current = Object.keys(env.c.IHR.SPECIES)[0];
    r.pool = Object.keys(env.c.IHR.SPECIES);
    return { ...env, r, zone: env.c.IHR.SPECIES[r.state.current].zone };
}
test('rapid taps score a creature exactly once', () => {
    const { r, zone, timers } = round();
    r.answer(zone); r.answer(zone); r.answer(zone);
    assert.equal(r.state.score, 10);
    assert.equal(r.state.answers.length, 1);
    assert.equal(timers.size, 1);
});
test('leaving or finishing cancels transitions, including stale callbacks', () => {
    const { r, zone, timers } = round();
    r.answer(zone);
    const stale = [...timers.values()][0];
    r.stop();
    assert.equal(timers.size, 0);
    r.state = { ...r.state, current: 'new-round' };
    r.active = true;
    stale();
    assert.equal(r.state.current, 'new-round');
});
test('answers at the deadline cannot add points before the timer ticks', () => {
    const { r, zone, setNow } = round();
    let ended = false;
    r.end = () => { ended = true; };
    setNow(45000);
    r.answer(zone);
    assert.equal(ended, true);
    assert.equal(r.state.score, 0);
});
test('60 percent loss accepts exactly 40 percent remaining', () => {
    const { c, load } = environment();
    load('js/labs/cascade.js');
    for (const value of [0, 39, 41, 100]) assert.equal(c.IHR.labs.cascade.check({ target: 40 }, { value }).ok, false);
    assert.equal(c.IHR.labs.cascade.check({ target: 40 }, { value: 40 }).ok, true);
});
test('templates contain no inline event handlers', () => {
    const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
    for (const file of [path.join(root, 'index.html'), ...walk(path.join(root, 'js'))]) assert.doesNotMatch(fs.readFileSync(file, 'utf8'), /\son(?:click|input|keydown|dragstart|dragover|dragleave|drop)=/);
});
