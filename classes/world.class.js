class World {
    
    
    character = new Character();
    enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    ];


    canvas;
    ctx;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {


        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);        
        this.enemies.forEach(Chicken => {
            this.ctx.drawImage(Chicken.img, Chicken.x, Chicken.y, Chicken.width, Chicken.height);        
        });


        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }
}