/**
 * CHOICE LAB: read a chart, gauge or table, then pick the option(s) the evidence supports.
 * Visuals: sites (threshold gauges), bars (weekly counts), matrix (trade-off table), models (forecast chart)
 */
window.IHR = window.IHR || {};
IHR.labs = IHR.labs || {};

(function () {
    function sites(v) {
        return `
            <div class="site-compare">
                ${v.sites.map(site => `
                    <div class="site-card tone-${site.tone}">
                        <h4><span aria-hidden="true">${site.emoji}</span> ${site.label}</h4>
                        ${site.metrics.map(mt => {
                            const pass = mt.threshold === undefined || mt.value >= mt.threshold;
                            return `
                                <div class="gauge">
                                    <div class="gauge-label">
                                        <span>${mt.label}</span>
                                        <b class="${pass ? '' : 'is-bad'}">${mt.value}${mt.unit}${mt.threshold !== undefined ? ` <small>(needs ${mt.threshold}${mt.unit})</small>` : ''}</b>
                                    </div>
                                    <div class="gauge-track">
                                        <i style="width:${(mt.value / mt.max) * 100}%"></i>
                                        ${mt.threshold !== undefined ? `<span class="gauge-line" style="left:${(mt.threshold / mt.max) * 100}%"></span>` : ''}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `).join('')}
            </div>
        `;
    }

    function bars(v) {
        const max = Math.max(1, ...v.series.flatMap(s => s.values));
        return `
            <div class="legend">
                ${v.series.map(s => `<span class="tone-${s.tone}"><i class="swatch"></i>${s.label}</span>`).join('')}
            </div>
            <div class="bars" role="img" aria-label="Weekly counts before and after the boardwalk">
                ${v.labels.map((lbl, i) => `
                    <div class="bar-group">
                        <div class="bar-cols">
                            ${v.series.map(s => `
                                <div class="bar tone-${s.tone}">
                                    <span>${s.values[i]}</span>
                                    <i style="height:${(s.values[i] / max) * 120}px"></i>
                                </div>
                            `).join('')}
                        </div>
                        <span class="bar-label">${lbl}</span>
                    </div>
                    ${i === v.dividerAfter ? `<div class="bar-divider"><span>${v.dividerLabel}</span></div>` : ''}
                `).join('')}
            </div>
            ${IHR.ui.dataTable('Example observations', ['Observation', ...v.series.map(s => s.label)], v.labels.map((label, i) => [label, ...v.series.map(s => s.values[i])]))}
        `;
    }

    function matrix(v) {
        return `
            <table class="matrix">
                <thead>
                    <tr><th scope="col">Proposal</th>${v.columns.map(c => `<th scope="col">${c}</th>`).join('')}</tr>
                </thead>
                <tbody>
                    ${v.rows.map(r => `
                        <tr>
                            <th scope="row"><span aria-hidden="true">${r.emoji}</span> ${r.label}</th>
                            ${r.cells.map(([txt, tone]) => `<td class="tone-${tone}">${txt}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // Coral cover index over 6 years; y = 150 - value * 1.3
    function models() {
        const yrs = [0, 1, 2, 3, 4, 5];
        const x = i => 44 + i * 52;
        const y = val => 150 - val * 1.3;
        const line = yrs.map(i => `${x(i)},${y(100 * Math.pow(0.85, i)).toFixed(1)}`).join(' ');
        const upper = yrs.map(i => `${x(i)},${y(100 * Math.pow(0.9, i)).toFixed(1)}`);
        const lower = yrs.slice().reverse().map(i => `${x(i)},${y(100 * Math.pow(0.75, i)).toFixed(1)}`);
        const observed = [100, 88, 70, 66];
        return `
            <svg class="model-chart" viewBox="0 0 330 176" role="img" aria-label="Model-1 line and Model-2 band compared with four observed years of coral cover">
                <title>Coral cover: observations and two forecasts</title>
                <desc>Example model data. A line shows Model 1, a shaded range shows Model 2, and dots show observed cover.</desc>
                ${[0, 25, 50, 75, 100].map(v => `<line x1="44" y1="${y(v)}" x2="310" y2="${y(v)}" class="chart-grid"/>`).join('')}
                <line x1="44" y1="150" x2="310" y2="150" class="axis"/>
                <line x1="44" y1="14" x2="44" y2="150" class="axis"/>
                <polygon points="${upper.concat(lower).join(' ')}" class="band"/>
                <polyline points="${line}" class="fixed-line"/>
                ${observed.map((val, i) => `<circle cx="${x(i)}" cy="${y(val).toFixed(1)}" r="5" class="obs"/>`).join('')}
                ${yrs.map(i => `<text x="${x(i)}" y="166" class="tick" text-anchor="middle">Yr ${i}</text>`).join('')}
                <text x="38" y="${y(100) + 4}" class="tick" text-anchor="end">100</text>
                <text x="38" y="${y(50) + 4}" class="tick" text-anchor="end">50</text>
                <text x="306" y="${y(44) - 6}" class="tag-line" text-anchor="end">Model-1</text>
                <text x="306" y="${y(60) - 4}" class="tag-band" text-anchor="end">Model-2 range</text>
            </svg>
            <p class="chart-note">Coral cover index · <span class="obs-key">●</span> observed</p>
            ${IHR.ui.dataTable('Example coral cover index', ['Year', 'Model 1', 'Model 2 range', 'Observed'], yrs.map(i => [i, (100 * Math.pow(0.85, i)).toFixed(1), `${(100 * Math.pow(0.75, i)).toFixed(1)}–${(100 * Math.pow(0.9, i)).toFixed(1)}`, observed[i] ?? '—']))}
        `;
    }

    const VISUALS = { sites, bars, matrix, models };

    IHR.labs.choice = {
        init() {
            return { picked: [], checked: false };
        },

        render(lab, st) {
            const cols = lab.options.length > 3 ? 2 : lab.options.length;
            return `
                ${lab.visual ? `<div class="visual-box">${VISUALS[lab.visual.type](lab.visual)}</div>` : ''}
                ${lab.multi ? '<p class="lab-tip">Tap to fund or un-fund each proposal.</p>' : ''}
                <div class="options" style="--cols:${cols}">
                    ${lab.options.map(opt => {
                        const on = st.picked.includes(opt.id);
                        const wrong = st.checked && on && !lab.correct.includes(opt.id);
                        return `
                            <button class="option ${on ? 'is-on' : ''} ${wrong ? 'is-wrong' : ''}" ${IHR.ui.action('Mission.act', 'pick', opt.id)} aria-pressed="${on}">
                                <span class="option-emoji" aria-hidden="true">${opt.emoji}</span>
                                <span class="option-text">
                                    <b>${opt.label}</b>
                                    ${opt.sub ? `<small>${opt.sub}</small>` : ''}
                                    ${wrong && opt.why ? `<small class="is-bad">${opt.why}</small>` : ''}
                                </span>
                                <span class="tick-box ${lab.multi ? 'is-square' : ''}">${on ? IHR.icon('check') : ''}</span>
                            </button>
                        `;
                    }).join('')}
                </div>
            `;
        },

        check(lab, st) {
            if (!st.picked.length) return { ok: false, message: 'Pick an option before running the trial.' };
            const bad = st.picked.find(id => !lab.correct.includes(id));
            if (bad) {
                const opt = lab.options.find(o => o.id === bad);
                return { ok: false, message: opt.why || 'The evidence does not back that choice. Look again.' };
            }
            if (st.picked.length < lab.correct.length) return { ok: false, message: 'Good pick, but the evidence supports one more option alongside it.' };
            return { ok: true };
        },

        actions: {
            pick(lab, st, id) {
                IHR.audio.click();
                if (lab.multi) {
                    st.picked = st.picked.includes(id) ? st.picked.filter(x => x !== id) : [...st.picked, id];
                } else {
                    st.picked = [id];
                }
                st.checked = false;
            }
        }
    };
})();
