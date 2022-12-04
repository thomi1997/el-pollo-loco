class Character extends MovableObject {

    y = 200;
    height = 250;
    width = 150;
    speed = 8;
    bottle = 0;
    coin = 0;
    world;
    characterIsDead = false;
    sleepCount = 0;

    isWalkingSound = new Audio('audio/walking.mp3');
    jumpSound = new Audio('audio/jump.mp3');
    hurtSound = new Audio('audio/hurt.mp3');
    gameOverSound = new Audio('audio/game-over.mp3');
    coinSound = new Audio('audio/coin.mp3');
    snoringSound = new Audio('audio/snoring.mp3');
    bottleSound = new Audio('audio/bottle.mp3');

    offset = {
        top: 125,
        bottom: 0,
        left: 45,
        right: 45
    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];


    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];


    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];


    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];


    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];


    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animate();
    }


    animate() {
        setStoppableInterval(() => this.fallAsSleepCounter(), 1000);
        setStoppableInterval(() => {
            this.isWalkingSound.pause();
            this.characterCanMoveRight();
            this.characterCanMoveLeft();
            this.characterCanJump();
            this.world.camera_x = -this.x + 120;
        }, 1000 / 60);
        setStoppableInterval(() => this.characterAnimation(), 40);
    }


    characterCanMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.otherDirection = false;
            this.moveRight();
            world.playSounds(this.isWalkingSound, 0.2);
            this.resetSleepCount();
        }
    }


    putToSleep() {
        if (this.characterSleep()) {
            this.playAnimation(this.IMAGES_IDLE_LONG);
            world.playSounds(this.snoringSound, 0.2);
        } else if (this.halfSleep()) {
            this.playAnimation(this.IMAGES_IDLE);
        } else {
            this.snoringSound.pause();
        }
    }


    fallAsSleepCounter() {
        this.sleepCount++;
    }


    halfSleep() {
        return this.sleepCount > 5;
    }


    characterSleep() {
        return this.sleepCount > 8;
    }


    resetSleepCount() {
        this.sleepCount = 0;
    }


    characterCanMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.otherDirection = true;
            this.moveLeft();
            world.playSounds(this.isWalkingSound, 0.2);
            this.resetSleepCount();
        }
    }


    characterCanJump() {
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            world.playSounds(this.jumpSound, 0.2);
            this.resetSleepCount();
        }
    }


    characterAnimation() {
        this.putToSleep();
        if (this.energy == 0) {
            this.isCharacterReallyDead()
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            world.playSounds(this.hurtSound, 1);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            this.walkLeftOrRight();
        }
    }


    isCharacterReallyDead() {
        this.characterDeadCheck();
        setTimeout(() => stopGame(), 500);
        setTimeout(() => this.startGameOverScreen(), 2000);
    }


    walkLeftOrRight() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.readyToSleep = true;
        }
    }


    characterDeadCheck() {
        this.playAnimation(this.IMAGES_DEAD);
        world.playSounds(this.gameOverSound, 1);
        return this.energy == 0;
    }


    startGameOverScreen() {
        if (!this.characterIsDead) {
            this.characterIsDead = true;
            gameOverScreen();
        }
    }


    jump() {
        this.speedY = 16.5;
    }


    collectCoin() {
        this.coin += 10;
        world.playSounds(this.coinSound, 1);
    }


    collectBottle() {
        this.bottle += 20;
        world.playSounds(this.bottleSound, 1);
    }
}