class Board {
  constructor(game) {
    this.scale = 8;

    this.rowCount = this.scale * 3;
    this.colCount = this.scale * 4;

    // the index at which to add a base
    this.baseCol = 4;

    this.w = game.w;
    this.h = game.h;

    this.tilesize = game.tilesize;

    this.starDensity = game.starDensity;

    this.tiles = [];
    this.playerRadius = game.playerRadius;

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
      return Math.random() < this.starDensity;
    };

    const halfTile = createVector(this.tilesize * 0.5, this.tilesize * 0.5);

    // Immovable tiles are placed on edges as walls, and randomly throughout board aka "stars"
    for (let r = 0; r < this.rowCount; r++) {
      for (let c = 0; c < this.colCount; c++) {

        const pos = createVector(c * this.tilesize, r * this.tilesize).add(halfTile);
        let t;

        if (isBaseCoord(r, c)) {
          t = new BaseTile(this, pos);
        } else if (isEdge(r, c) || !adjacentWall(r, c) && isRandomStar())
          t = new ImmovableTile(this, pos);

        if (t)
          this.tiles.push(t);
      }
    }
  }

  draw() {
    this.tiles.forEach(tile => tile.draw());
  }

  getBases() {
    return this.tiles.filter(tile => tile instanceof BaseTile);
  }

  getTiles() {
    return this.tiles;
  }
}
