'use strict';

describe('app2 module', function () {

    beforeEach(module('app2'));

    describe('app2 App2Ctrl', function () {
        var app2Ctrl, greeterService;

        beforeEach(module(function ($provide) {
            greeterService = {
                greet: function () {
                    return 'mock says hi'
                }
            };

            $provide.value('GreeterService', greeterService);
        }));

        beforeEach(inject(function ($controller) {
            app2Ctrl = $controller('App2Ctrl');
        }));

        it('should call GreeterService', function () {
            spyOn(greeterService, 'greet');

            app2Ctrl.greetingFromController();

            expect(greeterService.greet).toHaveBeenCalledWith('App2Ctrl');
        });

        it('should return result from GreeterService', function () {
            expect(app2Ctrl.greetingFromController()).toEqual('mock says hi');
        });
    });
});

