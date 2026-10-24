/**
 * LINKS LAB: set energy arrows between pairs (no link → A→B → B→A).
 * Trial "energy": draws the web and sends energy sparks along each arrow.
 * An optional `event` removes one species so students see the web reroute energy.
 */
window.IHR = window.IHR || {};
IHR.labs = IHR.labs || {};

(function () {
    const STATES = {
        none: { label: 'No link', glyph: '—', cls: '' },
        ab: { label: 'Energy →', glyph: '→', cls: 'is-ab' },
        ba: { label: '← Energy', glyph: '←', cls: 'is-ba' }
    };
    const NEXT = { none: 'ab', ab: 'ba', ba: 'none' };

    function nodeChip(n) {
        return `
            <div class="node-chip tone-${n.tone}">
                <span class="node-chip-emoji" aria-hidden="true">${n.emoji}</span>
                <b>${n.label}</b>
                <small>${n.sub}</small>
            </div>
        `;
    }

    function energyTrial(lab, st, ctx) {
        const removed = new Set();
        const R = 34;
        const still = IHR.ui.reducedMotion();

        const draw = () => {
            const flows = lab.pairs.filter(p => p.expect === 'ab').map(p => {
                const a = lab.nodes[p.a], b = lab.nodes[p.b];
                const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy);
                const ux = dx / len, uy = dy / len;
                const x1 = a.x + ux * (R + 4), y1 = a.y + uy * (R + 4);
                const x2 = b.x - ux * (R + 12), y2 = b.y - uy * (R + 12);
                const dead = removed.has(p.a) || removed.has(p.b);
                const path = `M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`;
                const sparks = dead ? '' : [0, 1, 2].map(k => still
                    ? `<circle r="5" class="spark" cx="${(x1 + (x2 - x1) * (k + 1) / 4).toFixed(1)}" cy="${(y1 + (y2 - y1) * (k + 1) / 4).toFixed(1)}"/>`
                    : `<circle r="5" class="spark"><animateMotion dur="1.8s" begin="${(k * 0.6).toFixed(1)}s" repeatCount="indefinite" path="${path}"/></circle>`
                ).join('');
                return `<path d="${path}" class="flow ${dead ? 'is-dead' : ''}" marker-end="url(#${dead ? 'head-dead' : 'head'})"/>${sparks}`;
            }).join('');

            const nodes = Object.entries(lab.nodes).map(([id, n]) => `
                <g class="node tone-${n.tone} ${removed.has(id) ? 'is-gone' : ''}" transform="translate(${n.x} ${n.y})">
                    <circle r="${R}" class="node-disc"/>
                    <text class="node-emoji" y="11" text-anchor="middle">${n.emoji}</text>
                    <text class="node-label" y="${R + 20}" text-anchor="middle">${n.label}</text>
                </g>
            `).join('');

            const prompt = lab.event && !removed.size
                ? `<p>Energy is flowing. Now test the web:</p><button class="btn btn-coral" onclick="Mission.trialAct('event')">${lab.event.label}</button>`
                : lab.event ? `<p><b>${lab.event.message}</b></p>` : '<p>Each spark is energy moving from food to eater.</p>';

            ctx.el.innerHTML = `
                <div class="trial">
                    <div class="trial-head"><span class="eyebrow">Energy flow</span><b>${removed.size ? 'After the change' : 'Watch the energy move'}</b></div>
                    <div class="svg-wrap">
                        <svg class="web" viewBox="0 0 600 350" role="img" aria-label="Energy flow diagram">
                            <defs>
                                <marker id="head" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#e8553f"/></marker>
                                <marker id="head-dead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#b9b2a0"/></marker>
                            </defs>
                            ${flows}${nodes}
                        </svg>
                    </div>
                    <div class="trial-prompt">${prompt}</div>
                </div>
            `;
        };

        draw();
        if (!lab.event) ctx.finish({ ok: true });

        return {
            act(name) {
                if (name !== 'event' || removed.size) return;
                IHR.audio.error();
                removed.add(lab.event.remove);
                draw();
                ctx.say(lab.event.message, 'think');
                ctx.finish({ ok: true, note: lab.event.note });
            }
        };
    }

    IHR.labs.links = {
        init(lab) {
            return { links: lab.pairs.map(() => 'none'), checked: false };
        },

        render(lab, st) {
            return `
                <p class="lab-tip">Arrows point the way energy flows: <b>food → eater</b>. Tap a link to change it.</p>
                <div class="link-rows">
                    ${lab.pairs.map((p, i) => {
                        const s = STATES[st.links[i]];
                        const wrong = st.checked && st.links[i] !== p.expect;
                        return `
                            <div class="link-row ${wrong ? 'is-wrong' : ''}">
                                ${nodeChip(lab.nodes[p.a])}
                                <button class="link-btn ${s.cls}" onclick="Mission.act('cycle', ${i})" aria-label="Link between ${lab.nodes[p.a].label} and ${lab.nodes[p.b].label}: ${s.label}. Tap to change.">
                                    <span class="link-glyph" aria-hidden="true">${s.glyph}</span>${s.label}
                                </button>
                                ${nodeChip(lab.nodes[p.b])}
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        },

        check(lab, st) {
            const wrong = lab.pairs.filter((p, i) => st.links[i] !== p.expect);
            if (!wrong.length) return { ok: true };
            const reversed = wrong.some(p => p.expect === 'ab' && st.links[lab.pairs.indexOf(p)] === 'ba');
            if (reversed) return { ok: false, message: 'An arrow points backwards. Energy flows FROM the food TO the eater.' };
            return { ok: false, message: `${wrong.length} link${wrong.length > 1 ? 's need' : ' needs'} fixing (red outline). Not every pair eats each other.` };
        },

        startTrial(lab, st, ctx) {
            return energyTrial(lab, st, ctx);
        },

        actions: {
            cycle(lab, st, i) {
                IHR.audio.click();
                st.links[i] = NEXT[st.links[i]];
                st.checked = false;
            }
        }
    };
})();
