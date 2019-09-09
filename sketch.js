// TODO: 2 teams of 6

// TODO: Velocity - for moving between unconnected objects

// TODO: Shooting
// TODO: Shooting attributes (rate of fire, vision cone / accuracy)

let game, canvas;
const w = 960, h = 720;

/* P5 FUNCTIONS */

function setup() {

  game = new Game(w, h);

  canvas = createCanvas(w, h);
  canvas.mousePressed(handleClick);
  canvas.mouseMoved(handleMouseHover);

  canvas.parent('canvas-container');

  // disable the right click menu within the canvas
  canvas.canvas.oncontextmenu = () => false;
}

function draw() {
  game.draw();
}

function handleClick() {
  game.handleClick();
}

function handleMouseHover() {
  game.handleMouseHover();
}
