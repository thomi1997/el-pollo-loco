let canvas;
let world;
let keyboard = new Keyboard();
intervalIds = [];



function init() {
    document.getElementById('start-screen').innerHTML = startScreenHtml();
    document.getElementById('control').innerHTML = controlSectionHtml();
    document.getElementById('mobile-gameplay').innerHTML = mobileGameplay();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    mobileGamePlay();
    console.log('My Character is', world['character']);
}


function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


function stopGame() {
    intervalIds.forEach(clearInterval);
}


function startGame() {
    document.getElementById('start-screen').classList.add('is-visible');
    document.getElementById('win-screen').classList.add('is-not-visible');
    document.getElementById('game-over-screen').classList.add('is-not-visible');
}


function winScreen() {
    document.getElementById('win-screen').innerHTML = winScreenHtml();
    document.getElementById('win-screen').classList.remove('is-not-visible');
}


function gameOverScreen() {
    document.getElementById('game-over-screen').innerHTML = gameOverScreenHtml();
    document.getElementById('game-over-screen').classList.remove('is-not-visible');
}


function backToMenu() {
    location.reload();
    document.getElementById('win-screen').classList.add('d-none');
    document.getElementById('start-screen').classList.remove('is-visible');
}


function controller() {
    document.getElementById('control').style = 'display: flex;';
}


function closeController() {
    document.getElementById('control').style = 'display: none;';
}


window.addEventListener('keydown', (event) => {
    if(event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(event.keyCode == 38) {
        keyboard.UP = true;
    }

    if(event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if(event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(event.keyCode == 68) {
        keyboard.D = true;
    }
});


window.addEventListener('keyup', (event) => {
    if(event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if(event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if(event.keyCode == 38) {
        keyboard.UP = false;
    }

    if(event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if(event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(event.keyCode == 68) {
        keyboard.D = false;
    }
});


function mobileGamePlay() {
    document.getElementById('buttonRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.RIGHT = true;
        });

    document.getElementById('buttonRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('buttonLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('buttonLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('buttonJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });

    document.getElementById('buttonJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });

    document.getElementById('buttonThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('buttonThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}