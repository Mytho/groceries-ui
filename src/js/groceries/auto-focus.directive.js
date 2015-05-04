(function() {
    'use strict';

    angular
        .module('groceries')
        .directive('autoFocus', autoFocus);

    autoFocus.$inject = ['$timeout'];

    function autoFocus($timeout) {
        return {
            link: link,
            restrict: 'A'
        };

        function link(scope, elem, attrs) {
            $timeout(function(){
                elem[0].focus();
            }, 0);
        }
    }
})();
