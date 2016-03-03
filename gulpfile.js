var gulp = require('gulp');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var hash = require('gulp-hash');
var filenames = require('gulp-filenames');
var series = require('stream-series');

var appRoot = 'src/main/resources/static/';
var appDist = appRoot + 'dist/';
var libDist = appDist + 'lib/';
var bower_components = appRoot + 'bower_components/';

var IGNORE = '!';
var TEST_FILES = '*_test.js';

var angularLibs = {
    name: 'angular',
    src: [
        bower_components + 'angular/angular.min.js',
        bower_components + 'angular-route/angular-route.min.js'
    ]
};

var commonAppLibs = {
    name: 'commonAppLibs',
    src: [
        IGNORE + appRoot + '/common/**/' + TEST_FILES,
        appRoot + '/common/**/*.js'
    ]
};

var app1 = {
    name: 'app1',
    html: appRoot + 'app1/app1.html',
    htmlDest: appRoot + 'app1/',
    src: [
        IGNORE + appRoot + 'app1/**/' + TEST_FILES,
        appRoot + 'app1/app1.js',
        appRoot + 'app1/controllers/**/*.js',
        appRoot + 'app1/services/**/*.js'
    ]
};

var app2 = {
    name: 'app2',
    html: appRoot + 'app2/app2.html',
    htmlDest: appRoot + 'app2/',
    src: [
        IGNORE + appRoot + 'app2/**/' + TEST_FILES,
        appRoot + 'app2/app2.js',
        appRoot + 'app2/controllers/**/*.js',
        appRoot + 'app2/services/**/*.js'
    ]
};

var concatJsTask = function (lib) {
    return gulp.src(lib.src)
        .pipe(concat(lib.name + '.js'))
        .pipe(hash())
        .pipe(filenames(lib.name + 'Js'))
        .pipe(gulp.dest(libDist));
};

var angularScriptsTask = function (appConfig) {
    return gulp.src(appConfig.src)
        .pipe(sourcemaps.init())
        .pipe(concat(appConfig.name + '.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(hash())
        .pipe(filenames(appConfig.name + 'Js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(appDist));
};

var injectAppJsHtmlTask = function (appConfig) {
    var target = gulp.src(appConfig.html);
    var angularStream = gulp.src(libDist + filenames.get(angularLibs.name + 'Js'), {read: false});
    var commonAppLibsStream = gulp.src(appDist + filenames.get(commonAppLibs.name + 'Js'), {read: false});
    var appStream = gulp.src(appDist + filenames.get(appConfig.name + 'Js'), {read: false});

    return target
        .pipe(inject(series(angularStream, commonAppLibsStream, appStream), {read: false, relative: true}))
        .pipe(gulp.dest(appConfig.htmlDest));
};

gulp.task('clean', function () {
    return del.sync([appDist]);
});

gulp.task('build:angular-libs', function () {
    return concatJsTask(angularLibs);
});

gulp.task('build:common-libs', function () {
    return angularScriptsTask(commonAppLibs);
});

gulp.task('scripts:app1', ['clean', 'build:angular-libs', 'build:common-libs'], function () {
    return angularScriptsTask(app1);
});

gulp.task('inject:app1', ['scripts:app1'], function () {
    return injectAppJsHtmlTask(app1);
});

gulp.task('scripts:app2', ['clean', 'build:angular-libs', 'build:common-libs'], function () {
    return angularScriptsTask(app2);
});

gulp.task('inject:app2', ['scripts:app2'], function () {
    return injectAppJsHtmlTask(app2);
});

gulp.task('scripts:all', ['inject:app1', 'inject:app2']);

gulp.task('default', ['scripts:all']);

/**
 * dev-build with watch and manual reload of browser
 */
var devInjectHtmlTask = function (appConfig) {
    var target = gulp.src(appConfig.html);
    var angularStream = gulp.src(angularLibs.src, {read: false});
    var commonAppLibsStream = gulp.src(commonAppLibs.src, {read: false});
    var appStream = gulp.src(appConfig.src, {read: false});

    return target
        .pipe(inject(series(angularStream, commonAppLibsStream, appStream), {read: false, relative: true}))
        .pipe(gulp.dest(appConfig.htmlDest));
};

gulp.task('dev-build:app1', function () {
    console.log('dev-build:app1');
    return devInjectHtmlTask(app1);
});

gulp.task('dev-build:app2', function () {
    console.log('dev-build:app2');
    return devInjectHtmlTask(app2);
});

gulp.task('dev-watch:all', ['dev-build:app1', 'dev-build:app2'], function () {
    gulp.watch(app1.src, ['dev-build:app1']);
    gulp.watch(app2.src, ['dev-build:app2']);
});
