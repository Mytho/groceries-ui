'use strict';

describe('autoFocus', function() {
    var $compile, $rootScope, $timeout, scope, elem;

    beforeEach(module('groceries'));

    beforeEach(inject(function($injector) {
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        $timeout = $injector.get('$timeout');
        scope = $rootScope.$new();
        elem = angular.element('<input auto-focus>');
    }));

    it('should focus the element', function() {
        $compile(elem)(scope);
        spyOn(elem[0], 'focus');
        $timeout.flush();
        expect(elem[0].focus).toHaveBeenCalled();
    });
});
