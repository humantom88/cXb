const electronUnrarJs = require('electron-unrar-js');
const { dialog } = require('electron').remote;
const path = require('path');
const rimraf = require('rimraf');
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
                    const rarExtractor = electronUnrarJs.createExtractorFromFile(file, window.tempPath);
                    const resultObject = rarExtractor.extractAll();
                    const [state, result] = resultObject

                    if (state.state === 'SUCCESS') {
                        this.handler(result.files.sort((a, b) =>{
                            const str1 = a.fileHeader.name.split('.')[0]
                            const str2 = b.fileHeader.name.split('.')[0]
                            for (let i = 0; i < str1.length; i++) {
                                const _a = str1.charAt(i), 
                                    _b = str2.charAt(i),
                                    _c = _a.localeCompare(_b);
                                if ( _c != 0 ) return isNaN(_a) || isNaN(_b) ? str1.localeCompare(str2) : _a - _b;
                            }
                        }))
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