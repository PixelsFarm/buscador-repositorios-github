var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var git = require('gulp-git');

gulp.task('sass', function () {
    gulp.src('./app/scss/*.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('css'));
});

gulp.task('browser-sync', function() {
    browserSync.init(['./app/*.html', './app/sass/*.scss', './app/css/*.css', './app/js/*.js', './app/img/*.png', './app/data/*.json'], {
        server: {
            baseDir: './app'
        }
    });
});

/*gulp.task('init', function(){
  git.init(function (err) {
    if (err) throw err;
  });
});

gulp.task('add', function(){
  return gulp.src('./app/*')
    .pipe(git.add());
});

gulp.task('commit', function(){
  return gulp.src('./app/*')
    .pipe(git.commit('initial commit'));
});

gulp.task('push', function(){
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});*/

gulp.task('default', ['sass', 'browser-sync'/*, 'init', 'add', 'commit', 'push'*/], function () {
    gulp.watch("./app/scss/*.scss", ['sass']);
});