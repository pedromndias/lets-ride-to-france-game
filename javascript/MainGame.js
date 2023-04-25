// * Here we create the general class for the main game:
class MainGame {
    // * Add main game's properties (all main game's elements):
    constructor(isNormalGame) {
        // * In this constructor we have all the initial elements and values of the main game.
        // The background:
        this.background = new Image();
        this.background.src = "images/blue-sky1.jpg";

        // Let's create a variable to decide if the game is normal or offroad:
        this.isNormalGame = isNormalGame;
        // Create a new Road object:
        // This is a different road from the following ones, this is the first road show already when the game starts:
        if (this.isNormalGame) {
            this.firstRoad = new Road(0, true);
        } else {
            this.firstRoad = new Road(0, false);
        }

        // Create an empty array in case we are playing offroad:
        if(!this.isNormalGame) {
            this.barrierArr = [];
        }

        // Create an array of new road sets:
        this.roadArr = [];

        // Create a new Sprite Object: //* TEST for one sprite.
        // First we define a variable to define if we want cars/blocks or rocks:
        this.isCarSprite = isNormalGame;
        // Now we do a conditional to get back the object depending on the sprite:
        // this.sprite;
        // if (isCarSprite) {
        //     this.sprite = new Sprite("car");
        // }
        //  An array to store the multiple sprites:
        this.spritesArr = [];

        // Create a new Rider object:
        this.rider = new Rider();

        // Let's create a variabel to check is the game is on:
        this.isGameOn = true;
    }

    // * Add the main game's methods (all main game's actions):

    // Create a function that makes the road move:
    // If one set of road's position Y touches the begining of the canvas, we shoud insert a new one on top:
    roadKeepsMovingDown = () => {
        // If it is our first new road (array empty) or if the last item of the array enters completelly inside the canvas, we will add a new road set to the array:
        if (
            this.roadArr.length === 0 ||
            this.roadArr[this.roadArr.length - 1].y > 0
        ) {
            // console.log("Running roadKeepsMovingDown"); //* TEST
            // Let's create more road sets but starting before the first road:
            let newRoadSet;
            if (this.isNormalGame) {
                newRoadSet = new Road(-canvas.height, true);
            } else {
                newRoadSet = new Road(-canvas.height, false);
            }
            this.roadArr.push(newRoadSet);
        }
        // Check that the array is adding and removing elements correctly:
        // console.log(this.roadArr.length); //* TEST
    };

    // We need to remove the road from the array:
    removeRoadOut = () => {
        if (this.roadArr[0].y > canvas.height) {
            this.roadArr.shift();
        }
    };

    // Let's create a method to show our sprites depending on the isCarSprite variable (cars or rocks):
    showSprites = () => {
        // If the sprite's array is empty or if the last one passes a certain position in the canvas (450px, should be adjusted depending on the road blocks and police cars), we will create more sprites:
        if (
            this.spritesArr.length === 0 ||
            this.spritesArr[this.spritesArr.length - 1].y > 450
        ) {
            let newSprite;
            if (this.isCarSprite) {
                newSprite = new Sprite("car");
            } else {
                newSprite = new Sprite("rock");
            }
            // Now we push the new sprite to the sprite's array:
            this.spritesArr.push(newSprite);
        }
    };

    // Like with the roads, we need to remove the sprites after the canvas:
    removeSprite = () => {
        if (this.spritesArr[0].y > canvas.height) {
            this.spritesArr.shift();
        }
    };

    // Let's make a function to show the barriers on the offroad game:
    showBarriers = () => {
        // If the barrierArr is empty or if the last one did reach 0px on the Y axis of the screen, we create a new barrierArr:
        if (this.barrierArr.length === 0 || this.barrierArr[this.barrierArr.length-1].y > 0) {
            let newBarrierLeft = new Barrier("left");
            // And then we push it to the array:
            this.barrierArr.push(newBarrierLeft);
            // And we have to repeat the process for the right barrier:
            let newBarrierRight = new Barrier("right");
            // And then we also push it to the array:
            this.barrierArr.push(newBarrierRight);
        }
    }

    // Like the road and sprites, we should remove the barriers from the array:
    removeBarrier = () => {
        if (this.barrierArr[0].y > canvas.height) {
            this.barrierArr.shift();
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
    };

    // Create a function to draw the background:
    drawBackground = () => {
        ctx.drawImage(this.background, 0, 0, canvas.width, 200);
    };

    // Create a function to clear the canvas:
    clearCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // Let's create the game's loop (recursion):
    gameLoop = () => {
        // console.log("Testing recursion"); //* TEST
        // * 1. Clean the canvas:
        this.clearCanvas();

        // * 2. Actions and elements' movements:
        // Make the road sets move:
        this.firstRoad.move();
        this.roadArr.forEach((eachRoad) => {
            eachRoad.move();
        });

        // Show the road sets moving:
        this.roadKeepsMovingDown();

        // And remove the road from the array:
        this.removeRoadOut();

        // Make the sprites move on the road:
        this.spritesArr.forEach((eachSprite) => {
            eachSprite.move();
        });

        // Show the sprites moving:
        this.showSprites();

        // And remove the sprite from the array:
        this.removeSprite();

        // Make the rider move:
        this.rider.moveRider();

        // If it is offroad, let's move the barriers:
        if(!this.isNormalGame) {
            this.barrierArr.forEach((eachBarrier) => {
                eachBarrier.move();
            });
        }

        // Show the barriers:
        this.showBarriers();

        // And remove the barriers from the array:
        this.removeBarrier();

        // * 3. Elements' drawing on canvas:
        this.firstRoad.draw();
        this.roadArr.forEach((eachRoad) => {
            eachRoad.draw();
        });
        // If it is offroad, let's show the barriers:
        if(!this.isNormalGame) {
            this.barrierArr.forEach((eachBarrier) => {
                eachBarrier.draw();
            });
        }
        this.drawBackground();
        this.rider.draw();
        this.spritesArr.forEach((eachSprite) => {
            eachSprite.draw();
        });
        

        // * 4. Recursion (requestAnimationFrame)
        // Only run this if isGameOn is true:
        if (this.isGameOn === true) {
            requestAnimationFrame(this.gameLoop); // 60 times per second (fps of the monitor) it calls gameLoop()
        }
    };
}
