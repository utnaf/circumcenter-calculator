var calculate = (function() {
  var calculate = require("./src/calculate");
  var Point = require("./src/Point");

  exports.calculate = calculate;
  exports.Point = Point;

  return exports;
})();

if (typeof module.exports === "object") module.exports = calculate;
