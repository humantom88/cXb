// Imports
const comicBook = require('./src/comic.js');
const Dialog = require('./src/utils/dialog.js');
const path = require('path');
const encode = require('encode');


function renderPanel (files) {
    if (files) {
        const pages = document.getElementById('pages');
        // Remove all children from node
        while (pages.firstChild) {
            pages.removeChild(pages.firstChild)
        }

        // Create an array of li nodes
        files.forEach((file) => {
            const item = document.createElement('LI')
            item.innerHTML = file.fileHeader.name
            pages.appendChild(item)
        })
    }
}

function openPage(file) {
    const screen = document.getElementById('screen');
    const image = document.createElement('IMG');
    image.src = encode(`.${path.sep}temp${path.sep}${file.fileHeader.name}`);
    image.style.height = '100vh';
    screen.appendChild(image);
}

//Functions
function renderScreen (files, id = 0) {
    renderPanel(files)
    openPage(files[id])
}

//Init
const dialog = new Dialog(renderScreen);

const render = () => {
    const root = document.getElementById('root');
    const side = document.getElementById('side');
    const left = document.getElementById('left');
    const open = document.getElementById('open');

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

    open.addEventListener('click', () => dialog.openFileDialog());
}

// Run
render()