class Team {
  constructor(id, base, playerRadius) {
    this.base = base;

    this.teamRGBs = [
        [0, 0, 255],    // blue
        [255, 0, 0]    // red
      ];
    this.rgb = this.teamRGBs[id];

    this.membersPerTeam = 6;
    this.players = [...Array(this.membersPerTeam).keys()].map(i =>
      new Player(base.getSpawnLocation(), playerRadius, this)
    );

    console.log(this.players);

    this.moveManager = new MoveManager(this.players);
  }

  handleClick() {
    this.moveManager.getActive().handleClick();
    this.moveManager.next();
  }

  update() {
    this.players.forEach(player => player.update());
  }

  draw() {
    this.players.forEach(player => player.draw());
  }
}
