class GameObject {
  constructor(pos) {
    this.pos = pos;
  }

  // overrideable functions
  clicked() {  }
  handleClick() {
    console.log(this);
  }
  handleMouseHover() {  }
  update() {  }
  draw() {  }
}
