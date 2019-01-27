# gulp-aegean

Gulp plugin for aegean (ES6 inline import).


![npm](https://img.shields.io/npm/v/gulp-aegean.svg)
![NpmLicense](https://img.shields.io/npm/l/gulp-aegean.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/khalyomede/gulp-aegean/badge.svg?targetFile=package.json)](https://snyk.io/test/github/khalyomede/gulp-aegean?targetFile=package.json)

```javascript
const gulp = require('gulp');
const aegean = require('gulp-aegean');

gulp.task('js', function() {
  return gulp.src('src/**/*.js')
    .pipe(aegean())
    .pipe(gulp.dest('dist'));
});
```

## Summary

- [Installation](#installation)
- [Usage](#usage)

## Installation

With npm:

```bash
npm install --save-dev gulp-aegean
```

With yarn:

```bash
yarn add --dev gulp-aegean
```

## Usage

- [Example 1: simple usage](#example-1-simple-usage)

### Example 1: simple usage

_src/main.js_
```javascript
import "./echo";
import "./is_string";

const input = "hello world";

if(is_string(input) === true) {
  echo(input);
}
```

_gulpfile.js_

```javascript
const gulp = require('gulp');
const aegean = require('gulp-aegean');

gulp.task('js', function() {
  return gulp.src('src/**/*.js')
    .pipe(aegean())
    .pipe(gulp.dest('dist'));
});
```

Result:

_dist/main.js_

```javascript
function echo(mixed) {
  console.log(mixed);
}

function is_string(mixed) {
  return (
    mixed !== null && mixed !== undefined && mixed.constructor === String
  );
}


const input = "hello world";

if (is_string(input) === true) {
  echo(input);
}
```