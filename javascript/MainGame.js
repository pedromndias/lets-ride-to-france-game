// * Here we create the general class for the main game:
class MainGame {
    // * Add main game's properties (all main game's elements):
    constructor(isNormalGame) {
        // * In this constructor we have all the initial elements and values of the main game.

        // Let's create a variable to decide if the game is normal or offroad:
        this.isNormalGame = isNormalGame;
        // Create a new Road object:
        // This is a different road from the following ones, this is the first road show already when the game starts:
        if (this.isNormalGame) {
            this.firstRoad = new Road(0, true);
        } else {
            this.firstRoad = new Road(0, false);
        }

        // * AUDIO ELEMENTS:
        // Create an audio variable depending on the type of game:
        if (this.isNormalGame) {
            this.gameAudio = new Audio("audio/on-the-road-again.mp3")
        } else {
            this.gameAudio = new Audio("audio/star-wars-cantina-song.mp3")
        }
        this.gameAudio.volume = 0.05;

        // Create sound for crash:
        this.crashSound = new Audio("audio/wilhelm-scream.mp3");
        this.crashSound.volume = 0.05;
        // Create audio for the gameover screen:
        this.gameoverAudio = new Audio("audio/game-over.mp3");
        this.gameoverAudio.volume = 0.05;
        // Create audio for the winning page:
        this.winningAudio = new Audio("audio/french-national-anthem.mp3");
        this.winningAudio.volume = 0.1;
        // Create audio for the offroad winning screen:
        this.offroadWinningAudio = new Audio("audio/the-godfather.mp3");
        this.offroadWinningAudio.volume = 0.05;
        // Create audio for thankyou screen:
        this.thankyouAudio = new Audio("audio/gladiator-song.mp3");
        this.thankyouAudio.volume = 0.05;
        // Create sound for when a sprite moves away from screen (score going up):
        this.spriteOutSound = new Audio("audio/score-up.mp3");
        this.spriteOutSound.volume = 0.05;
        // Create a sound for car horn:
        this.carHorn = new Audio("audio/car-horn-01.mp3");
        this.carHorn.volume = 0.05;
        // Create a sound for the bus horn:
        this.busHorn = new Audio("audio/car-horn-02.mp3");
        this.busHorn.volume = 0.1;
        // Create a sound for the police car horn:
        this.policeHorn = new Audio("audio/police-horn.mp3");
        this.policeHorn.volume = 0.2;
        // Create a sound for the ite-fighte:
        this.tieFighterSound = new Audio("audio/tie-fighter-sound.mp3");
        this.tieFighterSound.volume = 0.1;
        // Create a sound for the Delorean:
        this.deloreanSound = new Audio("audio/delorean-sound.mp3");
        this.deloreanSound.volume = 0.1;

        // Create an array of new road sets:
        this.roadArr = [];

        // Create an empty array in case we are playing offroad:
        if (!this.isNormalGame) {
            this.barrierArr = [];
        }

        // The background:
        this.background = new Image();
        if (this.isNormalGame) {
            this.background.src = "images/cover-sagrada-01.png";
        } else {
            this.background.src = "images/tatooine-05.png";
        }

        // Create a new Sprite Object: //* TEST for one sprite.
        // First we define a variable to define if we want cars/blocks or rocks:
        this.isCarSprite = isNormalGame;

        //  An array to store the multiple sprites:
        this.spritesArr = [];

        // Create a new Rider object:
        this.rider = new Rider();

        // Let's create a variabel to check is the game is on:
        this.isGameOn = true;

        // Create variable to check how many km are left until the finish of the game:
        this.km = 400;
        // Create a variable to check how many cars we have passed:
        this.score = 0;
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
                // Sound horns depending on the new sprite:
                if (newSprite.isBus) {
                    this.busHorn.play();
                } else if (newSprite.isPoliceCar) {
                    this.policeHorn.play();
                }
            } else {
                newSprite = new Sprite("rock");
                // Make sounds depeding on the sprite:
                if (newSprite.isTieFighter) {
                    this.tieFighterSound.play();
                } else if (newSprite.isDelorean) {
                    this.deloreanSound.play();
                }
            }
            // Now we push the new sprite to the sprite's array:
            this.spritesArr.push(newSprite);
        }
    };

    // Like with the roads, we need to remove the sprites after the canvas:
    removeSprite = () => {
        if (this.spritesArr[0].y > canvas.height) {
            this.spritesArr.shift();
            this.score++;
            this.spriteOutSound.play();
        }
    };

    // Let's make a function to show the barriers on the offroad game:
    showBarriers = () => {
        // If the barrierArr is empty or if the last one did reach 0px on the Y axis of the screen, we create a new barrierArr:
        if (
            this.barrierArr.length === 0 ||
            this.barrierArr[this.barrierArr.length - 1].y > 0
        ) {
            let newBarrierLeft = new Barrier("left");
            // And then we push it to the array:
            this.barrierArr.push(newBarrierLeft);
            // And we have to repeat the process for the right barrier:
            let newBarrierRight = new Barrier("right");
            // And then we also push it to the array:
            this.barrierArr.push(newBarrierRight);
        }
    };

    // Like the road and sprites, we should remove the barriers from the array:
    removeBarrier = () => {
        if (this.barrierArr[0].y > canvas.height) {
            this.barrierArr.shift();
        }
    };

    // Let's create a function that checks if the rider collides with a sprite:
    checkRiderSpriteCollision = () => {
        // We will use a forEach to check the collision on each sprite (besides X-Wing):
        this.spritesArr.forEach((eachSprite) => {
            // We can check the collision with a "2D collision detection" system (taken from MDN):

            if (
                this.rider.hasCrashed === false &&
                eachSprite.isXWing === false &&
                eachSprite.x < this.rider.x + this.rider.w &&
                eachSprite.x + eachSprite.w > this.rider.x &&
                eachSprite.y < this.rider.y + this.rider.h &&
                eachSprite.h + eachSprite.y > this.rider.y
            ) {
                // console.log("Collision detected!"); // * TEST
                // Change the rider's image to the crash image:
                this.rider.hasCrashed = true;
                // If there is a collision, we will call gameover:
                
                    this.gameOver();
                
                // Play crash sound:
                this.crashSound.play();
                
            }
        });
    };

    // Let's create a function to check if the rider collides with the barriers on the offroad game:
    checkRiderBarrierCollision = () => {
        this.barrierArr.forEach((eachBarrier) => {
            // We will use the same system as with the barriers:
            if (
                this.rider.hasCrashed === false &&
                eachBarrier.x < this.rider.x + this.rider.w &&
                eachBarrier.x + eachBarrier.w > this.rider.x &&
                eachBarrier.y < this.rider.y + this.rider.h &&
                eachBarrier.h + eachBarrier.y > this.rider.y
            ) {
                // console.log("Collision against a barrier!"); // * TEST
                // Change the rider's image to the crash image:
                this.rider.hasCrashed = true;
                // If there is a collision, we will call gameover:
                
                    this.gameOver();
                // Play crash sound:
                this.crashSound.play();
            }
        });
    };

    // Create a function to end the game:
    gameOver = () => {
        // 1. Stop de game:
        this.isGameOn = false;
        this.busHorn.pause();
        this.policeHorn.pause();
        this.tieFighterSound.pause();
        this.deloreanSound.pause();
        setTimeout(() => {
        {// Stop track music:
        this.gameAudio.pause();
        // Play game over music:
        this.gameoverAudio.play();
        // console.log("Ending game"); //* TEST

        // 2. Hide the canvas:
        canvas.style.display = "none";
        pauseBtn.style.display = "none";
        winScreen.style.display = "none";
        offroadWinScreen.style.display = "none";
        // 3. Show final screen:
        gameoverScreen.style.display = "flex";
        playBtn.style.display = "none";
        pauseBtn.style.display = "none";}
    }, 1000);
    };

    // Create a function to draw the background:
    drawBackground = () => {
        ctx.drawImage(this.background, 0, 0, canvas.width, 200);
    };

    // Create a function to clear the canvas:
    clearCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // Create a function that will decrease the km left:
    decreaseKm = () => {
        this.km = (this.km - 0.1).toFixed(1);
    };

    // Create a function to check the km and call some other functions:
    checkKm = () => {
        // Depending on the km left, we will change the background and accelerate the elements to make it more difficult to reach the end:
        if (this.km < 100) {
            // Riders move speed change:
            this.rider.moveSpeed = 10;
            // Speed of the non-block elements also change:
            this.spritesArr.forEach((eachSprite) => {
                if (!eachSprite.isBlock) {
                    eachSprite.spriteSpeed = 8;
                }
            })
            if (this.isNormalGame) {
                // Background change:
                this.background.src = "images/cover-toulouse-02.png";
            } else {
                // Background change:
                this.background.src = "images/tatooine-03.jpg";
            }
        } else if (this.km < 250) {
            // Riders move speed change:
            this.rider.moveSpeed = 8;
            // Speed of the non-block elements also change:
            this.spritesArr.forEach((eachSprite) => {
                if (!eachSprite.isBlock) {
                    eachSprite.spriteSpeed = 6;
                }
            })
            if (this.isNormalGame) {
                // Background change:
                this.background.src = "images/cover-girona-02.png";
            } else {
                // Background change:
                this.background.src = "images/tatooine-02.jpg";
            }
            
        }
        if (this.km < 0) {
            // console.log("0 Km"); // * TEST
            if (this.isNormalGame) {
                this.win();
            } else {
                this.offroadWin();
            }
        }
    };
    // Create a function that will draw the text on our canvas:
    drawKm = () => {
        let text = `You have ${Math.trunc(this.km)}km left to ride..`;
        ctx.font = "17px Inter";
        ctx.fillText(text, 20, 30);
    };

    // Create a function to draw the score on our canvas:
    drawScore = () => {
        let text = `Score: ${this.score}`;
        ctx.font = "17px Inter";
        ctx.fillText(text, canvas.width - 100, 30);
    };

    // Let's create a functin for when the player reaches the finish (wins):
    win = () => {
        // 1. Stop de game:
        this.isGameOn = false;
        // Stop track music:
        this.gameAudio.pause();
        // Stop the sprites sounds:
        this.busHorn.pause();
        // Play game over music:
        this.winningAudio.play();

        // 2. Hide the canvas:
        canvas.style.display = "none";
        pauseBtn.style.display = "none";
        // 3. Show win screen:
        winScreen.style.display = "block";
        scoreDOM.innerText = this.score;
    };

    // Let's create a function for when the player wins the offroad track:
    offroadWin = () => {
        // 1. Stop de game:
        this.isGameOn = false;
        // Stop track music:
        this.gameAudio.pause();
        // Play game over music:
        this.offroadWinningAudio.play();
        // Stop the sprites sounds:
        this.tieFighterSound.pause();
        this.deloreanSound.pause();
        // 2. Hide the canvas:
        canvas.style.display = "none";
        pauseBtn.style.display = "none";
        // 3. Show win screen:
        offroadWinScreen.style.display = "block";
        offroadScoreDOM.innerText = this.score;
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
        if (!this.isNormalGame) {
            this.barrierArr.forEach((eachBarrier) => {
                eachBarrier.move();
            });
            // Show the barriers:
            this.showBarriers();
            // And remove the barriers from the array:
            this.removeBarrier();
        }

        // Check if there is a collision between the rider and the sprites:
        this.checkRiderSpriteCollision();

        // If it is offroad, let's also check for colisions with the barriers:
        if (!this.isNormalGame) {
            this.checkRiderBarrierCollision();
        }

        // Call the function to decrease the km:
        this.decreaseKm();

        // Call the checkKm function:
        this.checkKm();

        // If the game is not going, we should stop the music:
        if(!this.isGameOn) {
            this.gameAudio.pause();
        }

        // If the game is goin, we should stop the winning and gameover audios:
        if(this.isGameOn) {
            this.gameoverAudio.pause();
            this.gameoverAudio.currentTime = 0;
            this.winningAudio.pause();
            this.winningAudio.currentTime = 0;
        }

        // * 3. Elements' drawing on canvas:
        this.firstRoad.draw();
        this.roadArr.forEach((eachRoad) => {
            eachRoad.draw();
        });
        // If it is offroad, let's show the barriers:
        if (!this.isNormalGame) {
            this.barrierArr.forEach((eachBarrier) => {
                eachBarrier.draw();
            });
        }
        this.drawBackground();

        this.rider.draw();

        this.spritesArr.forEach((eachSprite) => {
            eachSprite.draw();
        });

        this.drawKm();

        this.drawScore();

        // * 4. Recursion (requestAnimationFrame)
        // Only run this if isGameOn is true:
        if (this.isGameOn === true) {
            requestAnimationFrame(this.gameLoop); // 60 times per second (fps of the monitor) it calls gameLoop()
        }
    };
}
