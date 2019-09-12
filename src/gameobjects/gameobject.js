class GameObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // overridable functions
  handleClick() {  }
  handleMouseHover() {  }
  update() {  }
  draw() {  }
}
