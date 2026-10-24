/**
 * GRADE 5 · missions 48–55 (missions 45–47 live in missions.js)
 * Topics: decomposers and matter cycling, the water cycle, Earth's water,
 * conservation of matter, gravity, shadows, protecting resources, where plant mass comes from.
 */
IHR.addMissions(5, [
    {
        id: 'habitat-g5-04',
        zone: 'jungle',
        title: 'Nature’s Recyclers',
        goal: 'Follow a fallen leaf as decomposers turn it back into food for new plants.',
        siteEmoji: '🍄',
        restore: 'Fungi and earthworms are recycling the jungle floor',
        rewards: ['mushroom', 'earthworm'],
        clues: [
            { emoji: '🍂', title: 'Leaf Litter', text: 'Dead leaves pile up under the trees.' },
            { emoji: '🍄', title: 'Fungi', text: 'Feed on dead material and break it down.' },
            { emoji: '🪱', title: 'Earthworms', text: 'Eat soil and leaves, leaving rich droppings.' }
        ],
        predictions: [
            { emoji: '🗑️', label: 'Dead leaves just pile up forever' },
            { emoji: '♻️', label: 'Decomposers turn dead leaves into nutrients for new growth' }
        ],
        correctPrediction: 1,
        claim: 'Decomposers break down dead matter and return nutrients to the soil for plants to use.',
        explainChoices: [
            { text: 'Fungi and worms break down leaves, so their nutrients go back into the soil.', correct: true },
            { text: 'Dead leaves float away into the sky.', correct: false }
        ],
        transferQ: 'A school starts a compost heap with fruit peel. What will the compost be good for?',
        transferChoices: ['Adding nutrients to the garden soil', 'Making plastic'],
        transferCorrect: 0,
        hints: ['Start with the leaf falling.', 'Leaf falls → Decomposers break it down → Nutrients in soil → Roots take them up.'],
        lab: {
            kind: 'sequence',
            instruction: 'Tap the steps in order to close the loop.',
            pool: [
                { id: 'soil', label: 'Nutrients enter the soil', emoji: '🟤', tone: 'bark' },
                { id: 'fall', label: 'A leaf falls', emoji: '🍂', tone: 'sun' },
                { id: 'roots', label: 'Roots take up nutrients', emoji: '🌱', tone: 'palm' },
                { id: 'decompose', label: 'Fungi and worms break it down', emoji: '🍄', tone: 'coral' }
            ],
            correctOrder: ['fall', 'decompose', 'soil', 'roots'],
            evidence: [
                { emoji: '🍄', tone: 'coral', title: 'Decomposers at work', text: 'Fungi and worms turned the leaf into soil.' },
                { emoji: '🟤', tone: 'bark', title: 'Nothing wasted', text: 'Nutrients from the old leaf were reused.' },
                { emoji: '🌱', tone: 'palm', title: 'New growth', text: 'Roots pulled those nutrients into new leaves.' }
            ]
        }
    },

    {
        id: 'habitat-g5-05',
        zone: 'lagoon',
        title: 'The Water Cycle',
        goal: 'Follow water from the lagoon to the sky, onto the island and back again.',
        siteEmoji: '☁️',
        restore: 'Rain clouds are refilling the island’s water tanks',
        rewards: [],
        clues: [
            { emoji: '☀️', title: 'Evaporation', text: 'Sun warms the water; vapour rises.' },
            { emoji: '☁️', title: 'Condensation', text: 'Vapour cools into tiny droplets: clouds.' },
            { emoji: '🌧️', title: 'Precipitation', text: 'Droplets join and fall as rain.' }
        ],
        predictions: [
            { emoji: '🛑', label: 'Water that falls as rain is gone forever' },
            { emoji: '🔁', label: 'Water cycles from sea to sky to land and back' }
        ],
        correctPrediction: 1,
        claim: 'Water moves between the ocean, the air and the land in a cycle powered by the sun.',
        explainChoices: [
            { text: 'The sun turns seawater into vapour, which forms clouds and falls as fresh rain.', correct: true },
            { text: 'Clouds are made of salt.', correct: false }
        ],
        transferQ: 'Rain is fresh even though it started as salty seawater. Why?',
        transferChoices: ['The salt is left behind when water evaporates', 'Clouds filter out the salt with nets'],
        transferCorrect: 0,
        hints: ['The sun starts it all.', 'Evaporate → Condense → Rain → Flow back.'],
        lab: {
            kind: 'sequence',
            instruction: 'Tap the stages in order, starting in the lagoon.',
            pool: [
                { id: 'rain', label: 'Rain falls on the island', emoji: '🌧️', tone: 'shell' },
                { id: 'evap', label: 'Water evaporates', emoji: '☀️', tone: 'sun' },
                { id: 'back', label: 'Water flows back to the sea', emoji: '🌊', tone: 'lagoon' },
                { id: 'cloud', label: 'Vapour forms clouds', emoji: '☁️', tone: 'sky' }
            ],
            correctOrder: ['evap', 'cloud', 'rain', 'back'],
            evidence: [
                { emoji: '☀️', tone: 'sun', title: 'Sun-powered', text: 'Heat from the sun drives the whole cycle.' },
                { emoji: '🧂', tone: 'shell', title: 'Salt stays behind', text: 'Only water evaporates, so rain is fresh.' },
                { emoji: '🔁', tone: 'lagoon', title: 'Round and round', text: 'The same water has cycled for billions of years.' }
            ]
        }
    },

    {
        id: 'habitat-g5-06',
        zone: 'beach',
        title: 'Where Is Earth’s Water?',
        goal: 'Read the graph to find where nearly all of Earth’s water is.',
        siteEmoji: '💧',
        restore: 'Every rainwater tank on the island is full',
        rewards: [],
        clues: [
            { emoji: '🌊', title: 'Oceans', text: 'Salty.' },
            { emoji: '🧊', title: 'Ice', text: 'Fresh, but frozen at the poles and on mountains.' },
            { emoji: '🏞️', title: 'Lakes and Rivers', text: 'Fresh and easy to use.' }
        ],
        predictions: [
            { emoji: '🏞️', label: 'Most of Earth’s water is in lakes and rivers' },
            { emoji: '🌊', label: 'Almost all of Earth’s water is salty ocean' }
        ],
        correctPrediction: 1,
        claim: 'Nearly all of Earth’s water is salty ocean; only a tiny amount is fresh and easy to reach.',
        explainChoices: [
            { text: 'The ocean bar is about 96.5%, far taller than every other bar.', correct: true },
            { text: 'Lakes and rivers hold half of Earth’s water.', correct: false }
        ],
        transferQ: 'Why do islands work so hard to save rainwater?',
        transferChoices: ['Fresh, easy-to-reach water is very scarce', 'Rain is saltier than the sea'],
        transferCorrect: 0,
        hints: ['Find the tallest bar.', 'The ocean holds about 96.5% of Earth’s water.'],
        lab: {
            kind: 'choice',
            instruction: 'Share of all Earth’s water (%). What does the graph show?',
            visual: {
                type: 'bars',
                labels: ['Oceans', 'Ice', 'Underground', 'Lakes, rivers, air'],
                series: [{ label: 'Share of Earth’s water (%)', tone: 'sky', values: [96.5, 1.7, 1.7, 0.1] }]
            },
            options: [
                { id: 'ocean', label: 'Almost all of Earth’s water is salty ocean', emoji: '🌊' },
                { id: 'lakes', label: 'Most water is in lakes and rivers', emoji: '🏞️', why: 'Lakes, rivers and air together are under 0.1%.' },
                { id: 'ice', label: 'Ice holds most of the water', emoji: '🧊', why: 'Ice is only about 1.7%.' }
            ],
            correct: ['ocean'],
            evidence: [
                { emoji: '🌊', tone: 'sky', title: 'Ocean: 96.5%', text: 'Nearly all water on Earth is salty.' },
                { emoji: '🧊', tone: 'shell', title: 'Ice and ground: 3.4%', text: 'Most fresh water is frozen or underground.' },
                { emoji: '🏞️', tone: 'lagoon', title: 'Easy water: under 0.1%', text: 'Lakes and rivers are a tiny sliver.' }
            ]
        }
    },

    {
        id: 'habitat-g5-07',
        zone: 'beach',
        title: 'Salt from the Sea',
        goal: 'Dry out a dish of seawater in the sun and weigh what is left.',
        siteEmoji: '🧂',
        restore: 'Salt crystals are sparkling in the drying dish',
        rewards: [],
        clues: [
            { emoji: '🌊', title: 'Seawater', text: 'About 35 g of salt in every litre.' },
            { emoji: '☀️', title: 'Evaporation', text: 'The water leaves as vapour.' },
            { emoji: '⚖️', title: 'Scale', text: 'Measures mass in grams.' }
        ],
        predictions: [
            { emoji: '💨', label: 'Salt vanishes when it dissolves' },
            { emoji: '⚖️', label: 'Dissolved salt is still there and keeps its mass' }
        ],
        correctPrediction: 1,
        claim: 'When salt dissolves in water it is still there, and its mass does not change.',
        explainChoices: [
            { text: '35 g of salt went into the water, and 35 g of crystals were left when it dried.', correct: true },
            { text: 'Sunlight turns water into salt.', correct: false }
        ],
        transferQ: 'You dissolve 10 g of sugar in 200 g of water. What is the total mass?',
        transferChoices: ['210 g', '200 g'],
        transferCorrect: 0,
        hints: ['Compare the salt bar before and after.', 'It was 35 g before and 35 g after.'],
        lab: {
            kind: 'choice',
            instruction: 'What happened to the salt?',
            visual: {
                type: 'sites',
                sites: [
                    { label: 'Before: seawater in a dish', emoji: '🥣', tone: 'sky', metrics: [
                        { label: 'Water', value: 1000, max: 1000, unit: ' g' },
                        { label: 'Salt (dissolved, invisible)', value: 35, max: 1000, unit: ' g' }
                    ] },
                    { label: 'After: dried in the sun', emoji: '☀️', tone: 'sun', metrics: [
                        { label: 'Water', value: 0, max: 1000, unit: ' g' },
                        { label: 'Salt crystals left', value: 35, max: 1000, unit: ' g' }
                    ] }
                ]
            },
            options: [
                { id: 'kept', label: 'It was there all along: still 35 g', emoji: '⚖️' },
                { id: 'new', label: 'The sun made new salt', emoji: '☀️', why: 'The mass of salt didn’t grow. It was 35 g both times.' },
                { id: 'gone', label: 'The salt disappeared, then came back from nowhere', emoji: '💨', why: 'Dissolved salt is too small to see, but it never left.' }
            ],
            correct: ['kept'],
            evidence: [
                { emoji: '⚖️', tone: 'sun', title: '35 g in, 35 g out', text: 'The mass of salt was conserved.' },
                { emoji: '💨', tone: 'sky', title: 'Only water left', text: '1000 g of water evaporated into the air.' },
                { emoji: '🧂', tone: 'shell', title: 'Invisible ≠ gone', text: 'Dissolved particles are too small to see.' }
            ]
        }
    },

    {
        id: 'habitat-g5-08',
        zone: 'jungle',
        title: 'Why Coconuts Fall',
        goal: 'Explain why a ripe coconut always falls down, even on a perfectly calm day.',
        siteEmoji: '🥥',
        restore: 'Ripe coconuts are dropping onto soft sand',
        rewards: [],
        clues: [
            { emoji: '🥥', title: 'Ripe Coconut', text: 'Its stem weakens and lets go.' },
            { emoji: '🌍', title: 'Gravity', text: 'A pull toward the centre of the Earth.' },
            { emoji: '🍃', title: 'Calm Day', text: 'No wind at all, and still they drop.' }
        ],
        predictions: [
            { emoji: '🌬️', label: 'Wind is what makes coconuts fall' },
            { emoji: '🌍', label: 'Earth’s gravity pulls coconuts down' }
        ],
        correctPrediction: 1,
        claim: 'Gravity pulls objects toward the centre of the Earth.',
        explainChoices: [
            { text: 'Coconuts fall straight down even on still days, because gravity pulls them.', correct: true },
            { text: 'Coconuts fall because they are tired.', correct: false }
        ],
        transferQ: 'Children in Brazil, on the other side of the Earth, drop a ball. Which way does it fall?',
        transferChoices: ['Down, toward the Earth’s centre', 'Up, into space'],
        transferCorrect: 0,
        hints: ['Read the Calm Day clue.', 'The pull is gravity, toward Earth’s centre.'],
        lab: {
            kind: 'choice',
            instruction: 'Why does the coconut fall?',
            options: [
                { id: 'gravity', label: 'Earth’s gravity pulls it toward the centre of the Earth', emoji: '🌍' },
                { id: 'wind', label: 'The wind pushes it down', emoji: '🌬️', why: 'Coconuts fall even on calm days with no wind.' },
                { id: 'want', label: 'It wants to be on the ground', emoji: '💭', why: 'Coconuts can’t want things. A force is acting on them.' }
            ],
            correct: ['gravity'],
            evidence: [
                { emoji: '🌍', tone: 'lagoon', title: 'Always down', text: 'Gravity pulls toward Earth’s centre everywhere on the planet.' },
                { emoji: '🍃', tone: 'palm', title: 'No wind needed', text: 'On a calm day the coconut still fell.' },
                { emoji: '🥥', tone: 'bark', title: 'Stem lets go', text: 'Once the stem breaks, gravity takes over.' }
            ]
        }
    },

    {
        id: 'habitat-g5-09',
        zone: 'beach',
        title: 'Shadow Clock',
        goal: 'Measure a palm tree’s shadow through the day and find the pattern.',
        siteEmoji: '🕰️',
        restore: 'Children are using the palm’s shadow as a sundial',
        rewards: [],
        clues: [
            { emoji: '☀️', title: 'Sun Height', text: 'Low in the morning, high at noon.' },
            { emoji: '🌴', title: 'Palm Tree', text: '5 metres tall.' },
            { emoji: '📏', title: 'Shadow', text: 'Measured every two hours.' }
        ],
        predictions: [
            { emoji: '🟰', label: 'Shadows never change' },
            { emoji: '📏', label: 'Shadows are longest early and late, and shortest at noon' }
        ],
        correctPrediction: 1,
        claim: 'The length and direction of shadows change during the day as the sun moves across the sky.',
        explainChoices: [
            { text: 'At noon the sun is nearly overhead, so the shadow is shortest.', correct: true },
            { text: 'The palm shrinks at midday.', correct: false }
        ],
        transferQ: 'Your shadow is very long and points west. What time is it most likely?',
        transferChoices: ['Early morning', 'Noon'],
        transferCorrect: 0,
        hints: ['Look at the bar shapes: a valley in the middle.', 'Long, short, long again.'],
        lab: {
            kind: 'choice',
            instruction: 'Shadow length of a 5 m palm tree. What pattern do you see?',
            visual: {
                type: 'bars',
                labels: ['8 am', '10 am', 'Noon', '2 pm', '4 pm'],
                series: [{ label: 'Shadow length (m)', tone: 'shell', values: [8.7, 2.9, 0.5, 2.9, 8.7] }]
            },
            options: [
                { id: 'valley', label: 'Long in the morning, shortest at noon, long again later', emoji: '📏' },
                { id: 'noon', label: 'Shadows are longest at noon', emoji: '☀️', why: 'The noon bar is the shortest, only 0.5 m.' },
                { id: 'same', label: 'Shadows stay the same all day', emoji: '🟰', why: '8.7 m vs 0.5 m is a huge change.' }
            ],
            correct: ['valley'],
            evidence: [
                { emoji: '🌅', tone: 'coral', title: '8.7 m at 8 am', text: 'A low sun casts long shadows.' },
                { emoji: '☀️', tone: 'sun', title: '0.5 m at noon', text: 'Near the equator the noon sun is almost overhead.' },
                { emoji: '🧭', tone: 'sky', title: 'Direction flips', text: 'Morning shadows point west; afternoon shadows point east.' }
            ]
        }
    },

    {
        id: 'habitat-g5-10',
        zone: 'beach',
        title: 'Island Action Plan',
        goal: 'Choose every action that helps protect the island’s land and sea.',
        siteEmoji: '♻️',
        restore: 'Volunteers have cleared the reef and beach of litter',
        rewards: [],
        clues: [
            { emoji: '🧴', title: 'Plastic', text: 'Takes hundreds of years to break down.' },
            { emoji: '🔥', title: 'Open Burning', text: 'Smoke harms lungs and pollutes the air.' },
            { emoji: '♻️', title: 'Reduce, Reuse, Recycle', text: 'Less waste to begin with.' }
        ],
        predictions: [
            { emoji: '🤷', label: 'One community can’t make a difference' },
            { emoji: '🤝', label: 'Simple community actions protect land and sea' }
        ],
        correctPrediction: 1,
        claim: 'Communities use science ideas to protect Earth’s resources and environment.',
        explainChoices: [
            { text: 'Less plastic and composted waste means less litter reaching the reef.', correct: true },
            { text: 'Burning plastic makes it disappear safely.', correct: false }
        ],
        transferQ: 'A resort wants to cut its plastic waste. Which plan makes the biggest difference?',
        transferChoices: ['Give guests refillable bottles and a water station', 'Hand out more small plastic bottles'],
        transferCorrect: 0,
        hints: ['Three actions help; two cause pollution.', 'Refillable bottles, composting and reef clean-ups.'],
        lab: {
            kind: 'choice',
            multi: true,
            instruction: 'Pick EVERY action that helps.',
            options: [
                { id: 'refill', label: 'Switch to refillable water bottles', emoji: '🚰' },
                { id: 'compost', label: 'Compost food waste', emoji: '🌱' },
                { id: 'cleanup', label: 'Join a beach and reef clean-up', emoji: '🧤' },
                { id: 'burn', label: 'Burn plastic rubbish in the open', emoji: '🔥', why: 'Burning plastic releases toxic smoke.' },
                { id: 'dump', label: 'Dump rubbish into the lagoon', emoji: '🌊', why: 'It harms reef animals and washes back onto beaches.' }
            ],
            correct: ['refill', 'compost', 'cleanup'],
            evidence: [
                { emoji: '🚰', tone: 'sky', title: 'Reduce', text: 'Refill stations cut thousands of plastic bottles.' },
                { emoji: '🌱', tone: 'palm', title: 'Recycle nutrients', text: 'Compost feeds gardens instead of filling bins.' },
                { emoji: '🧤', tone: 'coral', title: 'Clean up', text: 'Removing litter protects turtles and reef fish.' }
            ]
        }
    },

    {
        id: 'habitat-g5-11',
        zone: 'jungle',
        title: 'Where Does a Tree’s Mass Come From?',
        goal: 'Weigh a breadfruit sapling and its soil, then weigh them again five years later.',
        siteEmoji: '⚖️',
        restore: 'The breadfruit tree is heavy with fruit',
        rewards: [],
        clues: [
            { emoji: '💨', title: 'Carbon Dioxide', text: 'A gas in the air.' },
            { emoji: '💧', title: 'Water', text: 'Pulled up through the roots.' },
            { emoji: '⚖️', title: 'Experiment', text: 'Weigh the tree and the soil.' }
        ],
        predictions: [
            { emoji: '🟫', label: 'Trees are built from soil' },
            { emoji: '💨', label: 'Trees are built mostly from air and water' }
        ],
        correctPrediction: 1,
        claim: 'Plants get the materials they need to grow mainly from air and water.',
        explainChoices: [
            { text: 'The tree gained 50 kg while the soil lost only 0.2 kg, so the mass came from air and water.', correct: true },
            { text: 'Trees eat soil like food.', correct: false }
        ],
        transferQ: 'A plant sealed in a jar with water grows heavier. Which gas from the air inside did it use?',
        transferChoices: ['Carbon dioxide', 'Helium'],
        transferCorrect: 0,
        hints: ['How much did the soil change? How much did the tree change?', 'Soil lost 0.2 kg; tree gained 50 kg.'],
        lab: {
            kind: 'choice',
            instruction: 'The tree gained 50 kg. Where did that mass come from?',
            visual: {
                type: 'sites',
                sites: [
                    { label: 'Year 0', emoji: '🌱', tone: 'palm', metrics: [
                        { label: 'Tree mass', value: 2, max: 100, unit: ' kg' },
                        { label: 'Soil mass', value: 100, max: 100, unit: ' kg' }
                    ] },
                    { label: 'Year 5', emoji: '🌳', tone: 'bark', metrics: [
                        { label: 'Tree mass', value: 52, max: 100, unit: ' kg' },
                        { label: 'Soil mass', value: 99.8, max: 100, unit: ' kg' }
                    ] }
                ]
            },
            options: [
                { id: 'air', label: 'Mostly from air (CO₂) and water', emoji: '💨' },
                { id: 'soil', label: 'From the soil', emoji: '🟫', why: 'The soil lost only 0.2 kg, but the tree gained 50 kg.' },
                { id: 'light', label: 'From sunlight itself', emoji: '☀️', why: 'Sunlight gives energy, but it has no mass to build wood.' }
            ],
            correct: ['air'],
            evidence: [
                { emoji: '🌳', tone: 'bark', title: 'Tree: +50 kg', text: 'Wood, leaves and roots were built in five years.' },
                { emoji: '🟫', tone: 'sand', title: 'Soil: −0.2 kg', text: 'Only a tiny amount of minerals came from the soil.' },
                { emoji: '💨', tone: 'sky', title: 'Built from air', text: 'Carbon from CO₂ plus water made almost all the new mass.' }
            ]
        }
    }
]);
