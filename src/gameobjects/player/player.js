class Player extends MoveableGameObject {
  constructor(pos, board, team) {
    this.maxDv = 3;

    super(pos);

    this.radius = Math.min(board.tilesize.w, board.tilesize.h) * 0.6 * 0.5;
    this.team = team;

    this.frozen = false;
    this.frozenColor = [102, 178, 255, 0.6];
  }

  moveTo(x, y) {
    const fr = getFrameRate();
  }

  clicked() {
    return dist(mouseX, mouseY, this.pos.x, this.pos.y) <= this.radius;
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
