'use strict';

describe('app1 module', function () {

    beforeEach(module('app1'));

    describe('app1 App1Ctrl', function () {
        it('should ...', inject(function ($controller) {
            var scope = {
                model: ''
            };
            var app1Ctrl = $controller('App1Ctrl', {$scope: scope});

            expect(app1Ctrl).toBeDefined();
        }))
    });
});
