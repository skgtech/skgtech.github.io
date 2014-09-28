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
    },
    shell: {
      options: {
        stdout: true,
      },
      jekyllServer: {
        command: 'rm -rf _site/*; jekyll build --watch',
      },
      jekyllBuild: {
        command: 'rm -rf _site/*; jekyll build',
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
          'assets/css/styles.css': ['temp/styles-expanded.css']
        }
      }
    },
    browserify: {
      dist: {
	files: {
	  'temp/app.js': ['_frontapp/app.js'],
	},
      }
    },
    uglify: {
      dist: {
	files: {
	  'assets/app.js': ['temp/app.js']
	}
      }
    },
    watch: {
      styles: {
        files: ['assets/styles/*.less'],
        tasks: ['css'],
      },
      app: {
	files: ['_frontapp/**/*.js'],
	tasks: ['build'],
      }
    },

    open: {
      server: {
        path: 'http://localhost:9003/'
      }
    },
    parallel: {
      devel: {
        options: {
          stream: true
        },
        tasks: [{
          grunt: true,
          args: ['connect:server'],
        }, {
          grunt: true,
          args: ['shell:jekyllServer']
        }, {
          grunt: true,
          args: ['watch:styles']
        }, {
          grunt: true,
	  args: ['watch:app']
	}, {
	  grunt: true,
          args: ['open:server']

        }]
      },
    },
    connect: {
      server: {
        options: {
          port: 9003,
          base: '_site',
          livereload: true,
          keepalive: true,
        }
      }
    },
  });

  grunt.registerTask('server', [
    'parallel:devel',
  ]);

  grunt.registerTask('build', 'browserify and uglify', [
    'browserify:dist',
    'uglify:dist',
  ]);

  grunt.registerTask('css', 'Compile and minify less styles', [
    'less:development',
    'cssmin:combine',
  ]);

  // Default task.
  grunt.registerTask('default', 'server');

};
