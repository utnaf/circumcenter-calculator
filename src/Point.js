const helpers = require("./helpers");

function Point(x, y) {
  this.x = helpers.round(x, 3);
  this.y = helpers.round(y, 3);
}

Point.prototype.toString = function() {
  return `${this.x}:${this.y}`;
};

exports.Point = Point;
