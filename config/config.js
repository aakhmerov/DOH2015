var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'airplanemeal'
    },
    port: 3000,
    db: 'mongodb://localhost/airplanemeal-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'airplanemeal'
    },
    port: 3000,
    db: 'mongodb://localhost/airplanemeal-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'airplanemeal'
    },
    port: 3000,
    db: 'mongodb://localhost/airplanemeal-production'
  }
};

module.exports = config[env];
