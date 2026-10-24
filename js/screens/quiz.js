/**
 * SCIENCE QUIZ: 10 untimed questions from the chosen grade's missions,
 * built from each mission's transfer question and its claim/reason pair.
 * Wrong answers show the right one straight away, and the review links back to the mission.
 */
window.IHR = window.IHR || {};
IHR.screens = IHR.screens || {};

IHR.screens.quiz = {
    LENGTH: 10,

    render(el) {
        this.el = el;
        this.start();
    },

    shuffle(list) {
        const a = list.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },

    build(grade) {
        const pool = [];
        IHR.missionsForGrade(grade).forEach(m => {
            pool.push({ m, q: m.transferQ, choices: m.transferChoices, correct: m.transferCorrect });
            pool.push({
                m,
                q: `Which reason supports this claim? “${m.claim}”`,
                choices: m.explainChoices.map(c => c.text),
                correct: m.explainChoices.findIndex(c => c.correct)
            });
        });

        // Shuffle answer order too, so the right answer isn't always first
        return this.shuffle(pool).slice(0, this.LENGTH).map(item => {
            const order = this.shuffle(item.choices.map((_, i) => i));
            return { ...item, choices: order.map(i => item.choices[i]), correct: order.indexOf(item.correct) };
        });
    },

    start() {
        IHR.audio.click();
        this.state = { qs: this.build(App.grade), i: 0, score: 0, picked: null, missed: [] };
        this.draw();
        IHR.sippy.say('No timer here. Read each question carefully!', 'think');
    },

    draw() {
        const s = this.state;
        if (s.i >= s.qs.length) return this.end();
        const item = s.qs[s.i];
        const answered = s.picked !== null;
        const right = answered && s.picked === item.correct;

        this.el.innerHTML = `
            <section class="quiz">
                <div class="mode-top">
                    <button class="btn btn-ghost" ${IHR.ui.action('App.go', 'home')}>${IHR.icon('back')} Home</button>
                    <span class="mode-pill">❓ Science Quiz · Grade ${App.grade}</span>
                </div>
                <ol class="quiz-dots" aria-label="Question ${s.i + 1} of ${s.qs.length}">
                    ${s.qs.map((_, k) => `<li class="${k < s.i ? 'is-done' : ''} ${k === s.i ? 'is-now' : ''}"></li>`).join('')}
                </ol>
                <div class="panel quiz-card">
                    <div class="quiz-meta">
                        <span class="eyebrow">Question ${s.i + 1} of ${s.qs.length}</span>
                        <span class="quiz-score">Score <b>${s.score}</b></span>
                    </div>
                    <p class="quiz-from">${item.m.siteEmoji} From Mission ${item.m.num}: ${item.m.title}</p>
                    <h2 class="quiz-q">${item.q}</h2>
                    <div class="choice-list">
                        ${item.choices.map((c, k) => {
                            const cls = !answered ? '' : k === item.correct ? 'is-right' : k === s.picked ? 'is-wrong' : 'is-dim';
                            return `
                                <button class="choice ${cls}" ${IHR.ui.action('IHR.screens.quiz.answer', k)} ${answered ? 'disabled' : ''}>
                                    <span class="choice-mark is-letter" aria-hidden="true">${String.fromCharCode(65 + k)}</span>
                                    <span class="choice-text">${c}</span>
                                    <span class="tick-box">${answered && k === item.correct ? IHR.icon('check') : answered && k === s.picked ? IHR.icon('x') : ''}</span>
                                </button>
                            `;
                        }).join('')}
                    </div>
                    ${answered ? `
                        <div class="quiz-feedback ${right ? 'is-right' : 'is-wrong'}">
                            <p><b>${right ? 'Correct!' : 'Not quite.'}</b> ${right ? '' : `The answer is “${item.choices[item.correct]}”.`}</p>
                            <button class="btn btn-coral btn-lg" ${IHR.ui.action('IHR.screens.quiz.next')}>${s.i + 1 < s.qs.length ? 'Next question' : 'See my score'} ${IHR.icon('next')}</button>
                        </div>
                    ` : ''}
                </div>
            </section>
        `;
    },

    answer(k) {
        const s = this.state;
        if (s.picked !== null) return;
        s.picked = k;
        const item = s.qs[s.i];
        if (k === item.correct) {
            s.score++;
            IHR.audio.pop();
            IHR.sippy.say(['Spot on!', 'Great thinking!', 'Correct!'][s.score % 3], 'happy', 3000);
        } else {
            IHR.audio.error();
            s.missed.push(item);
            IHR.sippy.say('Read the right answer. It will help next time!', 'worried', 4000);
        }
        this.draw();
    },

    next() {
        IHR.audio.click();
        this.state.i++;
        this.state.picked = null;
        this.draw();
    },

    end() {
        const s = this.state;
        const best = IHR.store.setQuizBest(App.grade, s.score);
        IHR.audio.success();
        const missedMissions = [...new Map(s.missed.map(it => [it.m.id, it.m])).values()];

        this.el.innerHTML = `
            <section class="quiz">
                <div class="panel quiz-card quiz-end">
                    <p class="eyebrow">Grade ${App.grade} Science Quiz</p>
                    <h1 class="display">${s.score} / ${s.qs.length}</h1>
                    <p>${best ? '<b>New best score!</b>' : `Best: ${IHR.store.data.quizBest[App.grade]}/${s.qs.length}`}</p>
                    ${missedMissions.length ? `
                        <h2 class="section-title">Brush up with these missions</h2>
                        <div class="mission-list">${missedMissions.map(m => IHR.screens.hub.card(m)).join('')}</div>
                    ` : '<p>A perfect score. Brilliant!</p>'}
                    <div class="row is-center">
                        <button class="btn btn-coral btn-lg" ${IHR.ui.action('IHR.screens.quiz.start')}>${IHR.icon('reset')} New quiz</button>
                        <button class="btn btn-sand" ${IHR.ui.action('App.go', 'home')}>${IHR.icon('back')} Home</button>
                    </div>
                </div>
            </section>
        `;
        IHR.sippy.say(s.score >= 8 ? 'Amazing score, scientist!' : 'Nice work! Play the missions above, then try again.', 'cheer');
    }
};
