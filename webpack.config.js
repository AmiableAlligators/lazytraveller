var dotenv = require('dotenv').config();
var webpack = require('webpack');
var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/public');

var config = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
   module : {
    loaders : [
      {
        test : /\.jsx?/,
        include: SRC_DIR,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'MAPZEN_KEY'
    ])
  ]
};

module.exports = config;