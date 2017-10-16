var gulp = require('gulp'),
    sass = require('gulp-sass'),
    validator = require('gulp-html'),
    jshint = require('gulp-jshint'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    runSequence = require('run-sequence');
const del = require('del');

// 2
gulp.task('sass', function() {
  return gulp.src('app/scss/*.scss')
              .pipe(sass())
              .pipe(gulp.dest('dist/css'));
});

gulp.task('html', function() {
  return gulp.src('app/index.html')
  .pipe(validator())
  .pipe(gulp.dest('dist/'));
});

gulp.task('lint', function() {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 3
gulp.task('watch', function() {
  gulp.watch('app/scss/styles.scss', ['sass']);
  gulp.watch('app/index.html', ['html']);
  gulp.watch('app/js/*.js',['lint'] );
});

// 4
gulp.task('brownser-sync', function(){
  browserSync.init({
        server: {
            baseDir: "app"
        }
    });
});

// 6
gulp.task('clean', function (){
    return del('dist/*');
});

// 7
gulp.task('copy', function () {
    gulp.src(['./app/fonts/*', './app/images/*'])
        .pipe(gulp.dest('./dist'));
});

// 8
gulp.task('useref', function () {
    return gulp.src(['app/js/*.js', 'dist/css/*.css'])
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

// 9
gulp.task('build', function (callback) {
  runSequence('clean',
              'copy',
              'useref');
});

// 10
gulp.task('default', function (callback) {
  runSequence('sass',
              'brownser-sync',
              'watch');
});
