var path = require('path');

module.exports = function (grunt) {
  return {
    build: {
      entry: {
        components: grunt.file.expand({cwd: 'target/js/components'}, "*")
          .map(function (page) {
            return path.join(path.resolve('target/js/components'), page);
          })
      },
      output: {
        path: './target/js/',
        filename: '[name].js'
      },
      stats: {
        colors: true,
        modules: true,
        reasons: true
      },
      progress: true,
      keepalive: false
    }
  }
};
