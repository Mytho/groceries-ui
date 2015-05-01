(function() {
    'use strict';

    angular
        .module('groceries')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$log'];

    function LoginController($location, $log) {
        var vm = this;

        vm.login = login;
        vm.password = '';
        vm.username = '';

        function login() {
            if (vm.username == 'teun' && vm.password == 'teun') {
                $location.path('/list');
                return;
            }

            $log.warn('Login failed');
        }
    }
})();
