/**
 * HOME: a one-screen title screen (no scrolling).
 * Pick a grade coin, then press PLAY (Island Rescue) or one of the mode tiles:
 * Daily Mission, Mystery Mission, Science Quiz, Reef Rush. The Field Journal sits in the HUD.
 */
window.IHR = window.IHR || {};
IHR.screens = IHR.screens || {};

IHR.screens.home = {
    render(el, opts = {}) {
        const S = IHR.store;
        const grade = App.grade;
        const missions = IHR.missionsForGrade(grade);
        const restored = S.restoredCount(grade);
        const daily = S.dailyMission(grade);
        const dailyDone = S.dailyDone(grade);
        const streak = S.currentStreak();
        const quizBest = S.data.quizBest[grade];
        const left = missions.length - restored;

        const tiles = [
            {
                cls: 'mode-daily', emoji: '📅', title: 'Daily Mission',
                sub: daily.title,
                badge: dailyDone ? '✓ Done' : 'New!', badgeCls: dailyDone ? 'is-done' : 'is-new',
                go: `App.go('mission', { id: '${daily.id}', mode: 'daily' })`
            },
            {
                cls: 'mode-mystery', emoji: '🎁', title: 'Mystery Mission',
                sub: left ? `${left} still hidden` : 'Replay for stars',
                go: 'IHR.screens.home.mystery()'
            },
            {
                cls: 'mode-quiz', emoji: '❓', title: 'Science Quiz',
                sub: quizBest !== undefined ? `Best ${quizBest}/10` : '10 questions · no timer',
                go: "App.go('quiz')"
            },
            {
                cls: 'mode-rush', emoji: '⏱️', title: 'Reef Rush',
                sub: `Best ${S.data.rushBest}`,
                go: "App.go('rush')"
            }
        ];

        el.innerHTML = `
            <section class="home">
                <div class="home-scene" aria-hidden="true">
                    <span class="scene-sun"></span>
                    <span class="scene-cloud c1">☁️</span>
                    <span class="scene-cloud c2">☁️</span>
                    <span class="scene-sea"></span>
                    <span class="scene-wave w1"></span>
                    <span class="scene-wave w2"></span>
                    <span class="scene-isle"><i>🌴</i><i>🌴</i></span>
                    <span class="scene-boat">⛵</span>
                    <span class="scene-fish f1">🐠</span>
                    <span class="scene-fish f2">🐟</span>
                </div>

                <header class="home-head">
                    <h1 class="home-logo"><span>Island Habitat</span><b>Rescue!</b></h1>
                    <div class="hud">
                        <span class="hud-chip" title="Stars earned">⭐ <b>${S.totalStars()}</b></span>
                        <span class="hud-chip" title="Daily streak">🔥 <b>${streak}</b></span>
                        <button class="hud-chip" onclick="App.go('journal')" title="Field Journal">📖 <b>${S.journalCount()}/${Object.keys(IHR.SPECIES).length}</b></button>
                    </div>
                </header>

                <div class="grade-coins" role="radiogroup" aria-label="Choose your grade">
                    <span class="coins-label">Grade</span>
                    ${IHR.GRADES.map(n => {
                        const pct = Math.round(S.islandHealth(n) * 100);
                        return `
                            <button class="coin ${n === grade ? 'is-active' : ''}" role="radio" aria-checked="${n === grade}"
                                aria-label="Grade ${n}, ${pct}% restored" style="--p:${pct}" onclick="IHR.screens.home.setGrade(${n})">
                                <span>${n}</span>
                            </button>
                        `;
                    }).join('')}
                </div>

                <div class="mode-board">
                    <button class="play-card" onclick="App.go('hub')">
                        <span class="play-isle" aria-hidden="true">🏝️</span>
                        <span class="play-text">
                            <span class="play-label">${IHR.icon('play')} Play</span>
                            <span class="play-mode">Island Rescue · Grade ${grade}</span>
                            <span class="play-bar"><i style="width:${Math.max((restored / missions.length) * 100, 2)}%"></i></span>
                            <span class="play-meta">${restored}/${missions.length} sites restored · ⭐ ${S.gradeStars(grade)}/${missions.length * 3}</span>
                        </span>
                    </button>
                    ${tiles.map(t => `
                        <button class="mode-tile ${t.cls}" onclick="${t.go}">
                            ${t.badge ? `<span class="tile-badge ${t.badgeCls}">${t.badge}</span>` : ''}
                            <span class="tile-emoji" aria-hidden="true">${t.emoji}</span>
                            <b>${t.title}</b>
                            <small>${t.sub}</small>
                        </button>
                    `).join('')}
                </div>
            </section>
        `;

        if (!opts.quiet) {
            IHR.sippy.say(dailyDone ? 'Daily done! Try a Mystery Mission next.' : 'Pick a grade, then press Play!', 'wave', 5000);
        }
    },

    setGrade(n) {
        IHR.audio.click();
        App.setGrade(n);
        this.render(document.getElementById('app'), { quiet: true });
    },

    // Prefer missions not yet restored, so mystery mode leads somewhere new
    mystery() {
        const list = IHR.missionsForGrade(App.grade);
        const fresh = list.filter(m => !IHR.store.isRestored(m.id));
        const pool = fresh.length ? fresh : list;
        const pick = pool[Math.floor(Math.random() * pool.length)];
        App.go('mission', { id: pick.id, mode: 'mystery' });
    }
};
