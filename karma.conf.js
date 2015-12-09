'use strict';

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        singleRun: true,
        files: [
            'tests/spec.js'
        ],
        preprocessors: {
            'tests/spec.js': ['webpack']
        },
        plugins: [
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('karma-webpack')
        ]
    });
};
