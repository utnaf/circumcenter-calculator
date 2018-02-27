class Equation {
  constructor(coeffX, coeffY, constant) {
    this.x = coeffX;
    this.y = coeffY;
    this.constant = constant;
  }

  toString() {
    return `${this.x}x ${this.y}y = ${this.constant}`;
  }
}

exports.Equation = Equation;