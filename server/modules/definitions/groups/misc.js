const { combineStats, skillSet, makeAuto, makeDeco, makeMulti } = require('../facilitators.js');
const { base, statnames, gunCalcNames, dfltskl, smshskl } = require('../constants.js');
const { genericTank } = require('./generics.js')
const { trapper, healer } = require('./tanks.js');
const g = require('../gunvals.js');

// OBSTACLES
exports.rock = {
    TYPE: "wall",
    DAMAGE_CLASS: 1,
    LABEL: "Rock",
    FACING_TYPE: "turnWithSpeed",
    SHAPE: -9,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: "grey",
    VARIES_IN_SIZE: true,
    ACCEPTS_SCORE: false,
};
exports.stone = {
    PARENT: ["rock"],
    LABEL: "Stone",
    SIZE: 32,
    SHAPE: -7,
};
exports.moon = {
    PARENT: ["rock"],
    LABEL: "Moon",
    SIZE: 60,
    SHAPE: 0,
    VARIES_IN_SIZE: false,
};
exports.gravel = {
    PARENT: ["rock"],
    LABEL: "Gravel",
    SIZE: 16,
    SHAPE: -7,
};
exports.wall = {
    PARENT: ["rock"],
    LABEL: "Wall",
    SIZE: 25,
    SHAPE: 4,
    VARIES_IN_SIZE: false,
};

// DOMINATORS
exports.dominationBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { startAngle: Math.PI / 2, speed: 0, independent: true }]],
    COLOR: "black",
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.tankBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true }]],
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.dominator = {
    PARENT: ["genericTank"],
    LABEL: "Dominator",
    UPGRADE_LABEL: 'Unknown',
    ON_MINIMAP: false,
    DANGER: 7,
    SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
    }),
    LEVEL: -1,
    BODY: {
        RESIST: 100,
        SPEED: 1.32,
        ACCELERATION: 0.8,
        HEALTH: 590,
        DAMAGE: 6,
        PENETRATION: 0.25,
        FOV: 0.5,
        PUSHABILITY: 0,
        HETERO: 0,
        SHIELD: base.SHIELD * 1.4,
    },
    CONTROLLERS: ["nearestDifferentMaster"],
    DISPLAY_NAME: true,
    TURRETS: [
        {
            POSITION: [22, 0, 0, 0, 360, 0],
            TYPE: "dominationBody",
        },
    ],
    CAN_BE_ON_LEADERBOARD: false,
    GIVE_KILL_MESSAGE: false,
    ACCEPTS_SCORE: false,
    HITS_OWN_TYPE: "pushOnlyTeam",
};
exports.tank = {
    PARENT: ["genericTank"],
    LABEL: "Tank",
    DANGER: 7,
    SKILL_CAP: [255, 255, 0, 0, 0, 0, 0, 0, 255, 255],
    SKILL: [255, 255, 0, 0, 0, 0, 0, 0, 255, 255],
    LEVEL: 150,
    SIZE: 50,
    BODY: {
        RESIST: 100,
        SPEED: 0.5,
        ACCELERATION: 0.8,
        HEALTH: 2500,
        DAMAGE: 100,
        PENETRATION: 0.25,
        FOV: 1.5,
        PUSHABILITY: 0,
        HETERO: 0,
        SHIELD: 2500,
    },
    CONTROLLERS: ["nearestDifferentMaster"],
    DISPLAY_NAME: true,
    TURRETS: [
        {
            POSITION: [22, 0, 0, 0, 360, 0],
            TYPE: "tankBody",
        },
    ],
    CAN_BE_ON_LEADERBOARD: true,
    GIVE_KILL_MESSAGE: false,
    ACCEPTS_SCORE: true,
    HITS_OWN_TYPE: "pushOnlyTeam",
};
exports.destroyerDominator = {
    PARENT: ["dominator"],
    UPGRADE_LABEL: 'Destroyer',
    GUNS: [
        {
            POSITION: [15.25, 6.75, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.destroyerDominator]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [5, 6.75, -1.6, 6.75, 0, 0, 0],
        },
    ],
};
exports.gunnerDominator = {
    PARENT: ["dominator"],
    UPGRADE_LABEL: 'Gunner',
    GUNS: [
        {
            POSITION: [14.25, 3, 1, 0, -2, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14.25, 3, 1, 0, 2, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15.85, 3, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [5, 8.5, -1.6, 6.25, 0, 0, 0],
        },
    ],
};
exports.trapperDominator = {
    PARENT: ["dominator"],
    UPGRADE_LABEL: 'Trapper',
    FACING_TYPE: "autospin",
    CONTROLLERS: ["alwaysFire"],
    GUNS: [
        {
            POSITION: [4, 3.75, 1, 8, 0, 0, 0],
        },
        {
            POSITION: [1.25, 3.75, 1.7, 12, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            },
        },
        {
            POSITION: [4, 3.75, 1, 8, 0, 45, 0],
        },
        {
            POSITION: [1.25, 3.75, 1.7, 12, 0, 45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            },
        },
        {
            POSITION: [4, 3.75, 1, 8, 0, 90, 0],
        },
        {
            POSITION: [1.25, 3.75, 1.7, 12, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            },
        },
        {
            POSITION: [4, 3.75, 1, 8, 0, 135, 0],
        },
        {
            POSITION: [1.25, 3.75, 1.7, 12, 0, 135, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            },
        },
        {
            POSITION: [4, 3.75, 1, 8, 0, 180, 0],
        },
        {
            POSITION: [1.25, 3.75, 1.7, 12, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            },
        },
        {
            POSITION: [4, 3.75, 1, 8, 0, 225, 0],
        },
        {
            POSITION: [1.25, 3.75, 1.7, 12, 0, 225, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            },
        },
        {
            POSITION: [4, 3.75, 1, 8, 0, 270, 0],
        },
        {
            POSITION: [1.25, 3.75, 1.7, 12, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            },
        },
        {
            POSITION: [4, 3.75, 1, 8, 0, 315, 0],
        },
        {
            POSITION: [1.25, 3.75, 1.7, 12, 0, 315, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            },
        },
    ],
};

// SANCTUARIES
exports.sanctuaryHealer = {
    PARENT: "genericTank",
    LABEL: "",
    BODY: {
        FOV: base.FOV * 1.2,
    },
    CONTROLLERS: [["spin", { independent: true, speed: -0.05 }]],
    TURRETS: [{ 
        POSITION: { SIZE: 13, LAYER: 1 },
        TYPE: ['healerSymbol', { CONTROLLERS: [["spin", { startAngle: Math.PI / 2, speed: 0, independent: true }]] }]
    }],
};

let sancTiers =       [3, 6, 8, 9, 10, 12]
let sancHealerTiers = [2, 3, 4]
for (let tier of sancHealerTiers) {
    exports['sanctuaryHealerTier' + (sancHealerTiers.indexOf(tier) + 1)] = {
        PARENT: "sanctuaryHealer",
        GUNS: (() => {
            let output = []
            for (let i = 0; i < tier; i++) {
                output.push({
                    POSITION: { LENGTH: 8, WIDTH: 9, ASPECT: -0.5, X: 12.5, ANGLE: (360 / tier) * i },
                }, {
                    POSITION: { LENGTH: 8, WIDTH: 10, X: 10, ANGLE: (360 / tier) * i },
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.healer, {shudder: 0.1, spray: 0.1, speed: 0.8, reload: 1.2}]),
                        TYPE: "healerBullet",
                        AUTOFIRE: true,
                    }
                })
            }
            return output
        })()
    }
}

