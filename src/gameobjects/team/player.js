class Player extends MoveableGameObject {
  constructor(pos, radius, rgb) {
    super(pos, /* max velocity = */ 4);

    this.radius = radius;
    this.rgb = rgb;

    this.frozen = false;
    this.frozenRGBa = [52, 128, 255, 0.6];

    this.vision = new Vision(this.pos);
  }

  clicked() {
    return dist(mouseX, mouseY, this.pos.x, this.pos.y) <= this.radius;
  }

  handleClick() {

    if (!this.frozen)
      this.moveTo(mouseX, mouseY);
  }

  update() {

    if (this.vision)
      this.vision.update();

    super.update();
  }

  draw() {

    if (this.vision)
      this.vision.draw();

    push();

    // draw player
    fill(this.rgb);
    stroke(this.rgb);

    circle(this.pos.x, this.pos.y, this.radius * 2);

    // draw frozen indicator
    if (this.frozen) {

      fill(Colors.getP5Notation(this.frozenRGBa));
      stroke(this.frozenRGBa.slice(0, 3));

      rectMode(CENTER);
      rect(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);

    }

    pop();
  }

  setFrozen(frozen) {
    this.frozen = frozen;
    this.vision = null;
  }

  getVision() {
    return this.vision;
  }
}
