/* One listener per event, including controls recreated by a lab render. */
window.IHR = window.IHR || {};
IHR.events = {
    dispatch(el) {
        if (!el || el.disabled) return;
        const name = el.dataset.action;
        const owners = { App: window.App, Mission: window.Mission, 'IHR.sippy': IHR.sippy,
            'IHR.screens.home': IHR.screens.home, 'IHR.screens.hub': IHR.screens.hub,
            'IHR.screens.quiz': IHR.screens.quiz, 'IHR.screens.rush': IHR.screens.rush,
            'IHR.screens.journal': IHR.screens.journal };
        const allowed = new Set(['App.go', 'App.toggleSound', 'App.openSettings', 'App.closeModal', 'App.confirmReset', 'App.doReset',
            'Mission.go', 'Mission.act', 'Mission.run', 'Mission.resetLab', 'Mission.hint', 'Mission.pickPrediction',
            'Mission.pickExplain', 'Mission.pickTransfer', 'Mission.submitExplain', 'Mission.submitTransfer', 'Mission.trialAct', 'Mission.backToLab',
            'IHR.sippy.listen', 'IHR.sippy.hide', 'IHR.screens.home.setGrade', 'IHR.screens.home.mystery', 'IHR.screens.hub.setGrade',
            'IHR.screens.quiz.answer', 'IHR.screens.quiz.next', 'IHR.screens.quiz.start', 'IHR.screens.rush.start', 'IHR.screens.rush.answer', 'IHR.screens.journal.setZone']);
        if (!allowed.has(name)) return;
        const at = name.lastIndexOf('.'), owner = owners[name.slice(0, at)];
        owner[name.slice(at + 1)](...JSON.parse(decodeURIComponent(el.dataset.args)));
    }
};
document.addEventListener('click', e => {
    if (e.target.matches('[data-modal-backdrop]')) return App.closeModal();
    IHR.events.dispatch(e.target.closest('[data-action]'));
});
document.addEventListener('keydown', e => {
    const el = e.target.closest('[data-keyboard-action]');
    if (el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); IHR.events.dispatch(el); }
    const radio = e.target.closest('[role="radio"]');
    if (radio && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        const radios = [...radio.parentElement.querySelectorAll('[role="radio"]')];
        const direction = ['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : -1;
        const i = (radios.indexOf(radio) + direction + radios.length) % radios.length;
        IHR.events.dispatch(radios[i]);
        document.querySelectorAll('[role="radio"]')[i].focus();
    }
});
document.addEventListener('input', e => {
    if (!e.target.matches('[data-input]')) return;
    const key = e.target.dataset.input;
    if (key === 'cascade') Mission.act('set', e.target.value);
    else Mission.act('set', key, e.target.value);
});
document.addEventListener('dragstart', e => {
    const el = e.target.closest('[data-drag-id]');
    if (el) Mission.drag(e, el.dataset.dragId);
});
document.addEventListener('dragover', e => {
    const el = e.target.closest('[data-drop-id]');
    if (el) { e.preventDefault(); el.classList.add('is-over'); }
});
document.addEventListener('dragleave', e => e.target.closest('[data-drop-id]')?.classList.remove('is-over'));
document.addEventListener('drop', e => {
    const el = e.target.closest('[data-drop-id]');
    if (el) { el.classList.remove('is-over'); Mission.drop(e, el.dataset.dropId); }
});
