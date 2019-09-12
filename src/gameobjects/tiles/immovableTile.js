class ImmovableTile extends AbstractTile {
  constructor(tilesize, r, c) {
    super(tilesize, r, c);
  }

  handleClick() {
    /* DO NOTHING */
  }

  draw() {

    push();

    rectMode(CENTER);
    fill(90);
    noStroke();

    // if (this.hover)
    //   stroke(255);
    // else
    //   stroke(90 / 1.5);

    rect(...this.center(), this.tilesize.w, this.tilesize.h);

    pop();
  }
}
