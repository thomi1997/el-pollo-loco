class Level {
    enemies;
    clouds;
    backgroundObjects;
    objects;
    level_end_x = 2200;

    constructor(enemies, backgroundObjects, clouds, objects) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.objects = objects;
    }
}