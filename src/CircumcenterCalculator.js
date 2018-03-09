const Point = require("./Point").Point;
const Equation = require("./Equation").Equation;
const linear = require("linear-solve");

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

    const points = this.findCorrectPoints(a, b, c);

    // find the AB midpoint
    const midPointAB = this.midPoint(points.main, points.first);
    // slope AB
    const slopeAB = this.slope(points.main, points.first);
    const equationAB = this.getEquation(midPointAB, slopeAB);

    // find the AC midpoint
    const midPointAC = this.midPoint(points.main, points.second);
    // slope AC
    const slopeAC = this.slope(points.main, points.second);
    const equationAC = this.getEquation(midPointAC, slopeAC);

    const constants = [equationAB.constant, equationAC.constant];
    const coeff = [[equationAB.x, equationAB.y], [equationAC.x, equationAC.y]];

    let solved = null;
    try {
      solved = linear.solve(coeff, constants);
    } catch (e) {
      throw `Was impossible to calculate circumcenter for points ${a}, ${b} and ${c}`;
    }

    return new Point(solved[0], solved[1]);
  }

  findCorrectPoints(a, b, c) {
    let main = a;
    let first = b;
    let second = c;

    if(a.y === b.y) {
      main = c;
      first = a;
      second = b;
    }

    if(a.y === c.y) {
      main = b;
      first = a;
      second = c;
    }

    return {
      main: main,
      first: first,
      second: second
    };
  }

  midPoint(a, b) {
    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2;

    return new Point(midX, midY);
  }

  slope(a, b) {
    return (b.y - a.y) / (b.x - a.x);
  }

  negativeInverse(num) {
    if (num == Infinity) {
      return 0;
    }

    if (num == 0) {
      return Infinity;
    }

    return -1 / num;;
  }

  getEquation(midPoint, slope) {
    let bisectorSlope = this.negativeInverse(slope);

    // fake eliminaiton of slope
    if (Math.abs(slope) === Infinity) {
      slope = 1;
    }

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
