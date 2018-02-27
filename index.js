const circumcenterCalculator = (function() {
  const CircumcenterCalculator = require('./src/CircumcenterCalculator').CircumcenterCalculator;

  exports.calculateCircumcenter = function(a, b, c) {
    return (new CircumcenterCalculator).calculateCircumcenter(a, b, c);
  }

  return exports;
})();

if (typeof module.exports === "object") module.exports = circumcenterCalculator;