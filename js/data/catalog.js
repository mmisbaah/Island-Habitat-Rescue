/**
 * MISSION CATALOG: runs after every mission file has loaded.
 * Numbers missions 1–66 (11 per grade, core missions first) and gives new missions their ids.
 * Ids follow habitat-g{grade}-{nn}, so saved progress for the original 18 still matches.
 */
window.IHR = window.IHR || {};

(function () {
    const byGrade = {};
    IHR.MISSIONS.forEach(m => { (byGrade[m.grade] = byGrade[m.grade] || []).push(m); });

    IHR.MISSIONS = [];
    Object.keys(byGrade).map(Number).sort((a, b) => a - b).forEach(grade => {
        byGrade[grade].forEach((m, i) => {
            m.num = (grade - 1) * 11 + i + 1;
            m.id = m.id || `habitat-g${grade}-${String(i + 1).padStart(2, '0')}`;
            IHR.MISSIONS.push(m);
        });
    });

    IHR.missionsForGrade = grade => IHR.MISSIONS.filter(m => m.grade === grade);
    IHR.GRADES = Object.keys(byGrade).map(Number).sort((a, b) => a - b);
})();
