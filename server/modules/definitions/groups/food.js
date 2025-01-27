const { basePolygonDamage, basePolygonHealth } = require('../constants.js'),

// Code by Damocles (https://discord.com/channels/366661839620407297/508125275675164673/1090010998053818488)
// Albeit heavily modified because the math in the original didn't work LOL
makeRelic = (type, scale = 1, gem, SIZE) => {
    let relicCasing = {
        PARENT: ['genericEntity'],
        LABEL: 'Relic Casing',
        COLOR: type.COLOR,
        MIRROR_MASTER_ANGLE: true,
        SHAPE: [[-0.4,-1],[0.4,-0.25],[0.4,0.25],[-0.4,1]].map(r => r.map(s => s * scale))
    }, relicBody = {
        PARENT: ['genericEntity'],
        LABEL: 'Relic Mantle',
        COLOR: type.COLOR,
        MIRROR_MASTER_ANGLE: true,
        SHAPE: type.SHAPE
    };
    exports[Math.random().toString(36)] = relicCasing;
    exports[Math.random().toString(36)] = relicBody;
    let width = 6 * scale,
        y = 8.25 + ((scale % 1) * 5),
        isEgg = type.SHAPE == 0,
        casings = isEgg ? 8 : type.SHAPE,
        fraction = 360 / casings,
        GUNS = [],
        TURRETS = [{ POSITION: [32.5, 0, 0, 0, 0, 0], TYPE: relicBody }],
        PARENT = [type],
        additionalAngle = type.SHAPE % 2 === 0 ? 0 : fraction / 2;

    if (SIZE) {
        PARENT.push({ SIZE });
    }

    for (let i = 0; i < casings; i++) {
        let angle = i * fraction,
            gunAngle = angle + additionalAngle;
        if (isEgg) {
            GUNS.push({
                POSITION: [4, width, 2.5, 12,  0, gunAngle, 0]
            });
            TURRETS.push({
                POSITION: [8, -15,  0, angle, 0, 1],
                TYPE: relicCasing
            });
        } else {
            GUNS.push({
                POSITION: [4, width, 2.5, 12,  y, gunAngle, 0]
            });
            GUNS.push({
                POSITION: [4, width, 2.5, 12, -y, gunAngle, 0]
            });
            TURRETS.push({
                POSITION: [8, -15,  y, angle, 0, 1],
                TYPE: relicCasing
            });
            TURRETS.push({
                POSITION: [8, -15, -y, angle, 0, 1],
                TYPE: relicCasing
            });
        }
    }

    if (gem) {
        TURRETS.push({
            POSITION: [8, 0, 0, 0, 0, 1],
            TYPE: [gem, { MIRROR_MASTER_ANGLE: true }]
        });
    }

    return {
        PARENT,
        LABEL: type.LABEL + ' Relic',
        COLOR: "white", // This is the color of the floor, this makes it look hollow.
        BODY: {
            ACCELERATION: 0.001
        },
        CONTROLLERS: [],
        VALUE: type.VALUE * 100_000,
        GUNS,
        TURRETS
    };
},

