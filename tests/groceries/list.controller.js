'use strict';

describe('ListController', function() {
    var $controller;

    beforeEach(module('groceries'));

    beforeEach(inject(function($injector) {
        $controller = $injector.get('$controller');
    }));

    it('should exist', function() {
        var controller = $controller('ListController');
        expect(controller).not.toBe(undefined);
    });
});
