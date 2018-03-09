const round = require("./helpers").round;

class Point {
  constructor(x, y) {
    this.x = round(x, 3);
    this.y = round(y, 3);
  }

  toString() {
    return `${this.x}:${this.y}`;
  }
}

exports.Point = Point;
