class Chicken extends MovableObject {

    y = 350;
    offset = {
        top: 12,
        bottom: 0,
        left: 8,
        right: 8
    };


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.positionAndSpeed();
        this.setDifferentSizes();
        this.animate();
    }


    setDifferentSizes() {
        this.width = 65 + Math.random() * 30;
        this.height = 65 + Math.random() * 30;
    }


    positionAndSpeed() {
        this.x = 1100 + Math.random() * 3000;
        this.speed = 0.5 + Math.random() * 1.5;
    }


    animate() {
        setInterval(() => this.setDirection(), 5000);
        setInterval(() => this.canChickenTurnOver(), 1000 / 60);
        setInterval(() => this.chickenReallyDead(), 150);
    }


    setDirection() {
        if (this.otherDirection)
            this.otherDirection = false;
        else if (!this.otherDirection)
            this.otherDirection = true;
    }


    canChickenTurnOver() {
        if (this.otherDirection) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
    }


    chickenReallyDead() {
        if (this.isDead()) {
            this.playDead();
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    playDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;
    }
}