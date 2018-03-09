var round = require("./helpers").round;

function Equation(coeffX, coeffY, constant) {
  this.x = round(coeffX, 5);
  this.y = round(coeffY, 5);
  this.constant = round(constant, 5);
}

Equation.prototype.toString = function() {
  return `${this.x}x ${this.y}y = ${this.constant}`;
};

module.exports.Equation = Equation;
