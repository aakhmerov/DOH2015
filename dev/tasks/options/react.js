module.exports = {
  jsx: {
    files: [{
      expand: true,
      cwd: 'src/js/', // Source Directory
      src: ['**/*.jsx','**/*.js'], // Files to compile
      dest: 'target/js/', // Destination dir after compile
      ext: '.js'
    }]
  }
};
