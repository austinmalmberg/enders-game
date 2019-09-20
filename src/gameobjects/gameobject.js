class GameObject {
  constructor(pos) {
    this.pos = pos;
  }

  // overrideable functions
  clicked() {  }
  handleClick() {  }
  handleMouseHover() {  }
  update() {  }
  draw() {  }
}
