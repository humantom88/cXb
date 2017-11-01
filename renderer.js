const Board = require('./src/board')
const path = require('path');
const os = require('os');

const electron = require('electron');

const TEMP_DIR_NAME = 'temp';

window.remote = electron.remote;
window.tempPath = path.join(os.tmpdir(), TEMP_DIR_NAME);

const render = () => {
    const board = new Board();
    board.init();
}

// Run
render()
