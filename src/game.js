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

    // board variables
    this.w = 960;
    this.h = 720;
    this.rowCount = 24;
    this.colCount = 32;
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
    this.moveIndicator = new MoveIndicator(this);
  }

  handleClick() {

    const dest = this.moveIndicator.getDestination();
    if (dest) {
      this.getActivePlayer().moveTo(dest);
    }

    this.getActiveTeam().nextPlayer();

    // every player on the team has gone so we should change teams
    if (this.getActiveTeam().isFirstPlayer())
      this.teamManager.next();

    this.moveIndicator.setPlayer(this.getActivePlayer());
  }

  handleMouseHover() {
    this.moveIndicator.handleMouseHover();
  }

  update() {
    this.teams.forEach(team => team.update());
    this.moveIndicator.update();
  }

  draw() {
    background(155);

    this.board.draw();
    this.teams.forEach(team => team.draw());
    this.moveIndicator.draw();
  }

  getActiveTeam() {
    return this.teamManager.getActive();
  }

  getActivePlayer() {
    return this.getActiveTeam().getActivePlayer();
  }
}
