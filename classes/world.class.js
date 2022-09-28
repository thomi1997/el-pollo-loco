class World {


    character = new Character();
    statusbarHealth = new StatusbarHealth();
    statusbarBottle = new StatusbarBottle();
    throwableObjects = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkIfEnemyIsHitByBottle();
            this.checkCollectableObjects();
        }, 25);
    }


    checkCollisions() {
        this.level.enemies.forEach( (enemy) => {
            if (this.characterAndEnemyCollides(enemy)) {
                if (this.normalChickenIsHittedFromTop(enemy)) {
                    this.hitEnemy(enemy);
                }else {
                    this.character.hit();
                    this.statusbarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }


    checkThrowObjects() {
        if (this.ableToThrowBottle()) {
            this.character.setTimeSinceLastBottle();
            if (this.character.otherDirection) {
                this.creatBottleLeft();
            }else if (!this.character.otherDirection) {
                this.creatBottleRight();
            }
            this.character.bottle -= 20;
            this.statusbarBottle.setPercentage(this.character.bottle);
        }
        /*if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }*/
    }


    checkIfEnemyIsHitByBottle() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach(bottle => {
                if (this.bottleHitsEnemy(bottle, enemy)) {
                    this.hitEnemy(enemy);
                    bottle.bottleBreak = true;
                }
            });
        });
    }


    checkCollectableObjects() {
        this.level.objects.forEach((object, index) => {
            if (this.character.isColliding(object)) {
                if (object instanceof Bottles && this.character.bottle < 100)
                    this.collectBottle(index);
                    /*
                if (object instanceof Coin && this.character.coin < 80)
                    this.collectCoin(index);*/
            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarBottle);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    ableToThrowBottle() {
        return this.keyboard.D &&
            this.character.bottle > 0 &&
            this.character.getTimeSinceLastBottle()
    }


    bottleHitsEnemy(bottle, enemy) {
        return bottle.isColliding(enemy) &&
            !enemy.isDead() &&
            !bottle.bottleBreak
    }


    characterAndEnemyCollides(enemy) {
        return this.character.isColliding(enemy) &&
            !this.character.isHurt() &&
            !enemy.isHurt() &&
            !enemy.isDead()
    }


    normalChickenIsHittedFromTop(object) {
        return !(object instanceof Endboss) &&
            this.character.isColliding(object) &&
            this.character.speedY < 0 &&
            this.character.isAboveGround() &&
            !(object.isDead())
    }


    hitEnemy(enemy) {
        if (!(enemy instanceof Endboss)) {
            enemy.kill();
            setTimeout(() => {
                let deleteEnemy = this.level.enemies.indexOf(enemy);
                this.level.enemies.splice(deleteEnemy, 1);
            }, 1000);
        } else
            enemy.hit();
    }


    creatBottleLeft() {
        this.throwableObjects.push(new ThrowableObject(this.character.x - 100, this.character.y + 100));
    }

    creatBottleRight() {
        this.throwableObjects.push(new ThrowableObject(this.character.x + 100, this.character.y + 100));
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    collectBottle(index) {
        this.character.collectBottle();
        this.statusbarBottle.setPercentage(this.character.bottle);
        this.level.bottles.splice(index, 1);
    }
}