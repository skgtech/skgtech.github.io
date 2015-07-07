/**
 * Browserify config
 */

module.exports = {
  dist: {
    files: {
      'assets/js/app.src.js': ['_frontapp/app.js'],
    },
  }
};
