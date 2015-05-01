(function() {
    'use strict';

    angular
        .module('groceries')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'groceriesService', 'localStorageService'];

    function LoginController($location, groceriesService, localStorageService) {
        var vm = this;

        vm.login = login;
        vm.password = '';
        vm.username = '';

        activate();

        function activate() {
            if (localStorageService.get('token')) {
                redirect();
            }
        }

        function login() {
            return groceriesService.login(vm.username, vm.password)
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
