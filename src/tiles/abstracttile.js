class AbstractTile {
  constructor(game, r, c) {
    this.game = game;
    this.r = r;
    this.c = c;
    this.tilesize = game.tilesize;
    this.paddingPct = game.paddingPct;
    this.padding = game.paddingPct * this.tilesize;
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
