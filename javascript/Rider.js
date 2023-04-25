// * Here we create the class for the rider:
class Rider {
    // * Add rider's properties:
    constructor() {
        // Let's create an object that has the values of the rider's directions:
        this.riderDirectionObj = {
            left: false,
            right: false,
            up: false,
            down: false,
        };

        // Let's also create an object with the different images for the rider:
        this.imagesObj = {
            left: new Image(),
            right: new Image(),
            up: new Image(),
        };
        // The rider's image will change depending if it riding straight, left or right:
        this.imagesObj.left.src = "images/moto-left.png";
        this.imagesObj.right.src = "images/moto-right.png";
        this.imagesObj.up.src = "images/moto.png";
        // Due to optimization, let's create variable of those images:
        this.imageLeft = this.imagesObj.left;
        this.imageRight = this.imagesObj.right;
        this.imageUp = this.imagesObj.up;

        // Let's create an image in case there is a crash:
        this.imageCrash = new Image();
        this.imageCrash.src = "images/motorcycle-crash.png";

        this.x = canvas.width / 2;
        this.y = canvas.height - 100;
        this.w = 50;
        this.h = 70;
        // Create a variable for the rider's movement:
        this.moveSpeed = 4;
    }

    // * Add rider's methods:
    // Draw the rider:
    draw = () => {
        if (this.riderDirectionObj.left) {
            ctx.drawImage(this.imageLeft, this.x, this.y, this.w, this.h);
        } else if (this.riderDirectionObj.right) {
            ctx.drawImage(this.imageRight, this.x, this.y, this.w, this.h);
        } else {
            ctx.drawImage(this.imageUp, this.x, this.y, this.w, this.h);
        }
    };

    // Move rider in different directions:
    moveRider = () => {
        if (this.riderDirectionObj.left) {
            this.x -= this.moveSpeed;
        }
        if (this.riderDirectionObj.right) {
            this.x += this.moveSpeed;
        }
        if (this.riderDirectionObj.up) {
            this.y -= this.moveSpeed;
        }
        if (this.riderDirectionObj.down) {
            this.y += this.moveSpeed;
        }
    };
    
    // Create a crash method so the image changes:
    crash = () => {
        ctx.drawImage(this.imageCrash, this.x, this.y, this.w, this.h);
    }
}
