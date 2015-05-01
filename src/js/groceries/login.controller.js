(function() {
    'use strict';

    angular
        .module('groceries')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'authService', 'localStorageService'];

    function LoginController($location, authService, localStorageService) {
        var vm = this;

        vm.login = login;
        vm.password = '';
        vm.username = '';

        activate();

        function activate() {
            if (localStorageService.get('token')) {
                redirect();
                return;
            }
        }

        function login() {
            return authService.login(vm.username, vm.password)
                .then(loginComplete);

            function loginComplete(token) {
                localStorageService.set('token', token);
                redirect();
            }
        }

        function redirect() {
            $location.path('/list');
        }
    }
})();
