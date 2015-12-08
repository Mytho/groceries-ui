var gulp = require('gulp'),
  concat = require('gulp-concat'),
  config = require('gulp-ng-config'),
  jshint = require('gulp-jshint'),
  minify = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  paths = {
    css: {
      dest: 'src/css',
      src: [
        'src/css/**/*.css',
        '!src/css/**/*.min.css'
      ]
    },
    js: {
      dest: 'src/js',
      src: [
        'src/js/**/config.js',
        'src/js/**/module.js',
        'src/js/**/directives/*.js',
        'src/js/**/services/*.js',
        'src/js/**/controllers/*.js'
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

gulp.task('css', function() {
  return gulp.src(paths.css.src)
    .pipe(sourcemaps.init())
      .pipe(concat('groceries.min.css'))
    .pipe(sourcemaps.write())
    .pipe(minify())
    .pipe(gulp.dest(paths.css.dest));
})

gulp.task('js', function() {
  return gulp.src(paths.js.src)
    .pipe(sourcemaps.init())
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(concat('groceries.min.js'))
    .pipe(sourcemaps.write())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest));
})

gulp.task('watch', function() {
  build('development');
  gulp.watch(paths.css.src, ['css'])
  gulp.watch(paths.js.src, ['js'])
})
