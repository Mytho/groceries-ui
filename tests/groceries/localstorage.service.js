'use strict';

describe('localStorageService', function() {
    var $window, localStorageService, key, val;

    beforeEach(module('groceries'));

    beforeEach(inject(function($injector) {
        key = 'hello';
        val = 'world!';
        $window = $injector.get('$window');
        localStorageService = $injector.get('localStorageService');
    }));

    afterEach(inject(function($injector) {
        delete $window.localStorage[key];
    }));

    it('should get values, returning a default otherwise', function() {
        expect(localStorageService.get(key)).toBe(undefined);
        expect(localStorageService.get(key, val)).toBe(val);
        $window.localStorage[key] = val;
        expect(localStorageService.get(key)).toBe(val);
    });

    it('should set values', function() {
        expect($window.localStorage[key]).toBe(undefined);
        expect(localStorageService.set(key, val));
        expect($window.localStorage[key]).toBe(val);
    });

    it('should remove values', function() {
        $window.localStorage[key] = val;
        expect($window.localStorage[key]).toBe(val);
        expect(localStorageService.remove(key));
        expect($window.localStorage[key]).toBe(undefined);
    });
});
