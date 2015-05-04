(function() {
    'use strict';

    angular
        .module('groceries', ['ngRoute', 'groceries.config'])
        .config(Config);

    Config.$inject = ['$routeProvider'];

    function Config($routeProvider) {
        $routeProvider.when('/login', {
            controller: 'LoginController',
            controllerAs: 'vm',
            templateUrl: 'templates/login.html'
        }).when('/logout', {
            controller: 'LogoutController',
            controllerAs: 'vm',
            templateUrl: 'templates/logout.html'
        }).when('/list', {
            controller: 'ListController',
            controllerAs: 'vm',
            templateUrl: 'templates/list.html'
        }).otherwise({
            redirectTo: '/login'
        });
    }
})();
