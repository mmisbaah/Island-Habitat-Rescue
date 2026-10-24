/**
 * REEF RUSH: a 45-second bonus round, separate from the missions.
 * A creature washes up; tap the zone where it lives. Three in a row doubles the points.
 * The timer lives only here, never on the reasoning steps of a mission.
 */
window.IHR = window.IHR || {};
IHR.screens = IHR.screens || {};

IHR.screens.rush = {
    DURATION: 45,

    render(el) {
        this.el = el;
        this.pool = Object.keys(IHR.SPECIES).filter(id => IHR.SPECIES[id].rush !== false);
        this.intro();
        IHR.sippy.say('Quick! Where does each creature live?', 'happy');
        return () => this.stop();
    },

    intro() {
        this.stop();
        this.el.innerHTML = `
            <section class="rush">
                <div class="panel rush-card">
                    <p class="eyebrow">Bonus round</p>
                    <h1 class="display">Reef Rush</h1>
                    <p>A creature washes up. Tap where it lives: <b>Lagoon</b>, <b>Beach</b> or <b>Jungle</b>.</p>
                    <ul class="rush-rules">
                        <li>${IHR.icon('timer')} 45 seconds</li>
                        <li>⭐ 10 points for each right answer</li>
                        <li>🔥 3 in a row and every answer scores double</li>
                    </ul>
                    <p class="muted">Best score: <b>${IHR.store.data.rushBest}</b></p>
                    <div class="row is-center">
                        <button class="btn btn-coral btn-lg" ${IHR.ui.action('IHR.screens.rush.start')}>${IHR.icon('play')} Start</button>
                        <button class="btn btn-ghost" ${IHR.ui.action('App.go', 'home')}>${IHR.icon('back')} Home</button>
                    </div>
                </div>
            </section>
        `;
    },

    start() {
        this.stop();
        this.active = true;
        IHR.audio.click();
        this.state = { score: 0, combo: 0, left: this.DURATION, current: null, last: null, answers: [], locked: false, endsAt: Date.now() + this.DURATION * 1000 };
        this.el.innerHTML = `
            <section class="rush">
                <div class="rush-hud">
                    <span class="rush-score">Score <b id="rush-score">0</b></span>
                    <span class="rush-combo" id="rush-combo"></span>
                    <span class="rush-time">${IHR.icon('timer')} <b id="rush-time">${this.DURATION}</b>s</span>
                </div>
                <div class="rush-timer"><i id="rush-bar"></i></div>
                <div class="rush-creature" id="rush-creature"></div>
                <div class="rush-zones">
                    ${Object.keys(IHR.ZONES).map(z => `
                        <button class="rush-zone zone-${z}" id="rush-${z}" ${IHR.ui.action('IHR.screens.rush.answer', z)}>
                            <span aria-hidden="true">${IHR.ZONES[z].emoji}</span>${IHR.ZONES[z].name}
                        </button>
                    `).join('')}
                </div>
            </section>
        `;
        this.next();
        this.timer = setInterval(() => this.tick(), 100);
    },

    tick() {
        const s = this.state;
        const left = Math.max(0, (s.endsAt - Date.now()) / 1000);
        const shown = Math.ceil(left);
        if (shown !== s.left && shown <= 5 && shown > 0) IHR.audio.tick();
        s.left = shown;
        const timeEl = document.getElementById('rush-time');
        if (!timeEl) return this.stop();
        timeEl.textContent = shown;
        document.getElementById('rush-bar').style.width = `${(left / this.DURATION) * 100}%`;
        if (left <= 0) this.end();
    },

    next() {
        if (!this.active) return;
        if (Date.now() >= this.state.endsAt) return this.end();
        const s = this.state;
        let id;
        do { id = this.pool[Math.floor(Math.random() * this.pool.length)]; } while (id === s.last && this.pool.length > 1);
        s.current = id;
        s.last = id;
        s.locked = false;
        const sp = IHR.SPECIES[id];
        document.getElementById('rush-creature').innerHTML = `
            <div class="creature-card tone-${sp.tone}">
                <span class="creature-art" aria-hidden="true">${sp.emoji}</span>
                <b>${sp.name}</b>
                ${IHR.store.hasSpecies(id) ? '<small>In your journal ✓</small>' : '<small>Not in your journal yet</small>'}
            </div>
        `;
        document.querySelectorAll('.rush-zone').forEach(b => b.classList.remove('is-right', 'is-wrong'));
    },

    answer(zone) {
        const s = this.state;
        if (!this.active || !s || s.locked) return;
        if (Date.now() >= s.endsAt) return this.end();
        s.locked = true;
        const sp = IHR.SPECIES[s.current];
        const right = sp.zone === zone;
        s.answers.push({ id: s.current, picked: zone, right });

        if (right) {
            s.combo++;
            s.score += s.combo >= 3 ? 20 : 10;
            IHR.audio.pop();
            this.flash(zone, 'is-right');
            this.queueNext(250);
        } else {
            s.combo = 0;
            s.locked = true;
            IHR.audio.error();
            this.flash(zone, 'is-wrong');
            this.flash(sp.zone, 'is-right');
            this.queueNext(900);
        }

        document.getElementById('rush-score').textContent = s.score;
        document.getElementById('rush-combo').textContent = s.combo >= 3 ? `🔥 ×2 streak (${s.combo})` : s.combo ? `${s.combo} in a row` : '';
    },

    flash(zone, cls) {
        const b = document.getElementById(`rush-${zone}`);
        if (b) b.classList.add(cls);
    },

    end() {
        if (!this.active) return;
        const s = this.state;
        this.stop();
        IHR.audio.success();
        const best = IHR.store.setRushBest(s.score);
        App.updateTopbar();
        const total = s.answers.length;
        const correct = s.answers.filter(a => a.right).length;
        const misses = [...new Set(s.answers.filter(a => !a.right).map(a => a.id))];

        this.el.innerHTML = `
            <section class="rush">
                <div class="panel rush-card">
                    <p class="eyebrow">Time!</p>
                    <h1 class="display">${s.score} points</h1>
                    <p>${correct} of ${total} correct${best ? ' · <b>New best score!</b>' : ` · Best: ${IHR.store.data.rushBest}`}</p>
                    ${misses.length ? `
                        <h2 class="section-title">Where they really live</h2>
                        <ul class="rush-review">
                            ${misses.map(id => {
                                const sp = IHR.SPECIES[id];
                                return `<li><span aria-hidden="true">${sp.emoji}</span><span><b>${sp.name}</b> lives in the ${IHR.ZONES[sp.zone].name.toLowerCase()}. ${sp.fact}</span></li>`;
                            }).join('')}
                        </ul>
                    ` : '<p>No mistakes at all. Brilliant!</p>'}
                    <div class="row is-center">
                        <button class="btn btn-coral btn-lg" ${IHR.ui.action('IHR.screens.rush.start')}>${IHR.icon('reset')} Play again</button>
                        <button class="btn btn-ghost" ${IHR.ui.action('App.go', 'home')}>${IHR.icon('back')} Home</button>
                    </div>
                </div>
            </section>
        `;
        IHR.sippy.say(best ? 'A new best score!' : 'Nice rush! Can you beat your best?', 'cheer');
    },

    queueNext(ms) {
        const round = this.state;
        this.nextTimer = setTimeout(() => {
            if (this.active && this.state === round) this.next();
        }, ms);
    },

    stop() {
        this.active = false;
        if (this.state) this.state.locked = true;
        clearTimeout(this.nextTimer);
        this.nextTimer = null;
        clearInterval(this.timer);
        this.timer = null;
    }
};
