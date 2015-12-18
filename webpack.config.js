'use strict';

var webpack = require('webpack'),
    APP = __dirname + '/src/js';

module.exports = {
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "jshint-loader"
            }
        ]
    },
    devtool: '#source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ],
    context: APP,
    entry: {
        app: ['webpack/hot/dev-server', './bootstrap.js']
    },
    output: {
        path: APP,
        publicPath: '/js',
        filename: 'groceries.min.js'
    }
}
