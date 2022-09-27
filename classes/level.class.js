class Level {
    enemies;
    bottles;
    clouds;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies, backgroundObjects, bottles, clouds) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.clouds = clouds;
    }
}