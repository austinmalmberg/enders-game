class Team {
  constructor(id, base, playerRadius) {
    this.base = base;

    const teamRGBs = [
        [0, 0, 255],    // blue
        [255, 0, 0]    // red
      ];
    this.rgb = teamRGBs[id];

    this.membersPerTeam = 1;
    this.players = [...Array(this.membersPerTeam).keys()].map(i =>
      new Player(base.getSpawnLocation(), playerRadius, this.rgb)
    );

    this.playerManager = new MoveManager(this.players);
  }

  handleClick() {
    this.activePlayer().handleClick();
    this.playerManager.next();
  }

  update() {
    this.players.forEach(player => player.update());
  }

  draw() {
    this.players.forEach(player => player.draw());
  }

  getActivePlayer() {
    return this.playerManager.getActive();
  }
}