exports.sanctuary = {
    PARENT: "dominator",
    LABEL: "Sanctuary",
    LEVEL: 45,
    SIZE: 20,
    FACING_TYPE: "autospin",
    CONTROLLERS: ["alwaysFire"],
    SKILL: skillSet({
        rld: 1.25,
        dam: 1.25,
        str: 1.25,
    }),
    BODY: {
        HEALTH: 750,
        DAMAGE: 7.5,
        SHIELD: base.SHIELD * 1.5,
    },
    TURRETS: [{
        POSITION: { SIZE: 22 },
        TYPE: "dominationBody",
    }]
};

for (let tier of sancTiers) {
    let sancIndex = sancTiers.indexOf(tier)
    exports['sanctuaryTier' + (sancIndex + 1)] = {
        PARENT: "sanctuary",
        TURRETS: [],
        UPGRADE_LABEL: 'Tier ' + (sancIndex + 1),
        GUNS: (() => {
            let output = []
            for (let i = 0; i < tier; i++) {
                output.push({
                    POSITION: {LENGTH: 12, WIDTH: 4, ANGLE: (360/tier)*i}
                }, {
                    POSITION: {LENGTH: 1.5, WIDTH: 4, ASPECT: 1.7, X: 12, ANGLE: (360/tier)*i},
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, {shudder: 2, spray: 1.2, speed: 0.8, reload: 1.5}]),
                        TYPE: "trap",
                        STAT_CALCULATOR: gunCalcNames.trap,
                        AUTOFIRE: true,
                    },
                })
            }
            return output
        })()
    }
    exports['sanctuaryTier' + (sancIndex + 1)].TURRETS.push({
        POSITION: { SIZE: 22 },
        TYPE: "dominationBody",
    }, {
        POSITION: { SIZE: 8.5, LAYER: 1 },
        TYPE: "sanctuaryHealerTier" + (sancIndex < 2 ? 1 : sancIndex < 4 ? 2 : sancIndex < 6 ? 3 : 3),
    })
}

