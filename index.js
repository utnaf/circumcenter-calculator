var calculate = (function() {
  var calculate = require("./src/calculate").calculate;
  var Point = require("./src/Point").Point;

  exports.calculate = calculate;
  exports.Point = Point;

  return exports;
})();

if (typeof module.exports === "object") module.exports = calculate;