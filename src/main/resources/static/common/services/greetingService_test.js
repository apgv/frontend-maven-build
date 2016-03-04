'use strict';

describe('commonServices module', function () {

    beforeEach(module('commonServices'));

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
