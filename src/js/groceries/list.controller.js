(function() {
    'use strict';

    angular
        .module('groceries')
        .controller('ListController', ListController);

    ListController.$inject = ['groceriesService'];

    function ListController(groceriesService) {
        var vm = this;

        vm.items = [];

        activate();

        function activate() {
            return groceriesService.items().then(function(items) {
                vm.items = items;
            });
        }
    }
})();
