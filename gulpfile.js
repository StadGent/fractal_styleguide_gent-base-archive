'use strict';

const packageInfo = require('./package.json');
const packageVersion = packageInfo.version;

/*
* Node core modules.
*/
const fs = require('fs');
const path = require('path');

/*
* NPM based modules
*/
const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const watch = require('gulp-watch');
const sourcemaps = require('gulp-sourcemaps');
const sassLint = require('gulp-sass-lint');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const copy = require('gulp-contrib-copy');
const rename = require('gulp-rename');
const  eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const es = require('event-stream');
const minify = require('gulp-minify');
const npm = require('npm');
const bump = require('gulp-bump');
const inject = require('gulp-inject');

const yargs = require('yargs');


/*
* Require the Fractal module
*/
const fractal = require('@frctl/fractal').create();
const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

/**
 * Require additional fractal modules
 */
const twigAdapter = require('@frctl/twig');

/*
* Give your project a title.
*/
fractal.set('project.title', 'City of Ghent Style Guide - Version ' + packageVersion);

/*
* Tell Fractal where to look for components.
*/
fractal.components.set('path', path.join(__dirname, 'components'));
fractal.components.set('default.preview', '@preview');
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

/*
 *
 * Inject SASS partial paths as imports in main_cli.scss.
 *
 */
gulp.task('styles:inject', () => {
  const injectSettingsFiles= gulp.src('components/00-settings/**/*.s+(a|c)ss', {read: false});
  const injectMixinsFiles= gulp.src('components/01-mixins/**/*.s+(a|c)ss', {read: false});
  const injectBaseFiles= gulp.src('components/11-base/**/*.s+(a|c)ss', {read: false});
  const injectAtomsFiles= gulp.src('components/21-atoms/**/*.s+(a|c)ss', {read: false});
  const injectMoleculesFiles= gulp.src('components/31-molecules/**/*.s+(a|c)ss', {read: false});
  const injectOrganismsFiles= gulp.src('components/41-organisms/**/*.s+(a|c)ss', {read: false});

  // function transformFilepath(filepath) {
  //   return '@import "' + filepath + '";';
  // }

  var transformFilepath  = (filepath) => `@import "${filepath}";`;

  const injectSettingsOptions = {
    transform: transformFilepath,
    starttag: '// inject:settings',
    endtag: '// endinject',
    addRootSlash: false,
    relative: true
  };

  const injectMixinsOptions = {
    transform: transformFilepath,
    starttag: '// inject:mixins',
    endtag: '// endinject',
    addRootSlash: false,
    relative: true
  };

  const injectBaseOptions = {
    transform: transformFilepath,
    starttag: '// inject:base',
    endtag: '// endinject',
    addRootSlash: false,
    relative: true
  };

  const injectAtomsOptions = {
    transform: transformFilepath,
    starttag: '// inject:atoms',
    endtag: '// endinject',
    addRootSlash: false,
    relative: true
  };

  const injectMoleculesOptions = {
    transform: transformFilepath,
    starttag: '// inject:molecules',
    endtag: '// endinject',
    addRootSlash: false,
    relative: true
  };

  const injectOrganismsOptions = {
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
gulp.task('styles:dist', () => {
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
gulp.task('styles:build', ['styles:inject', 'fractal:build'], () => {
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
gulp.task('styles:validate', () =>
  gulp.src('components/**/*.s+(a|c)ss')
  .pipe(sassLint({
    configFile: './.sass-lint.yml'
  }))
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError())
);

/*
 *
 * Watch SCSS files For Changes.
 *
 */
gulp.task('styles:watch', () => gulp.watch('./components/**/*.scss', ['styles:dist']));

/*
 *
 * Extract SCSS and their assets (like fonts) from the components folder.
 *
 */
gulp.task('styles:extract', ['fractal:build', 'styles:build', 'styles:dist'], () =>
  gulp.src('components/**/*.s+(a|c)ss')
    .pipe(gulp.dest('./build/styleguide/sass/'))
);

/*
 *
 * Copy JS files during development.
 *
 */
gulp.task('js:dist', ['styles:dist'], () =>
  gulp.src('components/**/*.js')
    .pipe(rename({
      dirname: '',
      suffix: "-min"
    }))
    .pipe(gulp.dest('./public/styleguide/js/'))
);

/*
 *
 * Copy JS files during Fractal build.
 *
 */
gulp.task('js:build', ['fractal:build'], () =>
  gulp.src('components/**/*.js')
    .pipe(rename({dirname: ''}))
    .pipe(minify({
      noSource: true
    }))
    .pipe(gulp.dest('./build/styleguide/js/'))
);

/*
 *
 * Validate JS files.
 *
 */
gulp.task('js:validate', () =>
  gulp.src('components/**/*.js')
    .pipe(eslint({
      configFile: './.eslintrc'
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

/*
 *
 * Watch JS files For Changes.
 *
 */
gulp.task('js:watch', () => gulp.watch('./components/**/*.js', ['js:validate', 'js:dist']));

/*
 *
 * Minify images.
 *
 */
gulp.task('images:minify', ['fractal:build', 'styles:build', 'styles:dist'], (cb) =>
  gulp.src(['components/**/*.png','components/**/*.jpg','components/**/*.gif','components/**/*.jpeg', 'components/**/*.svg'])
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    })).pipe(gulp.dest('build/styleguide/sass')).on('end', cb).on('error', cb)
);

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */
gulp.task('fractal:start', () => {
  const server = fractal.web.server({
    sync: true
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  }).catch(() => logger.error('Fractal server failed to start'));
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
gulp.task('fractal:build', () => {
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
      logger.success('Fractal build completed!');
  }).catch(() => logger.error('Fractal server failed to start'));
});

/*
 * Publish to the NPM public registry.
 */
gulp.task('publish:npm', (callback) => {

  const argv = yargs
    .options({
      username: {
        demand: true,
        alias: 'u',
        describe: 'NPM user name',
        string: true
      }
    })
    .options({
      password: {
        demand: true,
        alias: 'p',
        describe: 'NPM password',
        string: true
      }
    })
    .options({
      email: {
        demand: true,
        alias: 'e',
        describe: 'E-mail',
        string: true
      }
    })
    .help()
    .alias( 'help', 'h')
    .argv;


  var username = argv.username;
  var password = argv.password;
  var email = argv.email;

  var uri = "http://registry.npmjs.org/";

  npm.load(null, (loadError) => {
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

    npm.registry.adduser(uri, addUserParams, (addUserError, data, raw, res) => {
      if (addUserError) {
          return callback(addUserError);
      }
      var metadata = require('./package.json');
      metadata = JSON.parse(JSON.stringify(metadata));
      npm.commands.pack([], function (packError) {
        if (packError) {
            return callback(packError);
        }
        const fileName = metadata.name + '-' + metadata.version + '.tgz';
        const bodyPath = require.resolve('./' + fileName);
        const body = fs.createReadStream(bodyPath);
        const publishParams = {
            metadata: metadata,
            access: 'public',
            body: body,
            auth: auth
        };
        npm.registry.publish(uri, publishParams, (publishError, resp) => {
            if (publishError) {
                return callback(publishError);
            }
            console.log(`Publish succesfull: ${JSON.stringify(resp, undefined, 2)}`);
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
