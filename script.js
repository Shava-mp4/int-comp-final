//Game

let objects = [];

for (let i = 0; i < 10; i++) {
  objects.push({
    x: randomInt(0, cnv.width),
    y: randomInt(0, cnv.height),
    speed: Math.round(randomInt(2, 15)),
    width: randomInt(40, 90),
    height: randomInt(40, 80),
  });
}

requestAnimationFrame(draw);

function draw() {
  //clear previous frame
  ctx.fillStyle = "rgb(69, 42, 92)";
  ctx.fillRect(0, 0, 1000, 600);

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

  requestAnimationFrame(draw);
}
