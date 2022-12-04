class MovableObject extends DrawableObject {

    speed = 0.15;
    speedY = 0;

    otherDirection = false;
    acceleration = 1;

    energy = 100;
    lastHit = 0;
    
    ground = 200;
    bottleTimePassed = 2;


    /**
     * apply gravity.
     */
    applyGravity() {
        setInterval(() => this.checkGravity(), 1000 / 25);
    }

    
    /**
     * the gravitational forces are tested.
     */
    checkGravity() {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }


    /**
     * thrown objects must always fall.otherwise not.
     * @returns
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < this.ground;
        }
    }


    /**
     * the time of the last thrown bottle is noted.
     */
    setTimeSinceLastBottle() {
        this.bottleTimePassed = new Date().getTime();
    }


    /**
     * the time of the last bottles are read.
     * @returns 
     */
    getTimeSinceLastBottle() {
        let lastBottle = new Date().getTime() - this.bottleTimePassed;
        lastBottle = lastBottle / 1000;
        return lastBottle > 1.5;
    }


    /**
     * all outputs are checked and a collision is seen to occur
     * @param {object dimensioning} mo 
     * @returns 
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&   // right > left =>   collision front
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&        //    left > right =>  collision rear
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&    //    above > below =>   collision below
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom       //     below > above =>    collision Above  
    }


    /**
     * energy gets deduction - 20.
     * energy is zero then it remains zero otherwise each stroke is noted.
     */
    hit() {
        this.energy -= 20;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * a violated object is noted.
     * @returns 
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // differenz in milisekunden
        timepassed = timepassed / 1000; // differenz in sekunden
        return timepassed < 1;
    }

    /**
     * opponents are dead.
     */
    kill() {
        this.energy = 0;
    }


    /**
     * is the boss really dead.
     * @returns 
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * the object x is moved to the right with speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * the object x is moved to the left with speed
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * the objects are always moved up and down with speedY moved down.
     */
    jump() {
        this.speedY = 17;
    }


    /**
     * A series of pictures is painted.
     * @param {images} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length // let i = 0 % 6; (% = Modolu der mathematische rest);
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5 ....
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}