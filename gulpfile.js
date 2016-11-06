// *** dependencies *** //

const gulp = require('gulp');
const jscs = require('gulp-jscs');
const connect = require('gulp-connect');
const runSequence = require('run-sequence');


// *** tasks *** ///

gulp.task('connect', function () {
  connect.server({
    root: './src/',
    port: 8888
  });
});

gulp.task('html', function () {
  gulp.src('./src/*.html')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('./src/css/*.css')
    .pipe(connect.reload());
});

gulp.task('javascript', function () {
  gulp.src('./src/**/*.js')
    .pipe(connect.reload());
});

gulp.task('style', function() {
  return gulp.src('src/**/*.js')
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'));
});

gulp.task('watch', function() {
  gulp.watch('./src/js/*.js', ['jshint', 'javascript', 'style']);
  gulp.watch(['./src/*.html'], ['html']);
  gulp.watch(['./src/css/*.css'], ['css']);
});

// *** defailt task *** //
gulp.task('default', function() {
  runSequence(
    ['style'],
    ['watch'],
    ['connect']
  );
});
