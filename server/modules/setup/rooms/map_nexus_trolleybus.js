let { base1:  _1 , base1protected:  p1  } = require('../tiles/tdm.js'),
    { bossSpawn:   b , atmg:  A   } = require('../tiles/siege.js'),
    { wall: WALL, nest:  n , normal:   _  } = require('../tiles/misc.js'),
    { portal:  P   } = require('../tiles/portal.js'),

// Yes. I am aware that the food distract the ATMGs, but ask trplnr why he put normal's instead of outside's outside the room
room = [
    [  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,  _ ,WALL,WALL,WALL,WALL,WALL,WALL,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  b ,  b ,  b ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,WALL,WALL,  _ ,WALL,WALL,WALL,  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,WALL,  _ ,WALL,WALL,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  _ , _1 , _1 , _1 ,  _ ,WALL,  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ , _1 , p1 , _1 ,  _ ,  _ ,  _ , P  ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  _ , _1 , _1 , _1 ,  _ ,WALL,  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,WALL,WALL,WALL,  _ ,WALL,WALL,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,WALL,WALL,WALL,WALL,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,WALL,WALL,WALL,WALL,WALL,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ],
    [  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ],
];

module.exports = room;