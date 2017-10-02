const remote = require('electron').remote;
const encode = require('./utils/encode');
const path = require('path');
const tempPath = require('./utils/getTempPath');

const screen = document.getElementById('screen');
const pageContainer = document.getElementById('pageContainer');
const image  = document.getElementById('page');

let wideView = false;

class ComicBook {
    constructor(files, path) {
        this.setFiles(files);
        this.setPath(path);
        this.setCurrentZoom();
        screen.addEventListener('wheel', (ev) => this.handleScroll(ev));
        screen.addEventListener('click', (ev) => this.handleClick(ev));
        screen.addEventListener('contextmenu', (ev) => this.handleRightClick(ev));
        window.addEventListener('keydown', (ev) => this.handleKeyDown(ev));
    }

    setPath (path) {
        this.path = path;
    }

    setFiles (files) {
        this.files = files;
    }

    setCurrentPage (id) {
        this.currentPageId = id;
    }
    
    setCurrentZoom (zoom = 1) {
        this.zoom = zoom;
    }

    toggleWideMode () {
        this.isWideModeOn = !this.isWideModeOn;
    }

    open () {
        
    }

    openPage(id) {
        this.setCurrentPage(id);
        const file = this.files[this.currentPageId];
        image.src = encode(`${tempPath}${path.sep}${file.fileHeader.name}`);
        if (wideView) {
            this.setWideView()
        } else {
            this.unsetWideView()
        }
    }

    nextPage () {
        if (this.files[this.currentPageId + 1]) {
            this.setCurrentPage(this.currentPageId + 1);
            this.openPage(this.currentPageId);
        }
    }

    prevPage () {
        if (this.files[this.currentPageId - 1]) {
            this.setCurrentPage(this.currentPageId - 1);
            this.openPage(this.currentPageId);
        }
    }

    zoomIn () {
        this.setCurrentZoom(this.zoom + 0.2);
        image.style.transform = `scale(${this.zoom})`;
    }

    zoomOut () {
        if ((this.zoom - 0.2) >= 1) {
            this.setCurrentZoom(this.zoom - 0.2);
            image.style.transform = `scale(${this.zoom})`;
        }
    }

    handleScroll (ev) {
        const { deltaY } = ev;
        if (deltaY > 0) {
            if (ev.ctrlKey) {
                this.zoomIn()
            }           
        } else {
            if (ev.ctrlKey) {
                this.zoomOut()
            }
        }
    }

    handleKeyDown (ev) {
        if (ev.keyCode == 27) {
            this.close()
        }
    }

    handleClick (ev) {
        this.nextPage()
    }
    
    setWideView () {
        image.style.width = '99vw';
        image.style.height = 'auto';
        wideView = true;
    }

    unsetWideView () {
        image.style.height = '99vh';
        image.style.width = 'auto';
        wideView = false;
    }

    handleRightClick (ev) {
        if (this.detectLeftButton(ev)) {
            if (image) {
                if (wideView) {
                    this.unsetWideView()
                } else {
                    this.setWideView()
                }
            }
            ev.stopPropagation();
        } else {
            this.prevPage()
        }
    }

    close () {
        remote.getCurrentWindow().close()
    }

    detectLeftButton(ev) {
        return ev.buttons === 1;
    }

    exit () {

    }
}

module.exports = ComicBook;