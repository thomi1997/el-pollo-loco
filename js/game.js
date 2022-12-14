let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let soundsPaused = true;
let musicPaused = true;


function init() {
    document.getElementById('start-screen').innerHTML = startScreenHtml();
    document.getElementById('control').innerHTML = controlSectionHtml();
    document.getElementById('story').innerHTML = storySectionHtml();
    document.getElementById('mobile-gameplay').innerHTML = mobileGameplay();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    mobileGamePlay();
}


function stopSounds() {
    if (!soundsPaused) {
        svgSoundOn();
    } else {
        svgSoundOff();
    }
}


function stopBackgroundMusic() {
    if (!musicPaused) {
        svgMusicOn();
    } else {
        svgMusicOff();
    }
}


function svgMusicOn() {
    musicPaused = true;
    document.getElementById('inGameMusicOff').classList.add('d-flex');
    document.getElementById('inGameMusicOff').classList.remove('d-none');
    document.getElementById('inGameMusicOn').classList.add('d-none');
}


function svgMusicOff() {
    musicPaused = false;
    document.getElementById('inGameMusicOff').classList.add('d-none');
    document.getElementById('inGameMusicOn').classList.remove('d-none');
    document.getElementById('inGameMusicOn').classList.add('d-flex');
}


function svgSoundOn() {
    soundsPaused = true;
    document.getElementById('inGameSoundOff').classList.add('d-flex');
    document.getElementById('inGameSoundOff').classList.remove('d-none');
    document.getElementById('inGameSoundOn').classList.add('d-none');
}


function svgSoundOff() {
    soundsPaused = false;
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
    document.getElementById('start-screen').classList.add('is-not-visible');
    document.getElementById('win-screen').classList.add('is-not-visible');
    document.getElementById('game-over-screen').classList.add('is-not-visible');
    soundsPaused = false;
    musicPaused = false;
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
    document.getElementById('start-screen').classList.remove('is-not-visible');
}


function controller() {
    document.getElementById('control').classList.remove('d-none');
    document.getElementById('control').classList.add('d-flex');
}


function closeController() {
    document.getElementById('control').classList.add('d-none');
}


function openStory() {
    document.getElementById('story').classList.add('d-flex');
    document.getElementById('story').classList.remove('d-none');
}


function closeStory() {
    document.getElementById('story').classList.add('d-none');
}


function startFullScreen() {
    let isInFullScreen = 
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);
    let elem = document.getElementById('canvas');
    if (!isInFullScreen) {
        openFullscreen(elem);
    } else {
        closeFullscreen();
    }

}


function openFullscreen(elem) {
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
    if (document.exitFullscreen ) {
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
    touchedKeyRight();
    touchedKeyLeft();
    touchedKeyJump();
    touchedKeyThrow();
}


function touchedKeyRight() {
    document.getElementById('buttonRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('buttonRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
}


function touchedKeyLeft() {
    document.getElementById('buttonLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('buttonLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
}


function touchedKeyJump() {
    document.getElementById('buttonJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });
    document.getElementById('buttonJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });
}


function touchedKeyThrow() {
    document.getElementById('buttonThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('buttonThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}