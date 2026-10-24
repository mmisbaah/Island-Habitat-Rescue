/**
 * GRADE 2 · missions 15–22 (missions 12–14 live in missions.js)
 * Topics: seed dispersal, pollination, habitat diversity, material properties,
 * slow land changes, maps, fresh and salt water, sorting by properties.
 */
IHR.addMissions(2, [
    {
        zone: 'jungle',
        title: 'Seed Travellers',
        goal: 'Match each seed to the way it travels to a new place to grow.',
        siteEmoji: '🥭',
        restore: 'Young mango trees are sprouting where flying foxes dropped seeds',
        rewards: ['mango'],
        clues: [
            { emoji: '🥥', title: 'Coconut', text: 'A thick, airy husk that floats.' },
            { emoji: '🌼', title: 'Daisy Seed', text: 'Tiny, with a fluffy parachute.' },
            { emoji: '🥭', title: 'Mango', text: 'Sweet fruit with a big seed inside.' },
            { emoji: '🌰', title: 'Burr', text: 'Covered in tiny hooks.' }
        ],
        predictions: [
            { emoji: '📍', label: 'Seeds always land right under the parent plant' },
            { emoji: '🚀', label: 'Seeds travel to new places by water, wind and animals' }
        ],
        correctPrediction: 1,
        claim: 'Plants depend on wind, water and animals to move their seeds to new places.',
        explainChoices: [
            { text: 'Coconuts float, fluffy seeds blow and mango seeds are carried by animals.', correct: true },
            { text: 'Seeds walk to new places on tiny legs.', correct: false }
        ],
        transferQ: 'A seed is covered in tiny hooks. How does it most likely travel?',
        transferChoices: ['It hooks onto animal fur or feathers', 'It floats across the ocean'],
        transferCorrect: 0,
        hints: ['Look at each seed’s shape: what is it built for?', 'Coconut → sea, daisy → wind, mango → animals, burr → fur and feathers.'],
        lab: {
            kind: 'match',
            instruction: 'Match each seed to how it travels.',
            slotCols: 2,
            slots: [
                { id: 'sea', label: 'Floats on the sea', emoji: '🌊' },
                { id: 'wind', label: 'Blows in the wind', emoji: '🌬️' },
                { id: 'eaten', label: 'Eaten and dropped by animals', emoji: '🦇' },
                { id: 'hitch', label: 'Sticks to fur or feathers', emoji: '🪶' }
            ],
            items: [
                { id: 'coconut', label: 'Coconut', emoji: '🥥', tone: 'bark', target: 'sea' },
                { id: 'daisy', label: 'Daisy Seed', emoji: '🌼', tone: 'sun', target: 'wind' },
                { id: 'mango', label: 'Mango', emoji: '🥭', tone: 'coral', target: 'eaten' },
                { id: 'burr', label: 'Burr', emoji: '🌰', tone: 'palm', target: 'hitch' }
            ],
            evidence: [
                { emoji: '🥥', tone: 'bark', title: 'Coconuts sail', text: 'A coconut can float for months and sprout on a new island.' },
                { emoji: '🥭', tone: 'coral', title: 'Animals carry', text: 'Flying foxes eat mangoes and drop the seeds far away.' },
                { emoji: '🌼', tone: 'sun', title: 'Every seed has a plan', text: 'Floats, parachutes and hooks all move seeds away from the parent.' }
            ]
        }
    },

    {
        zone: 'jungle',
        title: 'Flower Visitors',
        goal: 'Find every visitor that carries pollen between hibiscus and mango flowers.',
        siteEmoji: '🦋',
        restore: 'Butterflies are dancing between the flowers',
        rewards: ['butterfly'],
        clues: [
            { emoji: '🐝', title: 'Bee', text: 'A fuzzy body that pollen sticks to.' },
            { emoji: '🦋', title: 'Butterfly', text: 'Sips nectar with a long tongue.' },
            { emoji: '🦇', title: 'Flying Fox', text: 'Licks nectar from big flowers at night.' }
        ],
        predictions: [
            { emoji: '🌸', label: 'Flowers make seeds all by themselves' },
            { emoji: '🐝', label: 'Animals carry pollen between flowers, helping plants make seeds' }
        ],
        correctPrediction: 1,
        claim: 'Many plants depend on animals to move pollen so they can make seeds.',
        explainChoices: [
            { text: 'Pollen sticks to visiting animals and is carried to the next flower.', correct: true },
            { text: 'Animals eat all the pollen so plants stop making seeds.', correct: false }
        ],
        transferQ: 'If all the pollinators left an island, what would happen to the mango harvest?',
        transferChoices: ['Fewer mangoes would form', 'Twice as many mangoes would grow'],
        transferCorrect: 0,
        hints: ['Which visitors actually touch the flowers? There are three.', 'Bee, butterfly and flying fox.'],
        lab: {
            kind: 'choice',
            multi: true,
            instruction: 'Pick EVERY visitor that carries pollen.',
            options: [
                { id: 'bee', label: 'Bee', emoji: '🐝' },
                { id: 'butterfly', label: 'Butterfly', emoji: '🦋' },
                { id: 'bat', label: 'Flying Fox', emoji: '🦇' },
                { id: 'crab', label: 'Ghost Crab', emoji: '🦀', why: 'Ghost crabs stay on the sand and never visit flowers.' },
                { id: 'stone', label: 'Coral Stone', emoji: '🪨', why: 'A stone can’t move, so it can’t carry pollen.' }
            ],
            correct: ['bee', 'butterfly', 'bat'],
            evidence: [
                { emoji: '🐝', tone: 'sun', title: 'Dusty visitors', text: 'Pollen clung to the bee and butterfly as they fed.' },
                { emoji: '🦇', tone: 'bark', title: 'Night shift too', text: 'Flying foxes pollinate big flowers after dark.' },
                { emoji: '🥭', tone: 'coral', title: 'Pollen → seeds → fruit', text: 'Pollinated flowers grow into fruit with seeds.' }
            ]
        }
    },

    {
        zone: 'lagoon',
        title: 'Count the Kinds',
        goal: 'Compare how many kinds of living things you find on a healthy reef and a harbour wall.',
        siteEmoji: '🐠',
        restore: 'Maldives anemonefish are back in their anemones',
        rewards: ['anemonefish'],
        clues: [
            { emoji: '🪸', title: 'Healthy Reef', text: 'Lots of hiding places and food.' },
            { emoji: '⚓', title: 'Harbour Wall', text: 'Smooth concrete and busy boats.' },
            { emoji: '📋', title: 'Survey', text: 'Count how many different KINDS you see.' }
        ],
        predictions: [
            { emoji: '🟰', label: 'Every habitat has the same kinds of living things' },
            { emoji: '🔎', label: 'A healthy reef has more kinds of life than a harbour wall' }
        ],
        correctPrediction: 1,
        claim: 'Different habitats have different numbers and kinds of living things.',
        explainChoices: [
            { text: 'The healthy reef had more kinds of fish, coral, crabs and sea stars.', correct: true },
            { text: 'The harbour had more fish because it has boats.', correct: false }
        ],
        transferQ: 'You survey a patch of jungle and a car park. Which will probably have more kinds of plants and animals?',
        transferChoices: ['The jungle patch', 'The car park'],
        transferCorrect: 0,
        hints: ['Compare the green bars with the grey bars.', 'The reef wins in every group.'],
        lab: {
            kind: 'choice',
            instruction: 'Which place has more KINDS of living things?',
            visual: {
                type: 'bars',
                labels: ['Fish', 'Corals', 'Crabs & shrimp', 'Sea stars'],
                series: [
                    { label: 'Healthy reef', tone: 'palm', values: [24, 15, 9, 4] },
                    { label: 'Harbour wall', tone: 'shell', values: [5, 2, 3, 0] }
                ]
            },
            options: [
                { id: 'reef', label: 'The healthy reef', emoji: '🪸' },
                { id: 'harbour', label: 'The harbour wall', emoji: '⚓', why: 'The grey harbour bars are shorter in every group.' },
                { id: 'same', label: 'They are the same', emoji: '🟰', why: '24 kinds of fish vs 5 is a big difference.' }
            ],
            correct: ['reef'],
            evidence: [
                { emoji: '🪸', tone: 'palm', title: '52 kinds vs 10', text: 'The reef held about five times as many kinds of life.' },
                { emoji: '🏠', tone: 'lagoon', title: 'More homes', text: 'Cracks, caves and coral branches give many animals somewhere to live.' },
                { emoji: '⚓', tone: 'shell', title: 'Smooth walls', text: 'Flat concrete offers few places to hide or feed.' }
            ]
        }
    },

    {
        zone: 'beach',
        title: 'Shade for Turtle Eggs',
        goal: 'Test three nest covers and pick the one that keeps turtle eggs cool.',
        siteEmoji: '🛖',
        restore: 'Crab plovers are hunting near the shaded turtle nests',
        rewards: ['crab_plover'],
        clues: [
            { emoji: '🥚', title: 'Turtle Eggs', text: 'If the sand gets too hot, the eggs may not hatch.' },
            { emoji: '🌴', title: 'Palm-leaf Mat', text: 'Shady, with gaps that let air through.' },
            { emoji: '🧴', title: 'Clear Plastic', text: 'Lets sunlight straight through.' }
        ],
        predictions: [
            { emoji: '🧴', label: 'Any cover will keep the nest cool' },
            { emoji: '🌴', label: 'A woven palm-leaf mat will keep the sand coolest' }
        ],
        correctPrediction: 1,
        claim: 'Different materials have different properties; we choose the one that suits the job.',
        explainChoices: [
            { text: 'The palm mat blocks sunlight but lets air through, so the sand stays cool.', correct: true },
            { text: 'Plastic is best because it is shiny.', correct: false }
        ],
        transferQ: 'You need a roof for a bus stop that stays cool on sunny days. Which property matters most?',
        transferChoices: ['It blocks sunlight', 'It is see-through'],
        transferCorrect: 0,
        hints: ['Look for the shortest temperature bar.', 'The palm-leaf mat kept the sand at 30°C.'],
        lab: {
            kind: 'choice',
            instruction: 'Which cover keeps the nest sand coolest?',
            visual: {
                type: 'sites',
                sites: [
                    { label: 'Palm-leaf Mat', emoji: '🌴', tone: 'palm', metrics: [{ label: 'Sand temperature', value: 30, max: 45, unit: '°C' }] },
                    { label: 'Clear Plastic', emoji: '🧴', tone: 'coral', metrics: [{ label: 'Sand temperature', value: 41, max: 45, unit: '°C' }] },
                    { label: 'No Cover', emoji: '☀️', tone: 'sun', metrics: [{ label: 'Sand temperature', value: 36, max: 45, unit: '°C' }] }
                ]
            },
            options: [
                { id: 'mat', label: 'Palm-leaf mat', emoji: '🌴' },
                { id: 'plastic', label: 'Clear plastic', emoji: '🧴', why: 'Clear plastic traps heat like a greenhouse: 41°C could cook the eggs.' },
                { id: 'none', label: 'No cover', emoji: '☀️', why: '36°C is cooler than plastic, but still hotter than the mat.' }
            ],
            correct: ['mat'],
            evidence: [
                { emoji: '🌴', tone: 'palm', title: 'Mat: 30°C', text: 'It blocked the sun and let warm air escape.' },
                { emoji: '🧴', tone: 'coral', title: 'Plastic: 41°C', text: 'It let sunlight in and trapped the heat.' },
                { emoji: '🧪', tone: 'sky', title: 'A fair test', text: 'Same beach, same time, only the cover changed.' }
            ]
        }
    },

    {
        zone: 'lagoon',
        title: 'How a Sandbank Grows',
        goal: 'Put the steps in order to show how a new sandbank slowly builds up on the reef.',
        siteEmoji: '🏝️',
        restore: 'Sea cucumbers are cleaning the sand of a new sandbank',
        rewards: ['sea_cucumber'],
        clues: [
            { emoji: '🌊', title: 'Waves', text: 'Smash old coral into pieces.' },
            { emoji: '🐠', title: 'Parrotfish', text: 'Crunch coral and leave fine white sand behind.' },
            { emoji: '⏳', title: 'Currents', text: 'Push sand into piles on the shallow reef.' }
        ],
        predictions: [
            { emoji: '⚡', label: 'Islands appear overnight' },
            { emoji: '🐢', label: 'Sandbanks build up slowly, over many years' }
        ],
        correctPrediction: 1,
        claim: 'Some changes to the land happen slowly, over many years, like sand building up into an island.',
        explainChoices: [
            { text: 'Sand made from broken coral piles up little by little until a sandbank forms.', correct: true },
            { text: 'Sand falls from the sky to make islands.', correct: false }
        ],
        transferQ: 'Which change to a beach happens fastest?',
        transferChoices: ['A storm washes sand away in one night', 'A sandbank grows into an island'],
        transferCorrect: 0,
        hints: ['You need broken coral before there can be sand.', 'Break → Grind into sand → Pile up → Sandbank.'],
        lab: {
            kind: 'sequence',
            loop: false,
            instruction: 'Tap the steps in order.',
            pool: [
                { id: 'pile', label: 'Currents pile sand', emoji: '⏳', tone: 'sky' },
                { id: 'break', label: 'Waves break coral', emoji: '🌊', tone: 'lagoon' },
                { id: 'bank', label: 'A sandbank appears', emoji: '🏝️', tone: 'sand' },
                { id: 'grind', label: 'Parrotfish make sand', emoji: '🐠', tone: 'palm' }
            ],
            correctOrder: ['break', 'grind', 'pile', 'bank'],
            evidence: [
                { emoji: '🐠', tone: 'palm', title: 'Fish-made sand', text: 'Much of Maldives sand passed through a parrotfish.' },
                { emoji: '⏳', tone: 'sky', title: 'Slow change', text: 'Building a sandbank takes many years.' },
                { emoji: '🌊', tone: 'lagoon', title: 'Fast change', text: 'One storm can move a lot of sand in a single night.' }
            ]
        }
    },

    {
        zone: 'lagoon',
        title: 'Map the Atoll',
        goal: 'Use the map colours to place each thing in the right part of the atoll.',
        siteEmoji: '🗺️',
        restore: 'Manta rays are feeding in the reef channel',
        rewards: ['manta'],
        clues: [
            { emoji: '🟦', title: 'Deep Blue', text: 'The open ocean: very deep water.' },
            { emoji: '⚪', title: 'White Line', text: 'The reef edge, where waves break.' },
            { emoji: '🩵', title: 'Turquoise', text: 'The shallow lagoon.' },
            { emoji: '🟩', title: 'Green', text: 'Land with trees.' }
        ],
        predictions: [
            { emoji: '🎨', label: 'Map colours are random' },
            { emoji: '🗺️', label: 'Map colours show deep water, shallow water and land' }
        ],
        correctPrediction: 1,
        claim: 'Maps use colours and shapes to show where land and water are.',
        explainChoices: [
            { text: 'Deep blue means deep ocean, turquoise means shallow lagoon and green means land.', correct: true },
            { text: 'Blue on a map always means sky.', correct: false }
        ],
        transferQ: 'On a map, a small green shape sits inside a turquoise ring. What is it?',
        transferChoices: ['An island inside a lagoon', 'A cloud over the sea'],
        transferCorrect: 0,
        hints: ['Where would you find each thing in real life?', 'Boat → ocean, waves → reef edge, snorkeller → lagoon, palm → land.'],
        lab: {
            kind: 'match',
            instruction: 'Place each thing on the right part of the map.',
            slotCols: 2,
            slots: [
                { id: 'ocean', label: 'Deep blue · Ocean', emoji: '🟦' },
                { id: 'reef', label: 'White line · Reef edge', emoji: '⚪' },
                { id: 'lagoon', label: 'Turquoise · Lagoon', emoji: '🩵' },
                { id: 'land', label: 'Green · Island', emoji: '🟩' }
            ],
            items: [
                { id: 'boat', label: 'Boat far out at sea', emoji: '⛵', tone: 'sky', target: 'ocean' },
                { id: 'waves', label: 'Crashing waves', emoji: '🌊', tone: 'shell', target: 'reef' },
                { id: 'snorkel', label: 'Snorkeller in shallow water', emoji: '🤿', tone: 'lagoon', target: 'lagoon' },
                { id: 'palm', label: 'Coconut palm', emoji: '🌴', tone: 'palm', target: 'land' }
            ],
            evidence: [
                { emoji: '🗺️', tone: 'lagoon', title: 'Colour = depth', text: 'Darker blue means deeper water.' },
                { emoji: '⚪', tone: 'shell', title: 'Reef ring', text: 'The white line of waves marks the reef around the lagoon.' },
                { emoji: '🟩', tone: 'palm', title: 'Islands are small', text: 'Land is only a tiny part of an atoll map.' }
            ]
        }
    },

    {
        zone: 'jungle',
        title: 'Fresh or Salty?',
        goal: 'Sort the island’s water into salty water and fresh water.',
        siteEmoji: '🌧️',
        restore: 'Waterhens are wading in the fresh rain pond',
        rewards: ['waterhen'],
        clues: [
            { emoji: '🌊', title: 'Ocean', text: 'Covers almost everything around the island.' },
            { emoji: '🌧️', title: 'Rain', text: 'Falls from clouds. Not salty.' },
            { emoji: '🏭', title: 'Desalination Plant', text: 'Takes the salt out of seawater.' }
        ],
        predictions: [
            { emoji: '🥤', label: 'All water on the island is safe to drink' },
            { emoji: '🧂', label: 'Ocean and lagoon water is salty; rain is fresh' }
        ],
        correctPrediction: 1,
        claim: 'Most water around an island is salty; fresh water comes from rain or from removing the salt.',
        explainChoices: [
            { text: 'Rain is fresh, but the sea around the island is salty.', correct: true },
            { text: 'Seawater becomes fresh if you stir it.', correct: false }
        ],
        transferQ: 'Why do many island homes collect rain from their roofs?',
        transferChoices: ['Rain is fresh water they can store and use', 'Rainwater is saltier than the sea'],
        transferCorrect: 0,
        hints: ['Did it come from the sea, or from the sky?', 'Ocean and lagoon are salty. Rain, rain tank and desalinated water are fresh.'],
        lab: {
            kind: 'match',
            instruction: 'Sort each kind of water.',
            slots: [
                { id: 'salty', label: 'Salty Water', emoji: '🧂', sub: 'Too salty to drink' },
                { id: 'fresh', label: 'Fresh Water', emoji: '💧', sub: 'Plants and people can use it' }
            ],
            items: [
                { id: 'ocean', label: 'Ocean', emoji: '🌊', tone: 'sky', target: 'salty' },
                { id: 'lagoon', label: 'Lagoon', emoji: '🏝️', tone: 'lagoon', target: 'salty' },
                { id: 'rain', label: 'Rain', emoji: '🌧️', tone: 'shell', target: 'fresh' },
                { id: 'tank', label: 'Rain Tank', emoji: '🛢️', tone: 'bark', target: 'fresh' },
                { id: 'desal', label: 'Desalinated Water', emoji: '🏭', tone: 'palm', target: 'fresh' }
            ],
            evidence: [
                { emoji: '🧂', tone: 'sky', title: 'Salt all around', text: 'The ocean and lagoon are salty.' },
                { emoji: '🌧️', tone: 'shell', title: 'Rain is fresh', text: 'That is why islanders store it in tanks.' },
                { emoji: '🏭', tone: 'palm', title: 'Making fresh water', text: 'Desalination removes salt from seawater, using lots of energy.' }
            ]
        }
    },

    {
        zone: 'beach',
        title: 'Shell Sorting',
        goal: 'Sort beach shells into groups by looking closely at their shapes.',
        siteEmoji: '🦪',
        restore: 'Sea stars are dotting the clean shallows',
        rewards: ['sea_star'],
        clues: [
            { emoji: '🐚', title: 'Snail Shells', text: 'One piece, often coiled.' },
            { emoji: '🦪', title: 'Clam Shells', text: 'Two halves that open and close on a hinge.' }
        ],
        predictions: [
            { emoji: '🎲', label: 'Shells can’t be sorted' },
            { emoji: '🔍', label: 'Shells can be sorted by their shape' }
        ],
        correctPrediction: 1,
        claim: 'Scientists sort things into groups by observing their properties, like shape.',
        explainChoices: [
            { text: 'Snail shells are one coiled piece; clams have two halves joined by a hinge.', correct: true },
            { text: 'All shells are the same shape.', correct: false }
        ],
        transferQ: 'You find a shell made of two matching halves. Which group does it belong in?',
        transferChoices: ['Two halves, hinged', 'One piece, coiled'],
        transferCorrect: 0,
        hints: ['Count the pieces: one or two?', 'Cowrie and top shell are one piece; giant clam and oyster have two halves.'],
        lab: {
            kind: 'match',
            instruction: 'Sort the shells by shape.',
            slots: [
                { id: 'one', label: 'One Piece, Coiled', emoji: '🌀', sub: 'Sea snail shells' },
                { id: 'two', label: 'Two Halves, Hinged', emoji: '🦪', sub: 'Clam family shells' }
            ],
            items: [
                { id: 'cowrie', label: 'Cowrie', emoji: '🐚', tone: 'coral', target: 'one' },
                { id: 'top', label: 'Top Shell', emoji: '🐚', tone: 'sun', target: 'one' },
                { id: 'clam', label: 'Giant Clam', emoji: '🦪', tone: 'sky', target: 'two' },
                { id: 'oyster', label: 'Oyster', emoji: '🦪', tone: 'shell', target: 'two' }
            ],
            evidence: [
                { emoji: '🐚', tone: 'coral', title: 'One piece: 2 shells', text: 'Cowries and top shells were built by sea snails.' },
                { emoji: '🦪', tone: 'sky', title: 'Two halves: 2 shells', text: 'Giant clams and oysters close their two halves for safety.' },
                { emoji: '🔍', tone: 'lagoon', title: 'Observe, then group', text: 'Looking closely at shape let you sort them.' }
            ]
        }
    }
]);
