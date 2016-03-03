'use strict';

describe('sharedServices module', function () {

    beforeEach(module('sharedServices'));

    describe('GreetingService', function () {
        var greetingService;

        beforeEach(inject(function (GreetingService) {
            greetingService = GreetingService;
        }));

        it('should return greeting', function () {
            expect(greetingService.greet('test')).toEqual('test says hi');
        });
    });
});
