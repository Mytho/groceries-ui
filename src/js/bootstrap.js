(function() {
    'use strict';

    require('angular');
    require('angular-route');
    require('angular-touch');

    require('./groceries/config.js');
    require('./groceries/module.js');
    require('./groceries/directives/auto-focus.js');
    require('./groceries/directives/swipe-delete.js');
    require('./groceries/services/groceries.js');
    require('./groceries/services/localstorage.js');
    require('./groceries/controllers/list.js');
    require('./groceries/controllers/login.js');
    require('./groceries/controllers/logout.js');
    require('./groceries/controllers/menu.js');
    require('./groceries/controllers/new.js');
})();
