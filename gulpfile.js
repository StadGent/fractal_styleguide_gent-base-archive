'use strict';

var packageInfo = require('./package.json');
var packageVersion = packageInfo.version;

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
fractal.set('project.title', 'City of Ghent Style Guide - Version ' + packageVersion);

/*
* Tell Fractal where to look for components.
*/
fractal.components.set('path', path.join(__dirname, 'components'));
fractal.components.set('default.preview', '@preview');
const twigAdapter = require('@frctl/twig');
fractal.components.engine(twigAdapter);
fractal.components.set('ext', '.twig');

/*
* Set custom statuses.
*/
fractal.components.set('statuses', {
  deprecated: {
    label: "deprecated",
    description: "Deprecated.",
    color: "#dd5e01"
  },
  alpha: {
    label: "alpha",
    description: "Alpha software can be unstable and could cause crashes or data loss.",
    color: "#551A8B"
  },
  beta: {
    label: "beta",
    description: "Work in progress. Implement with caution.",
    color: "#ff9233"
  },
  ready: {
    label: "Ready",
    description: "Ready to implement.",
    color: "#29cc29"
  }
});

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
var sassLint = require('gulp-sass-lint');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var copy = require('gulp-contrib-copy');
var rename = require('gulp-rename');
var  eslint = require('gulp-eslint');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var es = require('event-stream');
var minify = require('gulp-minify');
var npm = require('npm');
var fs = require('fs');
var argv = require('yargs').argv;
var bump = require('gulp-bump');
var inject = require('gulp-inject');

/*
 *
 * Inject SASS partial paths as imports in main_cli.scss.
 *
 */
gulp.task('styles:inject', function() {
  var injectSettingsFiles= gulp.src('components/00-settings/**/*.s+(a|c)ss', {read: false});
  var injectMixinsFiles= gulp.src('components/01-mixins/**/*.s+(a|c)ss', {read: false});
  var injectBaseFiles= gulp.src('components/11-base/**/*.s+(a|c)ss', {read: false});
  var injectAtomsFiles= gulp.src('components/21-atoms/**/*.s+(a|c)ss', {read: false});
  var injectMoleculesFiles= gulp.src('components/31-molecules/**/*.s+(a|c)ss', {read: false});
  var injectOrganismsFiles= gulp.src('components/41-organisms/**/*.s+(a|c)ss', {read: false});

  function transformFilepath(filepath) {
    return '@import "' + filepath + '";';
  }

  var injectSettingsOptions = {
    transform: transformFilepath,
    starttag: '// inject:settings',
    endtag: '// endinject',
    addRootSlash: false,
    relative: true
  };

  var injectMixinsOptions = {
    transform: transformFilepath,
    starttag: '// inject:mixins',
    endtag: '// endinject',
    addRootSlash: false,
    relative: true
  };

  var injectBaseOptions = {
    transform: transformFilepath,
    starttag: '// inject:base',
    endtag: '// endinject',
    addRootSlash: false,
    relative: true
  };

  var injectAtomsOptions = {
    transform: transformFilepath,
    starttag: '// inject:atoms',
    endtag: '// endinject',
    addRootSlash: false,
    relative: true
  };

  var injectMoleculesOptions = {
    transform: transformFilepath,
    starttag: '// inject:molecules',
    endtag: '// endinject',
    addRootSlash: false,
    relative: true
  };

  var injectOrganismsOptions = {
    transform: transformFilepath,
    starttag: '// inject:organisms',
    endtag: '// endinject',
    addRootSlash: false,
    relative: true
  };

  return gulp.src('components/main_cli.scss')
      .pipe(inject(injectSettingsFiles, injectSettingsOptions))
      .pipe(inject(injectMixinsFiles, injectMixinsOptions))
      .pipe(inject(injectBaseFiles, injectBaseOptions))
      .pipe(inject(injectAtomsFiles, injectAtomsOptions))
      .pipe(inject(injectMoleculesFiles, injectMoleculesOptions))
      .pipe(inject(injectOrganismsFiles, injectOrganismsOptions))
      .pipe(gulp.dest('components/'));
});

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
  gulp.src('components/**/*.s+(a|c)ss')
    .pipe(sassGlob())
    .pipe(sassLint({
      configFile: './.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'nested',
      includePaths: ['node_modules/breakpoint-sass/stylesheets']
    })).on('error', sass.logError)
    .pipe(autoprefixer({
        browsers: ['last 5 versions']
    }))
    .pipe(sourcemaps.write())
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
 *
 */
gulp.task('styles:build', ['styles:inject', 'fractal:build'], function() {
  gulp.src('components/**/*.s+(a|c)ss')
    .pipe(sassGlob())
    .pipe(sassLint({
      configFile: './.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/breakpoint-sass/stylesheets']
    })).on('error', sass.logError)
    .pipe(autoprefixer({
        browsers: ['last 5 versions']
    }))
    .pipe(gulp.dest('./build/css/'))
    .pipe(cssnano())
    .pipe(gulp.dest('./build/css/'))
});

/*
 *
 * Validate SCSS files.
 *
 */
gulp.task('styles:validate', function() {
  return gulp.src('components/**/*.s+(a|c)ss')
  .pipe(sassLint({
    configFile: './.sass-lint.yml'
  }))
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError());
});

