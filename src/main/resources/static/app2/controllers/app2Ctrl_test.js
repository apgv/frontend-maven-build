'use strict';

describe('app2 module', function () {

    beforeEach(module('app2'));

    describe('app2 App2Ctrl', function () {
        it('should ...', inject(function ($controller) {
            var scope = {};

            var app2Ctrl = $controller('App2Ctrl', {$scope: scope});

            expect(app2Ctrl).toBeDefined();
        }))
    });
});

