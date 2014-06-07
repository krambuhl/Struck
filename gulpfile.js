//gulp
var gulp = require('gulp');

// npm package
var pkg = require('./package.json');

// npm tools
var fs = require('fs');
var path  = require('path');
var slice = require('sliced');

// gulp general plugins
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var refresh = require('gulp-livereload');
var source = require('vinyl-source-stream');
var concatMaps = require('gulp-concat-sourcemap');
var streamify = require('gulp-streamify');
var concat = require('gulp-concat');
var prettify = require('gulp-prettify');

// css tasks
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var cmq = require('gulp-combine-media-queries');
var minify = require('gulp-clean-css');

// js tasks
var uglify = require('gulp-uglify');

// browserify
var watchify = require('watchify');

// docs & tests
var docco = require('gulp-docco');
var wrapDocco = require('gulp-wrap-docco');

// project directories
var sourceDir = './source';
var destDir = './dist';
var testsDir = './tests';

// assets directories
var app = 'app';

// filetype globs
var docGlob = '**/*.{js,css,sass,scss,json,md,html,hbs,handlebars}';


// helper functions


// dir() builds a path from fragments
function dir() { return slice(arguments).join('/'); }



// __app__ task:
// - watchify
//   - watch app directory
//   - browserify
//     + output: 'app-bundle.js'

gulp.task('app', function() {
  var files = [
    '_export',
    'events',
    'extend',
    'view',
    '_after'
  ].map(function (file) {
    return dir(sourceDir, file + '.js');
  });

  return gulp.src(files)
    .pipe(concatMaps('struck.js', {
      sourcesContent: false,
      sourceRoot: '../'
    }))
    .pipe(gulp.dest(destDir));
});


// __docs__ task:
// creates documentation from code in source folder using docco
//
// - docco (side by side documentation)
//   + output: various files to './docs'
gulp.task('docs', function() {
  return gulp.src(dir(destDir, 'struck.js'))
    .pipe(docco())
    .pipe(gulp.dest('./docs'));
});



// __watch__ task:
gulp.task('watch', function () {
  // run `app` task on js file changes in './source/app'
  return gulp.watch(dir(sourceDir, '**/*.js'), ['app']);

  // run `docs` task on any file changes
  gulp.watch([
    dir(sourceDir, docGlob),
    dir(testsDir, docGlob),
    'gulpfile.js',
    'README.md'
  ], ['docs']);
});

// gulp.task('bump', function () {
//   return gulp.src(['./package.json', './bower.json'])
//     .pipe(bump())
//     .pipe(gulp.dest('./'));
// });


gulp.task('compile', ['app', 'docs']);
gulp.task('default', ['compile', 'watch']);
