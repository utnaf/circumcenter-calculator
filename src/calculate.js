var p = require("./Point");
var linear = require("linear-solve");
var helpers = require("./helpers");

function calculate(a, b, c) {
  if (!(a instanceof p.Point) || !(b instanceof p.Point) || !(c instanceof p.Point)) {
    throw "Points a, b, and c must be intances of Point";
    return false;
  }

  var points = helpers.findCorrectPoints(a, b, c);

  // find the AB midpoint
  var midPointAB = helpers.midPoint(points.main, points.first);
  // slope AB
  var slopeAB = helpers.slope(points.main, points.first);
  var equationAB = helpers.getEquation(midPointAB, slopeAB);

  // find the AC midpoint
  var midPointAC = helpers.midPoint(points.main, points.second);
  // slope AC
  var slopeAC = helpers.slope(points.main, points.second);
  var equationAC = helpers.getEquation(midPointAC, slopeAC);

  var constants = [equationAB.constant, equationAC.constant];
  var coeff = [[equationAB.x, equationAB.y], [equationAC.x, equationAC.y]];

  try {
    var solved = linear.solve(coeff, constants);
  } catch (e) {
    throw `Was impossible to calculate circumcenter for points ${a}, ${b} and ${c}`;
  }

  return new p.Point(solved[0], solved[1]);
}

module.exports.calculate = calculate;
