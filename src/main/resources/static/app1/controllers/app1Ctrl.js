'use strict';

angular.module('app1')
    .controller('App1Ctrl', function ($scope) {
        $scope.model = {
            greeting: 'Hello'
        };

        $scope.sayHi = function () {
            $scope.model.greeting = $scope.model.greeting === 'Hello' ? 'Function says hi' : 'Hello';
        }
    });
