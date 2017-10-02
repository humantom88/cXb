const electronUnrarJs = require('electron-unrar-js');
const { dialog } = require('electron').remote;
const path = require('path');
const rimraf = require('rimraf');
const tempPath = require('./getTempPath');
const clearFolder = require('./clearFolder');

class FileDialog {
    constructor (handler = () => {}) {
        this.extensions = ['cbr', 'cbz'];
        this.filter = 'CBR, CBZ';
        this.handler = handler;
        if (!handler) {
            console.error('No handler passed to Dialog constructor');
        }
        this.unrar = this.unrar.bind(this);
    }

    unrar (files) {
        clearFolder(() => {
            files.forEach((file) => {
                if (file.search('.cbr')) {
                    const rarExtractor = electronUnrarJs.createExtractorFromFile(file, tempPath);
                    const [state, result] = rarExtractor.extractAll();
                    if (state.state === 'SUCCESS') {
                        this.handler(result.files)
                    }
                }
            });
        })
    }

    processFiles (files) {
        if (files) {
            this.unrar(files)
        }
    }

    openFileDialog (ev) {
        const files = dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [{
                name: this.filter,
                extensions: this.extensions
            }]
        })

        this.processFiles(files)
    }
}

module.exports = FileDialog