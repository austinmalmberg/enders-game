class Board {
  constructor(game) {
    this.game = game;

    this.rowCount = 18;
    this.colCount = 24;

    this.baseCol = 4;

    this.tilesize = game.h / this.rowCount;

    this.paddingPct = 0.2;

    this.tiles = [];

    this.teamRGBs = game.teamRGBs.slice(0, this.numTeams);  // redundant; Turn class stores this information
    this.turn = new Turn(this.teamRGBs);
    this.activePlayers = [];

    this.mode = 'place';

    this._initBoard();
    this._initPlayers();
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

        if (isBaseCoord(r, c)) {
          t = new BaseTile(this, r, c, this.teamRGBs[team++]);

        } else if (isEdge(r, c) || !adjacentWall(r, c) && isRandomStar()) {
          t = new ImmovableTile(this, r, c);

        } else {
          t = new OpenTile(this, r, c);

        }

        this.tiles.push(t);
      }
    }
  }

  _initPlayers() {

  }

  handleClick() {
    const clickedTile = this.getTile(mouseX, mouseY);

    if (this.mode === 'place') {

      if (clickedTile instanceof OpenTile) {

        if (mouseButton === LEFT && !clickedTile.player) {
          const player = new Player(this, clickedTile, this.turn.get());

          this.activePlayers.push(player);
          clickedTile.setPlayer(player);

        } else if (mouseButton === RIGHT && clickedTile.player) {
          this.activePlayers = this.activePlayers.filter(p => p != clickedTile.player);
          clickedTile.setPlayer(null);
        }

      }

      if (this.activePlayers.length === this.game.numTeams * this.game.membersPerTeam) {
        this.mode = 'play';

      } else if (this.activePlayers.length % this.game.membersPerTeam === 0) {
        this.turn.next();
        
      }
    }
  }

  getActivePlayers(teamRGB) {
    if (!teamRGB)
      return this.activePlayers;

    return this.activePlayer.filter(p => p.teamRGB == teamRGB);
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

  draw() {
    this.tiles.forEach(tile => tile.draw());
  }

  setTile(r, c, newTile) {
    this.tiles[this._indexOf(r, c)] = newTile;
  }

  setImmovableTile(r, c) {
    this.setTile(r, c, new ImmovableTile(this, r, c));
  }

  setOpenTile(r, c) {
    this.setTile(r, c, new OpenTile(this, r, c));
  }

  getTile(x, y) {
    let r = Math.floor(y / this.tilesize);
    let c = Math.floor(x / this.tilesize);

    // corrects errors that occur for mouse movements near the canvas bounds
    if (r < 0)
      r = 0;
    else if (r >= this.rowCount)
      r = this.rowCount - 1;

    if (c < 0)
      c = 0;
    else if (c >= this.colCount)
      c = this.colCount - 1;

    return this.tiles[this._indexOf(r, c)];
  }

  _indexOf(r, c) {
    return r * this.colCount + c;
  }
}
