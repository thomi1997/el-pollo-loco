class Chicken extends MovableObject {

    y = 340;
    height = 100;
    width = 60;
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
        this.x = 1100 + Math.random() * 3000; // Zahl zwischen 200 und 700
        this.speed = 0.5 + Math.random() * 1.5;
        this.animate();
    }

    animate() {
        setInterval (() => this.setDirection(), 5000);
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
    }


    setDirection() {
        if (this.otherDirection)
            this.otherDirection = false
        else if (!this.otherDirection)
            this.otherDirection = true;
    }

    playDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;
    }
}