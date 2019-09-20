class MoveableGameObject extends GameObject {
  constructor(pos, vel) {
    super(pos);

    this.maxVel = 3;
    this.dest = null;
  }

  moveTo(x, y) {
    this.dest = createVector(x, y);
  }

  update() {
    if (this.dest) {

      let vel = p5.Vector.sub(this.dest, this.pos);
      vel.limit(this.maxVel);

      if (this.dest == this.pos)
        this.dest = null;
      else
        this.pos.add(vel);

    }

  }
}
