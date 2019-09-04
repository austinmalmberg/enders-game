// TODO: 2 teams of 6

// TODO: Velocity - for moving between unconnected objects

// TODO: Shooting
// TODO: Shooting attributes (rate of fire, vision cone / accuracy)

let canvas, board;
const w = 960, h = 720;

// board variables
const tilesize = 40, paddingPct = 0.2;

/* P5 FUNCTIONS */

function setup() {

  canvas = createCanvas(w, h);
  canvas.mousePressed(handleClick);

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

/* END MAIN FUNCTIONS */


class Board {
  constructor(w, h) {
    this.w = w;
    this.h = h;

    this.tiles = [];

    const rows = Math.floor(h / tilesize);
    const cols = Math.floor(w / tilesize);

    // initialize empty tiles
    for (let r = 0; r < rows; r++) {
      const row = [...Array(cols).keys()].map(c => new EmptyTile(r, c));
      this.tiles.push(row);
    }

  }

  handleClick() {
    let r = Math.floor(mouseY / tilesize);
    let c = Math.floor(mouseX / tilesize);

    let clickedTile = this.tiles[r][c];

    // place player on empty tile on left click
    if (clickedTile instanceof EmptyTile && mouseButton == LEFT) {

      this.tiles[r][c] = new Player(r, c);

    } else if (clickedTile instanceof EmptyTile && mouseButton == RIGHT) {

      this.tiles[r][c] = new ImmovableObject(r, c);

    } else if (!(clickedTile instanceof EmptyTile) && mouseButton == RIGHT) {

        this.tiles[r][c] = new EmptyTile(r, c);

    }

  }

  draw() {
    background(155);

    for (let row of this.tiles) {
      row.forEach(tile => tile.draw());
    }
  }

  getTile(x, y) {
    let r = Math.floor(y / tilesize);
    let c = Math.floor(x / tilesize);

    return this.tiles[r][c];
  }
}

class BoardObject {
  constructor(r, c) {
    this.r = r;
    this.c = c;
    this.tilesize = tilesize;
    this.paddingPct = paddingPct;
    this.padding = paddingPct * tilesize;
  }

  handleClick() { }
  draw() { }
  onHover() { }
}

class EmptyTile extends BoardObject {
  constructor(r, c) {
    super(r, c);
  }

  draw(color=255) {
    stroke(color);

    let lineLength = this.padding * 0.5;

    let topLeftX = this.c * this.tilesize + this.padding;
    let topRightX = (1 + this.c) * this.tilesize - this.padding;

    let topY = this.r * this.tilesize + this.padding;

    let botLeftX = this.c * this.tilesize + this.padding;
    let botRightX = (1 + this.c) * this.tilesize - this.padding;;

    let botY = (1 + this.r) * this.tilesize - this.padding;

    // draw vertex in top left
    line(topLeftX, topY, topLeftX, topY + lineLength);
    line(topLeftX, topY, topLeftX + lineLength, topY);

    // draw vertex in top right
    line(topRightX, topY, topRightX, topY + lineLength);
    line(topRightX, topY, topRightX - lineLength, topY);

    // draw vertex in bottom left
    line(botLeftX, botY, botLeftX, botY - lineLength);
    line(botLeftX, botY, botLeftX + lineLength, botY);

    // draw vertex in bottom right
    line(botRightX, botY, botRightX, botY - lineLength);
    line(botRightX, botY, botRightX - lineLength, botY);
  }

}

class Player extends BoardObject {
  constructor(r, c) {
    super(r, c);
  }

  draw(color='rgb(255, 0, 0)') {
    rectMode(CENTER);
    fill(color);
    stroke(color);

    // get tile center
    let centerX = this.c * this.tilesize + this.tilesize / 2;
    let centerY = this.r * this.tilesize + this.tilesize / 2;

    // let actualSize = this.tilesize - this.padding * 2;
    let d = this.tilesize - this.padding * 2;

    circle(centerX, centerY, d);
  }

}

class ImmovableObject extends BoardObject {
  constructor(r, c) {
    super(r, c);
  }

  draw(color=50) {
    rectMode(CENTER);
    fill(color);
    stroke(color * 2);

    // get tile center
    let centerX = this.c * this.tilesize + this.tilesize / 2;
    let centerY = this.r * this.tilesize + this.tilesize / 2;

    rect(centerX, centerY, this.tilesize, this.tilesize);
  }
}
