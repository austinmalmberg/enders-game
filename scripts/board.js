class Board {
  constructor(w, h) {
    this.w = w;
    this.h = h;

    this.rowCount = Math.floor(h / tilesize);
    this.colCount = Math.floor(w / tilesize);

    this.tiles = [];
    this.hoverTile;

    this._initStartingBoard();
  }

  _initStartingBoard() {

    const isEdge = (r, c) => {
      if (r == 0 || r == this.rowCount - 1)
        return true;
      else if (c == 0 || c == this.colCount - 1)
        return true;

      return false;
    }

    const wallAdjacent = (r, c) => {
      if (r == 1 || r == this.rowCount - 2)
        return true;
      else if (c == 1 || c == this.colCount - 2)
        return true;

      return false;
    }

    const isRandomStar = () => {
      return Math.random() < starDensity;
    }

    for (let r = 0; r < this.rowCount; r++) {
      for (let c = 0; c < this.colCount; c++) {

        let t;

        // stars are automatically placed on the edges of the board
        // they are also placed randomly throughout the board *as long as they are not adjacent to the edge*
        if (isEdge(r, c) || !wallAdjacent(r, c) && isRandomStar() )
          t = new ImmovableTile(this, r, c);

        else
          t = new EmptyTile(this, r, c);

        this.tiles.push(t);
      }
    }

  }

  handleClick() {
    const clickedTile = this.getTile(mouseX, mouseY);
    clickedTile.handleClick();
  }

  handleMouseHover() {

    const tile = this.getTile(mouseX, mouseY);

    if (tile != this.hoverTile) {
      if (this.hoverTile)
        this.hoverTile.setMouseHover(false);

      this.hoverTile = this.getTile(mouseX, mouseY);
      this.hoverTile.setMouseHover(true);
    }
  }

  draw(color=155) {
    background(color);

    this.tiles.forEach(tile => tile.draw());
  }

  setTile(r, c, newTile) {
    this.tiles[this.indexOf(r, c)] = newTile;
  }

  getTile(x, y) {
    let r = Math.floor(y / tilesize);
    let c = Math.floor(x / tilesize);

    if (r < 0)
      r = 0;
    else if (r >= this.rowCount)
      r = this.rowCount - 1;

    if (c < 0)
      c = 0;
    else if (c >= this.colCount)
      c = this.colCount - 1;

    return this.tiles[this.indexOf(r, c)];
  }

  indexOf(r, c) {
    return r * this.colCount + c;
  }
}
