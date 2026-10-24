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

There is no build step and no dependencies. The scripts are plain files loaded in order, so the game works from any static web server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly from disk also works in most browsers. To publish it, enable **GitHub Pages** on the `main` branch (root folder).

Fonts come from Google Fonts; everything else is in this repository. Progress is saved in the browser's `localStorage`.

## Project layout

```
index.html              Page shell and script order
css/
  theme.css             Colour and type tokens, buttons, top bar, Sippy, modal
  screens.css           Home, island map, missions, labs, journal, quiz, Reef Rush
js/
  core/                 Icons, sound effects, saved progress, shared helpers, Sippy
  data/
    species.js          Field Journal species
    missions.js         The first three missions of every grade
    missions-g1…g6.js   Eight more missions per grade
    catalog.js          Numbers missions 1–66 and assigns ids
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

## Content notes

Some charts use example numbers made up to illustrate a point. These are labelled as examples or models on screen. Dhivehi names and Maldives-specific facts are worth checking with a local teacher before classroom use.
