(function() {
    'use strict';

    angular
        .module('groceries', ['ngRoute'])
        .config(Config);

    Config.$inject = ['$routeProvider'];

    function Config($routeProvider) {
        $routeProvider.when('/login', {
            controller: 'LoginController',
            controllerAs: 'vm',
            templateUrl: 'templates/login.html'
        }).otherwise({
            redirectTo: '/login'
        });
    }
})();
