/**
 * FIELD JOURNAL: every species met on a mission, grouped by zone.
 * Locked cards say which mission finds them.
 */
window.IHR = window.IHR || {};
IHR.screens = IHR.screens || {};

IHR.screens.journal = {
    zone: 'all',

    render(el, opts = {}) {
        if (opts.zone) this.zone = opts.zone;
        const S = IHR.store;
        const ids = Object.keys(IHR.SPECIES);
        const shown = ids.filter(id => this.zone === 'all' || IHR.SPECIES[id].zone === this.zone);
        const foundIn = id => IHR.MISSIONS.find(m => m.rewards.includes(id));

        el.innerHTML = `
            <section class="journal">
                <div class="journal-head">
                    <div>
                        <button class="btn btn-ghost" onclick="App.go('home')">${IHR.icon('back')} Home</button>
                        <h1 class="display">Field Journal</h1>
                        <p class="journal-count"><b>${S.journalCount()}</b> of ${ids.length} species recorded</p>
                    </div>
                    <div class="filter-tabs" role="tablist" aria-label="Filter by zone">
                        ${['all', 'lagoon', 'beach', 'jungle'].map(z => `
                            <button role="tab" aria-selected="${this.zone === z}" class="grade-tab ${this.zone === z ? 'is-active' : ''}" onclick="IHR.screens.journal.setZone('${z}')">
                                ${z === 'all' ? 'All' : `${IHR.ZONES[z].emoji} ${IHR.ZONES[z].name}`}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="journal-grid">
                    ${shown.map(id => {
                        const s = IHR.SPECIES[id];
                        if (!S.hasSpecies(id)) {
                            const m = foundIn(id);
                            return `
                                <article class="species is-locked">
                                    <div class="species-art" aria-hidden="true">${s.emoji}</div>
                                    <h3>Not yet recorded</h3>
                                    ${IHR.ui.zoneChip(s.zone)}
                                    ${m ? `<p>Found in <button class="link" onclick="App.go('mission', { id: '${m.id}' })">Mission ${m.num}: ${m.title}</button></p>` : '<p>Found in Reef Rush.</p>'}
                                </article>
                            `;
                        }
                        return `
                            <article class="species tone-${s.tone}">
                                <div class="species-art" aria-hidden="true">${s.emoji}</div>
                                <h3>${s.name}</h3>
                                ${s.local ? `<p class="local">Dhivehi: ${s.local}</p>` : ''}
                                ${IHR.ui.zoneChip(s.zone)}
                                <p>${s.fact}</p>
                            </article>
                        `;
                    }).join('')}
                </div>
            </section>
        `;

        if (!opts.quiet) {
            IHR.sippy.say(S.journalCount() === 0
                ? 'Your journal is empty. Finish a mission to record your first species!'
                : 'Every species you meet on a mission is recorded here.', 'happy');
        }
    },

    setZone(z) {
        IHR.audio.click();
        this.zone = z;
        this.render(document.getElementById('app'), { quiet: true });
    }
};
