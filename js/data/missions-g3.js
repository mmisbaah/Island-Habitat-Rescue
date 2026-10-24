/**
 * GRADE 3 · missions 26–33 (missions 23–25 live in missions.js)
 * Topics: animal life cycles, inherited vs environmental traits, seasonal weather data,
 * reducing weather hazards, group survival, fossils, survival advantages, tide patterns.
 */
IHR.addMissions(3, [
    {
        id: 'habitat-g3-04',
        zone: 'beach',
        title: 'Turtle Life Cycle',
        goal: 'Put the stages of a sea turtle’s life in order to make a loop.',
        siteEmoji: '🥚',
        restore: 'Hawksbill hatchlings are scrambling down to the sea',
        rewards: ['hawksbill'],
        clues: [
            { emoji: '🥚', title: 'Eggs', text: 'Buried in warm beach sand for about two months.' },
            { emoji: '🐢', title: 'Hatchlings', text: 'Dig out at night and race to the sea.' },
            { emoji: '🪸', title: 'Young Turtles', text: 'Grow up feeding around the reef.' },
            { emoji: '🏖️', title: 'Adults', text: 'Females come back to a beach to lay eggs.' }
        ],
        predictions: [
            { emoji: '➡️', label: 'A turtle’s life is a straight line that just ends' },
            { emoji: '🔁', label: 'Turtles have a life cycle that repeats: egg, young, adult, egg' }
        ],
        correctPrediction: 1,
        claim: 'Animals have unique life cycles, but all include birth, growth, reproduction and death.',
        explainChoices: [
            { text: 'Adult females lay eggs on the beach, starting the cycle again.', correct: true },
            { text: 'Hatchlings turn straight into eggs.', correct: false }
        ],
        transferQ: 'Why do conservation teams protect turtle nesting beaches?',
        transferChoices: ['Without safe beaches, eggs can’t hatch and the cycle breaks', 'Adult turtles live on the beach all year'],
        transferCorrect: 0,
        hints: ['Which stage hatches out of something?', 'Eggs → Hatchling → Young turtle → Adult.'],
        lab: {
            kind: 'sequence',
            instruction: 'Tap the stages in order.',
            pool: [
                { id: 'young', label: 'Young Turtle', emoji: '🪸', tone: 'coral' },
                { id: 'adult', label: 'Adult', emoji: '🐢', tone: 'palm' },
                { id: 'egg', label: 'Eggs', emoji: '🥚', tone: 'sand' },
                { id: 'hatch', label: 'Hatchling', emoji: '🐣', tone: 'sky' }
            ],
            correctOrder: ['egg', 'hatch', 'young', 'adult'],
            evidence: [
                { emoji: '🥚', tone: 'sand', title: 'Beach start', text: 'Every turtle begins in a nest on a sandy beach.' },
                { emoji: '🪸', tone: 'coral', title: 'Years at sea', text: 'Young turtles grow for many years before they can breed.' },
                { emoji: '🔁', tone: 'palm', title: 'Back to the beach', text: 'Adult females return to nest, and the cycle repeats.' }
            ]
        }
    },

    {
        id: 'habitat-g3-05',
        zone: 'jungle',
        title: 'Born With It, or Not?',
        goal: 'Sort each trait: passed down from parents, or shaped by the environment.',
        siteEmoji: '🧬',
        restore: 'Moringa trees are full of fresh green leaves',
        rewards: ['moringa'],
        clues: [
            { emoji: '🧬', title: 'Inherited', text: 'Passed from parents to their young.' },
            { emoji: '🌦️', title: 'Environment', text: 'Light, water, food and practice can change a living thing.' }
        ],
        predictions: [
            { emoji: '🔒', label: 'Every trait is fixed at birth' },
            { emoji: '⚖️', label: 'Some traits are inherited; others are shaped by the environment' }
        ],
        correctPrediction: 1,
        claim: 'Many traits are inherited from parents, but the environment can change how they turn out.',
        explainChoices: [
            { text: 'Flower colour comes from the parent plant, but wilting comes from a lack of water.', correct: true },
            { text: 'A plant chooses its own leaf shape.', correct: false }
        ],
        transferQ: 'Two seeds from the same moringa tree are planted, one in shade and one in sun. The sunny one grows taller. Why?',
        transferChoices: ['The environment (more light) helped it grow', 'It inherited different parents'],
        transferCorrect: 0,
        hints: ['Ask: would this happen no matter where it lived?', 'Leaf shape, wing size and flower colour are inherited; bending, learning and wilting come from the environment.'],
        lab: {
            kind: 'match',
            instruction: 'Sort each trait.',
            slots: [
                { id: 'inherited', label: 'Inherited from Parents', emoji: '🧬', sub: 'Born with it' },
                { id: 'env', label: 'Shaped by Environment', emoji: '🌦️', sub: 'Light, water, food, practice' }
            ],
            items: [
                { id: 'leaf', label: 'Mango leaf shape', emoji: '🍃', tone: 'palm', target: 'inherited' },
                { id: 'wing', label: 'Flying fox wing size', emoji: '🦇', tone: 'bark', target: 'inherited' },
                { id: 'flower', label: 'Hibiscus flower colour', emoji: '🌺', tone: 'coral', target: 'inherited' },
                { id: 'bend', label: 'Moringa bending toward light', emoji: '🌳', tone: 'sun', target: 'env' },
                { id: 'learn', label: 'Heron learning a fishing spot', emoji: '🐦', tone: 'shell', target: 'env' },
                { id: 'wilt', label: 'Plant wilting without water', emoji: '🥀', tone: 'orchid', target: 'env' }
            ],
            evidence: [
                { emoji: '🧬', tone: 'palm', title: 'Inherited: 3', text: 'Leaf shape, wing size and flower colour come from parents.' },
                { emoji: '🌦️', tone: 'sun', title: 'Environment: 3', text: 'Light, practice and water changed the other three.' },
                { emoji: '⚖️', tone: 'lagoon', title: 'Both matter', text: 'Genes set the plan; surroundings affect how it turns out.' }
            ]
        }
    },

    {
        id: 'habitat-g3-06',
        zone: 'jungle',
        title: 'Monsoon Weather Watch',
        goal: 'Read a year of island rainfall to find the drier and wetter seasons.',
        siteEmoji: '🌦️',
        restore: 'The rain pond is brimming after the wet season',
        rewards: [],
        clues: [
            { emoji: '🌬️', title: 'Iruvai · Northeast Monsoon', text: 'Roughly December to April. Drier, sunnier weather.' },
            { emoji: '🌧️', title: 'Hulhangu · Southwest Monsoon', text: 'Roughly May to November. Wetter and windier.' },
            { emoji: '📊', title: 'Rain Gauge', text: 'Measures how much rain falls each month.' }
        ],
        predictions: [
            { emoji: '🎲', label: 'Rain on the island is random all year' },
            { emoji: '📊', label: 'Rainfall follows a yearly pattern of drier and wetter seasons' }
        ],
        correctPrediction: 1,
        claim: 'Weather data shows patterns that help predict what a season will be like.',
        explainChoices: [
            { text: 'Months from May to December get much more rain than January to April.', correct: true },
            { text: 'One rainy day proves the whole year is wet.', correct: false }
        ],
        transferQ: 'A school is planning an outdoor sports day. Using the pattern, which month is a safer bet for dry weather?',
        transferChoices: ['February', 'October'],
        transferCorrect: 0,
        hints: ['Find the two shortest bars.', 'January to April is the drier part of the year.'],
        lab: {
            kind: 'choice',
            instruction: 'Average rainfall per month on a Maldives island. What pattern do the bars show?',
            visual: {
                type: 'bars',
                labels: ['Jan–Feb', 'Mar–Apr', 'May–Jun', 'Jul–Aug', 'Sep–Oct', 'Nov–Dec'],
                series: [{ label: 'Rain per month (mm, approx.)', tone: 'sky', values: [76, 98, 193, 164, 207, 214] }]
            },
            options: [
                { id: 'dry', label: 'January to April is the driest time of year', emoji: '🌤️' },
                { id: 'flat', label: 'It rains the same amount every month', emoji: '🟰', why: 'The bars are very different heights: 76 mm vs 214 mm.' },
                { id: 'wet', label: 'January and February are the wettest months', emoji: '🌧️', why: 'Jan–Feb has the SHORTEST bar.' }
            ],
            correct: ['dry'],
            evidence: [
                { emoji: '🌤️', tone: 'sun', title: 'Drier: Jan–Apr', text: 'Under 100 mm a month while the northeast monsoon blows.' },
                { emoji: '🌧️', tone: 'sky', title: 'Wetter: May–Dec', text: 'Around twice as much rain each month.' },
                { emoji: '📊', tone: 'lagoon', title: 'Data → prediction', text: 'Years of records let us predict each season.' }
            ]
        }
    },

    {
        id: 'habitat-g3-07',
        zone: 'lagoon',
        title: 'Storm Shields',
        goal: 'Choose every idea that protects the island from storm waves and flooding.',
        siteEmoji: '🛡️',
        restore: 'Moray eels are tucked into a healthy reef wall',
        rewards: ['moray'],
        clues: [
            { emoji: '🪸', title: 'Reef Crest', text: 'Waves break here and lose much of their energy.' },
            { emoji: '🌳', title: 'Coastal Plants', text: 'Roots hold sand in place.' },
            { emoji: '🏠', title: 'Raised Floors', text: 'Keep water out of homes during floods.' }
        ],
        predictions: [
            { emoji: '🤷', label: 'Nothing can be done about storm damage' },
            { emoji: '🛡️', label: 'Reefs, plants and smart building all reduce storm damage' }
        ],
        correctPrediction: 1,
        claim: 'People can design solutions that reduce the damage caused by weather hazards.',
        explainChoices: [
            { text: 'A healthy reef breaks big waves before they reach the beach.', correct: true },
            { text: 'Removing the reef lets waves calm down.', correct: false }
        ],
        transferQ: 'A new school is planned near the beach. Which design idea reduces flood risk?',
        transferChoices: ['Build it on a raised floor, away from the shore', 'Build it at the lowest point of the beach'],
        transferCorrect: 0,
        hints: ['Three ideas help; two make things worse.', 'Healthy reef, mangroves and raised floors.'],
        lab: {
            kind: 'choice',
            multi: true,
            instruction: 'Pick EVERY idea that protects the island.',
            options: [
                { id: 'reef', label: 'Keep the coral reef healthy', emoji: '🪸' },
                { id: 'mangrove', label: 'Plant mangroves and beach shrubs', emoji: '🌳' },
                { id: 'raise', label: 'Build homes on raised floors', emoji: '🏠' },
                { id: 'mine', label: 'Dig coral rock from the reef to build with', emoji: '⛏️', why: 'Coral mining breaks the reef that slows the waves.' },
                { id: 'clear', label: 'Clear beach plants for a better view', emoji: '🚜', why: 'Without roots, storm waves wash the sand away.' }
            ],
            correct: ['reef', 'mangrove', 'raise'],
            evidence: [
                { emoji: '🪸', tone: 'coral', title: 'Reef = breakwater', text: 'Most wave energy is lost on a healthy reef crest.' },
                { emoji: '🌳', tone: 'palm', title: 'Roots hold on', text: 'Plants keep the beach from washing away.' },
                { emoji: '🏠', tone: 'sky', title: 'Smart building', text: 'Raised floors keep homes dry when the sea comes up.' }
            ]
        }
    },

    {
        id: 'habitat-g3-08',
        zone: 'lagoon',
        title: 'Safety in Numbers',
        goal: 'Compare how many fish survive in a school and on their own.',
        siteEmoji: '🐟',
        restore: 'Big shimmering schools are swirling over the reef',
        rewards: [],
        clues: [
            { emoji: '🐟', title: 'School', text: 'Hundreds of fish moving together.' },
            { emoji: '🦈', title: 'Predator', text: 'Picks off fish that are alone or slow.' }
        ],
        predictions: [
            { emoji: '🚶', label: 'Fish always survive better alone' },
            { emoji: '🐟', label: 'Fish in a school survive better than fish alone' }
        ],
        correctPrediction: 1,
        claim: 'Being part of a group helps some animals survive.',
        explainChoices: [
            { text: 'Predators find it hard to pick out one fish in a big swirling school.', correct: true },
            { text: 'Schools make fish invisible.', correct: false }
        ],
        transferQ: 'Why do spinner dolphins travel and rest in pods?',
        transferChoices: ['Many eyes and ears spot danger sooner', 'Pods let dolphins breathe underwater'],
        transferCorrect: 0,
        hints: ['Which bars stay tall over the four days?', 'The schooling fish lost very few.'],
        lab: {
            kind: 'choice',
            instruction: '50 fish started in each group. What do the survival counts show?',
            visual: {
                type: 'bars',
                labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],
                series: [
                    { label: 'Fish in a school', tone: 'palm', values: [50, 48, 47, 46] },
                    { label: 'Fish on their own', tone: 'coral', values: [50, 38, 27, 19] }
                ]
            },
            options: [
                { id: 'school', label: 'Fish in the school survived better', emoji: '🐟' },
                { id: 'alone', label: 'Swimming alone is safer', emoji: '🚶', why: 'Only 19 of the lone fish were left by Day 4.' },
                { id: 'same', label: 'There was no difference', emoji: '🟰', why: '46 left vs 19 left is a big difference.' }
            ],
            correct: ['school'],
            evidence: [
                { emoji: '🐟', tone: 'palm', title: '46 of 50 survived', text: 'Schooling fish confused the predators.' },
                { emoji: '🚶', tone: 'coral', title: '19 of 50 survived', text: 'Lone fish were easy to single out.' },
                { emoji: '👀', tone: 'sky', title: 'Many eyes', text: 'A school spots danger faster than one fish can.' }
            ]
        }
    },

    {
        id: 'habitat-g3-09',
        zone: 'jungle',
        title: 'Clues in Coral Rock',
        goal: 'Builders digging a well find fossil coral and shells under the jungle. Work out what they mean.',
        siteEmoji: '🪨',
        restore: 'The jungle well is finished, and its fossils are on display',
        rewards: [],
        clues: [
            { emoji: '🪨', title: 'Fossil Coral', text: 'Hard, stony coral skeletons found underground.' },
            { emoji: '🐚', title: 'Fossil Shells', text: 'From sea snails and clams.' },
            { emoji: '🏝️', title: 'The Island', text: 'Built on top of an ancient reef.' }
        ],
        predictions: [
            { emoji: '🌴', label: 'The island has always been dry land' },
            { emoji: '🌊', label: 'Fossil coral shows this land was once under the sea' }
        ],
        correctPrediction: 1,
        claim: 'Fossils give evidence about the organisms and environments of long ago.',
        explainChoices: [
            { text: 'Coral only grows in seawater, so fossil coral means the sea was here once.', correct: true },
            { text: 'Fossils grow out of the ground like plants.', correct: false }
        ],
        transferQ: 'Scientists find fossil fish on a mountain top far from the sea. What can they infer?',
        transferChoices: ['That area was once covered by water', 'Fish once lived on mountains in the air'],
        transferCorrect: 0,
        hints: ['Where does living coral grow?', 'Coral only grows in the sea.'],
        lab: {
            kind: 'choice',
            instruction: 'What do the fossils tell us about this place long ago?',
            options: [
                { id: 'sea', label: 'This land was once a shallow reef under the sea', emoji: '🌊' },
                { id: 'grows', label: 'Coral grows in the jungle today', emoji: '🌴', why: 'Living coral needs seawater. These are fossils of old coral.' },
                { id: 'buried', label: 'Someone buried them there last week', emoji: '🧑‍🌾', why: 'They were deep inside solid rock, which takes ages to form.' }
            ],
            correct: ['sea'],
            evidence: [
                { emoji: '🪨', tone: 'shell', title: 'Reef under your feet', text: 'Maldives islands sit on rock made from ancient coral.' },
                { emoji: '🐚', tone: 'sand', title: 'Sea creatures', text: 'Fossil shells came from animals that lived in seawater.' },
                { emoji: '⏳', tone: 'lagoon', title: 'Long ago', text: 'Fossils show how a place has changed over time.' }
            ]
        }
    },

    {
        id: 'habitat-g3-10',
        zone: 'beach',
        title: 'Sand-Coloured Crabs',
        goal: 'Track pale and dark ghost crabs on white sand while herons hunt.',
        siteEmoji: '🦀',
        restore: 'Pale ghost crabs are blending into the white sand',
        rewards: ['mudskipper'],
        clues: [
            { emoji: '🦀', title: 'Crab Colours', text: 'Some ghost crabs are paler, some darker.' },
            { emoji: '🐦', title: 'Grey Heron', text: 'Hunts by sight.' },
            { emoji: '🏖️', title: 'Maldives Sand', text: 'Bright white coral sand.' }
        ],
        predictions: [
            { emoji: '🟰', label: 'Shell colour makes no difference' },
            { emoji: '🫥', label: 'Crabs that match the sand are less likely to be eaten' }
        ],
        correctPrediction: 1,
        claim: 'Differences in traits can help some individuals survive and have young.',
        explainChoices: [
            { text: 'Herons spotted the dark crabs on white sand more easily.', correct: true },
            { text: 'Dark crabs chose to leave the island.', correct: false }
        ],
        transferQ: 'On a beach of black volcanic sand, which crabs would you expect to survive best?',
        transferChoices: ['Dark crabs', 'Pale crabs'],
        transferCorrect: 0,
        hints: ['Which bars drop the most?', 'Pale crabs on white sand were hard for herons to see.'],
        lab: {
            kind: 'choice',
            instruction: '20 pale and 20 dark crabs on white sand. What do the counts show?',
            visual: {
                type: 'bars',
                labels: ['Start', 'Week 1', 'Week 2', 'Week 3'],
                series: [
                    { label: 'Pale crabs', tone: 'sand', values: [20, 19, 18, 18] },
                    { label: 'Dark crabs', tone: 'shell', values: [20, 14, 9, 6] }
                ]
            },
            options: [
                { id: 'pale', label: 'Pale crabs survived better on white sand', emoji: '🏖️' },
                { id: 'dark', label: 'Dark crabs survived better', emoji: '🌑', why: 'Only 6 dark crabs were left by Week 3.' },
                { id: 'same', label: 'Both survived equally', emoji: '🟰', why: '18 vs 6 is a big difference.' }
            ],
            correct: ['pale'],
            evidence: [
                { emoji: '🏖️', tone: 'sand', title: '18 of 20 pale crabs', text: 'They blended into the white sand.' },
                { emoji: '🌑', tone: 'shell', title: '6 of 20 dark crabs', text: 'They stood out to hunting herons.' },
                { emoji: '🧬', tone: 'palm', title: 'Traits matter', text: 'Survivors pass their colour on to their young.' }
            ]
        }
    },

    {
        id: 'habitat-g3-11',
        zone: 'beach',
        title: 'Tide Times',
        goal: 'Put the tide’s pattern in order so you can predict it.',
        siteEmoji: '🌗',
        restore: 'Shorebirds are feeding on the low-tide flats',
        rewards: [],
        clues: [
            { emoji: '🌊', title: 'High Tide', text: 'Water covers most of the beach.' },
            { emoji: '🏖️', title: 'Low Tide', text: 'Reef flats and tide pools appear.' },
            { emoji: '⏰', title: 'Timing', text: 'About two high and two low tides every day.' }
        ],
        predictions: [
            { emoji: '🎲', label: 'The sea level changes at random' },
            { emoji: '🔁', label: 'The tide rises and falls in a repeating pattern' }
        ],
        correctPrediction: 1,
        claim: 'Tides rise and fall in a regular pattern, so we can predict them.',
        explainChoices: [
            { text: 'High tide is followed by a falling tide, low tide, then a rising tide, about twice a day.', correct: true },
            { text: 'The tide only changes once a year.', correct: false }
        ],
        transferQ: 'Low tide was at 7 am. Using the pattern, about when is the next low tide?',
        transferChoices: ['At about 7:30 pm', 'Not for another week'],
        transferCorrect: 0,
        hints: ['After high tide, the water starts to…?', 'High → Falling → Low → Rising.'],
        lab: {
            kind: 'sequence',
            instruction: 'Tap the tide stages in order, starting at high tide.',
            pool: [
                { id: 'low', label: 'Low Tide', emoji: '🏖️', tone: 'sand' },
                { id: 'rising', label: 'Rising Tide', emoji: '⬆️', tone: 'lagoon' },
                { id: 'high', label: 'High Tide', emoji: '🌊', tone: 'sky' },
                { id: 'falling', label: 'Falling Tide', emoji: '⬇️', tone: 'shell' }
            ],
            correctOrder: ['high', 'falling', 'low', 'rising'],
            evidence: [
                { emoji: '🌊', tone: 'sky', title: 'Predictable', text: 'Tide tables are printed months ahead.' },
                { emoji: '⏰', tone: 'sun', title: 'About 12½ hours', text: 'From one low tide to the next.' },
                { emoji: '🏖️', tone: 'sand', title: 'Low tide feasts', text: 'Shorebirds time their meals to the falling tide.' }
            ]
        }
    }
]);