// CRASHERS
exports.crasher = {
    TYPE: "crasher",
    LABEL: "Crasher",
    COLOR: "pink",
    SHAPE: 3,
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    AI: {
        NO_LEAD: true,
    },
    BODY: {
        SPEED: 5,
        ACCELERATION: 1.4,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: "motor",
    FACING_TYPE: "smoothWithMotion",
    HITS_OWN_TYPE: "hard",
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.crasherSpawner = {
    PARENT: ["genericTank"],
    LABEL: "Spawned",
    STAT_NAMES: statnames.drone,
    CONTROLLERS: ["nearestDifferentMaster"],
    COLOR: "pink",
    INDEPENDENT: true,
    AI: {
        chase: true,
    },
    MAX_CHILDREN: 4,
    GUNS: [
        {
            POSITION: [6, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
                TYPE: [
                    "drone",
                    {
                        LABEL: "Crasher",
                        VARIES_IN_SIZE: true,
                        DRAW_HEALTH: true,
                    },
                ],
                SYNCS_SKILLS: true,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
    ],
};

// SENTRIES
exports.sentry = {
    PARENT: ["genericTank"],
    TYPE: "crasher",
    LABEL: "Sentry",
    DANGER: 3,
    COLOR: "pink",
    UPGRADE_COLOR: "pink",
    SHAPE: 3,
    SIZE: 10,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8,
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    AI: {
        NO_LEAD: true,
    },
    BODY: {
        FOV: 0.5,
        ACCELERATION: 0.75,
        DAMAGE: base.DAMAGE,
        SPEED: 0.5 * base.SPEED,
        HEALTH: 0.3 * base.HEALTH,
    },
    MOTION_TYPE: "motor",
    FACING_TYPE: "smoothToTarget",
    HITS_OWN_TYPE: "hard",
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.trapTurret = {
    PARENT: ["genericTank"],
    LABEL: "Turret",
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ["nearestDifferentMaster", 'onlyAcceptInArc'],
    COLOR: "grey",
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [
        {
            POSITION: [16, 14, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 14, 1.8, 16, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.fast, g.halfreload]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
};

exports.shotTrapBox = {
    PARENT: 'unsetTrap',
    MOTION_TYPE: "glide",
}
let makeshottrapTurretProps = () => ({
    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.shotgun, g.mach, {speed: 0.7, maxSpeed: 0.2, damage: 1.5}]),
    AUTOFIRE: true,
    TYPE: "shotTrapBox",
    STAT_CALCULATOR: gunCalcNames.block,
});
exports.shottrapTurret = {
    PARENT: ["genericTank"],
    LABEL: 'Turret',
    BODY: {
        FOV: 0,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster', 'onlyAcceptInArc'], 
    COLOR: "grey",
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [ {
            POSITION: [ 4, 1.5, 1, 11, -3, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 4, 2,   1, 11,  3, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 4, 1.5, 1, 13,  0, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2,   1, 11,  1, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2,   1, 12, -1, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 1.5, 1, 11,  1, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2,   1, 13, -1, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2,5, 1, 13,  1, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2,   1, 13,  2, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2,   1, 13, -2, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2.5, 1, 13, -2, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2.5, 1, 13,  2, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 1, 2,   1, 13, -2, 0, 0 ], PROPERTIES: makeshottrapTurretProps(),
    }, {
            POSITION: [ 16, 14, -1.4,  0, 0, 0, 0 ], 
    }, {
            POSITION: [  6, 14,  1.6, 16, 0, 0, 0 ], PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.shotgun, g.mach, g.fake]),
                AUTOFIRE: true,
                TYPE: "bullet"
            }
    } ]
};
exports.barricadeTurret = {
    PARENT: ["genericTank"],
    LABEL: "Turret",
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ["nearestDifferentMaster"],
    COLOR: "grey",
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [
        {
            POSITION: [24, 8, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 8, 1.3, 22, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [4, 8, 1.3, 18, 0, 0, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [4, 8, 1.3, 14, 0, 0, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
};

exports.sentrySwarm = {
    PARENT: ["sentry"],
    UPGRADE_LABEL: "Swarm Sentry",
    UPGRADE_COLOR: "pink",
    GUNS: [
        {
            POSITION: [7, 14, 0.6, 7, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
exports.megaAutoTurret = {
  PARENT: ["autoTurret"],
  BODY: {
    FOV: 2,
    SPEED: 0.9
  },
  CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
  GUNS: [{
    POSITION: [22, 14, 1, 0, 0, 0, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
      TYPE: "bullet"
    }
  }]
}
exports.sentryGun = makeAuto(exports.sentry, "Sentry", {
    type: exports.megaAutoTurret,
    size: 12,
});
exports.sentryGun.UPGRADE_LABEL = "Gun Sentry";
exports.sentryTrap = makeAuto(exports.sentry, "Sentry", {
    type: exports.trapTurret,
    size: 12,
});
exports.sentryTrap.UPGRADE_LABEL = "Trap Sentry";
exports.shinySentry = {
    PARENT: ["sentry"],
    COLOR: "lightGreen",
    UPGRADE_COLOR: "lightGreen",
    DANGER: 4,
    SIZE: 12,
    VALUE: 50000,
    SHAPE: 3,
    BODY: {
        HEALTH: 0.6 * base.HEALTH
    },
};
exports.shinySentrySwarm = {
    PARENT: ["shinySentry"],
    UPGRADE_LABEL: "Shiny Swarm Sentry",
    UPGRADE_COLOR: "lightGreen",
    GUNS: [
        {
            POSITION: [6, 11, 1.3, 7, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil, g.mach, { reload: 0.25 }]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
exports.artilleryAutoTankgun = {
    PARENT: ["genericTank"],
    LABEL: "Artillery",
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    COLOR: "grey",
    GUNS: [{
        POSITION: [17, 3, 1, 0, -6, -7, 0.25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, { reload: 0.25 }]),
            TYPE: "bullet",
            LABEL: "Secondary",
        },
    },
        {
            POSITION: [17, 3, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, { reload: 0.25 }]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, { reload: 0.25 }]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
    ],
};
exports.shinySentryGun = makeAuto(exports.shinySentry, "Sentry", {
    type: exports.artilleryAutoTankgun,
    size: 12,
});
exports.shinySentryGun.UPGRADE_LABEL = "Shiny Gun Sentry";
exports.barricadeAutoTankGun = {
    PARENT: ["genericTank"],
    LABEL: "Turret",
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ["nearestDifferentMaster"],
    COLOR: "grey",
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [
        {
            POSITION: [24, 8, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 8, 1.3, 22, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange, { reload: 0.25 }]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [4, 8, 1.3, 18, 0, 0, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange, { reload: 0.25 }]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [4, 8, 1.3, 14, 0, 0, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange, { reload: 0.25 }]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
};
exports.shinySentryTrap = makeAuto(exports.shinySentry, "Sentry", {
    type: exports.barricadeAutoTankGun,
    size: 12,
});
exports.shinySentryTrap.UPGRADE_LABEL = "Shiny Trap Sentry";

// SENTINELS (by ranar)
exports.sentinel = {
  PARENT: ["genericTank"],
  TYPE: "crasher",
  LABEL: "Sentinel",
  DANGER: 7,
  COLOR: "purple",
  SHAPE: 5,
  SIZE: 13,
  SKILL: skillSet({
    rld: 0.7, //reload
    dam: 0.45, //bullet damage
    pen: 0.6, //bullet penetration
    str: 0.6, //bullet health
    atk: 0.5, //bullet speed
    spd: 0.6, //body damage
    hlt: 0.85, //max health
    shi: 0.45, //shield capacity
    rgn: 0.35, //shield regeneration
    mob: 0, //movement speed
  }),
  VALUE: 26668,
  VARIES_IN_SIZE: true,
  CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal", "minion"],
  AI: { NO_LEAD: true },
  BODY: {
    FOV: 0.8,
    ACCEL: 0.003,
    DAMAGE: base.DAMAGE * 2.1,
    SPEED: base.SPEED * 0.4,
    HEALTH: base.HEALTH * 2.1,
    SHIELD: base.SHIELD * 2.1,
    REGEN: base.REGEN * 0.15,
  },
  MOTION_TYPE: "motor",
  FACING_TYPE: "smoothToTarget",
  HITS_OWN_TYPE: "hard",
};
exports.sentinelMissile = {
  PARENT: ["bullet"],
  LABEL: "Missile",
  INDEPENDENT: true,
  BODY: {
    RANGE: 120,
    DENSITY: 3,
  },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */

      POSITION: [12, 10, 0, 0, 0, 180, 0],
      PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.pound,
          g.destroy, 
        ]),
        TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
        STAT_CALCULATOR: gunCalcNames.thruster,
      },
    },
    {
      POSITION: [14, 6, 1, 0, -2, 130, 0],
      PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([
          g.basic,
                    g.skim,
        ]),
        TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
        STAT_CALCULATOR: gunCalcNames.thruster,
      },
    },
    {
      POSITION: [14, 6, 1, 0, 2, 230, 0],
      PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.skim,
        ]),
        TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
        STAT_CALCULATOR: gunCalcNames.thruster,
      },
    },
  ],
};
exports.sentinelLauncher = {
  PARENT: ["sentinel"],
  UPGRADE_LABEL: "Missile Sentinel",
  UPGRADE_COLOR: "purple",
  GUNS: [
    {
      POSITION: [3, 12.45, -1.35, 17.2, 0, 0, 0],
            PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.gunner,
          g.pound,
          g.launcher,
        ]),
        TYPE: "sentinelMissile",
      },
    },
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [17.5, 13, 1.25, 0, 0, 0, 0],

    },
    {
      POSITION: [18.55, 20.25, 0.25, 1, 0, 0, 0],
    },
  ],
};
exports.sentinelCrossbow = {
  PARENT: ["sentinel"],
  UPGRADE_LABEL: "Crossbow Sentinel",
  UPGRADE_COLOR: "purple",
    GUNS: [
        {
            POSITION: [15, 2.5, 1, 0, 3.5, 35/2, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.rifle,
                    g.slow,
                    g.crossbow,
                    g.halfrecoil,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 2.5, 1, 0, -3.5, -35/2, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.rifle,
                    g.slow,
                    g.crossbow,
                    g.halfrecoil,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 3.5, 1, 0, 4, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.rifle,
                    g.slow,
                    g.crossbow,
                    g.halfrecoil,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 3.5, 1, 0, -4, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.rifle,
                    g.slow,
                    g.crossbow,
                    g.halfrecoil,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [24, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.rifle,
                    g.slow,
                    g.halfreload,
                    g.halfrecoil,
                ]),
                TYPE: "bullet",
            },
        },
    ],
};
exports.sentinelMinigun = {
  PARENT: ["sentinel"],
  UPGRADE_LABEL: "Minigun Sentinel",
  UPGRADE_COLOR: "purple",
  GUNS: [
  {
      POSITION: [16, 7.5, 1, 0, 4.5, 0, 0.2],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.mini,
          g.spam,
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [12.5, 7.5, -1.35, 0, 4.5, 0, 0.4],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.mini,
          g.spam,
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [16, 7.5, 1, 0, -4.5, 0, 0.2],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.mini,
          g.spam,
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [12.5, 7.5, -1.35, 0, -4.5, 0, 0.4],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.mini,
          g.spam,
        ]),
        TYPE: "bullet",
      },
    },
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [22.5, 9, 1, 0, 0, 0, 0.2],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.mini,
          g.spam,
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [20.4, 9, 1, 0, 0, 0, 0.4],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.mini,
          g.spam,
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [18.3, 9, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.mini,
          g.spam,
        ]),
        TYPE: "bullet",
      },
    },
  ],
};

