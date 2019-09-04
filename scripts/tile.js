
export default class Tile {
  constructor(r, c, tilesize, padding) {
    this.r = r;
    this.c = c;
    this.tilesize = tilesize;
    this.padding = padding;
  }

  draw() {

    rectMode(CENTER);
    fill(255);

    let dx = this.c * this.tilesize + this.tilesize * 0.5;
    let dy = this.r * this.tilesize + this.tilesize * 0.5;

    let size = this.tilesize - this.padding * 2;

    rect(dx, dy, size, size);
  }
}
