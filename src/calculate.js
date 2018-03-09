const Point = require("./Point").Point;
const linear = require("linear-solve");
const helpers = require("./helpers");

function calculate(a, b, c) {
  if (!(a instanceof Point) || !(b instanceof Point) || !(c instanceof Point)) {
    throw "Points a, b, and c must be intances of Point";
    return false;
  }

  const points = helpers.findCorrectPoints(a, b, c);

  // find the AB midpoint
  const midPointAB = helpers.midPoint(points.main, points.first);
  // slope AB
  const slopeAB = helpers.slope(points.main, points.first);
  const equationAB = helpers.getEquation(midPointAB, slopeAB);

  // find the AC midpoint
  const midPointAC = helpers.midPoint(points.main, points.second);
  // slope AC
  const slopeAC = helpers.slope(points.main, points.second);
  const equationAC = helpers.getEquation(midPointAC, slopeAC);

  const constants = [equationAB.constant, equationAC.constant];
  const coeff = [[equationAB.x, equationAB.y], [equationAC.x, equationAC.y]];

  try {
    const solved = linear.solve(coeff, constants);
  } catch (e) {
    throw `Was impossible to calculate circumcenter for points ${a}, ${b} and ${c}`;
  }

  return new Point(solved[0], solved[1]);
}

exports.calculate = calculate;