// MISCELLANEOUS TANKS
exports.baseSwarmTurret = {
    PARENT: ["genericTank"],
    LABEL: "Protector",
    COLOR: "grey",
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: ["nearestDifferentMaster"],
    AI: {
        NO_LEAD: true,
        LIKES_SHAPES: true,
    },
    INDEPENDENT: true,
    GUNS: [
        {
            POSITION: [5, 4.5, 0.6, 7, 2, 0, 0.15],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 4.5, 0.6, 7, -2, 0, 0.15],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 4.5, 0.6, 7.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                TYPE: ["swarm", { INDEPENDENT: true, AI: { LIKES_SHAPES: true }}],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
exports.baseProtector = {
    PARENT: ["genericTank"],
    LABEL: "Base",
    UPGRADE_LABEL: "Base Protector",
    ON_MINIMAP: false,
    SIZE: 64,
    DAMAGE_CLASS: 0,
    ACCEPTS_SCORE: false,
    CAN_BE_ON_LEADERBOARD: false,
    IGNORED_BY_AI: true,
    HITS_OWN_TYPE: "pushOnlyTeam",
    SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        spd: 1,
        str: 1,
    }),
    BODY: {
        SPEED: 0,
        HEALTH: 1e4,
        DAMAGE: 10,
        PENETRATION: 0.25,
        SHIELD: 1e3,
        REGEN: 100,
        FOV: 1,
        PUSHABILITY: 0,
        RESIST: 10000,
        HETERO: 0,
    },
    FACING_TYPE: "autospin",
    TURRETS: [
        {
            POSITION: [25, 0, 0, 0, 360, 0],
            TYPE: "dominationBody",
        },
        {
            POSITION: [12, 7, 0, 45, 100, 0],
            TYPE: "baseSwarmTurret",
        },
        {
            POSITION: [12, 7, 0, 135, 100, 0],
            TYPE: "baseSwarmTurret",
        },
        {
            POSITION: [12, 7, 0, 225, 100, 0],
            TYPE: "baseSwarmTurret",
        },
        {
            POSITION: [12, 7, 0, 315, 100, 0],
            TYPE: "baseSwarmTurret",
        },
    ],
    GUNS: [
        {
            POSITION: [4.5, 11.5, -1.3, 6, 0, 45, 0],
        },
        {
            POSITION: [4.5, 11.5, -1.3, 6, 0, 135, 0],
        },
        {
            POSITION: [4.5, 11.5, -1.3, 6, 0, 225, 0],
        },
        {
            POSITION: [4.5, 11.5, -1.3, 6, 0, 315, 0],
        },
        {
            POSITION: [4.5, 8.5, -1.5, 7, 0, 45, 0],
        },
        {
            POSITION: [4.5, 8.5, -1.5, 7, 0, 135, 0],
        },
        {
            POSITION: [4.5, 8.5, -1.5, 7, 0, 225, 0],
        },
        {
            POSITION: [4.5, 8.5, -1.5, 7, 0, 315, 0],
        },
    ],
};

exports.mothership = {
    PARENT: ["genericTank"],
    LABEL: "Mothership",
    DANGER: 10,
    SIZE: genericTank.SIZE * (7 / 3),
    SHAPE: 16,
    STAT_NAMES: statnames.drone,
    VALUE: 5e5,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    BODY: {
        REGEN: 0,
        FOV: 1,
        SHIELD: 0,
        ACCEL: 0.2,
        SPEED: 0.3,
        HEALTH: 2000,
        PUSHABILITY: 0.15,
        DENSITY: 0.2,
        DAMAGE: 1.5,
    },
    HITS_OWN_TYPE: "pushOnlyTeam",
    GUNS: (() => {
        let e = [],
            T = [1];
        for (let e = 1; e < 8.5; e += 0.5) {
            let t = e / 16;
            T.push(t);
        }
        for (let t = 0; t < 16; t++) {
            let S = 22.5 * (t + 1),
                E = {
                    MAX_CHILDREN: 2,
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.mothership]),
                    TYPE: "drone",
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                    WAIT_TO_CYCLE: true,
                };
            t % 2 == 0 &&
                (E.TYPE = [
                    "drone",
                    {
                        AI: {
                            skynet: true,
                        },
                        INDEPENDENT: true,
                        LAYER: 10,
                        BODY: {
                            FOV: 2,
                        },
                    },
                ]);
            let O = {
                POSITION: [4.3, 3.1, 1.2, 8, 0, S, T[t]],
                PROPERTIES: E,
            };
            e.push(O);
        }
        return e;
    })(),
};
exports.arenaCloser = {
    PARENT: ["genericTank"],
    LABEL: "Arena Closer",
    NAME: "Arena Closer",
    DANGER: 10,
    SIZE: 34,
    COLOR: "yellow",
    UPGRADE_COLOR: "yellow",
    LAYER: 13,
    BODY: {
        REGEN: 1e5,
        HEALTH: 1e6,
        DENSITY: 30,
        DAMAGE: 1e5,
        FOV: 10,
        SPEED: 8,
    },
    SKILL_CAP: Array(10).fill(255),
    SKILL: Array(10).fill(255),
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: "never",
    ARENA_CLOSER: true,
    GUNS: [{
        POSITION: [14, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.closer]),
            TYPE: [ "bullet", { LAYER: 12 } ]
        }
    }]
};
exports.arenaAnnihilator = {
    PARENT: ["genericTank"],
    LABEL: "Arena Annihilator",
    NAME: "Arena Annihilator",
    DANGER: 10,
    SIZE: 34,
    COLOR: 3,
    LAYER: 13,
    BODY: {
        REGEN: 1e5,
        HEALTH: 1e6,
        DENSITY: 30,
        DAMAGE: 1e5,
        FOV: 10,
        SPEED: 8,
    },
    SKILL_CAP: Array(10).fill(255),
    SKILL: Array(10).fill(255),
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: "never",
    ARENA_CLOSER: true,
    GUNS: [{
        POSITION: [20.5, 19.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.opCloser]),
            TYPE: [ "bullet", { LAYER: 12 } ]
        }
    }]
};
exports.arenaAnnihilator = {
    PARENT: ["genericTank"],
    LABEL: "Arena Annihilator",
    NAME: "Arena Annihilator",
    DANGER: 10,
    SIZE: 34,
    COLOR: 3,
    LAYER: 13,
    BODY: {
        REGEN: 1e5,
        HEALTH: 1e6,
        DENSITY: 30,
        DAMAGE: 1e5,
        FOV: 10,
        SPEED: 8,
    },
    SKILL_CAP: Array(10).fill(255),
    SKILL: Array(10).fill(255),
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: "never",
    ARENA_CLOSER: true,
    GUNS: [{
        POSITION: [20.5, 19.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.opCloser]),
            TYPE: [ "bullet", { LAYER: 12 } ]
        }
    }]
};