makeRare = (type, level) => ({
    PARENT: ["food"],
    LABEL: ["Shiny", "Legendary", "Shadow", "Rainbow", "Transgender", "Albino", "Epilepsy"][level] + " " + type.LABEL,
    VALUE: [100, 500, 2000, 4000, 5000, 950000, 95000000000000000][level] * type.VALUE,
    SHAPE: type.SHAPE,
    SIZE: type.SIZE + level,
    COLOR: ["lightGreen", "teal", "pureBlack", "rainbow", "animatedTrans", "albino", "epilepsy"][level],
    ALPHA: level == 2 ? 0.25 : 1,
    BODY: {
        DAMAGE: type.BODY.DAMAGE + level,
        DENSITY: type.BODY.DENSITY + level,
        HEALTH: level == 5 ? 5 : [10, 20, 40, 80, 100, 5, 140][level] * type.BODY.HEALTH,
        PENETRATION: type.BODY.PENETRATION + level,
        ACCELERATION: type.BODY.ACCELERATION
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
}),

lerp = (a, b, t) => a + (b - a) * t,

makeLaby = (type, level) => {
    let usableSHAPE = Math.max(type.SHAPE, 3),
        downscale = Math.cos(Math.PI / usableSHAPE),
        strenghtMultiplier = 5 ** (level - 1);
    return {
        PARENT: "food",
        LABEL: ["", "Beta ", "Alpha ", "Omega ", "Gamma ", "Delta "][level] + type.LABEL,
        VALUE: type.VALUE * strenghtMultiplier,
        SHAPE: type.SHAPE,
        SIZE: level > 3 ? Math.max(40, type.SIZE * 2) * (1 + (level - 3) / 6) : type.SIZE * lerp(2 ** level, 1 + level / 3, Math.min(1, (type.SIZE - 5) / 17)),
        COLOR: type.COLOR,
        ALPHA: type.ALPHA,
        BODY: {
            DAMAGE: type.BODY.DAMAGE,
            DENSITY: type.BODY.DENSITY,
            HEALTH: type.BODY.HEALTH * strenghtMultiplier,
            PENETRATION: type.BODY.PENETRATION,
            ACCELERATION: type.BODY.ACCELERATION
        },
        VARIES_IN_SIZE: false,
        DRAW_HEALTH: type.DRAW_HEALTH,
        GIVE_KILL_MESSAGE: type.GIVE_KILL_MESSAGE || level > 2,
        GUNS: type.GUNS,
        TURRETS: [...(type.TURRETS ? type.TURRETS : []), ...Array(level).fill().map((_, i) => ({
            POSITION: [20 * downscale ** (i + 1), 0, 0, !(i & 1) ? 180 / usableSHAPE : 0, 0, 1],
            TYPE: [type, { MIRROR_MASTER_ANGLE: true }]
        }))]
    };
};

// EGGS
exports.egg = {
    PARENT: ["food"],
    LABEL: "Egg",
    VALUE: 10,
    SHAPE: 0,
    SIZE: 5,
    COLOR: "veryLightGrey",
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.0011,
        PENETRATION: 0.0011,
        PUSHABILITY: 0,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: false,
};
exports.gem = {
    PARENT: ["food"],
    LABEL: "Gem",
    VALUE: 2e3,
    SHAPE: 6,
    SIZE: 5,
    COLOR: "teal",
    BODY: {
        DAMAGE: basePolygonDamage / 4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
exports.jewel = {
    PARENT: ["food"],
    LABEL: "Jewel",
    VALUE: 1e5,
    SHAPE: 6,
    SIZE: 12,
    COLOR: "yellow",
    BODY: {
        DAMAGE: basePolygonDamage / 4,
        DENSITY: 4,
        HEALTH: 50,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
exports.shinyEgg = makeRare(exports.egg, 0);
exports.legendaryEgg = makeRare(exports.egg, 1);
exports.shadowEgg = makeRare(exports.egg, 2);
exports.rainbowEgg = makeRare(exports.egg, 3);
exports.transEgg = makeRare(exports.egg, 4); //ironic
exports.albinoEgg = makeRare(exports.egg, 5);
exports.epilepsyEgg = makeRare(exports.egg, 6);

// SQUARES
exports.square = {
    PARENT: ["food"],
    LABEL: "Square",
    VALUE: 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: "gold",
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
        ACCELERATION: 0.0075
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.shinySquare = makeRare(exports.square, 0);
exports.legendarySquare = makeRare(exports.square, 1);
exports.shadowSquare = makeRare(exports.square, 2);
exports.rainbowSquare = makeRare(exports.square, 3);
exports.transSquare = makeRare(exports.square, 4);
exports.albinoSquare = makeRare(exports.square, 5);
exports.epilepsySquare = makeRare(exports.square, 6);

// TRIANGLES
exports.triangle = {
    PARENT: ["food"],
    LABEL: "Triangle",
    VALUE: 120,
    SHAPE: 3,
    SIZE: 10,
    COLOR: "orange",
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
        ACCELERATION: 0.005
    },
    DRAW_HEALTH: true,
};
exports.shinyTriangle = makeRare(exports.triangle, 0);
exports.legendaryTriangle = makeRare(exports.triangle, 1);
exports.shadowTriangle = makeRare(exports.triangle, 2);
exports.rainbowTriangle = makeRare(exports.triangle, 3);
exports.transTriangle = makeRare(exports.triangle, 4);
exports.albinoTriangle = makeRare(exports.triangle, 5);
exports.epilepsyTriangle = makeRare(exports.triangle, 6);

// PENTAGONS
exports.pentagon = {
    PARENT: ["food"],
    LABEL: "Pentagon",
    VALUE: 400,
    SHAPE: 5,
    SIZE: 20,
    COLOR: "purple",
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
        ACCELERATION: 0.0035
    },
    DRAW_HEALTH: true,
};
exports.shinyPentagon = makeRare(exports.pentagon, 0);
exports.legendaryPentagon = makeRare(exports.pentagon, 1);
exports.shadowPentagon = makeRare(exports.pentagon, 2);
exports.rainbowPentagon = makeRare(exports.pentagon, 3);
exports.transPentagon = makeRare(exports.pentagon, 4);
exports.albinoPentagon = makeRare(exports.pentagon, 5);
exports.epilepsyPentagon = makeRare(exports.pentagon, 6);

// BETA PENTAGONS
exports.betaPentagon = {
    PARENT: ["food"],
    LABEL: "Beta Pentagon",
    VALUE: 2500,
    SHAPE: 5,
    SIZE: 30,
    COLOR: "purple",
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 50 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        PENETRATION: 1.1,
        SHIELD: 20 * basePolygonHealth,
        REGEN: 0.2,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.shinyBetaPentagon = makeRare(exports.betaPentagon, 0); 
exports.legendaryBetaPentagon = makeRare(exports.betaPentagon, 1);
exports.shadowBetaPentagon = makeRare(exports.betaPentagon, 2);
exports.rainbowBetaPentagon = makeRare(exports.betaPentagon, 3);
exports.transBetaPentagon = makeRare(exports.betaPentagon, 4);
exports.albinoBetaPentagon = makeRare(exports.betaPentagon, 5);
exports.epilepsyBetaPentagon = makeRare(exports.betaPentagon, 6);


// ALPHA PENTAGONS
exports.alphaPentagon = {
    PARENT: ["food"],
    LABEL: "Alpha Pentagon",
    VALUE: 15e3,
    SHAPE: -5,
    SIZE: 58,
    COLOR: "purple",
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        PENETRATION: 1.1,
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
        ACCELERATION: 0.0025
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.shinyAlphaPentagon = makeRare(exports.alphaPentagon, 0);
exports.legendaryAlphaPentagon = makeRare(exports.alphaPentagon, 1);
exports.shadowAlphaPentagon = makeRare(exports.alphaPentagon, 2);
exports.rainbowAlphaPentagon = makeRare(exports.alphaPentagon, 3);
exports.transAlphaPentagon = makeRare(exports.alphaPentagon, 4);
exports.albinoAlphaPentagon = makeRare(exports.alphaPentagon, 5);
exports.epilepsyAlphaPentagon = makeRare(exports.alphaPentagon, 6);

// HEXAGONS
exports.hexagon = {
    PARENT: ["food"],
    LABEL: "Hexagon",
    VALUE: 500,
    SHAPE: 6,
    SIZE: 22,
    COLOR: "teal",
    BODY: {
        DAMAGE: 1.7 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 12 * basePolygonHealth,
        RESIST: 1.3,
        PENETRATION: 1.1,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
};
exports.shinyHexagon = makeRare(exports.hexagon, 0);
exports.legendaryHexagon = makeRare(exports.hexagon, 1);
exports.shadowHexagon = makeRare(exports.hexagon, 2);
exports.rainbowHexagon = makeRare(exports.hexagon, 3);
exports.transHexagon = makeRare(exports.hexagon, 4);

// 3D POLYGONS
exports.sphere = {
    PARENT: ["food"],
    LABEL: "The Sphere",
    FACING_TYPE: "noFacing",
    VALUE: 1e7,
    SHAPE: 0,
    SIZE: 9,
    COLOR: {
        BASE: "white",
        BRIGHTNESS_SHIFT: -15,
    },
    BODY: {
        DAMAGE: 10,
        DENSITY: 15,
        HEALTH: 300,
        PENETRATION: 15,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
    TURRETS: [{
        POSITION: [17, 0, 0, 0, 0, 1],
        TYPE: ["egg", { COLOR: { BASE: "white", BRIGHTNESS_SHIFT: -14 }, BORDERLESS: true }]
    }, {
        POSITION: [15, 1, -1, 0, 0, 1],
        TYPE: ["egg", { COLOR: { BASE: "white", BRIGHTNESS_SHIFT: -9 }, BORDERLESS: true }]
    }, {
        POSITION: [13, 2, -2, 0, 0, 1],
        TYPE: ["egg", { COLOR: { BASE: "white", BRIGHTNESS_SHIFT: -8 }, BORDERLESS: true }]
    }, {
        POSITION: [11, 3, -3, 0, 0, 1],
        TYPE: ["egg", { COLOR: { BASE: "white", BRIGHTNESS_SHIFT: -3 }, BORDERLESS: true }]
    }, {
        POSITION: [8, 3.25, -3.25, 0, 0, 1],
        TYPE: ["egg", { COLOR: { BASE: "white", BRIGHTNESS_SHIFT: 3 }, BORDERLESS: true }]
    }, {
        POSITION: [6, 3, -3, 0, 0, 1],
        TYPE: ["egg", { COLOR: { BASE: "white", BRIGHTNESS_SHIFT: 9 }, BORDERLESS: true }]
    }]
};
exports.cube = {
    PARENT: ["food"],
    LABEL: "The Cube",
    VALUE: 2e7,
    SIZE: 10,
    COLOR: "white",
    SHAPE: "M 0.0575 0.0437 V 0.9921 L 0.8869 0.5167 V -0.4306 L 0.0575 0.0437 Z M -0.0583 0.0437 V 0.9921 L -0.8869 0.5159 V -0.4306 L -0.0583 0.0437 Z M 0 -0.0556 L 0.829 -0.5266 L 0 -1 L -0.8254 -0.527 L 0 -0.0556",
    BODY: {
        DAMAGE: 12,
        DENSITY: 20,
        HEALTH: 500,
        PENETRATION: 17.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
exports.tetrahedron = {
    PARENT: ["food"],
    LABEL: "The Tetrahedron",
    VALUE: 3e7,
    SIZE: 12,
    COLOR: "white",
    SHAPE: "M 0.058 0.044 V 1 L 0.894 -0.434 L 0.058 0.044 Z M -0.0588 0.044 V 1 L -0.894 -0.434 L -0.0588 0.044 Z M 0 -0.056 L 0.8356 -0.5308 L -0.832 -0.5312 L 0 -0.056",
    BODY: {
        DAMAGE: 15,
        DENSITY: 23,
        HEALTH: 666,
        PENETRATION: 22.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.octahedron = {
    PARENT: ["food"],
    LABEL: "The Octahedron",
    VALUE: 4e7,
    SIZE: 13,
    COLOR: "white",
    SHAPE: "M 0.06 -0.06 L 0.95 -0.06 L 0.06 -0.95 L 0.06 -0.06 M -0.06 0.06 L -0.06 0.95 L -0.95 0.06 L -0.06 0.06 M -0.06 -0.06 L -0.95 -0.06 L -0.06 -0.95 L -0.06 -0.06 M 0.06 0.06 L 0.06 0.95 L 0.95 0.06 L 0.06 0.06",
    BODY: {
        DAMAGE: 18,
        DENSITY: 26,
        HEALTH: 866,
        PENETRATION: 30,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.dodecahedron = {
    PARENT: ["food"],
    LABEL: "The Dodecahedron",
    VALUE: 5e7,
    SIZE: 18,
    COLOR: "white",
    SHAPE: "M -0.3273 -0.4318 H 0.3045 L 0.5068 0.1727 L -0.0091 0.5455 L -0.5227 0.1727 L -0.3273 -0.4318 Z M -0.6068 0.2682 L -0.0773 0.6545 V 0.9591 L -0.5955 0.7977 L -0.9136 0.3545 L -0.6068 0.2682 Z M 0.5909 0.2682 L 0.0523 0.6591 V 0.9636 L 0.5773 0.7955 L 0.8955 0.3545 L 0.5909 0.2682 Z M -0.65 0.1455 L -0.4477 -0.4818 L -0.6318 -0.7505 L -0.9545 -0.3182 V 0.2318 L -0.65 0.1455 Z M 0.4273 -0.4841 L 0.6318 0.1455 L 0.9341 0.2341 V -0.3136 L 0.6145 -0.7591 L 0.4273 -0.4841 Z M -0.0091 -1 L -0.5318 -0.8341 L -0.3455 -0.5609 H 0.3227 L 0.5159 -0.8314 L -0.0091 -1",
    BODY: {
        DAMAGE: 22.5,
        DENSITY: 30,
        HEALTH: 1000,
        RESIST: 10,
        PENETRATION: 35,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.icosahedron = {
    PARENT: ["food"],
    LABEL: "The Icosahedron",
    VALUE: 1e8,
    SIZE: 20,
    COLOR: "white",
    SHAPE: "M -0.39 -0.245 L 0.392 -0.245 L 0 0.47 L -0.39 -0.245 Z M -0.465 -0.2 L -0.893 0.475 L -0.073 0.51 L -0.465 -0.2 Z M 0.4636 -0.2 L 0.073 0.509 L 0.891 0.4736 L 0.4636 -0.2 Z M 0 -1 L -0.39 -0.33 L 0.389 -0.328 L 0 -1 Z M -0.142 -0.925 L -0.875 -0.506 L -0.48 -0.339 L -0.142 -0.925 Z M -0.925 0.366 L -0.925 -0.431 L -0.525 -0.266 L -0.925 0.366 Z M -0.042 0.595 L -0.808 0.562 L -0.042 1 L -0.042 0.595 Z M 0.042 0.595 L 0.808 0.562 L 0.042 1 L 0.042 0.595 Z M 0.142 -0.925 L 0.858 -0.516 L 0.48 -0.339 L 0.142 -0.925 Z M 0.925 0.366 L 0.925 -0.452 L 0.523 -0.269 L 0.925 0.366 Z",
    BODY: {
        DAMAGE: 17.5,
        DENSITY: 25,
        HEALTH: 1200,
        RESIST: 7.5,
        PENETRATION: 22.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};

// RELICS
for (let [gemColor, name] of [
    [undefined, ""],
    ["powerGem", "Power"],
    ["spaceGem", "Space"],
    ["realityGem", "Reality"],
    ["soulGem", "Soul"],
    ["timeGem", "Time"],
    ["mindGem", "Mind"]
]) {
    let gem;
    if (gemColor) {
        gem = exports[name + "Gem"] = {
            PARENT: ['gem'],
            LABEL: name + ' Gem',
            SHAPE: 6,
            COLOR: gemColor
        }
    }

    exports[name + "EggRelic"] = makeRelic(exports.egg, 0.5, gem, 7);
    exports[name + "SquareRelic"] = makeRelic(exports.square, 1, gem);
    exports[name + "TriangleRelic"] = makeRelic(exports.triangle, 1.45, gem);
    exports[name + "PentagonRelic"] = makeRelic(exports.pentagon, -0.6, gem);
    exports[name + "BetaPentagonRelic"] = makeRelic(exports.betaPentagon, -0.6, gem);
    exports[name + "AlphaPentagonRelic"] = makeRelic(exports.alphaPentagon, -0.6, gem);
}

// 4D
exports.tesseract = {
    PARENT: ["food"],
    LABEL: "The Tesseract",
    VALUE: 42e7,
    SIZE: 25,
    COLOR: "white",
    SHAPE: "M -0.43 0.35 L -0.71 0.63 L -0.71 -0.63 L -0.43 -0.35 L -0.43 0.35 M -0.35 0.43 L -0.63 0.71 L 0.63 0.71 L 0.35 0.43 L -0.35 0.43 M 0.35 -0.43 L 0.63 -0.71 L -0.63 -0.71 L -0.35 -0.43 L 0.35 -0.43 M 0.43 -0.35 L 0.71 -0.63 L 0.71 0.63 L 0.43 0.35 L 0.43 -0.35 M 0.32 0.32 L 0.32 -0.32 L -0.32 -0.32 L -0.32 0.32 L 0.32 0.32",
    BODY: {
        DAMAGE: 25,
        DENSITY: 40,
        HEALTH: 2000,
        PENETRATION: 50,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};

// wtf
exports.cursed = {
    PARENT: ["food"],
    LABEL: "The Very Cursed Polygon",
    VALUE: 9e10,
    SIZE: 30,
    COLOR: "white",
    SHAPE: [[-0.772,-0.748],[-0.43,0.15],[0.913,-0.38],[0.39,-1.16],[-0.4,-1.39],[-0.76,-1.573],[-1.05,-1.39],[-1.62,-1.32],[-1.98,-0.26],[-1.16,0.37],[-0.85,-0.03],[-1.33,-0.44],[-1.43,-1.01],[-1.24,-1.11],[-0.73,-1.34],[0.2,-0.8],[-0.13,-0.457],[-0.27,-0.16],[-0.514,-0.84],[-0.615,-0.626],[-0.79,-1.07],[-0.96,-1.15],[-1.25,-0.895],[-1.053,-0.47],[-0.91,-0.53],[-0.907,-0.705]],
    BODY: {
        DAMAGE: 12,
        DENSITY: 20,
        HEALTH: 500,
        PENETRATION: 17.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};


// LABY
for (let tier = 0; tier < 6; tier++) {
    for (let poly of [ "egg", "square", "triangle", "pentagon", "hexagon" ]) {
        for (let shiny of [ "", "shiny", "legendary", "shadow", "rainbow", "trans" ]) {
            let food = shiny + poly[0].toUpperCase() + poly.slice(1);
            food = food[0].toLowerCase() + food.slice(1);
            exports[`laby${tier}${food[0].toUpperCase() + food.slice(1)}`] = makeLaby(exports[food], tier);
        }
    }
}