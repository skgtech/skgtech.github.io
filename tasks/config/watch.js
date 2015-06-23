'use strict';

module.exports = {
  scripts: {
    files: ['_sass/**/*.scss'],
    tasks: ['css'],
    options: {
      spawn: false,
      livereload: 35729
    },
  },
};
