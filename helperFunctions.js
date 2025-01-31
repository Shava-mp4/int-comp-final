function randomInt(n, m) {
  return Math.floor(Math.random() * (m - n) + n);
}

function randomDec(n, m) {
  return Math.random() * (m - n) + n;
}

function rect(x, y, w, h, mode) {
  if (mode === "fill") {
    ctx.fillRect(x, y, w, h);
  } else if (mode === "stroke") {
    ctx.strokeRect(x, y, w, h);
  }
}

// Draw a line segment from (x1, y1) to (x2, y2)
function line(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1); // Endpoint 1
  ctx.lineTo(x2, y2); // Endpoint 2
  ctx.stroke();
}

// Draw a stroke or fill circle with center (x,y) and radius of r
function circle(x, y, r, mode) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  if (mode === "fill") {
    ctx.fill();
  } else if (mode === "stroke") {
    ctx.stroke();
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
    player.gravity--;

    //check if back on ground
    if (player.y + player.h >= 550) {
      player.y = cnv.height - player.h - 50;
      player.onGround = true;
      player.gravity = 20;
      wPressed = false;
    }
  }
}
