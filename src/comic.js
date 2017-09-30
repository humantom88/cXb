const encode = require('./utils/encode');
const path = require('path');
const tempPath = require('./utils/getTempPath');

const screen = document.getElementById('screen');
const image  = document.getElementById('page');

class ComicBook {
    constructor(files, path) {
        this.setFiles(files);
        this.setPath(path);
        this.setCurrentZoom();
        screen.addEventListener('wheel', (ev) => this.handleScroll(ev));
        screen.addEventListener('click', (ev) => this.handleClick(ev));
        screen.addEventListener('contextmenu', (ev) => this.handleRightClick(ev));
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

    hideOpenButton () {
        const open = document.getElementById('open');
        open.style.display = 'none';
    }

    open () {
        
    }

    openPage(id) {
        this.setCurrentPage(id);
        const file = this.files[this.currentPageId];
        image.src = encode(`${tempPath}${path.sep}${file.fileHeader.name}`);
        image.style.height = '100vh';
        screen.appendChild(image);
        this.hideOpenButton();
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
            } else if (!ev.shiftKey) {
                this.nextPage()
            }            
        } else {
            if (ev.ctrlKey) {
                this.zoomOut()
            } else if (!ev.shiftKey) {
                this.prevPage()
            }
        }
    }

    handleClick (ev) {
        this.nextPage()
    }
    
    handleRightClick (ev) {
        this.prevPage()
    }

    close () {

    }

    exit () {

    }
}

module.exports = ComicBook;