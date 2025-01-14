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
    x: cnv.width + 250 * i,
    y: randomInt(0, 450),
    width: randomInt(60, 75),
    height: 60,
    speed: 7,
  });
}

let obstacles = [];

for (let i = 0; i < 3; i++) {
  obstacles.push({
    x: cnv.width + 350 * i,
    y: randomInt(350, 500),
    speed: 3,
    width: 100,
    height: 80,
  });
}

// let platforms = [];

// for (let i = 0; i < 3; i++) {
//   platforms.push({
//     x: cnv.width + 250 * i,
//     x2: cnv.width + 250 * i + randomInt(10, 50),
//     y: randomInt(250, 350),
//     speed: 4,
//     lineWidth: randomInt(40, 90),
//   });
// }

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
  score++;
}

//Objects
function gameObjects() {
  for (let i = 0; i < objects.length; i++) {
    ctx.fillStyle = "rgb(252, 192, 209)";
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
      objects[i].y = randomInt(0, 550);
    }
  }

  for (let i = 0; i < obstacles.length; i++) {
    ctx.fillStyle = "rgb(140, 193, 250)";
    rect(
      obstacles[i].x,
      obstacles[i].y,
      obstacles[i].width,
      obstacles[i].height,
      "fill"
    );
  }

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= obstacles[i].speed;

    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles[i].x = 1000;
      obstacles[i].y = randomInt(350, 500);
    }
  }

  // for (let i = 0; i < platforms.length; i++) {
  //   ctx.strokeStyle = "rgb(252, 235, 146)";
  //   ctx.lineWidth = platforms[i].width;
  //   line(
  //     platforms[i].x,
  //     platforms[i].y,
  //     obstacles[i].x2,
  //     obstacles[i].y,
  //     "stroke"
  //   );
  // }

  // for (let i = 0; i < platforms.length; i++) {
  //   platforms[i].x -= platforms[i].speed;

  //   if (platforms[i].x + platforms[i].width < 0) {
  //     platforms[i].x = 1000;
  //     platforms[i].y = Math.random() * 500 + 100;
  //   }
  // }
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
  //clear previous frame
  ctx.fillStyle = "rgb(189, 238, 244)";
  rect(0, 0, 1000, 600, "fill");
  ctx.fillStyle = "rgb(201, 232, 180)";
  rect(0, 550, 1000, 600, "fill");

  ctx.font = "20px Consolas";
  ctx.fillStyle = "darkgreen";
  ctx.fillText(`Score: ${score}`, 20, 580);
}

function checkCollisions() {
  //object collision
  for (let i = 0; i < objects.length; i++) {
    if (
      player.y + player.h > objects[i].y &&
      player.y < player.y + objects[i].height &&
      player.x + player.w > objects[i].x &&
      player.x < player.x + objects[i].width
    ) {
      state = "gameOver";
    }
  }

  //obstacle collision
  for (let i = 0; i < obstacles.length; i++) {
    if (
      player.y + player.h > obstacles[i].y &&
      player.y < player.y + obstacles[i].height &&
      player.x <= obstacles[i].x + obstacles[i].width &&
      player.x >= obstacles[i].x
    ) {
      player.onGround = true;
    }
    if (
      player.x + player.w > obstacles[i].x &&
      player.x < player.x + obstacles[i].width &&
      player.y <= obstacles[i].y + obstacles[i].height &&
      player.y >= obstacles[i].y
    ) {
      player.x -= obstacles[i].speed;
    }

    if (
      player.x >= obstacles[i].x + obstacles[i].width &&
      player.x <= obstacles[i].x
    ) {
      player.x = obstacles.x - player.w;
    }
  }

  if (player.x <= 0) {
    state = "gameOver";
  }
}

function gameOver() {
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
      state = "gameOn";
    }
  }
}
