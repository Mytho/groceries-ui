(function() {
    'use strict';

    angular
        .module('groceries')
        .service('groceriesService', groceriesService);

    groceriesService.$inject = ['$location', '$http', 'localStorageService', 'CONFIG'];

    function groceriesService($location, $http, localStorageService, CONFIG) {
        return {
            login: login,
            items: items
        };

        function errorHandler(response) {
            if (response.status == 403) {
                $location.path('/logout');
            }
        }

        function login(username, password) {
            return $http.post(CONFIG.backend+'/login', {username: username, password: password})
                .then(loginComplete);

            function loginComplete(response) {
                return response.data.token;
            }
        }

        function items() {
            return $http.get(CONFIG.backend+'/item', {headers: {'X-Auth-Token': localStorageService.get('token', '')}})
                .then(itemsComplete)
                .catch(errorHandler);

            function itemsComplete(response) {
                return response.data.items;
            }
        }
    }
})();
