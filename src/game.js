/**
 * Summary--
 * A turn-based strategy game. Deploy your team tactically throughout the
 * Battleroom and claim victory.
 *
 * Objective--
 * Pass through the enemy gate. This requires 3 team members to be alive.  A
 * team member must be stationed on each side of the door while the third player
 * passes through the gate, as shown below.
 *
 * _____|O|______
 *    O    O
 *
 * Phases--
 * Every team member will go through a momement phase, and vision phase as
 * outlined below.
 *
 * 1. Movement--Use energy from your powerbar to propel team members. Team members
 * who move will continue to drift until they collide with another object.
 *
 * 2. Vision--Before a team member moves, set its vision cone.  If an enemy
 * passes through the vision code, either while stationary or en route to a new
 * position, they will begin firing randomly within their vision cone.
 *
 * Rules--
 * Team members that are hit become frozen, meaning they can no longer act and
 * essentially become new terrain. They can be used as cover and pushing off of
 * them causes them to be propelled in the opposite direction (though they
 * cannot fire).
 *
 *
 *
*/


class Game {
  constructor() {
    this.starDensity = 0.10;
    this.tilesize = 30;

    this.playerRadius = this.tilesize * 0.6 * 0.5;
    this.numTeams = 2;
    this.teams = [];

    this.board = new Board(this);

    const bases = this.board.getBases();
    for (let i = 0; i < bases.length; i++) {
      const base = bases[i];
      const team = new Team(i, base, this.playerRadius);
      base.setTeam(team);
      this.teams.push(team);
    }

    this.teamManager = new MoveManager(this.teams);
  }

  handleClick() {
    const player = this.getActivePlayer();
    const destVector = this._closestTileIntersect(player);

    player.moveTo(destVector.x, destVector.y);

    // change teams after every player has gone
    if (this.getActiveTeam().playerManager.isFirst())
      this.teamManager.next();
  }

  handleMouseHover() {

  }

  update() {
    this.teams.forEach(team => team.update());
  }

  draw() {
    background(155);

    this.board.draw();
    this.teams.forEach(team => team.draw());

    push();

    stroke(120);

    const player = this.getActivePlayer();
    const destVector = this._closestTileIntersect(player);

    if (destVector)
      line(player.pos.x, player.pos.y, destVector.x, destVector.y);

    pop();
  }

  _closestTileIntersect(player) {

    const mVector = createVector(mouseX, mouseY);
    const tileIntersects = this.board.tiles

        // only consider tiles with a y pos on the same side of the player as mouseY
        .filter(tile => {
          let ySign = Math.sign(tile.pos.y - player.pos.y);
          let xSign = Math.sign(tile.pos.x - player.pos.x);

          return (ySign == 0 || ySign == Math.sign(mVector.y - player.pos.y)) &&
              (xSign == 0 || xSign == Math.sign(mVector.x - player.pos.x))
        })
        .flatMap(tile => tile.findIntersects(player.pos, mVector))
        .map(p => createVector(p.x, p.y));


    if (tileIntersects.length == 0)
      return null;

    let closest = null;
    for (let intersect of tileIntersects) {

      const d = intersect.dist(player.pos);

      if (!closest || d < closest.dist) {
        closest = {
          int: intersect,
          dist: d
        }
      }
    }

    return closest.int;
  }

  getActiveTeam() {
    return this.teamManager.getActive();
  }

  getActivePlayer() {
    return this.getActiveTeam().getActivePlayer();
  }
}
