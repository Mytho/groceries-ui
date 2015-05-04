(function() {
    'use strict';

    angular
        .module('groceries')
        .controller('NewController', NewController);

    NewController.$inject = ['$location', 'groceriesService'];

    function NewController($location, groceriesService) {
        var vm = this;

        vm.add = add;
        vm.name = '';
        vm.suggestions = [];

        activate();

        function activate() {
            return groceriesService.suggestions()
                .then(suggestComplete);

            function suggestComplete(suggestions) {
                vm.suggestions = suggestions;
            }
        }

        function add() {
            groceriesService.add(vm.name)
                .then(addComplete);

            function addComplete() {
                $location.path('/list');
            }
        }
    }
})();
