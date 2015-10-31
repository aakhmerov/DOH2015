module.exports = {
  css: {
    files: ['src/**/*.less'],
    tasks: ['less']
  },
  js: {
    files: ['src/**/*.js', 'src/**/*.jsx'],
    tasks: ['react', 'webpack']
  }
};
