'use strict';

describe('app1 module', function () {

    describe('app1 App1Ctrl', function () {
        var app1Ctrl, greeterService;

        beforeEach(module('app1'));

        beforeEach(inject(function ($controller, GreeterService) {
            app1Ctrl = $controller('App1Ctrl');
            greeterService = GreeterService;
        }));

        it('should call GreeterService', function () {
            spyOn(greeterService, 'greet');

            app1Ctrl.sayHi();

            expect(greeterService.greet).toHaveBeenCalledWith('AppCtrl1');
        });

        it('should set the result from GreeterService on the model', function () {
            expect(app1Ctrl.model.greeting).toEqual('');

            app1Ctrl.sayHi();

            expect(app1Ctrl.model.greeting).toEqual('AppCtrl1 says hi');
        });
    });
});
