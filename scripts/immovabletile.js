class ImmovableTile extends AbstractTile {
  constructor(board, r, c) {
    super(board, r, c);
  }

  handleClick() {

    // remove tile
    // if (mouseButton == RIGHT)
      // this.board.setTile(this.r, this.c, new EmptyTile(this.board, this.r, this.c));

  }

  draw(color=90) {

    push();

    rectMode(CENTER);
    fill(color);
    stroke(color / 1.5);

    rect(...this.getTileCenter(), this.tilesize, this.tilesize);

    pop();
  }
}
