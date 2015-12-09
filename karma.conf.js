'use strict';

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        singleRun: true,
        files: ['tests/bootstrap.js'],
        preprocessors: {
            'tests/*': ['webpack']
        },
        plugins: [
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('karma-webpack')
        ]
    });
};
