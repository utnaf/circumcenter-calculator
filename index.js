const circumcenterCalculator = (function() {
  const CircumcenterCalculator = require('./src/CircumcenterCalculator').CircumcenterCalculator;
  const Point = require('./src/Point').Point;

  exports.calculateCircumcenter = function(a, b, c) {
    return (new CircumcenterCalculator).calculateCircumcenter(a, b, c);
  }

  exports.Point = Point;

  return exports;
})();

if (typeof module.exports === "object") module.exports = circumcenterCalculator;