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

        // Let's create a variable to see if the rider has crashed (to change the image):
        this.hasCrashed = false;

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
        // Note the conditionals so it renders a specific image depending on our booleans.
        if (this.hasCrashed) {
            ctx.drawImage(
                this.imageCrash,
                this.x,
                this.y,
                this.w + 10,
                this.h + 10
            );
        } else if (this.riderDirectionObj.left) {
            ctx.drawImage(this.imageLeft, this.x, this.y, this.w, this.h);
        } else if (this.riderDirectionObj.right) {
            ctx.drawImage(this.imageRight, this.x, this.y, this.w, this.h);
        } else {
            ctx.drawImage(this.imageUp, this.x, this.y, this.w, this.h);
        }
    };

    // Move rider in different directions:
    moveRider = () => {
        // The rider should not move over the road sides (aprox at 90px and canvas.width-135px on the X axis) and not over and under the road's Y position:
        if (!this.hasCrashed) {
            if (this.x > 90 && this.riderDirectionObj.left) {
                this.x -= this.moveSpeed;
            }
            if (this.x < canvas.width - 135 && this.riderDirectionObj.right) {
                this.x += this.moveSpeed;
            }
            if (this.y > 190 && this.riderDirectionObj.up) {
                this.y -= this.moveSpeed;
            }
            if (
                this.y + this.h < canvas.height &&
                this.riderDirectionObj.down
            ) {
                this.y += this.moveSpeed;
            }
        } else {
            // In case the rider crashes, it will move on the same speed as the road:
            this.y += this.moveSpeed;
        }
    };
}
