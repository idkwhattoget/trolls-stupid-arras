const { combineStats, addAura, makeDeco } = require('../facilitators.js');
const { base, gunCalcNames, basePolygonDamage, basePolygonHealth, dfltskl, statnames } = require('../constants.js');
const g = require('../gunvals.js');
const Class = require("../combined.js");
const food = require("./food.js");

// TESTBED TANKS
exports.menu = {
    PARENT: ["genericTank"],
    LABEL: "",
    SKILL_CAP: [
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
    ],
    IGNORED_BY_AI: true,
    TURRETS: [],
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [18, 10, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                TYPE: "bullet",
            },
        },
    ],
};
exports.developer = {
    PARENT: ["menu"],
    LABEL: "Developer",
    BODY: {
        SHIELD: 1000,
        REGEN: 10,
        HEALTH: 100,
        DAMAGE: 10,
        DENSITY: 20,
        FOV: 2,
    },
    RESET_CHILDREN: true,
    INVISIBLE: [0, 0],
    SHAPE: [
        [-1, -0.8],
        [-0.8, -1],
        [0.8, -1],
        [1, -0.8],
        [0.2, 0],
        [1, 0.8],
        [0.8, 1],
        [-0.8, 1],
        [-1, 0.8],
    ],
    GUNS: [
        {
            /*** LENGTH WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [18, 10, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                TYPE: "developerBullet",
            },
        },
    ],
    REROOT_UPGRADE_PATH: "developer",
};
exports.tools = {PARENT: ["menu"], LABEL: "Tools"};
exports.spectator = {
    PARENT: ["menu"],
    LABEL: "Spectator",
    ALPHA: 0,
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: "never",
    ARENA_CLOSER: true,
    SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 255],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 255],
    BODY: {
        SPEED: 25,
        FOV: 10,
        DAMAGE: 0,
        HEALTH: 1e100,
        SHIELD: 1e100,
        REGEN: 1e100,
    },
    GUNS: [],
};
exports.sextator = {
    PARENT: ["menu"],
    LABEL: "sextator",
    ALPHA: 0,
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: "never",
    ARENA_CLOSER: true,
    SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 255],
    BODY: {
        SPEED: 25,
        FOV: 2,
        DAMAGE: 0,
        HEALTH: 1e100,
        SHIELD: 1e100,
        REGEN: 1e100,
    },
    GUNS: [],
};

exports.bosses = {
    PARENT: ["menu"],
    LABEL: "Bosses",
};
exports.sentries = {
    PARENT: ["menu"],
    LABEL: "Sentries",
    COLOR: "pink",
    UPGRADE_COLOR: "pink",
    SHAPE: 3.5,
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "genericEntity",
        },
    ],
};
exports.elites = {
    PARENT: ["menu"],
    LABEL: "Elites",
    COLOR: "pink",
    UPGRADE_COLOR: "pink",
    SHAPE: 3.5,
};
exports.mysticals = {
    PARENT: ["menu"],
    LABEL: "Mysticals",
    COLOR: "gold",
    UPGRADE_COLOR: "gold",
    SHAPE: 4,
};
exports.nesters = {
    PARENT: ["menu"],
    LABEL: "Nesters",
    COLOR: "purple",
    UPGRADE_COLOR: "purple",
    SHAPE: 5.5,
};
exports.rogues = {
    PARENT: ["menu"],
    LABEL: "Rogues",
    COLOR: "darkGrey",
    UPGRADE_COLOR: "darkGrey",
    SHAPE: 6,
};
exports.rammers = {
    PARENT: ["menu"],
    LABEL: "Rammers",
    COLOR: "teal",
    UPGRADE_COLOR: "teal",
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",
        },
    ],
};
exports.terrestrials = {
    PARENT: ["menu"],
    LABEL: "Terrestrials",
    COLOR: "orange",
    UPGRADE_COLOR: "orange",
    SHAPE: 7,
};
exports.celestials = {
    PARENT: ["menu"],
    LABEL: "Celestials",
    COLOR: "lightGreen",
    UPGRADE_COLOR: "lightGreen",
    SHAPE: 9,
};
exports.eternals = {
    PARENT: ["menu"],
    LABEL: "Eternals",
    COLOR: "teal",
    UPGRADE_COLOR: "teal",
    SHAPE: 11,
};
exports.devBosses = {
    PARENT: ["menu"],
    LABEL: "Developers",
    COLOR: "lightGreen",
    UPGRADE_COLOR: "rainbow",
    SHAPE: 4,
};

exports.tanks = {
    PARENT: ["menu"],
    LABEL: "Tanks",
};
exports.legacyTanks = {
    PARENT: ["menu"],
    LABEL: "Legacy Tanks",
};
exports.specialTanks = {
    PARENT: ["menu"],
    LABEL: "Special Tanks",
};
exports.unavailable = {
    PARENT: ["menu"],
    LABEL: "Unavailable",
};
exports.dominators = {
    PARENT: ["menu"],
    LABEL: "Dominators",
    TURRETS: [
        {
            POSITION: [22, 0, 0, 0, 360, 0],
            TYPE: "dominationBody",
        },
    ],
};
exports.sanctuaries = {
    PARENT: ["menu"],
    LABEL: "Sanctuaries",
    TURRETS: [
        {
            POSITION: [22, 0, 0, 0, 360, 0],
            TYPE: "dominationBody",
        },
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol",
        },
    ],
};
exports.funTanks = {
    PARENT: ["menu"],
    LABEL: "Fun Tanks",
};
exports.splitTanks = {
    PARENT: ["menu"],
    LABEL: "Split Tanks",
};
exports.testingTanks = {
    PARENT: ["menu"],
    LABEL: "Testing Tanks",
};

// GENERATORS
function compileMatrix(matrix, matrix2Entrance) {
    let matrixWidth = matrix[0].length,
        matrixHeight = matrix.length;
    for (let x = 0; x < matrixWidth; x++) for (let y = 0; y < matrixHeight; y++) {
        let str = matrix[y][x],
            LABEL = str[0].toUpperCase() + str.slice(1).replace(/[A-Z]/g, m => ' ' + m) + " Generator",
            code = str + 'Generator';
            
        exports[code] = matrix[y][x] = {
            PARENT: "sextator",
            LABEL,
            SKILL_CAP: [255, 0, 0, 0, 0, 0, 0, 0, 0, 255],
            SKILL: [255, 0, 0, 0, 0, 0, 0, 0, 0, 255],
            
            TURRETS: [{
                POSITION: [5 + y * 2, 0, 0, 0, 0, 1],
                TYPE: str,
            }],
            GUNS: [{
                POSITION: [14, 12, 1, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
                    TYPE: "bullet"
                }
            }, {
                POSITION: [12, 12, 1.4, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
                    INDEPENDENT_CHILDREN: true,
                    TYPE: str,
                    IDENTIFIER: "mainGun"
                },
            }],
        };
    }
}

function connectMatrix(matrix, matrix2Entrance) {
    let matrixWidth = matrix[0].length,
        matrixHeight = matrix.length;
    for (let x = 0; x < matrixWidth; x++) for (let y = 0; y < matrixHeight; y++) {
        let top = (y + matrixHeight - 1) % matrixHeight,
            bottom = (y + matrixHeight + 1) % matrixHeight,
            left = (x + matrixWidth - 1) % matrixWidth,
            right = (x + matrixWidth + 1) % matrixWidth,

        center = matrix[y     ][x    ];
        top    = matrix[top   ][x    ];
        bottom = matrix[bottom][x    ];
        left   = matrix[y     ][left ];
        right  = matrix[y     ][right];

        matrix[y][x].UPGRADES_TIER_0 = [
            "developer" ,  top    , "spectator",
             left       ,  center ,  right      ,
            "basic"     ,  bottom ,  matrix2Entrance
        ];
    }
}
let generatorMatrix = [
    [ "egg"             , "square"                , "triangle"                  , "pentagon"                  , "betaPentagon"               , "alphaPentagon"                 , "sphere"            ],
    [ "gem"             , "shinySquare"           , "shinyTriangle"             , "shinyPentagon"             , "shinyBetaPentagon"          , "shinyAlphaPentagon"            , "cube"              ],
    [ "jewel"           , "legendarySquare"       , "legendaryTriangle"         , "legendaryPentagon"         , "legendaryBetaPentagon"      , "legendaryAlphaPentagon"        , "tetrahedron"       ],
    [ "crasher"         , "shadowSquare"          , "shadowTriangle"            , "shadowPentagon"            , "shadowBetaPentagon"         , "shadowAlphaPentagon"           , "octahedron"        ],
    [ "sentry"          , "rainbowSquare"         , "rainbowTriangle"           , "rainbowPentagon"           , "rainbowBetaPentagon"        , "rainbowAlphaPentagon"          , "dodecahedron"      ],
    [ "shinySentry"     , "transSquare"           , "transTriangle"             , "transPentagon"             , "transBetaPentagon"          , "transAlphaPentagon"            , "icosahedron"       ],
    [ "EggRelic"        , "albinoSquare"          , "albinoTriangle"            , "albinoPentagon"            , "albinoBetaPentagon"         , "albinoAlphaPentagon"           , "tesseract"         ],
    [ "albinoEgg"       , "epilepsySquare"        , "epilepsyTriangle"          , "epilepsyPentagon"          , "epilepsyBetaPentagon"       , "epilepsyAlphaPentagon"         , "auto3"             ],
    [ "epilepsyEgg"     , "SquareRelic"           , "TriangleRelic"             , "PentagonRelic"             , "BetaPentagonRelic"          , "AlphaPentagonRelic"            , "basic"             ]  
],

gemRelicMatrix = [];
for (let tier of [ "", "Egg", "Square", "Triangle", "Pentagon", "BetaPentagon", "AlphaPentagon" ]) {
    let row = [];
    for (let gem of [ "Power", "Space", "Reality", "Soul", "Time", "Mind" ]) {
        row.push(gem + (tier ? tier + 'Relic' : 'Gem'));
    }
    gemRelicMatrix.push(row);
}

compileMatrix(generatorMatrix);
compileMatrix(gemRelicMatrix);

// Tensor = N-Dimensional Array, BASICALLY
let labyTensor = [];
for (let tier = 0; tier < 6; tier++) {
    let row = [];
    for (let poly of [ "Egg", "Square", "Triangle", "Pentagon", "Hexagon" ]) {
        let column = [];
        for (let shiny of [ "", "Shiny", "Legendary", "Shadow", "Rainbow", "Trans" ]) {
            let str = `laby${tier}${shiny}${poly}`,
                LABEL = str[0].toUpperCase() + str.slice(1).replace(/\d/, d => ["", "Beta", "Alpha", "Omega", "Gamma", "Delta"][d]).replace(/[A-Z]/g, m => ' ' + m) + " Generator",
                code = str + 'Generator';
            column.push(exports[code] = {
                PARENT: "sextator",
                LABEL,
                SKILL_CAP: [255, 0, 0, 0, 0, 0, 0, 0, 0, 255],
                SKILL: [255, 0, 0, 0, 0, 0, 0, 0, 0, 255],
               
                TURRETS: [{
                    POSITION: [5 + tier * 2, 0, 0, 0, 0, 1],
                    TYPE: str,
                }],
                GUNS: [{
                    POSITION: [14, 12, 1, 4, 0, 0, 0],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
                        TYPE: "bullet"
                    }
                }, {
                    POSITION: [12, 12, 1.4, 4, 0, 0, 0],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
                        INDEPENDENT_CHILDREN: true,
                        TYPE: str
                    },
                }],
            });
        }
        row.push(column);
    }
    labyTensor.push(row);
}

connectMatrix(generatorMatrix, 'PowerGemGenerator');
connectMatrix(gemRelicMatrix, 'laby0EggGenerator');

let tensorLength = labyTensor[0][0].length,
    tensorWidth = labyTensor[0].length,
    tensorHeight = labyTensor.length;
for (let x = 0; x < tensorWidth; x++) for (let y = 0; y < tensorHeight; y++) for (let z = 0; z < tensorLength; z++) {
    let top = (y + tensorHeight - 1) % tensorHeight,
        bottom = (y + tensorHeight + 1) % tensorHeight,
        left = (x + tensorWidth - 1) % tensorWidth,
        right = (x + tensorWidth + 1) % tensorWidth,
        front = (z + tensorLength - 1) % tensorLength,
        back = (z + tensorLength + 1) % tensorLength,

    center = labyTensor[y     ][x    ][z    ];
    top    = labyTensor[top   ][x    ][z    ];
    bottom = labyTensor[bottom][x    ][z    ];
    left   = labyTensor[y     ][left ][z    ];
    right  = labyTensor[y     ][right][z    ];
    front  = labyTensor[y     ][x    ][front];
    back   = labyTensor[y     ][x    ][back ];

    labyTensor[y][x][z].UPGRADES_TIER_0 = [
        "developer" ,  top                , "spectator",
         left       ,  center             ,  right     ,
        "basic"     ,  bottom             , "eggGenerator",
         front      , "PowerGemGenerator" ,  back
    ];
}

exports.rockGenerator = {
    PARENT: ["sextator"],
    LABEL: "Rock Generator",
    SKILL_CAP: [255, 0, 0, 0, 0, 0, 0, 0, 0, 255],
    SKILL: [255, 0, 0, 0, 0, 0, 0, 0, 0, 255],
    TURRETS: [{
        POSITION: [5, 0, 0, 0, 0, 1],
        TYPE: "rock",
    }],
    GUNS: [{
        POSITION: [14, 12, 1, 4, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [12, 12, 1.4, 4, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
            INDEPENDENT_CHILDREN: true,
            TYPE: "rock"
        },
    }],  
};
exports.stoneGenerator = {
    PARENT: ["rockGenerator"],
    LABEL: "Stone Generator",
    TURRETS: [{
        POSITION: [5, 0, 0, 0, 0, 1],
        TYPE: "stone",
    }],
    GUNS: [{
        POSITION: [14, 12, 1, 4, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [12, 12, 1.4, 4, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
            INDEPENDENT_CHILDREN: true,
            TYPE: "stone"
        },
    }],  
};
exports.gravelGenerator = {
    PARENT: ["rockGenerator"],
    LABEL: "Gravel Generator",
    TURRETS: [{
        POSITION: [5, 0, 0, 0, 0, 1],
        TYPE: "gravel",
    }],
    GUNS: [{
        POSITION: [14, 12, 1, 4, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [12, 12, 1.4, 4, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
            INDEPENDENT_CHILDREN: true,
            TYPE: "gravel"
        },
    }],  
};
exports.wallGenerator = {
    PARENT: ["rockGenerator"],
    LABEL: "Wall Generator",
    TURRETS: [{
        POSITION: [5, 0, 0, 0, 0, 1],
        TYPE: "wall",
    }],
    GUNS: [{
        POSITION: [14, 12, 1, 4, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [12, 12, 1.4, 4, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
            INDEPENDENT_CHILDREN: true,
            TYPE: "wall"
        },
    }],  
};
exports.moonGenerator = {
    PARENT: ["rockGenerator"],
    LABEL: "Moon Generator",
    TURRETS: [{
        POSITION: [5, 0, 0, 0, 0, 1],
        TYPE: "moon",
    }],
    GUNS: [{
        POSITION: [14, 12, 1, 4, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [12, 12, 1.4, 4, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
            INDEPENDENT_CHILDREN: true,
            TYPE: "moon"
        },
    }],  
};

exports.cursedGenerator = {
    PARENT: ["sextator"],
    LABEL: "Cursed Generator",
    SKILL_CAP: [255, 0, 0, 0, 0, 0, 0, 0, 0, 255],
    SKILL: [255, 0, 0, 0, 0, 0, 0, 0, 0, 255],
    TURRETS: [{
        POSITION: [5, 0, 0, 0, 0, 1],
        TYPE: "cursed",
    }],
    GUNS: [{
        POSITION: [14, 12, 1, 4, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [12, 12, 1.4, 4, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
            INDEPENDENT_CHILDREN: true,
            TYPE: "cursed"
        },
    }],  
};


exports.diamondShape = {
    PARENT: ["basic"],
    LABEL: "Diamond Test Shape",
    SHAPE: 4.5
};

exports.rotatedTrap = {
    PARENT: ["basic"],
    LABEL: "Rotated Trap Test Shape",
    SHAPE: -3.5
};

exports.mummyHat = {
    SHAPE: 4.5,
    COLOR: -1
};
exports.mummy = {
    PARENT: ["drone"],
    SHAPE: 4,
    TURRETS: [{
        POSITION: [20 * Math.SQRT1_2, 0, 0, 180, 360, 1],
        TYPE: ["mummyHat"]
    }]
};
exports.mummifier = {
    PARENT: ["genericTank"],
    LABEL: "Mummifier",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.8 * base.SPEED,
    },
    SHAPE: 4,
    MAX_CHILDREN: 10,
    GUNS: [{
        POSITION: [5.5, 13, 1.1, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: "mummy",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro
        }
    },{
        POSITION: [5.5, 13, 1.1, 8, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: "mummy",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro
        }
    }],
    TURRETS: [{
        POSITION: [20 * Math.SQRT1_2, 0, 0, 180, 360, 1],
        TYPE: ["mummyHat"]
    }]
};

exports.colorMan = {
    PARENT: ["genericTank"],
    LABEL: "Testing Animated Colors",
    SHAPE: 4,
    COLOR: "rainbow",
    TURRETS: [{
        POSITION: [20, -20, -20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedBlueRed" }
    },{
        POSITION: [20,  0 , -20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedBlueGrey" }
    },{
        POSITION: [20,  20, -20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedGreyBlue" }
    },{
        POSITION: [20, -20,  0 , 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedRedGrey" }
    },{
        POSITION: [20,  20,  0 , 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedGreyRed" }
    },{
        POSITION: [20,  20,  20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedLesbian" }
    },{
        POSITION: [20,  0 ,  20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedTrans" }
    },{
        POSITION: [20,  20,  20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedBi" }
    }]
};

exports.miscTestHelper2 = {
    PARENT: ["genericTank"],
    LABEL: "Turret Reload Test 3",
    MIRROR_MASTER_ANGLE: true,
    COLOR: -1,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noRandom]),
                TYPE: "bullet",
                COLOR: -1,
            },
        },
    ],
};
exports.miscTestHelper = {
    PARENT: ["genericTank"],
    LABEL: "Turret Reload Test 2",
    //MIRROR_MASTER_ANGLE: true,
    COLOR: {
        BASE: -1,
        BRIGHTNESS_SHIFT: 15,
    },
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noRandom]),
                TYPE: "bullet",
                COLOR: -1,
            },
        },
    ],
    TURRETS: [
        {
          POSITION: [20, 0, 20, 30, 0, 1],
          TYPE: "miscTestHelper2",
        }
    ]
};
exports.miscTest = {
    PARENT: ["genericTank"],
    LABEL: "Turret Reload Test",
    COLOR: "teal",
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noRandom]),
                TYPE: "bullet",
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [20, 0, 20, 30, 0, 1],
            TYPE: "miscTestHelper",
        }
    ]
};
exports.mmaTest2 = {
    PARENT: ["genericTank"],
    MIRROR_MASTER_ANGLE: true,
    GUNS: [{
            POSITION: [40, 4, 1, -20, 0, 0, 0],
        }],
}
exports.mmaTest1 = {
    PARENT: ["genericTank"],
    COLOR: -1,
    // Somehow, removing the gun below causes a crash when the tank is chosen ??????
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
        }
    ],
    TURRETS: [
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: "mmaTest2",
        }
    ]
}
exports.mmaTest = {
    PARENT: ["genericTank"],
    LABEL: "Mirror Master Angle Test",
    TURRETS: [
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: "mmaTest2",
        },
        {
            POSITION: [20, 0, 20, 0, 360, 1],
            TYPE: "mmaTest1",
        },
    ]
}

exports.vulnturrettest_turret = {
    PARENT: "genericTank",
    HITS_OWN_TYPE: 'hard',
    LABEL: 'Shield',
    COLOR: 'teal',
}

exports.vulnturrettest = {
    PARENT: ["genericTank"],
    LABEL: "Vulurable Turret Test",
    TOOLTIP: 'warning: vuln turrets aren\'t done yet',
    BODY: {
        FOV: 2,
    },
    DANGER: 6,
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet'
        }
    }],
    TURRETS: (() => {
        let output = []
        for (let i = 0; i < 10; i++) {
            output.push({
                POSITION: {SIZE: 20, X: 40, ANGLE: (360/10)*i},
                TYPE: "vulnturrettest_turret",
                VULNERABLE: true
            })
        }
        return output
    })(),
};

// unfinished
exports.alphaGunTest = {
    PARENT: "basic",
    LABEL: "Alpha Gun Test",
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            ALPHA: 0.5
        }
    }]
}

exports.onTest = {
    PARENT: 'genericTank',
    LABEL: '`ON` property test',
    TOOLTIP: [
        'Refer to exports.onTest to know more ',
        'On collide is a bit buggy right now, please use other methods until its fixed'
    ],
    ON: [{
        event: "fire",
        handler: ({ body, gun }) => {
            switch (gun.identifier) {
                case 'mainGun':
                    body.sendMessage('fired main gun')
                    break;
                case 'secondaryGun':
                    body.sendMessage('fired secondary gun')
                    break;
            }
        }
    }, {
        event: "altFire",
        handler: ({ body, gun }) => {
            body.sendMessage('fired alt gun')
        }
    }, {
        event: "death",
        handler: ({ body, killers, killTools }) => {
            body.sendMessage('you died')
        }
    }, {
        event: "collide",
        handler: ({ instance, other }) => {
            instance.sendMessage('collide!')
        }
    }, {
        event: "damage",
        handler: ({ body, damageInflictor, damageTool }) => {
            body.SIZE += damageInflictor[0].SIZE / 2
            damageInflictor[0].kill()
        }
    }],
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'mainGun'
        }
    }, {
        POSITION: { ANGLE: 90 },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            ALT_FIRE: true
        }
    }, {
        POSITION: { ANGLE: 180, DELAY: 0.5 },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'secondaryGun'
        }
    }]
}

exports.auraBasicGen = addAura();
exports.auraBasic = {
    PARENT: ["genericTank"],
    LABEL: "Aura Basic",
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [18, 0, 0, 0, 0, 0],
            TYPE: "auraBasicGen",
            VULNERABLE: true,
        }
    ],
};
exports.aura = addAura({LABEL: "Aura"})
exports.auraHealerGen = addAura(-1);
exports.auraHealer = {
    PARENT: ["genericTank"],
    LABEL: "Aura Healer",
    TURRETS: [
        {
            POSITION: [14, 0, 0, 0, 0, 1],
            TYPE: "auraHealerGen",
        }
    ],
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [8, 9, -0.5, 12.5, 0, 0, 0],
        },
        {
            POSITION: [18, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer]),
                TYPE: "healerBullet",
            },
        },
    ],
};

exports.ghoster_ghostForm = {
    PARENT: ['genericTank'],
    TOOLTIP: 'You are now in ghost form, roam around and find your next target. Will turn back in 5 seconds',
    LABEL: 'Ghoster',
    BODY: {
        SPEED: 20,
        ACCELERATION: 10,
        FOV: base.FOV + 1,
    },
    GUNS: [{
        POSITION: { WIDTH: 20, LENGTH: 20 },
    }],
    ALPHA: 0.6,
}

exports.ghoster = {
    PARENT: ['genericTank'],
    LABEL: 'Ghoster',
    TOOLTIP: 'Shooting will turn you into a ghost for 5 seconds',
    BODY: {
        SPEED: base.SPEED,
        ACCELERATION: base.ACCEL,
    },
    ON: [
        {
            event: 'fire',
            handler: ({ body }) => {
                body.define(Class.ghoster_ghostForm)
                setTimeout(() => {
                    body.SPEED = 1e-99
                    body.ACCEL = 1e-99
                    body.FOV *= 2
                    body.alpha = 1
                }, 2000)
                setTimeout(() => {
                    body.SPEED = base.SPEED
                    body.define(Class.ghoster)
                }, 2500)
            }
        }
    ],
    GUNS: [{
        POSITION: {WIDTH: 20, LENGTH: 20},
        PROPERTIES: {
            TYPE: 'bullet',
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
        }
    }],
    ALPHA: 1,
}

exports.switcheroo = {
    PARENT: ['basic'],
    LABEL: 'Switcheroo',
    UPGRADES_TIER_0: [],
    RESET_UPGRADE_MENU: true,
    ON: [
        {
            event: "fire",
            handler: ({ body, globalMasterStore: store, gun }) => {
                if (gun.identifier != 'switcherooGun') return
                store.switcheroo_i ??= 0;
                store.switcheroo_i++;
                store.switcheroo_i %= 6;
                body.define(Class.basic.UPGRADES_TIER_1[store.switcheroo_i]);
                setTimeout(() => body.define("switcheroo"), 6000);
            }
        }
    ],
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'switcherooGun'
        }
    }]
}
exports.spamOctoTank = {
    PARENT: ["genericTank"],
    LABEL: "Spam Octo Tank",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 45, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 135, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 225, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 315, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op]),
                TYPE: "bullet",
            },
        },
    ],
};
exports.peis = {
    PARENT: ["miniboss"],
    LABEL: "penis",
    DANGER: 7,
    SIZE: 12*4,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op, g.op, g.op, g.op, g.op]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op, g.op, g.op, g.op, g.op]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op, g.op, g.op, g.op, g.op]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op, g.op, g.op, g.op, g.op]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 45, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 135, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 225, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 315, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op, g.op, g.op, g.op, g.op]),
                TYPE: "trap",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op, g.op, g.op, g.op, g.op]),
                TYPE: "trap",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op, g.op, g.op, g.op, g.op]),
                TYPE: "trap",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op, g.op, g.op, g.op, g.op]),
                TYPE: "trap",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 45, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op]),
                TYPE: "trap",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 135, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op]),
                TYPE: "trap",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 225, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op]),
                TYPE: "trap",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 315, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.ohgod, g.op]),
                TYPE: "trap",
            },
        },
    ],
};

// FUN
exports.florr_tank_eye = {
    PARENT: "genericTank",
    BORDERLESS: true,
    MIRROR_MASTER_ANGLE: true,
    SHAPE: 'M 0 -1.5 C -1 -1.5 -1 1.5 0 1.5 C 1 1.5 1 -1.5 0 -1.5'
}
exports.florr_tank_smile = {
    PARENT: "genericTank",
    COLOR: 'black',
    BORDERLESS: true,
    MIRROR_MASTER_ANGLE: true,
    SHAPE: 'M 5 1.5 C 3 -2.5 -3 -2.5 -5 1.5 L -4 2 C -2 -1.5 2 -1.5 4 2 L 5 1.5'
}
exports.florr_tank = {
    PARENT: "genericTank",
    COLOR: 'yellow',
    LABEL: 'Flower',
    STAT_NAMES: {
        BODY_DAMAGE: 'Flower Thorns',
        BULLET_SPEED: 'Petal Speed',
        BULLET_HEALTH: 'Petal Health',
        BULLET_PEN: 'Petal Penetration',
        BULLET_DAMAGE: 'Petal Damage',
        RELOAD: 'Petal Cooldown',
        MOVE_SPEED: 'Flower Speed',
        SHIELD_REGEN: 'Photosynthesis',
        SHIELD_CAP: 'Vacuole Capacity',
    },
    GUNS: (() => {
        let output = []
        for (let i = 0; i < 32; i++) {
            output.push({
                POSITION: {
                    WIDTH: 10, 
                    LENGTH: 1, 
                    X: -2, 
                    ANGLE: (360/8)*i, 
                    DELAY: i < 8 ? 1 : i < 16 ? 2 : i < 24 ? 3 : i < 32 ? 4 : 5
                },
                PROPERTIES: {
                    TYPE: 'bullet',
                    SHOOT_SETTINGS: combineStats([g.basic, {spread: 0}])
                }
            })
        }
        return output
    })(),
    TURRETS: [
        {
            POSITION: { SIZE: 3.5, X: -3, Y: 2, LAYER: 1, ANGLE: -90 },
            TYPE: ["florr_tank_eye", {COLOR: 'black'}]
        },
        {
            POSITION: { SIZE: 3.5, X: 3, Y: 2, LAYER: 1, ANGLE: -90 },
            TYPE: ["florr_tank_eye", {COLOR: 'black'}]
        },
        {
            POSITION: { SIZE: 1.75, X: -3.5, Y: 2.5, LAYER: 1, ANGLE: -90 },
            TYPE: ["florr_tank_eye", { COLOR: 'white' }]
        },
        {
            POSITION: { SIZE: 1.75, X: 2.5, Y: 2.5, LAYER: 1, ANGLE: -90 },
            TYPE: ["florr_tank_eye", { COLOR: 'white' }]
        },
        {
            POSITION: { SIZE: 1.25, Y: -4, LAYER: 1, ANGLE: -90 },
            TYPE: ["florr_tank_smile"]
        }
    ]
}

exports.vanquisher = {
    PARENT: ["genericTank"],
    DANGER: 8,
    LABEL: "Vanquisher",
    STAT_NAMES: statnames.generic,
    BODY: {
        SPEED: 0.8 * base.SPEED,
    },
    //destroyer
    GUNS: [{
        POSITION: [21, 14, 1, 0, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
            TYPE: "bullet"
        }

    //builder
    },{
        POSITION: [18, 12, 1, 0, 0, 0, 0],
    },{
        POSITION: [2, 12, 1.1, 18, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: "setTrap",
            STAT_CALCULATOR: gunCalcNames.block
        }

    //launcher
    },{
        POSITION: [10, 9, 1, 9, 0, 90, 0],
    },{
        POSITION: [17, 13, 1, 0, 0, 90, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty]), TYPE: "minimissile", STAT_CALCULATOR: gunCalcNames.sustained }

    //shotgun
    },{
        POSITION: [4, 3, 1, 11, -3, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [4, 3, 1, 11, 3, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [4, 4, 1, 13, 0, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 4, 1, 12, -1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 4, 1, 11, 1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 3, 1, 13, -1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [1, 3, 1, 13, 1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [1, 2, 1, 13, 2, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "casing" }
    }, {
        POSITION: [1, 2, 1, 13, -2, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "casing" }
    }, {
        POSITION: [15, 14, 1, 6, 0, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), TYPE: "casing" }
    }, {
        POSITION: [8, 14, -1.3, 4, 0, 270, 0],
    }]
};
exports.armyOfOneBullet = {
    PARENT: ["bullet"],
    LABEL: "Unstoppable",
    TURRETS: [
        {
            /** SIZE         X             Y         ANGLE        ARC */
            POSITION: [18.5, 0, 0, 0, 360, 0],
            TYPE: ["spikeBody", { COLOR: null }],
        },
        {
            POSITION: [18.5, 0, 0, 180, 360, 0],
            TYPE: ["spikeBody", { COLOR: null }],
        },
    ],
};
exports.armyOfOne = {
    PARENT: ["genericTank"],
    LABEL: "Army Of One",
    DANGER: 9,
    SKILL_CAP: [31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    BODY: {
        SPEED: 0.5 * base.SPEED,
        FOV: 1.8 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [21, 19, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.destroy, g.destroy, g.destroy, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.doublereload, g.doublereload, g.doublereload, g.doublereload]),
                TYPE: "armyOfOneBullet",
            },
        },{
            POSITION: [21, 11, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.destroy, g.destroy, g.destroy, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.doublereload, g.doublereload, g.doublereload, g.doublereload, g.fake]),
                TYPE: "bullet",
            },
        }
    ],
};
exports.godbasic = {
    PARENT: ["genericTank"],
    LABEL: "God Basic",
    SKILL_CAP: [31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    SKILL: [ 31, 31, 31, 31, 31, 31, 31, 31, 31, 31 ],
    BODY: {
        ACCELERATION: base.ACCEL * 1,
        SPEED: base.SPEED * 1,
        HEALTH: base.HEALTH * 1,
        DAMAGE: base.DAMAGE * 1,
        PENETRATION: base.PENETRATION * 1,
        SHIELD: base.SHIELD * 1,
        REGEN: base.REGEN * 1,
        FOV: base.FOV * 1,
        DENSITY: base.DENSITY * 1,
        PUSHABILITY: 1,
        HETERO: 3,
    },
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
                COLOR: "grey",
                LABEL: "",
                STAT_CALCULATOR: 0,
                WAIT_TO_CYCLE: false,
                AUTOFIRE: false,
                SYNCS_SKILLS: false,
                MAX_CHILDREN: 0,
                ALT_FIRE: false,
                NEGATIVE_RECOIL: false,
            },
        },
    ],
};
exports.maximumOverdrive = {
    PARENT: ["overdrive"],
    LABEL: "Maximum Overdrive",
    SKILL_CAP: Array(10).fill(255),
    SKILL: Array(10).fill(255),
};
exports.meonwaymytodoyourmom = {
    PARENT: ["genericTank"],
    LABEL: "Me on way my to do your mom",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20.5, 19.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.ohgod]),
                TYPE: "bullet",
            },
        },
    ],
};
exports.medoingyourmom = {
    PARENT: ["genericTank"],
    LABEL: "Me doing your mom",
    DANGER: 7,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 2 * base.FOV,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [128, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.ohgod, g.norecoil, g.halfspeed, g.halfspeed,g.halfspeed,g.halfspeed]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [5, 8, -1.4, 8, 0, 0, 0],
        },
    ],
};
exports.weirdAutoBasic = {
    PARENT: "genericTank",
    LABEL: "Weirdly defined Auto-Basic",
    GUNS: [{
        POSITION: {
            LENGTH: 20,
            WIDTH: 10
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, [0.8, 0.8, 1.5, 1, 0.8, 0.8, 0.9, 1, 1, 1, 1, 2, 1]]),
            TYPE: "bullet"
        },
    }],
    TURRETS: [{
        POSITION: {
            ANGLE: 180,
            LAYER: 1
        },
        TYPE: ["autoTurret", {
            CONTROLLERS: ["nearestDifferentMaster"],
            INDEPENDENT: true
        }]
    }]
};
exports.baseCustomShape = {
    PARENT: ["menu"],
    LABEL: "Custom Shape",
    GUNS: []
}

