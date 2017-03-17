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
    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['components/{,**/}*.{scss,sass}'],
        tasks: ['compass:dist'],
        options: {
          livereload: false
        }
      }
    },

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
        flatten: true, filter: 'isFile',

      },
      js_build: {
        expand: true,
        src: ['components/**/*.js'],
        dest:'build/js/',
        flatten: true, filter: 'isFile',

      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'components',
          cssDir: 'public/css',
          specify: 'components/main.scss',
          raw: 'preferred_syntax = :sass\n', // Use `raw` since it's not directly available
          require: 'sass-globbing',
          outputStyle: 'compressed'
        }
      },
      build: {
        options: {
          sassDir: 'components',
          cssDir: 'build/css',
          specify: 'components/main.scss',
          raw: 'preferred_syntax = :sass\n', // Use `raw` since it's not directly available
          require: 'sass-globbing',
          outputStyle: 'compressed'
        }
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      default: {
        tasks: ["watch:sass", "fractal:watch"]
      },
      build: {
        tasks: ["compass:build", "fractal:build"]
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

  grunt.registerTask('sasslib', 'Compiles the sass lib.', ['copy']);
  grunt.registerTask('styleguide', 'Compiles the styleguide.', ['concurrent:build', 'copy']);
  grunt.registerTask('default', 'Default watch task', ['concurrent']);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-concurrent');
};
