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

        // Depending on the sprite variable, we will render different type of cars/blocks/rocks:
        if (sprite === "car") {
            // Since we have multiple cars, we will create a random variable so we render different images:
            randomNumImage = Math.floor(Math.random() * 8) + 1;
            this.img.src = `images/sprite${randomNumImage}.png`;
        } else if (sprite === "rock") {
            // Since we have multiple rocks, we will create a random variable so we render different images:
            // todo Adapt to rocks: randomNumImage = Math.floor(Math.random() * 7) + 1;
            // todo Adapt to rocks: this.img.src = `images/car${randomNumImage}.png`;
        }
        console.log(this.img.src);
        // We also need a variable to randomly position the image on the X axis (120, 208, 296 or 384 pixels, which are the X position of the lanes of the vehicles):
        let randomNumX = 0;
        // todo We will create a setInterval so the sprite Speed goes up (every 10 seconds)

        // The road blocks should move as fast as the road and should only be on the side left lane (89px):

        if (randomNumImage === 8) {
            spriteSpeed = 4;
            randomNumX = 120;
            this.w = 80;
            this.h = 80;
        } else {
            spriteSpeed = 2;
            randomNumX = Math.floor(Math.random() * 4) * 88 + 120;
            this.w = 100;
            this.h = 150;
        }

        this.x = randomNumX;
        this.y = 140;
        this.speed = spriteSpeed;
    }

    // * Add sprite's methods:
    // Draw it:
    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    };
    // Move it torwards the bottom;
    move = () => {
        this.y += this.speed;
    };
}
