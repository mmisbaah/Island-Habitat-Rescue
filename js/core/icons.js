/**
 * Inline SVG interface icons (creatures and places use emoji instead).
 */
window.IHR = window.IHR || {};

(function () {
    const PATHS = {
        back: '<path d="M15 5l-7 7 7 7"/>',
        next: '<path d="M9 5l7 7-7 7"/>',
        sound: '<path d="M4 10v4h4l5 4V6L8 10H4z"/><path d="M16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11"/>',
        mute: '<path d="M4 10v4h4l5 4V6L8 10H4z"/><path d="M17 9l5 6M22 9l-5 6"/>',
        gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
        star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
        check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
        x: '<path d="M6 6l12 12M18 6L6 18"/>',
        play: '<path d="M8 5l11 7-11 7z"/>',
        bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/>',
        book: '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zM4 19V5"/>',
        reset: '<path d="M4 4v6h6"/><path d="M5.5 15a7.5 7.5 0 102-8L4 10"/>',
        map: '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
        timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>',
        speak: '<path d="M4 5h16v11H9l-5 4z"/>'
    };

    IHR.icon = (name, cls = '') =>
        `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${PATHS[name] || ''}</svg>`;
})();
