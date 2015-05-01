'use strict';

describe('groceriesService', function() {
    var $httpBackend, $location, groceriesService, CONFIG;

    beforeEach(module('groceries'));

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $location = $injector.get('$location');
        groceriesService = $injector.get('groceriesService');
        CONFIG = $injector.get('CONFIG');
    }));

    it('should login and get a token', function() {
        var expectedToken, responseToken;
        expectedToken = 'A-TEST-TOKEN';
        $httpBackend.whenPOST(CONFIG.backend+'/login').respond(200, {token: expectedToken});
        groceriesService.login('tester', 'testing').then(function(token) {
            responseToken = token;
        });
        $httpBackend.flush();
        expect(responseToken).toBe(expectedToken);
    });

    it('should allow for catching of any errors during login', function() {
        var caught = false;
        $httpBackend.whenPOST(CONFIG.backend+'/login').respond(403);
        groceriesService.login('tester', 'testing').catch(function() {
            caught = true;
        });
        $httpBackend.flush();
        expect(caught).toBe(true);
    });

    it('should list all items on the list', function() {
        var expectedItems, responseItems;
        expectedItems = ['apple', 'yoghurt', 'lemon'];
        $httpBackend.whenGET(CONFIG.backend+'/item').respond(200, {items: expectedItems});
        groceriesService.items().then(function(items) {
            responseItems = items;
        });
        $httpBackend.flush();
        angular.forEach(responseItems, function(name) {
            expect(expectedItems.indexOf(name) >= 0).toBe(true);
        });
    });

    it('should redirect to login when getting a 403 response', function() {
        $httpBackend.whenGET(CONFIG.backend+'/item').respond(403);
        groceriesService.items();
        $httpBackend.flush();
        expect($location.path()).toBe('/logout');
    });
});
