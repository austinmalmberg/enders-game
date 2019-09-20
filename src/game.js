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
  constructor([w, h]) {
    this.w = w;
    this.h = h;

    this.numTeams = 2;

    this.starDensity = 0.10;

    this.board = new Board(this);

    this.teams = [];

    const bases = this.board.getBases();
    const playerRadius = Math.min(...Object.values(this.board.tilesize)) * 0.6 * 0.5;

    for (let i = 0; i < bases.length; i++) {
      const base = bases[i];
      const team = new Team(i, base, playerRadius);
      base.setTeam(team);
      this.teams.push(team);
    }

    this.moveManager = new MoveManager(this.teams);
  }

  handleClick() {
    const activeTeam = this.moveManager.getActive();
    activeTeam.handleClick();

    // change teams after every player has moved
    if (activeTeam.moveManager.isFirst())
      this.moveManager.next();
  }

  handleMouseHover() {

  }

  update() {
    this.teams.forEach(team => team.update());

    // const p1 = this.teams[0].players[0];
    // const p2 = this.teams[1].players[0];
    // const distance = RayMarch.signedDistToCircle(p1.pos, p2.pos, p2.radius);
    //
    // console.log(distance);
  }

  draw() {
    background(155);

    this.board.draw();
    this.teams.forEach(team => team.draw());
  }
}
