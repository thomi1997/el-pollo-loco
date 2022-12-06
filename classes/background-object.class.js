class BackgroundObject extends MovableObject {

    height = 480;
    width = 720;


    /**
     * 
     * @param {image} imagePath 
     * @param {number} x 
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}