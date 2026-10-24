/**
 * DIALS LAB: slide inputs into their green zones.
 * Trials:
 *   week – seven garden days with a monsoon decision on day 3
 *   day  – a leaf photosynthesising from sunrise to sunset
 */
window.IHR = window.IHR || {};
IHR.labs = IHR.labs || {};

(function () {
    const inZone = (d, v) => v >= d.min && v <= d.max;

    const status = (d, v) => {
        if (v < d.min) return `<span class="is-bad">${d.low}</span>`;
        if (v > d.max) return `<span class="is-bad">${d.high || 'Too much'}</span>`;
        return '<span class="is-good">In the green zone ✓</span>';
    };

    function visual(lab, st) {
        const ready = lab.dials.filter(d => inZone(d, st.values[d.key])).length;
        const health = ready / lab.dials.length;
        const light = st.values.light / 100;

        if (lab.visual === 'leaf') {
            const active = health === 1;
            return `
                <div class="plant-box ${active ? 'is-active' : ''}" style="--glow:${light}">
                    <span class="plant-emoji">🍃</span>
                    ${active ? '<span class="tag tone-sun">+ glucose</span><span class="tag tone-sky">+ O₂</span>' : ''}
                </div>
                <p class="plant-caption">Photosynthesis: <b>${active ? 'ready to run' : `stalled (${ready}/${lab.dials.length} inputs ready)`}</b></p>
            `;
        }

        // Hibiscus droops and fades until every dial is in its zone
        const droop = Math.round((1 - health) * 35);
        return `
            <div class="plant-box ${health === 1 ? 'is-active' : ''}" style="--glow:${light}">
                <span class="plant-emoji ${health === 1 ? '' : 'is-faded'}" style="transform: rotate(${droop}deg) translateY(${droop / 3}px)">🌺</span>
            </div>
            <p class="plant-caption">Hibiscus: <b>${health === 1 ? 'firm and healthy' : 'drooping'}</b></p>
        `;
    }

    function weekTrial(lab, st, ctx) {
        const cfg = lab.trialCfg;
        const water = lab.dials.find(d => d.key === 'water');
        const T = { day: 0, plan: null, log: [] };
        const scale = 1.3; // moisture can exceed 100 when rain and watering stack

        const moistureFor = day => {
            const rain = cfg.rainDays.includes(day);
            const watering = rain && T.plan === 'pause' ? 0 : st.values.water;
            return { rain, m: Math.min(130, watering + (rain ? cfg.rain : 0)) };
        };

        const draw = (prompt = '') => {
            const today = T.log[T.log.length - 1];
            const plantState = !today ? '' : today.m > water.max ? 'is-flooded' : today.m < water.min ? 'is-dry' : 'is-happy';
            ctx.el.innerHTML = `
                <div class="trial">
                    <div class="trial-head"><span class="eyebrow">Garden week</span><b>Day ${Math.max(T.day, 1)} of ${cfg.days}</b></div>
                    <div class="week-stage ${today && today.rain ? 'is-raining' : ''}">
                        ${today && today.rain ? '<span class="rain-cloud" aria-hidden="true">🌧️</span>' : '<span class="sun-corner" aria-hidden="true">☀️</span>'}
                        <span class="week-plant ${plantState}">🌺</span>
                        ${plantState === 'is-flooded' ? '<span class="stage-note is-bad">Roots flooded!</span>' : plantState === 'is-happy' ? '<span class="stage-note is-good">Just right</span>' : ''}
                    </div>
                    <div class="week-days" role="list">
                        ${Array.from({ length: cfg.days }, (_, i) => {
                            const d = i + 1;
                            const rec = T.log[i];
                            const rainDay = cfg.rainDays.includes(d);
                            return `
                                <div class="day ${rec ? (inZone(water, rec.m) ? 'is-ok' : 'is-bad') : ''} ${d === T.day ? 'is-today' : ''}" role="listitem" aria-label="Day ${d}${rec ? `, soil moisture ${rec.m}%` : ''}">
                                    <span class="day-wx" aria-hidden="true">${rainDay ? '🌧️' : '☀️'}</span>
                                    <div class="day-bar">
                                        <b class="day-zone" style="bottom:${water.min / scale}%; height:${(water.max - water.min) / scale}%"></b>
                                        <i style="height:${rec ? rec.m / scale : 0}%"></i>
                                    </div>
                                    <span class="day-n">Day ${d}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                    <p class="trial-legend"><span class="key-zone"></span> green band = moisture the roots need</p>
                    <div class="trial-prompt">${prompt}</div>
                </div>
            `;
        };

        const decision = `
            <p><b>🌧️ Monsoon showers on days ${cfg.rainDays.join(' and ')}!</b> The rain will soak the soil too. What will you do?</p>
            <div class="row">
                <button class="btn btn-sand" ${IHR.ui.action('Mission.trialAct', 'plan', 'keep')}>💧 Keep watering every day</button>
                <button class="btn btn-sand" ${IHR.ui.action('Mission.trialAct', 'plan', 'pause')}>✋ Skip watering on rainy days</button>
            </div>
        `;

        const end = () => {
            const bad = T.log.map((r, i) => ({ ...r, d: i + 1 })).filter(r => !inZone(water, r.m));
            draw();
            if (!bad.length) {
                ctx.finish({ ok: true, note: 'You skipped watering while the rain did the job, so the soil stayed just right all week.' });
            } else {
                const flooded = bad.some(r => r.m > water.max);
                ctx.finish({
                    ok: false,
                    message: flooded
                        ? `Day ${bad.map(r => r.d).join(' & ')} flooded the roots! Rain is water too.`
                        : `Day ${bad.map(r => r.d).join(' & ')} the soil was too dry.`
                });
            }
        };

        const step = () => {
            if (T.day === cfg.rainDays[0] - 1 && !T.plan) {
                draw(decision);
                ctx.say('Rain clouds! Do you still need to water?', 'think');
                return;
            }
            if (T.day >= cfg.days) return end();
            T.day++;
            T.log.push(moistureFor(T.day));
            IHR.audio.tick();
            draw();
            ctx.after(650, step);
        };

        draw();
        ctx.after(450, step);

        return {
            act(name, value) {
                if (name !== 'plan' || T.plan) return;
                IHR.audio.click();
                T.plan = value;
                step();
            }
        };
    }

    function dayTrial(lab, st, ctx) {
        const T = { hour: 6, glucose: 0 };
        const fmt = h => `${((h + 11) % 12) + 1}:00 ${h < 12 ? 'am' : 'pm'}`;

        const draw = () => {
            const night = T.hour >= 18;
            const arc = Math.min(1, (T.hour - 6) / 12);
            ctx.el.innerHTML = `
                <div class="trial">
                    <div class="trial-head"><span class="eyebrow">One day in the jungle</span><b>${fmt(T.hour)}</b></div>
                    <div class="sky-stage ${night ? 'is-night' : ''}">
                        <span class="sky-sun" style="left:${6 + arc * 82}%; bottom:${night ? -30 : 18 + Math.sin(arc * Math.PI) * 52}%" aria-hidden="true">${night ? '' : '☀️'}</span>
                        ${night ? '<span class="sky-moon" aria-hidden="true">🌙</span>' : ''}
                        <span class="sky-leaf ${night ? '' : 'is-on'}" aria-hidden="true">🍃${night ? '' : '<i class="bubble b1"></i><i class="bubble b2"></i><i class="bubble b3"></i>'}</span>
                    </div>
                    <div class="meter">
                        <span>🍬 Glucose made</span>
                        <div class="meter-bar"><i style="width:${T.glucose}%"></i></div>
                        <b>${Math.round(T.glucose)}</b>
                    </div>
                    <p class="trial-prompt">${night ? '🌙 Sunset. No light means no glucose, even with water and CO₂.' : 'Light + CO₂ + Water → Glucose + Oxygen'}</p>
                </div>
            `;
        };

        const step = () => {
            if (T.hour < 18) T.glucose = Math.min(100, T.glucose + 100 / 12);
            T.hour++;
            draw();
            if (T.hour === 18) ctx.say('Sunset! Keep your eye on the glucose meter.', 'think');
            if (T.hour >= 19) {
                ctx.finish({ ok: true, note: `Your leaf made ${Math.round(T.glucose)} units of glucose in 12 hours of daylight, then stopped when the sun went down.` });
                return;
            }
            ctx.after(T.hour >= 18 ? 900 : 420, step);
        };

        draw();
        ctx.after(400, step);
        return { act() {} };
    }

    IHR.labs.dials = {
        init(lab) {
            const values = {};
            lab.dials.forEach(d => { values[d.key] = d.start; });
            return { values, checked: false };
        },

        render(lab, st) {
            return `
                <div class="dials-lab">
                    <div id="dial-visual" class="dial-visual">${visual(lab, st)}</div>
                    <div class="dials">
                        ${lab.dials.map(d => `
                            <div class="dial">
                                <label for="dial-${d.key}" class="dial-head">
                                    <span><span aria-hidden="true">${d.emoji}</span> ${d.label}</span>
                                    <output id="dial-val-${d.key}">${st.values[d.key]}%</output>
                                </label>
                                <div class="dial-input" style="--a:${d.min}; --b:${d.max}">
                                    <span class="dial-zone"></span>
                                    <input id="dial-${d.key}" type="range" min="0" max="100" value="${st.values[d.key]}" data-input="${d.key}">
                                </div>
                                <p class="dial-status" id="dial-status-${d.key}">${status(d, st.values[d.key])}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        check(lab, st) {
            const off = lab.dials.find(d => !inZone(d, st.values[d.key]));
            if (!off) return { ok: true };
            const v = st.values[off.key];
            return { ok: false, message: `${off.label}: ${v < off.min ? off.low : (off.high || 'too much')}.` };
        },

        startTrial(lab, st, ctx) {
            return lab.trial === 'week' ? weekTrial(lab, st, ctx) : dayTrial(lab, st, ctx);
        },

        actions: {
            // Updates in place so the slider thumb is not destroyed mid-drag
            set(lab, st, key, val) {
                const d = lab.dials.find(x => x.key === key);
                st.values[key] = parseInt(val, 10);
                document.getElementById(`dial-val-${key}`).textContent = `${st.values[key]}%`;
                document.getElementById(`dial-status-${key}`).innerHTML = status(d, st.values[key]);
                document.getElementById('dial-visual').innerHTML = visual(lab, st);
                return false;
            }
        }
    };
})();
