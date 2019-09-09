class ImmovableTile extends AbstractTile {
  constructor(game, r, c) {
    super(game, r, c);
  }

  handleClick() {

    // remove tile
    // if (mouseButton == RIGHT)
      // this.game.setEmptyTile(this.r, this.c);

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