/*
 *
 * Watch SCSS files For Changes.
 *
 */
gulp.task('styles:watch', function() {
  gulp.watch('./components/**/*.scss', ['styles:dist']);
});

/*
 *
 * Extract SCSS and their assets (like fonts) from the components folder.
 *
 */
gulp.task('styles:extract', ['fractal:build', 'styles:build', 'styles:dist'], function() {
  gulp.src('components/**/*.s+(a|c)ss')
    .pipe(gulp.dest('./build/styleguide/sass/'))
});

/*
 *
 * Copy JS files during development.
 *
 */
gulp.task('js:dist', ['styles:dist'], function() {
  gulp.src('components/**/*.js')
    .pipe(rename({
      dirname: '',
      suffix: "-min"
    }))
    .pipe(gulp.dest('./public/styleguide/js/'));
});

/*
 *
 * Copy JS files during Fractal build.
 *
 */
gulp.task('js:build', ['fractal:build'], function() {
  gulp.src('components/**/*.js')
    .pipe(rename({dirname: ''}))
    .pipe(minify({
      noSource: true
    }))
    .pipe(gulp.dest('./build/styleguide/js/'));
});

/*
 *
 * Validate JS files.
 *
 */
gulp.task('js:validate', function() {
  return gulp.src('components/**/*.js')
    .pipe(eslint({
      configFile: './.eslintrc'
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/*
 *
 * Watch JS files For Changes.
 *
 */
gulp.task('js:watch', function() {
  gulp.watch('./components/**/*.js', ['js:validate', 'js:dist']);
});

/*
 *
 * Minify images.
 *
 */
gulp.task('images:minify', ['fractal:build', 'styles:build', 'styles:dist'], function(cb) {
  gulp.src(['components/**/*.png','components/**/*.jpg','components/**/*.gif','components/**/*.jpeg', 'components/**/*.svg'])
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    })).pipe(gulp.dest('build/styleguide/sass')).on('end', cb).on('error', cb);
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
 * Publish to the NPM public registry.
 */
gulp.task('publish:npm', function(callback){
  var username = argv.username;
  var password = argv.password;
  var email = argv.email;

  if (!username) {
      var usernameError = new Error("Username is required as an argument --username exampleUsername");
      return callback(usernameError);
  }
  if (!password) {
      var passwordError = new Error("Password is required as an argument --password  examplepassword");
      return callback(passwordError);
  }
  if (!email) {
      var emailError = new Error("Email is required as an argument --email example@email.com");
      return callback(emailError);
  }

  var uri = "http://registry.npmjs.org/";

  npm.load(null, function (loadError) {
      if (loadError) {
          return callback(loadError);
      }
      var auth = {
          username: username,
          password: password,
          email: email,
          alwaysAuth: true
      };
      var addUserParams = {
          auth: auth
      };

    npm.registry.adduser(uri, addUserParams, function (addUserError, data, raw, res) {
      if (addUserError) {
          return callback(addUserError);
      }
      var metadata = require('./package.json');
      metadata = JSON.parse(JSON.stringify(metadata));
      npm.commands.pack([], function (packError) {
        if (packError) {
            return callback(packError);
        }
        var fileName = metadata.name + '-' + metadata.version + '.tgz';
        var bodyPath = require.resolve('./' + fileName);
        var body = fs.createReadStream(bodyPath);
        var publishParams = {
            metadata: metadata,
            access: 'public',
            body: body,
            auth: auth
        };
        npm.registry.publish(uri, publishParams, function (publishError, resp) {
            if (publishError) {
                return callback(publishError);
            }
            console.log("Publish succesfull: " + JSON.stringify(resp));
            return callback();
        });
      })
    });

  });
});


/*
 * Bump the version number of the package.
 */
gulp.task('bump', function(callback){
  var type = argv.type;
  var bumpType = '';

  // Validation of the gulp arguments.
  if (!type) {
    var typeError = new Error("Type is required as an argument --type minor");
      return callback(typeError);
  }

  // Determine type of versioning.
  switch(type) {
    case 'prerelease':
      bumpType = 'prerelease';
    break;
    case 'patch':
      bumpType = 'patch';
    break;
    case 'minor':
      bumpType = 'minor';
    break;
    case 'major':
      bumpType = 'major';
    break;
    default:
      var typeError = new Error("Type is a requires one of four options: prerelease, patch, minor, major");
      return callback(typeError);
  }

  // Change version number of package.json file.
  gulp.src('./package.json')
    .pipe(bump({
      type: bumpType
    }))
    .pipe(gulp.dest('./'));

  return callback();
});

/*
 *
 * Default tasks:
 * Usage:
 *  gulp
 *  gulp watch
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
gulp.task('compile', ['fractal:build', 'styles:build', 'styles:dist', 'styles:extract', 'js:build', 'js:dist', 'images:minify']);
gulp.task('compile:dev', ['fractal:build', 'styles:dist', 'js:dist', 'images:minify']);

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

/*
 *
 * Publish task:
 * Usage:
 *  gulp publish
 *
 *  Used to publish to the public NPM registry.
 *
 */
gulp.task('publish', ['publish:npm']);
