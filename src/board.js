class Board {
  constructor(game) {
    this.game = game;

    this.rowCount = 18;
    this.colCount = 24;

    // the number of tiles from the left and right walls
    this.baseCol = 4;

    this.tilesize = {
      h: game.h / this.rowCount,
      w: game.w / this.colCount
    };

    this.tiles = [];

    this._initBoard();
  }

  _initBoard() {

    const isEdge = (r, c) => {
      if (r == 0 || r == this.rowCount - 1)
        return true;
      else if (c == 0 || c == this.colCount - 1)
        return true;

      return false;
    };

    const adjacentWall = (r, c) => {
      if (r <= 1 || r >= this.rowCount - 2)
        return true;
      else if (c <= 1 || c >= this.colCount - 2)
        return true;

      return false;
    };

    const isBaseCoord = (r, c) => {
      return r == 0 && c == this.colCount - 1 - this.baseCol ||
        r == this.rowCount - 1 && c == this.baseCol;
    };

    const isRandomStar = () => {
      return Math.random() < this.game.starDensity;
    };

    let team = 0;

    // Immovable tiles are placed on edges as walls, and randomly throughout board aka "stars"
    for (let r = 0; r < this.rowCount; r++) {
      for (let c = 0; c < this.colCount; c++) {

        let t;

        if (isBaseCoord(r, c))
          t = new BaseTile(this.tilesize, c * this.tilesize.w, r * this.tilesize.h, this.game.teams[team++]);
        else if (isEdge(r, c) || !adjacentWall(r, c) && isRandomStar())
          t = new ImmovableTile(this.tilesize, c * this.tilesize.w, r * this.tilesize.h);

        if (t)
          this.tiles.push(t);
      }
    }
  }

  handleClick() {
    const clickedTile = this.getTile(mouseX, mouseY);

    if (clickedTile)
      clickedTile.handleClick();
  }

  handleMouseHover() {

    const t = this.getTile(mouseX, mouseY);

    if (this.lastHovered)
      this.lastHovered.setMouseHover(false);

    this.lastHovered = t;

    if (this.lastHovered)
      this.lastHovered.setMouseHover(true);
  }

  update() {  }

  draw() {
    this.tiles.forEach(tile => tile.draw());
  }

  getTile(x, y) {
    let r = Math.floor(y / this.tilesize);
    let c = Math.floor(x / this.tilesize);

    // correct errors for mouse movements near the edge of the canvas
    if (r < 0)
      r = 0;
    else if (r >= this.rowCount)
      r = this.rowCount - 1;

    if (c < 0)
      c = 0;
    else if (c >= this.colCount)
      c = this.colCount - 1;

    // return the tile with matching r & c values
    for (let tile of this.tiles) {
      if (tile.r == r && tile.c == c)
        return tile;
    }

    return null;
  }
}
