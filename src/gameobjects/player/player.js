class Player extends GameObject {
  constructor(pos, board, team) {
    super(pos);

    this.diameter = Math.min(board.tilesize.w, board.tilesize.h) * 0.6;
    this.team = team;

    this.frozen = false;
    this.frozenColor = [102, 178, 255, 0.6];
  }

  clicked() {
    if (mouseX < this.pos.x - this.diameter * 0.5 || mouseX > this.pos.x + this.diameter * 0.5)
      return false;

    if (mouseY < this.pos.y - this.diameter * 0.5 || mouseY > this.pos.y + this.diameter * 0.5)
      return false;

    return true;
  }

  update() {
    this.pos.x += 1;
  }

  draw() {

    push();

    // draw player
    fill(this.team.rgb);
    stroke(this.team.rgb);

    circle(this.pos.x, this.pos.y, this.diameter);

    // draw if frozen
    if (this.frozen) {

      fill(this.frozenColor);
      stroke(this.frozenColor);

      rectMode(CENTER);

      rect(this.pos.x, this.pos.y, this.diameter, this.diameter);

    }

    pop();
  }
}
