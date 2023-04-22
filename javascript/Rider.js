// * Here we create the class for the rider:
class Rider {
    // * Add rider's properties:
    constructor(direction) {
        // Rider's properties:
        this.img = new Image();
        // The rider's image will change depending if it riding straight, left or right:
        this.direction = direction;
        if (direction === "straight") {
            this.img.src = "images/moto1.png";
        } else if (direction === "left") {
            this.img.src = "images/moto1-left.png";
        } else if (direction === "right") {
            this.img.src = "images/moto1-right.png";
        }
        this.x = canvas.width / 2;
        this.y = canvas.height - 100;
        this.w = 80;
        this.h = 120;
    }

    // * Add rider's methods:
    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    moveLeft = () => {
        this.x -= 4;
    }

    moveRight = () => {
        this.x += 4;
    }
}