(function() {
    'use strict';

    angular
        .module('groceries')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$log', 'localStorageService'];

    function LoginController($location, $log, localStorageService) {
        var vm = this;

        vm.login = login;
        vm.password = '';
        vm.username = '';

        activate();

        function activate() {
            if (localStorageService.get('token')) {
                $log.debug('Token found, redirecting...');
                redirect();
                return;
            }
        }

        function login() {
            if (vm.username == 'tester' && vm.password == 'tester') {
                localStorageService.set('token', 'A-TEST-TOKEN');
                $log.debug('Login correct, redirecting...');
                redirect();
                return;
            }

            $log.warn('Login failed');
        }

        function redirect() {
            $location.path('/list');
        }
    }
})();
