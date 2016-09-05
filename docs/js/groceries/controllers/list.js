(function() {
    'use strict';

    angular
        .module('groceries')
        .controller('ListController', ListController);

    ListController.$inject = ['groceriesService'];

    function ListController(groceriesService) {
        var vm = this;

        vm.toggle = toggle;
        vm.loading = true;
        vm.items = [];

        activate();

        function activate() {
            return groceriesService.items()
                .then(itemsComplete);

            function itemsComplete(items) {
                vm.loading = false;
                vm.items = items;
            }
        }

        function toggle(item) {
            return groceriesService.toggle(item)
                .then(toggleComplete);

            function toggleComplete(updatedItem) {
                var index = vm.items.indexOf(item);

                if (index !== -1) {
                    vm.items[index] = updatedItem;
                }
            }
        }
    }
})();
