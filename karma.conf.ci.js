module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'src/main/resources/static/bower_components/angular/angular.js',
            'src/main/resources/static/bower_components/angular-route/angular-route.js',
            'src/main/resources/static/bower_components/angular-mocks/angular-mocks.js',
            'src/main/resources/static/app1/**/*.js',
            'src/main/resources/static/app2/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-junit-reporter'
        ],

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        },

        junitreporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};

