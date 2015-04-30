module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        singleRun: true,
        files: ['tests/**/*.js']
    });
};
