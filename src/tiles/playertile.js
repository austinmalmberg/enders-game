
class PlayerTile extends AbstractTile {
  constructor(game, r, c, color='rgb(255, 0, 0)') {
    super(game, r, c);

    this.color = color;
    this.pv = null;
  }

  handleClick() {

    if (this.pv && mouseButton == LEFT) {
      this.pv = null;

    } else if (mouseButton == LEFT) {
      this.pv = new MovementVector(this);

    } else if (mouseButton == RIGHT) {
      this.game.setEmptyTile(this.r, this.c);

    }

  }

  draw() {

    // Draw player tile
    push();

    fill(this.color);
    stroke(this.color);

    const d = this.tilesize - this.padding * 2;

    circle(...this.getTileCenter(), d);

    pop();

    if (this.pv)
      this.pv.draw();
  }

}
