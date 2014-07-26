//gulp
var gulp = require('gulp');

// npm package
var pkg = require('./package.json');

// npm tools
var fs = require('fs');
var path  = require('path');

// gulp general plugins
var rename = require('gulp-rename');
var concatMaps = require('gulp-concat-sourcemap');
var filter = require('gulp-filter');

// docs & tests
var docco = require('gulp-docco');

// project directories
var sourceDir = './source';
var destDir = './dist';
var testsDir = './tests';

// assets directories
var app = 'app';

// filetype globs
var docGlob = '**/*.{js,css,sass,scss,json,md,html,hbs,handlebars}';



// __build__ task:
// - concat files
gulp.task('build', function() {
  var files = [
    'build/_export',
    'build/utilities',
    'hook',
    'extend',
    'base-object',
    'event-object',
    'intercom',
    'model',
    'view',
    'build/_after'
  ].map(function (file) { return path.join(sourceDir, file + '.js'); });

  return gulp.src(files)
    .pipe(concatMaps('struck.js', {
      sourcesContent: false,
      sourceRoot: '../'
    }))
    .pipe(gulp.dest(destDir))
    .pipe(filter("*.js"))
    .pipe(gulp.dest('./example'));
});


// __docs__ task:
// creates documentation from code in source folder using docco
//
// - docco (side by side documentation)
//   + output: various files to './docs'
gulp.task('docs', function() {
  return gulp.src(path.join(destDir, 'struck.js'))
    .pipe(docco())
    .pipe(gulp.dest('./docs'));
});



// __watch__ task:
gulp.task('watch', function () {
  gulp.watch(path.join(sourceDir, '**/*.js'), ['compile']);
});

// gulp.task('bump', function () {
//   return gulp.src(['./package.json', './bower.json'])
//     .pipe(bump())
//     .pipe(gulp.dest('./'));
// });


gulp.task('compile', ['build', 'docs']);
gulp.task('default', ['compile', 'watch']);
