// * GLOBAL VARIABLES

// Get elements from HTML and save them as variables so we can manipulate them:
// Screens:
const startScreen = document.querySelector("#start-screen");
const gameoverScreen = document.querySelector("#gameover-screen");
const winScreen = document.querySelector("#win-screen");
const thankYouScreen = document.querySelector("#thankyou-screen");
// Buttons:
const startMainGameBtn = document.querySelector("#start-main-game-btn");
const gameoverRestartBtn = document.querySelector("#game-over-restart-btn");
const backToStartBtn = document.querySelector("#back-to-start-btn");
const exitBtn = document.querySelector("#exit-btn");
const startOffroadBtn = document.querySelector("#start-offroad-btn");
// Canvas:
const canvas = document.querySelector("#main-canvas");
// ? const canvasOffroad = document.querySelector("#offroad-canvas");

// Create the canvas variables:
const ctx = canvas.getContext("2d");
// ? const ctxOffroad = canvasOffroad.getContext("2d");

// Create a general game object (to be accessed by other functions, event listeners, etc..):
let mainGameObj;
// ? let offroadGameObj;


// * STATE MANAGEMENT FUNCTIONS

// Create a function to start the main game:
const startMainGame = () => {
    console.log("Starting main game!");
    // * 1. Change the game screens:
    startScreen.style.display = "none";
    canvas.style.display = "block";

    // * 2. Create game elements:
    mainGameObj = new MainGame();
    console.log(mainGameObj);

    // * 3. Start the game loop (recursion):
    // Access the method from the new obejct:
    mainGameObj.gameLoop()
;
}

// ? const startOffroadGame = () => {
//     console.log("Starting offroad game!");
//     // * 1. Change the game screens:
//     winScreen.style.display = "none";
//     canvasOffroad.style.display = "block";

//     // * 2. Create game elements:
//     offroadGameObj = new OffroadGame();
//     console.log(offroadGameObj);

//     // * 3. Start the game loop (recursion):
//     // Access the method from the new obejct:
//     offroadGameObj.gameLoop();
// }

// ? startOffroadGame(); // ! Must be inside an event listener! will run before OffroadGame is created.

// * ADD EVENT LISTENERS

// Create an event listener fot the startMainGameBtn to execute startMainGame function:
startMainGameBtn.addEventListener("click", startMainGame);

// Create an event listener fot the startOffroadGameBtn to execute startOffroadGame function:
// startOffroadBtn.addEventListener("click", startOffroadGame);

// Let's create an event listener to control the rider:
window.addEventListener("keydown", (event) => {
    // Note the "event" as an parameter of the function, so we can access its properties (like the key code, etc). This should run only if the object is created.
    // Note how we access the new game object and its rider object and its methods moveLeft and moveRight.
    if (mainGameObj !== undefined) {
        if (event.key === "ArrowLeft") {
            console.log("moving left");
            mainGameObj.straightLine = "left";
            mainGameObj.rider.moveLeft();
            
        } else if (event.key === "ArrowRight") {
            console.log("moving right");
            mainGameObj.straightLine = "right";
            mainGameObj.rider.moveRight();
        }
    }
})