'use strict';

var app1 = angular.module('app1');

app1.controller('App1Ctrl', function (GreeterService) {
    var ctrl = this;

    ctrl.model = {
        greeting: ''
    };

    ctrl.sayHi = function () {
        ctrl.model.greeting = GreeterService.greet('AppCtrl1');
    }
});
