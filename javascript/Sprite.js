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
        this.spriteSpeed = 4;
        this.isXWing = false;
        // Let's create a variable to check if the sprite ir a rock/road block:
        this.isBlock;
        // Create a variable to check if the sprite is a bus:
        this.isBus;
        // Create a variable to check is the sprite is a police car:
        this.isPoliceCar;
        // Let's create a variable to check if the sprite is a tie-fighter:
        this.isTieFighter;
        // Let's create a variable to check if the sprite is a delorean:
        this.isDelorean;
        // Let's create a variable to check if the sprite is a motorcycle:
        this.isMotorcycle;

        // Create audio for sprites:
        this.xWingSound = new Audio("audio/xwing-flying.mp3");

        // Depending on the sprite variable, we will render different type of cars/blocks/rocks:
        if (sprite === "car") {
            // Since we have multiple cars, we will create a random variable so we render different images:
            randomNumImage = Math.floor(Math.random() * 10) + 1;
            this.img.src = `images/sprite${randomNumImage}.png`;
        } else if (sprite === "rock") {
            // Since we have multiple rocks, we will create a random variable so we render different images:
            // console.log("Rock sprites coming.") // * TEST
            randomNumImage = Math.floor(Math.random() * 8) + 1;
            this.img.src = `images/rock-sprite-${randomNumImage}.png`;
        }
        // console.log(this.img.src); // * TEST
        // We also need a variable to randomly position the image on the X axis (120, 208, 296 or 384 pixels, which are the X position of the lanes of the vehicles):
        let randomNumX = 0;

        // The road blocks should move as fast as the road and should only be on the side left lane (130px):
        if (sprite === "car") {
            // If the sprite is a roadblock, we will keep its speed as the road speed (to show it "not moving"):
            if (randomNumImage === 8) {
                this.isBlock = true;
                this.spriteSpeed = 4;
                randomNumX = 120;
                this.w = 80;
                this.h = 80;
            } else {
                this.spriteSpeed -= 2;
                randomNumX = Math.floor(Math.random() * 4) * 92 + 130;
                if (randomNumImage === 9 || randomNumImage === 10) {
                    // Motorcycles dimensions:
                    this.isMotorcycle = true;
                    this.w = 50;
                    this.h = 80;
                } else if (randomNumImage === 4) {
                    // Bus dimensions:
                    this.w = 70;
                    this.h = 160;
                    this.isBus = true;
                } else if (randomNumImage === 7) {
                    // Police car:
                    this.w = 70;
                    this.h = 120;
                    this.isPoliceCar = true;
                }
                else {
                    // Other vehicles:
                    this.w = 70;
                    this.h = 120;
                }
            }
            this.y = 140;
        } else {
            //console.log("Will draw rock sprites"); // * TEST
            randomNumX = Math.floor(Math.random() * 4) * 88 + 120;

            // If the randomNumImage is 2, we will render a motorcycle wich is smaller than the other sprites:
            if (randomNumImage === 2) {
                this.isMotorcycle = true;
                this.spriteSpeed -= 2;
                this.w = 50;
                this.h = 80;
                this.y = 140;
            }
            // If the randomNumImage is 3, we will render our X-Wing faster then the road (and it will move also on the X axis):
            else if (randomNumImage === 3) {
                randomNumX = 0;
                this.isXWing = true;
                this.isBlock = true;
                this.spriteSpeed = 10;
                this.w = 300;
                this.h = 300;
                this.y = 0;
                // Play xWing sound:
                this.xWingSound.play();
                this.xWingSound.volume = 0.1;
            }
            // If the randomNumImage is 4 or 5, we will render our rocks as fast as the road:
            else if (randomNumImage === 4 || randomNumImage === 5) {
                this.isBlock = true;
                this.spriteSpeed = 4;
                this.w = 100;
                this.h = 80;
                this.y = 140;
            } 
            else if (randomNumImage === 6) {
                // For the tie-fighter:
                this.isTieFighter = true;
                this.spriteSpeed -= 3;
                this.w = 120;
                this.h = 110;
                this.y = 140;
            }
             else if (randomNumImage === 7) {
                // For the batmobile:
                this.spriteSpeed -= 2;
                this.w = 80;
                this.h = 120;
                this.y = 140;
            } else if (randomNumImage === 8) {
                // For the DeLorean:
                this.spriteSpeed -= 2;
                this.isDelorean = true;
                this.w = 80;
                this.h = 120;
                this.y = 140;
            } else {
                this.spriteSpeed -= 2;
                this.w = 80;
                this.h = 120;
                this.y = 140;
            }
        }

        this.x = randomNumX;
    }

    // * Add sprite's methods:
    // Draw it:
    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    };
    // Move it torwards the bottom;
    move = () => {
        if (this.isXWing) {
            this.x += this.spriteSpeed;
            this.y += this.spriteSpeed;
        } else {
            this.y += this.spriteSpeed;
        }
    };
}
