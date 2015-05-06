'use strict';

describe('LoginController', function() {
    var $controller, $location, $httpBackend, groceriesService, localStorageService;

    beforeEach(module('groceries'));

    beforeEach(inject(function($injector) {
        $controller = $injector.get('$controller');
        $location = $injector.get('$location');
        groceriesService = $injector.get('groceriesService');
        localStorageService = $injector.get('localStorageService');
    }));

    afterEach(inject(function($injector) {
        localStorageService.remove('token');
    }));

    it('should redirect when a token is present', function() {
        var controller;
        localStorageService.set('token', 'A-TEST-TOKEN');
        controller = $controller('LoginController', {
            $location: $location,
            groceriesService: groceriesService,
            localStorageService: localStorageService
        });
        expect($location.path()).toBe('/list');
    });

    it('should store the token and redirect on a correct login', function() {
        var controller, token;
        token = 'A-Test-Token';
        spyOn(groceriesService, 'login').and.returnValue({
            then: function(callback) { return callback(token); }
        });
        controller = $controller('LoginController', {
            $location: $location,
            groceriesService: groceriesService,
            localStorageService: localStorageService
        });
        controller.username = 'username';
        controller.password = 'password';
        controller.login();
        expect(groceriesService.login).toHaveBeenCalledWith('username', 'password');
        expect(localStorageService.get('token')).toBe(token);
        expect($location.path()).toBe('/list');
    });
});
