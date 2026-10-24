/**
 * GRADE 4 · missions 37–44 (missions 34–36 live in missions.js)
 * Topics: animal senses, plant structures, erosion, landscape change (atolls),
 * energy resources, wave energy, natural hazards, how we see.
 */
IHR.addMissions(4, [
    {
        zone: 'lagoon',
        title: 'Super Senses',
        goal: 'Match each animal’s special sense to the job it does.',
        siteEmoji: '📡',
        restore: 'A whale shark is cruising past the outer reef',
        rewards: ['whale_shark'],
        clues: [
            { emoji: '🦀', title: 'Ghost Crab', text: 'Eyes on tall stalks.' },
            { emoji: '🐢', title: 'Sea Turtle', text: 'Can sense Earth’s magnetic field.' },
            { emoji: '🦈', title: 'Reef Shark', text: 'Tiny jelly-filled pores on its snout.' },
            { emoji: '🦇', title: 'Flying Fox', text: 'A keen nose for ripe fruit.' }
        ],
        predictions: [
            { emoji: '🙈', label: 'All animals sense the world the same way people do' },
            { emoji: '📡', label: 'Different animals have special senses suited to their lives' }
        ],
        correctPrediction: 1,
        claim: 'Animals have senses that collect information, and their brains use it to act.',
        explainChoices: [
            { text: 'A shark’s pores pick up electric signals from fish hiding in the sand.', correct: true },
            { text: 'Turtles find beaches by reading signs.', correct: false }
        ],
        transferQ: 'A ghost crab darts into its burrow before you get close. Which sense most likely warned it?',
        transferChoices: ['Its eyes on stalks saw you moving', 'It smelled the moon'],
        transferCorrect: 0,
        hints: ['Each clue card names a body part. What could it detect?', 'Stalk eyes → see all around, magnetic sense → navigate, pores → electricity, nose → fruit.'],
        lab: {
            kind: 'match',
            instruction: 'Match each sense to what it helps the animal do.',
            slotCols: 2,
            slots: [
                { id: 'around', label: 'Seeing all around at once', emoji: '👀' },
                { id: 'navigate', label: 'Finding the way across the ocean', emoji: '🧭' },
                { id: 'electric', label: 'Detecting prey hidden in sand', emoji: '⚡' },
                { id: 'smell', label: 'Finding ripe fruit at night', emoji: '👃' }
            ],
            items: [
                { id: 'stalk', label: 'Crab’s stalk eyes', emoji: '🦀', tone: 'sand', target: 'around' },
                { id: 'magnet', label: 'Turtle’s magnetic sense', emoji: '🐢', tone: 'palm', target: 'navigate' },
                { id: 'pores', label: 'Shark’s snout pores', emoji: '🦈', tone: 'shell', target: 'electric' },
                { id: 'nose', label: 'Flying fox’s nose', emoji: '🦇', tone: 'bark', target: 'smell' }
            ],
            evidence: [
                { emoji: '⚡', tone: 'shell', title: 'Electric sense', text: 'Sharks feel the tiny electric signals every living fish gives off.' },
                { emoji: '🧭', tone: 'palm', title: 'Built-in compass', text: 'Turtles use Earth’s magnetism to find their way back to nesting areas.' },
                { emoji: '🧠', tone: 'orchid', title: 'Sense → brain → act', text: 'The brain turns signals into actions, like hiding or hunting.' }
            ]
        }
    },

    {
        zone: 'jungle',
        title: 'Plant Armour',
        goal: 'Match each plant structure to the way it helps the plant survive.',
        siteEmoji: '🍍',
        restore: 'Screwpines are standing tall on their stilt roots',
        rewards: [],
        clues: [
            { emoji: '🍍', title: 'Screwpine', text: 'Spiny leaf edges and stilt roots.' },
            { emoji: '🥥', title: 'Coconut', text: 'A thick husk around a hard shell.' },
            { emoji: '🌳', title: 'Mangrove', text: 'Roots that keep out most of the salt.' }
        ],
        predictions: [
            { emoji: '🎨', label: 'Plant parts are just shapes with no purpose' },
            { emoji: '🛡️', label: 'Spines, shells and special roots help plants survive' }
        ],
        correctPrediction: 1,
        claim: 'Plants have internal and external structures that help them survive, grow and reproduce.',
        explainChoices: [
            { text: 'Spiny leaf edges make animals think twice before taking a bite.', correct: true },
            { text: 'A coconut shell helps the tree fly.', correct: false }
        ],
        transferQ: 'A beach plant has thick, waxy leaves. What might they help it do?',
        transferChoices: ['Save water in hot sun and salty wind', 'Catch fish'],
        transferCorrect: 0,
        hints: ['Think about the danger each part protects against.', 'Spines → stop grazers, hard shell → protect seed, salt-filter roots → salty water, stilt roots → hold up in sand.'],
        lab: {
            kind: 'match',
            instruction: 'Match each structure to its job.',
            slotCols: 2,
            slots: [
                { id: 'graze', label: 'Stops animals eating the leaves', emoji: '🚫' },
                { id: 'seed', label: 'Protects the seed', emoji: '🔒' },
                { id: 'salt', label: 'Copes with salty water', emoji: '🧂' },
                { id: 'stand', label: 'Holds the plant up in soft sand', emoji: '🏗️' }
            ],
            items: [
                { id: 'spines', label: 'Spiny leaf edges', emoji: '🍍', tone: 'sun', target: 'graze' },
                { id: 'shell', label: 'Hard coconut shell', emoji: '🥥', tone: 'bark', target: 'seed' },
                { id: 'filter', label: 'Salt-filtering roots', emoji: '🌳', tone: 'palm', target: 'salt' },
                { id: 'stilts', label: 'Stilt roots', emoji: '🦵', tone: 'sand', target: 'stand' }
            ],
            evidence: [
                { emoji: '🍍', tone: 'sun', title: 'Defence', text: 'Spines protect leaves from hungry animals.' },
                { emoji: '🥥', tone: 'bark', title: 'Seed safe', text: 'The coconut shell guards the baby plant inside.' },
                { emoji: '🌳', tone: 'palm', title: 'Made for the shore', text: 'Mangrove roots let it live where most plants can’t.' }
            ]
        }
    },

    {
        zone: 'beach',
        title: 'Waves Wear the Coast',
        goal: 'Compare a beach behind a healthy reef with one behind a broken reef.',
        siteEmoji: '🌊',
        restore: 'The beach is wide and stable again',
        rewards: [],
        clues: [
            { emoji: '🌊', title: 'Waves', text: 'Carry energy across the ocean.' },
            { emoji: '🪸', title: 'Reef', text: 'Waves break here first.' },
            { emoji: '🏖️', title: 'Erosion', text: 'Sand is carried away.' }
        ],
        predictions: [
            { emoji: '🟰', label: 'Reefs don’t change how much sand waves remove' },
            { emoji: '🪸', label: 'A healthy reef slows the waves and protects the beach' }
        ],
        correctPrediction: 1,
        claim: 'Waves wear away and move rock and sand; a healthy reef slows that erosion.',
        explainChoices: [
            { text: 'The reef took energy out of the waves, so less sand was washed away.', correct: true },
            { text: 'Waves add sand to every beach.', correct: false }
        ],
        transferQ: 'Why do some islands have rock breakwaters out in the water?',
        transferChoices: ['To break up waves before they reach the shore', 'To make waves bigger for surfing'],
        transferCorrect: 0,
        hints: ['Compare both bars on each card.', 'Behind the healthy reef the waves were smaller and the beach lost less.'],
        lab: {
            kind: 'choice',
            instruction: 'Which beach lost less sand this year?',
            visual: {
                type: 'sites',
                sites: [
                    { label: 'Behind a Healthy Reef', emoji: '🪸', tone: 'palm', metrics: [
                        { label: 'Wave height at the beach', value: 0.4, max: 2, unit: ' m' },
                        { label: 'Beach width lost', value: 0.5, max: 4, unit: ' m' }
                    ] },
                    { label: 'Behind a Broken Reef', emoji: '💥', tone: 'coral', metrics: [
                        { label: 'Wave height at the beach', value: 1.5, max: 2, unit: ' m' },
                        { label: 'Beach width lost', value: 3, max: 4, unit: ' m' }
                    ] }
                ]
            },
            options: [
                { id: 'healthy', label: 'The beach behind the healthy reef', emoji: '🪸' },
                { id: 'broken', label: 'The beach behind the broken reef', emoji: '💥', why: 'It lost 3 m of beach, six times more.' },
                { id: 'same', label: 'They lost the same', emoji: '🟰', why: '0.5 m vs 3 m is a big difference.' }
            ],
            correct: ['healthy'],
            evidence: [
                { emoji: '🌊', tone: 'sky', title: 'Smaller waves', text: '0.4 m behind the healthy reef vs 1.5 m behind the broken one.' },
                { emoji: '🏖️', tone: 'sand', title: 'Less erosion', text: 'The protected beach lost 0.5 m, not 3 m.' },
                { emoji: '🪸', tone: 'palm', title: 'Living breakwater', text: 'A reef that keeps growing protects the island for free.' }
            ]
        }
    },

    {
        zone: 'lagoon',
        title: 'How an Atoll Forms',
        goal: 'Put the steps in order to show how a ring-shaped atoll forms over millions of years.',
        siteEmoji: '🌋',
        restore: 'Seagrass meadows are spreading across the lagoon floor',
        rewards: ['seagrass'],
        clues: [
            { emoji: '🌋', title: 'Volcano', text: 'Ocean islands often start as volcanoes.' },
            { emoji: '🪸', title: 'Reef', text: 'Coral grows upward, toward the sunlight.' },
            { emoji: '⭕', title: 'Atoll', text: 'A ring of reef around a lagoon, like the Maldives.' }
        ],
        predictions: [
            { emoji: '⚡', label: 'Atolls formed in a single day' },
            { emoji: '⏳', label: 'Atolls formed slowly as an old volcano sank and its reef kept growing' }
        ],
        correctPrediction: 1,
        claim: 'Rock and reef patterns show how landscapes change over very long times.',
        explainChoices: [
            { text: 'The reef kept growing up toward the light while the volcano slowly sank.', correct: true },
            { text: 'The volcano exploded into sand.', correct: false }
        ],
        transferQ: 'Scientists drill deep under an atoll and hit volcanic rock far below the coral. What does that support?',
        transferChoices: ['The atoll grew on top of an old, sunken volcano', 'Coral grows out of volcanoes'],
        transferCorrect: 0,
        hints: ['Start with the volcano still above the water.', 'Volcano with reef → Volcano sinks → Ring of reef → Sand islands.'],
        lab: {
            kind: 'sequence',
            loop: false,
            instruction: 'Tap the stages in order, oldest first.',
            pool: [
                { id: 'ring', label: 'Ring of reef left', emoji: '⭕', tone: 'lagoon' },
                { id: 'volcano', label: 'Volcano with a reef', emoji: '🌋', tone: 'coral' },
                { id: 'islands', label: 'Sand islands form', emoji: '🏝️', tone: 'sand' },
                { id: 'sinks', label: 'Volcano sinks slowly', emoji: '⬇️', tone: 'shell' }
            ],
            correctOrder: ['volcano', 'sinks', 'ring', 'islands'],
            evidence: [
                { emoji: '🌋', tone: 'coral', title: 'Fire first', text: 'A volcano with a fringing reef around it.' },
                { emoji: '🪸', tone: 'lagoon', title: 'Reef keeps pace', text: 'As the volcano sank, the coral kept building upward.' },
                { emoji: '🏝️', tone: 'sand', title: 'Islands last', text: 'Sand piled up on the reef ring to make islands.' }
            ]
        }
    },

    {
        zone: 'jungle',
        title: 'Power the Island',
        goal: 'Sort the island’s energy sources into renewable and non-renewable.',
        siteEmoji: '🔆',
        restore: 'Solar panels are humming on the island school roof',
        rewards: [],
        clues: [
            { emoji: '🛢️', title: 'Diesel', text: 'Shipped in by boat and burned in generators.' },
            { emoji: '☀️', title: 'Sunshine', text: 'Strong all year near the equator.' },
            { emoji: '🌬️', title: 'Wind', text: 'Monsoon winds blow for months.' }
        ],
        predictions: [
            { emoji: '🛢️', label: 'Diesel will last forever' },
            { emoji: '☀️', label: 'Sun, wind and waves are renewable; diesel will run out' }
        ],
        correctPrediction: 1,
        claim: 'Energy comes from renewable and non-renewable sources, and using them affects the environment.',
        explainChoices: [
            { text: 'The sun shines every day, but oil takes millions of years to form.', correct: true },
            { text: 'Wind gets used up once a windmill turns.', correct: false }
        ],
        transferQ: 'Many islands burn diesel to make electricity. Which change cuts pollution AND never runs out?',
        transferChoices: ['Add solar panels', 'Buy a bigger diesel generator'],
        transferCorrect: 0,
        hints: ['Will nature make more of it soon?', 'Sun, wind and waves are renewable; diesel, petrol and cooking gas are not.'],
        lab: {
            kind: 'match',
            instruction: 'Sort each energy source.',
            slots: [
                { id: 'renew', label: 'Renewable', emoji: '♻️', sub: 'Nature keeps making more' },
                { id: 'non', label: 'Non-Renewable', emoji: '⛽', sub: 'Will run out one day' }
            ],
            items: [
                { id: 'sun', label: 'Sunlight', emoji: '☀️', tone: 'sun', target: 'renew' },
                { id: 'wind', label: 'Wind', emoji: '🌬️', tone: 'sky', target: 'renew' },
                { id: 'waves', label: 'Waves', emoji: '🌊', tone: 'lagoon', target: 'renew' },
                { id: 'diesel', label: 'Diesel', emoji: '🛢️', tone: 'shell', target: 'non' },
                { id: 'petrol', label: 'Boat petrol', emoji: '⛽', tone: 'coral', target: 'non' },
                { id: 'gas', label: 'Cooking gas', emoji: '🔥', tone: 'bark', target: 'non' }
            ],
            evidence: [
                { emoji: '♻️', tone: 'palm', title: 'Renewable: 3', text: 'Sun, wind and waves keep coming back.' },
                { emoji: '🛢️', tone: 'shell', title: 'Non-renewable: 3', text: 'Fuels from oil and gas took millions of years to form.' },
                { emoji: '🌍', tone: 'lagoon', title: 'Cleaner choice', text: 'Solar power makes electricity without smoke.' }
            ]
        }
    },

    {
        zone: 'beach',
        title: 'Big Waves, Small Waves',
        goal: 'Compare a calm-day wave with a storm wave to see which carries more energy.',
        siteEmoji: '🏄',
        restore: 'Gentle waves are lapping at the beach',
        rewards: [],
        clues: [
            { emoji: '📏', title: 'Amplitude', text: 'How tall a wave is, from its middle to its top.' },
            { emoji: '🌀', title: 'Storm', text: 'Strong winds build taller waves.' }
        ],
        predictions: [
            { emoji: '🟰', label: 'All waves carry the same energy' },
            { emoji: '📈', label: 'Taller waves carry much more energy' }
        ],
        correctPrediction: 1,
        claim: 'Waves with a bigger height (amplitude) carry more energy.',
        explainChoices: [
            { text: 'A wave five times taller carried about twenty-five times more energy.', correct: true },
            { text: 'Small waves carry more energy because there are more of them.', correct: false }
        ],
        transferQ: 'A storm is coming with waves twice as tall as usual. What should island harbours expect?',
        transferChoices: ['Much stronger waves that can damage boats', 'Weaker waves than usual'],
        transferCorrect: 0,
        hints: ['Compare the energy bars.', 'Wave B is 5× taller and carries 25× the energy.'],
        lab: {
            kind: 'choice',
            instruction: 'Which wave carries more energy to the beach?',
            visual: {
                type: 'sites',
                sites: [
                    { label: 'Wave A · Calm day', emoji: '🌊', tone: 'sky', metrics: [
                        { label: 'Wave height', value: 0.5, max: 3, unit: ' m' },
                        { label: 'Energy compared with Wave A', value: 1, max: 25, unit: '×' }
                    ] },
                    { label: 'Wave B · Storm', emoji: '🌀', tone: 'coral', metrics: [
                        { label: 'Wave height', value: 2.5, max: 3, unit: ' m' },
                        { label: 'Energy compared with Wave A', value: 25, max: 25, unit: '×' }
                    ] }
                ]
            },
            options: [
                { id: 'b', label: 'Wave B, the storm wave', emoji: '🌀' },
                { id: 'a', label: 'Wave A, because it is calmer', emoji: '🌊', why: 'Calm means LESS energy. Look at the energy bars.' },
                { id: 'same', label: 'They carry the same energy', emoji: '🟰', why: 'Wave B’s energy bar is 25 times longer.' }
            ],
            correct: ['b'],
            evidence: [
                { emoji: '📏', tone: 'sky', title: '5× taller', text: 'The storm wave was 2.5 m vs 0.5 m.' },
                { emoji: '⚡', tone: 'coral', title: '25× the energy', text: 'Energy grows much faster than height.' },
                { emoji: '🏖️', tone: 'sand', title: 'Storm damage', text: 'That is why storms move so much sand.' }
            ]
        }
    },

    {
        zone: 'beach',
        title: 'Tsunami Ready',
        goal: 'Choose every idea that would keep people safe if a tsunami came.',
        siteEmoji: '📢',
        restore: 'Evacuation route signs are up across the island',
        rewards: [],
        clues: [
            { emoji: '🌊', title: '2004', text: 'A tsunami from an earthquake near Sumatra reached the Maldives.' },
            { emoji: '🏢', title: 'Safe Buildings', text: 'Strong, raised places to shelter.' },
            { emoji: '📢', title: 'Warnings', text: 'Sirens, radio and phone alerts.' }
        ],
        predictions: [
            { emoji: '🤷', label: 'Nothing can reduce harm from a tsunami' },
            { emoji: '📢', label: 'Warnings, high ground and practice drills save lives' }
        ],
        correctPrediction: 1,
        claim: 'Engineers and communities design solutions that reduce the impact of natural hazards.',
        explainChoices: [
            { text: 'Early warnings give people time to reach high, safe buildings.', correct: true },
            { text: 'Watching from the beach is safe if you are quick.', correct: false }
        ],
        transferQ: 'The sea suddenly pulls far back from the beach. What should you do?',
        transferChoices: ['Move to high ground straight away', 'Walk out to collect shells'],
        transferCorrect: 0,
        hints: ['Three ideas help; two put people in danger.', 'Sirens, safe raised buildings and drills.'],
        lab: {
            kind: 'choice',
            multi: true,
            instruction: 'Pick EVERY idea that keeps people safe.',
            options: [
                { id: 'sirens', label: 'Warning sirens and alerts', emoji: '📢' },
                { id: 'high', label: 'Strong, raised buildings to escape to', emoji: '🏢' },
                { id: 'drills', label: 'Practise evacuation drills at school', emoji: '🏃' },
                { id: 'watch', label: 'Wait on the beach to watch the wave', emoji: '👀', why: 'Tsunami waves move faster than people can run.' },
                { id: 'clinic', label: 'Build the clinic right on the shoreline', emoji: '🏥', why: 'The clinic would be flooded just when people need it.' }
            ],
            correct: ['sirens', 'high', 'drills'],
            evidence: [
                { emoji: '📢', tone: 'coral', title: 'Warning time', text: 'Alerts give minutes or hours to move.' },
                { emoji: '🏢', tone: 'sky', title: 'Somewhere to go', text: 'Raised, strong buildings shelter people above the water.' },
                { emoji: '🏃', tone: 'palm', title: 'Practice', text: 'Drills mean everyone knows the route without panicking.' }
            ]
        }
    },

    {
        zone: 'lagoon',
        title: 'How Herons See Fish',
        goal: 'Put the path of light in order to explain how a heron sees a fish.',
        siteEmoji: '👁️',
        restore: 'Cleaner shrimp are waving from their reef stations',
        rewards: ['cleaner_shrimp'],
        clues: [
            { emoji: '☀️', title: 'Light Source', text: 'The sun makes its own light.' },
            { emoji: '🐟', title: 'Objects', text: 'Most things only reflect light.' },
            { emoji: '👁️', title: 'Eye', text: 'Collects the light coming into it.' }
        ],
        predictions: [
            { emoji: '🔦', label: 'Eyes shoot out beams of light to see' },
            { emoji: '👁️', label: 'Light bounces off objects into the eye' }
        ],
        correctPrediction: 1,
        claim: 'We see objects when light reflects off them and enters our eyes.',
        explainChoices: [
            { text: 'Sunlight hits the fish, bounces off and travels into the heron’s eye.', correct: true },
            { text: 'The heron’s eyes glow to light up the fish.', correct: false }
        ],
        transferQ: 'Why can’t you see a fish in the lagoon on a moonless night?',
        transferChoices: ['There is little light to bounce off it into your eyes', 'Fish disappear at night'],
        transferCorrect: 0,
        hints: ['Where does all light start?', 'Sun → into the water → bounces off the fish → into the eye.'],
        lab: {
            kind: 'sequence',
            loop: false,
            instruction: 'Tap the steps to follow the light.',
            pool: [
                { id: 'eye', label: 'Light enters the heron’s eye', emoji: '👁️', tone: 'orchid' },
                { id: 'sun', label: 'Sunlight shines down', emoji: '☀️', tone: 'sun' },
                { id: 'fish', label: 'Light bounces off the fish', emoji: '🐟', tone: 'sky' },
                { id: 'water', label: 'Light passes into the water', emoji: '🌊', tone: 'lagoon' }
            ],
            correctOrder: ['sun', 'water', 'fish', 'eye'],
            evidence: [
                { emoji: '☀️', tone: 'sun', title: 'Source', text: 'All the light started at the sun.' },
                { emoji: '🐟', tone: 'sky', title: 'Reflection', text: 'The fish made no light. It bounced sunlight.' },
                { emoji: '👁️', tone: 'orchid', title: 'Detection', text: 'The heron saw the fish when that light reached its eye.' }
            ]
        }
    }
]);
