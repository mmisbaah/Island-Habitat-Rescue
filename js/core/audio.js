/**
 * Sound effects engine using the Web Audio API. No audio files needed.
 */
window.IHR = window.IHR || {};

(function () {
    class SoundFX {
        constructor() {
            this.ctx = null;
            this.muted = false;
        }

        init() {
            if (!this.ctx) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) this.ctx = new AudioContext();
            }
            // Browsers start (or later park) the context as suspended until a user gesture
            if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
        }

        playTone(freq, type = 'sine', duration = 0.15, startDelay = 0, volume = 0.15) {
            if (this.muted) return;
            this.init();
            if (!this.ctx) return;

            setTimeout(() => {
                try {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = type;
                    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start();
                    osc.stop(this.ctx.currentTime + duration);
                } catch (e) { console.warn('Audio playback inhibited'); }
            }, startDelay * 1000);
        }

        click() { this.playTone(440, 'sine', 0.04); }

        pop() {
            this.playTone(587.33, 'sine', 0.08);
            this.playTone(880, 'sine', 0.12, 0.06);
        }

        success() {
            this.playTone(523.25, 'triangle', 0.12, 0);    // C5
            this.playTone(659.25, 'triangle', 0.12, 0.1);  // E5
            this.playTone(783.99, 'triangle', 0.25, 0.2);  // G5
        }

        error() {
            this.playTone(220, 'sawtooth', 0.15, 0, 0.1);
            this.playTone(196, 'sawtooth', 0.2, 0.12, 0.1);
        }

        star(index = 0) {
            const notes = [659.25, 783.99, 1046.5];
            this.playTone(notes[index % 3], 'triangle', 0.3, 0, 0.18);
        }

        // A soft rising wash, used when part of the island is restored
        splash() {
            [392, 523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.playTone(f, 'sine', 0.35, i * 0.07, 0.1));
        }

        tick() { this.playTone(1200, 'square', 0.03, 0, 0.05); }
    }

    IHR.audio = new SoundFX();
})();
