module.exports = {
  jsx: {
    files: [{
      expand: true,
      cwd: 'src/js/', // Source Directory
      src: ['**/*.jsx','**/*.js'], // Files to compile
      dest: 'public/js/', // Destination dir after compile
      ext: '.js'
    }]
  }
};
