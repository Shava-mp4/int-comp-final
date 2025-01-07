//Functions
//Set up Graphics content
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 600;

//Draw start screen

//Check collisions

//Player Controll
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
    if (player.y + player.h >= 400) {
      player.y = cnv.height - player.h;
      player.onGround = true;
      player.gravity = 20;
      wPressed = false;
    }
  }
}

// Control Variables
aPressed = false;
dPressed = false;
wPressed = false;
let score = 0;

// Player object
let player = {
  x: cnv.width / 2 - 15, // start @ middle of width
  y: cnv.height - 30, // start @ bottom canvas
  xSpeed: 5,
  ySpeed: 0,
  w: 30,
  h: 30,
  onGround: true,
  gravity: 20,
};

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
}

function keyupHandler(event) {
  if (event.code == "KeyA") {
    aPressed = false;
  }

  if (event.code == "KeyD") {
    dPressed = false;
  }
}

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

//Draw Objects

//Draw Platforms

//Start Screen
function drawMainComponents() {
  // Start Background
  //Draw Player Character
}
