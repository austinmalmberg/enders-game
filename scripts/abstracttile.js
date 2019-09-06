class AbstractTile {
  constructor(board, r, c) {
    this.board = board;
    this.r = r;
    this.c = c;
    this.tilesize = tilesize;
    this.paddingPct = paddingPct;
    this.padding = paddingPct * tilesize;
  }

  setMouseHover(hover) { this.hover = hover; }
  getTileCenter() {
    const x = this.c * this.tilesize + this.tilesize * 0.5;
    const y = this.r * this.tilesize + this.tilesize * 0.5;

    return [x, y];
  }

  // abstract methods
  handleClick() {  }
  draw() {  }
}
