// * Here we create the class for the road:
class Road {
    // * Add road's properties:
    constructor(positionY, isNormalGame) {
        
        // Road's image (will depend of the variables so we see road or offroad):
        this.img = new Image();
        if (isNormalGame) {
            this.img.src = "images/road-background1.png";
        } else {
            this.img.src = "images/road-dirt.png";
        }

        this.x = 0;
        this.y = positionY;
        this.w = canvas.width;
        this.h = canvas.height + 4; // +2 is the adjustment because of the initial speed (2);
        this.speed = 4;
    }

    // * Add road's methods:
    // Draw the road:
    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    };
    // Move it down on canvas:
    move = () => {
        this.y += this.speed;
    };
}
