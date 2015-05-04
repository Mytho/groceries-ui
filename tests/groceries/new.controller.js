'use strict';

describe('NewController', function() {
    var $controller, $location, groceriesService;

    beforeEach(module('groceries'));

    beforeEach(inject(function($injector) {
        $controller = $injector.get('$controller');
        $location = $injector.get('$location');
        groceriesService = $injector.get('groceriesService');
    }));

    it('should get a list of suggestions when created', function() {
        var controller, expectedSuggestions;
        expectedSuggestions = {pear: 2, apples: 4, banana: 1};
        spyOn(groceriesService, 'suggestions').and.returnValue({
            then: function(callback) { return callback(expectedSuggestions); }
        });
        controller = $controller('NewController', {
            $location: $location,
            groceriesService: groceriesService
        });
        expect(groceriesService.suggestions).toHaveBeenCalled();
        expect(controller.suggestions).toBe(expectedSuggestions);
    });

    it('should add a new item', function() {
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
