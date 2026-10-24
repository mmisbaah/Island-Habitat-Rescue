/**
 * MATCH LAB: sort cards into boxes.
 * Drag-and-drop on desktop; tap a card, then tap a box on touch screens.
 */
window.IHR = window.IHR || {};
IHR.labs = IHR.labs || {};

IHR.labs.match = {
    init() {
        return { placements: {}, selected: null, checked: false };
    },

    render(lab, st) {
        const tray = lab.items.filter(i => !st.placements[i.id]);
        const cols = lab.slotCols || Math.min(lab.slots.length, 3);

        const placedCard = (item, slot) => {
            const wrong = st.checked && item.target !== slot.id;
            const right = st.checked && !wrong;
            return `
                <button class="item tone-${item.tone} ${wrong ? 'is-wrong' : ''} ${right ? 'is-right' : ''}"
                    onclick="event.stopPropagation(); Mission.act('unplace', '${item.id}')"
                    aria-label="${item.label}, in ${slot.label}. Tap to take it out.">
                    <span class="item-emoji" aria-hidden="true">${item.emoji}</span>${item.label}
                    ${wrong ? '<span class="mark" aria-label="wrong box">✗</span>' : right ? '<span class="mark" aria-label="correct">✓</span>' : ''}
                </button>
            `;
        };

        return `
            <p class="lab-tip">${st.selected ? 'Now tap a box to drop it in.' : 'Drag a card into a box, or tap a card and then tap a box.'}</p>

            <div class="slots" style="--cols:${cols}">
                ${lab.slots.map(slot => {
                    const here = lab.items.filter(i => st.placements[i.id] === slot.id);
                    return `
                        <div class="slot ${st.selected ? 'is-ready' : ''}"
                            onclick="Mission.act('placeSelected', '${slot.id}')"
                            ondragover="event.preventDefault(); this.classList.add('is-over')"
                            ondragleave="this.classList.remove('is-over')"
                            ondrop="Mission.drop(event, '${slot.id}')">
                            <div class="slot-head">
                                <span class="slot-emoji" aria-hidden="true">${slot.emoji}</span>
                                <span><b>${slot.label}</b>${slot.sub ? `<small>${slot.sub}</small>` : ''}</span>
                            </div>
                            <div class="slot-body">
                                ${here.length ? here.map(item => placedCard(item, slot)).join('') : '<span class="slot-empty">Drop here</span>'}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="tray">
                ${tray.length ? tray.map(item => `
                    <button class="item tone-${item.tone} ${st.selected === item.id ? 'is-selected' : ''}"
                        draggable="true"
                        ondragstart="Mission.drag(event, '${item.id}')"
                        onclick="Mission.act('select', '${item.id}')"
                        aria-pressed="${st.selected === item.id}">
                        <span class="item-emoji" aria-hidden="true">${item.emoji}</span>${item.label}
                    </button>
                `).join('') : '<span class="tray-done">All cards placed. Run the trial!</span>'}
            </div>
        `;
    },

    check(lab, st) {
        const unplaced = lab.items.filter(i => !st.placements[i.id]).length;
        if (unplaced) return { ok: false, message: `Place every card first. ${unplaced} still waiting.` };
        const wrong = lab.items.filter(i => st.placements[i.id] !== i.target).length;
        if (wrong) return { ok: false, message: `${wrong} card${wrong > 1 ? 's are' : ' is'} in the wrong box (marked ✗). Tap to move ${wrong > 1 ? 'them' : 'it'}.` };
        return { ok: true };
    },

    actions: {
        select(lab, st, id) {
            IHR.audio.click();
            st.selected = st.selected === id ? null : id;
        },

        placeSelected(lab, st, slotId) {
            if (!st.selected) return false;
            return IHR.labs.match.actions.place(lab, st, st.selected, slotId);
        },

        place(lab, st, id, slotId) {
            IHR.audio.pop();
            st.placements[id] = slotId;
            st.selected = null;
            st.checked = false;
        },

        unplace(lab, st, id) {
            IHR.audio.click();
            delete st.placements[id];
            st.checked = false;
        }
    }
};
