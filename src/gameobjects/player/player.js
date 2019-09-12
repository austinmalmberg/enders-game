class Player {
  constructor(diameter, team) {
    this.team = team;
    this.diameter = diameter;

    this.frozen = false;
    this.frozenColor = [102, 178, 255, 0.6];
  }

  update() {
    
  }

  draw() {

    push();

    // draw player
    fill(this.team.rgb);
    stroke(this.team.rgb);

    circle(200, 200, this.diameter);

    // draw if frozen
    if (this.frozen) {

      fill(this.frozenColor);
      stroke(this.frozenColor);

      rectMode(CENTER);

      rect(200, 200, this.diameter, this.diameter);

    }

    pop();
  }
}
