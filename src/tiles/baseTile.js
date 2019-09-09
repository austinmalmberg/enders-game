class BaseTile extends OpenTile {
  constructor(board, r, c, teamRGB) {
    super(board, r, c);

    this.teamRGB = teamRGB;
  }

  draw(color='rgba(255,0,0,0.3)') {

    // remove frozen players to prevent them from impeding win condition
    if (this.player && this.player.frozen)
      this.player = null;

    // add player bg color before drawing tile
    push();

    fill(Colors.getP5Notation([...this.teamRGB, 0.3]));   // alpha = 0.3
    noStroke();

    rectMode(CENTER);
    rect(...this.getTileCenter(), this.board.tilesize, this.board.tilesize);

    pop();

    super.draw();
  }

}
