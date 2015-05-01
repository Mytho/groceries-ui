(function() {
    'use strict';

    angular
        .module('groceries')
        .service('authService', authService);

    authService.$inject = ['$http', 'CONFIG'];

    function authService($http, CONFIG) {
        return {
            login: login
        };

        function login(username, password) {
            return $http.post(CONFIG.backend+'/login', {username: username, password: password})
                .then(loginComplete);

            function loginComplete(response) {
                return response.data.token;
            }
        }
    }
})();
