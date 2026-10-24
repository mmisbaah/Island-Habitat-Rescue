# Island Habitat Rescue

A browser science game set on a Maldives island. Students restore the lagoon, beach and jungle by completing visual science missions: 66 in all, 11 for each of Grades 1–6.

Sippy the sea turtle guides each mission through six steps: **Clues → Predict → Visual Lab → Evidence → Explain → Transfer**.

## Game modes

| Mode | What it is |
| --- | --- |
| **Island Rescue** | Each grade has its own island map with 11 sites. Every completed mission brings a site back to life. |
| **Daily Mission** | One mission per grade each day, the same pick on every device. Finishing it builds a day streak. |
| **Mystery Mission** | A random mission from the grade, chosen from the ones not yet restored. |
| **Science Quiz** | 10 untimed questions drawn from the grade's missions, with a review of missed topics. |
| **Reef Rush** | A 45-second bonus round: tap where each creature lives. |
| **Field Journal** | 52 Maldivian species, unlocked by finishing missions. |

Each mission earns up to three stars: lab solved first try, no hints used, and Explain and Transfer correct first try. Predictions are never scored.

## Running it

There is no build step and no runtime dependencies. An ES module entry point loads the game from any static web server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

With Node.js 24 or newer, `npm start` also serves the game at `http://127.0.0.1:4187`. Serve over HTTP; ES modules cannot load by opening `index.html` directly from disk. To publish it, enable **GitHub Pages** on the `main` branch (root folder).

Fonts come from Google Fonts; everything else is in this repository. Progress is saved in the browser's `localStorage`.

## Project layout

```
index.html              Page shell and module entry point
css/
  theme.css             Colour and type tokens, buttons, top bar, Sippy, modal
  screens.css           Home, island map, missions, labs, journal, quiz, Reef Rush
  polish.css            Field station styling, accessible charts and responsive diagrams
js/
  main.js               Explicit module import order
  core/                 Icons, audio, validated saves, view helpers, delegated events, Sippy
  data/
    species.js          Field Journal species
    missions.js         The first three missions of every grade
    missions-g1…g6.js   Eight more missions per grade
    catalog.js          Numbers missions and checks permanent IDs
  labs/                 One file per lab type: match, dials, choice, sequence, links, cascade
  screens/              Home, island map, Island Rescue hub, mission flow, journal, quiz, Reef Rush
  app.js                Screen routing, top bar and settings
```

## Adding or editing missions

Missions are data. Open the grade file in `js/data/` and add an object with the same shape as the others. The `lab.kind` field picks the interaction:

- `match`: drag cards into boxes
- `dials`: sliders with green target zones
- `choice`: read a chart, gauge or table, then pick an answer (set `multi: true` for more than one)
- `sequence`: put stages in order (set `loop: false` for one-way sequences)
- `links`: set energy arrows in a food chain or web
- `cascade`: the food-web heatwave simulation

`catalog.js` numbers the missions automatically, and the island map places each one by its `zone` (`lagoon`, `beach` or `jungle`, up to six per zone per grade).

Give each mission an explicit unique `id`. Keep that ID forever, even when changing its title or position: browser progress is keyed by ID. All original IDs are preserved. Save schema version 3 validates each field while retaining the existing storage key and migrating older valid results.

Use `${IHR.ui.action('Mission.act', 'pick', option.id)}` to render an action attribute. Add new methods to the explicit allowlist in `js/core/events.js`. Inputs and drag/drop use data attributes too; templates contain no executable inline handlers.

## Checks

Run `npm test` with Node.js 24+. The tests need no installed packages and also run in GitHub Actions. They validate all 66 missions, lab solutions, ID stability, save recovery, scoring, and timer cleanup.

For optional browser checks, install Playwright locally (`npm install --no-save playwright`), run `npx playwright install chromium`, then `node tests/browser.cjs`. Alternatively set `BROWSER_EXECUTABLE` to an installed Chrome/Edge executable. This test starts its own server on port 4191, completes a mission, reloads saved progress, tests keyboard controls and dialogs, renders every mission, and captures four viewport sizes under `test-results/`.

Charts have expandable data tables and distinct line styles. The matching lab supports keyboard placement. Settings contains focus and restores it on close; mission steps focus their headings. Small screens can scroll, and reduced-motion preferences disable decorative animation.

## Content notes

Some charts use example numbers made up to illustrate a point. These are labelled as examples or models on screen. Dhivehi names and Maldives-specific facts are worth checking with a local teacher before classroom use.
