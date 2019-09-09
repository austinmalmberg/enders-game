class OpenTile extends AbstractTile {
  constructor(board, r, c) {
    super(board, r, c);

    this.highlightColorRGB = [255, 255, 0];
  }

  handleClick() {

    if (mouseButton == LEFT) {

      if (!this.player)
        this.player = new Player(this);

    } else if (mouseButton == RIGHT) {

      if (this.player)
        this.player = null;


    }

  }

  draw() {

    if (this.player)
      this.player.draw();

    else {

      push();

      if (this.hover) {
        stroke(Colors.getP5Notation(this.highlightColorRGB));
        strokeWeight(2);
      } else {
        stroke(255);
      }

      const lineLength = this.padding * 0.5;

      const topLeftX = this.c * this.board.tilesize + this.padding;
      const topRightX = (1 + this.c) * this.board.tilesize - this.padding;

      const topY = this.r * this.board.tilesize + this.padding;

      const botLeftX = this.c * this.board.tilesize + this.padding;
      const botRightX = (1 + this.c) * this.board.tilesize - this.padding;;

      const botY = (1 + this.r) * this.board.tilesize - this.padding;

      // draw vertex in top left
      line(topLeftX, topY, topLeftX, topY + lineLength);
      line(topLeftX, topY, topLeftX + lineLength, topY);

      // draw vertex in top right
      line(topRightX, topY, topRightX, topY + lineLength);
      line(topRightX, topY, topRightX - lineLength, topY);

      // draw vertex in bottom left
      line(botLeftX, botY, botLeftX, botY - lineLength);
      line(botLeftX, botY, botLeftX + lineLength, botY);

      // draw vertex in bottom right
      line(botRightX, botY, botRightX, botY - lineLength);
      line(botRightX, botY, botRightX - lineLength, botY);

      pop();
    }

  }

}
