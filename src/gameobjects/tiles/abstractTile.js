class AbstractTile extends GameObject {
  constructor(tilesize, pos) {
    super(pos);

    this.tilesize = tilesize;

    this.topLeft = pos;
    this.topRight = createVector(this.pos.x + this.tilesize.w, this.pos.y);
    this.bottomLeft = createVector(this.pos.x, this.pos.y + this.tilesize.h);
    this.bottomRight = createVector(this.pos.x + this.tilesize.w, this.pos.y + this.tilesize.h);

    this.center = createVector(this.pos.x + this.tilesize.w * 0.5, this.pos.y + this.tilesize.h * 0.5);
  }

  clicked() {
    if (mouseX < this.topLeft.x || mouseX > this.topRight.x)
      return false;

    if (mouseY < this.topLeft.y || mouseY > this.bottomLeft.y)
      return false;

    return true;
  }

  // abstract methods
  handleMouseHover() {  }
  draw() {  }
  setPlayer() {  }
}
