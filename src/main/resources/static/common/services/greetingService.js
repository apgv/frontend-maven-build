'use strict';

var commonServices = angular.module('commonServices');

commonServices.factory('GreeterService', function () {
    var service = {};

    service.greet = function (greeter) {
        return greeter + ' says hi';
    };

    return service;
});