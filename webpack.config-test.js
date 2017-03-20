var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/public');
var TEST_DIR = path.join(__dirname, '/test');

var config = {
    entry: `${TEST_DIR}/test.js`,
    output: {
      filename: 'output.js',
      path: `${TEST_DIR}`,
    },
   module : {
    loaders : [
      {
        test : /\.(js|jsx)?/,
        include: [SRC_DIR, TEST_DIR],
        exclude: '/node_modules/',
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};

module.exports = config;