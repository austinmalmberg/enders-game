class Player {
  constructor(board, tile, teamRGB) {
    this.board = board;
    this.tile = tile;
    this.teamRGB = teamRGB;

    this.frozen = false;
    this.frozenColor = [102, 178, 255, 0.6];
  }

  draw() {

    push();

    // draw player
    fill(this.teamRGB);
    stroke(this.teamRGB);

    const d = this.board.tilesize - this.tile.padding * 2;

    circle(...this.tile.getTileCenter(), d);

    // draw frozen
    if (this.frozen) {

      fill(this.frozenColor);
      stroke(this.frozenColor);

      rectMode(CENTER);

      rect(...this.tile.getTileCenter(), this.board.tilesize, this.board.tilesize);

    }

    pop();
  }
}
