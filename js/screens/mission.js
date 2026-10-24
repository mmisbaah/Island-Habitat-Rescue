/**
 * MISSION FLOW: Clues → Predict → Lab → Evidence → Explain → Transfer → Rescue summary.
 *
 * Stars (best result is kept):
 *   1. Lab solved first try   2. No hints used   3. Explain + Transfer right first try
 * Predictions are never scored. A wrong prediction is part of doing science.
 */
window.IHR = window.IHR || {};
IHR.screens = IHR.screens || {};

const Mission = {
    m: null,
    rt: null,
    step: null,
    trial: null,
    timers: [],

    STEPS: [
        { id: 'BRIEF', label: 'Clues' },
        { id: 'PREDICT', label: 'Predict' },
        { id: 'PLAY', label: 'Lab' },
        { id: 'EVIDENCE', label: 'Evidence' },
        { id: 'EXPLAIN', label: 'Explain' },
        { id: 'TRANSFER', label: 'Transfer' }
    ],

    // Game modes that launch a mission; Island Rescue launches with no mode
    MODES: {
        daily: { label: '📅 Daily Mission' },
        mystery: { label: '🎁 Mystery Mission' }
    },

    // Called by App.go('mission', { id, step, mode }); returns a cleanup function
    mount(el, opts) {
        this.el = el;
        this.m = IHR.MISSIONS.find(x => x.id === opts.id);
        this.mode = this.MODES[opts.mode] ? opts.mode : null;
        this.rt = {
            prediction: null,
            lab: this.lab().init(this.m.lab),
            labFails: 0,
            hintsUsed: 0,
            explainFails: 0,
            transferFails: 0,
            explainChoice: null,
            transferChoice: null,
            trialNote: null
        };
        App.setGrade(this.m.grade);
        this.go(opts.step && opts.step !== 'SUMMARY' ? opts.step : 'BRIEF');
        return () => this.stopTrial();
    },

    lab() { return IHR.labs[this.m.lab.kind]; },

    go(step) {
        this.stopTrial();
        // Skipping ahead without a prediction (e.g. after a reload) falls back to Predict
        if (['PLAY', 'EVIDENCE', 'EXPLAIN', 'TRANSFER'].includes(step) && this.rt.prediction === null) step = 'PREDICT';
        this.step = step;
        window.scrollTo(0, 0);
        const m = this.m;

        const body = {
            BRIEF: () => this.brief(m),
            PREDICT: () => this.predict(m),
            PLAY: () => this.play(m),
            EVIDENCE: () => this.evidence(m),
            EXPLAIN: () => this.explain(m),
            TRANSFER: () => this.transfer(m),
            SUMMARY: () => this.summary(m)
        }[step]();

        this.el.innerHTML = `
            <section class="mission zone-${m.zone}">
                <div class="mission-top">
                    ${this.mode
                        ? `<button class="btn btn-ghost" onclick="App.go('home')">${IHR.icon('back')} Home</button>`
                        : `<button class="btn btn-ghost" onclick="App.go('hub')">${IHR.icon('map')} Island</button>`}
                    ${this.mode ? `<span class="mode-pill">${this.MODES[this.mode].label}</span>` : ''}
                    <span class="mission-id">Grade ${m.grade} · Mission ${m.num} · ${IHR.ZONES[m.zone].emoji} ${IHR.ZONES[m.zone].name}</span>
                </div>
                ${step === 'SUMMARY' ? '' : this.stepsBar()}
                <div class="mission-body">${body}</div>
            </section>
        `;

        if (step === 'PLAY') this.refresh();
        this.afterRender(step);
    },

    stepsBar() {
        const at = this.STEPS.findIndex(s => s.id === this.step);
        return `
            <ol class="steps" aria-label="Mission progress">
                ${this.STEPS.map((s, i) => `
                    <li class="${i < at ? 'is-done' : ''} ${i === at ? 'is-now' : ''}" ${i === at ? 'aria-current="step"' : ''}>
                        <span class="step-dot">${i < at ? IHR.icon('check') : i + 1}</span>
                        <span class="step-label">${s.label}</span>
                    </li>
                `).join('')}
            </ol>
        `;
    },

    afterRender(step) {
        const say = IHR.sippy.say.bind(IHR.sippy);
        if (step === 'BRIEF') say('Read the clue cards. They hold the evidence.', 'wave');
        if (step === 'PREDICT') say('What do you think will happen?', 'think');
        if (step === 'PLAY') say('Build it, then press Run trial!', 'happy');
        if (step === 'EXPLAIN') say('Which reason matches your evidence?', 'think');
        if (step === 'TRANSFER') say('Last step! Same science, new place.', 'happy');
    },

    /* ───────────── STEP VIEWS ───────────── */

    brief(m) {
        return `
            <div class="brief-banner">
                <span class="brief-art" aria-hidden="true">${m.siteEmoji}</span>
                <div>
                    <h1 class="display">${m.title}</h1>
                    <p>${m.goal}</p>
                </div>
            </div>
            <h2 class="section-title">Clue cards</h2>
            <div class="clues">
                ${m.clues.map((c, i) => `
                    <article class="clue">
                        <span class="clue-art" aria-hidden="true">${c.emoji}</span>
                        <div>
                            <span class="clue-n">Clue ${i + 1}</span>
                            <h3>${c.title}</h3>
                            <p>${c.text}</p>
                        </div>
                    </article>
                `).join('')}
            </div>
            <div class="nav-row">
                <span></span>
                <button class="btn btn-coral btn-lg" onclick="Mission.go('PREDICT')">Make a prediction ${IHR.icon('next')}</button>
            </div>
        `;
    },

    predict(m) {
        return `
            <div class="panel step-panel">
                <p class="eyebrow">Step 2 · Predict</p>
                <h2 class="display-sm">What do you predict?</h2>
                <p class="muted">Pick the idea the clue cards support. The lab will test it.</p>
                <div class="choice-list">
                    ${m.predictions.map((p, i) => this.choiceButton(p.emoji, p.label, this.rt.prediction === i, `Mission.pickPrediction(${i})`)).join('')}
                </div>
            </div>
            <div class="nav-row">
                <button class="btn btn-ghost" onclick="Mission.go('BRIEF')">${IHR.icon('back')} Clues</button>
                <button class="btn btn-coral btn-lg" ${this.rt.prediction === null ? 'disabled' : ''} onclick="Mission.go('PLAY')">Open the lab ${IHR.icon('next')}</button>
            </div>
        `;
    },

    play(m) {
        return `
            <div class="lab-head">
                <div>
                    <p class="eyebrow">Step 3 · Visual lab</p>
                    <h2 class="display-sm">${m.lab.instruction}</h2>
                </div>
                <span class="prediction-pill">Your prediction: <b>${m.predictions[this.rt.prediction].label}</b></span>
            </div>
            <div id="lab-canvas" class="lab-canvas"></div>
            <div id="play-bar" class="play-bar">${this.playBar()}</div>
        `;
    },

    playBar() {
        return `
            <div class="row">
                <button class="btn btn-ghost" onclick="Mission.go('PREDICT')">${IHR.icon('back')} Prediction</button>
                <button class="btn btn-ghost" onclick="Mission.resetLab()">${IHR.icon('reset')} Reset</button>
                ${this.hintButton()}
            </div>
            <button class="btn btn-coral btn-lg btn-run" onclick="Mission.run()">${IHR.icon('play')} Run trial</button>
        `;
    },

    evidence(m) {
        IHR.store.setStatus(m.id, 'explored');
        const held = this.rt.prediction === m.correctPrediction;
        const right = m.predictions[m.correctPrediction].label;
        return `
            <div class="panel step-panel">
                <p class="eyebrow">Step 4 · Evidence</p>
                <h2 class="display-sm">Here’s what your trial showed</h2>
                ${this.rt.trialNote ? `<p class="trial-note">${this.rt.trialNote}</p>` : ''}
                <div class="evidence-grid">${IHR.ui.evidenceCards(m.lab.evidence)}</div>
                <div class="verdict ${held ? 'is-held' : 'is-revised'}">
                    <span class="verdict-art" aria-hidden="true">${held ? '🎯' : '🔄'}</span>
                    <p>${held
                        ? `<b>Your prediction was supported.</b> The trial agrees: “${right}”.`
                        : `<b>The evidence did not support your prediction.</b> That’s how science works! The trial points to: “${right}”.`}</p>
                </div>
            </div>
            <div class="nav-row">
                <button class="btn btn-ghost" onclick="Mission.go('PLAY')">${IHR.icon('back')} Back to the lab</button>
                <button class="btn btn-coral btn-lg" onclick="Mission.go('EXPLAIN')">Explain it ${IHR.icon('next')}</button>
            </div>
        `;
    },

    explain(m) {
        return `
            <div class="panel step-panel">
                <p class="eyebrow">Step 5 · Explain</p>
                <h2 class="display-sm">Scientific claim</h2>
                <blockquote class="claim">${m.claim}</blockquote>
                <p class="muted">Which reason backs up this claim?</p>
                <div class="choice-list" id="explain-choices">
                    ${m.explainChoices.map((c, i) => this.choiceButton(String.fromCharCode(65 + i), c.text, this.rt.explainChoice === i, `Mission.pickExplain(${i})`, 'is-letter')).join('')}
                </div>
                <div class="hint-row">
                    <span>${IHR.icon('bulb')} Stuck?</span>
                    ${this.hintButton()}
                </div>
            </div>
            <div class="nav-row">
                <button class="btn btn-ghost" onclick="Mission.go('EVIDENCE')">${IHR.icon('back')} Evidence</button>
                <button class="btn btn-coral btn-lg" ${this.rt.explainChoice === null ? 'disabled' : ''} onclick="Mission.submitExplain()">Check my reason ${IHR.icon('next')}</button>
            </div>
        `;
    },

    transfer(m) {
        IHR.store.setStatus(m.id, 'practised');
        return `
            <div class="panel step-panel">
                <p class="eyebrow">Step 6 · Transfer</p>
                <h2 class="display-sm">Same science, new place</h2>
                <div class="transfer-q">
                    <span aria-hidden="true">🧭</span>
                    <p>${m.transferQ}</p>
                </div>
                <div class="choice-list" id="transfer-choices">
                    ${m.transferChoices.map((t, i) => this.choiceButton(String.fromCharCode(65 + i), t, this.rt.transferChoice === i, `Mission.pickTransfer(${i})`, 'is-letter')).join('')}
                </div>
            </div>
            <div class="nav-row">
                <span></span>
                <button class="btn btn-coral btn-lg" ${this.rt.transferChoice === null ? 'disabled' : ''} onclick="Mission.submitTransfer()">Finish the rescue ${IHR.icon('check')}</button>
            </div>
        `;
    },

    summary(m) {
        const S = IHR.store;
        const earned = [
            { ok: this.rt.labFails === 0, label: 'Lab solved first try' },
            { ok: this.rt.hintsUsed === 0, label: 'No hints used' },
            { ok: this.rt.explainFails === 0 && this.rt.transferFails === 0, label: 'Explained and applied first try' }
        ];
        const stars = earned.filter(e => e.ok).length;
        const wasRestored = S.isRestored(m.id);
        const best = S.mission(m.id).stars || 0;
        const newBest = S.setStars(m.id, stars);
        S.setStatus(m.id, 'demonstrated');
        const fresh = S.unlock(m.rewards);

        // Mode banners: a daily only counts if it is still today's pick for this grade
        let modeBanner = '';
        if (this.mode === 'daily' && S.dailyMission(m.grade).id === m.id) {
            const daily = S.completeDaily(m.grade);
            modeBanner = daily.first
                ? `📅 Daily mission complete! Your streak: <b>🔥 ${daily.streak} day${daily.streak === 1 ? '' : 's'}</b>`
                : `📅 You already finished today’s daily. Streak: <b>🔥 ${daily.streak}</b>`;
        } else if (this.mode === 'mystery') {
            modeBanner = '🎁 Mystery solved! Try another from the home page.';
        }
        App.updateTopbar();

        const next = this.nextMission(m);

        // Stars pop in one at a time
        earned.forEach((e, i) => { if (e.ok) setTimeout(() => IHR.audio.star(i), 450 + i * 380); });
        IHR.audio.success();
        setTimeout(() => IHR.sippy.say(stars === 3 ? 'Three stars! A perfect rescue!' : 'Rescue complete! Replay to collect every star.', 'cheer'), 300);

        return `
            <div class="summary">
                <p class="eyebrow">Mission ${m.num} complete</p>
                <h1 class="display">${wasRestored ? 'Rescue replayed!' : 'Site restored!'}</h1>

                <div class="summary-stars">
                    ${earned.map((e, i) => `
                        <div class="earned ${e.ok ? 'is-on' : ''}" style="--i:${i}">
                            ${IHR.icon('star', 'big-star')}
                            <span>${e.label}</span>
                        </div>
                    `).join('')}
                </div>
                ${newBest && wasRestored ? `<p class="best-note">New best: ${stars} stars (was ${best})</p>` : ''}
                ${modeBanner ? `<p class="mode-banner">${modeBanner}</p>` : ''}

                <div class="panel restore-card">
                    <span class="restore-art" aria-hidden="true">${m.siteEmoji}</span>
                    <div>
                        <span class="eyebrow">On the island</span>
                        <p><b>${m.restore}.</b></p>
                        <p class="muted">“${m.claim}”</p>
                    </div>
                </div>

                ${fresh.length ? `
                    <h2 class="section-title">New in your Field Journal</h2>
                    <div class="new-species">
                        ${fresh.map((id, i) => {
                            const s = IHR.SPECIES[id];
                            return `
                                <article class="species tone-${s.tone} is-new" style="--i:${i}">
                                    <div class="species-art" aria-hidden="true">${s.emoji}</div>
                                    <h3>${s.name}</h3>
                                    ${s.local ? `<p class="local">Dhivehi: ${s.local}</p>` : ''}
                                    <p>${s.fact}</p>
                                </article>
                            `;
                        }).join('')}
                    </div>
                ` : ''}

                <div class="nav-row is-center">
                    <button class="btn btn-coral btn-lg" onclick="App.go('hub', { highlight: '${m.id}' })">${IHR.icon('map')} See your island</button>
                    ${this.mode === 'mystery'
                        ? `<button class="btn btn-sand btn-lg" onclick="IHR.screens.home.mystery()">🎁 Another mystery</button>`
                        : next && !this.mode ? `<button class="btn btn-sand btn-lg" onclick="App.go('mission', { id: '${next.id}' })">Next: ${next.title} ${IHR.icon('next')}</button>` : ''}
                    <button class="btn btn-ghost" onclick="App.go('home')">${IHR.icon('back')} Home</button>
                    <button class="btn btn-ghost" onclick="App.go('mission', { id: '${m.id}'${this.mode ? `, mode: '${this.mode}'` : ''} })">${IHR.icon('reset')} Replay</button>
                </div>
            </div>
        `;
    },

    // Next mission in the same grade
    nextMission(m) {
        return IHR.missionsForGrade(m.grade).find(x => x.num > m.num) || null;
    },

    choiceButton(mark, text, on, handler, cls = '') {
        return `
            <button class="choice ${on ? 'is-on' : ''}" onclick="${handler}" aria-pressed="${on}">
                <span class="choice-mark ${cls}" aria-hidden="true">${mark}</span>
                <span class="choice-text">${text}</span>
                <span class="tick-box">${on ? IHR.icon('check') : ''}</span>
            </button>
        `;
    },

    hintButton() {
        const total = this.m.hints.length;
        const used = this.rt.hintsUsed;
        return `<button class="btn btn-ghost hint-btn" onclick="Mission.hint()">${IHR.icon('bulb')} ${used >= total ? 'Repeat hint' : `Hint ${used + 1}/${total}`}</button>`;
    },

    /* ───────────── LAB PLUMBING ───────────── */

    refresh() {
        const canvas = document.getElementById('lab-canvas');
        if (canvas) canvas.innerHTML = this.lab().render(this.m.lab, this.rt.lab);
    },

    act(name, ...args) {
        if (this.trial) return;
        const fn = this.lab().actions[name];
        if (!fn) return;
        if (fn(this.m.lab, this.rt.lab, ...args) !== false) this.refresh();
    },

    drag(event, id) {
        event.dataTransfer.setData('text/plain', id);
        event.dataTransfer.effectAllowed = 'move';
    },

    drop(event, slotId) {
        event.preventDefault();
        event.currentTarget.classList.remove('is-over');
        const id = event.dataTransfer.getData('text/plain');
        if (id) this.act('place', id, slotId);
    },

    resetLab() {
        IHR.audio.click();
        this.rt.lab = this.lab().init(this.m.lab);
        this.refresh();
    },

    run() {
        const result = this.lab().check(this.m.lab, this.rt.lab);
        if (!result.ok) return this.labFailed(result.message);

        if (this.lab().startTrial && this.m.lab.trial) return this.startTrial();

        IHR.audio.success();
        this.rt.trialNote = null;
        IHR.sippy.say('It works! Let’s look at the evidence.', 'cheer');
        this.go('EVIDENCE');
    },

    labFailed(message) {
        IHR.audio.error();
        this.rt.labFails++;
        this.rt.lab.checked = true;
        this.refresh();
        IHR.sippy.say(message, 'worried', 9000);
    },

    startTrial() {
        IHR.audio.pop();
        const canvas = document.getElementById('lab-canvas');
        document.getElementById('play-bar').innerHTML = '<span class="trial-running"><span class="dot-pulse"></span> Trial running…</span>';
        const ctx = {
            el: canvas,
            after: (ms, fn) => { this.timers.push(setTimeout(fn, ms)); },
            say: (text, mood) => IHR.sippy.say(text, mood),
            finish: result => this.trialFinished(result)
        };
        this.trial = this.lab().startTrial(this.m.lab, this.rt.lab, ctx) || { act() {} };
    },

    trialAct(name, ...args) {
        if (this.trial) this.trial.act(name, ...args);
    },

    trialFinished(result) {
        const bar = document.getElementById('play-bar');
        if (!bar) return;
        if (result.ok) {
            IHR.audio.success();
            this.rt.trialNote = result.note || null;
            if (!result.note || this.m.lab.trial !== 'energy') IHR.sippy.say('Trial complete! Let’s look at the evidence.', 'cheer');
            bar.innerHTML = `
                <span class="trial-outcome is-good">${IHR.icon('check')} Trial complete</span>
                <button class="btn btn-coral btn-lg" onclick="Mission.go('EVIDENCE')">See the evidence ${IHR.icon('next')}</button>
            `;
        } else {
            IHR.audio.error();
            this.rt.labFails++;
            IHR.sippy.say(result.message, 'worried', 9000);
            bar.innerHTML = `
                <span class="trial-outcome is-bad">${IHR.icon('x')} ${result.message}</span>
                <button class="btn btn-sand btn-lg" onclick="Mission.backToLab()">${IHR.icon('reset')} Back to the lab</button>
            `;
        }
    },

    backToLab() {
        this.stopTrial();
        this.rt.lab.checked = false;
        document.getElementById('play-bar').innerHTML = this.playBar();
        this.refresh();
    },

    stopTrial() {
        this.timers.forEach(clearTimeout);
        this.timers = [];
        this.trial = null;
    },

    /* ───────────── ANSWERS ───────────── */

    pickPrediction(i) {
        IHR.audio.click();
        this.rt.prediction = i;
        this.go('PREDICT');
    },

    pickExplain(i) {
        IHR.audio.click();
        this.rt.explainChoice = i;
        this.go('EXPLAIN');
    },

    submitExplain() {
        const choice = this.m.explainChoices[this.rt.explainChoice];
        if (choice && choice.correct) {
            IHR.audio.success();
            this.go('TRANSFER');
        } else {
            IHR.audio.error();
            this.rt.explainFails++;
            this.shake('explain-choices');
            IHR.sippy.say('Not quite. That reason doesn’t match your trial. Try a hint?', 'worried');
        }
    },

    pickTransfer(i) {
        IHR.audio.click();
        this.rt.transferChoice = i;
        this.go('TRANSFER');
    },

    submitTransfer() {
        if (this.rt.transferChoice === this.m.transferCorrect) {
            this.go('SUMMARY');
        } else {
            IHR.audio.error();
            this.rt.transferFails++;
            this.shake('transfer-choices');
            IHR.sippy.say('Use the same science you found in the lab!', 'worried');
        }
    },

    hint() {
        IHR.audio.click();
        const hints = this.m.hints;
        const idx = Math.min(this.rt.hintsUsed, hints.length - 1);
        if (this.rt.hintsUsed < hints.length) this.rt.hintsUsed++;
        IHR.sippy.say(`Hint ${idx + 1}/${hints.length}: ${hints[idx]}`, 'think', 10000);
        document.querySelectorAll('.hint-btn').forEach(btn => { btn.outerHTML = this.hintButton(); });
    },

    shake(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.remove('is-shaking');
        void el.offsetWidth;
        el.classList.add('is-shaking');
    }
};

window.Mission = Mission;
IHR.screens.mission = { render: (el, opts) => Mission.mount(el, opts) };
