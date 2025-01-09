//Game

//Global Variables
let playerImg;

let state;
let best = 0;
let score = 0;

// Control Variables
aPressed = false;
dPressed = false;
wPressed = false;

reset();

//Draw Function
window.addEventListener("load", draw);

function draw() {
  //clear previous frame
  ctx.fillStyle = "rgb(69, 42, 92)";
  ctx.fillRect(0, 0, 1000, 600);

  function draw() {
    if (state == "start") {
      drawStart();
    } else if (state === "gameon") {
      runGame();
    } else if (state === "gameover") {
      drawGameOver();
    }
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

  if (state === "start") {
    state = "gameon";
  }
}

function keyupHandler(event) {
  if (event.code == "KeyA") {
    aPressed = false;
  }

  if (event.code == "KeyD") {
    dPressed = false;
  }
}

