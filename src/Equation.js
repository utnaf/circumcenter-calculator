const round = require("./helpers").round;

class Equation {
  constructor(coeffX, coeffY, constant) {
    this.x = round(coeffX, 5);
    this.y = round(coeffY, 5);
    this.constant = round(constant, 5);
  }

  toString() {
    return `${this.x}x ${this.y}y = ${this.constant}`;
  }
}

exports.Equation = Equation;