class Character extends MovableObject {

    y = 200;
    height = 250;
    width = 150;
    speed = 8;
    bottle = 0;
    coin = 0;
    world;
    characterIsDead = false;

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
        'img/2_character_pepe/4_hurt/H-43.png',
    ];


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }


    animate() {
        setStoppableInterval(() => {
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
        }
    }


    characterCanMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.otherDirection = true;
            this.moveLeft();
        }
    }


    characterCanJump() {
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
        }
    }


    characterAnimation() {
        if (this.energy == 0) {
            this.isCharacterReallyDead()
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
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
        }
    }


    characterDeadCheck() {
        this.playAnimation(this.IMAGES_DEAD);
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
    }


    collectBottle() {
        this.bottle += 20;
    }
}