exports.antiTankMachineGunArm = {
    PARENT: ["genericTank"],
    CONTROLLERS: ["mapTargetToGoal"],
    SKILL_CAP: Array(10).fill(255),
    SKILL: Array(10).fill(255),
    GUNS: [
        {
            POSITION: [14.25, 3, 1, 0, -2, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op, {recoil: 0, spray: 0.1}]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14.25, 3, 1, 0, 2, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op, {recoil: 0, spray: 0.1}]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15.85, 3, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op, {recoil: 0, spray: 0.1}]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [5, 8.5, -1.6, 6.25, 0, 0, 0],
        },
    ],
}
exports.antiTankMachineGun = {
    PARENT: ["dominator"],
    LABEL: "Anti-Tank Machine Gun",
    UPGRADE_LABEL: "A.T.M.G.",
    CONTROLLERS: [['spin', {onlyWhenIdle: true}], 'nearestDifferentMaster'],
    LEVEL: 45,
    BODY: {
        RESIST: 100,
        SPEED: 3,
        ACCELERATION: 0.8,
        HEALTH: 1e99,
        DAMAGE: 6,
        PENETRATION: 0.25,
        FOV: 3,
        PUSHABILITY: 0,
        HETERO: 0,
        SHIELD: base.SHIELD * 1.4,
    },
    SKILL_CAP: Array(10).fill(255),
    SKILL: Array(10).fill(255),
    GUNS: [
        {
            POSITION: [18, 12, 0.8, 0, 0, 90, 0],
        },
        {
            POSITION: [18, 12, 0.8, 0, 0, 270, 0],
        },
        {
            POSITION: [14.25, 3, 1, 0, -2, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op, {recoil: 0, spray: 0.1}]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14.25, 3, 1, 0, 2, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op, {recoil: 0, spray: 0.1}]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15.85, 3, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op, {recoil: 0, spray: 0.1}]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [5, 8.5, -1.6, 6.25, 0, 0, 0],
        },
    ],
    TURRETS: [{
        POSITION: [20, 0, 25, 0, 180, 1],
        TYPE: ["antiTankMachineGunArm"]
    }, {
        POSITION: [20, 0, -25, 0, 180, 1],
        TYPE: ["antiTankMachineGunArm"]
    }, {
        POSITION: [22, 0, 0, 0, 360, 0],
        TYPE: ["dominationBody"]
    }]
}

// OLD TANKS
exports.oldSpreadshot = {
    PARENT: ["genericTank"],
    LABEL: "Old Spreadshot",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [13, 4, 1, 0, -0.8, -75, 5 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [14.5, 4, 1, 0, -1.0, -60, 4 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [16, 4, 1, 0, -1.6, -45, 3 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [17.5, 4, 1, 0, -2.4, -30, 2 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [19, 4, 1, 0, -3.0, -15, 1 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [13, 4, 1, 0, 0.8, 75, 5 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [14.5, 4, 1, 0, 1.0, 60, 4 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [16, 4, 1, 0, 1.6, 45, 3 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [17.5, 4, 1, 0, 2.4, 30, 2 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [19, 4, 1, 0, 3.0, 15, 1 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Spread",
            },
        },
        {
            POSITION: [13, 10, 1.3, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pound,
                    g.spreadmain,
                    g.spread,
                ]),
                TYPE: "bullet",
                LABEL: "Pounder",
            },
        },
    ],
};
exports.oldBentBoomer = {
    PARENT: ["genericTank"],
    DANGER: 7,
    LABEL: "Old Bent Boomer",
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 1.15 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [8, 10, 1, 8, -2, -35, 0],
        },
        {
            POSITION: [8, 10, 1, 8, 2, 35, 0],
        },
        {
            POSITION: [2, 10, 1.3, 16, -2, -35, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                TYPE: "boomerang",
            },
        },
        {
            POSITION: [2, 10, 1.3, 16, 2, 35, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                TYPE: "boomerang",
            },
        },
    ],
};
exports.quadBuilder = {
    PARENT: ["genericTank"],
    DANGER: 7,
    LABEL: "Quad Builder",
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 1.15 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [14, 6, 1, 0, 0, 45, 0],
        },
        {
            POSITION: [2, 6, 1.1, 14, 0, 45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                TYPE: "setTrap",
            },
        },
        {
            POSITION: [14, 6, 1, 0, 0, 135, 0],
        },
        {
            POSITION: [2, 6, 1.1, 14, 0, 135, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                TYPE: "setTrap",
            },
        },
        {
            POSITION: [14, 6, 1, 0, 0, 225, 0],
        },
        {
            POSITION: [2, 6, 1.1, 14, 0, 225, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                TYPE: "setTrap",
            },
        },
        {
            POSITION: [14, 6, 1, 0, 0, 315, 0],
        },
        {
            POSITION: [2, 6, 1.1, 14, 0, 315, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                TYPE: "setTrap",
            },
        },
    ],
};
exports.weirdSpike = {
    PARENT: ["genericTank"],
    LABEL: "Weird Spike",
    DANGER: 7,
    BODY: {
        DAMAGE: 1.15 * base.DAMAGE,
        FOV: 1.05 * base.FOV,
        DENSITY: 1.5 * base.DENSITY,
    },
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
    TURRETS: [
        {
            POSITION: [20.5, 0, 0, 0, 360, 0],
            TYPE: "weirdSpikeBody1",
        },
        {
            POSITION: [20.5, 0, 0, 180, 360, 0],
            TYPE: "weirdSpikeBody2",
        },
    ],
};
exports.master = {
    PARENT: ["genericTank"],
    LABEL: "Master",
    STAT_NAMES: statnames.drone,
    BODY: {
        HEALTH: base.HEALTH * 0.4,
        SHIELD: base.SHIELD * 0.4,
        DENSITY: base.DENSITY * 0.3,
    },
    MAX_CHILDREN: 6,
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [18, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "masterBullet",
            },
        },
        {
            POSITION: [13, 8, 1, 0, -1, 140, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [13, 8, 1, 0, 1, 220, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
};
exports.oldCommanderGun = {
    PARENT: ["genericTank"],
    LABEL: "",
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ["nearestDifferentMaster"],
    COLOR: 16,
    MAX_CHILDREN: 6,
    AI: {
        NO_LEAD: true,
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [
        {
            POSITION: [8, 14, 1.3, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.commander]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
    ],
};
exports.oldCommander = {
    PARENT: ["genericTank"],
    LABEL: "Old Commander",
    STAT_NAMES: statnames.drone,
    DANGER: 7,
    BODY: {
        FOV: 1.15 * base.FOV,
    },
    FACING_TYPE: "autospin",
    TURRETS: [
        {
            POSITION: [16, 1, 0, 0, 0, 0],
            TYPE: "oldCommanderGun",
        },
        {
            POSITION: [16, 1, 0, 120, 0, 0],
            TYPE: ["oldCommanderGun", { INDEPENDENT: true }],
        },
        {
            POSITION: [16, 1, 0, 240, 0, 0],
            TYPE: ["oldCommanderGun", { INDEPENDENT: true }],
        },
    ],
};
exports.blunderbuss = {
    PARENT: ["genericTank"],
    LABEL: "Blunderbuss",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.225,
    },
    GUNS: [
        {
            POSITION: [13, 4, 1, 0, -3, -9, 0.3],
            PROPERTIES: {
                TYPE: "bullet",
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.blunderbuss]),
            },
        },
        {
            POSITION: [15, 4, 1, 0, -2.5, -6, 0.2],
            PROPERTIES: {
                TYPE: "bullet",
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.blunderbuss]),
            },
        },
        {
            POSITION: [16, 4, 1, 0, -2, -3, 0.1],
            PROPERTIES: {
                TYPE: "bullet",
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.blunderbuss]),
            },
        },
        {
            POSITION: [13, 4, 1, 0, 3, 9, 0.3],
            PROPERTIES: {
                TYPE: "bullet",
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.blunderbuss]),
            },
        },
        {
            POSITION: [15, 4, 1, 0, 2.5, 6, 0.2],
            PROPERTIES: {
                TYPE: "bullet",
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.blunderbuss]),
            },
        },
        {
            POSITION: [16, 4, 1, 0, 2, 3, 0.1],
            PROPERTIES: {
                TYPE: "bullet",
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.blunderbuss]),
            },
        },
        {
            POSITION: [25, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                TYPE: "bullet",
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
            },
        },
        {
            POSITION: [14, 10.5, 1, 0, 0, 0, 0],
        },
    ],
};
exports.oldRimfire = {
    PARENT: ["genericTank"],
    LABEL: "Old Rimfire",
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 5, 1, 0, 7.25, 15, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 5, 1, 0, -7.25, -15, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 5, 1, 0, 3.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 5, 1, 0, -3.75, -0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.fast]),
                TYPE: "bullet",
            },
        },
    ],
};

