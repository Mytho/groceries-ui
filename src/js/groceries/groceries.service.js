(function() {
    'use strict';

    angular
        .module('groceries')
        .service('groceriesService', groceriesService);

    groceriesService.$inject = ['$http', 'CONFIG'];

    function groceriesService($http, CONFIG) {
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
