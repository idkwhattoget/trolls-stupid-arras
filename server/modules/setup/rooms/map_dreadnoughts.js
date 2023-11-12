let { rock, roid } = require('../tiles/decoration.js'),
    { normal: ____, nest } = require('../tiles/misc.js'),
    { portal: port } = require('../tiles/portal.js'),
    { outside: outs } = require('../tiles/siege.js')
    

room = [
    [port,nest,____,____,____,____,roid,roid,roid,____,____,____,____,nest,port,outs,outs,outs,outs,outs,outs],
    [nest,nest,____,____,____,____,roid,roid,roid,____,____,____,____,nest,nest,outs,outs,outs,outs,outs,outs],
    [____,____,rock,rock,____,____,____,____,____,____,____,rock,rock,____,____,outs,outs,outs,outs,outs,outs],
    [____,____,rock,rock,____,____,____,____,____,____,____,rock,rock,____,____,outs,outs,outs,outs,outs,outs],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,outs,outs,outs,outs,outs,outs],
    [____,____,____,____,____,nest,nest,nest,nest,nest,____,____,____,____,____,outs,outs,outs,outs,outs,outs],
    [roid,roid,____,____,____,nest,roid,rock,roid,nest,____,____,____,roid,roid,outs,outs,outs,outs,outs,outs],
    [roid,roid,____,____,____,nest,rock,nest,rock,nest,____,____,____,roid,roid,outs,outs,outs,outs,outs,outs],
    [roid,roid,____,____,____,nest,roid,rock,roid,nest,____,____,____,roid,roid,outs,outs,outs,outs,outs,outs],
    [____,____,____,____,____,nest,nest,nest,nest,nest,____,____,____,____,____,outs,outs,outs,outs,outs,outs],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,outs,outs,outs,outs,outs,outs],
    [____,____,rock,rock,____,____,____,____,____,____,____,rock,rock,____,____,outs,outs,outs,outs,outs,outs],
    [____,____,rock,rock,____,____,____,____,____,____,____,rock,rock,____,____,outs,outs,outs,outs,outs,outs],
    [nest,nest,____,____,____,____,roid,roid,roid,____,____,____,____,nest,nest,outs,outs,outs,outs,outs,outs],
    [port,nest,____,____,____,____,roid,roid,roid,____,____,____,____,nest,port,outs,outs,outs,outs,outs,outs]
];

/*
port,nest,____,____,____,____,roid,roid,roid,____,____,____,____,nest,port
nest,nest,____,____,____,____,roid,roid,roid,____,____,____,____,nest,nest
____,____,rock,rock,____,____,____,____,____,____,____,rock,rock,____,____
____,____,rock,rock,____,____,____,____,____,____,____,rock,rock,____,____
____,____,____,____,____,____,____,____,____,____,____,____,____,____,____
____,____,____,____,____,nest,nest,nest,nest,nest,____,____,____,____,____
roid,roid,____,____,____,nest,roid,rock,roid,nest,____,____,____,roid,roid
roid,roid,____,____,____,nest,rock,nest,rock,nest,____,____,____,roid,roid
roid,roid,____,____,____,nest,roid,rock,roid,nest,____,____,____,roid,roid
____,____,____,____,____,nest,nest,nest,nest,nest,____,____,____,____,____
____,____,____,____,____,____,____,____,____,____,____,____,____,____,____
____,____,rock,rock,____,____,____,____,____,____,____,rock,rock,____,____
____,____,rock,rock,____,____,____,____,____,____,____,rock,rock,____,____
nest,nest,____,____,____,____,roid,roid,roid,____,____,____,____,nest,nest
port,nest,____,____,____,____,roid,roid,roid,____,____,____,____,nest,port
*/
module.exports = room;