'use strict';

/*
* Require the path module
*/
const path = require('path');

/*
* Require the Fractal module
*/
const fractal = module.exports = require('@frctl/fractal').create();
const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

/*
* Give your project a title.
*/
fractal.set('project.title', 'StyleGuide');

/*
* Tell Fractal where to look for components.
*/
fractal.components.set('path', path.join(__dirname, 'components'));
fractal.components.set('default.preview', '@preview');
const twigAdapter = require('@frctl/twig');
fractal.components.engine(twigAdapter);
fractal.components.set('ext', '.twig');

/*
* Tell Fractal where to look for documentation pages.
*/
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
* Tell the Fractal web preview plugin where to look for static assets.
*/
fractal.web.set('static.path', path.join(__dirname, 'public'));
fractal.web.set('static.mount', '');
fractal.web.set('builder.dest', __dirname + '/build');

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var scsslint = require('gulp-scss-lint');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var copy = require('gulp-contrib-copy');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var imageop = require('gulp-image-optimization');

/*
 *
 * Development settings of your styles.
 * Includes:
 *  Sass globbing
 *  SCSS linting
 *  Nested output style
 *  Sourcemaps (dev only!)
 *  Autoprefixer
 */
gulp.task('styles:dist', function() {
  gulp.src('components/main.scss')
    .pipe(sassGlob())
    .pipe(scsslint({
      'config': './.scss-lint.yml'
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'nested'})).on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
        browsers: ['last 5 versions']
    }))
    .pipe(gulp.dest('./public/css/'))
});

/*
 *
 * Build settings for your styles.
 * Includes:
 *  Sass globbing
 *  SCSS linting
 *  Compresssed output style
 *  Autoprefixer
 *  Minify  CSS (with cssnano)
 *
 */
gulp.task('styles:build', function() {
  gulp.src('components/main.scss')
    .pipe(sassGlob())
    .pipe(scsslint({
      'config': './.scss-lint.yml'
    }))
    .pipe(sass({outputStyle: 'compressed'})).on('error', sass.logError)
    .pipe(autoprefixer({
        browsers: ['last 5 versions']
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('./build/css/'))
});

/*
 *
 * Validate SCSS files.
 *
 */
gulp.task('styles:validate', function() {
  return gulp.src('components/**/*.scss')
  .pipe(scsslint({
    'config': './.scss-lint.yml'
  }))
});

/*
 *
 * Watch SCSS files For Changes.
 *
 */
gulp.task('styles:watch', function() {
  gulp.watch('./components/**/*.scss', ['styles:dist', 'styles:validate']);
});

/*
 *
 * Copy JS files during development.
 *
 */
gulp.task('js:dist', ['styles:dist'], function() {
  gulp.src('components/**/*.js')
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./public/js/'));
});

/*
 *
 * Copy JS files during Fractal build.
 *
 */
gulp.task('js:build', ['fractal:build'], function() {
  gulp.src('components/**/*.js')
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./build/js/'));
});

/*
 *
 * Validate JS files.
 *
 */
gulp.task('js:validate', function() {
  return gulp.src('components/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/*
 *
 * Watch JS files For Changes.
 *
 */
gulp.task('js:watch', function() {
  gulp.watch('./components/**/*.js', ['js:validate']);
});

/*
 *
 * Minify images.
 *
 */
gulp.task('images:minify', function(cb) {
  gulp.src(['components/**/*.png','components/**/*.jpg','components/**/*.gif','components/**/*.jpeg']).pipe(imageop({
    optimizationLevel: 5,
    progressive: true,
    interlaced: true
  })).pipe(gulp.dest('public/images')).on('end', cb).on('error', cb);
});

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */
gulp.task('fractal:start', function(){
  const server = fractal.web.server({
    sync: true
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
});

/*
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * The build destination will be the directory specified in the 'builder.dest'
 * configuration option set above.
 */
gulp.task('fractal:build', function(){
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
      logger.success('Fractal build completed!');
  });
});

/*
 *
 * Default tasks:
 * Usage:
 *  gulp
 *  gullp watch
 *
 * Used for local development to compile and validate after every change.
 *
 */
gulp.task('default', ['fractal:start', 'styles:watch', 'js:watch']);
gulp.task('watch', ['default']);

/*
 *
 * Validate task:
 * Usage:
 *  gulp validate
 *
 *  Used to only validate the SCSS and JS code.
 *
 */
gulp.task('validate', ['styles:validate', 'js:validate']);

/*
 *
 * Compile task:
 * Usage:
 *  gulp compile
 *  gulp compile:dev
 *    Add sourcemaps to the CSS files.
 *
 *  Used to compile production ready SCSS and JS code.
 *
 */
gulp.task('compile', ['fractal:build', 'styles:build', 'js:build', 'images:minify']);
gulp.task('compile:dev', ['fractal:build', 'styles:dist', 'js:build', 'images:minify']);

/*
 *
 * Build task:
 * Usage:
 *  gulp build
 *
 *  Used to validate and build production ready code.
 *
 */
gulp.task('build', ['validate', 'compile']);
