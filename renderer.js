const Board = require('./src/board')
const path = require('path');

const electron = require('electron');

const TEMP_DIR_NAME = 'temp';

window.remote = electron.remote;
window.tempPath = process.platform == 'win32'
    ? path.join(electron.remote.app.getAppPath().replace('\\resources\\app.asar', ''), TEMP_DIR_NAME)
    : path.join(electron.remote.app.getAppPath(), TEMP_DIR_NAME);

const render = () => {
    const board = new Board();
    board.init();
}

// Run
render()
