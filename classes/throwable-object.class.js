class ThrowableObject extends MovableObject {

    height = 100;
    width = 80;
    bottleBreak = false;
    speed = 2.5;
    speedY = 9;


    THROWN_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];


    THROWN_BOTTLE_BREAKS = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];


    constructor(x, y) {
        super().loadImage(this.THROWN_BOTTLE[0]);
        this.loadImages(this.THROWN_BOTTLE);
        this - this.loadImages(this.THROWN_BOTTLE_BREAKS);
        this.x = x;
        this.y = y;
        this.setDirection();
        this.throw();
    }


    /**
     * setting the right direction.
     */
    setDirection() {
        if (world.character.otherDirection)
            this.otherDirection = true;
        if (!world.character.otherDirection)
            this.otherDirection = false;
    }


    /**
     * throw bottle.
     */
    throw() {
        this.applyGravity();
        setStoppableInterval(() => this.canThrowLeftOrRight(), 30 / 1000);
    }


    canThrowLeftOrRight() {
        this.throwBottleLeftAndRight();
        this.throwBottleAnimation();
    }


    throwBottleLeftAndRight() {
        if (this.otherDirection)
            this.moveLeft();
        if (!this.otherDirection)
            this.moveRight();
    }


    throwBottleAnimation() {
        if (this.bottleBreak) {
            this.playAnimation(this.THROWN_BOTTLE_BREAKS);
        } else {
            this.playAnimation(this.THROWN_BOTTLE);
        }
    }
}