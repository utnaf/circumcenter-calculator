var assert = require("chai").assert;
var Point = require("../src/Point").Point;
var Equation = require("../src/Equation").Equation;
var calculate = require("../src/calculate").calculate;
var helpers = require("../src/helpers");

describe("#findCorrectPoints", function() {
  it("should return a correct object", function() {
    var a = new Point(0, 0);
    var b = new Point(15, 0);
    var c = new Point(0, 15);

    var points = helpers.findCorrectPoints(a, b, c);

    var expectedPoints = {
      main: c,
      first: a,
      second: b
    };

    assert.deepEqual(expectedPoints, points);
  });
});

describe("#slope", function() {
  it("should return the correct slope value when two points are given", function() {
    var a = new Point(2, 1);
    var b = new Point(4, 5);
    var expectedSlope = 2;

    var slope = helpers.slope(a, b);

    assert.equal(slope, expectedSlope);
  });
});

describe("#negativeInverse", function() {
  it("should return the correct negative inverse value", function() {
    var number = 2;
    var expectedNegativeInverse = -0.5;

    var negativeInverse = helpers.negativeInverse(number);

    assert.equal(negativeInverse, expectedNegativeInverse);
  });
});

describe("#midPoint", function() {
  it("should return the correct mid point when two points are given", function() {
    var a = new Point(3, 2);
    var b = new Point(1, 4);
    var expectedMidpoint = new Point(2, 3);

    var midPoint = helpers.midPoint(a, b);

    assert.instanceOf(midPoint, Point);
    assert.deepEqual(midPoint, expectedMidpoint);
  });
});

describe("#getEquation", function() {
  var assertions = [
    {
      midPoint: new Point(2, 3),
      slope: -1,
      expectedEquation: new Equation(1, -1, -1)
    },
    {
      midPoint: new Point(4, 3),
      slope: 1,
      expectedEquation: new Equation(1, 1, 7)
    },
    {
      midPoint: new Point(3, 3),
      slope: 2,
      expectedEquation: new Equation(1, 2, 9)
    },
    {
      midPoint: new Point(4, 2),
      slope: 0.5,
      expectedEquation: new Equation(2, 1, 10)
    }
  ];

  assertions.forEach(function(assertion) {
    var midPoint = assertion.midPoint;
    var slope = assertion.slope;
    var expectedEquation = assertion.expectedEquation;

    describe(`When called with ${midPoint.toString()} and ${slope}`, function() {
      it(`should return ${expectedEquation.toString()}`, function() {
        var equation = helpers.getEquation(midPoint, slope);

        assert.instanceOf(equation, Equation);
        assert.deepEqual(equation, expectedEquation);
      });
    });
  });
});

describe("#calculate", function() {
  var assertions = [
    {
      a: new Point(2, 1),
      b: new Point(4, 5),
      c: new Point(6, 3),
      expected: new Point(11 / 3, 8 / 3)
    },
    {
      a: new Point(3, 2),
      b: new Point(1, 4),
      c: new Point(5, 4),
      expected: new Point(3, 4)
    },
    {
      a: new Point(65, 31),
      b: new Point(22, 1),
      c: new Point(98, 3),
      expected: new Point(60.264, -8.028)
    },
    {
      a: new Point(-13, -13),
      b: new Point(13, -3),
      c: new Point(-1, -1),
      expected: new Point(3.75, -17.75)
    },
    {
      a: new Point(0, 0),
      b: new Point(15, 0),
      c: new Point(7.5, 7.5),
      expected: new Point(7.5, 0)
    },
    {
      a: new Point(0, 0),
      b: new Point(0, 15),
      c: new Point(15, 0),
      expected: new Point(7.5, 7.5)
    }
  ];

  assertions.forEach(function(assertion) {
    var a = assertion.a;
    var b = assertion.b;
    var c = assertion.c;
    var expected = assertion.expected;

    describe(`When called with ${a.toString()}, ${b.toString()} and ${c.toString()}`, function() {
      it(`should return ${expected.toString()}`, function() {
        var circumcenter = calculate(a, b, c);

        assert.instanceOf(circumcenter, Point);
        assert.deepEqual(circumcenter, expected);
      });
    });
  });
});
