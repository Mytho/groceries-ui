(function() {
    'use strict';

    angular
        .module('groceries')
        .service('localStorage', localStorage);

    localStorage.$inject = ['$window'];

    function localStorage($window) {
        return {
            get: get,
            set: set,
            remove: remove
        };

        function get(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        }

        function set(key, value) {
            $window.localStorage[key] = value;
        }

        function remove(key) {
            delete $window.localStorage[key];
        }
    }
})();
