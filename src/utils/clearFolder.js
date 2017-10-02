const rimraf = require('rimraf');
const tempPath = require('./getTempPath');

const clearFolder = (handler) => rimraf(tempPath, handler);

module.exports = clearFolder;