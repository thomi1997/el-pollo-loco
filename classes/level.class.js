class Level {
    enemies;
    bottles;
    clouds;
    backgroundObjects;
    objects;
    level_end_x = 2200;

    constructor(objects, enemies, backgroundObjects, bottles, clouds) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.clouds = clouds;
        this.objects = objects;
    }
}