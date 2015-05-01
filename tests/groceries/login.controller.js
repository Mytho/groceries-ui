'use strict';

describe('LoginController', function() {
    var $controller, $location, localStorageService;

    beforeEach(module('groceries'));

    beforeEach(inject(function($injector) {
        $controller = $injector.get('$controller');
        $location = $injector.get('$location');
        localStorageService = $injector.get('localStorageService');
    }));

    it('should redirect when a token is present', function() {
        var controller;
        localStorageService.set('token', 'A-TEST-TOKEN');
        controller = $controller('LoginController', {
            $location: $location,
            localStorageService: localStorageService
        });
        expect($location.path()).toBe('/list');
    });

    it('should redirect on a correct login', function() {
        var controller = $controller('LoginController', {
            $location: $location,
            localStorageService: localStorageService
        });
        controller.username = 'tester';
        controller.password = 'tester';
        controller.login();
        expect($location.path()).toBe('/list');
    });
});
