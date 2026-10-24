/**
 * Sippy the sea turtle field guide. Short lines, with a mood that changes how Sippy moves.
 * Moods: happy, cheer, worried, think, wave
 */
window.IHR = window.IHR || {};

(function () {
    const MOOD_BADGE = { happy: '✨', cheer: '🎉', worried: '💦', think: '💭', wave: '👋' };

    IHR.sippy = {
        el: null,
        timer: null,

        mount() {
            this.el = document.getElementById('sippy');
            this.el.innerHTML = `
                <div class="sippy-card" role="status" aria-live="polite">
                    <div class="sippy-avatar" aria-hidden="true">
                        <span class="sippy-turtle">🐢</span>
                        <span class="sippy-mood"></span>
                    </div>
                    <div class="sippy-body">
                        <div class="sippy-name">
                            Sippy
                            <button class="sippy-listen" onclick="IHR.sippy.listen()" aria-label="Read Sippy's message aloud">${IHR.icon('speak')} Listen</button>
                        </div>
                        <p class="sippy-text"></p>
                    </div>
                    <button class="sippy-close" onclick="IHR.sippy.hide()" aria-label="Dismiss">${IHR.icon('x')}</button>
                </div>
            `;
        },

        say(text, mood = 'happy', ms = 7000) {
            if (!this.el) return;
            this.el.querySelector('.sippy-text').textContent = text;
            this.el.querySelector('.sippy-mood').textContent = MOOD_BADGE[mood] || '';
            this.el.dataset.mood = mood;
            this.el.hidden = false;

            // Restart the mood animation even when the mood repeats
            const avatar = this.el.querySelector('.sippy-avatar');
            avatar.classList.remove('is-animating');
            void avatar.offsetWidth;
            avatar.classList.add('is-animating');

            clearTimeout(this.timer);
            this.timer = setTimeout(() => this.hide(), ms);
        },

        hide() {
            if (this.el) this.el.hidden = true;
        },

        listen() {
            const text = this.el.querySelector('.sippy-text').textContent;
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
            }
            clearTimeout(this.timer);
            this.timer = setTimeout(() => this.hide(), 9000);
        }
    };
})();
