(function() {
    'use strict';

    angular
        .module('groceries')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['$location'];

    function MenuController($location) {
        var vm = this;

        vm.logout = logout;

        function logout() {
            $location.path('/logout');
        }
    }
})();
