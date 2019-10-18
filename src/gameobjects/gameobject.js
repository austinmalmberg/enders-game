class GameObject {
  constructor(pos) {
    this.setPosition(pos);
  }

  setPosition(pos) {
    this.pos = pos;
  }

  // overrideable functions
  clicked() {  }
  handleClick() {  }
  handleMouseHover() {  }
  update() {  }
  draw() {  }
}
