class BaseTile extends AbstractTile {
  constructor(board, pos, team) {
    super(board, pos);

    this.team = team;
  }

  getSpawnLocation() {

    const gameWidth = this.board.game.w;
    const gameHeight = this.board.game.h;

    const tl = this.getTopLeft();
    const br = this.getBottomRight();

    const xOffset = this.board.tilesize.w;
    const yOffset = this.board.tilesize.h;

    if (tl.x == 0)
      return createVector(this.pos.x + xOffset, this.pos.y);

    if (tl.y == 0)
      return createVector(this.pos.x, this.pos.y + yOffset);

    if (br.x == gameWidth) {
      return createVector(this.pos.x - xOffset, this.pos.y);
    }

    if (br.y == gameHeight) {
      return createVector(this.pos.x, this.pos.y - yOffset);
    }

    // if this is caled, we have a problem
    return createVector(0, 0);
  }

  draw() {

    // add team bg color before drawing tile
    push();

    const c = Colors.getP5Notation([...this.team.rgb, 0.3]);

    fill(c);   // alpha = 0.3
    stroke(c);

    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.board.tilesize.w, this.board.tilesize.h);

    pop();
  }

}
