class MoveManager {
  constructor(arr) {
    this.arr = arr;
    this.active = 0;
  }

  getActive() {
    return this.arr[this.active];
  }

  next() {
    this.active = (this.active + 1) % this.arr.length;
    return this.getActive();
  }

  first() {
    return this.arr[0];
  }

  isFirst() {
    return this.active == 0;
  }

  last() {
    return this.arr[this.arr.length - 1];
  }

  isLast() {
    return this.active == this.arr.length - 1;
  }
}