exports.customShape1 = {
    PARENT: ["baseCustomShape"],
    LABEL: "Custom Shape 1",
    SHAPE: "M -1 2 L -1 0 L 0.759 -0.324 L 1.347 0.478 L -0.7 0.7 L -0.5 2 L -1 2 L -1.178 2.956 L 0.773 3.267 L 1.389 2.416 L 1.776 1.295 L 1.763 1.246 L -0.369 -1.127"
}

exports.customShapequestion = {
    PARENT: ["baseCustomShape"],
    LABEL: "Custom Shape?",
    SHAPE: "data:image/jpeg;base64,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/g30+MLdPEXwv/8AA+9/+Q6x9T/4N1fjTeXskieJvhWqtjAOo33oB/z50fVan8pUsRB9TyXw74n/AOEg87coXyduPmznOfYeldVpenx3NhG+fvZ/ma+kPA//AARS+Jvhz7V9q1r4eyeds27Ly7bGN2etsPUV2umf8El/HllYxxtqXgYsuc4uLjHUn/n3o+rVexzOtHufHmtaqNMtVkjUbmcL97tg/wCFZEni+Vj939R/hX2frX/BIfx/qNqsaap4DBV93zXNz6H/AKd6y2/4I2fEQn/kLfD/AP8AAq5/+Rqf1ar2F7Zdz490fxZLfa4sDYCszDqOwJ9Pau88N20V1Ys0i7m8wjOccYFfQWj/APBGj4i6frSXL6t8PyiliQt1c7uQR/z7e9dron/BK/xxpto0cmo+CWZnLfLPceg/6Ye1H1ar2K9rHufMEOm26bWAUEYP3jx+tbOiSRQeb+787OOjYx1r6Lb/AIJdeOi5xqfg3Gen2i4/+MVc0z/gmT42svM3al4P+bHS4n9/+mFL6tV7FRrQvueP6NYRSR2snlEbgjYyfaur0W1jF037o/cPc+or2HTf2BfFlnBbq194YJiVQcTTc4x/0xrWt/2I/E8D7vtvh3pjiaX/AONUfVan8p0fWKfc8tsLeH7Iv7v1/iPrXQReBraRsbSP++v8a9Dtv2O/EkMCq15oOR6Sy/8Axuuth/Z01aNsmbSen99//iK0hhqi6Eyr031OL+Gfw7R9Bm8ufyl+0Hjyy38K+9e7aR4YhtdRjkznbnjn0PvWH4S+FN7oGmyQyyWLM0pf5GbGMAf3R6V3EVt5cgb5fwrtp0NFdHHVqq+jHQ262+do+91qSiiuyMUlZHG23uFFFFMAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/2Q=="
}
exports.testDesmosBullet = {
    LABEL: "Drone",
    TYPE: "bullet",
    ACCEPTS_SCORE: false,
    DANGER: 2,
    SHAPE: 3,
    CONTROLLERS: ['formulaTarget'],
    FACING_TYPE: "smoothToTarget",
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.75,
        HEALTH: 0.3,
        DAMAGE: 3.375,
        SPEED: 10,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.5,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
    MOTION_TYPE: 'motor'
};
exports.testDesmos = {
    PARENT: 'genericTank',
    LABEL: "Test Desmos",
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'testDesmosBullet',
            MAX_CHILDREN: 3,
        }
    }]
};
exports.testWhirlwindBullet = {
    LABEL: "Drone",
    TYPE: "drone",
    ACCEPTS_SCORE: false,
    DANGER: 2,
    SHAPE: 3,
    CONTROLLERS: ['orbit'],
    FACING_TYPE: "smoothToTarget",
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.75,
        HEALTH: 0.3,
        DAMAGE: 3.375,
        SPEED: 10,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.5,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
    MOTION_TYPE: 'motor'
};
exports.testWhirlwind = {
    PARENT: 'genericTank',
    LABEL: 'Test Whirlwind',
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'testWhirlwindBullet',
            MAX_CHILDREN: 3,
        }
    }]
};

