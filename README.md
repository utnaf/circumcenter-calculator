[![Build Status](https://travis-ci.org/utnaf/circumcenter-calculator.svg?branch=master)](https://travis-ci.org/utnaf/circumcenter-calculator)

## Calculate circumcenter given 3 coordinates

This package allows you to calculate the circumcenter of a triangle given 3 points.

### How to use

```javascript
const Point = require('circumcenter-calculator').Point;
const calculator = require('circumcenter-calculator').calculateCircumcenter;

const pointA = new Point(3,2);
const pointB = new Point(1,4);
const pointC = new Point(5,4);

const cirucmcenter = calculator(pointA, pointB, pointC);

console.log(cirucmcenter);

/**
 * Point {
 *   x: 3,
 *   y: 4
 * }
 */
```
