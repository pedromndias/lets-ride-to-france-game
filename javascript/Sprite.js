// * Here we create the class for each sprite:
class Sprite {
    // * Add Sprite's properties:
    constructor(sprite) {
        // console.log(sprite) // * TEST
        let randomNumImage = 0;
        // Let's create the logic for the image of or Sprite and the properties to then generate our image:
        this.img = new Image();
        this.img.src = "";
        this.w;
        this.h;
        let spriteSpeed;
        this.isXWing = false;

        // Depending on the sprite variable, we will render different type of cars/blocks/rocks:
        if (sprite === "car") {
            // Since we have multiple cars, we will create a random variable so we render different images:
            randomNumImage = Math.floor(Math.random() * 10) + 1;
            this.img.src = `images/sprite${randomNumImage}.png`;
        } else if (sprite === "rock") {
            // Since we have multiple rocks, we will create a random variable so we render different images:
            // todo Adapt to rocks: randomNumImage = Math.floor(Math.random() * 7) + 1;
            // todo Adapt to rocks: this.img.src = `images/car${randomNumImage}.png`;
            // console.log("Rock sprites coming.") // * TEST
            randomNumImage = Math.floor(Math.random() * 7) + 1;
            // If the randomNumImage is 7, we will render our dino GIF:
            if (randomNumImage === 8) {
                this.img.src = `images/rock-sprite-${randomNumImage}.gif`;
            } else {
                this.img.src = `images/rock-sprite-${randomNumImage}.png`;
            }
        }
        // console.log(this.img.src); // * TEST
        // We also need a variable to randomly position the image on the X axis (120, 208, 296 or 384 pixels, which are the X position of the lanes of the vehicles):
        let randomNumX = 0;
        // todo We will create a setInterval so the sprite Speed goes up (every 10 seconds)

        // The road blocks should move as fast as the road and should only be on the side left lane (120px):
        if (sprite === "car") {
            if (randomNumImage === 8) {
                spriteSpeed = 4;
                randomNumX = 120;
                this.w = 80;
                this.h = 80;
            } else {
                spriteSpeed = 2;
                randomNumX = Math.floor(Math.random() * 4) * 88 + 120;
                if (randomNumImage === 9 || randomNumImage === 10) {
                    this.w = 80;
                    this.h = 120;
                } else {
                    this.w = 100;
                    this.h = 150;
                }
            }
        } else {
            console.log("Will draw rock sprites")
            randomNumX = Math.floor(Math.random() * 4) * 88 + 120;

            // If the randomNumImage is 2, we will render a motorcycle wich is smaller than the other sprites:
            if (randomNumImage === 2) {
                spriteSpeed = 2;
                this.w = 80;
                this.h = 120;
                this.y = 140;
            }
            // If the randomNumImage is 3, we will render our X-Wing faster then the road (and it will move also on the X axis):
            else if (randomNumImage === 3) {
                randomNumX = 0;
                this.isXWing = true;
                spriteSpeed = 10;
                this.w = 300;
                this.h = 300;
                this.y = 0;
            } 
            // If the randomNumImage is 4 or 5, we will render our rocks as fast as the road:
            else if (randomNumImage === 4 || randomNumImage === 5) {
                spriteSpeed = 4;
                this.w = 100;
                this.h = 150;
                this.y = 140;
            } else if (randomNumImage === 6) {
                spriteSpeed = 4;
                this.w = 150;
                this.h = 100;
                this.y = 140;
            } else if (randomNumImage === 7) {
                spriteSpeed = 4;
                this.w = 150;
                this.h = 150;
                this.y = 140;
            }
            else {
                spriteSpeed = 2;
                this.w = 100;
                this.h = 150;
                this.y = 140;
            }
        }

        this.x = randomNumX;
        this.speed = spriteSpeed;
    }

    // * Add sprite's methods:
    // Draw it:
    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        
    };
    // Move it torwards the bottom;
    move = () => {
        if (this.isXWing) {
            this.x += this.speed;
            this.y += this.speed;
        } else {
            this.y += this.speed;
        }
    };
}
