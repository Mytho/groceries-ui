'use strict';

describe('swipeDelete', function() {
    var $compile, $rootScope, $timeout, scope, elem;

    beforeEach(module('groceries'));

    beforeEach(inject(function($injector) {
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        $timeout = $injector.get('$timeout');
        scope = $rootScope.$new();
        scope.item = {id: 123};
        elem = angular.element('<div swipe-delete="item">');
        $compile(elem)(scope);
    }));

    it('should render the directive', function() {
        expect(elem.hasClass('swipe-outer')).toBe(true);
        expect(elem.find('.swipe-inner').length > 0).toBe(true);
        expect(elem.find('.swipe-undo').length > 0).toBe(true);
    });
});