// SCRAPPED TANKS
exports.autoTrapper = makeAuto(trapper);
exports.corvette = {
    PARENT: ["genericTank"],
    LABEL: "Corvette",
    DANGER: 7,
    FACING_TYPE: "locksFacing",
    STAT_NAMES: statnames.swarm,
    BODY: {
        FOV: base.FOV * 1.2,
    },
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, -4, 0, 0, 0, 0],
            TYPE: "genericEntity",
        },
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [6, 16, 1, 16, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.fake]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [1, 3, 1, 3, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.machgun,
                    g.thruster,
                    [0.1, 3, 1, 1, 1, 1, 1, 1, 1, 0.075, 1, 2, 1],
                ]),
                TYPE: "bullet",
            },
        },
    ],
};
exports.lambo = {
    PARENT: ["genericTank"],
    LABEL: "Lambo",
    DANGER: 7,
    FACING_TYPE: "locksFacing",
    STAT_NAMES: statnames.swarm,
    BODY: {
        FOV: base.FOV * 1.2,
    },
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, -4, 0, 0, 0, 0],
            TYPE: "genericEntity",
        },
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [6, 16, 1, 16, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.fake]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [1, 3, 1, 3, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.machgun,
                    g.thruster,
                    g.tonsmorrecoil,
                    g.doublereload,
                    [0.1, 3, 1, 1, 1, 1, 1, 1, 1, 0.075, 1, 2, 1],
                ]),
                TYPE: "bullet",
            },
        },
    ],
};
exports.bugatti = {
    PARENT: ["genericTank"],
    LABEL: "Bugatti",
    DANGER: 7,
    FACING_TYPE: "locksFacing",
    STAT_NAMES: statnames.swarm,
    BODY: {
        FOV: base.FOV * 1.2,
    },
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, -4, 0, 0, 0, 0],
            TYPE: "genericEntity",
        },
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [6, 16, 1, 16, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.fake]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [1, 3, 1, 3, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.machgun,
                    g.thruster,
                    g.tonsmorrecoil,
                    g.doublereload,
                    g.morerecoil,
                    g.morereload,
                    [0.1, 3, 1, 1, 1, 1, 1, 1, 1, 0.075, 1, 2, 1],
                ]),
                TYPE: "bullet",
            },
        },
    ],
};
exports.ssc = {
    PARENT: ["genericTank"],
    LABEL: "Thrust SSC",
    DANGER: 7,
    FACING_TYPE: "locksFacing",
    STAT_NAMES: statnames.swarm,
    BODY: {
        FOV: base.FOV * 1.2,
    },
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, -4, 0, 0, 0, 0],
            TYPE: "genericEntity",
        },
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [6, 16, 1, 16, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.fake]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [1, 3, 1, 3, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.machgun,
                    g.thruster,
                    g.tonsmorrecoil,
                    g.doublereload,
                    g.tonsmorrecoil,
                    g.doublereload,
                    [0.1, 3, 1, 1, 1, 1, 1, 1, 1, 0.075, 1, 2, 1],
                ]),
                TYPE: "bullet",
            },
        },
    ],
};
exports.menderDeco = makeDeco(3);
exports.mender = {
    PARENT: ["genericTank"],
    LABEL: "Mender",
    DANGER: 7,
    TOOLTIP: "Right click to heal yourself (use sparingly, has a long cooldown once used!)",
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 3, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 3, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
        { POSITION: [17, 10, 1, 0, 0, 180, 0] },
        {
            POSITION: [5, 18, 1, -19, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pound,
                    g.destroy,
                    [2, 0, 1, 1, 1, -1, 1, 1, 1, 0.1, 1, 1, 1],
                ]),
                TYPE: ["bullet", { HEAL_MYSELF: true }],
                ALT_FIRE: true,
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [7, 0, 0, 0, 0, 1],
            TYPE: "menderDeco",
        },
    ],
};
exports.prodigy = {
    PARENT: ["genericTank"],
    LABEL: "Prodigy",
    DANGER: 7,
    STAT_NAMES: statnames.generic,
    SHAPE: 6,
    MAX_CHILDREN: 14,
    BODY: {
        FOV: base.FOV * 1.15,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 11, 1.3, 6, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 11, 1.3, 6, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 11, 1.3, 6, 0, 300, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 9, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 9, 1.5, 14, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [14, 9, 1, 0, 0, 120, 0],
        },
        {
            POSITION: [4, 9, 1.5, 14, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [14, 9, 1, 0, 0, 240, 0],
        },
        {
            POSITION: [4, 9, 1.5, 14, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
};
exports.tetraGunner = {
  PARENT: ["genericTank"],
  LABEL: "Tetra Gunner",
  DANGER: 7,
  GUNS: [
    {
      POSITION: [14, 3.5, 1, 0, 4, 90, 1 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [14, 3.5, 1, 0, -4, 90, 2 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [14, 3.5, 1, 0, 4, 270, 1 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [14, 3.5, 1, 0, -4, 270, 2 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [18, 3.5, 1, 0, 0, 90, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [18, 3.5, 1, 0, 0, 270, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [14, 3.5, 1, 0, 4, 0, 1 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [14, 3.5, 1, 0, -4, 0, 2 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [14, 3.5, 1, 0, 4, 180, 1 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [14, 3.5, 1, 0, -4, 180, 2 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [18, 3.5, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [18, 3.5, 1, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: "bullet",
      },
    },
  ],
};

// WHIRLWIND!!!
exports.whirlwindDeco = makeDeco(6);
exports.whirlwindDeco.CONTROLLERS = [["spin", { independent: true, speed: 0.05 }]];
exports.whirlwind = {
    PARENT: ["genericTank"],
    LABEL: "Whirlwind",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "whirlwindDeco",
        },
    ],
};
exports.tornadoDeco = makeDeco(4);
exports.tornadoDeco.CONTROLLERS = [["spin", { independent: true }]];
exports.tornado = {
    PARENT: ["genericTank"],
    LABEL: "Tornado",
    DANGER: 6,
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
    ],
};
exports.megaTornadoDeco = makeDeco([[0,-1],[0.5,0],[0,1],[-0.5,0]])
exports.megaTornadoDeco.CONTROLLERS = [["spin", { independent: true }]];
exports.megaTornado = {
    PARENT: ["genericTank"],
    LABEL: "Mega Tornado",
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [16, 0, 0, 0, 360, 1],
            TYPE: "megaTornadoDeco",
        },
    ],
};
exports.tempestDeco1 = makeDeco(3);
exports.tempestDeco1.CONTROLLERS = [["spin", { independent: true }]];
exports.tempestDeco2 = makeDeco(3);
exports.tempestDeco2.CONTROLLERS = [["spin", { independent: true, speed: 0.025 }]];
exports.tempest = {
    PARENT: ["genericTank"],
    LABEL: "Tempest",
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "tempestDeco1",
        },
        {
            POSITION: [4.5, 0, 0, 180, 360, 1],
            TYPE: "tempestDeco2",
        },
    ],
};
exports.thunderbolt = {
    PARENT: ["genericTank"],
    LABEL: "Thunderbolt",
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
    ],
};
exports.hurricaneDeco = makeDeco(8);
exports.hurricaneDeco.CONTROLLERS = [["spin", { independent: true }]];
exports.hurricane = {
    PARENT: ["genericTank"],
    LABEL: "Hurricane",
    DANGER: 6,
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "hurricaneDeco",
        },
    ],
};
exports.typhoonDeco = makeDeco(10);
exports.typhoonDeco.CONTROLLERS = [["spin", { independent: true }]];
exports.typhoon = {
    PARENT: ["genericTank"],
    LABEL: "Typhoon",
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "typhoonDeco",
        },
    ],
};
exports.blizzardDeco1 = makeDeco(5);
exports.blizzardDeco1.CONTROLLERS = [["spin", { independent: true }]];
exports.blizzardDeco2 = makeDeco(5);
exports.blizzardDeco2.CONTROLLERS = [["spin", { independent: true, speed: 0.025 }]];
exports.blizzard = {
    PARENT: ["genericTank"],
    LABEL: "Blizzard",
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "blizzardDeco1",
        },
        {
            POSITION: [6.5, 0, 0, 180, 360, 1],
            TYPE: "blizzardDeco2",
        },
    ],
};
exports.hexaWhirl = {
    PARENT: ["genericTank"],
    LABEL: "Hexa Whirl",
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 60, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 300, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
    ],
};
exports.munition = {
    PARENT: ["genericTank"],
    DANGER: 7,
    LABEL: "Munition",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [17, 3, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 3, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
    ],
};
exports.whirl3 = {
    PARENT: ["genericTank"],
    LABEL: "Whirl-3",
    DANGER: 7,
    FACING_TYPE: "autospin",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
        {
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: "autoTankGun",
        },
        {
            POSITION: [11, 8, 0, 120, 190, 0],
            TYPE: "autoTankGun",
        },
        {
            POSITION: [11, 8, 0, 240, 190, 0],
            TYPE: "autoTankGun",
        },
    ],
};
exports.whirlGuard = {
    PARENT: ["genericTank"],
    LABEL: "Whirl Guard",
    STAT_NAMES: statnames.mixed,
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [13, 8, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [4, 8, 1.7, 13, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
};
exports.prohpet = {
    PARENT: ["genericTank"],
    LABEL: "Prophet",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.9 * base.SPEED,
    },
    SHAPE: 4,
    MAX_CHILDREN: 14,
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [5.25, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
            },
        },
        {
            POSITION: [5.25, 12, 1.2, 8, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
            },
        },
    ],
};
exports.vortex = {
    PARENT: ["genericTank"],
    LABEL: "Vortex",
    BODY: {
        FOV: base.FOV * 1.1,
    },
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "tornadoDeco",
        },
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [10, 9, 1, 9, 0, 0, 0],
        },
        {
            POSITION: [17, 13, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty]),
                TYPE: "minimissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
};

