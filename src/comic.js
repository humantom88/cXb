const encode = require('./utils/encode');
const path = require('path');

const screen = document.getElementById('screen');
const image  = document.getElementById('page');

class ComicBook {
    constructor(files) {
        this.setFiles(files);
        screen.addEventListener('wheel', (ev) => this.handleScroll(ev));
    }

    setFiles (files) {
        this.files = files;
    }

    setCurrentPage (id) {
        this.currentPageId = id;
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
        image.src = encode(`.${path.sep}temp${path.sep}${file.fileHeader.name}`);
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

    handleScroll (ev) {
        const { deltaY } = ev;
        if (deltaY > 0) {
            this.nextPage()
        } else {
            this.prevPage()
        }
    }

    close () {

    }

    exit () {

    }
}

module.exports = ComicBook;