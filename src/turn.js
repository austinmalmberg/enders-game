class Turn {
  constructor(teamRGBs, randomStart=false) {
    this.teamRGBs = teamRGBs;
    this.turn = randomStart ? Math.floor(Math.random() * teamRGBs.length) : 0;
  }

  get() {
    return this.teamRGBs[this.turn];
  }

  next() {
    this.turn = (this.turn + 1) % this.teamRGBs.length;

    return this.get();
  }
}
