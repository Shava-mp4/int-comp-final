//Functions
//Set up Graphics content
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 600;

// Player object
let player = {
  x: cnv.width / 2 - 15, // start @ middle of width
  y: cnv.height - 60, // start @ bottom canvas
  xSpeed: 5,
  ySpeed: 0,
  w: 60,
  h: 60,
  onGround: true,
  gravity: 100,
  color: "black",
};

//Draw Start
function drawStart() {
  ctx.fillStyle = "black";
  rect(0, 0, 1000, 600, "fill");

  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("W TO START", 395, 285);

  ctx.font = "25px Consolas";
  ctx.fillText("Press W to jump", 400, 400);
  ctx.fillText("Press A to go forward and D for backwards", 230, 440);
}

//Draw Game
function runGame() {
  gameObjects();
  playerControl();

  //Draw
  gameComponents();
}

//Objects
function gameObjects() {
  for (let i = 0; i < objects.length; i++) {
    ctx.fillStyle = "blue";
    rect(
      objects[i].x,
      objects[i].y,
      objects[i].width,
      objects[i].height,
      "fill"
    );
  }

  for (let i = 0; i < objects.length; i++) {
    objects[i].x -= objects[i].speed;

    if (objects[i].x + objects[i].width < 0) {
      objects[i].x = 1000;
      objects.y = Math.random() * 500 + 100;
    }
  }
}

//Player
function playerControl() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // player control
  if (aPressed) {
    player.x = player.x - player.xSpeed;
  }

  if (dPressed) {
    player.x = player.x + player.xSpeed;
  }

  // player blocked at edges
  if (player.x <= 0) {
    player.x = 0;
  }

  if (player.x + player.w >= cnv.width) {
    player.x = cnv.width - player.w;
  }

  // player jump
  if (wPressed) {
    jump();
  }
}

function drawMainComponents() {
  // Background/environment and score
  ctx.fillStyle = "white";
  rect(800, 0, 200, 100);
}

function checkCollisions() {
  for (let i = 0; i < objects.length; i++) {
    if (
      player.y + player.h > objects[i].y &&
      player.y < player.y + objects[i].height &&
      player.x + player.w > objects[i].x &&
      player.x < player.x + objects[i].width
    ) {
      gameOver();
    }
  }
}

function gameOver() {
  state = "gameover";

  setTimeout(reset, 2000);
  if (score > best) {
    best = score;
  }
}

function drawGameOver() {
  ctx.fillStyle = "black";
  rect(0, 0, 1000, 600);

  // Game Over Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("GAME OVER", 480, 285);
  ctx.font = "30px Consolas";
  ctx.fillText(`SCORE: ${score}`, 490, 265);
  ctx.fillText(`BEST: ${best}`, 490, 245);
}

function reset() {
  state = "start";

  let objects = [];

  for (let i = 0; i < 5; i++) {
    objects.push({
      x: cnv.width + 200 * i,
      y: randomInt(0, cnv.height),
      speed: Math.round(randomInt(2, 12)),
      width: randomInt(40, 90),
      height: randomInt(40, 80),
    });
  }

  score = 0;
}

