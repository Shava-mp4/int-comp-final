//Game
//Set up Graphics content
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 600;

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

