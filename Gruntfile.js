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
      jekyll: {
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

    watch: {
      options: {
        livereload: true
      },
      less: {
        files: ['assets/themes/thanpolas/less/*.less'],
        tasks: ['lessCopy']
      },
      jekyllSources: {
        files: [
          // capture all except css
          '*.html', '*.yml', 'assets/js/**.js', '_posts/**',
          'projects/**', 'blog/**', 'about/**', '_includes/**',
          'atom.xml', '**/*.md'
        ],
        tasks: ['shell:jekyll']
      }
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
        path: 'http://localhost:<%= connect.server.options.port %>/'
      }
    }
  });

  // less watch
  grunt.registerTask('lessCopy', ['less:development', 'copy:css']);

  grunt.registerTask('server', [
    'connect:server',
    'open:server',
    'watch'
  ]);

  // Default task.
  grunt.registerTask('default', 'server');

};
