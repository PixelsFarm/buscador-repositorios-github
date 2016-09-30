//=========
// GULP.js
//=========

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var replace = require('gulp-replace');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


gulp.task('sass', function () {
    gulp.src('./app/scss/*.scss')
        .pipe(sass().on('error', sass.logError)) 
        .pipe(cleanCss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./dist/css'))
});


gulp.task('concat-scripts', function() {  
    return gulp.src('./app/js/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('move-plantillas', function() {  
    return gulp.src('./app/plantillas/*.html')
        .pipe(gulp.dest('./dist/plantillas'));
});


gulp.task('browser-sync', function() {
    browserSync.init(['./dist/**/*'], {
        server: {
            baseDir: './dist'
        }
    });
});

// process HTML with cache busting
gulp.task('replace', function() {
    return gulp.src('app/*.html')
        .pipe(replace("&#123;&#123;cachebuster&#125;&#125;", Math.floor((Math.random() * 100000) + 1)))
        .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['sass', 'concat-scripts', 'move-plantillas', 'browser-sync', 'replace'], function () {
    gulp.watch("./app/scss/*.scss", ['sass']);
    gulp.watch("./app/js/*.js", ['concat-scripts']);
    gulp.watch(['./app/*.html'], ['replace']);
});