class Endboss extends MovableObject {

    y = -40;
    height = 500;
    width = 300;
    speed = 0.5;
    bossDead = false;


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


    offset = {
        top: 100,
        left: 30,
        right: 30,
        bottom: 30
    };


    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 7200;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.endbossAttacksPlay();
        }, 100);
    }


    playHurt() {
        if (this.playAnimation(this.IMAGES_HURT)) {
        }else {
            this.playAttack();
            this.speed += 0.05;
        }

        setInterval(() => {
            this.moveLeft();
        }, 300);
    }


    endbossAttacksPlay() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.endGame();
            this.speed = 0;
            this.bossDead = true;
        } else if (this.isHurt()) {
            this.playHurt();
        } else {
            this.playAlert();
        }
    }

    
    endGame() {
        if (!this.bossDead) {
            this.bossDead = true;
            winScreen();
        }
    }


    playWalking() {
        this.playAnimation(this.IMAGES_WALKING);
    }


    playAttack() {
        this.playAnimation(this.IMAGES_ATTACK);
    }


    playAlert() {
        this.playAnimation(this.IMAGES_ALERT);
    }
}


