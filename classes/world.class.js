class World {

    character = new Character();
    statusbarHealth = new StatusbarHealth();
    statusbarBottle = new StatusbarBottle();
    statusbarCoins = new StatusbarCoins();
    endboss = new Endboss();
    statusbarEndboss = new StatusbarEndboss();

    bottleBroken = new Audio('audio/bottle-broken.mp3');
    chickenIsDeadSound = new Audio('audio/chicken-dead.mp3');
    backGroundSound = new Audio('audio/background-music.mp3');


    throwableObjects = [];
    camera_x = 0;
    endBossActive = false;
    lastEndBossActive = false;
    timeSinceLastBottle = 2;
    level = level1;

    canvas;
    ctx;
    keyboard;



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


    playSounds(sound, volume) {
        if (!soundsPaused) {
            sound.play();
            sound.volume = volume;
            soundsPaused = false;
        } else if (soundsPaused = true) {
            sound.pause();
        }
    }


    playBackgroundMusic(music, volume) {
        if (!musicPaused) {
            music.play();
            music.volume = volume;
            musicPaused = false;
        } else if (musicPaused = true) {
            music.pause();
        }
    }


    playMusic() {
        setInterval(() => {
            world.playBackgroundMusic(this.backGroundSound, 0.2);
        }, 500);
    }


    // Section all Draw: --------------------------------------------------------------- //


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.backgroundAndCloudsAddToMap();
        this.objectsAddToMap();
        this.ctx.translate(-this.camera_x, 0);
        this.statusBarsAddToMap();
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        this.requestAnimationFrame();
    }


    objectsAddToMap() {
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.objects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
    }


    backgroundAndCloudsAddToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }


    statusBarsAddToMap() {
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarCoins);
        this.drawBossStatusbar();
    }


    requestAnimationFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    drawBossStatusbar() {
        if (this.character.x > 5500) {
            this.endBossActive = true;
            this.addToMap(this.statusbarEndboss);
        }
        if (this.endBossActive != this.lastEndBossActive) {
            this.addToMap(this.statusbarEndboss);
        }
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
        /*mo.drawFrame(this.ctx);*/
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    normalChickenIsHittedFromTop(object) {
        return !(object instanceof Endboss) &&
            this.character.isColliding(object) &&
            this.character.speedY < 0 &&
            this.character.isAboveGround() &&
            !this.character.jump() &&
            !(object.isDead()) &&
            !world.playSounds(this.chickenIsDeadSound, 1);
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


    // Section: Collision & Throw functions  --------------------------------------------------------------- //


    run() {
        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkHasHitEnemy();
            this.checkCollectableObjects();
            this.playMusic();
        }, 25);
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => this.checkWhereCollisons(enemy));
    }


    checkWhereCollisons(enemy) {
        if (this.characterAndEnemyCollides(enemy)) {
            if (this.normalChickenIsHittedFromTop(enemy)) {
                this.hitEnemy(enemy);
            } else {
                this.energyReduction();
            }
        }
    }


    energyReduction() {
        this.character.hit();
        this.statusbarHealth.setPercentage(this.character.energy);
    }


    energyReductionEndBoss() {
        if (this.endboss.hit) {
            this.endboss.hit();
            this.statusbarEndboss.setPercentage(this.endboss.energy);
        }
    }


    characterAndEnemyCollides(enemy) {
        return this.character.isColliding(enemy) &&
            !this.character.isHurt() &&
            !enemy.isHurt() &&
            !enemy.isDead();
    }


    hitEnemy(enemy) {
        if (!(enemy instanceof Endboss)) {
            enemy.kill();
            world.playSounds(this.chickenIsDeadSound, 1);
            setTimeout(() => this.deleteEnemy(enemy), 1000);
        } else {
            enemy.hit();
            this.energyReductionEndBoss();
        }
    }


    deleteEnemy(enemy) {
        let deleteEnemy = this.level.enemies.indexOf(enemy);
        this.level.enemies.splice(deleteEnemy, 1);
    }


    checkThrowObjects() {
        if (this.throwBottle()) {
            this.canCreatBottleRightAndLeft();
        }
    }


    canCreatBottleRightAndLeft() {
        this.character.setTimeSinceLastBottle();
        if (this.character.otherDirection)
            this.creatBottleLeft();
        else if (!this.character.otherDirection)
            this.creatBottleRight();
        this.checkBottlesFromCharacter();
    }


    checkBottlesFromCharacter() {
        this.character.bottle -= 20;
        this.statusbarBottle.setPercentage(this.character.bottle);
    }


    throwBottle() {
        return this.keyboard.D &&
            this.character.bottle > 0 &&
            this.character.getTimeSinceLastBottle();
    }


    creatBottleLeft() {
        this.throwableObjects.push(new ThrowableObject(this.character.x - 100, this.character.y + 100));
    }

    creatBottleRight() {
        this.throwableObjects.push(new ThrowableObject(this.character.x + 100, this.character.y + 100));
    }


    checkHasHitEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach(bottle => this.chickenWasHit(bottle, enemy));
        });
    }


    chickenWasHit(bottle, enemy) {
        if (this.bottleHitsEnemy(bottle, enemy)) {
            world.playSounds(this.bottleBroken, 1);
            this.hitEnemy(enemy);
            bottle.bottleBreak = true;
        }
    }


    bottleHitsEnemy(bottle, enemy) {
        return bottle.isColliding(enemy) &&
            !enemy.isDead() &&
            !bottle.bottleBreak
    }


    checkCollectableObjects() {
        this.level.objects.forEach((object, index) => this.updateObjects(object, index));
    }


    updateObjects(object, index) {
        if (this.character.isColliding(object)) {
            if (object instanceof Bottles && this.character.bottle < 100) {
                this.collectBottle(index);
            }
            if (object instanceof Coin && this.character.coin < 80) {
                this.collectCoin(index);
            }
        }
    }


    collectCoin(index) {
        this.character.collectCoin();
        this.statusbarCoins.setPercentage(this.character.coin);
        this.deleteCoinOrBottle(index);
    }


    collectBottle(index) {
        this.character.collectBottle();
        this.statusbarBottle.setPercentage(this.character.bottle);
        this.deleteCoinOrBottle(index);
    }

    deleteCoinOrBottle(index) {
        this.level.objects.splice(index, 1);
    }
}