'use strict';

describe('sharedServices module', function () {

    beforeEach(module('sharedServices'));

    describe('GreeterService', function () {
        var greeterService;

        beforeEach(inject(function (GreeterService) {
            greeterService = GreeterService;
        }));

        it('should return greeting', function () {
            expect(greeterService.greet('test')).toEqual('test says hi');
        });
    });
});
