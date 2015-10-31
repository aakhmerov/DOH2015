var path = require('path');

module.exports = function (grunt) {
  return {
    build: {
      entry: {
        components: grunt.file.expand({cwd: 'public/js/components'}, "*")
          .map(function (page) {
            return path.join(path.resolve('public/js/components'), page);
          })
      },
      output: {
        path: './public/js/',
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
