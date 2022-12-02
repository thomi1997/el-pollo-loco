let level1 = new Level(
    getEnemys(),
    getBackgroundObjects(),
    getClouds(),
    getCollectables(),
);


function getCollectables() {
    let coins = getCoins();
    let bottles = getBottles();
    let collectables = coins.concat(bottles);
    return collectables;
}



function getEnemys() {
    return [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new Endboss()
    ]
}


function getClouds() {
    return [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ]
}


function getBackgroundObjects() {
    return [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 2),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 3),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 4),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 5),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 6),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 7),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 8),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 8),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 8),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 8),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 9),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 9),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 9),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 9),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 10),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 10),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 10),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 10),
    ]
}

function getBottles() {
    return [
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles()
    ]
}


function getCoins() {
    return [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ]
}