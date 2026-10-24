/**
 * Small shared view helpers.
 */
window.IHR = window.IHR || {};

(function () {
    IHR.ZONES = {
        lagoon: { name: 'Lagoon', emoji: '🌊' },
        beach: { name: 'Beach', emoji: '🏖️' },
        jungle: { name: 'Jungle', emoji: '🌴' }
    };

    IHR.ui = {
        stars(n, max = 3, cls = '') {
            let html = '';
            for (let i = 0; i < max; i++) html += IHR.icon('star', i < n ? 'star is-on' : 'star');
            return `<span class="stars ${cls}" aria-label="${n} of ${max} stars">${html}</span>`;
        },

        zoneChip(zone) {
            const z = IHR.ZONES[zone];
            return `<span class="zone-chip zone-${zone}"><span aria-hidden="true">${z.emoji}</span> ${z.name}</span>`;
        },

        evidenceCards(list) {
            return list.map(e => `
                <article class="evidence tone-${e.tone || 'lagoon'}">
                    <div class="evidence-art" aria-hidden="true">${e.emoji}</div>
                    <h4>${e.title}</h4>
                    <p>${e.text}</p>
                </article>
            `).join('');
        },

        // Blend two #rrggbb colours; t = 0 gives a, t = 1 gives b
        mix(a, b, t) {
            const pa = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16));
            const pb = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16));
            return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join('');
        },

        reducedMotion() {
            return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
    };
})();
