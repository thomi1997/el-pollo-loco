class Cloud extends MovableObject {
    y = 20;
    height = 350;
    width = 600;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 3500;
        this.animate();
    }


    animate() {
        this.moveLeft();
    }
}