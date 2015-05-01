(function() {
    'use strict';

    angular
        .module('groceries')
        .service('groceriesService', groceriesService);

    groceriesService.$inject = ['$location', '$http', 'localStorageService', 'CONFIG'];

    function groceriesService($location, $http, localStorageService, CONFIG) {
        return {
            login: login,
            items: items,
            toggle: toggle
        };

        function errorHandler(response) {
            if (response.status == 403) {
                $location.path('/logout');
            }
        }

        function login(username, password) {
            return $http({
                method: 'POST',
                url: CONFIG.backend+'/login',
                data: {username: username, password: password}
            })
            .then(loginComplete);

            function loginComplete(response) {
                return response.data.token;
            }
        }

        function items() {
            return $http({
                method: 'GET',
                url: CONFIG.backend+'/item',
                headers: {'X-Auth-Token': localStorageService.get('token', '')}
            })
            .then(itemsComplete)
            .catch(errorHandler);

            function itemsComplete(response) {
                return response.data.items;
            }
        }

        function toggle(item) {
            return $http({
                method: 'PUT',
                url: CONFIG.backend+'/item/'+item.id,
                headers: {'X-Auth-Token': localStorageService.get('token', '')}
            })
            .then(toggleIsBoughtComplete)
            .catch(errorHandler);

            function toggleIsBoughtComplete(response) {
                return response.data;
            }
        }
    }
})();
