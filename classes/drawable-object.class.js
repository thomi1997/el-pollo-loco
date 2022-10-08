class DrawableObject {
    
    x = 120;
    y = -10;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;


    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e) {
            console.warn('Error is loading image', e);
            console.log('Could not load image', this.img.src);
        }
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    
    drawFrame(ctx) {
        this.drawCharacter(ctx);
        this.drawBoss(ctx);
        this.drawChicken(ctx);
        this.drawSmallChicken(ctx);
        this.drawBottles(ctx);
        this.drawCoins(ctx);    
    }

    drawCharacter(ctx) {
        if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + 22, this.y + 94, this.width - 43, this.height - 104);
            ctx.stroke();
        }
    }

    drawBoss(ctx) {
        if (this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + 19, this.y + 85, this.width - 27, this.height - 100);
            ctx.stroke();
        }
    }

    drawChicken(ctx) {
        if (this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y + 4, this.width, this.height - 12);
            ctx.stroke();
        }
    }


    drawSmallChicken(ctx) {
        if (this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + 4, this.y + 4, this.width - 3, this.height - 12);
            ctx.stroke();
        }
    }


    drawBottles(ctx) {
        if (this instanceof Bottles) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + 27, this.y + 17, this.width - 45, this.height - 28);
            ctx.stroke();
        }
    }


    drawCoins(ctx) {
        if (this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + 42, this.y + 42, this.width - 85, this.height - 85);
            ctx.stroke();
        }
    }
}