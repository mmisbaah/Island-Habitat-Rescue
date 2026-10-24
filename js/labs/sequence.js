/**
 * SEQUENCE LAB: tap stages in order. Cycles show a loop-back note;
 * set `loop: false` for one-way sequences such as how an atoll forms.
 */
window.IHR = window.IHR || {};
IHR.labs = IHR.labs || {};

IHR.labs.sequence = {
    init() {
        return { order: [], checked: false };
    },

    render(lab, st) {
        const remaining = lab.pool.filter(p => !st.order.includes(p.id));
        const byId = id => lab.pool.find(p => p.id === id);
        const n = lab.correctOrder.length;

        return `
            <p class="lab-tip">Tap a stage to add it to the next empty spot. Tap a placed stage to take it back.</p>

            <ol class="loop">
                ${lab.correctOrder.map((_, i) => {
                    const item = st.order[i] ? byId(st.order[i]) : null;
                    const mark = st.checked && item ? (st.order[i] === lab.correctOrder[i] ? 'is-right' : 'is-wrong') : '';
                    return `
                        <li class="loop-spot ${mark}">
                            <span class="loop-n">Stage ${i + 1}</span>
                            ${item ? `
                                <button class="item tone-${item.tone}" ${IHR.ui.action('Mission.act', 'remove', i)} aria-label="${item.label}. Tap to take it back.">
                                    <span class="item-emoji" aria-hidden="true">${item.emoji}</span>${item.label}
                                </button>
                            ` : '<span class="slot-empty">empty</span>'}
                        </li>
                    `;
                }).join('')}
            </ol>
            ${lab.loop === false ? '' : `<p class="loop-back">↻ Stage ${n} loops back to Stage 1</p>`}

            <div class="tray">
                ${remaining.length ? remaining.map(p => `
                    <button class="item tone-${p.tone}" ${IHR.ui.action('Mission.act', 'add', p.id)}>
                        <span class="item-emoji" aria-hidden="true">${p.emoji}</span>${p.label}
                    </button>
                `).join('') : '<span class="tray-done">Loop complete. Run the trial!</span>'}
            </div>
        `;
    },

    check(lab, st) {
        if (st.order.length < lab.correctOrder.length) return { ok: false, message: 'Fill every stage of the loop first.' };
        const wrong = lab.correctOrder.filter((id, i) => st.order[i] !== id).length;
        if (wrong) return { ok: false, message: `${wrong} stage${wrong > 1 ? 's are' : ' is'} out of order. Which stage has to come first?` };
        return { ok: true };
    },

    actions: {
        add(lab, st, id) {
            IHR.audio.pop();
            st.order.push(id);
            st.checked = false;
        },

        remove(lab, st, index) {
            IHR.audio.click();
            st.order.splice(index, 1);
            st.checked = false;
        }
    }
};
