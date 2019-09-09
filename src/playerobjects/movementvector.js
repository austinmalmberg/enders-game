/**
 * Displayed as a cone that rotates around a Player tile.
 *
 * User will click the Player tile to display this cone.
 * As the user moves the mouse around the player, the cone will rotate 360 degrees around the Player tile.
 * The user will click again to fix the PlayerVision.
*/
class MovementVector {
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
