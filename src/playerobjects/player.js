class Player {
  constructor(tile, playerColor='rgb(255, 0, 0)') {
    this.tile = tile;
    this.playerColor = playerColor;

    this.frozen = true;
    this.frozenColor = 'rgba(102, 178, 255, 0.6)';
  }

  getTeam() {
    return this.playerColor;
  }

  draw(color=0) {

    push();

    // draw player
    fill(this.playerColor);
    stroke(this.playerColor);

    const d = this.tile.board.tilesize - this.tile.padding * 2;

    circle(...this.tile.getTileCenter(), d);

    // draw frozen
    if (this.frozen) {

      fill(this.frozenColor);
      stroke(this.frozenColor);

      rectMode(CENTER);

      rect(...this.tile.getTileCenter(), this.tile.board.tilesize, this.tile.board.tilesize);

    }

    pop();
  }
}
