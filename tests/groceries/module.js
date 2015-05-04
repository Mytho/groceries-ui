'use strict';

describe('groceries', function() {
    var $route;

    beforeEach(module('groceries'));

    beforeEach(inject(function($injector) {
        $route = $injector.get('$route');
    }));

    it('should route to the configured controller', function() {
        expect($route.routes['/login'].controller).toBe('LoginController');
        expect($route.routes['/logout'].controller).toBe('LogoutController');
        expect($route.routes['/list'].controller).toBe('ListController');
        expect($route.routes['/menu'].controller).toBe('MenuController');
        expect($route.routes['/new'].controller).toBe('NewController');
    });

    it('should use the configured controller alias', function() {
        expect($route.routes['/login'].controllerAs).toBe('vm');
        expect($route.routes['/logout'].controllerAs).toBe('vm');
        expect($route.routes['/list'].controllerAs).toBe('vm');
        expect($route.routes['/menu'].controllerAs).toBe('vm');
        expect($route.routes['/new'].controllerAs).toBe('vm');
    });

    it('should render the configured template', function() {
        expect($route.routes['/login'].templateUrl).toBe('templates/login.html');
        expect($route.routes['/logout'].templateUrl).toBe('templates/logout.html');
        expect($route.routes['/list'].templateUrl).toBe('templates/list.html');
        expect($route.routes['/menu'].templateUrl).toBe('templates/menu.html');
        expect($route.routes['/new'].templateUrl).toBe('templates/new.html');
    });

    it('should redirect to the configured location when no route is provided', function() {
        expect($route.routes[null].redirectTo).toBe('/login');
    });
});
