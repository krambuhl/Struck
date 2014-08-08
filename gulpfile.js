//gulp
var gulp = require('gulp');

// npm package
var pkg = require('./package.json');

// npm tools
var path  = require('path');

// gulp general plugins
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

// docs & tests
var docco = require('gulp-docco');
var mocha = require('gulp-mocha-phantomjs');

// project directories
var sourceDir = './source';
var distDir = './dist';
var testDir = './tests';



// __build__ task:
// - concat files
gulp.task('build', function() {
  var files = [
    'build/_export',
    'build/utilities',
    'hook',
    'computed',
    'extend',
    'base-object',
    'event-object',
    'intercom',
    'model',
    'view',
    'build/_after'
  ].map(function (file) { return path.join(sourceDir, file + '.js'); });

  return gulp.src(files)
    .pipe(sourcemaps.init())
    .pipe(concat('struck.js'))
    .pipe(gulp.dest(distDir))
    .pipe(uglify())
    .pipe(rename('struck.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(distDir))
    .pipe(gulp.dest('./example'));
});


// __docs__ task:
// creates documentation from code in source folder using docco
//
// - docco (side by side documentation)
//   + output: various files to './docs'
gulp.task('docs', ['build'], function() {
  return gulp.src(path.join(distDir, 'struck.js'))
    .pipe(docco())
    .pipe(gulp.dest('./docs'));
});

// __test__ task:
gulp.task('test', ['build'], function () {
  return gulp.src(path.join(testDir, 'tests.html'))
    .pipe(mocha({ reporter: 'spec' }));
});

// __watch__ task:
gulp.task('watch', function () {
  gulp.watch(path.join(sourceDir, '**/*.js'), ['compile']);
  gulp.watch(path.join(testDir, '**/*'), ['test']);
});

// gulp.task('bump', function () {
//   return gulp.src(['./package.json', './bower.json'])
//     .pipe(bump())
//     .pipe(gulp.dest('./'));
// });

// gulp.task('release', ['build', 'bump'], function() {
//   gulp.src(path.join(distDir));
// });

gulp.task('compile', ['build', 'docs']);
gulp.task('develop', ['compile', 'test', 'watch']);

gulp.task('default', ['develop']);
