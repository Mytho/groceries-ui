'use strict';

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        singleRun: true,
        files: [
            'https://code.jquery.com/jquery-1.11.3.min.js',
            'https://code.angularjs.org/1.3.15/angular.js',
            'https://code.angularjs.org/1.3.15/angular-route.js',
            'https://code.angularjs.org/1.3.15/angular-touch.js',
            'https://code.angularjs.org/1.3.15/angular-mocks.js',
            'src/js/groceries/module.js',
            'src/js/groceries/config.js',
            'src/js/groceries/directives/*.js',
            'src/js/groceries/services/*.js',
            'src/js/groceries/controllers/*.js',
            'tests/**/*.js'
        ]
    });
};
