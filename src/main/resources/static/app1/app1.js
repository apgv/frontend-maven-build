'use strict';

var app1 = angular.module('app1', ['ngRoute']);

app1.config(function ($routeProvider) {
    $routeProvider.when('/app1', {
        templateUrl: 'app1/app1.html',
        controller: 'App1Ctrl'
    });
});