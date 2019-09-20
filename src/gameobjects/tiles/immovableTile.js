class ImmovableTile extends AbstractTile {
  constructor(board, pos) {
    super(board, pos);
  }

  handleClick() {
    /* DO NOTHING */
  }

  draw() {

    push();

    fill(90);
    noStroke();

    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.tilesize.w, this.tilesize.h);

    pop();
  }
}
