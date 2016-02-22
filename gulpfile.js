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
var bower_components = 'bower_components/';

var angularLibs = {
    name: 'angular',
    js: [
        bower_components + 'angular/angular.min.js',
        bower_components + 'angular-route/angular-route.min.js'
    ]
};

var app1 = {
    name: 'app1',
    html: appRoot + 'app1/app1.html',
    js: [
        appRoot + 'app1/app1.js',
        appRoot + 'app1/controllers/**/*.js',
        appRoot + 'app1/services/**/*.js'
    ]
};

var app2 = {
    name: 'app2',
    html: appRoot + 'app2/app2.html',
    js: [
        appRoot + 'app2/app2.js',
        appRoot + 'app2/controllers/**/*.js',
        appRoot + 'app2/services/**/*.js'
    ]
};

var concatJsTask = function (lib) {
    return gulp.src(lib.js)
        .pipe(concat(lib.name + '.js'))
        .pipe(hash())
        .pipe(filenames(lib.name + 'Js'))
        .pipe(gulp.dest(libDist));
};

gulp.task('clean', function () {
    return del.sync([appDist]);
});

gulp.task('build:angular-libs', function () {
    return concatJsTask(angularLibs);
});

gulp.task('scripts:app1', ['clean', 'build:angular-libs'], function () {
    return gulp.src(app1.js)
        .pipe(sourcemaps.init())
        .pipe(concat(app1.name + '.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(hash())
        .pipe(filenames(app1.name + 'Js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(appDist));
});

gulp.task('inject:app1', ['scripts:app1'], function () {
    var target = gulp.src(app1.html);
    var angularStream = gulp.src(libDist + filenames.get(angularLibs.name + 'Js'), {read: false});
    var appStream = gulp.src(appDist + filenames.get(app1.name + 'Js'), {read: false});

    return target
        .pipe(inject(series(angularStream, appStream), {read: false, relative: true}))
        .pipe(gulp.dest(appRoot + 'app1/'));
});

gulp.task('scripts:app2', ['clean', 'build:angular-libs'], function () {
    return gulp.src(app2.js)
        .pipe(sourcemaps.init())
        .pipe(concat(app2.name + '.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(hash())
        .pipe(filenames(app2.name + 'Js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(appDist));
});

gulp.task('inject:app2', ['scripts:app2'], function () {
    var target = gulp.src(app2.html);
    var angularStream = gulp.src(libDist + filenames.get(angularLibs.name + 'Js'), {read: false});
    var appStream = gulp.src(appDist + filenames.get(app2.name + 'Js'), {read: false});

    return target
        .pipe(inject(series(angularStream, appStream), {read: false, relative: true}))
        .pipe(gulp.dest(appRoot + 'app2/'));
});

gulp.task('scripts:all', ['inject:app1', 'inject:app2']);

gulp.task('default', ['scripts:all']);
