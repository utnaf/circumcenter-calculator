class Point {
  constructor(x, y) {
    this.x = Math.round(x);
    this.y = Math.round(y);
  }

  toString() {
    return `${this.x}:${this.y}`;
  }
}

exports.Point = Point;
