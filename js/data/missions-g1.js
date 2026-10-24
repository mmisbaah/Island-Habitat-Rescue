/**
 * GRADE 1 · missions 4–11 (the first three live in missions.js)
 * Topics: parents and young, day and night animals, sunlight warming the Earth,
 * the sun's daily path, animal body parts, plant needs, litter, camouflage.
 */
IHR.addMissions(1, [
    {
        zone: 'beach',
        title: 'Parents and Babies',
        goal: 'Match each baby to the parent it will grow up to look like.',
        siteEmoji: '🐣',
        restore: 'Turtle hatchlings are racing down the beach to the sea',
        rewards: ['frigatebird'],
        clues: [
            { emoji: '🥚', title: 'Turtle Hatchling', text: 'Tiny, but it already has a shell and flippers.' },
            { emoji: '🌱', title: 'Coconut Sprout', text: 'A shoot growing out of a fallen coconut.' },
            { emoji: '🐣', title: 'Heron Chick', text: 'Fluffy now. Long legs and a long beak are coming.' }
        ],
        predictions: [
            { emoji: '🎲', label: 'A baby can grow into any kind of living thing' },
            { emoji: '👪', label: 'Babies grow up to be like their parents' }
        ],
        correctPrediction: 1,
        claim: 'Young plants and animals are like their parents, but not exactly the same.',
        explainChoices: [
            { text: 'The hatchling already has a shell and flippers, like the adult turtle.', correct: true },
            { text: 'The hatchling will grow into a fish.', correct: false }
        ],
        transferQ: 'A baby ghost crab hatches on the beach. What will it grow into?',
        transferChoices: ['A ghost crab, like its parents', 'A sea turtle'],
        transferCorrect: 0,
        hints: ['Look for body parts the baby and the adult share.', 'Hatchling → Turtle, Sprout → Coconut Palm, Chick → Heron.'],
        lab: {
            kind: 'match',
            instruction: 'Match each baby to its parent.',
            slots: [
                { id: 'turtle', label: 'Green Sea Turtle', emoji: '🐢', sub: 'Shell and flippers' },
                { id: 'palm', label: 'Coconut Palm', emoji: '🌴', sub: 'Tall trunk, big leaves' },
                { id: 'heron', label: 'Grey Heron', emoji: '🐦', sub: 'Long legs and beak' }
            ],
            items: [
                { id: 'hatchling', label: 'Hatchling', emoji: '🥚', tone: 'palm', target: 'turtle' },
                { id: 'sprout', label: 'Coconut Sprout', emoji: '🌱', tone: 'lagoon', target: 'palm' },
                { id: 'chick', label: 'Heron Chick', emoji: '🐣', tone: 'sun', target: 'heron' }
            ],
            evidence: [
                { emoji: '🐢', tone: 'palm', title: 'Same body plan', text: 'The hatchling has the shell and flippers its mother has.' },
                { emoji: '🌴', tone: 'lagoon', title: 'Palm from a palm', text: 'A coconut only ever sprouts into a coconut palm.' },
                { emoji: '🐣', tone: 'sun', title: 'Like, but not the same', text: 'Babies look like their parents but are smaller and change as they grow.' }
            ]
        }
    },

    {
        zone: 'jungle',
        title: 'Day or Night?',
        goal: 'Sort the island animals into the ones busy by day and the ones that come out at night.',
        siteEmoji: '🌙',
        restore: 'Geckos are chirping on the village walls after dark',
        rewards: ['gecko'],
        clues: [
            { emoji: '🦇', title: 'Flying Fox', text: 'Sleeps hanging upside down all day.' },
            { emoji: '🦀', title: 'Ghost Crab', text: 'Leaves its burrow when the sun goes down.' },
            { emoji: '🐦', title: 'Grey Heron', text: 'Fishes in the shallows in daylight.' },
            { emoji: '🦎', title: 'House Gecko', text: 'Hunts moths around the lights at night.' }
        ],
        predictions: [
            { emoji: '🌞', label: 'All animals are busy in the daytime' },
            { emoji: '🌗', label: 'Some animals are busy by day, others at night' }
        ],
        correctPrediction: 1,
        claim: 'Some animals are active at night and rest in the day; others do the opposite.',
        explainChoices: [
            { text: 'Flying foxes and geckos come out at night, while herons hunt by day.', correct: true },
            { text: 'Every animal sleeps at night.', correct: false }
        ],
        transferQ: 'You walk on the beach with a torch after dark. Which animal are you most likely to see running on the sand?',
        transferChoices: ['A ghost crab', 'A garden lizard sunbathing'],
        transferCorrect: 0,
        hints: ['Read the clue cards: who sleeps in the day?', 'Night: flying fox, ghost crab, gecko. Day: heron, butterfly, garden lizard.'],
        lab: {
            kind: 'match',
            instruction: 'Sort each animal by when it is busy.',
            slots: [
                { id: 'day', label: 'Busy by Day', emoji: '☀️', sub: 'Rests at night' },
                { id: 'night', label: 'Busy at Night', emoji: '🌙', sub: 'Rests in the day' }
            ],
            items: [
                { id: 'bat', label: 'Flying Fox', emoji: '🦇', tone: 'bark', target: 'night' },
                { id: 'crab', label: 'Ghost Crab', emoji: '🦀', tone: 'sand', target: 'night' },
                { id: 'gecko', label: 'House Gecko', emoji: '🦎', tone: 'palm', target: 'night' },
                { id: 'heron', label: 'Grey Heron', emoji: '🐦', tone: 'shell', target: 'day' },
                { id: 'butterfly', label: 'Butterfly', emoji: '🦋', tone: 'orchid', target: 'day' },
                { id: 'lizard', label: 'Garden Lizard', emoji: '🦎', tone: 'coral', target: 'day' }
            ],
            evidence: [
                { emoji: '🌙', tone: 'sky', title: 'Night shift: 3', text: 'Flying fox, ghost crab and gecko wake up as it gets dark.' },
                { emoji: '☀️', tone: 'sun', title: 'Day shift: 3', text: 'Heron, butterfly and garden lizard need daylight.' },
                { emoji: '🔁', tone: 'lagoon', title: 'Sharing the island', text: 'Day and night animals use the same places at different times.' }
            ]
        }
    },

    {
        zone: 'beach',
        title: 'Warm Sand, Cool Shade',
        goal: 'Measure sand in the open sun and under a palm tree at midday.',
        siteEmoji: '☀️',
        restore: 'Turnstones are resting in the cool palm shade',
        rewards: ['turnstone'],
        clues: [
            { emoji: '☀️', title: 'Midday Sun', text: 'Shines straight down on the open beach.' },
            { emoji: '🌴', title: 'Palm Shade', text: 'Leaves block much of the sunlight.' },
            { emoji: '🌡️', title: 'Thermometer', text: 'Measures how hot the sand is.' }
        ],
        predictions: [
            { emoji: '🟰', label: 'Sand in the sun and the shade is the same temperature' },
            { emoji: '🔥', label: 'Sunlight makes the open sand hotter than the shady sand' }
        ],
        correctPrediction: 1,
        claim: 'Sunlight warms the Earth’s surface; shade keeps it cooler.',
        explainChoices: [
            { text: 'The open sand got more sunlight, so it warmed up more.', correct: true },
            { text: 'Shade makes heat out of nothing.', correct: false }
        ],
        transferQ: 'Ghost crabs hide in their burrows in the middle of the day. Why?',
        transferChoices: ['To stay out of the hot sun', 'Because the sand is cold at noon'],
        transferCorrect: 0,
        hints: ['Compare the temperature bars on both cards.', 'The open sand gets all the sunlight.'],
        lab: {
            kind: 'choice',
            instruction: 'Which sand is hotter at midday?',
            visual: {
                type: 'sites',
                sites: [
                    { label: 'Open Sand', emoji: '☀️', tone: 'sun', metrics: [
                        { label: 'Sand temperature', value: 48, max: 60, unit: '°C' },
                        { label: 'Sunlight reaching the sand', value: 100, max: 100, unit: '%' }
                    ] },
                    { label: 'Palm Shade', emoji: '🌴', tone: 'palm', metrics: [
                        { label: 'Sand temperature', value: 31, max: 60, unit: '°C' },
                        { label: 'Sunlight reaching the sand', value: 30, max: 100, unit: '%' }
                    ] }
                ]
            },
            options: [
                { id: 'sun', label: 'The open sand is hotter', emoji: '☀️' },
                { id: 'shade', label: 'The shady sand is hotter', emoji: '🌴', why: 'Check the thermometer: 31°C in the shade, 48°C in the sun.' },
                { id: 'same', label: 'They are the same', emoji: '🟰', why: 'The temperature bars are very different lengths.' }
            ],
            correct: ['sun'],
            evidence: [
                { emoji: '🌡️', tone: 'sun', title: '48°C vs 31°C', text: 'The open sand was much hotter than the shady sand.' },
                { emoji: '☀️', tone: 'coral', title: 'More sun, more heat', text: 'All the sunlight reached the open sand.' },
                { emoji: '🌴', tone: 'palm', title: 'Shade cools', text: 'Palm leaves blocked most of the sunlight.' }
            ]
        }
    },

    {
        zone: 'jungle',
        title: 'The Sun’s Journey',
        goal: 'Put the sun’s path across the island sky in order, from morning to night.',
        siteEmoji: '🌅',
        restore: 'House crows are calling across the morning sky',
        rewards: ['crow'],
        clues: [
            { emoji: '🌅', title: 'Sunrise', text: 'The sun comes up in the east, over the lagoon.' },
            { emoji: '☀️', title: 'Midday', text: 'The sun is high overhead. Shadows are tiny.' },
            { emoji: '🌇', title: 'Sunset', text: 'The sun goes down in the west.' },
            { emoji: '🌙', title: 'Night', text: 'The sun is gone; the moon and stars come out.' }
        ],
        predictions: [
            { emoji: '🎲', label: 'The sun jumps around the sky in any order' },
            { emoji: '🔁', label: 'The sun moves across the sky in the same pattern every day' }
        ],
        correctPrediction: 1,
        claim: 'The sun appears to rise, move across the sky and set in a pattern that repeats every day.',
        explainChoices: [
            { text: 'Every day the sun rises in the east, is high at midday and sets in the west.', correct: true },
            { text: 'The sun sets in the morning.', correct: false }
        ],
        transferQ: 'It is early morning. Where should you look to see the sun?',
        transferChoices: ['Low in the east', 'High overhead'],
        transferCorrect: 0,
        hints: ['What happens first when you wake up?', 'Sunrise → Midday → Sunset → Night.'],
        lab: {
            kind: 'sequence',
            instruction: 'Tap the sky pictures in order to build one whole day.',
            pool: [
                { id: 'midday', label: 'Midday', emoji: '☀️', tone: 'sun' },
                { id: 'night', label: 'Night', emoji: '🌙', tone: 'sky' },
                { id: 'sunrise', label: 'Sunrise', emoji: '🌅', tone: 'coral' },
                { id: 'sunset', label: 'Sunset', emoji: '🌇', tone: 'orchid' }
            ],
            correctOrder: ['sunrise', 'midday', 'sunset', 'night'],
            evidence: [
                { emoji: '🌅', tone: 'coral', title: 'East in the morning', text: 'The day starts with the sun low in the east.' },
                { emoji: '☀️', tone: 'sun', title: 'High at midday', text: 'Near the equator the midday sun is almost straight overhead.' },
                { emoji: '🔁', tone: 'sky', title: 'Every single day', text: 'After night comes sunrise again. The pattern repeats.' }
            ]
        }
    },

    {
        zone: 'lagoon',
        title: 'Claws, Shells and Fins',
        goal: 'Match each body part to the way it helps an animal survive.',
        siteEmoji: '🦞',
        restore: 'Spiny lobsters are peeking out of the reef',
        rewards: ['lobster'],
        clues: [
            { emoji: '🦀', title: 'Claws', text: 'Pinch and hold food.' },
            { emoji: '🐢', title: 'Shell', text: 'A hard cover over a soft body.' },
            { emoji: '🐟', title: 'Fins', text: 'Push against the water.' },
            { emoji: '🕊️', title: 'Wings', text: 'Push against the air.' }
        ],
        predictions: [
            { emoji: '🎨', label: 'Body parts are just for decoration' },
            { emoji: '🛠️', label: 'Each body part helps the animal do a job' }
        ],
        correctPrediction: 1,
        claim: 'Animals use their body parts to get food, stay safe and move.',
        explainChoices: [
            { text: 'A turtle’s hard shell protects its soft body from predators.', correct: true },
            { text: 'A crab’s claws help it fly.', correct: false }
        ],
        transferQ: 'An engineer is designing a tool to pick up beach litter. Which animal part could inspire the design?',
        transferChoices: ['A crab’s claws', 'A fish’s tail'],
        transferCorrect: 0,
        hints: ['Each clue card says what the body part does.', 'Claws → grabbing, Shell → safety, Fins → swimming, Wings → flying.'],
        lab: {
            kind: 'match',
            instruction: 'Match each body part to its job.',
            slotCols: 2,
            slots: [
                { id: 'grab', label: 'Grabbing food', emoji: '✋' },
                { id: 'safe', label: 'Staying safe', emoji: '🛡️' },
                { id: 'swim', label: 'Swimming', emoji: '🌊' },
                { id: 'fly', label: 'Flying', emoji: '☁️' }
            ],
            items: [
                { id: 'claws', label: 'Claws', emoji: '🦀', tone: 'coral', target: 'grab' },
                { id: 'shell', label: 'Shell', emoji: '🐢', tone: 'palm', target: 'safe' },
                { id: 'fins', label: 'Fins', emoji: '🐟', tone: 'sky', target: 'swim' },
                { id: 'wings', label: 'Wings', emoji: '🕊️', tone: 'shell', target: 'fly' }
            ],
            evidence: [
                { emoji: '🦀', tone: 'coral', title: 'Claws grab', text: 'Crabs tear and hold food with their claws.' },
                { emoji: '🐢', tone: 'palm', title: 'Shells protect', text: 'A predator can’t bite through a hard shell.' },
                { emoji: '🐟', tone: 'sky', title: 'Fins and wings push', text: 'Fins push water and wings push air to move the animal.' }
            ]
        }
    },

    {
        zone: 'jungle',
        title: 'What Does a Seedling Need?',
        goal: 'Pick everything a young banana plant needs to grow.',
        siteEmoji: '🍌',
        restore: 'Banana plants are growing tall behind the village',
        rewards: ['banana'],
        clues: [
            { emoji: '🌱', title: 'Banana Seedling', text: 'Just planted in the garden.' },
            { emoji: '🍌', title: 'Banana Plant', text: 'Grows big in a sunny, wet spot.' }
        ],
        predictions: [
            { emoji: '🍬', label: 'Plants need sweets and toys to grow' },
            { emoji: '☀️', label: 'Plants need water, light and air to grow' }
        ],
        correctPrediction: 1,
        claim: 'Plants need water, light and air to live and grow.',
        explainChoices: [
            { text: 'Water, sunlight and air let the plant make its own food.', correct: true },
            { text: 'Plants grow best in a dark cupboard.', correct: false }
        ],
        transferQ: 'Your class plants a seed in a cup. Where should you put it?',
        transferChoices: ['On a sunny windowsill, with water', 'In a dark drawer, with no water'],
        transferCorrect: 0,
        hints: ['There are three right answers.', 'Water, sunlight and air.'],
        lab: {
            kind: 'choice',
            multi: true,
            instruction: 'Pick EVERYTHING the seedling needs. There is more than one!',
            options: [
                { id: 'water', label: 'Water', emoji: '💧' },
                { id: 'sun', label: 'Sunlight', emoji: '☀️' },
                { id: 'air', label: 'Air', emoji: '💨' },
                { id: 'candy', label: 'Sweets', emoji: '🍬', why: 'Plants make their own food. They don’t eat sweets!' },
                { id: 'dark', label: 'Darkness', emoji: '🌑', why: 'Plants need light, not darkness, to make food.' }
            ],
            correct: ['water', 'sun', 'air'],
            evidence: [
                { emoji: '💧', tone: 'sky', title: 'Water', text: 'Roots drink it in. Without it the leaves wilt.' },
                { emoji: '☀️', tone: 'sun', title: 'Light', text: 'Leaves use sunlight to make the plant’s food.' },
                { emoji: '💨', tone: 'lagoon', title: 'Air', text: 'Leaves take in a gas from the air to make food.' }
            ]
        }
    },

    {
        zone: 'beach',
        title: 'Clean Up the Beach',
        goal: 'Sort what you find on the tide line: what belongs on the beach, and litter to take away.',
        siteEmoji: '🧺',
        restore: 'Cowrie shells are shining on a clean beach',
        rewards: ['cowrie'],
        clues: [
            { emoji: '🐚', title: 'Shells and Seaweed', text: 'Part of the beach. Crabs and birds use them.' },
            { emoji: '🛍️', title: 'Plastic', text: 'Never rots away. Turtles can mistake a bag for food.' }
        ],
        predictions: [
            { emoji: '🤷', label: 'Litter on the beach does no harm' },
            { emoji: '🧹', label: 'Picking up litter helps beach animals' }
        ],
        correctPrediction: 1,
        claim: 'People can help the land and water by reducing litter and picking it up.',
        explainChoices: [
            { text: 'Litter can trap or choke animals, so removing it keeps them safe.', correct: true },
            { text: 'Plastic turns into sand in one day.', correct: false }
        ],
        transferQ: 'You finish a drink at the beach. What is the best choice?',
        transferChoices: ['Take the bottle home or put it in a bin', 'Bury it in the sand'],
        transferCorrect: 0,
        hints: ['Ask: did the sea make it, or did people make it?', 'Shells, seaweed and driftwood stay. Bottle, bag and can go.'],
        lab: {
            kind: 'match',
            instruction: 'Sort what you found on the tide line.',
            slots: [
                { id: 'keep', label: 'Belongs on the Beach', emoji: '🏖️', sub: 'Leave it for the animals' },
                { id: 'bin', label: 'Litter: Take it Away', emoji: '🗑️', sub: 'Recycle or bin it' }
            ],
            items: [
                { id: 'shell', label: 'Shell', emoji: '🐚', tone: 'sand', target: 'keep' },
                { id: 'seaweed', label: 'Seaweed', emoji: '🌿', tone: 'palm', target: 'keep' },
                { id: 'wood', label: 'Driftwood', emoji: '🪵', tone: 'bark', target: 'keep' },
                { id: 'bottle', label: 'Plastic Bottle', emoji: '🧴', tone: 'sky', target: 'bin' },
                { id: 'bag', label: 'Plastic Bag', emoji: '🛍️', tone: 'coral', target: 'bin' },
                { id: 'can', label: 'Drink Can', emoji: '🥫', tone: 'shell', target: 'bin' }
            ],
            evidence: [
                { emoji: '🐚', tone: 'sand', title: '3 things stay', text: 'Shells, seaweed and driftwood are homes and food for beach animals.' },
                { emoji: '🛍️', tone: 'coral', title: '3 things go', text: 'Bottles, bags and cans were made by people and harm wildlife.' },
                { emoji: '🧹', tone: 'palm', title: 'You made a difference', text: 'A cleaner tide line is safer for turtles and crabs.' }
            ]
        }
    },

    {
        zone: 'lagoon',
        title: 'Hide and Seek Lagoon',
        goal: 'Help each animal hide by moving it to the place its colours match.',
        siteEmoji: '🦑',
        restore: 'Reef squid are hiding in plain sight in the lagoon',
        rewards: ['squid'],
        clues: [
            { emoji: '🐟', title: 'Flounder', text: 'Flat, with pale, sandy speckles.' },
            { emoji: '🌾', title: 'Pipefish', text: 'Long, thin and green-brown, like a blade of grass.' },
            { emoji: '🪨', title: 'Stonefish', text: 'Lumpy and grey, like a rock.' }
        ],
        predictions: [
            { emoji: '🎯', label: 'Colours don’t matter for hiding' },
            { emoji: '🫥', label: 'Animals hide best where their colours match' }
        ],
        correctPrediction: 1,
        claim: 'Colours and shapes that match the surroundings help animals hide.',
        explainChoices: [
            { text: 'The flounder’s speckles match the sand, so predators miss it.', correct: true },
            { text: 'Bright colours always make animals invisible.', correct: false }
        ],
        transferQ: 'A green caterpillar sits on a green breadfruit leaf. Why is it hard for a bird to spot?',
        transferChoices: ['Its colour matches the leaf', 'It is too small to have any colour'],
        transferCorrect: 0,
        hints: ['Match the colours and shapes, not the names.', 'Flounder → Sand, Pipefish → Seagrass, Stonefish → Rocks.'],
        lab: {
            kind: 'match',
            instruction: 'Move each animal to its best hiding place.',
            slots: [
                { id: 'sand', label: 'Sandy Floor', emoji: '🏖️', sub: 'Pale and speckled' },
                { id: 'grass', label: 'Seagrass Meadow', emoji: '🌿', sub: 'Long green blades' },
                { id: 'rock', label: 'Rocky Rubble', emoji: '🪨', sub: 'Lumpy grey stones' }
            ],
            items: [
                { id: 'flounder', label: 'Flounder', emoji: '🐟', tone: 'sand', target: 'sand' },
                { id: 'pipefish', label: 'Pipefish', emoji: '🌾', tone: 'palm', target: 'grass' },
                { id: 'stonefish', label: 'Stonefish', emoji: '🪨', tone: 'shell', target: 'rock' }
            ],
            evidence: [
                { emoji: '🐟', tone: 'sand', title: 'Flounder vanished', text: 'On the sand, its speckles hid it completely.' },
                { emoji: '🌾', tone: 'palm', title: 'Pipefish blended in', text: 'It looked like one more blade of seagrass.' },
                { emoji: '🪨', tone: 'shell', title: 'Stonefish disguised', text: 'Among the rubble it looked like just another rock.' }
            ]
        }
    }
]);
