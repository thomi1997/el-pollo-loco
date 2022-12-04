class Bottles extends DrawableObject {

    x = 25;
    y = 322;
    height = 100;
    width = 80;

    
    /**
     * two different bottles are drawn randomly on the x axis.
     */
    constructor() {
        const randomImg = Math.floor(1 + Math.random() * 2);
        super().loadImage(`img/6_salsa_bottle/${randomImg}_salsa_bottle_on_ground.png`);
        this.x = 200 + Math.random() * 7000;
    }
}