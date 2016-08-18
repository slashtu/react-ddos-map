var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname),
  devtool: 'source-map',
  entry: {
        demo: "./index.js"
    },
  output: {
    path: './',
    filename: "[name].js"
  },
  module: {
      loaders: [
        {
            test: /\.js?$/,
            loader: 'babel',
            query: {
              presets: ['react', 'es2015'],
              plugins: ['transform-object-rest-spread']
            }
    
        },
        { test: /\.json$/, loader: require.resolve("json-loader") }
      ]
  },
};