// VERY wip whirlwind (thanks sontrux42!)
exports.satellite = { 
    PARENT: "bullet",
    // TYPE: "wall",
    LABEL: "Satellite",
    SIZE: 5,
    LAYER: 13,
    BODY: { 
        SPEED: 4.5,
        DENSITY: 1,
        DAMAGE: 10, 
        HEALTH: 10,
        PENETRATION: 1, 
        PUSHABILITY: 1, 
        ACCELERATION: 4.5,
    },  
    CONTROLLERS: ["satellite"],  
    DIE_AT_RANGE: false, 
    FACING_TYPE: "chase",  
    MOTION_TYPE: "motor",
    CLEAR_ON_MASTER_UPGRADE: true, 
    // CAN_GO_OUTSIDE_ROOM: false,
}
exports.whirlwindDeco = makeDeco(6);
exports.whirlwindDeco.CONTROLLERS = [["spin", { independent: true, speed: 0.05 }]];
exports.whirlwind = {
    PARENT: "genericTank",
    LABEL: "Whirlwind",
    ANGLE: 60,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "whirlwindDeco",
        },
    ],
    AI: {
        SPEED: 2,  
    }, 
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 6; i++) { 
            output.push({ 
                POSITION: {WIDTH: 8, LENGTH: 1, DELAY: i * 0.2},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([{reload:5}]), 
                    TYPE: ["satellite", {ANGLE: i * 60}], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true,
                }
            }) 
        }
        return output
    })()
};

