var gulp = require('gulp'),
  concat = require('gulp-concat'),
  minify = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  paths = {
    css: {
      dest: 'src/css/',
      src: [
        'src/css/**/*.css',
        '!src/css/**/*.min.css'
      ]
    }
  };

gulp.task('css', function() {
  return gulp.src(paths.css.src)
    .pipe(sourcemaps.init())
      .pipe(concat('groceries.min.css'))
    .pipe(sourcemaps.write())
    .pipe(minify())
    .pipe(gulp.dest(paths.css.dest))
})

gulp.task('watch', function() {
  gulp.watch(paths.css.src, ['css'])
})
