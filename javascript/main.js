// * GLOBAL VARIABLES

// Get elements from HTML and save them as variables so we can manipulate them:
// Screens:
const startScreen = document.querySelector("#start-screen");
const gameoverScreen = document.querySelector("#gameover-screen");
const winScreen = document.querySelector("#win-screen");
const offroadWinScreen = document.querySelector("#offroad-win-screen");
const thankyouScreen = document.querySelector("#thankyou-screen");
// Buttons:
const startMainGameBtn = document.querySelector("#start-main-game-btn");
const gameoverRestartBtn = document.querySelector("#game-over-restart-btn");
const backToStartBtn = document.querySelector("#back-to-start-btn");
const exitBtn = document.querySelector("#exit-btn");
const startOffroadBtn = document.querySelector("#start-offroad-btn");
const gameoverStartOffroadBtn = document.querySelector("#game-over-offroad-btn");
const offroadExitBtn = document.querySelector("#offroad-exit-btn");
const thankyouExitBtn = document.querySelector("#thankyou-exit-btn");
const gameoverExitBtn = document.querySelector("#game-over-exit");
const offroadAgainBtn = document.querySelector("#back-to-offroad-btn");
const pauseBtn = document.querySelector("#pause-btn");
const playBtn = document.querySelector("#play-btn");
// Scores:
const scoreDOM = document.querySelector("#score");
const offroadScoreDOM = document.querySelector("#offroad-score");

// Canvas:
const canvas = document.querySelector("#main-canvas");
// Note that we will use the same canvas for both roads (normal and offroad).

// Create the canvas variables:
const ctx = canvas.getContext("2d");

// Create a general game object (to be accessed by other functions, event listeners, etc..):
let mainGameObj;

// * STATE MANAGEMENT FUNCTIONS

// Create a function to start the main game:
// Note the functions parameter that will come from the event listeners, and will render either the normal or the off road.
const startMainGame = (isNormalGame) => {
    // console.log("Starting the game!"); // * TEST
    // * 1. Change the game screens:
    winScreen.style.display = "none";
    startScreen.style.display = "none";
    gameoverScreen.style.display = "none";
    canvas.style.display = "block";
    pauseBtn.style.display = "inline-block";
    offroadWinScreen.style.display = "none";

    // * 2. Create game elements:
    // If isNormalGame, we will send "true" as an argument to create the new object:
    if (isNormalGame) {
        mainGameObj = new MainGame(true);
    } else {
        mainGameObj = new MainGame(false);
    }
    // console.log(mainGameObj); //* TEST

    // * 3. Start the game loop (recursion):
    // Access the method from the new obejct:
    mainGameObj.gameLoop();
};

// Create a function to be called by the keydown event listener and change the rider's direction:
const changeRidersDirKeyDown = (event) => {
    // Note the "event" as an parameter of the function, so we can access its properties (like the key code, etc). This should run only if the object is created.
    // Note how we access the new game object and its rider object and its methods:
    if (mainGameObj !== undefined) {
        // When pressing the keys, this will change the boolean values of the Rider's object riderDirectionObj to true:
        if (event.code === "ArrowLeft") {
            // console.log("moving left"); //* TEST
            mainGameObj.rider.riderDirectionObj.left = true;
        }
        if (event.code === "ArrowRight") {
            mainGameObj.rider.riderDirectionObj.right = true;
        }
        if (event.code === "ArrowUp") {
            // console.log("moving up"); //* TEST
            mainGameObj.rider.riderDirectionObj.up = true;
        }
        if (event.code === "ArrowDown") {
            mainGameObj.rider.riderDirectionObj.down = true;
        }
    }
};
// Now we create the function for when we key up:
const changeRidersDirKeyUp = (event) => {
    // This has the same logic as changeRidersDirKeyDown but turns the boolean values false:
    if (mainGameObj !== undefined) {
        // When releasing the keys, this will change the boolean values of the Rider's object riderDirectionObj to false:
        if (event.code === "ArrowLeft") {
            mainGameObj.rider.riderDirectionObj.left = false;
        }
        if (event.code === "ArrowRight") {
            mainGameObj.rider.riderDirectionObj.right = false;
        }
        if (event.code === "ArrowUp") {
            mainGameObj.rider.riderDirectionObj.up = false;
        }
        if (event.code === "ArrowDown") {
            mainGameObj.rider.riderDirectionObj.down = false;
        }
    }
};

// * ADD EVENT LISTENERS

// Create an event listener fot the startMainGameBtn to execute startMainGame function:
startMainGameBtn.addEventListener("click", () => {
    startMainGame(true);
});
// Note the boolean argument sent in the function, so we can render the normal road or the offroad set.
// Create an event listener fot the startOffroadGameBtn to execute startOffroadGame function:
startOffroadBtn.addEventListener("click", () => {
    console.log("Going off road");
    startMainGame(false);
});
// We can also create an event listener to reset the game on the game over section:
gameoverRestartBtn.addEventListener("click", () => {
    console.log("Game restarted after gameover");
    startMainGame(true);
});
// And one if the player wants to play again:
backToStartBtn.addEventListener("click", () => {
    console.log("Game restarted after arriving in France");
    startMainGame(true);
});
// And also another event in case it's gameover and the player wants to go offroad:
gameoverStartOffroadBtn.addEventListener("click", () => {
    console.log("Going offroad after gameover");
    startMainGame(false);
});

// Let's create an event listener for the pause button:
pauseBtn.addEventListener("click", () => {
    if(mainGameObj !== undefined && mainGameObj.isGameOn === true) {
        mainGameObj.isGameOn = false;
        playBtn.style.display = "inline-block";
        pauseBtn.style.display = "none";
    }
})

// Let's create an event listener for the play button:
playBtn.addEventListener("click", () => {
        mainGameObj.isGameOn = true;
        // We need to call again the gameLoop when pressing the play button, not only change the value of isGameOn:
        mainGameObj.gameLoop();
        pauseBtn.style.display = "inline-block";
        playBtn.style.display = "none";
})

// If the player presses the "Exit" button, it will go back to the first screen of the game:
exitBtn.addEventListener("click", () => {
    winScreen.style.display = "none";
    startScreen.style.display = "flex";
})

// If the player presses the "Exit" button after winning the offroad track, it will show the thankyouScreen:
offroadExitBtn.addEventListener("click", () => {
    offroadWinScreen.style.display = "none";
    thankyouScreen.style.display = "flex";
})

// In case the player wants to play the off-road track again:
offroadAgainBtn.addEventListener("click", () => {
    startMainGame(false);
})

// Let's create an event listener in case the player looses and wants to exit the gameoverScreen:
gameoverExitBtn.addEventListener("click", () => {
    gameoverScreen.style.display = "none";
    startScreen.style.display = "flex";
})

// Let's create an event listener for when the player wants to exit the thankyouScreen:
thankyouExitBtn.addEventListener("click", () => {
    thankyouScreen.style.display = "none";
    startScreen.style.display = "flex";
})

// Let's create a keydown event listener to control the rider, it will call the changeRidersDirection function:
window.addEventListener("keydown", (event) => {
    // console.log(event); // * TEST
    changeRidersDirKeyDown(event);
});
// Let's also add a keyup event listener that calls the same function. This improves the rider's movement:
window.addEventListener("keyup", (event) => {
    changeRidersDirKeyUp(event);
});
