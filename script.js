function draw() {
  //clear previous frame
  ctx.fillStyle = "rgb(189, 238, 244)";
  rect(0, 0, 1000, 600, "fill");
  ctx.fillStyle = "rgb(201, 232, 180)"
  rect(0, 550, 1000, 600, "fill")

  function draw() {
    runGame();
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

