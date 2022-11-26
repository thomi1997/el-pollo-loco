class MovableObject extends DrawableObject {
    
    speed = 0.15;
    speedY = 0;

    otherDirection = false;
    acceleration = 1;

    energy = 100;
    lastHit = 0;
    
    ground = 200;
    bottleTimePassed = 2;


    applyGravity() {
        setInterval(() => this.checkGravity(), 1000 / 25);
    }


    checkGravity() {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) { // ThrowableObjects should always fall
            return true;
        } else {
            return this.y < this.ground;
        }
    }


    setTimeSinceLastBottle() {
        this.bottleTimePassed = new Date().getTime();
    }

    getTimeSinceLastBottle() {
        let lastBottle = new Date().getTime() - this.bottleTimePassed;
        lastBottle = lastBottle / 1000;
        return lastBottle > 1.5;
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&   // rechts > links =>   Kollision vorne
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&        //    links > rechts =>  Kollision hinten
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&    //    oben > unten =>   Kollision unten
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom       //     unten > oben =>    Kollision oben   
    }


    hit() {
        this.energy -= 20;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // differenz in milisekunden
        timepassed = timepassed / 1000; // differenz in sekunden
        return timepassed < 1;
    }


    kill() {
        this.energy = 0;
    }


    isDead() {
        return this.energy == 0;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 20;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length // let i = 0 % 6; (% = Modolu der mathematische rest);
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5 ....
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}