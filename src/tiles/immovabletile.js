class ImmovableTile extends AbstractTile {
  constructor(board, r, c) {
    super(board, r, c);
  }

  handleClick() {
    /* DO NOTHING */
  }

  draw(color=90) {

    push();

    rectMode(CENTER);
    fill(color);
    stroke(color / 1.5);

    rect(...this.getTileCenter(), this.board.tilesize, this.board.tilesize);

    pop();
  }
}