exports.tooltipTank = {
    PARENT: 'genericTank',
    LABEL: "Tooltip Test",
    UPGRADE_TOOLTIP: "Allan please add details"
}

exports.levels = {
    PARENT: ["menu"],
    LABEL: "Level Switcher",
    UPGRADES_TIER_0: []
};
for (let i = 0; i < 12; i++) {
    let LEVEL = i * c.TIER_MULTIPLIER;
    exports["level" + LEVEL] = {
        PARENT: ["levels"],
        LEVEL,
        LABEL: "Level " + LEVEL
    };
    exports.levels.UPGRADES_TIER_0.push("level" + LEVEL);
}

exports.teams = {
    PARENT: ["menu"],
    LABEL: "Team Switcher",
    UPGRADES_TIER_0: []
};
for (let i = 1; i <= 8; i++) {
    let TEAM = i;
    exports["Team" + TEAM] = {
        PARENT: ["teams"],
        TEAM: -TEAM,
        COLOR: getTeamColor(-TEAM),
        LABEL: "Team " + TEAM
    };
    exports.teams.UPGRADES_TIER_0.push("Team" + TEAM);
}
exports['Team' + TEAM_ROOM] = {
    PARENT: ["teams"],
    TEAM: TEAM_ROOM,
    COLOR: "yellow",
    LABEL: "Room Team"
};
exports['Team' + TEAM_ENEMIES] = {
    PARENT: ["teams"],
    TEAM: TEAM_ENEMIES,
    COLOR: "yellow",
    LABEL: "Enemies Team"
};
exports.teams.UPGRADES_TIER_0.push('Team' + TEAM_ROOM, 'Team' + TEAM_ENEMIES);

