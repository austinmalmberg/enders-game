class AbstractTile {
  constructor(board, r, c) {
    this.board = board;
    this.r = r;
    this.c = c;
    this.paddingPct = board.paddingPct;
    this.padding = board.paddingPct * board.tilesize;
    this.player = null;
  }

  setMouseHover(hover) { this.hover = hover; }

  getTileCenter() {
    const x = this.c * this.board.tilesize + this.board.tilesize * 0.5;
    const y = this.r * this.board.tilesize + this.board.tilesize * 0.5;

    return [x, y];
  }

  // abstract methods
  handleClick() {  }
  draw() {  }
  setPlayer() {  }
}
