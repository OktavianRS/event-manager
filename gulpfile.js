'use strict';

var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync').create(),
    connect = require('gulp-connect'),
    minifyCss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    wiredep = require('wiredep').stream;

var reload = browserSync.reload;

gulp.task('default', ['watch', 'bower', 'sass'], function() {
  connect.server({
    port: 9001,
    base: 'app',
    open: false
  });

  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: [
        'app'
      ]
    }
  });
});

gulp.task('watch', function() {
  gulp.watch([
    'app/index.html',
    'app/templates/**/*.html',
    'app/components/**/*.html',
    'app/app.js',
    'app/templates/**/*.js',
    'app/components/**/*.js',
    'app/models/*.js',
    'app/factory/*.js'
  ]).on('change', reload);
  gulp.watch('bower.json', ['bower']);
  gulp.watch([
        'app/style.scss',
        'app/_settings.scss',
        'app/templates/**/*.scss',
        'app/templates/**/**/*.scss',
        'app/components/**/*.scss'
      ], ['sass']
  );

});

gulp.task('sass', function() {
  return gulp.src('app/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('app'))
      .pipe(reload({stream: true}));
});

gulp.task('bower', function() {
  gulp.src('app/index.html')
      .pipe(wiredep({
        directory: "app/bower_components"
      }))
      .pipe(gulp.dest('./app'));
});

gulp.task('html', function() {
  return gulp.src('app/**/*.html', !'app/bower_components/*.html', !'app/bower_components/**/*.html')
      .pipe(gulp.dest('dist/'));
});

gulp.task('images', function() {
  return gulp.src(['app/images/*.png', 'app/images/**/*.svg'])
      .pipe(gulp.dest('dist/images/'));
});

gulp.task('build', ['bower', 'sass', 'html', 'images'], function() {
  return gulp.src('app/index.html')
      .pipe(useref())
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function() {
  return gulp.src(['dist'])
      .pipe(clean());
});