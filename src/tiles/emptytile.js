class EmptyTile extends AbstractTile {
  constructor(game, r, c) {
    super(game, r, c);
  }

  handleClick() {

    if (mouseButton == LEFT)
      this.game.setPlayer(this.r, this.c);

    else if (mouseButton == RIGHT)
      this.game.setImmovableTile(this.r, this.c);

  }

  draw(color=255) {

    push();

    if (this.hover) {
      stroke('rgb(255,255,0)');
      strokeWeight(3);

    } else {
      stroke(color);

    }

    const lineLength = this.padding * 0.5;

    const topLeftX = this.c * this.tilesize + this.padding;
    const topRightX = (1 + this.c) * this.tilesize - this.padding;

    const topY = this.r * this.tilesize + this.padding;

    const botLeftX = this.c * this.tilesize + this.padding;
    const botRightX = (1 + this.c) * this.tilesize - this.padding;;

    const botY = (1 + this.r) * this.tilesize - this.padding;

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
