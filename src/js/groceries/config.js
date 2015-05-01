(function() {
    'use strict';

    angular
        .module('groceries')
        .constant('CONFIG', {
            backend: 'https://groceries-api.herokuapp.com'
        });
})();
