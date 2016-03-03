var baseConfig = require('./karma.conf.js');

module.exports = function (config) {
    //load base config
    baseConfig(config);

    //override base config
    config.set({
        singleRun: true,
        autoWatch: false,
        browsers: ['PhantomJS'],
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-junit-reporter'
        ],
        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        }
    });
};

