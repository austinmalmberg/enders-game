/**
 * Takes a tilesize and position (vector)
 * Position is the center of the tile
*/

class AbstractTile extends GameObject {
  constructor(board, pos) {
    super(pos);

    this.board = board;
    this.playerRadius = board.playerRadius;
    this.rOffset = board.playerRadius * 0.5 * Math.sqrt(2);

    this.tilesize = board.tilesize;
    this.borders = [
      this.borderLeft(),
      this.borderRight(),
      this.borderTop(),
      this.borderBottom()
    ];
  }

  clicked() {
    const topLeft = this.getTopLeft();
    const bottomRight = this.getTopLeft();

    if (mouseX < topLeft.x || mouseX > bottomRight.x)
      return false;

    if (mouseY < topLeft.y || mouseY > bottomRight.y)
      return false;

    return true;
  }

  // borders that the player can intersect wtih

  borderLeft() {

    return {
      start: {
        x: this.pos.x - (this.tilesize * 0.5 + this.playerRadius),
        y: this.pos.y - (this.tilesize * 0.5 + this.playerRadius)
      },
      end: {
        x: this.pos.x - (this.tilesize * 0.5 + this.playerRadius),
        y: this.pos.y + (this.tilesize * 0.5 + this.playerRadius)
      }
    };
  }

  borderRight() {

    return {
      start: {
        x: this.pos.x + (this.tilesize * 0.5 + this.playerRadius),
        y: this.pos.y - (this.tilesize * 0.5 + this.playerRadius)
      },
      end: {
        x: this.pos.x + (this.tilesize * 0.5 + this.playerRadius),
        y: this.pos.y + (this.tilesize * 0.5 + this.playerRadius)
      }
    };
  }

  borderTop() {

    return {
      start: {
        x: this.pos.x - (this.tilesize * 0.5 + this.playerRadius),
        y: this.pos.y - (this.tilesize * 0.5 + this.playerRadius)
      },
      end: {
        x: this.pos.x + (this.tilesize * 0.5 + this.playerRadius),
        y: this.pos.y - (this.tilesize * 0.5 + this.playerRadius)
      }
    };
  }

  borderBottom() {

    return {
      start: {
        x: this.pos.x - (this.tilesize * 0.5 + this.playerRadius),
        y: this.pos.y + (this.tilesize * 0.5 + this.playerRadius)
      },
      end: {
        x: this.pos.x + (this.tilesize * 0.5 + this.playerRadius),
        y: this.pos.y + (this.tilesize * 0.5 + this.playerRadius)
      }
    };
  }

  getTopLeft() {
    return createVector(this.pos.x - this.tilesize * 0.5, this.pos.y - this.tilesize * 0.5);
  }

  getTopRight() {
    return createVector(this.pos.x + this.tilesize * 0.5, this.pos.y - this.tilesize * 0.5);
  }
  getBottomLeft() {
    return createVector(this.pos.x - this.tilesize * 0.5, this.pos.y + this.tilesize * 0.5);
  }
  getBottomRight() {
    return createVector(this.pos.x + this.tilesize * 0.5, this.pos.y + this.tilesize * 0.5);
  }
  getCenter() {
    return createVector(this.pos.x, this.pos.y);
  }



  findIntersects(segStart, segEnd) {

    return this.borders
        .map(( {start, end} ) => Geometry.findIntersect(start, end, segStart, segEnd))
        .filter(intersect => intersect != null);

  }

  // overrideable functions
  handleClick() {  }
  handleMouseHover() {  }
  update() {  }
  draw() {  }
}
