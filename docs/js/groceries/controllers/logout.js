(function() {
    'use strict';

    angular
        .module('groceries')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$location', 'localStorageService'];

    function LogoutController($location, localStorageService) {
        var vm = this;

        activate();

        function activate() {
            localStorageService.remove('token');
            $location.path('/login');
        }
    }
})();
