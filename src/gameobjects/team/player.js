class Player extends MoveableGameObject {
  constructor(pos, radius, team) {
    super(pos, /* max velocity = */ 4);

    this.radius = radius;
    this.team = team;

    this.frozen = false;
    this.frozenColor = [102, 178, 255, 0.6];
  }

  clicked() {
    return dist(mouseX, mouseY, this.pos.x, this.pos.y) <= this.radius;
  }

  handleClick() {
    if (!this.frozen)
      this.moveTo(mouseX, mouseY);
  }

  draw() {

    push();

    // draw player
    fill(this.team.rgb);
    stroke(this.team.rgb);

    circle(this.pos.x, this.pos.y, this.radius * 2);

    // draw if frozen
    if (this.frozen) {

      fill(this.frozenColor);
      stroke(this.frozenColor);

      rectMode(CENTER);

      rect(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);

    }

    pop();
  }
}
