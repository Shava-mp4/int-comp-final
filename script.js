//Game

//Global Variables
let playerImg = document.createElement("img");
playerImg.src = "img/hachiware-chiikawa-2.png";

let state = "gameOn";
let best = 0;
let score = 0;

// Control Variables
aPressed = false;
dPressed = false;
wPressed = false;
pPressed = false;

//Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state == "gameOn") {
    runGame();
  }
  if (state == "gameOver") {
    gameOver();
  }

  requestAnimationFrame(draw);
}

// Event Handlers
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
  if (event.code == "KeyA") {
    aPressed = true;
  }

  if (event.code == "KeyD") {
    dPressed = true;
  }

  if (event.code == "KeyW") {
    wPressed = true;
  }

  if (event.code == "KeyP") {
    pPressed = true;
  }
}

function keyupHandler(event) {
  if (event.code == "KeyA") {
    aPressed = false;
  }

  if (event.code == "KeyD") {
    dPressed = false;
  }

  if (event.code == "KeyP") {
    pPressed == false;
  }
}
