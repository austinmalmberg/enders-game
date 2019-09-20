class MoveHandler {
  constructor(players) {
    this.players = players;
    this.active = 0;
  }

  getActivePlayer() {
    return this.players[this.active];
  }

  nextPlayer() {
    this.active = (this.active + 1) % this.players.length;
    return this.getActivePlayer();
  }
}
