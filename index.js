const circumcenterCalculator = (function() {
  const Calculator = require("./src/CircumcenterCalculator").Calculator;
  const Point = require("./src/Point").Point;

  exports.calculate = function(a, b, c) {
    return (new Calculator()).calculate(a, b, c);
  };
  exports.Point = Point;

  return exports;
})();

if (typeof module.exports === "object") module.exports = circumcenterCalculator;
