class BackgroundObject extends MovableObject {

    height = 400;
    width = 720;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; // 480 - 400
    }
}