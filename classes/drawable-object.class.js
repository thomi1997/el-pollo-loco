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


    /**
     * canvas and the objects are painted.
     * @param {objects} ctx 
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error is loading image', e);
            console.log('Could not load image', this.img.src);
        }
    }


    /**
     * an image is loaded.
     * @param {imge} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * some images are loaded.
     * @param {image} array 
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * 
     * @returns shows the statusbar.
     */
    resolveImageIndexFromHeartAndEndboss() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }


    resolveImageIndexFromBottles() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage == 20) {
            return 1;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage >= 80) {
            return 5;
        }
    }
}