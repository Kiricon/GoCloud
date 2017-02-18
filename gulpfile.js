const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-ruby-sass');
const cleanCSS = require('gulp-clean-css');
const webpack = require('gulp-webpack');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');


const paths = {
    sass: './public/scss/**/*.scss',
    html: './public/index.html',
    js: './public/js/**/*.js',
};

gulp.task('convertcss', () => {
  return sass(paths.sass)
          .on('error', sass.logError)
          .pipe(cleanCSS())
          .pipe(gulp.dest('./public/css'))
          .pipe(browserSync.stream());
});

gulp.task('buildcss', () => {
  return sass(paths.sass)
          .on('error', sass.logError)
          .pipe(cleanCSS())
          .pipe(gulp.dest('./public/css'));
});

gulp.task('webpack', () => {
    return gulp.src('./public/js/index.js')
    .pipe(webpack( require('./webpack.config.js')))
    .pipe(gulp.dest('./public/js'));
});
gulp.task('buildwebpack', () => {
    return gulp.src('./public/js/index.js')
    .pipe(webpack( require('./webpack.config.js')))
    .pipe(babel({
            presets: ['es2015'],
        }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('buildHtml', () => {
    gulp.src('./public/index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('buildImages', () => {
    gulp.src('./public/imgs/*')
    .pipe(gulp.dest('./dist/imgs'));
});

gulp.task('watchjs', ['webpack'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('default', () => {
    browserSync.init({
        server: {
        baseDir: './public',
        },
    });

    gulp.watch(paths.html).on('change', browserSync.reload);
    gulp.watch(paths.sass, ['convertcss']);

    gulp.watch(paths.js, ['watchjs']);
});

gulp.task('build',
    ['buildHtml', 'buildwebpack', 'buildcss', 'buildImages'],
    () => {
    console.log('Project Build!');
});