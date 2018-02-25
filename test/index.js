const assert = require("chai").assert;
const circumcenterCalculator = require("../src/index.js")
  .CircumcenterCalculator;
const Point = require("../src/Point.js").Point;

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
