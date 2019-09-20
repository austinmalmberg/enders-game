class Vision extends GameObject {
  constructor(pos) {
    super(pos);

    this.rgba = [230, 214, 69, 0.1];

    this.coneSize = 200;
    this.visionCone = createVector(0, 0);
  }

  update() {
    this.visionCone = createVector(mouseX, mouseY).sub(this.pos);
  }

  draw() {

    push();

    fill(Colors.getP5Notation(this.rgba));
    noStroke();

    translate(this.pos.x, this.pos.y);
    rotate(this.visionCone.heading());

    triangle(0, 0, this.coneSize, -this.coneSize / 2, this.coneSize, this.coneSize / 2);

    pop();
  }
}
