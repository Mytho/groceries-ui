'use strict';

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        singleRun: true,
        files: [
            'https://code.angularjs.org/1.3.15/angular.js',
            'https://code.angularjs.org/1.3.15/angular-route.js',
            'https://code.angularjs.org/1.3.15/angular-mocks.js',
            'src/js/groceries/module.js',
            'src/js/groceries/*.service.js',
            'src/js/groceries/*.controller.js',
            'tests/**/*.js'
        ]
    });
};
