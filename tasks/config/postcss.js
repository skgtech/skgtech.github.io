'use strict';

module.exports = {
  options: {
    map: true,
    processors: [
      require('autoprefixer-core')(),
      require('csswring')
    ]
  },
  dev: {
    src: 'css/*.css'
  }
};