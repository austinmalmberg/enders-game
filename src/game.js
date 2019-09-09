/**
 * Gameplay: A turn-based strategy game. Control a team to complete the objective.
 * Deploy your team tactically throughout the Battleroom to defeat the enemy.
 *
 * Phases:
 *
 * Movement--Use energy from your powerbar to propel team members. Team members
 * will continue to drift until they collide with a wall or star.
 *
 * Vision--Set 
 *
 * Team members that get shot are "frozen" and can no longer act, and block both
 * friendly and enemy fire, essentially becoming new terrain.
 *
 *
 * Objective: Pass through the enemy gate
 * This requires 3 team members to be alive.  A team member must be stationed on
 * each side of the door while the thirdplayer passes through the gate, as shown
 * below.
 *
 * _____|O|______
 *    O    O
 *
*/


class Game {
  constructor(w, h) {
    this.w = w;
    this.h = h;

    this.starDensity = 0.15;

    this.board = new Board(this);
  }

  handleClick() {
    this.board.handleClick();
  }

  handleMouseHover() {
    this.board.handleMouseHover();
  }

  draw(color=155) {
    background(color);

    this.board.draw();
  }
}
