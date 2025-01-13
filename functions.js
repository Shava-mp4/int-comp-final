//Functions
//Set up Graphics content
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 600;

// Player object
let player = {
  x: cnv.width / 2 - 15, // start @ middle of width
  y: cnv.height - 110, // start @ bottom canvas
  xSpeed: 5,
  ySpeed: 0,
  w: 60,
  h: 60,
  onGround: true,
  gravity: 20,
  color: "black",
};

let objects = [];

for (let i = 0; i < 5; i++) {
  objects.push({
    width: randomInt(40, 90),
    height: randomInt(60, 80),
    x: cnv.width + 200 * i,
    y: randomInt(0, 550),
    speed: 10,
  });
}

let obstacles = [];

for (let i = 0; i < 5; i++) {
  obstacles.push({
    x: cnv.width + 250 * i,
    y: randomInt(450, cnv.height),
    speed: 6,
    width: randomInt(40, 90),
    height: randomInt(40, 80),
  });
}

let platforms = [];

for (let i = 0; i < 3; i++) {
  obstacles.push({
    x: cnv.width + 250 * i,
    x2: (cnv.width + 250 * i) + randomInt(10, 50),
    y: randomInt(200, 400),
    speed: 6,
    lineWidth: randomInt(40, 90),
  });
}

// //Draw Start
// function drawStart() {
//   ctx.fillStyle = "black";
//   rect(0, 0, 1000, 600, "fill");

//   // Start Text
//   ctx.font = "40px Consolas";
//   ctx.fillStyle = "lightblue";
//   ctx.fillText("W TO START", 395, 285);

//   ctx.font = "25px Consolas";
//   ctx.fillText("Press W to jump", 400, 400);
//   ctx.fillText("Press A to go forward and D for backwards", 230, 440);
// }

//Draw Game
function runGame() {
  //Draw
  gameComponents();

  gameObjects();
  playerControl();
  checkCollisions();
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
    if (rectCollide(player, objects[i])) {
      gameOver();
    }
  }

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= obstacles[i].speed;

    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles[i].x = 1000;
      obstacles[i].y = Math.random() * 500 + 100;
    }
    if (rectCollide(player, obstacles[i])) {
      player.x -= obstacles.x
    }
  }

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= obstacles[i].speed;

    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles[i].x = 1000;
      obstacles[i].y = Math.random() * 500 + 100;
    }
    if (rectCollide(player, obstacles[i])) {
      player.x -= obstacles.x
    }
  }

  for (let i = 0; i < platforms.length; i++) {
    platforms[i].x -= platforms[i].speed;

    if (platforms[i].x + platforms[i].width < 0) {
      platforms[i].x = 1000;
      platforms[i].y = Math.random() * 500 + 100;
    }
    if (rectCollide(player, platforms[i])) {
      player.onGround = true
  }
}
}

//Player
function playerControl() {
  ctx.drawImage(playerImg, player.x, player.y);

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

function gameComponents() {
  // Background/environment and score
  // ctx.fillStyle = "white";
  // rect(0, 0, 1000, 600, "fill");
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
  drawGameOver
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

  document.addEventListener("keypress", keyPressHandler);

function keyPressHandler(event) {
  if (event.code == "KeyP") {
    runGame();
  }
}

}
