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
        }).when('/list', {
            controller: 'ListController',
            controllerAs: 'vm',
            templateUrl: 'templates/list.html'
        }).otherwise({
            redirectTo: '/login'
        });
    }
})();
