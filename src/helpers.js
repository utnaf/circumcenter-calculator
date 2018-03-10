var p = require("./Point");
var Equation = require("./Equation").Equation;

function round(number, precision) {
  var factor = Math.pow(10, precision);
  var tempNumber = number * factor;
  var roundedTempNumber = Math.round(tempNumber);

  // remove signed zero
  if (roundedTempNumber === -0) {
    roundedTempNumber = 0;
  }

  return roundedTempNumber / factor;
}

function negativeInverse(num) {
  if (num == Infinity) {
    return 0;
  }

  if (num == 0) {
    return Infinity;
  }

  return -1 / num;
}

function midPoint(a, b) {
  var midX = (a.x + b.x) / 2;
  var midY = (a.y + b.y) / 2;

  return new p.Point(midX, midY);
}

function slope(a, b) {
  return (b.y - a.y) / (b.x - a.x);
}

function getEquation(midPoint, slope) {
  var bisectorSlope = negativeInverse(slope);

  // fake eliminaiton of slope
  if (Math.abs(slope) === Infinity) {
    slope = 1;
  }

  var x = 0;
  var y = 0;
  var constant = 0;
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

function findCorrectPoints(a, b, c) {
  var main = a;
  var first = b;
  var second = c;

  if (a.y === b.y) {
    main = c;
    first = a;
    second = b;
  }

  if (a.y === c.y) {
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

module.exports.findCorrectPoints = findCorrectPoints;
module.exports.getEquation = getEquation;
module.exports.slope = slope;
module.exports.negativeInverse = negativeInverse;
module.exports.round = round;
module.exports.midPoint = midPoint;
