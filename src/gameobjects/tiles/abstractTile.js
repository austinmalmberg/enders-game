class AbstractTile extends GameObject {
  constructor(tilesize, x, y) {
    super()

    this.tilesize = tilesize;
    this.x = x;
    this.y = y;
  }

  center() { return [this.x + this.tilesize * 0.5, this.y + this.tilesize * 0.5]; }
  topLeft() { return [this.x, this.y]; }
  topRight() { return [this.x + this.tilesize, this.y]; }
  bottomLeft() { return [this.x, this.y + this.tilesize]; }
  bottomRight() { return [this.x + this.tilesize, this.y + this.tilesize]; }

  // abstract methods
  handleClick() {  }
  handleMouseHover() {  }
  draw() {  }
  setPlayer() {  }
}
