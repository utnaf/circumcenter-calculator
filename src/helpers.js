const Point = require("./Point").Point;
const Equation = require("./Equation").Equation;

function round(number, precision) {
  const factor = Math.pow(10, precision);
  const tempNumber = number * factor;
  let roundedTempNumber = Math.round(tempNumber);

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
  const midX = (a.x + b.x) / 2;
  const midY = (a.y + b.y) / 2;

  return new Point(midX, midY);
}

function slope(a, b) {
  return (b.y - a.y) / (b.x - a.x);
}

function getEquation(midPoint, slope) {
  let bisectorSlope = negativeInverse(slope);

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

function findCorrectPoints(a, b, c) {
  let main = a;
  let first = b;
  let second = c;

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

exports.findCorrectPoints = findCorrectPoints;
exports.getEquation = getEquation;
exports.slope = slope;
exports.negativeInverse = negativeInverse;
exports.round = round;
exports.midPoint = midPoint;
