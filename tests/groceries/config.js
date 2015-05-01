'use strict';

describe('CONFIG', function() {
    var CONFIG;

    beforeEach(module('groceries'));

    beforeEach(inject(function($injector) {
        CONFIG = $injector.get('CONFIG');
    }));

    it('should contain a `backend` configuration', function() {
        expect(CONFIG.backend).not.toBe(undefined);
    });
});
