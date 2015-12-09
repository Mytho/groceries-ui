'use strict';

var webpack = require('webpack'),
  APP = __dirname + '/src/js';

module.exports = {
  context: APP,
  entry: {
    app: ['webpack/hot/dev-server', './bootstrap.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: APP,
    publicPath: '/js',
    filename: 'bundle.js',
  }
}
