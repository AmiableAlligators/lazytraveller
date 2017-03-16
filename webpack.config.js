var webpack = require('webpack');
var path = require('path');

<<<<<<< HEAD
var BUILD_DIR = path.resolve(__dirname, 'client/public');
=======
var BUILD_DIR = path.resolve(__dirname, 'client/src/public');
>>>>>>> react components should load given browser data. package.json and webpack working
var APP_DIR = path.resolve(__dirname, 'client/src');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
   module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader',
        query : {
          presets: ['react', 'es2015']
       }
      }
    ]
  },
  devtool: 'eval'
};

module.exports = config;