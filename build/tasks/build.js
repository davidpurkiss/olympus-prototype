var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var notify = require("gulp-notify");
var browserSync = require('browser-sync');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function () {
    return gulp.src([paths.source, paths.jspm_typings, paths.typings])
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(changed(paths.jspm_typings, { extension: '.ts' }))
        .pipe(changed(paths.typings, { extension: '.ts' }))
        .pipe(changed(paths.output, { extension: '.ts' }))
        .pipe(sourcemaps.init({ loadMaps: true }))
        //.pipe(to5(assign({}, compilerOptions, {modules: 'system'})))
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write({ includeContent: true }))
        .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
    return gulp.src(paths.html)
      .pipe(changed(paths.output, { extension: '.html' }))
      .pipe(gulp.dest(paths.output));
});

// copies changed css files to the output directory
gulp.task('build-css', function () {
    return gulp.src(paths.css)
      .pipe(changed(paths.output, { extension: '.css' }))
      .pipe(gulp.dest(paths.output))
      .pipe(browserSync.stream());
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function (callback) {
    return runSequence(
      'clean',
      ['build-system', 'build-html', 'build-css'],
      callback
    );
});
