'use strict';

describe('localStorage', function() {
    var $window, localStorage, key, val;

    beforeEach(module('groceries'));

    beforeEach(inject(function($injector) {
        key = 'hello';
        val = 'world!';
        $window = $injector.get('$window');
        localStorage = $injector.get('localStorage');
    }));

    afterEach(inject(function($injector) {
        delete $window.localStorage[key];
    }));

    it('should get values, returning a default otherwise', function() {
        expect(localStorage.get(key)).toBe(undefined);
        expect(localStorage.get(key, val)).toBe(val);
        $window.localStorage[key] = val;
        expect(localStorage.get(key)).toBe(val);
    });

    it('should set values', function() {
        expect($window.localStorage[key]).toBe(undefined);
        expect(localStorage.set(key, val));
        expect($window.localStorage[key]).toBe(val);
    });

    it('should remove values', function() {
        $window.localStorage[key] = val;
        expect($window.localStorage[key]).toBe(val);
        expect(localStorage.remove(key));
        expect($window.localStorage[key]).toBe(undefined);
    });
});
