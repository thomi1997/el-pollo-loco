class SmallChicken extends MovableObject{

    y = 360;
    height = 75;
    width = 50;

    energy = 1;
    isHittet = false;
    speed = 25;
    speedY = 40;
    ground = 370;
    otherDirection = Math.random() < 0.5;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];


    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 4000 + Math.random() * 3000; // Zahl zwischen 200 und 700
        this.speed = 0.5 + Math.random() * 0.8;
        this.applyGravity();
        this.animate();
    }


    setDirection() {
        if (this.otherDirection)
            this.otherDirection = false
        else if (!this.otherDirection)
            this.otherDirection = true;
    }


    animate() {
        setInterval (() => this.setDirection(), 10000);
        setInterval(() => {
            if (this.otherDirection) {
                this.moveRight();
            } else {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playDead();
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);

        setInterval(() => {
            if (this.canJump()) {
                this.jump();
            }
        }, 1000 / 60);
    }


    canJump() {
        return !this.isAboveGround() && !this.isDead();
    }

    
    playDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;
    }
}