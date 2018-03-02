const Point = require("./Point").Point;
const Equation = require("./Equation").Equation;
const linear = require("linear-solve");
const inv = require("mathjs").inv;

class CircumcenterCalculator {
  calculate(a, b, c) {
    if (
      !(a instanceof Point) ||
      !(b instanceof Point) ||
      !(c instanceof Point)
    ) {
      throw "Points a, b, and c must be intances of Point";
      return false;
    }

    // find the AB midpoint
    const midPointAB = this.midPoint(a, b);
    // slope AB
    const slopeAB = this.slope(a, b);
    const equationAB = this.getEquation(midPointAB, slopeAB);

    // find the AC midpoint
    const midPointAC = this.midPoint(a, c);
    // slope AC
    const slopeAC = this.slope(a, c);
    const equationAC = this.getEquation(midPointAC, slopeAC);

    const constants = [equationAB.constant, equationAC.constant];
    const coeff = [[equationAB.x, equationAB.y], [equationAC.x, equationAC.y]];

    let solved = null;
    try {
      solved = linear.solve(coeff, constants);
    } catch (e) {
      console.log(coeff, constants);
      console.error(e);
      throw `Was impossible to calculate circumcenter for points ${a}, ${b} and ${c}`;
    }

    console.log(coeff, constants);

    return new Point(solved[0], solved[1]);
  }

  midPoint(a, b) {
    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2;

    return new Point(midX, midY);
  }

  slope(a, b) {
    const slope = (b.y - a.y) / (b.x - a.x);

    return (slope === Infinity || slope === 0) ? 1 : slope;
  }

  negativeInverse(num) {
    return -1 * inv(num);
  }

  getEquation(midPoint, slope) {
    const bisectorSlope = this.negativeInverse(slope);

    let x = 0;
    let y = 0;
    let constant = 0;
    if (slope % 1 === 0) {
      x = slope * bisectorSlope * -1;
      y = slope;
      constant =
        (bisectorSlope * slope * midPoint.x + slope * midPoint.y * -1) * -1;
    } else {
      x = bisectorSlope * -1;
      y = bisectorSlope * slope * -1;
      constant = (bisectorSlope * midPoint.x + midPoint.y * -1) * -1;
    }

    return new Equation(x, y, constant);
  }
}

exports.Calculator = CircumcenterCalculator;
