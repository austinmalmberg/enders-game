class ImmovableTile extends AbstractTile {
  constructor(board, r, c) {
    super(board, r, c);
  }

  handleClick() {
    /* DO NOTHING */
  }

  draw() {

    push();

    rectMode(CENTER);
    fill(90);
    stroke(90 / 1.5);

    rect(...this.getTileCenter(), this.board.tilesize, this.board.tilesize);

    pop();
  }
}
