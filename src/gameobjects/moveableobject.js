class MoveableGameObject extends GameObject {
  constructor(pos, maxVel) {
    super(pos);

    this.setMaxVelocity(maxVel || 6);
    this.dest = null;
  }

  moveTo(x, y) {
    if (!y)
      this.dest = x;
    else
      this.dest = createVector(x, y);
  }

  setMaxVelocity(vel) {
    this.maxVel = vel;
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

  // overrideable functions
  clicked() {  }
  handleClick() {  }
  handleMouseHover() {  }
  draw() {  }
}
