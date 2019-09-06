
class Player extends AbstractTile {
  constructor(board, r, c, color='rgb(255, 0, 0)') {
    super(board, r, c);

    this.color = color;
    this.pv = null;
  }

  handleClick() {

    if (this.pv && mouseButton == LEFT) {
      this.pv = null;

    } else if (mouseButton == LEFT) {
      this.pv = new PlayerVision(this);

    } else if (mouseButton == RIGHT) {
      this.board.setTile(this.r, this.c, new EmptyTile(this.board, this.r, this.c));

    }

  }

  draw(color='rgb(255, 0, 0)') {

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

/**
 * Displayed as a cone that rotates around a Player tile.
 *
 * User will click the Player tile to display this cone.
 * As the user moves the mouse around the player, the cone will rotate 360 degrees around the Player tile.
 * The user will click again to fix the PlayerVision.
*/
class PlayerVision {
  constructor(player) {
    this.player = player;
  }

  draw() {

    push();

    stroke(255);
    strokeWeight(5);

    line(...this.player.getTileCenter(), mouseX, mouseY);

    pop();
  }
}
