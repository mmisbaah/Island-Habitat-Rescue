/**
 * ISLAND RESCUE MODE: one grade's island map and its 11 missions.
 * Each grade has its own island that heals as its missions are completed.
 * Grades are never locked: a teacher can send a class straight to any grade.
 */
window.IHR = window.IHR || {};
IHR.screens = IHR.screens || {};

IHR.screens.hub = {
    render(el, opts = {}) {
        const S = IHR.store;
        const grade = App.grade;
        const missions = IHR.missionsForGrade(grade);
        const health = Math.round(S.islandHealth(grade) * 100);
        const first = missions[0].num;
        const last = missions[missions.length - 1].num;

        el.innerHTML = `
            <section class="hub">
                <div class="mode-top">
                    <button class="btn btn-ghost" ${IHR.ui.action('App.go', 'home')}>${IHR.icon('back')} Home</button>
                    <span class="mode-pill">🗺️ Island Rescue · Grade ${grade}</span>
                </div>

                <div class="map-card">
                    <div class="map-head">
                        <div>
                            <p class="eyebrow">Grade ${grade} Island · Missions ${first}–${last}</p>
                            <h1 class="display">Bring the island back to life</h1>
                        </div>
                        <div class="health" aria-label="Island health ${health} percent">
                            <span>Island health</span>
                            <div class="health-bar"><i style="width:${Math.max(health, 3)}%"></i></div>
                            <b>${health}%</b>
                        </div>
                    </div>
                    <div class="map-wrap">${IHR.islandMap.svg({ grade, highlight: opts.highlight })}</div>
                    <div class="zone-legend">
                        ${Object.keys(IHR.ZONES).map(z => `
                            <span class="zone-chip zone-${z}">
                                <span aria-hidden="true">${IHR.ZONES[z].emoji}</span> ${IHR.ZONES[z].name}
                                <b>${S.zoneRestored(z, grade)}/${S.zoneTotal(z, grade)}</b>
                            </span>
                        `).join('')}
                        <span class="map-hint">Tap a site on the map, or pick a mission below.</span>
                    </div>
                </div>

                <div class="panel missions-panel">
                    <div class="grade-tabs" role="tablist" aria-label="Choose a grade">
                        ${IHR.GRADES.map(n => `
                            <button role="tab" aria-selected="${n === grade}" class="grade-tab ${n === grade ? 'is-active' : ''}" ${IHR.ui.action('IHR.screens.hub.setGrade', n)}>
                                Grade ${n}
                            </button>
                        `).join('')}
                    </div>
                    <div class="mission-list">
                        ${missions.map(m => this.card(m)).join('')}
                    </div>
                </div>
            </section>
        `;

        if (opts.highlight) {
            const m = IHR.MISSIONS.find(x => x.id === opts.highlight);
            IHR.audio.splash();
            IHR.sippy.say(`Look! ${m.restore}.`, 'cheer');
        } else if (!opts.quiet) {
            IHR.sippy.say(health === 0
                ? `The Grade ${grade} island needs help! Pick a mission to start the rescue.`
                : `Island health is ${health}%. Which site will you rescue next?`, 'wave');
        }
    },

    card(m) {
        const prog = IHR.store.mission(m.id);
        const restored = prog.status === 'demonstrated';
        const statusText = { not_started: 'Not started', explored: 'Explored', practised: 'Practised', demonstrated: 'Restored' }[prog.status];
        return `
            <button class="mission-card zone-${m.zone} ${restored ? 'is-restored' : ''}" ${IHR.ui.action('App.go', 'mission', { id: m.id })}>
                <span class="mission-art" aria-hidden="true">${m.siteEmoji}</span>
                <span class="mission-info">
                    <span class="mission-meta">Mission ${m.num} · ${IHR.ZONES[m.zone].name}</span>
                    <b>${m.title}</b>
                    <span class="mission-goal">${m.goal}</span>
                </span>
                <span class="mission-side">
                    ${IHR.ui.stars(prog.stars || 0)}
                    <span class="status status-${prog.status}">${statusText}</span>
                    <span class="mission-go">${restored ? 'Replay' : 'Play'} ${IHR.icon('next')}</span>
                </span>
            </button>
        `;
    },

    setGrade(n) {
        IHR.audio.click();
        App.setGrade(n);
        this.render(document.getElementById('app'), { quiet: true });
    }
};
