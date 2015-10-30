module.exports = {
    less: {

        options: {
          compress: true,
          yuicompress: true,
          optimization: 2,
          paths: ["assets/css"]
        },
        files: {
          // target.css file: source.less file
          "assets/css/main.css": "less/main.less"
        }
      
    }
};
