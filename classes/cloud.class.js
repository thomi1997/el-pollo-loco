class Cloud extends MovableObject {
    
    y = 20;
    height = 350;
    width = 600;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 10 + Math.random() * 7000;
        this.y = 15 + Math.random() * 60;
        this.speed = 0.01 + Math.random() * 0.1;
        this.animate();
    }


    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60);
    }
}