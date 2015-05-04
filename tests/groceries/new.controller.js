'use strict';

describe('NewController', function() {
    var $controller, $location, groceriesService;

    beforeEach(module('groceries'));

    beforeEach(inject(function($injector) {
        $controller = $injector.get('$controller');
        $location = $injector.get('$location');
        groceriesService = $injector.get('groceriesService');
    }));

    it('should logout', function() {
        var controller, name;
        name = 'cucumber';
        spyOn(groceriesService, 'add').and.returnValue({
            then: function(callback) { return callback({name: name}); }
        });
        controller = $controller('NewController', {
            $location: $location,
            groceriesService: groceriesService
        });
        controller.name = name;
        controller.add();
        expect(groceriesService.add).toHaveBeenCalledWith(name);
        expect($location.path()).toBe('/list');
    });
});
