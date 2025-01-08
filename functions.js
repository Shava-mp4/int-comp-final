//Functions

//Draw Start
function drawStart() {
  ctx.fillStyle = "black";
  rect(0, 0, 1000, 600);

  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("W TO START", 450, 285);

  ctx.font = "25px Consolas";
  ctx.fillText("Press W to jump", 100, 450);
  ctx.fillText("Press A to go forward and D for backwards", 415, 480);
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

//Player Control
function jump() {
  if (player.onGround) {
    player.y = player.y - player.gravity;
    player.onGround = false;
    player.gravity--;
  } else {
    //player is in mid-jump
    player.y = player.y - player.gravity;
    player.gravity -= 5;

    //check if back on ground
    if (player.y + player.h >= 400) {
      player.y = cnv.height - player.h;
      player.onGround = true;
      player.gravity = 20;
      wPressed = false;
    }
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

  // Player object
  let player = {
    x: cnv.width / 2 - 15, // start @ middle of width
    y: cnv.height - 60, // start @ bottom canvas
    xSpeed: 5,
    ySpeed: 0,
    w: 60,
    h: 60,
    onGround: true,
    gravity: 110,
    color: "black",
  };

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
    if (state === "start") {
      state = "gameon";
    }
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

  // Start Background
  //Draw Player Character
}
