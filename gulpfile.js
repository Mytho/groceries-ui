var gulp = require('gulp'),
    concat = require('gulp-concat'),
    config = require('gulp-ng-config'),
    minify = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    paths = {
        css: {
            dest: 'src/css',
            src: [
                'src/css/**/*.css',
                '!src/css/**/*.min.css'
            ]
        }
    };

function build(env) {
    return gulp.src('src/config.json')
        .pipe(config('groceries.config', {
            environment: env
        }))
        .pipe(gulp.dest('src/js/groceries'));
}

gulp.task('build', function() {
    return build('production');
})

gulp.task('develop', function() {
    return build('development');
})

gulp.task('css', function() {
    return gulp.src(paths.css.src)
        .pipe(sourcemaps.init())
            .pipe(concat('groceries.min.css'))
        .pipe(sourcemaps.write())
        .pipe(minify())
        .pipe(gulp.dest(paths.css.dest));
})

gulp.task('watch', function() {
  gulp.watch(paths.css.src, ['css'])
})
