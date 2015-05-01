'use strict';

describe('LoginController', function() {
    var $controller, $location, $log, localStorage;

    beforeEach(module('groceries'));

    beforeEach(inject(function($injector) {
        $controller = $injector.get('$controller');
        $location = $injector.get('$location');
        $log = $injector.get('$log');
        localStorage = $injector.get('localStorage');
    }));

    it('should redirect when a token is present', function() {
        var controller;
        localStorage.set('token', 'A-TEST-TOKEN');
        controller = $controller('LoginController', {
            $location: $location,
            $log: $log,
            localStorage: localStorage
        });
        expect($location.path()).toBe('/list');
    });

    it('should redirect on a correct login', function() {
        var controller = $controller('LoginController', {
            $location: $location,
            $log: $log,
            localStorage: localStorage
        });
        controller.username = 'tester';
        controller.password = 'tester';
        controller.login();
        expect($location.path()).toBe('/list');
    });
});
