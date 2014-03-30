/*jshint camelcase:false */
/*
 * thessaloniki meetups
 * https://github.com/thessaloniki/meetups
 *
 * Copyright (c) 2014 Thessaloniki contributors
 * Licensed under the MIT license.
 */
module.exports = function(grunt) {
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    copy: {
      dist: {
        files: {
          '_site_git/' : '_site/**'
        }
      },
      css : {
        files: {
          '_site/assets/themes/twitter/css/styles.css': 'temp/styles-expanded.css'
        }
      }
    },
    shell: {
      jekyllServer: {
        command: 'rm -rf _site/*; jekyll build --watch',
        stdout: true
      },
      jekyllBuild: {
        command: 'rm -rf _site/*; jekyll build',
        stdout: true
      }
    },
    less: {
      development: {
        options: {
          paths: ['assets/styles']
        },
        files: {
          'temp/styles-expanded.css': ['assets/styles/boot.less']
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'assets/themes/twitter/css/styles.css': ['temp/styles-expanded.css']
        }
      }
    },
    watch: {
      styles: {
        files: ['assets/styles/*.less'],
        tasks: ['css'],
      },
    },

    connect: {
      server: {
        options: {
          base: '_site/',
          port: 9009
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:4000/'
      }
    },
    parallel: {
      devel: {
        options: {
          stream: true
        },
        tasks: [{
          grunt: true,
          args: ['shell:jekyllServer']
        }, {
          grunt: true,
          args: ['watch:styles']
        }]
      },
    },
  });

  // less watch
  grunt.registerTask('lessCopy', ['less:development', 'copy:css']);

  grunt.registerTask('server', [
    'parallel:devel',
    'open:server',
  ]);

  grunt.registerTask('css', 'Compile and minify less styles', [
    'less:development',
    'cssmin:combine',
  ]);

  // Default task.
  grunt.registerTask('default', 'server');

};
