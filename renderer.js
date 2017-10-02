const remote = require('electron').remote;
const ComicBook = require('./src/comic.js');
const Board = require('./src/board.js')
const Dialog = require('./src/utils/dialog.js');
const path = require('path');

let comicBook = null;
let maximized = false;

//Functions
function renderPanel (files) {
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

function renderScreen (files, id = 0) {
    renderPanel(files)
    comicBook = new ComicBook(files)
    comicBook.openPage(id)
}

//Init
const dialog = new Dialog(renderScreen);

const render = () => {
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
        ev.stopPropagation();
        dialog.openFileDialog();
    });
    minimize.addEventListener('click', (ev) => {
        ev.stopPropagation();
        remote.getCurrentWindow().minimize();
    });
    fullscreen.addEventListener('click', (ev) => {
        ev.stopPropagation();
        if (!maximized) {
            remote.getCurrentWindow().maximize();
            maximized = true;
        } else {
            remote.getCurrentWindow().unmaximize();
            maximized = false;
        }
    });
    quit.addEventListener('click', (ev) => {
        ev.stopPropagation();
        remote.getCurrentWindow().close()
    });
}

// Run
render()
