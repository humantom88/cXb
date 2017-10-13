const Dialog = require('./utils/dialog');
const ComicBook = require('./comic.js');

class Board {
    constructor () {
        this.comicBook = null;
        this.maximized = false;

        this.renderPanel = this.renderPanel.bind(this);
        this.renderScreen = this.renderScreen.bind(this);
        this.dialog = new Dialog(this.renderScreen);
        this.positionX = 0;
        this.positionY = 0;

        
    }

    initTop () {
        const top = document.getElementById('top');
        top.addEventListener('mousedown', (ev) => {
            this.positionX = ev.clientX;
            this.positionY = ev.clientY;
            window.pressed = true;
        });

        top.addEventListener('mouseup', (ev) => {
            window.pressed = false;
        });

        top.addEventListener('mouseup', (ev) => {
            window.pressed = false;
        });

        top.addEventListener('mouseleave', (ev) => {
            window.pressed = false;
        })

        top.addEventListener('mousemove', (ev) => {
            const { x, y } = window.remote.getCurrentWindow().getBounds();
            const deltaX = ev.screenX - ev.clientX;
            const deltaY = ev.screenY - ev.clientY;

            if (window.pressed) {
                window.remote.getCurrentWindow().setPosition(
                    x + ev.clientX - this.positionX,
                    y + ev.clientY - this.positionY
                )
            }
        })
    }

    initControls () {
        const open = document.getElementById('open');
        const minimize = document.getElementById('minimize');
        const fullscreen = document.getElementById('fullscreen');
        const quit = document.getElementById('quit');
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

    init () {
        this.initTop();
        this.initControls();
        const side = document.getElementById('side');
        const left = document.getElementById('left');
        
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