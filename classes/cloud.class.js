class Cloud extends MovableObject {
    y = 20;
    height = 350;
    width = 600;


    constructor(imagePath, x) {
        super().loadImage(imagePath, x);
        this.x = Math.random() * 500;
        this.animate();
    }


    animate() {
        this.moveLeft();
    }
}