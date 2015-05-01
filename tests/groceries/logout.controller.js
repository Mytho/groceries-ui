'use strict';

describe('LogoutController', function() {
    var $controller, $location, localStorageService;

    beforeEach(module('groceries'));

    beforeEach(inject(function($injector) {
        $controller = $injector.get('$controller');
        $location = $injector.get('$location');
        localStorageService = $injector.get('localStorageService');
    }));

    it('should remove the token and redirect to the login page', function() {
        var controller;
        localStorageService.set('token', 'A-TEST-TOKEN');
        controller = $controller('LogoutController', {
            $location: $location,
            localStorageService: localStorageService
        });
        expect(localStorageService.get('token')).toBe(undefined);
        expect($location.path()).toBe('/login');
    });
});
