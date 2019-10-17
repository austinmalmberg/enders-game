// TODO: 2 teams of 6

// TODO: Velocity - for moving between unconnected objects

// TODO: Shooting
// TODO: Shooting attributes (rate of fire, vision cone / accuracy)

let game, canvas;
const dims = {
  w: 960,
  h: 720
};
const FRAMERATE = 30;

/* P5 FUNCTIONS */

function setup() {

  frameRate(FRAMERATE);

  game = new Game();

  canvas = createCanvas(dims.w, dims.h);
  canvas.mousePressed(handleClick);
  canvas.mouseMoved(handleMouseHover);

  canvas.parent('canvas-container');

  // disable the right click menu within the canvas
  canvas.canvas.oncontextmenu = () => false;
}

function draw() {
  game.update();
  game.draw();
}

/* MY FUNCTIONS */

function handleClick() {
  game.handleClick();
}

function handleMouseHover() {
  game.handleMouseHover();
}
