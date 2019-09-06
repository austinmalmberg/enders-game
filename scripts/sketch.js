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

/* END MAIN FUNCTIONS */


class Board {
  constructor(w, h) {
    this.w = w;
    this.h = h;

    this.rowCount = Math.floor(h / tilesize);
    this.colCount = Math.floor(w / tilesize);

    this.tiles = [];
    this.hoverTile;

    this._initStartingBoard();
  }

  _initStartingBoard() {

    const isEdge = (r, c) => {
      if (r == 0 || r == this.rowCount - 1)
        return true;
      else if (c == 0 || c == this.colCount - 1)
        return true;

      return false;
    }

    const wallAdjacent = (r, c) => {
      if (r == 1 || r == this.rowCount - 2)
        return true;
      else if (c == 1 || c == this.colCount - 2)
        return true;

      return false;
    }

    const isRandomStar = () => {
      return Math.random() < starDensity;
    }

    for (let r = 0; r < this.rowCount; r++) {
      for (let c = 0; c < this.colCount; c++) {

        let t;

        // stars are automatically placed on the edges of the board
        // they are also placed randomly throughout the board *as long as they are not adjacent to the edge*
        if (isEdge(r, c) || !wallAdjacent(r, c) && isRandomStar() )
          t = new ImmovableObject(this, r, c);

        else
          t = new EmptyTile(this, r, c);

        this.tiles.push(t);
      }
    }

  }

  handleClick() {
    let clickedTile = this.getTile(mouseX, mouseY);
    clickedTile.handleClick();
  }

  handleMouseHover() {

    let hoverTile = this.getTile(mouseX, mouseY);

    if (hoverTile != this.hoverTile) {
      if (this.hoverTile)
        this.hoverTile.setHover(false);

      this.hoverTile = this.getTile(mouseX, mouseY);
      hoverTile.setHover(true);
    }
  }

  draw(color=155) {
    background(color);

    this.tiles.forEach(tile => tile.draw());
  }

  setTile(r, c, newTile) {
    this.tiles[this.indexOf(r, c)] = newTile;
  }

  getTile(x, y) {
    let r = Math.floor(y / tilesize);
    let c = Math.floor(x / tilesize);

    if (r < 0)
      r = 0;
    else if (r >= this.rowCount)
      r = this.rowCount - 1;

    if (c < 0)
      c = 0;
    else if (c >= this.colCount)
      c = this.colCount - 1;

    return this.tiles[this.indexOf(r, c)];
  }

  indexOf(r, c) {
    return r * this.colCount + c;
  }
}

class BoardObject {
  constructor(board, r, c) {
    this.board = board;
    this.r = r;
    this.c = c;
    this.tilesize = tilesize;
    this.paddingPct = paddingPct;
    this.padding = paddingPct * tilesize;
  }

  handleClick() {  }
  setHover(hover) { this.hover = hover; }
  draw() {  }
}

class EmptyTile extends BoardObject {
  constructor(board, r, c) {
    super(board, r, c);
  }

  handleClick() {

    if (mouseButton == LEFT)
      this.board.setTile(this.r, this.c, new Player(this.board, this.r, this.c));

    else if (mouseButton == RIGHT)
      this.board.setTile(this.r, this.c, new ImmovableObject(this.board, this.r, this.c));

  }

  draw(color=255) {

    push();

    if (this.hover) {
      stroke('rgb(255,255,0)');
      strokeWeight(3);

    } else {
      stroke(color);

    }

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

    pop();
  }

}

class Player extends BoardObject {
  constructor(board, r, c, color='rgb(255, 0, 0)') {
    super(board, r, c);

    this.color = color;
  }

  handleClick() {

    if (mouseButton == RIGHT)
      this.board.setTile(this.r, this.c, new EmptyTile(this.board, this.r, this.c));

  }

  draw(color='rgb(255, 0, 0)') {

    push();

    rectMode(CENTER);
    fill(this.color);
    stroke(this.color);

    // get tile center
    let centerX = this.c * this.tilesize + this.tilesize * 0.5;
    let centerY = this.r * this.tilesize + this.tilesize * 0.5;

    // let actualSize = this.tilesize - this.padding * 2;
    let d = this.tilesize - this.padding * 2;

    circle(centerX, centerY, d);

    pop();
  }

}

class ImmovableObject extends BoardObject {
  constructor(board, r, c) {
    super(board, r, c);
  }

  handleClick() {

    // if (mouseButton == RIGHT)
      // this.board.setTile(this.r, this.c, new EmptyTile(this.board, this.r, this.c));

  }

  draw(color=60) {

    push();

    rectMode(CENTER);
    fill(color);
    stroke(color * 1.5);

    // get tile center
    let centerX = this.c * this.tilesize + this.tilesize * 0.5;
    let centerY = this.r * this.tilesize + this.tilesize * 0.5;

    rect(centerX, centerY, this.tilesize, this.tilesize);

    pop();
  }
}
