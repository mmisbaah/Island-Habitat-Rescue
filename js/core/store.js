/**
 * Player progress, saved in this browser only.
 * Tracks mission status, best stars, journal discoveries, the daily streak,
 * best quiz and Reef Rush scores, and the chosen grade.
 */
window.IHR = window.IHR || {};

(function () {
    const KEY = 'ihr_island_v2';
    const OLD_KEY = 'science_lagoon_habitat_rescue';
    const RANK = { not_started: 0, explored: 1, practised: 2, demonstrated: 3 };

    const blank = () => ({
        version: 3,
        missions: {},
        journal: {},
        rushBest: 0,
        quizBest: {},
        daily: { last: null, streak: 0, done: {} },
        grade: 1,
        muted: false
    });

    const object = v => v && typeof v === 'object' && !Array.isArray(v) ? v : {};
    const integer = (v, max = Number.MAX_SAFE_INTEGER) => Number.isSafeInteger(v) && v >= 0 && v <= max;
    const day = v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));
    function sanitize(raw) {
        const s = object(raw), clean = blank();
        const missionIds = new Set(IHR.MISSIONS.map(m => m.id));
        Object.entries(object(s.missions)).forEach(([id, value]) => {
            const m = object(value);
            if (missionIds.has(id)) clean.missions[id] = {
                status: Object.hasOwn(RANK, m.status) ? m.status : 'not_started',
                stars: integer(m.stars, 3) ? m.stars : 0
            };
        });
        Object.entries(object(s.journal)).forEach(([id, value]) => {
            if (Object.hasOwn(IHR.SPECIES, id) && typeof value === 'string' && !Number.isNaN(Date.parse(value))) clean.journal[id] = value;
        });
        Object.entries(object(s.quizBest)).forEach(([grade, score]) => {
            if (/^[1-6]$/.test(grade) && integer(score, 10)) clean.quizBest[grade] = score;
        });
        if (integer(s.rushBest)) clean.rushBest = s.rushBest;
        if (Number.isInteger(s.grade) && IHR.GRADES.includes(s.grade)) clean.grade = s.grade;
        clean.muted = s.muted === true;
        const d = object(s.daily);
        if (day(d.last) && integer(d.streak)) {
            clean.daily.last = d.last;
            clean.daily.streak = d.streak;
        }
        Object.entries(object(d.done)).forEach(([key, value]) => {
            const [date, grade] = key.split('|');
            if (day(date) && /^[1-6]$/.test(grade) && value === true) clean.daily.done[key] = true;
        });
        return clean;
    }

    IHR.store = {
        data: blank(),
        storageError: false,
        recovered: false,

        load() {
            this.data = blank();
            this.storageError = false;
            this.recovered = false;
            try {
                const raw = localStorage.getItem(KEY);
                if (raw) {
                    const saved = JSON.parse(raw);
                    this.data = sanitize(saved);
                    this.recovered = Object.keys(this.data).some(key => key !== 'version' && JSON.stringify(this.data[key]) !== JSON.stringify(object(saved)[key] ?? blank()[key]));
                    return;
                }
                // Carry over badges from the single-file version of the game
                const old = localStorage.getItem(OLD_KEY);
                if (old) {
                    const parsed = JSON.parse(old);
                    this.data = sanitize({ missions: parsed });
                    this.save();
                }
            } catch (e) {
                this.data = blank();
                this.recovered = true;
                this.storageError = e.name !== 'SyntaxError';
            }
        },

        save() {
            try {
                localStorage.setItem(KEY, JSON.stringify(this.data));
                this.storageError = false;
            } catch (e) {
                this.storageError = true;
            }
            if (IHR.ui && IHR.ui.storageNotice) IHR.ui.storageNotice();
        },

        mission(id) {
            return this.data.missions[id] || { status: 'not_started', stars: 0 };
        },

        // Never downgrade a badge when a mission is replayed
        setStatus(id, status) {
            const cur = this.mission(id);
            if (RANK[status] <= RANK[cur.status]) return;
            this.data.missions[id] = { ...cur, status };
            this.save();
        },

        // Keeps the best result; returns true when this run beat it
        setStars(id, stars) {
            const cur = this.mission(id);
            if (stars <= (cur.stars || 0)) return false;
            this.data.missions[id] = { ...cur, stars };
            this.save();
            return true;
        },

        // Returns only the species that were new this time
        unlock(ids) {
            const fresh = ids.filter(id => !this.data.journal[id]);
            fresh.forEach(id => { this.data.journal[id] = new Date().toISOString(); });
            if (fresh.length) this.save();
            return fresh;
        },

        hasSpecies(id) { return Boolean(this.data.journal[id]); },
        journalCount() { return Object.keys(this.data.journal).length; },

        isRestored(id) { return this.mission(id).status === 'demonstrated'; },

        totalStars() {
            return Object.values(this.data.missions).reduce((sum, m) => sum + (m.stars || 0), 0);
        },

        // Pass a grade to measure that grade's island only; leave it out for all 66 missions
        pool(grade) {
            return grade ? IHR.missionsForGrade(grade) : IHR.MISSIONS;
        },

        zoneTotal(zone, grade) {
            return this.pool(grade).filter(m => m.zone === zone).length;
        },

        zoneRestored(zone, grade) {
            return this.pool(grade).filter(m => m.zone === zone && this.isRestored(m.id)).length;
        },

        zoneHealth(zone, grade) {
            const total = this.zoneTotal(zone, grade);
            return total ? this.zoneRestored(zone, grade) / total : 0;
        },

        restoredCount(grade) {
            return this.pool(grade).filter(m => this.isRestored(m.id)).length;
        },

        islandHealth(grade) {
            return this.restoredCount(grade) / this.pool(grade).length;
        },

        gradeStars(grade) {
            return this.pool(grade).reduce((sum, m) => sum + (this.mission(m.id).stars || 0), 0);
        },

        /* ───── Daily mission: one per grade per day; any completed daily keeps the streak alive ───── */

        dayKey(date = new Date()) {
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        },

        dailyMission(grade) {
            const seed = `${this.dayKey()}|${grade}`;
            let hash = 0;
            for (const ch of seed) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
            const list = IHR.missionsForGrade(grade);
            return list[hash % list.length];
        },

        dailyDone(grade) {
            return Boolean(this.data.daily.done[`${this.dayKey()}|${grade}`]);
        },

        completeDaily(grade) {
            const d = this.data.daily;
            const today = this.dayKey();
            if (d.done[`${today}|${grade}`]) return { first: false, streak: d.streak };
            d.done[`${today}|${grade}`] = true;
            if (d.last !== today) {
                const y = new Date();
                y.setDate(y.getDate() - 1);
                d.streak = d.last === this.dayKey(y) ? d.streak + 1 : 1;
                d.last = today;
            }
            this.save();
            return { first: true, streak: d.streak };
        },

        // A streak only counts if the last daily was today or yesterday
        currentStreak() {
            const d = this.data.daily;
            const y = new Date();
            y.setDate(y.getDate() - 1);
            return d.last === this.dayKey() || d.last === this.dayKey(y) ? d.streak : 0;
        },

        setQuizBest(grade, score) {
            if (score <= (this.data.quizBest[grade] || 0)) return false;
            this.data.quizBest[grade] = score;
            this.save();
            return true;
        },

        setGrade(grade) {
            this.data.grade = grade;
            this.save();
        },

        setRushBest(score) {
            if (score <= this.data.rushBest) return false;
            this.data.rushBest = score;
            this.save();
            return true;
        },

        setMuted(muted) {
            this.data.muted = muted;
            this.save();
        },

        reset() {
            const { muted, grade } = this.data;
            this.data = blank();
            Object.assign(this.data, { muted, grade });
            this.save();
        }
    };
})();
