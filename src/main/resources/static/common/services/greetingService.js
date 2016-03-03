'use strict';

var sharedServices = angular.module('sharedServices', []);

sharedServices.factory('GreetingService', function () {
    var service = {};

    service.greet = function (greeter) {
        return greeter + ' says hi';
    };

    return service;
});