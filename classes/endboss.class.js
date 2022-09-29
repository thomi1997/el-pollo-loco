class Endboss extends MovableObject {

    y = -40;
    height = 500;
    width = 300;

    energy = 20;
    speed = 1;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];


    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];


    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];


    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];


    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 7500;
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playDead();
            }else if (this.isHurt()) {
                this.playHurt();
            } if (this.characterMeetsEndboss()) {
                this.moveLeft();
            }
        }, 200);
    }


    playDead() {
        this.playAnimation(this.IMAGES_DEAD);
        /*
        setTimeout(() => {
            winScreen();
            world.backgroundMusic.pause();
        }, 700)*/
    }


    playHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.playAnimation(this.IMAGES_ATTACK);
        this.speed += 0.5;
    }


    characterMeetsEndboss() {
        return world && this.calculatedistance() < 700 && !this.isHurt();
    }


    calculatedistance(distance) {
        distance = this.x - world.character.x
        return distance;
    }

    moveLeft() {
        setInterval(() => {
            super.moveLeft();
        }, 1000);
        this.playAnimation(this.IMAGES_WALKING);
    }
}


