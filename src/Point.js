var round = require("./helpers").round;

function Point(x, y) {
  this.x = round(x, 3);
  this.y = round(y, 3);
};

Point.prototype.toString = function() {
  return `${this.x}:${this.y}`;
};

module.exports.Point = Point;
