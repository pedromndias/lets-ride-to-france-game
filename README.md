# LET'S RIDE TO FRANCE GAME

## [Play the Game!](https://pedromndias.github.io/lets-ride-to-france-game/)


<img src="https://github.com/pedromndias/lets-ride-to-france-game/blob/main/images/game-poster.png?raw=true" width="500" height="500">

# Description

A fun game where the player needs to avoid traffic on the highway from Barcelona until Toulouse (France). When reaching different cities (Girona and Toulouse) there will be more traffic which makes it more difficult for the motorcycle not to hit cars or road blocks. If we crash, there will be an ambulance taking care of us, so we have a second chance either to try again or to train in a off-road environment. Here the sprites changes and we can not hit the barriers. If all the km are completed, the player wins, showing the score at the end (how many vehicles were avoided). 


# Main Functionalities

- The player can move in any direction, even diagonal, with a smooth movement.
- Cars and other sprites move down on the Y axis but there are road blocks and rocks that are fixed on the road.
- After some Km, we reach different cities, which generates more traffic and it's more difficult to avoid sprites.
- Both the road and off-road level end when the player rides all the Km left on the screen.
- There's a score for both winning a loosing, that represents how many vehicles were avoided.

# Backlog Functionalities

- Add a gas tank functionality where the rider must catch those in order to fill the tank and continue riding.
- Store the score locally on the computer so we can see the maximum score so far.

# Technologies used

- HTML,
- CSS,
- Javascript
- DOM Manipulation,
- JS Canvas
- JS Classes
- JS Audio()
- JS Image()

# States

- Start Screen
- Main Road Screen
- Off-road Screen
- Game Over Screen
- Winning after Main Road Screen
- Winning after Off-road Screen
- Thank You Screen

# Project Structure

## main.js

- startMainGame();
- changeRidersDirKeyDown();
- changeRidersDirKeyUp();
- pauseGameFunction();
- unPauseGameFunction();

## MainGame.js

- MainGame();
  - this.isNormalGame;
  - this.gameAudio;
  - this.crashSound;
  - this.gameoverAudio;
  - this.winningAudio;
  - this.offroadWinningAudio;
  - this.thankyouAudio;
  - this.spriteOutSound;
  - this.carHorn;
  - this.busHorn;
  - this.policeHorn;
  - this.tieFighterSound;
  - this.deloreanSound;
  - this.motorcycleSound;
  - this.roadArr;
  - this.barrierArr;
  - this.background;
  - this.isCarSprite;
  - this.spritesArr;
  - this.rider;
  - this.isGameOn;
  - this.km;
  - this.score;
- roadKeepsMovingDown();
- removeRoadOut();
- showSprites();
- removeSprite();
- showBarriers();
- removeBarrier();
- checkRiderSpriteCollision();
- checkRiderBarrierCollision();
- gameOver();
- drawBackground();
- clearCanvas();
- clearCanvas();
- checkKm();
- drawKm();
- drawScore();
- win();
- offroadWin();
- gameLoop();

## Rider.js

- Rider();
  - this.riderDirectionObj;
  - this.imagesObj;
  - this.imageLeft;
  - this.imageRight;
  - this.imageUp;
  - this.imageCrash;
  - this.hasCrashed;
  - this.x;
  - this.y;
  - this.w;
  - this.h;
  - this.moveSpeed;
- draw();
- moveRider();

## Road.js

- Road();
  - this.img;
  - this.x;
  - this.y;
  - this.w;
  - this.h;
  - this.speed;
- draw();
- move();

## Sprite.js

- Sprite();
  - this.img;
  - this.w;
  - this.h;
  - this.spriteSpeed;
  - this.isXWing;
  - this.isBlock;
  - this.isBus;
  - this.isPoliceCar;
  - this.isTieFighter;
  - this.isDelorean;
  - this.isMotorcycle;
  - this.xWingSound;
- draw();
- move();

## Barrier.js

- Barrier();
  - this.img;
  - this.x;
  - this.y;
  - this.w;
  - this.h;
  - this.speed;
- draw();
- move();

# Extra Links 

### Trello
[Link](https://trello.com/b/rZz0f8sZ/project-1)

### Slides
[Link](www.your-slides-url-here.com)

## Deploy
[Link](https://pedromndias.github.io/lets-ride-to-france-game/)
