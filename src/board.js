class Board {
  constructor(game) {
    this.game = game;

    this.rowCount = 18;
    this.colCount = 24;

    // the index at which to add a base
    this.baseCol = 4;

    this.tilesize = {
      h: game.h / this.rowCount,
      w: game.w / this.colCount
    };

    this.tiles = [];
    this._initTiles();
  }

  _initTiles() {

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
      return r == 0 && c == (this.colCount - 1) - this.baseCol ||
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
        let pos = createVector(c * this.tilesize.w, r * this.tilesize.h);

        if (isBaseCoord(r, c)) {
          t = new BaseTile(this.tilesize, pos, this.game.teams[team++]);
        } else if (isEdge(r, c) || !adjacentWall(r, c) && isRandomStar())
          t = new ImmovableTile(this.tilesize, pos);

        if (t)
          this.tiles.push(t);
      }
    }
  }

  handleClick() {
    for (let tile of this.tiles) {
      if (tile.clicked()) {
        tile.handleClick();
        return;
      }
    }
  }

  draw() {
    this.tiles.forEach(tile => tile.draw());
  }

  getBases() {
    return this.tiles.filter(tile => tile instanceof BaseTile);
  }
}
