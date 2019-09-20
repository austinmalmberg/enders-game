/**
 * Takes a tilesize and position (vector)
 * Position is the center of the tile
*/

class AbstractTile extends GameObject {
  constructor(board, pos) {
    super(p5.Vector.add(pos, createVector(board.tilesize.w * 0.5, board.tilesize.h * 0.5)));

    this.board = board;
  }

  clicked() {
    const topLeft = this.getTopLeft();
    const bottomRight = this.getTopLeft();

    if (mouseX < topLeft.x || mouseX > bottomRight.x)
      return false;

    if (mouseY < topLeft.y || mouseY > bottomRight.y)
      return false;

    return true;
  }

  getTopLeft() {
    return createVector(this.pos.x - this.board.tilesize.w * 0.5, this.pos.y - this.board.tilesize.h * 0.5);
  }

  getTopRight() {
    return createVector(this.pos.x + this.board.tilesize.w * 0.5, this.pos.y - this.board.tilesize.h * 0.5);
  }
  getBottomLeft() {
    return createVector(this.pos.x - this.board.tilesize.w * 0.5, this.pos.y + this.board.tilesize.h * 0.5);
  }
  getBottomRight() {
    return createVector(this.pos.x + this.board.tilesize.w * 0.5, this.pos.y + this.board.tilesize.h * 0.5);
  }
  getCenter() {
    return createVector(this.pos.x, this.pos.y);
  }

  // abstract methods
  draw() {  }
}
