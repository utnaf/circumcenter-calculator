var helpers = require("./helpers.js");

function Equation(coeffX, coeffY, constant) {
  this.x = helpers.round(coeffX, 5);
  this.y = helpers.round(coeffY, 5);
  this.constant = helpers.round(constant, 5);
}

Equation.prototype.toString = function() {
  return `${this.x}x ${this.y}y = ${this.constant}`;
};

module.exports.Equation = Equation;
