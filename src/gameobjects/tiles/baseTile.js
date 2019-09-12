class BaseTile extends AbstractTile {
  constructor(tilesize, r, c, team) {
    super(tilesize, r, c);

    this.team = team;
  }

  draw() {

    // add team bg color before drawing tile
    push();

    const c = Colors.getP5Notation([...this.team.rgb, 0.3]);

    fill(c);   // alpha = 0.3
    stroke(c);

    rectMode(CENTER);
    rect(...this.center(), this.tilesize.w, this.tilesize.h);

    pop();

    super.draw();
  }

}
