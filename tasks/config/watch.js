'use strict';

module.exports = {
  styles: {
    files: ['_sass/**/*.scss'],
    tasks: ['css'],
    options: {
      spawn: false,
      livereload: 35729
    }
  },
  scripts: {
    files: ['_frontapp/**/*.js'],
    tasks: ['js'],
    options: {
      spawn: false,
      livereload: 35729
    }
  }
};
