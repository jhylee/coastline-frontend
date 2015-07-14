var gulp = require('gulp');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

gulp.task('lint ', function() {
  return gulp.src(['src/buy-side/**/*.js', 'src/common/**/*.js', 'src/landing/**/*.js', 'src/sell-side/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('build/'))
});

gulp.task('process-js', function() {
  return gulp.src('src/**/*.js')
    .pipe(gulp.dest('build/'))
});

gulp.task('process-html', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build/'))
});

gulp.task('process-scss', function() {
  return gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/'))
});

gulp.task('process-css', function() {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('build/'))
});


gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['process-js']);
  gulp.watch('src/**/*.html', ['process-html']);
  gulp.watch('src/**/*.scss', ['process-css']);
});

gulp.task('connect', function () {
  connect.server({
    root: 'build/',
    port: 8000
  });
});

gulp.task('default', ['process-js', 'process-html', 'process-scss', 'process-css', 'watch', 'connect']);
