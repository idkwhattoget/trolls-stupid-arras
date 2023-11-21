let { normal: ____, nest } = require('../tiles/misc.js'),
    { portal: port } = require('../tiles/portal.js');

room = [
    [port,nest,____,____,____,____,____,____,____,____,____,____,____,nest,port],
    [nest,nest,____,____,____,____,____,____,____,____,____,____,____,nest,nest],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,nest,nest,nest,nest,nest,____,____,____,____,____],
    [____,____,____,____,____,nest,____,____,____,nest,____,____,____,____,____],
    [____,____,____,____,____,nest,____,nest,____,nest,____,____,____,____,____],
    [____,____,____,____,____,nest,____,____,____,nest,____,____,____,____,____],
    [____,____,____,____,____,nest,nest,nest,nest,nest,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [nest,nest,____,____,____,____,____,____,____,____,____,____,____,nest,nest],
    [port,nest,____,____,____,____,____,____,____,____,____,____,____,nest,port]
];

module.exports = room;