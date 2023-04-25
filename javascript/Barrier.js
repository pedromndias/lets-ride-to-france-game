// * Here we create the class for the offroad barrier:
class Barrier {
    // * Add barrier's properties:
    // Note that it will take an parameter to render both types of barriers (left and right).
    constructor(direction) {
        this.img = new Image();
        if (direction === "left") {
            this.img.src = "images/sprite-barrier-left.png";
            this.x = 70;
        } else if (direction === "right") {
            this.img.src = "images/sprite-barrier-right.png";
            this.x = canvas.width - 83;
        }

        
        this.y = -100;
        this.w = 30;
        this.h = 100;
        this.speed = 4;
    }

    // * Add barrier's methods:
    // Draw it:
    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
    // Move it:
    move = () => {
        this.y += this.speed;
    }
}