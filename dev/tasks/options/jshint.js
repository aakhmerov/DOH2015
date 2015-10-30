module.exports = {
    files: ['Gruntfile.js', './**/*.js', './test/**/*.js'],
    options: {
        sub: true,
        boss: true,
        globals: {
            jQuery: true
        }
    }
};
