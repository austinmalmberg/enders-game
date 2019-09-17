class ImmovableTile extends AbstractTile {
  constructor(tilesize, pos) {
    super(tilesize, pos);
  }

  handleClick() {
    console.log(this);
  }

  draw() {

    push();

    rectMode(CENTER);
    fill(90);
    noStroke();

    const center = this.getCenter();
    rect(center.x, center.y, this.tilesize.w, this.tilesize.h);

    pop();
  }
}
