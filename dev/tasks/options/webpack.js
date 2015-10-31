var path = require('path');

module.exports = function() {
  return {
    build: {
      entry: {
        components: './target/js/components/gridComponent.js'
      },
      output: {
        path: './target/js/',
          filename: '[name].js'
      },
      stats: {
        // Configure the console output
        colors: true,
          modules: true,
          reasons: true
      },
      progress: true,
        keepalive: false
    }
  }
};
