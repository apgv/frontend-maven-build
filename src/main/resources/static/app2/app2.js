'use strict';

var app2 = angular.module('app2', ['ngRoute', 'commonServices']);

app2.config(function ($routeProvider) {
    $routeProvider.when('/app2', {
        templateUrl: 'app2/app2.html',
        controller: 'App2Ctrl'
    });
});