const circumcenterCalculator = (function() {
  const calculate = require("./src/calculate").calculate;
  const Point = require("./src/Point").Point;

  exports.calculate = calculate;
  exports.Point = Point;

  return exports;
})();

if (typeof module.exports === "object") module.exports = circumcenterCalculator;
