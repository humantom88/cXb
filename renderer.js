const Board = require('./src/board')
const path = require('path');
const os = require('os');

const electron = require('electron');

const TEMP_DIR_NAME = 'temp';
const CONFIG_FILE_NAME = 'cxb.temp.json';

window.remote = electron.remote;
window.tempPath = path.join(os.tmpdir(), TEMP_DIR_NAME);
window.configFilePath = path.join(os.tmpdir(), CONFIG_FILE_NAME);

const render = () => {
    const board = new Board();
    board.init();
}

// Run
render()
