class BaseTile extends AbstractTile {
  constructor(board, pos, team) {
    super(board, pos);

    this.team = team || null;
  }

  setTeam(team) {
    this.team = team;
  }

  getSpawnLocation() {

    const boardWidth = this.board.w;
    const boardHeight = this.board.h;

    const xOffset = this.tilesize.w;
    const yOffset = this.tilesize.h;

    // base is on the top side of the board
    if (this.pos.y <= this.tilesize.h) {
      return createVector(this.pos.x, this.pos.y + yOffset);
    }

    // base is on the bottom of the board
    if (this.pos.y >= boardHeight - this.tilesize.h) {
      return createVector(this.pos.x, this.pos.y - yOffset);
    }

    // base is on the left side of the board
    if (this.pos.x <= this.tilesize.w) {
      return createVector(this.pos.x + xOffset, this.pos.y);
    }

    // base is on the right side of the board
    if (this.pos.x >= boardWidth - this.tilesize.w) {
      return createVector(this.pos.x - xOffset, this.pos.y);
    }

    // if this is caled, we have a problem
    return createVector(0, 0);
  }

  draw() {

    // add team bg color before drawing tile
    push();

    const c = this.team ? Colors.getP5Notation([...this.team.rgb, 0.3]) : 0; // alpha = 0.3

    fill(c);
    stroke(c);

    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.board.tilesize.w, this.board.tilesize.h);

    pop();
  }

}
