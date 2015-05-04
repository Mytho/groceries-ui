(function() {
    'use strict';

    angular
        .module('groceries')
        .controller('NewController', NewController);

    NewController.$inject = ['$location', 'groceriesService'];

    function NewController($location, groceriesService) {
        var vm = this;

        vm.add = add;
        vm.input = '';
        vm.suggestions = [];

        activate();

        function activate() {
            return groceriesService.suggestions()
                .then(suggestComplete);

            function suggestComplete(suggestions) {
                vm.suggestions = suggestions;
            }
        }

        function add(name) {
            groceriesService.add(name || vm.input)
                .then(addComplete);

            function addComplete() {
                $location.path('/list');
            }
        }
    }
})();
