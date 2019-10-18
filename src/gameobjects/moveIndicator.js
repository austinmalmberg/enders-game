class MoveIndicator extends GameObject {
  constructor(game) {
    super(game.getActivePlayer().pos);

    this.game = game;
    this.board = game.board;
    this.player = game.getActivePlayer();
    this.dest = null;
  }

  handleMouseHover() {
    this.dest = this._closestTileIntersect(this.game.getActivePlayer());
  }

  update() {

  }

  draw() {

    push();

    stroke(255);

    if (this.dest) {
      line(this.pos.x, this.pos.y, this.dest.x, this.dest.y);
      circle(this.dest.x, this.dest.y, this.game.playerRadius * 2);

      strokeWeight(4);

      this._tileIntersects(this.player).forEach(({x, y}) => point(x, y));
    }

    pop();
  }

  _tileIntersects(player) {
    const mVector = createVector(mouseX, mouseY);
    return this.board.getTiles()
        .flatMap(tile => tile.findIntersects(player.pos, mVector));
  }

  _closestTileIntersect(player) {

    const tileIntersects = this._tileIntersects(player)
        .map(p => createVector(p.x, p.y))
        .filter(p => p != player.pos);

    if (tileIntersects.length == 0)
      return null;

    let closest = null;
    for (let intersect of tileIntersects) {

      const d = intersect.dist(player.pos);

      if (!closest || d > 0.1 && d < closest.dist) {
        closest = {
          int: intersect,
          dist: d
        }
      }
    }

    return closest.int;
  }

  behindPlayer(player) {
      return true;
  }

  getDestination() {
    return this.dest;
  }

  setPlayer(player) {
    this.player = player;
    this.pos = player.pos;
    this.dest = this._closestTileIntersect(player);
  }
}
