const encode = require('./utils/encode');
const path = require('path');
const remote = require('electron').remote;
const screen = document.getElementById('screen');
const pageContainer = document.getElementById('pageContainer');
const image  = document.getElementById('page');

class ComicBook {
    constructor(files, path) {
        this.wideView = false;
        this.setFiles(files);
        this.setPath(path);
        this.setCurrentZoom();
        this.scrollStep = 50;
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
        if (image) {
            if (this.wideView) {
                this.unsetWideView()
            } else {
                this.setWideView()
            }
        }
    }

    openPage(id) {
        this.setCurrentPage(id);
        const file = this.files[this.currentPageId];
        image.src = encode(path.join(window.tempPath, file.fileHeader.name));
        if (this.wideView) {
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

    scrollDown () {
        if (window.scrollY >= image.height) {
            window.scrollY = image.height;
        } else {
            window.scrollY += this.scrollStep;
        }
    }

    scrollUp () {
        if (window.scrollY - this.scrollStep > 0) {
            window.scrollY -= this.scrollStep;
        } else {
            window.scrollY = 0;
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
        switch (ev.keyCode) {
            case 27:
                this.close()
                break;
    
            case 13:
                if (ev.altKey || ev.metaKey) {
                    window.toggleFullScreen();
                    return null;
                }
                this.toggleWideMode();
                break;
    
            case 38:
                this.scrollUp();
                break;
    
            case 40:
                this.scrollDown();
                break;
    
            case 39:
            case 32:
                this.nextPage();
                break;
    
            case 37:
                this.prevPage();
                break;
            default:
                break;
        }
    }

    handleClick (ev) {
        this.nextPage()
    }
    
    setWideView () {
        image.style.width = '98vw';
        image.style.height = 'auto';
        this.wideView = true;
    }

    unsetWideView () {
        image.style.height = '99vh';
        image.style.width = 'auto';
        this.wideView = false;
    }

    handleRightClick (ev) {
        if (this.detectLeftButton(ev)) {
            this.toggleWideMode();
            ev.stopPropagation();
        } else {
            this.prevPage()
        }
    }

    close () {
        window.remote.getCurrentWindow().close()
    }

    detectLeftButton(ev) {
        return ev.buttons === 1;
    }
}

module.exports = ComicBook;