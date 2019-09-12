class AbstractTile extends GameObject {
  constructor(tilesize, x, y) {
    super()

    this.tilesize = tilesize;
    this.x = x;
    this.y = y;
  }

  center() { return [this.x + this.tilesize.w * 0.5, this.y + this.tilesize.h * 0.5]; }
  topLeft() { return [this.x, this.y]; }
  topRight() { return [this.x + this.tilesize.w, this.y]; }
  bottomLeft() { return [this.x, this.y + this.tilesize.h]; }
  bottomRight() { return [this.x + this.tilesize.w, this.y + this.tilesize.h]; }

  // abstract methods
  handleClick() {  }
  handleMouseHover() {  }
  draw() {  }
  setPlayer() {  }
}
