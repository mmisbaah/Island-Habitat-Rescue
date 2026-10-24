/**
 * CORE MISSIONS: the first three missions of every grade.
 * Grades 1–6 each get eight more in missions-g1.js … missions-g6.js, and catalog.js
 * numbers them 1–66 (11 per grade). Map positions come from the zone, so `num` and `site`
 * here are overwritten.
 *
 * Each mission unlocks Field Journal species (`rewards`) and defines a visual lab:
 *   kind: match | dials | choice | sequence | links | cascade
 * Labs with a `trial` play out over time after the setup passes its check.
 */
window.IHR = window.IHR || {};

// Grade files call this to append their missions
IHR.addMissions = (grade, list) => {
    list.forEach(m => IHR.MISSIONS.push({ ...m, grade }));
};

IHR.MISSIONS = [
    // ───────────────────────── GRADE 1 ─────────────────────────
    {
        id: 'habitat-g1-01', grade: 1, num: 11, zone: 'jungle',
        title: 'Living vs Non-Living',
        goal: 'Sort what you find in the jungle clearing into Living Things and Non-Living Things.',
        site: { x: 500, y: 280 }, siteEmoji: '🌱',
        restore: 'Coconut seedlings are sprouting in the jungle clearing',
        rewards: ['seedling', 'lizard'],
        clues: [
            { emoji: '🌱', title: 'Coconut Seedling', text: 'Sprouting from a fallen coconut. It grows with rain and sun.' },
            { emoji: '🦀', title: 'Ghost Crab', text: 'Eats, breathes and digs its own burrow.' },
            { emoji: '🪨', title: 'Coral Stone', text: 'A lump of old coral rock. It does not eat or grow.' },
            { emoji: '🤖', title: 'Toy Crab', text: 'Runs on batteries. It moves, but it never grows.' }
        ],
        predictions: [
            { emoji: '🤖', label: 'The toy crab is living, because it moves' },
            { emoji: '🔋', label: 'The toy crab is non-living' },
            { emoji: '🪨', label: 'The coral stone is living' }
        ],
        correctPrediction: 1,
        claim: 'The toy crab moves on batteries, but is non-living.',
        explainChoices: [
            { text: 'It runs on batteries and never grows or needs water.', correct: true },
            { text: 'It lives underwater with the fish.', correct: false }
        ],
        transferQ: 'A robot bird sings and flaps its wings with batteries. What is it?',
        transferChoices: [
            'Non-living (it needs battery energy and does not grow)',
            'Living (it makes bird sounds)'
        ],
        transferCorrect: 0,
        hints: ['Does a battery toy grow, or eat food?', 'Living things grow and need water, air and food.'],
        lab: {
            kind: 'match',
            instruction: 'Sort each card into the box where it belongs.',
            slots: [
                { id: 'living', label: 'Living Things', emoji: '💚', sub: 'Grows, eats or makes food, needs water' },
                { id: 'nonliving', label: 'Non-Living Things', emoji: '📦', sub: 'Never grows or needs food' }
            ],
            items: [
                { id: 'seedling', label: 'Coconut Seedling', emoji: '🌱', tone: 'palm', target: 'living' },
                { id: 'crab', label: 'Ghost Crab', emoji: '🦀', tone: 'sand', target: 'living' },
                { id: 'stone', label: 'Coral Stone', emoji: '🪨', tone: 'shell', target: 'nonliving' },
                { id: 'toy', label: 'Toy Crab', emoji: '🤖', tone: 'sky', target: 'nonliving' }
            ],
            evidence: [
                { emoji: '🌱', tone: 'palm', title: 'Living: 2 cards', text: 'The seedling and the ghost crab both grow and need water and food.' },
                { emoji: '🤖', tone: 'sky', title: 'Moving is not the same as alive', text: 'The toy crab moves only because a battery pushes it. It never grows.' },
                { emoji: '🪨', tone: 'shell', title: 'Non-Living: 2 cards', text: 'The coral stone and the toy crab do not eat, breathe or grow.' }
            ]
        }
    },

    {
        id: 'habitat-g1-02', grade: 1, num: 12, zone: 'jungle',
        title: 'A Drink for the Hibiscus',
        goal: 'Set the sunlight and water dials, then look after the hibiscus through a week with monsoon rain.',
        site: { x: 580, y: 220 }, siteEmoji: '🌺',
        restore: 'The hibiscus by the village path is flowering again',
        rewards: ['hibiscus'],
        clues: [
            { emoji: '🌺', title: 'Hibiscus', text: 'Dry soil! Its leaves are drooping.' },
            { emoji: '☀️', title: 'Sunlight', text: 'The light is already just right.' },
            { emoji: '💧', title: 'Water', text: 'Nobody has watered it for a week.' },
            { emoji: '🌧️', title: 'Weather', text: 'Monsoon showers are on the way this week.' }
        ],
        predictions: [
            { emoji: '🌊', label: 'Flood it with sea water' },
            { emoji: '💧', label: 'Give it a moderate drink of fresh water' },
            { emoji: '🌑', label: 'Move it into the dark' }
        ],
        correctPrediction: 1,
        claim: 'Plants need moderate water to keep leaves firm and make food.',
        explainChoices: [
            { text: 'Water is essential, but too much floods and damages the roots.', correct: true },
            { text: 'Plants eat the soil for food.', correct: false }
        ],
        transferQ: 'A potted chilli plant has dry soil on a sunny windowsill. What should you do?',
        transferChoices: [
            'Pour a moderate amount of fresh water into the pot',
            'Move it into a dark cupboard'
        ],
        transferCorrect: 0,
        hints: ['The sunlight is fine. Leave it in the green zone and fix the water.', 'Water in the green 50–70% zone. On rainy days, the rain does the watering.'],
        lab: {
            kind: 'dials',
            visual: 'hibiscus',
            instruction: 'Slide both dials into their green zones, then run a week in the garden.',
            dials: [
                { key: 'light', label: 'Sunlight', emoji: '☀️', start: 70, min: 40, max: 80, low: 'Too dark for the leaves', high: 'Scorching sun is drying the leaves' },
                { key: 'water', label: 'Fresh Water', emoji: '💧', start: 0, min: 50, max: 70, low: 'The soil is still too dry', high: 'Flooded! The roots cannot breathe' }
            ],
            trial: 'week',
            trialCfg: { days: 7, rainDays: [3, 4], rain: 55 },
            evidence: [
                { emoji: '🌺', tone: 'coral', title: 'Hibiscus revived', text: 'The leaves stood back up once the soil was moist.' },
                { emoji: '🌧️', tone: 'sky', title: 'Rain counts as water', text: 'Watering on rainy days would have flooded the roots.' },
                { emoji: '☀️', tone: 'sun', title: 'Light stayed steady', text: 'Sunlight was never the problem here. Water was.' }
            ]
        }
    },

    {
        id: 'habitat-g1-03', grade: 1, num: 13, zone: 'beach',
        title: 'A Safe Home',
        goal: 'Move the White Tern and the Goby Fish to the shelters that keep them safe.',
        site: { x: 350, y: 300 }, siteEmoji: '🕊️',
        restore: 'White terns are resting in the beach trees again',
        rewards: ['tern', 'goby'],
        clues: [
            { emoji: '🕊️', title: 'White Tern', text: 'Lays its one egg on a bare tree branch.' },
            { emoji: '🐟', title: 'Goby Fish', text: 'Hides in a hole in the coral.' }
        ],
        predictions: [
            { emoji: '🌍', label: 'Animals can live anywhere with some shade' },
            { emoji: '🏠', label: 'Each animal needs a shelter that fits it' }
        ],
        correctPrediction: 1,
        claim: 'Shelter protects organisms from predators and weather.',
        explainChoices: [
            { text: 'Terns rest high in trees while gobies hide in coral holes.', correct: true },
            { text: 'Fish can build nests in tree leaves.', correct: false }
        ],
        transferQ: 'Where does a hermit crab shelter on the beach?',
        transferChoices: [
            'Inside an empty sea shell',
            'At the top of a coconut palm'
        ],
        transferCorrect: 0,
        hints: ['Which shelter keeps a bird off the ground? Which one is underwater?', 'Tern to the tree branch, goby to the coral hole!'],
        lab: {
            kind: 'match',
            instruction: 'Drag each animal into the shelter that keeps it safe.',
            slots: [
                { id: 'branch', label: 'Tree Branch', emoji: '🌳', sub: 'High up, out of reach' },
                { id: 'coral', label: 'Coral Hole', emoji: '🪸', sub: 'Underwater hiding place' },
                { id: 'sand', label: 'Open Sand', emoji: '🏖️', sub: 'Hot, bare, no cover' }
            ],
            items: [
                { id: 'tern', label: 'White Tern', emoji: '🕊️', tone: 'sky', target: 'branch' },
                { id: 'goby', label: 'Goby Fish', emoji: '🐟', tone: 'sun', target: 'coral' }
            ],
            evidence: [
                { emoji: '🕊️', tone: 'sky', title: 'Tern is safe', text: 'A high branch keeps its egg away from crabs and rats.' },
                { emoji: '🐟', tone: 'sun', title: 'Goby is safe', text: 'The coral hole hides it from bigger fish.' },
                { emoji: '🏖️', tone: 'sand', title: 'Open sand stays empty', text: 'No cover there, so it shelters neither animal.' }
            ]
        }
    },

    // ───────────────────────── GRADE 2 ─────────────────────────
    {
        id: 'habitat-g2-01', grade: 2, num: 21, zone: 'beach',
        title: 'Meet the Animal Needs',
        goal: 'Give the Grey Heron and the Tang Fish their oxygen, food and shelter.',
        site: { x: 420, y: 420 }, siteEmoji: '🐦',
        restore: 'A grey heron is fishing at the water’s edge',
        rewards: ['heron', 'tang'],
        clues: [
            { emoji: '🐦', title: 'Grey Heron (Maakana)', text: 'Breathes air with lungs. Spears small fish in the shallows.' },
            { emoji: '🐟', title: 'Powder Blue Tang', text: 'Its gills take oxygen from the water. It grazes algae.' }
        ],
        predictions: [
            { emoji: '💨', label: 'Both animals take oxygen from the air the same way' },
            { emoji: '🌊', label: 'The heron uses lungs for air; the tang uses gills for water' }
        ],
        correctPrediction: 1,
        claim: 'Gills take oxygen dissolved in seawater, while lungs take oxygen from the air.',
        explainChoices: [
            { text: 'Gills take oxygen from water, while lungs take oxygen from the air.', correct: true },
            { text: 'Fish drink water to get air into their stomachs.', correct: false }
        ],
        transferQ: 'How does a green sea turtle get oxygen in the lagoon?',
        transferChoices: [
            'It swims up to the surface to breathe air into its lungs',
            'It uses gills under its shell'
        ],
        transferCorrect: 0,
        hints: ['The heron lives in the air; the tang lives underwater. Start with oxygen.', 'Lungs to the heron, gills to the tang. Herons eat small fish; tangs graze algae.'],
        lab: {
            kind: 'match',
            instruction: 'Give each animal its oxygen, food and shelter.',
            slotCols: 2,
            slots: [
                { id: 'heron_o2', label: 'Heron · Oxygen', emoji: '🐦' },
                { id: 'tang_o2', label: 'Tang · Oxygen', emoji: '🐟' },
                { id: 'heron_food', label: 'Heron · Food', emoji: '🐦' },
                { id: 'tang_food', label: 'Tang · Food', emoji: '🐟' },
                { id: 'heron_shelter', label: 'Heron · Shelter', emoji: '🐦' },
                { id: 'tang_shelter', label: 'Tang · Shelter', emoji: '🐟' }
            ],
            items: [
                { id: 'lungs', label: 'Lungs (air)', emoji: '🫁', tone: 'sky', target: 'heron_o2' },
                { id: 'gills', label: 'Gills (water)', emoji: '🌊', tone: 'lagoon', target: 'tang_o2' },
                { id: 'smallfish', label: 'Small Fish', emoji: '🐠', tone: 'sun', target: 'heron_food' },
                { id: 'algae', label: 'Turf Algae', emoji: '🌿', tone: 'palm', target: 'tang_food' },
                { id: 'roost', label: 'Mangrove Roost', emoji: '🌳', tone: 'bark', target: 'heron_shelter' },
                { id: 'crevice', label: 'Reef Crevice', emoji: '🪸', tone: 'coral', target: 'tang_shelter' }
            ],
            evidence: [
                { emoji: '🫁', tone: 'sky', title: 'Heron breathes air', text: 'Lungs take oxygen from the air above the water.' },
                { emoji: '🌊', tone: 'lagoon', title: 'Tang breathes water', text: 'Gills pull out the oxygen dissolved in seawater.' },
                { emoji: '✅', tone: 'palm', title: 'All 6 needs met', text: 'The same three needs, met in very different ways.' }
            ]
        }
    },

    {
        id: 'habitat-g2-02', grade: 2, num: 22, zone: 'jungle',
        title: 'Roots, Stem & Leaves',
        goal: 'Build a young breadfruit tree by putting its leaves, stem and roots in the right places.',
        site: { x: 680, y: 240 }, siteEmoji: '🌳',
        restore: 'A young breadfruit tree is growing tall in the jungle',
        rewards: ['breadfruit'],
        clues: [
            { emoji: '🦶', title: 'Roots', text: 'Soak up water and anchor the tree.' },
            { emoji: '🍃', title: 'Leaves', text: 'Catch sunlight to make sugar.' },
            { emoji: '🪵', title: 'Stem', text: 'Carries water and food up and down.' }
        ],
        predictions: [
            { emoji: '🔄', label: 'Roots catch sunlight; leaves soak up soil' },
            { emoji: '🌳', label: 'Leaves catch light; roots soak up water from the soil' }
        ],
        correctPrediction: 1,
        claim: 'Roots absorb groundwater; leaves absorb light to produce food energy.',
        explainChoices: [
            { text: 'Roots pull water from below; leaves catch sunlight from above.', correct: true },
            { text: 'Roots eat solid dirt for food.', correct: false }
        ],
        transferQ: 'If thick dust covers a plant’s leaves and blocks the sunlight, what happens?',
        transferChoices: [
            'The leaves cannot catch light energy to make the plant’s food',
            'The roots stop soaking up water straight away'
        ],
        transferCorrect: 0,
        hints: ['Which part must reach the sun? Which part must reach the water underground?', 'Leaves at the top, stem in the middle, roots at the bottom.'],
        lab: {
            kind: 'match',
            instruction: 'Build the tree from top to bottom.',
            slotCols: 1,
            slots: [
                { id: 'top', label: 'Top: up in the sunlight', emoji: '☀️' },
                { id: 'middle', label: 'Middle: holding the tree up', emoji: '↕️' },
                { id: 'bottom', label: 'Bottom: under the soil', emoji: '🟫' }
            ],
            items: [
                { id: 'roots', label: 'Roots', emoji: '🦶', tone: 'bark', target: 'bottom' },
                { id: 'leaves', label: 'Leaves', emoji: '🍃', tone: 'palm', target: 'top' },
                { id: 'stem', label: 'Stem', emoji: '🪵', tone: 'sand', target: 'middle' }
            ],
            evidence: [
                { emoji: '🍃', tone: 'palm', title: 'Leaves catch light', text: 'They sit on top, where the sunlight reaches them.' },
                { emoji: '🪵', tone: 'sand', title: 'Stem carries water', text: 'Water travels up from the roots to the leaves.' },
                { emoji: '🦶', tone: 'bark', title: 'Roots drink and anchor', text: 'Underground, roots soak up water and hold the tree in place.' }
            ]
        }
    },

    {
        id: 'habitat-g2-03', grade: 2, num: 23, zone: 'beach',
        title: 'Observe from a Distance',
        goal: 'Pick the tool that lets you study ghost crabs without disturbing them.',
        site: { x: 600, y: 445 }, siteEmoji: '🦀',
        restore: 'Ghost crabs are digging fresh burrows on the beach',
        rewards: ['ghost_crab'],
        clues: [
            { emoji: '🦀', title: 'Ghost Crab', text: 'Dashes into its burrow if anything chases it.' },
            { emoji: '🛡️', title: 'Field Rule', text: 'Never trap, feed or touch wild animals.' }
        ],
        predictions: [
            { emoji: '🪣', label: 'Catch a crab in a bucket to look closely' },
            { emoji: '👀', label: 'Watch quietly from far away with binoculars' }
        ],
        correctPrediction: 1,
        claim: 'Distant observation protects wild animals and yields natural behavior data.',
        explainChoices: [
            { text: 'Binoculars let you watch from far away without changing how the crabs behave.', correct: true },
            { text: 'Chasing animals helps them become friendly.', correct: false }
        ],
        transferQ: 'You spot a bird nesting beside the school path. What is the right thing to do?',
        transferChoices: [
            'Watch quietly from a distance with binoculars',
            'Pick up the nest to look at the eggs'
        ],
        transferCorrect: 0,
        hints: ['Read the Field Rule card again: no trapping, feeding or touching.', 'Pick the binoculars!'],
        lab: {
            kind: 'choice',
            instruction: 'Pick ONE tool for today’s ghost crab study.',
            options: [
                { id: 'bucket', label: 'Bucket', sub: 'Catch a crab to look closely', emoji: '🪣', why: 'Trapping scares the crab, and a scared crab does not act naturally.' },
                { id: 'torch', label: 'Torch', sub: 'Shine light down the burrow', emoji: '🔦', why: 'Lighting up the burrow chases the crab out of its shelter.' },
                { id: 'binoculars', label: 'Binoculars', sub: 'Watch from 10 metres away', emoji: '👀' },
                { id: 'bread', label: 'Bread crumbs', sub: 'Tempt crabs closer', emoji: '🍞', why: 'Feeding wild animals breaks the Field Rule and changes what they eat.' }
            ],
            correct: ['binoculars'],
            evidence: [
                { emoji: '👀', tone: 'lagoon', title: '14 crabs observed', text: 'They kept feeding and digging, which is natural behaviour.' },
                { emoji: '🛡️', tone: 'palm', title: '0 crabs disturbed', text: 'No crab fled into its burrow during the study.' },
                { emoji: '🪣', tone: 'coral', title: 'Bucket method skipped', text: 'A caught crab hides or freezes, giving you false data.' }
            ]
        }
    },

    // ───────────────────────── GRADE 3 ─────────────────────────
    {
        id: 'habitat-g3-01', grade: 3, num: 31, zone: 'jungle',
        title: 'Habitat Detective',
        goal: 'Match the Tang, the Flying Fox and the Mangrove to the habitat that meets their needs.',
        site: { x: 740, y: 310 }, siteEmoji: '🦇',
        restore: 'Flying foxes are roosting in the jungle trees at dusk',
        rewards: ['fruit_bat', 'mangrove'],
        clues: [
            { emoji: '🐟', title: 'Powder Blue Tang', text: 'Needs salt water and algae.' },
            { emoji: '🦇', title: 'Indian Flying Fox', text: 'Needs fruiting trees to feed and roost in.' },
            { emoji: '🌳', title: 'Mangrove', text: 'Needs muddy ground washed by salty tides.' }
        ],
        predictions: [
            { emoji: '🗺️', label: 'Living things can thrive anywhere on the island' },
            { emoji: '📍', label: 'Each living thing matches a habitat with what it needs' }
        ],
        correctPrediction: 1,
        claim: 'Habitats must provide the specific water, food, and shelter needs of an organism.',
        explainChoices: [
            { text: 'The tang needs the salty lagoon, while the flying fox needs jungle fruit trees.', correct: true },
            { text: 'All ocean fish can live on dry beach sand.', correct: false }
        ],
        transferQ: 'Which home is right for an octopus that needs salt water, rocky hiding holes and crabs to eat?',
        transferChoices: [
            'The coral lagoon',
            'A rain puddle in the jungle'
        ],
        transferCorrect: 0,
        hints: ['Read what each habitat offers, then match it to each living thing’s needs.', 'Tang to the Lagoon, Flying Fox to the Jungle, Mangrove to the Beach Edge.'],
        lab: {
            kind: 'match',
            instruction: 'Move each living thing to the habitat that meets its needs.',
            slots: [
                { id: 'lagoon', label: 'Coral Lagoon', emoji: '🌊', sub: 'Salt water, algae on rocks' },
                { id: 'jungle', label: 'Island Jungle', emoji: '🌴', sub: 'Fruit trees, shade, rainwater' },
                { id: 'edge', label: 'Beach Edge', emoji: '🏖️', sub: 'Salty mud, daily tides' }
            ],
            items: [
                { id: 'tang', label: 'Blue Tang', emoji: '🐟', tone: 'sky', target: 'lagoon' },
                { id: 'bat', label: 'Flying Fox', emoji: '🦇', tone: 'bark', target: 'jungle' },
                { id: 'mangrove', label: 'Mangrove', emoji: '🌳', tone: 'palm', target: 'edge' }
            ],
            evidence: [
                { emoji: '🐟', tone: 'sky', title: 'Tang → Lagoon', text: 'Salt water and algae: both of its needs are met.' },
                { emoji: '🦇', tone: 'bark', title: 'Flying Fox → Jungle', text: 'Fruit to eat and tall trees to hang from all day.' },
                { emoji: '🌳', tone: 'palm', title: 'Mangrove → Beach Edge', text: 'Its roots are built for salty, muddy, tidal ground.' }
            ]
        }
    },

    {
        id: 'habitat-g3-02', grade: 3, num: 32, zone: 'jungle',
        title: 'Coconut to Coconut',
        goal: 'Put the coconut palm’s life stages in order to make a loop that repeats.',
        site: { x: 620, y: 340 }, siteEmoji: '🌴',
        restore: 'New coconut palms are rising over the jungle',
        rewards: ['coconut'],
        clues: [
            { emoji: '🥥', title: 'Coconut (Seed)', text: 'Holds a baby plant and its food. It can float to a new island!' },
            { emoji: '🌱', title: 'Seedling', text: 'Sprouts roots and its first leaves.' },
            { emoji: '🌴', title: 'Flowering Palm', text: 'Grows flowers that insects pollinate.' },
            { emoji: '🥥🥥', title: 'New Coconuts', text: 'Ripen and fall to start the next generation.' }
        ],
        predictions: [
            { emoji: '⛔', label: 'A life cycle ends for good after flowering' },
            { emoji: '🔁', label: 'A plant’s life cycle loops on, generation after generation' }
        ],
        correctPrediction: 1,
        claim: 'Life cycles form a continuous loop that ensures species survival.',
        explainChoices: [
            { text: 'New coconuts close the loop by sprouting into the next generation.', correct: true },
            { text: 'Plants grow backward from fruit to seed.', correct: false }
        ],
        transferQ: 'A coconut palm drops ripe coconuts onto the beach. What starts the next generation?',
        transferChoices: [
            'The coconuts sprout into seedlings in moist sand or soil',
            'The palm turns into a new palm without any seeds'
        ],
        transferCorrect: 0,
        hints: ['Every palm starts small. What is the smallest stage?', 'Coconut → Seedling → Flowering Palm → New Coconuts, and around again.'],
        lab: {
            kind: 'sequence',
            instruction: 'Tap the stages in order to build the life cycle loop.',
            pool: [
                { id: 'palm', label: 'Flowering Palm', emoji: '🌴', tone: 'palm' },
                { id: 'seed', label: 'Coconut', emoji: '🥥', tone: 'bark' },
                { id: 'new', label: 'New Coconuts', emoji: '🥥🥥', tone: 'sun' },
                { id: 'seedling', label: 'Seedling', emoji: '🌱', tone: 'lagoon' }
            ],
            correctOrder: ['seed', 'seedling', 'palm', 'new'],
            evidence: [
                { emoji: '🥥', tone: 'bark', title: 'Generation 1 → 2', text: 'The new coconuts became the next seeds, closing the loop.' },
                { emoji: '🌴', tone: 'palm', title: 'Flowers make coconuts', text: 'After the flowers are pollinated, coconuts grow from them.' },
                { emoji: '🔁', tone: 'sun', title: 'A cycle, not a line', text: 'The palm survives as a species because the stages repeat.' }
            ]
        }
    },

    {
        id: 'habitat-g3-03', grade: 3, num: 33, zone: 'beach',
        title: 'Shoreline Shelter',
        goal: 'Compare a beach with its magoo shrubs to a beach that was cleared, after a storm.',
        site: { x: 800, y: 420 }, siteEmoji: '🌿',
        restore: 'Magoo shrubs are holding the beach sand in place',
        rewards: ['magoo'],
        clues: [
            { emoji: '🌿', title: 'Shrub Beach', text: 'Magoo roots grip the sand; leaves shade crab burrows.' },
            { emoji: '🚜', title: 'Cleared Beach', text: 'Shrubs dug up for a view; bare sand left behind.' }
        ],
        predictions: [
            { emoji: '➖', label: 'Removing the shrubs changes nothing' },
            { emoji: '⚠️', label: 'Removing the shrubs means more sand washes away and less shelter' }
        ],
        correctPrediction: 1,
        claim: 'Coastal vegetation anchors soil structure and provides shelter.',
        explainChoices: [
            { text: 'Roots hold the beach sand, while branches shelter animals.', correct: true },
            { text: 'Clearing plants gives crabs more room to run.', correct: false }
        ],
        transferQ: 'What happens to young reef fish when mangrove trees are cut down?',
        transferChoices: [
            'They lose their root shelter and are easier for predators to catch',
            'They learn to build nests in the dry sand'
        ],
        transferCorrect: 0,
        hints: ['Compare the Crab Shelters bars on both beaches.', 'The shrub beach kept far more sand and shelters.'],
        lab: {
            kind: 'choice',
            instruction: 'After the storm: which beach kept more sand AND more crab shelters?',
            visual: {
                type: 'sites',
                sites: [
                    { label: 'Shrub Beach', emoji: '🌿', tone: 'palm', metrics: [
                        { label: 'Sand kept after the storm', value: 90, max: 100, unit: '%' },
                        { label: 'Crab shelters', value: 24, max: 30, unit: '' },
                        { label: 'Root cover', value: 80, max: 100, unit: '%' }
                    ] },
                    { label: 'Cleared Beach', emoji: '🚜', tone: 'coral', metrics: [
                        { label: 'Sand kept after the storm', value: 35, max: 100, unit: '%' },
                        { label: 'Crab shelters', value: 5, max: 30, unit: '' },
                        { label: 'Root cover', value: 5, max: 100, unit: '%' }
                    ] }
                ]
            },
            options: [
                { id: 'shrub', label: 'Shrub Beach', emoji: '🌿' },
                { id: 'cleared', label: 'Cleared Beach', emoji: '🚜', why: 'Check the bars again: the cleared beach lost most of its sand and shelters.' },
                { id: 'same', label: 'They are about the same', emoji: '🟰', why: 'The bars are very different lengths. Look at Crab Shelters.' }
            ],
            correct: ['shrub'],
            evidence: [
                { emoji: '🌿', tone: 'palm', title: 'Sand kept: 90% vs 35%', text: 'Magoo roots held the sand during the storm.' },
                { emoji: '🦀', tone: 'sand', title: 'Shelters: 24 vs 5', text: 'Clearing removed nearly 4 out of every 5 crab homes.' },
                { emoji: '⚠️', tone: 'coral', title: 'Erosion follows clearing', text: 'Less root cover meant more sand washed away.' }
            ]
        }
    },

    // ───────────────────────── GRADE 4 ─────────────────────────
    {
        id: 'habitat-g4-01', grade: 4, num: 41, zone: 'lagoon',
        title: 'Follow the Energy',
        goal: 'Connect Turf Algae, Tang and Grouper with arrows that point the way energy flows.',
        site: { x: 130, y: 250 }, siteEmoji: '🐟',
        restore: 'Tang and groupers are back on the lagoon reef',
        rewards: ['algae', 'grouper'],
        clues: [
            { emoji: '🌿', title: 'Turf Algae', text: 'Producer. Makes sugar using sunlight.' },
            { emoji: '🐟', title: 'Tang', text: 'Herbivore. Grazes on turf algae.' },
            { emoji: '🐡', title: 'Grouper', text: 'Carnivore. Gulps down smaller fish.' }
        ],
        predictions: [
            { emoji: '⬅️', label: 'Arrows point to what gets eaten (Grouper → Tang)' },
            { emoji: '➡️', label: 'Arrows point the way energy flows (Food → Eater)' }
        ],
        correctPrediction: 1,
        claim: 'Arrows in food chain diagrams represent energy flow into the consumer.',
        explainChoices: [
            { text: 'Energy flows from the algae (food) to the tang, then from the tang to the grouper.', correct: true },
            { text: 'Arrows show which animal is bigger.', correct: false }
        ],
        transferQ: 'In a jungle food chain (Leaf → Caterpillar → Koel), which way should the arrow between Caterpillar and Koel point?',
        transferChoices: [
            'Caterpillar → Koel (energy moves into the koel)',
            'Koel → Caterpillar (the koel eats the caterpillar)'
        ],
        transferCorrect: 0,
        hints: ['Does the grouper eat algae? Not every pair needs an arrow.', 'Arrows point FROM the food TO the eater.'],
        lab: {
            kind: 'links',
            instruction: 'Tap each link to set its energy arrow, or leave it as “no link”.',
            nodes: {
                algae: { label: 'Turf Algae', sub: 'Producer', emoji: '🌿', tone: 'palm', x: 90, y: 170 },
                tang: { label: 'Tang', sub: 'Herbivore', emoji: '🐟', tone: 'sky', x: 300, y: 170 },
                grouper: { label: 'Grouper', sub: 'Carnivore', emoji: '🐡', tone: 'coral', x: 510, y: 170 }
            },
            pairs: [
                { a: 'algae', b: 'tang', expect: 'ab' },
                { a: 'tang', b: 'grouper', expect: 'ab' },
                { a: 'algae', b: 'grouper', expect: 'none' }
            ],
            trial: 'energy',
            evidence: [
                { emoji: '🌿', tone: 'palm', title: 'Algae → Tang', text: 'Energy from sunlight, stored in algae, moves into the tang.' },
                { emoji: '🐡', tone: 'coral', title: 'Tang → Grouper', text: 'The grouper gets its energy by eating the tang.' },
                { emoji: '⚡', tone: 'sun', title: 'Arrows = energy flow', text: 'Each arrow points to whoever receives the energy.' }
            ]
        }
    },

    {
        id: 'habitat-g4-02', grade: 4, num: 42, zone: 'lagoon',
        title: 'Built for the Habitat',
        goal: 'Match gills, tail fins, a dagger beak and flippers to the job each one does.',
        site: { x: 160, y: 380 }, siteEmoji: '🐢',
        restore: 'Green sea turtles are grazing the lagoon seagrass',
        rewards: ['turtle'],
        clues: [
            { emoji: '🌊', title: 'Gills', text: 'Take oxygen from water.' },
            { emoji: '🐟', title: 'Tail Fin', text: 'Pushes a fish forward fast.' },
            { emoji: '🐦', title: 'Dagger Beak', text: 'The heron’s long, sharp beak spears fish in the shallows.' },
            { emoji: '🐢', title: 'Flippers', text: 'The turtle’s wide, flat limbs paddle through water.' }
        ],
        predictions: [
            { emoji: '🧠', label: 'Animals choose to grow fins when they want to swim' },
            { emoji: '🧬', label: 'Inherited body parts suit each animal to its habitat' }
        ],
        correctPrediction: 1,
        claim: 'Anatomical adaptations enable survival in specific habitat conditions.',
        explainChoices: [
            { text: 'A streamlined tail fin cuts through water, so fish can swim fast.', correct: true },
            { text: 'Animals pick their body features when they are born.', correct: false }
        ],
        transferQ: 'Why does a grey heron have long, thin legs?',
        transferChoices: [
            'To wade through shallow water without getting its feathers wet',
            'To fly faster in strong sea winds'
        ],
        transferCorrect: 0,
        hints: ['Each clue card already says what the part does. Find the matching job.', 'Gills → breathing underwater, Tail Fin → fast swimming, Dagger Beak → spearing fish, Flippers → paddling far.'],
        lab: {
            kind: 'match',
            instruction: 'Match each body part to the job it does.',
            slotCols: 2,
            slots: [
                { id: 'breathe', label: 'Breathing underwater', emoji: '💧' },
                { id: 'speed', label: 'Swimming fast', emoji: '⚡' },
                { id: 'spear', label: 'Spearing fish in the shallows', emoji: '🎯' },
                { id: 'paddle', label: 'Paddling long distances', emoji: '🧭' }
            ],
            items: [
                { id: 'gills', label: 'Gills', emoji: '🌊', tone: 'lagoon', target: 'breathe' },
                { id: 'fin', label: 'Tail Fin', emoji: '🐟', tone: 'sky', target: 'speed' },
                { id: 'beak', label: 'Dagger Beak', emoji: '🐦', tone: 'shell', target: 'spear' },
                { id: 'flippers', label: 'Flippers', emoji: '🐢', tone: 'palm', target: 'paddle' }
            ],
            evidence: [
                { emoji: '🐟', tone: 'sky', title: 'Shape fits the job', text: 'A curved tail fin pushes lots of water with each stroke.' },
                { emoji: '🧬', tone: 'lagoon', title: 'Inherited, not chosen', text: 'Each animal was born with these parts, passed down from its parents.' },
                { emoji: '🐢', tone: 'palm', title: 'Flippers = paddles', text: 'Wide, flat flippers carry turtles across whole oceans.' }
            ]
        }
    },

    {
        id: 'habitat-g4-03', grade: 4, num: 43, zone: 'beach',
        title: 'Two Homes Compared',
        goal: 'Compare the data from a tidepool and a busy harbour to decide where young snapper can survive.',
        site: { x: 860, y: 260 }, siteEmoji: '🐠',
        restore: 'A school of young snapper is sheltering in the tidepool',
        rewards: ['snapper'],
        clues: [
            { emoji: '🎯', title: 'Snapper Needs', text: 'Oxygen above 5.0 mg/L and seagrass above 40%.' },
            { emoji: '✅', title: 'Site A Data', text: 'Oxygen: 6.5 mg/L · Seagrass: 60%' },
            { emoji: '⚠️', title: 'Site B Data', text: 'Oxygen: 2.1 mg/L · Seagrass: 10%' }
        ],
        predictions: [
            { emoji: '⚓', label: 'Site B is fine, even with low oxygen' },
            { emoji: '✅', label: 'Site A meets both the oxygen and the shelter needs' }
        ],
        correctPrediction: 1,
        claim: 'Site A meets all required dissolved oxygen and shelter thresholds.',
        explainChoices: [
            { text: 'Site A has oxygen above 5.0 mg/L and more than 40% seagrass.', correct: true },
            { text: 'Snapper can get used to living in dirty, low-oxygen water.', correct: false }
        ],
        transferQ: 'A butterfly needs more than 50% of the ground covered in flowers. Garden 1 has 70%; Garden 2 has 20%. Which one suits it?',
        transferChoices: [
            'Garden 1 (it clears the 50% need)',
            'Garden 2 (it has fewer flowers)'
        ],
        transferCorrect: 0,
        hints: ['The white line on each gauge is the snapper’s minimum need. A site must clear BOTH lines.', 'Site B oxygen is only 2.1 mg/L, which is far too low. Choose Site A.'],
        lab: {
            kind: 'choice',
            instruction: 'Where can young snapper survive? The white line marks the minimum they need.',
            visual: {
                type: 'sites',
                sites: [
                    { label: 'Site A · Tidepool', emoji: '✅', tone: 'palm', metrics: [
                        { label: 'Dissolved oxygen', value: 6.5, max: 10, unit: ' mg/L', threshold: 5 },
                        { label: 'Seagrass cover', value: 60, max: 100, unit: '%', threshold: 40 }
                    ] },
                    { label: 'Site B · Busy Harbour', emoji: '⚓', tone: 'coral', metrics: [
                        { label: 'Dissolved oxygen', value: 2.1, max: 10, unit: ' mg/L', threshold: 5 },
                        { label: 'Seagrass cover', value: 10, max: 100, unit: '%', threshold: 40 }
                    ] }
                ]
            },
            options: [
                { id: 'a', label: 'Site A only', emoji: '✅' },
                { id: 'b', label: 'Site B only', emoji: '⚓', why: 'Site B’s oxygen (2.1) is well below the 5.0 line.' },
                { id: 'both', label: 'Both sites', emoji: '👯', why: 'A site has to clear EVERY line, and Site B clears none.' }
            ],
            correct: ['a'],
            evidence: [
                { emoji: '💧', tone: 'lagoon', title: 'Oxygen: 6.5 vs 2.1', text: 'Only Site A is above the 5.0 mg/L snapper minimum.' },
                { emoji: '🌿', tone: 'palm', title: 'Seagrass: 60% vs 10%', text: 'Only Site A gives young snapper enough cover to hide.' },
                { emoji: '🎯', tone: 'sky', title: 'Every need checked', text: 'A habitat must meet every need, not just one.' }
            ]
        }
    },

    // ───────────────────────── GRADE 5 ─────────────────────────
    {
        id: 'habitat-g5-01', grade: 5, num: 51, zone: 'jungle',
        title: 'Producer Power',
        goal: 'Balance light, water and CO₂ so a breadfruit leaf makes glucose, then watch a full day go by.',
        site: { x: 540, y: 350 }, siteEmoji: '🍃',
        restore: 'The jungle canopy is thick and green again',
        rewards: ['screwpine', 'koel'],
        clues: [
            { emoji: '☀️', title: 'Photosynthesis', text: 'Light + CO₂ + Water → Glucose (food) + Oxygen' },
            { emoji: '🚫', title: 'Soil Myth', text: 'Soil gives minerals and grip. It is NOT the plant’s food.' }
        ],
        predictions: [
            { emoji: '🟫', label: 'Plants eat soil as their main food' },
            { emoji: '☀️', label: 'Plants make their own food (glucose) from light, CO₂ and water' }
        ],
        correctPrediction: 1,
        claim: 'Plants synthesize organic food energy using sunlight and water.',
        explainChoices: [
            { text: 'Light energy turns carbon dioxide and water into glucose.', correct: true },
            { text: 'Soil minerals can replace light energy in the dark.', correct: false }
        ],
        transferQ: 'A plant is kept in a dark box with moist, rich soil. Will it survive for long?',
        transferChoices: [
            'No. Without light it cannot make its food',
            'Yes. The soil gives it all the food it needs'
        ],
        transferCorrect: 0,
        hints: ['The formula needs three inputs. Is one of them stuck near zero?', 'Move Sunlight, Water and CO₂ into their green zones.'],
        lab: {
            kind: 'dials',
            visual: 'leaf',
            instruction: 'Slide all three inputs into their green zones, then run a day.',
            dials: [
                { key: 'light', label: 'Sunlight', emoji: '☀️', start: 10, min: 60, max: 90, low: 'Not enough light energy', high: 'Light so strong the leaf is stressed' },
                { key: 'water', label: 'Water', emoji: '💧', start: 20, min: 45, max: 75, low: 'The leaf is closing up to save water', high: 'Waterlogged roots' },
                { key: 'co2', label: 'Carbon Dioxide', emoji: '💨', start: 55, min: 40, max: 100, low: 'Not enough CO₂ to build sugar', high: '' }
            ],
            trial: 'day',
            evidence: [
                { emoji: '🍬', tone: 'sun', title: 'Glucose made', text: 'Light, CO₂ and water combined into sugar inside the leaf.' },
                { emoji: '🫧', tone: 'sky', title: 'Oxygen released', text: 'Oxygen bubbled out as a by-product.' },
                { emoji: '🌙', tone: 'shell', title: 'Stopped at sunset', text: 'With no light, production stopped, even though there was soil and water.' }
            ]
        }
    },

    {
        id: 'habitat-g5-02', grade: 5, num: 52, zone: 'lagoon',
        title: 'A Web of Choices',
        goal: 'Build the reef food web, then see what happens when one fish disappears.',
        site: { x: 260, y: 470 }, siteEmoji: '🦈',
        restore: 'Blacktip reef sharks are patrolling the lagoon',
        rewards: ['parrotfish', 'butterflyfish', 'reef_shark'],
        clues: [
            { emoji: '🐠', title: 'Parrotfish', text: 'Eats algae AND coral.' },
            { emoji: '🐠', title: 'Butterflyfish', text: 'Eats coral polyps.' },
            { emoji: '🦈', title: 'Blacktip Reef Shark', text: 'Hunts parrotfish AND butterflyfish.' }
        ],
        predictions: [
            { emoji: '📏', label: 'Reefs are made of separate, single-line food chains' },
            { emoji: '🕸️', label: 'Feeding paths on a reef connect into a web' }
        ],
        correctPrediction: 1,
        claim: 'Food webs contain multiple interconnected feeding paths.',
        explainChoices: [
            { text: 'If one prey species drops, predators can switch to another link in the web.', correct: true },
            { text: 'Removing one species wipes out every animal at once.', correct: false }
        ],
        transferQ: 'A heron eats both crabs and small fish. What happens when crab numbers fall?',
        transferChoices: [
            'The heron eats more small fish instead',
            'The heron starves straight away'
        ],
        transferCorrect: 0,
        hints: ['Use the clue cards: each “eats” is one arrow, pointing toward the eater.', 'Algae → Parrotfish, Coral → Parrotfish and Butterflyfish, and BOTH fish → Shark.'],
        lab: {
            kind: 'links',
            instruction: 'Set every arrow in the web. Some pairs have no feeding link.',
            nodes: {
                algae: { label: 'Algae', sub: 'Producer', emoji: '🌿', tone: 'palm', x: 90, y: 80 },
                coral: { label: 'Coral', sub: 'Polyps', emoji: '🪸', tone: 'coral', x: 90, y: 270 },
                parrot: { label: 'Parrotfish', sub: 'Algae & coral', emoji: '🐠', tone: 'lagoon', x: 300, y: 80 },
                butterfly: { label: 'Butterflyfish', sub: 'Coral', emoji: '🐠', tone: 'sun', x: 300, y: 270 },
                shark: { label: 'Reef Shark', sub: 'Top predator', emoji: '🦈', tone: 'shell', x: 510, y: 175 }
            },
            pairs: [
                { a: 'algae', b: 'parrot', expect: 'ab' },
                { a: 'coral', b: 'parrot', expect: 'ab' },
                { a: 'coral', b: 'butterfly', expect: 'ab' },
                { a: 'algae', b: 'butterfly', expect: 'none' },
                { a: 'parrot', b: 'shark', expect: 'ab' },
                { a: 'butterfly', b: 'shark', expect: 'ab' },
                { a: 'algae', b: 'shark', expect: 'none' }
            ],
            trial: 'energy',
            event: {
                remove: 'parrot',
                label: '🎣 Overfishing removes the parrotfish',
                message: 'The shark still gets energy through the butterflyfish!',
                note: 'With the parrotfish gone, energy still reached the shark along the coral → butterflyfish path.'
            },
            evidence: [
                { emoji: '🕸️', tone: 'lagoon', title: '5 feeding links', text: 'More than one path carries energy to the shark.' },
                { emoji: '🦈', tone: 'shell', title: 'Shark has 2 prey', text: 'When the parrotfish vanished, the butterflyfish path kept the shark fed.' },
                { emoji: '🪸', tone: 'coral', title: 'Coral feeds 2 fish', text: 'Losing the coral would hit both reef fish at once.' }
            ]
        }
    },

    {
        id: 'habitat-g5-03', grade: 5, num: 53, zone: 'beach',
        title: 'Track the Evidence',
        goal: 'Read four weeks of counts from before and after a resort boardwalk was built across the beach.',
        site: { x: 700, y: 150 }, siteEmoji: '🐚',
        restore: 'Hermit crabs are crossing the quiet beach again',
        rewards: ['hermit'],
        clues: [
            { emoji: '🦀', title: 'Crab Burrows', text: 'Before: 45, 42 · After: 18, 15' },
            { emoji: '🐦', title: 'Heron Visits', text: 'Before: 12, 14 · After: 4, 3' }
        ],
        predictions: [
            { emoji: '1️⃣', label: 'One count proves the cause for certain' },
            { emoji: '📉', label: 'The counts show a clear pattern of decline' }
        ],
        correctPrediction: 1,
        claim: 'Observation count tables highlight population trend patterns.',
        explainChoices: [
            { text: 'Both counts dropped sharply in every week after the boardwalk was built.', correct: true },
            { text: 'A single count proves the boardwalk killed all the crabs.', correct: false }
        ],
        transferQ: 'Bird visits fell from 30 to 5 after trees were cut down. What does this data show?',
        transferChoices: [
            'Cutting the trees is linked to fewer birds using the area',
            'Birds have disappeared from the whole world'
        ],
        transferCorrect: 0,
        hints: ['Compare the bars to the left of the dashed line with the bars to the right.', 'Both species dropped after week 2 and stayed low.'],
        lab: {
            kind: 'choice',
            instruction: 'Which conclusion do these counts support?',
            visual: {
                type: 'bars',
                labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
                dividerAfter: 1,
                dividerLabel: 'Boardwalk built',
                series: [
                    { label: 'Crab burrows', tone: 'sand', values: [45, 42, 18, 15] },
                    { label: 'Heron visits', tone: 'sky', values: [12, 14, 4, 3] }
                ]
            },
            options: [
                { id: 'trend', label: 'Both counts fell after the boardwalk and stayed low', emoji: '📉' },
                { id: 'proof', label: 'Week 3 alone proves the boardwalk killed every crab', emoji: '1️⃣', why: 'One count shows a change, not proof of the cause. And the crabs did not all vanish.' },
                { id: 'flat', label: 'The counts stayed about the same', emoji: '🟰', why: 'Crab burrows went from 42 to 18. That is less than half.' }
            ],
            correct: ['trend'],
            evidence: [
                { emoji: '🦀', tone: 'sand', title: 'Crabs: average 43.5 → 16.5', text: 'About a 62% drop after the boardwalk went in.' },
                { emoji: '🐦', tone: 'sky', title: 'Herons: average 13 → 3.5', text: 'Herons follow the crabs and fish they hunt.' },
                { emoji: '📉', tone: 'coral', title: 'A pattern, not proof', text: 'Repeated counts show a trend that is linked to the boardwalk.' }
            ]
        }
    },

    // ───────────────────────── GRADE 6 ─────────────────────────
    {
        id: 'habitat-g6-01', grade: 6, num: 61, zone: 'lagoon',
        title: 'When Producers Decline',
        goal: 'Simulate a marine heatwave hitting the producers, then watch five years unfold up the food web.',
        site: { x: 250, y: 150 }, siteEmoji: '🐡',
        restore: 'Reef fish are rebuilding their numbers on the outer reef',
        rewards: ['coral'],
        clues: [
            { emoji: '🌡️', title: 'Marine Heatwave', text: 'Hot water in 2016 bleached many Maldives corals. Here, producer cover drops by 60%.' },
            { emoji: '📉', title: 'Trophic Cascade', text: 'Fewer herbivores leaves predators short of energy.' }
        ],
        predictions: [
            { emoji: '➖', label: 'Sharks are fine, because sharks do not eat algae' },
            { emoji: '⚡', label: 'A drop in producers spreads up the web and starves predators of energy' }
        ],
        correctPrediction: 1,
        claim: 'Energy originates with producers; primary decline impacts all higher trophic levels.',
        explainChoices: [
            { text: 'Fewer producers feed fewer herbivores, which leaves less energy for predators.', correct: true },
            { text: 'Sharks switch to eating sunlight directly.', correct: false }
        ],
        transferQ: 'If the seagrass disappears from a bay, how are barracuda affected in the long run?',
        transferChoices: [
            'Barracuda numbers fall because their prey lose their food',
            'Barracuda multiply because the water gets clearer'
        ],
        transferCorrect: 0,
        hints: ['The heatwave card says producers drop by 60%. Recreate that.', 'Slide producer cover down to 40% or lower, then run the five years.'],
        lab: {
            kind: 'cascade',
            instruction: 'Set how much producer cover is left after the heatwave, then run five years.',
            start: 100,
            target: 40,
            trial: 'years',
            evidence: [
                { emoji: '🌿', tone: 'palm', title: 'Producers fell first', text: 'The heatwave cut producer cover in year 1.' },
                { emoji: '🐟', tone: 'sky', title: 'Herbivores followed', text: 'Grazing fish ran short of food and declined over two years.' },
                { emoji: '🦈', tone: 'shell', title: 'Predators hit last', text: 'Sharks never eat algae, yet they lost the same share of energy.' }
            ]
        }
    },

    {
        id: 'habitat-g6-02', grade: 6, num: 62, zone: 'lagoon',
        title: 'Reef Repair Choices',
        goal: 'Weigh up a Coral Nursery, a Plastic Reef and a Marine Protected Area using the evidence table.',
        site: { x: 480, y: 522 }, siteEmoji: '🪸',
        restore: 'Coral nursery frames are growing new coral on the reef',
        rewards: ['octopus'],
        clues: [
            { emoji: '🪸', title: 'A: Coral Nursery', text: 'Coral pieces grown on frames. Strong recovery; needs ongoing care.' },
            { emoji: '🧴', title: 'B: Plastic Reef', text: 'Quick shelter, but it sheds microplastics!' },
            { emoji: '🛡️', title: 'C: Protected Area', text: 'Lets the natural food web recover; needs fishing rules.' }
        ],
        predictions: [
            { emoji: '🧴', label: 'The plastic reef is best because it goes in fast' },
            { emoji: '⚖️', label: 'The protected area and nursery together give lasting recovery, with clear trade-offs' }
        ],
        correctPrediction: 1,
        claim: 'Effective environmental design solutions evaluate scientific efficacy against realistic trade-offs.',
        explainChoices: [
            { text: 'Protected areas restore natural food webs, though they need fishing agreements.', correct: true },
            { text: 'Plastic structures can fully replace living coral.', correct: false }
        ],
        transferQ: 'Why is planting native magoo shrubs along a beach better than building a concrete wall?',
        transferChoices: [
            'Shrubs stop erosion AND give animals a living habitat',
            'Concrete walls make oxygen for fish'
        ],
        transferCorrect: 0,
        hints: ['Look at the Side Effects column. Reject anything that harms the reef.', 'Fund BOTH A and C. The plastic reef sheds microplastics.'],
        lab: {
            kind: 'choice',
            multi: true,
            instruction: 'Fund the proposal(s) that will restore the reef for the long term. You can pick more than one.',
            visual: {
                type: 'matrix',
                columns: ['Recovery', 'Speed', 'Side effects', 'Effort'],
                rows: [
                    { label: 'A · Coral Nursery', emoji: '🪸', cells: [['High', 'palm'], ['Slow', 'sun'], ['None', 'palm'], ['Ongoing care', 'sun']] },
                    { label: 'B · Plastic Reef', emoji: '🧴', cells: [['Low', 'coral'], ['Fast', 'palm'], ['Microplastics', 'coral'], ['Low', 'palm']] },
                    { label: 'C · Protected Area', emoji: '🛡️', cells: [['High', 'palm'], ['Medium', 'sun'], ['None', 'palm'], ['Fishing rules', 'sun']] }
                ]
            },
            options: [
                { id: 'A', label: 'A · Coral Nursery', emoji: '🪸' },
                { id: 'B', label: 'B · Plastic Reef', emoji: '🧴', why: 'Plastic reefs shed microplastics into the food web they are meant to protect.' },
                { id: 'C', label: 'C · Protected Area', emoji: '🛡️' }
            ],
            correct: ['A', 'C'],
            evidence: [
                { emoji: '🪸', tone: 'coral', title: 'Nursery regrows coral', text: 'Strong recovery, but divers must tend the frames every week.' },
                { emoji: '🛡️', tone: 'lagoon', title: 'Protected area restores the web', text: 'Grazing fish return, but only if fishers agree to the rules.' },
                { emoji: '⚖️', tone: 'sun', title: 'Trade-offs accepted', text: 'Slower and more effort, but no harm to the reef.' }
            ]
        }
    },

    {
        id: 'habitat-g6-03', grade: 6, num: 63, zone: 'lagoon',
        title: 'An Uncertain Future',
        goal: 'Compare a fixed-line forecast with a range forecast against what really happened to coral cover.',
        site: { x: 380, y: 90 }, siteEmoji: '🐬',
        restore: 'Spinner dolphins are resting in the calm lagoon',
        rewards: ['dolphin'],
        clues: [
            { emoji: '📏', title: 'Model-1 (Fixed Line)', text: 'Assumes exactly a 15% drop every year. Ignores changing sea temperatures.' },
            { emoji: '📈', title: 'Model-2 (Range Band)', text: 'Shows a 10%–25% yearly drop, depending on sea temperature.' }
        ],
        predictions: [
            { emoji: '💯', label: 'Computer models predict the future exactly' },
            { emoji: '📊', label: 'Models are simplified, so a range is more honest' }
        ],
        correctPrediction: 1,
        claim: 'Scientific models have inherent assumptions and limitations when representing complex ecosystems.',
        explainChoices: [
            { text: 'Simple models cannot include every changing condition, so they give a range.', correct: true },
            { text: 'Single-line forecasts are always perfectly accurate.', correct: false }
        ],
        transferQ: 'A model forecasts exactly 500 ghost crabs next year. Why is claiming that exact number a problem?',
        transferChoices: [
            'Real ecosystems have surprise storms, disease and migration',
            'Computers cannot do maths'
        ],
        transferCorrect: 0,
        hints: ['Count how many of the yellow dots each model actually captures.', 'Choose the model with the range band.'],
        lab: {
            kind: 'choice',
            instruction: 'Yellow dots are what really happened in years 0–3. Which model is better justified?',
            visual: { type: 'models' },
            options: [
                { id: 'm1', label: 'Model-1 · Fixed 15% line', emoji: '📏', why: 'Only two of the four dots sit on the line. A single exact line hides the uncertainty.' },
                { id: 'm2', label: 'Model-2 · 10–25% range band', emoji: '📈' }
            ],
            correct: ['m2'],
            evidence: [
                { emoji: '📈', tone: 'lagoon', title: '4 of 4 dots in the band', text: 'The range captured every year that was observed.' },
                { emoji: '📏', tone: 'shell', title: '2 of 4 dots on the line', text: 'Changing sea temperatures pushed real values off the fixed forecast.' },
                { emoji: '⚠️', tone: 'sun', title: 'Every model simplifies', text: 'Good models are honest about what they cannot know.' }
            ]
        }
    }
];
