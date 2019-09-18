class MoveableGameObject extends GameObject {
  constructor(pos, vel) {
    super(pos);

    this.vel = vel || createVector(1.0, 1.0);
  }

  moveTo(x, y) {
    this.dest = createVector(x, y);
    console.log(`move command received`);
  }

  update() {
    if (this.dest && this.pos.x != this.dest.x && this.pos.y != this.dest.y) {
      this.pos.add(this.vel);
    } else {
      this.dest = null;
    }

    console.log(this.dest, this.pos);
  }
}