exports.whirlwind.UPGRADES_TIER_2 = ["tornado", "hurricane"];
    exports.whirlwind.UPGRADES_TIER_3 = ["hexaWhirl", "munition", "whirl3", "whirlGuard", "prohpet", "vortex"];
    exports.tornado.UPGRADES_TIER_3 = ["megaTornado", "tempest", "thunderbolt"];
    exports.hurricane.UPGRADES_TIER_3 = ["typhoon", "blizzard"];

// FLAIL!!!
exports.flailBallSpike = {
    PARENT: ["genericTank"],
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.flailBall = {
    PARENT: ["genericTank"],
    HITS_OWN_TYPE: 'hard',
    TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [21.5, 0, 0, 0, 360, 0],
        TYPE: "flailBallSpike",
    }, ],
};
exports.flailBolt1 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [40, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        POSITION: [48, 56, 0, 0, 190, 1],
        TYPE: ["flailBall", {
            INDEPENDENT: true,
            VULNERABLE: true
        }]
        },
    ],
};
exports.flailBolt2 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [30, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [20, 36, 0, 0, 190, 1],
        TYPE: ["flailBolt1", {
            INDEPENDENT: true,
        }]
        },
    ],
};
exports.flailBolt3 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [30, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [18, 36, 0, 0, 190, 1],
        TYPE: ["flailBolt2", {
            INDEPENDENT: true,
        }]
        },
    ],
};
exports.flail = {
    PARENT: ["genericTank"],
    LABEL: "Flail",
    STAT_NAMES: statnames.flail,
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, 0, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};
exports.doubleFlail = {
    PARENT: ["genericTank"],
    LABEL: "Double Flail",
    DANGER: 6,
    STAT_NAMES: statnames.flail,
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, {
        POSITION: [6, 10, 0, 180, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, 0, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};
exports.tripleFlail = {
    PARENT: ["genericTank"],
    LABEL: "Triple Flail",
    DANGER: 7,
    STAT_NAMES: statnames.flail,
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, {
        POSITION: [6, 10, 0, 120, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, {
        POSITION: [6, 10, 0, 240, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, 0, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};
exports.maceBallSpike = {
    PARENT: ["genericTank"],
    COLOR: 9,
    SHAPE: 3,
    INDEPENDENT: true,
};
exports.maceBall = {
    PARENT: ["genericTank"],
    HITS_OWN_TYPE: 'hard',
    TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [21.5, 0, 0, 0, 360, 0],
        TYPE: ["maceBallSpike", { SHAPE: 3 }]
    }, ],
};
exports.maceBolt1 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [48, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        POSITION: [76, 56, 0, 0, 190, 1],
        TYPE: ["maceBall", {
            INDEPENDENT: true,
            VULNERABLE: true
        }]
        },
    ],
};
exports.maceBolt2 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [24, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [20, 28, 0, 0, 190, 1],
        TYPE: ["maceBolt1", {
            INDEPENDENT: true,
        }]
        },
    ],
};
exports.maceBolt3 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [24, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [18, 28, 0, 0, 190, 1],
        TYPE: ["maceBolt2", {
            INDEPENDENT: true,
        }]
        },
    ],
};
exports.mace = {
    PARENT: ["genericTank"],
    LABEL: "Mace",
    DANGER: 6,
    STAT_NAMES: statnames.flail,
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["maceBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, 0, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};
exports.mamaBolt1 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [48, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        POSITION: [104, 56, 0, 0, 190, 1],
        TYPE: ["maceBall", {
            INDEPENDENT: true,
            VULNERABLE: true
        }]
        },
    ],
};
exports.mamaBolt2 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [18, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [20, 20, 0, 0, 190, 1],
        TYPE: ["mamaBolt1", {
            INDEPENDENT: true,
        }]
        },
    ],
};
exports.mamaBolt3 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [18, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [18, 20, 0, 0, 190, 1],
        TYPE: ["mamaBolt2", {
            INDEPENDENT: true,
        }]
        },
    ],
};
exports.bigMama = {
    PARENT: ["genericTank"],
    LABEL: "BIG MAMA",
    DANGER: 7,
    STAT_NAMES: statnames.flail,
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["mamaBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, 0, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};
exports.ihdtiBall = {
    PARENT: ["genericTank"],
    HITS_OWN_TYPE: 'hard',
    TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [21.5, 0, 0, 0, 360, 0],
        TYPE: "maceBallSpike"
    }, {
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [21.5, 0, 0, 180, 360, 0],
        TYPE: "maceBallSpike"
    },],
};
exports.ihdtiBolt1 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [48, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        POSITION: [76, 56, 0, 0, 190, 1],
        TYPE: ["ihdtiBall", {
            INDEPENDENT: true,
            VULNERABLE: true
        }]
        },
    ],
};
exports.ihdtiBolt2 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [24, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [20, 28, 0, 0, 190, 1],
        TYPE: ["ihdtiBolt1", {
            INDEPENDENT: true,
        }]
        },
    ],
};
exports.ihdtiBolt3 = {
    PARENT: ["genericTank"],
    GUNS: [{
        POSITION: [24, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [18, 28, 0, 0, 190, 1],
        TYPE: ["ihdtiBolt2", {
            INDEPENDENT: true,
        }]
        },
    ],
};
exports.itHurtsDontTouchIt = {
    PARENT: ["genericTank"],
    LABEL: "It hurts dont touch it",
    DANGER: 7,
    STAT_NAMES: statnames.flail,
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["ihdtiBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, 0, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};
exports.flangle = {
    PARENT: ["genericTank"],
    LABEL: "Flangle",
    DANGER: 6,
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};
exports.flooster = {
    PARENT: ["genericTank"],
    LABEL: "Flooster",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [13, 8, 1, 0, -1, 140, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [13, 8, 1, 0, 1, 220, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};
exports.flace = {
    PARENT: ["genericTank"],
    LABEL: "Flace",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["maceBolt3", {
            INDEPENDENT: true
        }]
    }, ],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
};

exports.flail.UPGRADES_TIER_2 = ["doubleFlail", "mace", "flangle"];
    exports.doubleFlail.UPGRADES_TIER_3 = ["tripleFlail"];
    exports.mace.UPGRADES_TIER_3 = ["bigMama", "itHurtsDontTouchIt", "flace"];
    exports.flangle.UPGRADES_TIER_3 = ["flooster", "flace"];

// TRACKER-3
exports.tracker3gun = {
  PARENT: ["genericTank"],
  LABEL: "",
  COLOR: "timeGem",
  BODY: {
    FOV: 3,
  },
  CONTROLLERS: [
    "canRepel",
    "onlyAcceptInArc",
    "mapAltToFire",
    "nearestDifferentMaster",
  ],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [22, 10, 1, 0, 0, 0, 0],
    },
    {
      POSITION: [10, 10, -2, 20, 0, 0, 0],
    },
  ],
};
exports.tracker3 = {
  PARENT: ["genericTank"],
  LABEL: "Tracker-3",
  FACING_TYPE: "autospin",
  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [11, 8, 0, 0, 190, 0],
      TYPE: ["tracker3gun", { INDEPENDENT: true }],
    },
    {
      POSITION: [11, 8, 0, 120, 190, 0],
      TYPE: ["tracker3gun", { INDEPENDENT: true }],
    },
    {
      POSITION: [11, 8, 0, 240, 190, 0],
      TYPE: ["tracker3gun", { INDEPENDENT: true }],
    },
  ],
};

// BOTS
exports.bot = {
    FACING_TYPE: "looseToTarget",
    NAME: "[AI] ",
    CONTROLLERS: ["nearestDifferentMaster", "mapAltToFire", "minion", "fleeAtLowHealth", ["mapFireToAlt", { onlyIfHasAltFireGun: true }], ["wanderAroundMap", { immitatePlayerMovement: true, lookAtGoal: true }]],
};

// SCORE KEEPING
exports.tagMode = {
    PARENT: ["bullet"],
    LABEL: "Players",
};
