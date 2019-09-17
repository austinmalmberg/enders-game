class MoveableGameObject extends GameObject {
  constructor(pos, initVelocity, maxVelocity) {
    super(pos);

    this.dv = initVelocity || createVector(0.0, 0.0);
    this.maxDv = maxVelocity || null;
  }

  moveTo(x, y) {
    this.pos.set(x, y);
  }
}
