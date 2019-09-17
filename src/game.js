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
    this.teamRGBs = [
        [255, 0, 0],    // red
        [0, 0, 255],    // blue
        [0, 255, 0],    // green
        [255, 255, 0]   // yellow
      ];
    this.teams = this.teamRGBs.slice(0, this.numTeams).map((rgb, i) => new Team(i, rgb));
    this.membersPerTeam = 6;

    this.starDensity = 0.15;

    this.board = new Board(this);

    this.players = [];
    this._initPlayers();
  }

  _initPlayers() {
    this.board.getBases().forEach(base => {
      const player = new Player(base.getCenter(), this.board, base.team);
      this.players.push(player);
    });
  }

  handleClick() {
    for (let player of this.players) {
      if (player.clicked()) {
        player.handleClick();
        return;
      }
    }

    for (let tile of this.board.getTiles()) {
      if (tile.clicked()) {
        tile.handleClick();
        return;
      }
    }

    this.players[0].moveTo(mouseX, mouseY);
  }

  handleMouseHover() {

  }

  update() {
    this.players.forEach(player => player.update());
  }

  draw() {
    background(155);

    this.board.draw();

    // team players
    this.players.forEach(player => player.draw());
  }

  getTeams() {
    return this.teams;
  }
}
