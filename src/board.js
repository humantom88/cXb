const Dialog = require('./utils/dialog');
const ComicBook = require('./comic');

class Board {
    constructor () {
        this.comicBook = null;
        this.maximized = false;

        this.renderPanel = this.renderPanel.bind(this);
        this.renderScreen = this.renderScreen.bind(this);
        this.dialog = new Dialog(this.renderScreen);
    }

    init () {
        const root = document.getElementById('root');
        const side = document.getElementById('side');
        const left = document.getElementById('left');
        const open = document.getElementById('open');
        const minimize = document.getElementById('minimize');
        const fullscreen = document.getElementById('fullscreen');
        const quit = document.getElementById('quit');
    
        left.addEventListener('click', function(ev) {
            if (ev) { ev.preventDefault(); }
            this.pressed = !this.pressed;
            if (this.pressed) {
                side.style.transform = 'translateX(0%)';
                this.innerHTML = "<";
            } else {
                side.style.transform = 'translateX(-100%)';    
                this.innerHTML = ">";
            }
        })
    
        open.addEventListener('click', (ev) => {
            this.dialog.openFileDialog();
            ev.stopPropagation();
        });
    
        minimize.addEventListener('click', (ev) => {
            window.remote.getCurrentWindow().minimize();
            ev.stopPropagation();
        });
    
        fullscreen.addEventListener('click', (ev) => {
            if (!maximized) {
                window.remote.getCurrentWindow().maximize();
                this.maximized = true;
            } else {
                window.remote.getCurrentWindow().unmaximize();
                this.maximized = false;
            }
            ev.stopPropagation();
        });
        quit.addEventListener('click', (ev) => {
            window.remote.getCurrentWindow().close()
            ev.stopPropagation();
        });
    }

    renderPanel (files) {
        if (files) {
            const pages = document.getElementById('pages');
    
            while (pages.firstChild) {
                pages.removeChild(pages.firstChild)
            }
    
            files.forEach((file) => {
                const item = document.createElement('LI')
                item.innerHTML = file.fileHeader.name
                pages.appendChild(item)
            })
        }
    }
    
    renderScreen (files, id = 0) {
        this.renderPanel (files)
        this.comicBook = new ComicBook(files)
        this.comicBook.openPage(id)
    }
    
}

module.exports = Board;