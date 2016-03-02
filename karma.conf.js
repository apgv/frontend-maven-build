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

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitreporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
