let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let soundsPaused = false;


function init() {
    document.getElementById('start-screen').innerHTML = startScreenHtml();
    document.getElementById('control').innerHTML = controlSectionHtml();
    document.getElementById('mobile-gameplay').innerHTML = mobileGameplay();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    mobileGamePlay();
    /*console.log('My Character is', world['character']);*/
}


function stopSounds() {
    if (!soundsPaused) {
        svgSoundOn();
    } else {
        svgSoundOff();
    }
}


function svgSoundOn() {
    soundsPaused = true;
    document.getElementById('inGameSoundOff').classList.add('d-flex');
    document.getElementById('inGameSoundOff').classList.remove('d-none');
    document.getElementById('inGameSoundOn').classList.add('d-none');
    document.getElementById('menuSoundOff').classList.add('d-flex');
    document.getElementById('menuSoundOff').classList.remove('d-none');
    document.getElementById('menuSoundOn').classList.add('d-none');
}


function svgSoundOff() {
    soundsPaused = false;
    document.getElementById('menuSoundOff').classList.add('d-none');
    document.getElementById('menuSoundOn').classList.remove('d-none');
    document.getElementById('menuSoundOn').classList.add('d-flex');
    document.getElementById('inGameSoundOff').classList.add('d-none');
    document.getElementById('inGameSoundOn').classList.remove('d-none');
    document.getElementById('inGameSoundOn').classList.add('d-flex');
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
    stopGame();
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


function startFullScreen() {
    let isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);
    let elem = document.getElementById('fullscreen');
    if (!isInFullScreen) {
        openFullscreen(elem);
    } else {
        closeFullscreen(elem);
    }

}


function openFullscreen(elem) {
    document.getElementById('canvas').classList.add('fullscreen-class');
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}


function closeFullscreen() {
    document.getElementById('canvas').classList.remove('fullscreen-class');
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}


window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39)
        keyboard.RIGHT = true;
    if (event.keyCode == 37)
        keyboard.LEFT = true;
    if (event.keyCode == 38)
        keyboard.UP = true;
    if (event.keyCode == 40)
        keyboard.DOWN = true;
    if (event.keyCode == 32)
        keyboard.SPACE = true;
    if (event.keyCode == 68)
        keyboard.D = true;
});


window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39)
        keyboard.RIGHT = false;
    if (event.keyCode == 37)
        keyboard.LEFT = false;
    if (event.keyCode == 38)
        keyboard.UP = false;
    if (event.keyCode == 40)
        keyboard.DOWN = false;
    if (event.keyCode == 32)
        keyboard.SPACE = false;
    if (event.keyCode == 68)
        keyboard.D = false;
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