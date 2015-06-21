module.exports = function (grunt) {
  require('jit-grunt')(grunt);

  var configs = require('load-grunt-configs')(grunt, {
    config: {
      src: 'tasks/**/*.js'
    }
  });
  grunt.initConfig(configs);

  grunt.registerTask('css', ['sass:dev', 'postcss:dev']);

  grunt.registerTask('jekyllServe', ['shell:jekyllServe']);
  grunt.registerTask('assetsWatch', ['watch']);

  grunt.registerTask('default', ['css', 'parallel']);
  grunt.registerTask('build', ['css', 'shell:jekyllBuild']);
}