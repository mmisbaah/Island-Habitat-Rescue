/**
 * ISLAND MAP: a top-down view of Rescue Island that heals as missions are completed.
 * Lagoon water clears, the jungle turns green, beach litter disappears,
 * and each mission's site changes from a grey shadow to a living creature.
 */
window.IHR = window.IHR || {};

(function () {
    // Litter clears as the grade's beach sites are restored
    const TRASH = [[330, 360], [470, 470], [705, 470], [880, 330], [790, 170], [470, 175]];
    const PALMS = [[430, 230], [790, 250], [455, 345], [770, 360], [610, 190], [690, 385]];
    const CORALS = [[95, 180], [205, 300], [330, 520], [480, 70], [80, 420], [300, 40], [905, 140], [930, 430], [720, 520]];

    // Map spots per zone; a grade's missions in that zone take them in mission order (max 6 per zone)
    const SPOTS = {
        lagoon: [[130, 250], [160, 380], [260, 470], [250, 150], [380, 90], [480, 522]],
        beach: [[350, 300], [420, 420], [600, 445], [800, 420], [860, 260], [700, 150]],
        jungle: [[500, 280], [580, 220], [680, 240], [740, 310], [620, 340], [540, 350]]
    };

    function spot(m) {
        const sameZone = IHR.missionsForGrade(m.grade).filter(x => x.zone === m.zone);
        const [x, y] = SPOTS[m.zone][sameZone.indexOf(m) % SPOTS[m.zone].length];
        return { x, y };
    }

    IHR.islandMap = {
        // Each grade has its own island: only that grade's 11 sites appear and drive its health
        svg({ grade, highlight }) {
            const S = IHR.store;
            const mix = IHR.ui.mix;
            const hL = S.zoneHealth('lagoon', grade);
            const hJ = S.zoneHealth('jungle', grade);
            const beachCleared = Math.round(S.zoneHealth('beach', grade) * TRASH.length);

            const corals = CORALS.map(([x, y], i) => `
                <circle cx="${x}" cy="${y}" r="${12 + (i % 3) * 4}" fill="${mix('#eeeae0', i % 2 ? '#ff8f7d' : '#f8b84e', hL)}" opacity="0.85"/>
            `).join('');

            const trash = TRASH.map(([x, y], i) => i >= beachCleared
                ? `<text x="${x}" y="${y}" class="map-trash" text-anchor="middle">${i % 2 ? '🥤' : '🧴'}</text>`
                : '').join('');

            const palms = PALMS.map(([x, y]) => `<text x="${x}" y="${y}" class="map-palm" text-anchor="middle" style="opacity:${0.45 + hJ * 0.55}">🌴</text>`).join('');

            const sites = IHR.missionsForGrade(grade).map(m => {
                const restored = S.isRestored(m.id);
                const stars = S.mission(m.id).stars || 0;
                const pos = spot(m);
                const go = `App.go('mission', { id: '${m.id}' })`;
                return `
                    <g class="site is-grade ${restored ? 'is-restored' : ''} ${highlight === m.id ? 'is-new' : ''}"
                        transform="translate(${pos.x} ${pos.y})" tabindex="0" role="button"
                        aria-label="Mission ${m.num}: ${m.title}${restored ? ', restored' : ''}"
                        onclick="${go}" onkeydown="if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); ${go}; }">
                        ${restored ? '' : '<circle class="site-pulse" r="36"/>'}
                        <circle class="site-hit" r="32"/>
                        <text class="site-emoji" text-anchor="middle" y="14">${m.siteEmoji}</text>
                        <g class="site-pin" transform="translate(24 -26)">
                            <rect x="-18" y="-13" width="36" height="24" rx="12"/>
                            <text text-anchor="middle" y="5">${m.num}</text>
                        </g>
                        ${restored ? `<text class="site-stars" text-anchor="middle" y="52">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</text>` : ''}
                    </g>
                `;
            }).join('');

            return `
                <svg class="island-map" viewBox="0 0 1000 560" role="group" aria-label="Grade ${grade} island map. Island health ${Math.round(S.islandHealth(grade) * 100)} percent.">
                    <defs>
                        <radialGradient id="map-ocean" cx="50%" cy="45%" r="75%">
                            <stop offset="0" stop-color="#147a99"/>
                            <stop offset="1" stop-color="#083553"/>
                        </radialGradient>
                        <radialGradient id="map-lagoon" cx="55%" cy="50%" r="60%">
                            <stop offset="0" stop-color="#c7f5ec"/>
                            <stop offset="0.65" stop-color="#5ad6cf"/>
                            <stop offset="1" stop-color="#27adb8"/>
                        </radialGradient>
                        <pattern id="map-waves" width="80" height="36" patternUnits="userSpaceOnUse">
                            <path d="M0 18 q20 -9 40 0 t40 0" fill="none" stroke="#ffffff" stroke-opacity="0.13" stroke-width="2"/>
                        </pattern>
                    </defs>

                    <rect width="1000" height="560" fill="url(#map-ocean)"/>
                    <rect width="1080" height="560" fill="url(#map-waves)" class="map-waves"/>

                    <!-- Faru: the outer reef where waves break -->
                    <ellipse cx="500" cy="300" rx="482" ry="262" fill="none" stroke="#fdf2d0" stroke-opacity="0.7" stroke-width="12" stroke-dasharray="2 16" stroke-linecap="round" class="map-surf"/>
                    <ellipse cx="500" cy="300" rx="470" ry="250" fill="url(#map-lagoon)"/>
                    ${corals}
                    <ellipse cx="500" cy="300" rx="470" ry="250" fill="#6f7d68" opacity="${((1 - hL) * 0.4).toFixed(2)}" class="map-murk"/>

                    <!-- Island: wet sand, dry sand, jungle -->
                    <ellipse cx="605" cy="306" rx="314" ry="184" fill="#fff4d6" opacity="0.7"/>
                    <ellipse cx="600" cy="300" rx="300" ry="170" fill="#f6e3b4"/>
                    <ellipse cx="610" cy="290" rx="214" ry="112" fill="${mix('#a39a5e', '#2f8f4e', hJ)}"/>
                    <ellipse cx="590" cy="270" rx="150" ry="70" fill="${mix('#b3a86a', '#3fa35c', hJ)}" opacity="0.7"/>
                    ${palms}
                    ${trash}

                    <text x="40" y="40" class="map-label">FARU · OUTER REEF</text>
                    <text x="960" y="540" class="map-label" text-anchor="end">N ↑ · 200 m</text>

                    <g class="map-boat"><text y="0" font-size="34">⛵</text></g>

                    ${sites}
                </svg>
            `;
        }
    };
})();
