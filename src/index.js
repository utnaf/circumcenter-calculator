const Point = require("./Point.js").Point;
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
    const bisectorSlopeAB = this.negativeInverse(slopeAB);

    let constantA = null;
    let coeffAx = null;
    let coeffAy = null;
    if (bisectorSlopeAB % 1 === 0) {
      constantA = midPointAB.x / bisectorSlopeAB + midPointAB.y;
      coeffAx = -1 * bisectorSlopeAB;
      coeffAy = 1;
    } else {
      constantA = midPointAB.x + midPointAB.y * slopeAB;
      coeffAx = 1;
      coeffAy = 1 * slopeAB;
    }

    // find the AC midpoint
    const midPointAC = this.midPoint(a, c);
    // slope AC
    const slopeAC = this.slope(a, c);
    const bisectorSlopeAC = this.negativeInverse(slopeAC);

    let constantB = null;
    let coeffBx = null;
    let coeffBy = null;
    if (bisectorSlopeAC % 1 === 0) {
      constantB = midPointAC.x / slopeAC + midPointAC.y;
      coeffBx = -1 * bisectorSlopeAC;
      coeffBy = 1;
    } else {
      constantB = midPointAC.x + midPointAC.y * slopeAC;
      coeffBx = 1;
      coeffBy = 1 * slopeAC;
    }

    const constants = [constantA, constantB];
    const coeff = [[coeffAx, coeffAy], [coeffBx, coeffBy]];
    const solved = linear.solve(coeff, constants);

    return new Point(solved[0], solved[1]);
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
    return -1 * inv(num);
  }
}

exports.CircumcenterCalculator = new CircumcenterCalculator();
