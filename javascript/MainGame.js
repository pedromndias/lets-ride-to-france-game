// * Here we create the general class for the main game:
class MainGame {
    // * Add main game's properties (all main game's elements):
    constructor() {
        // The background:
        this.background = new Image();
        this.background.src = "images/blue-sky1.jpg";

        // Create a new Road object:
        this.firstRoad = new Road(0, true);
        // Create an array of new road sets:
        this.roadArr = [];

        // Create a new Sprite Object: //* TEST for one sprite.
        // First we define a variable to define if we want cars/blocks or rocks:
        this.isCarSprite = true;
        // Now we do a conditional to get back the object depending on the sprite:
        // this.sprite;
        // if (isCarSprite) {
        //     this.sprite = new Sprite("car");
        // }
        //  An array to store the multiple sprites:
        this.spritesArr = [];

        // Create a new Rider object:
        this.straightLine = "straight"; // Initial value of the rider's direction.
        this.rider = new Rider(this.straightLine);

        // Let's create a variabel to check is the game is on:
        this.isGameOn = true;
    }

    // * Add the main game's methods (all main game's actions):

    // Create a function that makes the road move:
    // If one set of road starts touching the bottom part, we shoud insert a new one on top:
    roadKeepsMovingDown = () => {
        // If it is our first new road (array empty) or if the last item of the array enters completelly inside the canvas, we will add a new road set to the arry:
        if (this.roadArr.length === 0 || this.roadArr[this.roadArr.length-1].y > 0) {
            // console.log("Running roadKeepsMovingDown");
            // Let's create more road sets but starting before the first road:
            let newRoadSet = new Road(-canvas.height, true);
            this.roadArr.push(newRoadSet)
        }
        // Check that the array has not infinite elements:
        // console.log(this.roadArr.length);
    }

    // We need to remove the road from the array:
    removeRoadOut = () => {
        if (this.roadArr[0].y > canvas.height) {
            this.roadArr.shift();
        }
    }

    // Let's create a method to show our sprites depending on the isCarSprite variable (cars or rocks):
    showSprites = () => {
        // If the sprite's array is empty or if the last one passes a certain position in the canvas (450px, should be adjusted depending on the road blocks and police cars), we will create more sprites:
        if(this.spritesArr.length === 0 || this.spritesArr[this.spritesArr.length-1].y > 450) {
            let newSprite;
            if (this.isCarSprite) {
                newSprite = new Sprite("car");
            } else {
                newSprite = new Sprite("rock");
            }
            // Now we push the new sprite to the sprite's array:
            this.spritesArr.push(newSprite);
        }
    }

    // Like with the roads, we need to remove the sprites after the canvas:
    removeSprite = () => {
        if(this.spritesArr[0].y > canvas.height) {
            this.spritesArr.shift();
        }
    }
    
    // Create a function to end the game:
    gameOver = () => {
        // 1. Stop de game:
        this.isGameOn = false;

        // 2. Hide the canvas:
        canvas.style.display = "none";

        // 3. Show final screen:
        gameoverScreen.style.display = "flex";
    }

    // Create a function to draw the background:
    drawBackground = () => {
        ctx.drawImage(this.background, 0, 0, canvas.width, 200);
    }

    // Create a function to clear the canvas:
    clearCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Let's create the game's loop (recursion):
    gameLoop = () => {
        // console.log("Testing recursion");
        // 1. Clean the canvas:
        this.clearCanvas();

        // 2. Actions and elements' movements:
        // Make the road sets move:
        this.firstRoad.move();
        this.roadArr.forEach((eachRoad) => {
            eachRoad.move();
        })
        
        // Show the road sets moving:
        this.roadKeepsMovingDown();

        // And remove the road from the array:
        this.removeRoadOut();

        // Make the sprites move on the road:
        this.spritesArr.forEach((eachSprite) => {
            eachSprite.move();
        })

        // Show the sprites moving:
        this.showSprites();

        // And remove the sprite from the array:
        this.removeSprite();


        // 3. Elements' drawing on canvas:
        this.firstRoad.draw();
        this.roadArr.forEach((eachRoad) => {
            eachRoad.draw();
        })
        this.drawBackground();
        this.spritesArr.forEach((eachSprite) => {
            eachSprite.draw();
        })
        this.rider.draw();

        // 4. Recursion (requestAnimationFrame)
        // Only run this if isGameOn is true:
        if (this.isGameOn === true) {
            requestAnimationFrame(this.gameLoop) // 60 times per second (fps of the monitor) it calls gameLoop()
        }
    }

    
}