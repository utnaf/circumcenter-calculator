exports.round =  function(number, precision) {
  const factor = Math.pow(10, precision);
  const tempNumber = number * factor;
  let roundedTempNumber = Math.round(tempNumber);

  // remove signed zero
  if (roundedTempNumber === -0) {
    roundedTempNumber = 0;
  }

  return roundedTempNumber / factor;
}