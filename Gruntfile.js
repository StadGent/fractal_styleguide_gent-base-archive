'use strict';

module.exports = function (grunt) {

  /*
   * Require the path module
   */
  const path = require('path');

  /*
   * Require the Fractal module
   */
  const fractal = module.exports = require('@frctl/fractal').create();

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


  grunt.initConfig({
    // Watch commands.
    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['components/{,**/}*.{scss,sass}'],
        tasks: [
          'sasslint',
          'sass:dist',
          'postcss:dist'
        ],
        options: {
          livereload: false
        }
      }
    },

    // Copy SCSS and JS files to the correct directories.
    copy: {
      main: {
        expand: true,
        cwd: 'components/',
        src: ['**/*.scss'],
        dest:'scss/'
      },
      js_dist: {
        expand: true,
        src: ['components/**/*.js'],
        dest:'public/js/',
        flatten: true,
        filter: 'isFile'

      },
      js_build: {
        expand: true,
        src: ['components/**/*.js'],
        dest:'build/js/',
        flatten: true,
        filter: 'isFile'

      }
    },

    // Transpilation with LibSASS
    sass:{
      dist:{
        options: {
          style: 'nested',
          sourcemap: true,
          importer: require('node-sass-globbing')
        },
        files: {
          'public/css/main.css' : 'components/main.scss'
        }
      },
      build: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
          importer: require('node-sass-globbing')
        },
        files: {
          'public/css/main.css' : 'components/main.scss'
        }
      }
    },

    // Sass linting task.
    sasslint: {
      options: {
        configFile: '.sass-lint.yml'
      },
      target: ['components/**/*.s+(a|c)ss']
    },

    // All postCSS tasks.
    postcss: {
      dist: {
        options: {
          processors: [
            require('autoprefixer')({
              browsers: 'last 5 versions'
            })
          ]
        },
        src: 'public/css/main.css'
      },
      build: {
        options: {
          processors: [
            require('autoprefixer')({
              browsers: 'last 5 versions'
            }),
            require('cssnano')()
          ]
        },
        src: 'build/css/components/main.css'
      }
    },

    // Run Fractal and Grunt at the same time.
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      default: {
        tasks: [
          "watch:sass",
          "fractal:watch"
        ]
      },
      build: {
        tasks: [
          "sass:build",
          "postcss:build",
          "fractal:build"
        ]
      }
    }
  });


  grunt.registerTask('fractal:watch', 'Run fractal server', function () {
    this.async();
    const server = fractal.web.server({
      sync: true
    });
    server.start().then(function() {
      grunt.log.writeln('').write('Fractal server is now running at ' + server.url);
    });
  });

  grunt.registerTask('fractal:build', 'Build styleguide', function() {
    this.async();

    const builder = fractal.web.builder();
    builder.on('progress', function (completed, total) {
      grunt.log.writeln('').write('Exported ' + completed + ' of ' + total + ' items.');
    });
    builder.on('error', function(err) {
      grunt.log.writeln('').write(err.message);
    });
    builder.build().then(function() {
      grunt.log.writeln('').write('Fractal build completed!');
    });
  });

  grunt.registerTask('build', 'Compiles the styleguide.', ['concurrent:build', 'copy']);
  grunt.registerTask('default', 'Default watch task', ['concurrent']);

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass-lint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-concurrent');
};
