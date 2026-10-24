/**
 * CASCADE LAB: set how much producer cover a heatwave leaves, then run five years.
 * Herbivores catch up with the producer loss by year 2, predators by year 4.
 */
window.IHR = window.IHR || {};
IHR.labs = IHR.labs || {};

(function () {
    const LEVELS = [
        { key: 'pred', label: 'Predators · Reef Shark', emoji: '🦈', tone: 'shell', energy: 100, count: 6 },
        { key: 'herb', label: 'Herbivores · Tang & Parrotfish', emoji: '🐟', tone: 'sky', energy: 1000, count: 10 },
        { key: 'prod', label: 'Producers · Algae & Coral', emoji: '🌿', tone: 'palm', energy: 10000, count: 12 }
    ];

    // Each level passes on roughly 10% of its energy, so the pyramid narrows upward
    function pyramid(lab, st) {
        const p = st.value;
        return `
            <div class="pyramid">
                ${LEVELS.map(lv => `
                    <div class="tier tone-${lv.tone}">
                        <div class="tier-head">
                            <span><span aria-hidden="true">${lv.emoji}</span> ${lv.label}</span>
                            <b>${Math.round(lv.energy * p / 100).toLocaleString()} energy units</b>
                        </div>
                        <div class="tier-track"><i style="width:${p}%"></i></div>
                    </div>
                `).join('')}
            </div>
            <p class="lab-tip">Energy moves up: producers → herbivores → predators. Only about a tenth passes up each level.</p>
        `;
    }

    function yearsTrial(lab, st, ctx) {
        const p = st.value;
        const Y = [0, 1, 2, 3, 4, 5];
        const series = {
            prod: Y.map(y => (y === 0 ? 100 : p)),
            herb: Y.map(y => (y === 0 ? 100 : 100 - (100 - p) * Math.min(1, y / 2))),
            pred: Y.map(y => (y <= 1 ? 100 : 100 - (100 - p) * Math.min(1, (y - 1) / 3)))
        };
        const STORY = ['Before the heatwave', 'Heatwave: producers collapse', 'Grazing fish run short of food', 'Sharks run short of prey', 'The whole web has shrunk', 'Five years on'];
        const x = y => 56 + y * 100;
        const yv = v => 210 - v * 1.8;
        let year = 0;

        const draw = () => {
            const lines = LEVELS.map(lv => {
                const pts = Y.slice(0, year + 1).map(y => `${x(y)},${yv(series[lv.key][y]).toFixed(1)}`).join(' ');
                return `
                    <polyline points="${pts}" class="series tone-${lv.tone}"/>
                    <circle cx="${x(year)}" cy="${yv(series[lv.key][year]).toFixed(1)}" r="6" class="series-dot tone-${lv.tone}"/>
                `;
            }).join('');

            const crowd = LEVELS.map(lv => {
                const alive = Math.round(lv.count * series[lv.key][year] / 100);
                return `
                    <div class="crowd-row">
                        <span class="crowd-label">${lv.label.split(' · ')[0]}</span>
                        <span class="crowd" aria-label="${alive} of ${lv.count}">
                            ${Array.from({ length: lv.count }, (_, i) => `<span class="${i < alive ? '' : 'is-lost'}">${lv.emoji}</span>`).join('')}
                        </span>
                    </div>
                `;
            }).join('');

            ctx.el.innerHTML = `
                <div class="trial">
                    <div class="trial-head"><span class="eyebrow">Year ${year} of 5</span><b>${STORY[year]}</b></div>
                    <div class="svg-wrap">
                        <svg class="cascade-chart" viewBox="0 0 600 240" role="img" aria-label="Population of producers, herbivores and predators over five years">
                            <line x1="56" y1="210" x2="556" y2="210" class="axis"/>
                            <line x1="56" y1="20" x2="56" y2="210" class="axis"/>
                            ${[0, 50, 100].map(v => `<text x="48" y="${yv(v) + 4}" class="tick" text-anchor="end">${v}%</text>`).join('')}
                            ${Y.map(y => `<text x="${x(y)}" y="230" class="tick" text-anchor="middle">Yr ${y}</text>`).join('')}
                            ${lines}
                        </svg>
                    </div>
                    <div class="legend">
                        ${LEVELS.map(lv => `<span class="tone-${lv.tone}"><i class="swatch"></i>${lv.label.split(' · ')[0]}</span>`).join('')}
                    </div>
                    <div class="crowds">${crowd}</div>
                </div>
            `;
        };

        const step = () => {
            year++;
            IHR.audio.tick();
            draw();
            if (year === 1) ctx.say('The heatwave hits the producers first.', 'worried');
            if (year === 3) ctx.say('Sharks never eat algae. But look at them now.', 'think');
            if (year >= 5) {
                ctx.finish({ ok: true, note: `Producers fell to ${p}%. By year 2 the herbivores had fallen to match, and by year 4 so had the sharks.` });
                return;
            }
            ctx.after(1000, step);
        };

        draw();
        ctx.after(800, step);
        return { act() {} };
    }

    IHR.labs.cascade = {
        init(lab) {
            return { value: lab.start, checked: false };
        },

        render(lab, st) {
            return `
                <div class="dial cascade-dial">
                    <label for="cascade-input" class="dial-head">
                        <span><span aria-hidden="true">🌡️</span> Producer cover left after the heatwave</span>
                        <output id="cascade-val">${st.value}%</output>
                    </label>
                    <div class="dial-input" style="--a:0; --b:${lab.target}">
                        <span class="dial-zone is-warning"></span>
                        <input id="cascade-input" type="range" min="0" max="100" value="${st.value}" oninput="Mission.act('set', this.value)">
                    </div>
                    <p class="dial-status">The heatwave card says producers drop by 60%. The shaded band marks that range.</p>
                </div>
                <div id="cascade-visual">${pyramid(lab, st)}</div>
            `;
        },

        check(lab, st) {
            if (st.value > lab.target) return { ok: false, message: `A 60% loss leaves ${lab.target}% or less. Slide producer cover down, then run the trial.` };
            return { ok: true };
        },

        startTrial(lab, st, ctx) {
            return yearsTrial(lab, st, ctx);
        },

        actions: {
            set(lab, st, val) {
                st.value = parseInt(val, 10);
                document.getElementById('cascade-val').textContent = `${st.value}%`;
                document.getElementById('cascade-visual').innerHTML = pyramid(lab, st);
                return false;
            }
        }
    };
})();
