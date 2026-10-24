/**
 * GRADE 6 · missions 59–66 (missions 56–58 live in missions.js)
 * Topics: cells, symbiosis, sea level rise, resource use, natural selection,
 * monsoon climate, tsunami science, blue carbon.
 */
IHR.addMissions(6, [
    {
        id: 'habitat-g6-04',
        zone: 'jungle',
        title: 'Inside a Leaf Cell',
        goal: 'Match each part of a plant cell to the job it does.',
        siteEmoji: '🔬',
        restore: 'A microscope station has opened in the jungle',
        rewards: [],
        clues: [
            { emoji: '🔬', title: 'Microscope', text: 'Shows that a leaf is made of tiny cells.' },
            { emoji: '🟢', title: 'Chloroplast', text: 'Green, packed with the chemical that captures light.' },
            { emoji: '🟣', title: 'Nucleus', text: 'Holds the cell’s DNA.' }
        ],
        predictions: [
            { emoji: '📦', label: 'Cells are empty boxes' },
            { emoji: '⚙️', label: 'Cells contain parts that each do a job' }
        ],
        correctPrediction: 1,
        claim: 'All living things are made of cells, and each cell part does a job.',
        explainChoices: [
            { text: 'Chloroplasts capture light to make sugar for the plant.', correct: true },
            { text: 'The nucleus makes the leaf green.', correct: false }
        ],
        transferQ: 'Animal cells have no cell wall and no chloroplasts. Which job can an animal cell NOT do?',
        transferChoices: ['Make food from sunlight', 'Control what enters the cell'],
        transferCorrect: 0,
        hints: ['The clue cards describe two of the four parts.', 'Chloroplast → food, wall → support, nucleus → DNA, membrane → in and out.'],
        lab: {
            kind: 'match',
            instruction: 'Match each cell part to its job.',
            slotCols: 2,
            slots: [
                { id: 'food', label: 'Makes food from light', emoji: '☀️' },
                { id: 'support', label: 'Stiff outer layer for support', emoji: '🧱' },
                { id: 'dna', label: 'Holds the instructions (DNA)', emoji: '🧬' },
                { id: 'gate', label: 'Controls what goes in and out', emoji: '🚪' }
            ],
            items: [
                { id: 'chloro', label: 'Chloroplast', emoji: '🟢', tone: 'palm', target: 'food' },
                { id: 'wall', label: 'Cell wall', emoji: '🟫', tone: 'bark', target: 'support' },
                { id: 'nucleus', label: 'Nucleus', emoji: '🟣', tone: 'orchid', target: 'dna' },
                { id: 'membrane', label: 'Cell membrane', emoji: '⭕', tone: 'coral', target: 'gate' }
            ],
            evidence: [
                { emoji: '🟢', tone: 'palm', title: 'Food factory', text: 'Chloroplasts run photosynthesis.' },
                { emoji: '🟣', tone: 'orchid', title: 'Control centre', text: 'The nucleus holds the DNA that directs the cell.' },
                { emoji: '🟫', tone: 'bark', title: 'Plant-only parts', text: 'Cell walls and chloroplasts are found in plant cells, not animal cells.' }
            ]
        }
    },

    {
        id: 'habitat-g6-05',
        zone: 'lagoon',
        title: 'Reef Partnerships',
        goal: 'Classify each pair of reef organisms by the kind of relationship they share.',
        siteEmoji: '🤝',
        restore: 'Cleaner wrasse are busy at their cleaning stations',
        rewards: ['cleaner_wrasse'],
        clues: [
            { emoji: '🪸', title: 'Coral & Algae', text: 'Algae make food; coral gives them shelter.' },
            { emoji: '🧽', title: 'Cleaner Wrasse', text: 'Eats parasites off bigger fish.' },
            { emoji: '🦈', title: 'Remora', text: 'Hitches a ride on a shark and eats scraps.' }
        ],
        predictions: [
            { emoji: '🥊', label: 'Reef animals only ever fight each other' },
            { emoji: '🤝', label: 'Reef organisms have many kinds of relationships, including helping each other' }
        ],
        correctPrediction: 1,
        claim: 'Organisms interact in patterns such as predation, parasitism and mutualism.',
        explainChoices: [
            { text: 'The wrasse gets a meal and the grouper gets cleaned, so both benefit.', correct: true },
            { text: 'A parasite helps its host grow.', correct: false }
        ],
        transferQ: 'A clownfish lives in a sea anemone and chases off fish that eat anemones. What relationship is this?',
        transferChoices: ['Mutualism', 'Parasitism'],
        transferCorrect: 0,
        hints: ['For each pair ask: who gains, who loses?', 'Both gain → mutualism; one gains, other unaffected → commensalism; one harmed → parasitism; one eaten → predation.'],
        lab: {
            kind: 'match',
            instruction: 'Sort each pair by its relationship.',
            slotCols: 2,
            slots: [
                { id: 'mutual', label: 'Mutualism: both benefit', emoji: '🤝' },
                { id: 'commensal', label: 'Commensalism: one benefits, other unaffected', emoji: '🙂' },
                { id: 'parasite', label: 'Parasitism: one benefits, other harmed', emoji: '🩸' },
                { id: 'predation', label: 'Predation: one eats the other', emoji: '🦷' }
            ],
            items: [
                { id: 'coral', label: 'Coral + algae', emoji: '🪸', tone: 'coral', target: 'mutual' },
                { id: 'wrasse', label: 'Cleaner wrasse + grouper', emoji: '🧽', tone: 'sky', target: 'mutual' },
                { id: 'remora', label: 'Remora + shark', emoji: '🦈', tone: 'shell', target: 'commensal' },
                { id: 'louse', label: 'Fish louse + snapper', emoji: '🪲', tone: 'orchid', target: 'parasite' },
                { id: 'shark', label: 'Reef shark + parrotfish', emoji: '🐠', tone: 'palm', target: 'predation' }
            ],
            evidence: [
                { emoji: '🤝', tone: 'sky', title: 'Win–win', text: 'Coral and algae, and wrasse and grouper, both gain.' },
                { emoji: '🦈', tone: 'shell', title: 'Free ride', text: 'The remora gains; the shark is barely affected.' },
                { emoji: '🩸', tone: 'orchid', title: 'Win–lose', text: 'The louse feeds on the snapper and weakens it.' }
            ]
        }
    },

    {
        id: 'habitat-g6-06',
        zone: 'beach',
        title: 'Rising Seas',
        goal: 'Use a model of a low island to see how sea level rise affects flooding.',
        siteEmoji: '📈',
        restore: 'Mangroves and raised shorelines are protecting the island’s edge',
        rewards: [],
        clues: [
            { emoji: '🌡️', title: 'Warming', text: 'Ice melts and seawater expands as it warms.' },
            { emoji: '🏝️', title: 'Low Islands', text: 'Most Maldives land is less than 1 m above sea level.' },
            { emoji: '📊', title: 'Model', text: 'Shows flooding for different rises on an example island.' }
        ],
        predictions: [
            { emoji: '🟰', label: 'A little sea level rise makes no difference' },
            { emoji: '⚠️', label: 'Each rise floods more land on a low island' }
        ],
        correctPrediction: 1,
        claim: 'Rising global temperatures are raising sea levels, which is a serious risk for low-lying islands.',
        explainChoices: [
            { text: 'Most land is less than 1 m above the sea, so even a 0.5 m rise floods a lot of it.', correct: true },
            { text: 'Islands rise up along with the sea.', correct: false }
        ],
        transferQ: 'Which action tackles the CAUSE of sea level rise, not just its effects?',
        transferChoices: ['Cutting greenhouse gases from burning fuel', 'Building a higher sea wall'],
        transferCorrect: 0,
        hints: ['Look at how fast the bars grow.', 'Each step floods much more land than the one before.'],
        lab: {
            kind: 'choice',
            instruction: 'Model island: land flooded at high tide for each sea level rise. What does it show?',
            visual: {
                type: 'bars',
                labels: ['Today', '+0.25 m', '+0.5 m', '+1 m'],
                series: [{ label: 'Land flooded at high tide (%)', tone: 'coral', values: [2, 10, 30, 75] }]
            },
            options: [
                { id: 'speeds', label: 'Even small rises flood more land, and the effect speeds up', emoji: '⚠️' },
                { id: 'only2', label: 'Sea level rise only matters above 2 m', emoji: '📏', why: 'Three-quarters of this island floods at just +1 m.' },
                { id: 'flat', label: 'Flooding stays about the same', emoji: '🟰', why: '2% to 75% is a huge jump.' }
            ],
            correct: ['speeds'],
            evidence: [
                { emoji: '📈', tone: 'coral', title: '2% → 75%', text: 'A 1 m rise floods most of a low island in this model.' },
                { emoji: '🏝️', tone: 'sand', title: 'Low land', text: 'Most Maldives land sits less than 1 m above the sea.' },
                { emoji: '🧪', tone: 'sky', title: 'A model', text: 'Real islands differ, but the pattern of risk is clear.' }
            ]
        }
    },

    {
        id: 'habitat-g6-07',
        zone: 'beach',
        title: 'Fresh Water for Visitors',
        goal: 'Compare an island’s fresh water use with the rainwater it can collect as visitor numbers grow.',
        siteEmoji: '🚰',
        restore: 'A water-saving plan is keeping the island’s tanks full',
        rewards: [],
        clues: [
            { emoji: '🧳', title: 'Visitors', text: 'More guests every year.' },
            { emoji: '🛢️', title: 'Rain Tanks', text: 'Collect about the same amount each year.' },
            { emoji: '🏭', title: 'Desalination', text: 'Makes fresh water but uses lots of energy.' }
        ],
        predictions: [
            { emoji: '🟰', label: 'More visitors make no difference to water' },
            { emoji: '📈', label: 'More people need more fresh water than rain can supply' }
        ],
        correctPrediction: 1,
        claim: 'As more people use a resource, the impact on the environment grows unless use is managed.',
        explainChoices: [
            { text: 'Water use rose past the rain collected in 2010 and keeps climbing.', correct: true },
            { text: 'Rainfall grows when more people visit.', correct: false }
        ],
        transferQ: 'Which plan reduces water demand on a busy island?',
        transferChoices: ['Low-flow showers and fixing leaks', 'Filling more swimming pools'],
        transferCorrect: 0,
        hints: ['Compare the blue bars with the green bars each year.', 'After 2000, use is bigger than the rain collected.'],
        lab: {
            kind: 'choice',
            instruction: 'Example island, thousands of litres per day. What do the bars show?',
            visual: {
                type: 'bars',
                labels: ['2000', '2010', '2020', '2030 (forecast)'],
                series: [
                    { label: 'Fresh water used', tone: 'sky', values: [100, 180, 300, 450] },
                    { label: 'Rainwater collected', tone: 'palm', values: [120, 120, 125, 125] }
                ]
            },
            options: [
                { id: 'gap', label: 'Use is outgrowing the rain supply, so the island must save water or make more', emoji: '📈' },
                { id: 'enough', label: 'Rain will always be enough', emoji: '🌧️', why: 'Since 2010, use has been higher than the rain collected.' },
                { id: 'none', label: 'Using more water has no effect', emoji: '🟰', why: 'The gap must be filled by energy-hungry desalination.' }
            ],
            correct: ['gap'],
            evidence: [
                { emoji: '📈', tone: 'sky', title: 'Use ×4.5', text: 'From 100 to a forecast 450 thousand litres a day.' },
                { emoji: '🌧️', tone: 'palm', title: 'Rain is flat', text: 'Rain tanks collect about the same each year.' },
                { emoji: '🏭', tone: 'shell', title: 'The gap costs energy', text: 'Desalination fills the gap but burns fuel.' }
            ]
        }
    },

    {
        id: 'habitat-g6-08',
        zone: 'lagoon',
        title: 'Heat-Tough Corals',
        goal: 'Track how a reef’s coral population changes over three heatwaves.',
        siteEmoji: '🌡️',
        restore: 'Heat-tough corals are spreading across the reef',
        rewards: [],
        clues: [
            { emoji: '🌡️', title: 'Heatwaves', text: 'Kill many corals.' },
            { emoji: '🪸', title: 'Variation', text: 'Some corals already handle heat better than others.' },
            { emoji: '👶', title: 'Offspring', text: 'Inherit traits from the corals that survive.' }
        ],
        predictions: [
            { emoji: '🧠', label: 'Corals choose to adapt when it gets hot' },
            { emoji: '🧬', label: 'Corals that already handle heat survive and pass the trait on' }
        ],
        correctPrediction: 1,
        claim: 'Natural selection makes helpful traits more common in a population over generations.',
        explainChoices: [
            { text: 'Heat-tolerant corals survived each heatwave and reproduced, so their share grew.', correct: true },
            { text: 'Every coral changed its own traits during the heatwave.', correct: false }
        ],
        transferQ: 'Some reef fish can already cope with warmer water. After many hot years, what would you expect?',
        transferChoices: ['More of the population will be warm-tolerant', 'The fish will grow fur'],
        transferCorrect: 0,
        hints: ['Watch how the bars change after each heatwave.', 'Survivors pass on the trait, so its share grows.'],
        lab: {
            kind: 'choice',
            instruction: 'Share of heat-tolerant corals on the reef. What explains the pattern?',
            visual: {
                type: 'bars',
                labels: ['Before', 'After 1st', 'After 2nd', 'After 3rd'],
                series: [{ label: 'Heat-tolerant corals (%)', tone: 'coral', values: [10, 25, 45, 65] }]
            },
            options: [
                { id: 'selection', label: 'Heatwaves selected heat-tolerant corals, so they became more common', emoji: '🧬' },
                { id: 'choose', label: 'Corals decided to become heat-tolerant', emoji: '🧠', why: 'Individuals can’t choose their traits. Survivors pass on traits they already had.' },
                { id: 'none', label: 'Heatwaves had no effect', emoji: '🟰', why: 'The share rose from 10% to 65%.' }
            ],
            correct: ['selection'],
            evidence: [
                { emoji: '📈', tone: 'coral', title: '10% → 65%', text: 'The trait became much more common.' },
                { emoji: '🧬', tone: 'orchid', title: 'Inherited', text: 'Surviving corals passed heat tolerance to their offspring.' },
                { emoji: '⚠️', tone: 'sun', title: 'Not a rescue', text: 'Selection is slow; most corals still died in each heatwave.' }
            ]
        }
    },

    {
        id: 'habitat-g6-09',
        zone: 'jungle',
        title: 'Two Monsoons',
        goal: 'Sort features of island weather into the two monsoon seasons.',
        siteEmoji: '🧭',
        restore: 'Fishing dhonis are timing their trips to the monsoon winds',
        rewards: [],
        clues: [
            { emoji: '🌬️', title: 'Iruvai', text: 'Northeast winds, roughly December to April.' },
            { emoji: '🌧️', title: 'Hulhangu', text: 'Southwest winds, roughly May to November.' },
            { emoji: '🌍', title: 'Cause', text: 'Land and sea heat up differently as the seasons change.' }
        ],
        predictions: [
            { emoji: '🎲', label: 'Wind and rain on the island are the same all year' },
            { emoji: '🧭', label: 'Winds switch direction with the seasons, bringing wet and dry times' }
        ],
        correctPrediction: 1,
        claim: 'Large wind patterns that change with the seasons shape an island’s climate.',
        explainChoices: [
            { text: 'Southwest winds carry moist ocean air and bring more rain from May to November.', correct: true },
            { text: 'The wind never changes direction.', correct: false }
        ],
        transferQ: 'A fishing crew wants calm, dry weather for a long trip. Which season should they plan for?',
        transferChoices: ['Iruvai (northeast monsoon)', 'Hulhangu (southwest monsoon)'],
        transferCorrect: 0,
        hints: ['Wet and stormy, or dry and sunny?', 'Iruvai: northeast winds, dry, holiday season. Hulhangu: southwest winds, heavy rain.'],
        lab: {
            kind: 'match',
            instruction: 'Sort each feature into its monsoon.',
            slots: [
                { id: 'iruvai', label: 'Iruvai · Northeast', emoji: '🌬️', sub: 'About December to April' },
                { id: 'hulhangu', label: 'Hulhangu · Southwest', emoji: '🌧️', sub: 'About May to November' }
            ],
            items: [
                { id: 'ne', label: 'Winds from the northeast', emoji: '↙️', tone: 'sky', target: 'iruvai' },
                { id: 'dry', label: 'Drier, sunnier days', emoji: '☀️', tone: 'sun', target: 'iruvai' },
                { id: 'tourist', label: 'Busiest beach-holiday season', emoji: '🏖️', tone: 'sand', target: 'iruvai' },
                { id: 'sw', label: 'Winds from the southwest', emoji: '↗️', tone: 'lagoon', target: 'hulhangu' },
                { id: 'rain', label: 'Heavy rain and storms', emoji: '⛈️', tone: 'shell', target: 'hulhangu' },
                { id: 'tanks', label: 'Rain tanks fill up fast', emoji: '🛢️', tone: 'bark', target: 'hulhangu' }
            ],
            evidence: [
                { emoji: '🌬️', tone: 'sky', title: 'Iruvai is drier', text: 'Northeast winds bring the calm, dry season.' },
                { emoji: '🌧️', tone: 'shell', title: 'Hulhangu is wetter', text: 'Southwest winds carry moist air from the open ocean.' },
                { emoji: '🧭', tone: 'lagoon', title: 'A yearly flip', text: 'The wind reverses as land and sea heat differently.' }
            ]
        }
    },

    {
        id: 'habitat-g6-10',
        zone: 'beach',
        title: 'Tsunami Timeline',
        goal: 'Put the events of a tsunami in order, from the sea floor to a distant island.',
        siteEmoji: '🌍',
        restore: 'A tsunami warning tower now stands on the beach',
        rewards: [],
        clues: [
            { emoji: '🌍', title: '26 December 2004', text: 'A huge earthquake struck off Sumatra.' },
            { emoji: '🌊', title: 'Speed', text: 'Tsunamis cross the deep ocean at about 700 km/h.' },
            { emoji: '⏱️', title: 'Arrival', text: 'The waves reached the Maldives about 3 hours later.' }
        ],
        predictions: [
            { emoji: '🌬️', label: 'Tsunamis are caused by strong wind' },
            { emoji: '🌍', label: 'Tsunamis start with a sudden movement of the sea floor' }
        ],
        correctPrediction: 1,
        claim: 'Earth processes like earthquakes can cause hazards far away; understanding them helps us prepare.',
        explainChoices: [
            { text: 'The sea floor jolted, pushing up the huge volume of water above it.', correct: true },
            { text: 'A tsunami is just a big storm wave.', correct: false }
        ],
        transferQ: 'An earthquake strikes far across the ocean. Why do warning centres still alert the Maldives?',
        transferChoices: ['Tsunami waves can cross an ocean in a few hours', 'Earthquakes travel through the air'],
        transferCorrect: 0,
        hints: ['It starts deep under the sea.', 'Earthquake → Water pushed up → Waves race across the ocean → Waves reach islands.'],
        lab: {
            kind: 'sequence',
            loop: false,
            instruction: 'Tap the events in order.',
            pool: [
                { id: 'race', label: 'Waves race across the ocean', emoji: '🌊', tone: 'sky' },
                { id: 'quake', label: 'Earthquake shifts the sea floor', emoji: '🌍', tone: 'bark' },
                { id: 'arrive', label: 'Waves reach distant islands', emoji: '🏝️', tone: 'sand' },
                { id: 'push', label: 'Water is pushed up', emoji: '⬆️', tone: 'lagoon' }
            ],
            correctOrder: ['quake', 'push', 'race', 'arrive'],
            evidence: [
                { emoji: '🌍', tone: 'bark', title: 'Sea floor jolt', text: 'The seabed moved metres in moments.' },
                { emoji: '✈️', tone: 'sky', title: 'Jet-plane speed', text: 'In deep water the wave raced along at about 700 km/h.' },
                { emoji: '⏱️', tone: 'sand', title: 'Hours to prepare', text: 'Warnings can use that travel time to save lives.' }
            ]
        }
    },

    {
        id: 'habitat-g6-11',
        zone: 'jungle',
        title: 'Blue Carbon',
        goal: 'Choose the habitats that pull carbon dioxide out of the air and lock it away.',
        siteEmoji: '🌳',
        restore: 'Mangroves and seagrass are locking carbon away',
        rewards: [],
        clues: [
            { emoji: '🌳', title: 'Mangroves', text: 'Muddy roots trap leaves and carbon-rich soil.' },
            { emoji: '🌱', title: 'Seagrass', text: 'Underwater meadows that bury carbon in the sand.' },
            { emoji: '🏗️', title: 'Car Park', text: 'Concrete over bare ground.' }
        ],
        predictions: [
            { emoji: '🏗️', label: 'Paving land helps store carbon' },
            { emoji: '🌿', label: 'Mangroves, seagrass and forests store large amounts of carbon' }
        ],
        correctPrediction: 1,
        claim: 'Plants take in carbon dioxide; protecting carbon-rich habitats helps limit climate change.',
        explainChoices: [
            { text: 'Mangrove and seagrass soils can trap carbon for hundreds of years.', correct: true },
            { text: 'Car parks absorb carbon dioxide.', correct: false }
        ],
        transferQ: 'A developer wants to fill in a mangrove to build a resort. What is a climate cost?',
        transferChoices: ['Stored carbon is released and future storage is lost', 'There is no climate cost'],
        transferCorrect: 0,
        hints: ['Look at the "Takes in CO₂" column.', 'Mangroves, seagrass and island forest.'],
        lab: {
            kind: 'choice',
            multi: true,
            instruction: 'Pick EVERY habitat that stores lots of carbon.',
            visual: {
                type: 'matrix',
                columns: ['Takes in CO₂', 'Stores carbon in soil', 'Wildlife habitat'],
                rows: [
                    { label: 'Mangrove', emoji: '🌳', cells: [['Yes', 'palm'], ['Lots', 'palm'], ['Rich', 'palm']] },
                    { label: 'Seagrass', emoji: '🌱', cells: [['Yes', 'palm'], ['Lots', 'palm'], ['Rich', 'palm']] },
                    { label: 'Island forest', emoji: '🌴', cells: [['Yes', 'palm'], ['Some', 'sun'], ['Rich', 'palm']] },
                    { label: 'Car park', emoji: '🏗️', cells: [['No', 'coral'], ['None', 'coral'], ['Poor', 'coral']] }
                ]
            },
            options: [
                { id: 'mangrove', label: 'Mangrove', emoji: '🌳' },
                { id: 'seagrass', label: 'Seagrass meadow', emoji: '🌱' },
                { id: 'forest', label: 'Island forest', emoji: '🌴' },
                { id: 'carpark', label: 'Car park', emoji: '🏗️', why: 'Concrete has no plants to take in CO₂.' }
            ],
            correct: ['mangrove', 'seagrass', 'forest'],
            evidence: [
                { emoji: '🌳', tone: 'palm', title: 'Carbon in the mud', text: 'Mangrove soils store carbon for centuries.' },
                { emoji: '🌱', tone: 'lagoon', title: 'Blue carbon', text: 'Seagrass meadows bury carbon in the seabed.' },
                { emoji: '🏗️', tone: 'coral', title: 'Lost when cleared', text: 'Digging up these habitats releases the stored carbon.' }
            ]
        }
    }
]);
