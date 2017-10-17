const rimraf = require('rimraf');
const path = require('path');
const clearFolder = (handler) => rimraf(path.join(window.tempPath, '.*'), handler);

module.exports = clearFolder;