module.exports = {
  less: {
    options: {
      compress: true,
      yuicompress: true,
      optimization: 2,
      paths: ["src/less"]
    },
    files: {
      "public/css/main.css": "src/less/styles.less"
    }

  }
};
