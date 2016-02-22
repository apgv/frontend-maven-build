'use strict';

angular.module('app2')
    .controller('App2Ctrl', function ($scope) {
        $scope.greetingFromController = function () {
            return 'App2Ctrl says hi';
        }
    });
