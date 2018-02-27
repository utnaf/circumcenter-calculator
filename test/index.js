const assert = require("chai").assert;
const circumcenterCalculator = require("../src/CircumcenterCalculator.js").CircumcenterCalculator;
const Point = require("../src/Point.js").Point;
const Equation = require("../src/Equation.js").Equation;

describe("circumcenterCalculator", function() {
  describe("#slope", function() {
    it("should return the correct slope value when two points are given", function() {
      const a = new Point(2, 1);
      const b = new Point(4, 5);
      const expectedSlope = 2;

      const slope = circumcenterCalculator.slope(a, b);

      assert.equal(slope, expectedSlope);
    });
  });

  describe("#negativeInverse", function() {
    it("should return the correct negative inverse value", function() {
      const number = 2;
      const expectedNegativeInverse = -0.5;

      const negativeInverse = circumcenterCalculator.negativeInverse(number);

      assert.equal(negativeInverse, expectedNegativeInverse);
    });
  });

  describe("#midPoint", function() {
    it("should return the correct mid point when two points are given", function() {
      const a = new Point(3, 2);
      const b = new Point(1, 4);
      const expectedMidpoint = new Point(2, 3);

      const midPoint = circumcenterCalculator.midPoint(a, b);

      assert.instanceOf(midPoint, Point);
      assert.deepEqual(midPoint, expectedMidpoint);
    });
  });

  describe("#getEquation", function() {
    const assertions = [
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

    assertions.forEach(({ midPoint, slope, expectedEquation }) => {
      describe(`When called with ${midPoint.toString()} and ${slope}`, function() {
        it(`should return ${expectedEquation.toString()}`, function() {
          const equation = circumcenterCalculator.getEquation(midPoint, slope);

          assert.instanceOf(equation, Equation);
          assert.deepEqual(equation, expectedEquation);
        });
      });
    });
  });

  describe("#calculate", function() {
    const assertions = [
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
      }
    ];

    assertions.forEach(({ a, b, c, expected }) => {
      describe(`When called with ${a.toString()}, ${b.toString()} and ${c.toString()}`, function() {
        it(`should return ${expected.toString()}`, function() {
          const circumcenter = circumcenterCalculator.calculate(a, b, c);

          assert.instanceOf(circumcenter, Point);
          assert.deepEqual(circumcenter, expected);
        });
      });
    });
  });
});
