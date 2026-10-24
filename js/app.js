/**
 * APP SHELL: screen routing, top bar, settings, and boot.
 */
const App = {
    screen: null,
    grade: 1,
    cleanup: null,

    init(data = {}) {
        IHR.store.load();
        IHR.audio.muted = IHR.store.data.muted;
        IHR.sippy.mount();
        document.getElementById('stat-star-icon').innerHTML = IHR.icon('star', 'star is-on');
        document.getElementById('btn-settings').innerHTML = IHR.icon('gear');
        this.grade = IHR.GRADES.includes(data.grade) ? data.grade : IHR.store.data.grade;

        if (data.screen === 'mission' && data.missionId) this.go('mission', { id: data.missionId, step: data.step, mode: data.mode });
        else this.go(['hub', 'journal', 'rush', 'quiz'].includes(data.screen) ? data.screen : 'home');
    },

    setGrade(n) {
        if (!IHR.GRADES.includes(n)) return;
        this.grade = n;
        IHR.store.setGrade(n);
    },

    go(screen, opts = {}) {
        if (this.cleanup) this.cleanup();
        this.cleanup = null;
        this.screen = screen;
        // Lets CSS lock the home screen to one viewport with no scrolling
        document.documentElement.dataset.screen = screen;
        window.scrollTo(0, 0);
        const view = IHR.screens[screen] || IHR.screens.home;
        this.cleanup = view.render(document.getElementById('app'), opts) || null;
        this.updateTopbar();
        IHR.ui.focusHeading(document.getElementById('app'));
        IHR.ui.storageNotice();
    },

    updateTopbar() {
        document.getElementById('stat-stars').textContent = IHR.store.totalStars();
        document.getElementById('stat-journal').textContent = `${IHR.store.journalCount()}/${Object.keys(IHR.SPECIES).length}`;
        const sound = document.getElementById('btn-sound');
        sound.innerHTML = IHR.icon(IHR.audio.muted ? 'mute' : 'sound');
        sound.setAttribute('aria-pressed', String(!IHR.audio.muted));
    },

    toggleSound() {
        IHR.audio.muted = !IHR.audio.muted;
        IHR.store.setMuted(IHR.audio.muted);
        if (!IHR.audio.muted) IHR.audio.click();
        this.updateTopbar();
        const label = document.getElementById('settings-sound');
        if (label) label.textContent = IHR.audio.muted ? 'Off' : 'On';
    },

    openSettings() {
        IHR.audio.click();
        if (document.getElementById('modal').hidden) this.modalReturnFocus = document.activeElement;
        const S = IHR.store;
        const restored = IHR.MISSIONS.filter(m => S.isRestored(m.id)).length;
        document.getElementById('modal-card').innerHTML = `
            <button class="modal-close" ${IHR.ui.action('App.closeModal')} aria-label="Close">${IHR.icon('x')}</button>
            <h2 class="display-sm" id="modal-title">Field station settings</h2>
            <dl class="settings-stats">
                <div><dt>Sites restored</dt><dd>${restored} / ${IHR.MISSIONS.length}</dd></div>
                <div><dt>Stars</dt><dd>${S.totalStars()} / ${IHR.MISSIONS.length * 3}</dd></div>
                <div><dt>Species recorded</dt><dd>${S.journalCount()} / ${Object.keys(IHR.SPECIES).length}</dd></div>
                <div><dt>Reef Rush best</dt><dd>${S.data.rushBest}</dd></div>
                <div><dt>Daily streak</dt><dd>🔥 ${S.currentStreak()}</dd></div>
                <div><dt>Quiz best (Grade ${this.grade})</dt><dd>${S.data.quizBest[this.grade] !== undefined ? `${S.data.quizBest[this.grade]}/10` : '–'}</dd></div>
            </dl>
            <div class="settings-row">
                <span>Sound effects: <b id="settings-sound">${IHR.audio.muted ? 'Off' : 'On'}</b></span>
                <button class="btn btn-sand" ${IHR.ui.action('App.toggleSound')}>Turn on / off</button>
            </div>
            <p class="muted">Progress is saved in this browser only.</p>
            <div class="settings-row" id="reset-row">
                <button class="btn btn-danger" ${IHR.ui.action('App.confirmReset')}>${IHR.icon('reset')} Reset all progress</button>
                <button class="btn btn-sand" ${IHR.ui.action('App.closeModal')}>Close</button>
            </div>
        `;
        document.getElementById('modal').hidden = false;
        document.getElementById('app').inert = true;
        document.querySelector('.topbar').inert = true;
        document.getElementById('sippy').inert = true;
        document.querySelector('.modal-close').focus();
    },

    // In-page confirmation (browser confirm() dialogs are not available everywhere)
    confirmReset() {
        document.getElementById('reset-row').innerHTML = `
            <span class="is-bad"><b>Erase every star, journal entry and restored site?</b></span>
            <div class="row">
                <button class="btn btn-danger" ${IHR.ui.action('App.doReset')}>Yes, erase</button>
                <button class="btn btn-sand" ${IHR.ui.action('App.openSettings')}>Keep my progress</button>
            </div>
        `;
        document.querySelector('#reset-row button').focus();
    },

    doReset() {
        IHR.store.reset();
        this.closeModal();
        this.go('home');
        IHR.sippy.say('Fresh start! The island needs rescuing again.', 'wave');
    },

    closeModal() {
        document.getElementById('modal').hidden = true;
        document.getElementById('app').inert = false;
        document.querySelector('.topbar').inert = false;
        document.getElementById('sippy').inert = false;
        if (this.modalReturnFocus && this.modalReturnFocus.isConnected) this.modalReturnFocus.focus();
    },

    snapshot() {
        return {
            screen: this.screen,
            grade: this.grade,
            missionId: this.screen === 'mission' && Mission.m ? Mission.m.id : null,
            step: this.screen === 'mission' ? Mission.step : null,
            mode: this.screen === 'mission' ? Mission.mode : null
        };
    }
};

window.App = App;

document.addEventListener('keydown', e => {
    if (e.key === 'Tab' && !document.getElementById('modal').hidden) {
        const items = [...document.querySelectorAll('#modal button:not(:disabled), #modal [tabindex="0"]')];
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.key === 'Escape'  && !document.getElementById('modal').hidden) App.closeModal();
});

// Keep the player's place when the published page updates while open
if (window.claude && window.claude.hot && window.claude.hot.snapshot) {
    window.claude.hot.snapshot(() => App.snapshot());
}
const boot = data => App.init(data || {});
if (window.claude && window.claude.hot && window.claude.hot.ready) window.claude.hot.ready(boot);
else boot(window.claude && window.claude.hot ? window.claude.hot.data : {});
