'use strict';

var app2 = angular.module('app2');

app2.controller('App2Ctrl', function (GreeterService) {
    var ctrl = this;

    ctrl.greetingFromController = function () {
        return GreeterService.greet('App2Ctrl');
    }
});
