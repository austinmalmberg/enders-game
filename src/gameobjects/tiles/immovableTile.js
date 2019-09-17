class ImmovableTile extends AbstractTile {
  constructor(tilesize, pos) {
    super(tilesize, pos);
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

    rect(this.center.x, this.center.y, this.tilesize.w, this.tilesize.h);

    pop();
  }
}
