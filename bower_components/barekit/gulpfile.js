var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    prefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var paths = {
    styles: 'css/**/*.styl',
    scripts: [
        'js/modules/core.js',
        'js/modules/accordion.js',
        'js/modules/dropdown-nav.js',
        'js/modules/modal.js',
        'js/modules/off-canvas.js',
        'js/modules/tabs.js',
        'js/modules/toggle.js'
    ]
};

gulp.task('styles', function () {
    gulp.src('css/barekit.styl')
        .pipe(stylus())
        .pipe(prefix('last 2 version', 'ie 8', 'ie 9'))
        .pipe(gulp.dest('./css'))
});

gulp.task('scripts', function () {
    gulp.src(paths.scripts)
        .pipe(concat('barekit.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

gulp.task('watch', function () {
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.html, ['html']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [
    'styles',
    'scripts',
    'watch'
]);