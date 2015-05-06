'use strict';

describe('MenuController', function() {
    var $controller, $location;

    beforeEach(module('groceries'));

    beforeEach(inject(function($injector) {
        $controller = $injector.get('$controller');
        $location = $injector.get('$location');
    }));

    it('should logout', function() {
        var controller = $controller('MenuController', {
            $location: $location
        });
        controller.logout();
        expect($location.path()).toBe('/logout');
    });
});