exports.colors = {
    PARENT: ["menu"],
    LABEL: "Color Switcher",
    UPGRADES_TIER_0: []
};

for (let i = 0; i <= 40; i++) {
    let COLOR = i;
    exports["color" + COLOR] = {
        PARENT: ["colors"],
        COLOR: COLOR,
        LABEL: "Color " + COLOR,
        UPGRADE_COLOR: COLOR
    };
    //exports.color["color" + COLOR].UPGRADES_TIER_0.push("color" + COLOR);
    
}

exports.colors.UPGRADES_TIER_0.push("colors");

exports.testing = {
    PARENT: ["menu"],
    LABEL: "More Tanks"
};

exports.addons = {
    PARENT: "menu",
    LABEL: "Addon Entities",
    UPGRADES_TIER_0: []
};

exports.generators = {
    PARENT: "menu",
    LABEL: "Generators"
};

exports.customShapes = {
    PARENT: ["menu"],
    LABEL: "Custom Shapes"
}

exports.developer.UPGRADES_TIER_0 = ["tanks", "bosses", "spectator", "levels", "teams", "generators", "colors", "testing", "addons"];
    exports.tanks.UPGRADES_TIER_0 = ["basic", "healer", "spectator", "dominators", "sanctuaries", "mothership", "baseProtector", "antiTankMachineGun", "arenaCloser", "arenaAnnihilator"];
        //exports.unavailable.UPGRADES_TIER_0 = ["healer"];
        exports.dominators.UPGRADES_TIER_0 = ["destroyerDominator", "gunnerDominator", "trapperDominator"];
        exports.sanctuaries.UPGRADES_TIER_0 = ["sanctuaryTier1", "sanctuaryTier2", "sanctuaryTier3", "sanctuaryTier4", "sanctuaryTier5", "sanctuaryTier6"];

    exports.bosses.UPGRADES_TIER_0 = ["sentries", "elites", "mysticals", "nesters", "rogues", "rammers", "terrestrials", "celestials", "eternals", "devBosses"];
        exports.sentries.UPGRADES_TIER_0 = ["sentrySwarm", "sentryGun", "sentryTrap", "shinySentrySwarm", "shinySentryGun", "shinySentryTrap", "sentinelMinigun", "sentinelLauncher", "sentinelCrossbow"];
        exports.elites.UPGRADES_TIER_0 = ["eliteDestroyer", "eliteGunner", "eliteSprayer", "eliteBattleship", "eliteSpawner", "eliteTrapGuard", "eliteSpinner", "eliteSkimmer", "legionaryCrasher", "guardian", "defender", "sprayerLegion"];
        exports.mysticals.UPGRADES_TIER_0 = ["sorcerer", "summoner", "enchantress", "exorcistor", "shaman"];
        exports.nesters.UPGRADES_TIER_0 = ["nestKeeper", "nestWarden", "nestGuardian"];
        exports.rogues.UPGRADES_TIER_0 = ["roguePalisade", "rogueArmada", "julius", "genghis", "napoleon"];
	    exports.rammers.UPGRADES_TIER_0 = ["bob", "nemesis"];
        exports.terrestrials.UPGRADES_TIER_0 = ["ares", "gersemi", "ezekiel", "eris", "selene"];
        exports.celestials.UPGRADES_TIER_0 = ["paladin", "freyja", "zaphkiel", "nyx", "theia", "atlas", "rhea", "julius", "genghis", "napoleon"];
        exports.eternals.UPGRADES_TIER_0 = ["odin", "kronos"];
        exports.devBosses.UPGRADES_TIER_0 = ["taureonBoss", "zenphiaBoss", "dogeiscutBoss", "trplnrBoss"];
    
    exports.generators.UPGRADES_TIER_0 = ["eggGenerator", "rockGenerator", "cursedGenerator", "cursed", "cube"];
        exports.rockGenerator.UPGRADES_TIER_0 = [
            "developer"     , "stoneGenerator"   , "tools",
            "basic"         , "rockGenerator"    , "gravelGenerator",
            "spectator"     , "wallGenerator"    , "moonGenerator"
        ];
            exports.stoneGenerator.UPGRADES_TIER_0 = exports.rockGenerator.UPGRADES_TIER_0;
            exports.wallGenerator.UPGRADES_TIER_0 = exports.rockGenerator.UPGRADES_TIER_0;
            exports.moonGenerator.UPGRADES_TIER_0 = exports.rockGenerator.UPGRADES_TIER_0;
            exports.gravelGenerator.UPGRADES_TIER_0 = exports.rockGenerator.UPGRADES_TIER_0;

    exports.testing.UPGRADES_TIER_0 = ["funTanks", "testingTanks", "legacyTanks"];
        exports.funTanks.UPGRADES_TIER_0 = ["florr_tank", "vanquisher", "armyOfOne", "godbasic", "maximumOverdrive", "meonwaymytodoyourmom", "medoingyourmom", "mummifier", "auraBasic", "auraHealer", "weirdAutoBasic", "ghoster", "switcheroo", "tracker3", "splitTanks", "tank", "spamOctoTank", "lambo", "bugatti", "ssc", "peis"];
            exports.splitTanks.UPGRADES_TIER_0 = [["developer", "basic"], ["developer", "developer"], ["aura", "basic"], ["aura", "basic"]];
        exports.testingTanks.UPGRADES_TIER_0 = ["diamondShape", "rotatedTrap", "colorMan", "miscTest", "mmaTest", "vulnturrettest", "onTest", "alphaGunTest"];
        exports.legacyTanks.UPGRADES_TIER_0 = ["weirdSpike", "oldBentBoomer", "quadBuilder", "master", "blunderbuss", "oldRimfire", "oldSpreadshot", "oldCommander", "autoTrapper", "prodigy", "mender", "tetraGunner", "corvette", "whirlwind", "flail"];
    exports.testing.UPGRADES_TIER_0 = ["funTanks", "testingTanks", "customShapes", "whirlwind"];
        //exports.funTanks.UPGRADES_TIER_0 = ["florr_tank", "vanquisher", "armyOfOne", "godbasic", "maximumOverdrive", "mummifier", "auraBasic", "auraHealer", "weirdAutoBasic", "ghoster", "switcheroo", "tracker3", ["developer", "developer"]];
        exports.testingTanks.UPGRADES_TIER_0 = ["diamondShape", "rotatedTrap", "colorMan", "miscTest", "mmaTest", "vulnturrettest", "onTest", "alphaGunTest", "testLayeredBoss"];
        exports.legacyTanks.UPGRADES_TIER_0 = ["weirdSpike", "oldBentBoomer", "quadBuilder", "master", "blunderbuss", "oldRimfire", "oldSpreadshot", "oldCommander", "autoTrapper", "prodigy", "mender", "tetraGunner", "corvette", "whirlwind", "flail"];
        exports.customShapes.UPGRADES_TIER_0 = ["baseCustomShape", "customShape1","customShapequestion"];

    exports.testing.UPGRADES_TIER_0 = ["funTanks", "testingTanks", "whirlwind"];
        exports.funTanks.UPGRADES_TIER_0 = ["florr_tank", "vanquisher", "armyOfOne", "godbasic", "maximumOverdrive", "mummifier", "auraBasic", "auraHealer", "weirdAutoBasic", "ghoster", "switcheroo", "tracker3", ["developer", "developer"]];
        exports.testingTanks.UPGRADES_TIER_0 = ["diamondShape", "rotatedTrap", "colorMan", "miscTest", "mmaTest", "vulnturrettest", "onTest", "alphaGunTest", "testLayeredBoss", "testDesmos", "testWhirlwind", "tooltipTank"];
