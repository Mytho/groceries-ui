(function() {
    'use strict';

    angular
        .module('groceries')
        .controller('ListController', ListController);

    ListController.$inject = [];

    function ListController() {
        var vm = this;
    }
})();
