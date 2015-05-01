'use strict';

describe('groceriesService', function() {
    var $httpBackend, groceriesService, CONFIG;

    beforeEach(module('groceries'));

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        groceriesService = $injector.get('groceriesService');
        CONFIG = $injector.get('CONFIG');
    }));

    it('should allow the user to login and get a token', function() {
        var expectedToken, responseToken;
        expectedToken = 'A-TEST-TOKEN';
        $httpBackend.whenPOST(CONFIG.backend+'/login').respond(200, {token: expectedToken});
        groceriesService.login('tester', 'testing').then(function(token) {
            responseToken = token;
        });
        $httpBackend.flush();
        expect(responseToken).toBe(expectedToken);
    });

    it('should allow for catching of any errors', function() {
        var caught = false;
        $httpBackend.whenPOST(CONFIG.backend+'/login').respond(403);
        groceriesService.login('tester', 'testing').catch(function() {
            caught = true;
        });
        $httpBackend.flush();
        expect(caught).toBe(true);
    });
});
