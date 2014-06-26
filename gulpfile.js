var gulp = require('gulp'),
    connect = require('gulp-connect'),
    stylus = require('gulp-stylus'),
    prefix = require('gulp-autoprefixer');

var paths = {
    styles: 'css/**/*.styl',
    html: './*.html'
};

gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src(paths.html)
        .pipe(connect.reload());
});

gulp.task('styles', function () {
    gulp.src('css/bare-ninja.styl')
        .pipe(stylus())
        .pipe(prefix('last 2 version', 'ie 8', 'ie 9'))
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.html, ['html']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['styles', 'connect', 'watch']);