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
        action(name, ...args) {
            return `data-action="${name}" data-args="${encodeURIComponent(JSON.stringify(args)).replace(/'/g, '%27')}"`;
        },
        captureFocus(root) {
            const el = document.activeElement;
            if (!el || !root.contains(el)) return null;
            return { id: el.id, key: el.dataset.focus, action: el.dataset.action, args: el.dataset.args };
        },

        restoreFocus(root, saved) {
            if (!saved) return false;
            const controls = [...root.querySelectorAll('button, input, [tabindex]')];
            const el = controls.find(c => saved.id && c.id === saved.id || saved.key && c.dataset.focus === saved.key || saved.action && c.dataset.action === saved.action && c.dataset.args === saved.args);
            if (!el || el.disabled) return false;
            el.focus({ preventScroll: true });
            return true;
        },

        focusHeading(root) {
            const heading = root.querySelector('h1, h2');
            if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
        },

        storageNotice() {
            const el = document.getElementById('storage-notice');
            if (!el) return;
            const s = IHR.store;
            el.hidden = !s.storageError && !s.recovered;
            el.textContent = s.storageError
                ? 'Progress cannot be saved in this browser. Keep this tab open to continue your rescue.'
                : s.recovered ? 'Saved progress was repaired. Valid discoveries and mission results have been kept.' : '';
        },

        dataTable(caption, headers, rows) {
            return `<details class="chart-data"><summary>View chart data</summary><div class="table-scroll"><table class="matrix"><caption>${caption}</caption><thead><tr>${headers.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((v, i) => i ? `<td>${v}</td>` : `<th scope="row">${v}</th>`).join('')}</tr>`).join('')}</tbody></table></div></details>`;
        },
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
