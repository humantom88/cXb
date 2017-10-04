window.remote = require('electron').remote;
const Board = require('./src/board')
const path = require('path');

const render = () => {
    const board = new Board();
    board.init();
}

// Run
render()
