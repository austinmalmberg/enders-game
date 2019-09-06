// TODO: 2 teams of 6

// TODO: Velocity - for moving between unconnected objects

// TODO: Shooting
// TODO: Shooting attributes (rate of fire, vision cone / accuracy)

let canvas, board;
const w = 960, h = 720;

// board variables
const tilesize = 40, paddingPct = 0.2;
const starDensity = 0.15;

/* P5 FUNCTIONS */

function setup() {

  canvas = createCanvas(w, h);
  canvas.mousePressed(handleClick);
  canvas.mouseMoved(handleMouseHover);

  board = new Board(w, h);

  canvas.parent('canvas-container');

  // disable the right click menu when pressed within the canvas
  canvas.canvas.oncontextmenu = () => false;
}

function draw() {
  board.draw();
}

function handleClick() {
  board.handleClick();
}

function handleMouseHover() {
  board.handleMouseHover();
}
