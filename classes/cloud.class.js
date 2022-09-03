class Cloud extends MovableObject {
    y = 20;
    height = 350;
    width = 600;


    constructor(imagePath, x) {
        super().loadImage(imagePath, x);
        this.x = x;
    }
}