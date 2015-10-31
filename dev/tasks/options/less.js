module.exports = {
  less: {
    options: {
      compress: true,
      yuicompress: true,
      optimization: 2,
      paths: ["src/less"]
    },
    files: {
      "target/css/main.css": "src/less/styles.less"
    }

  }
};
