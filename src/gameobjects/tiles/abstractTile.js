/**
 * Takes a tilesize and position (vector)
 * Position is the top-left corner of the tile
*/

class AbstractTile extends GameObject {
  constructor(tilesize, pos) {
    super(pos);

    this.tilesize = tilesize;
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
    return createVector(this.pos.x, this.pos.y);
  }

  getTopRight() {
    return createVector(this.pos.x + this.tilesize.w, this.pos.y);
  }
  getBottomLeft() {
    return createVector(this.pos.x, this.pos.y + this.tilesize.h);
  }
  getBottomRight() {
    return createVector(this.pos.x + this.tilesize.w, this.pos.y + this.tilesize.h);
  }
  getCenter() {
    return createVector(this.pos.x + this.tilesize.w * 0.5, this.pos.y + this.tilesize.h * 0.5);
  }

  // abstract methods
  draw() {  }
}
