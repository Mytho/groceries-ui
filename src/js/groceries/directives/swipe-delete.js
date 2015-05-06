(function() {
    'use strict';

    angular
        .module('groceries')
        .directive('swipeDelete', swipeDelete);

    swipeDelete.$inject = ['$swipe', '$timeout', 'groceriesService'];

    function swipeDelete($swipe, $timeout, groceriesService) {
        return {
            link: {
                post: post
            },
            scope: {
                item: '=swipeDeleteItem',
                items: '=swipeDeleteItems'
            },
            template: '<div class="swipe-outer">'+
                        '<div class="swipe-inner" ng-transclude></div>'+
                        '<div class="swipe-undo" ng-click="undo($event)">'+
                          '<i class="fa fa-trash"></i>'+
                          '<span class="name">{{item.name}}</span>'+
                          '<span class="label">UNDO</span>'+
                        '</div>'+
                      '</div>',
            transclude: true,
            replace: true,
            restrict: 'A'
        };

        function post(scope, elem, attrs) {
            var FULL_SWIPE_THRESHOLD, REMOVE_DELAY, isFinished, startCoords, t;

            FULL_SWIPE_THRESHOLD = 0.65;
            REMOVE_DELAY = 1500;

            scope.undo = undo;

            $swipe.bind(elem, {
                start: start,
                move: move,
                end: end
            });

            function end(coords) {
                if ( ! isFinished) {
                    return position(0);
                }

                t = $timeout(remove, REMOVE_DELAY);
            }

            function move(coords) {
                if (coords.x - startCoords.x < 0) {
                    return position(0);
                }

                if (elem.find('.swipe-inner').offset().left > elem.find('.swipe-inner').outerWidth() * FULL_SWIPE_THRESHOLD) {
                    isFinished = true;
                    return position(elem.find('.swipe-inner').outerWidth());
                }

                position(coords.x - startCoords.x, true);
            }

            function undo($event) {
                $event.stopPropagation();
                $timeout.cancel(t);
                position(0);
            }

            function position(x, isInstant) {
                if (isInstant) {
                    return elem.find('.swipe-inner').css('left', x);
                }

                elem.find('.swipe-inner').animate({left: x}, 200);
            }

            function remove() {
                return groceriesService.remove(scope.item)
                    .then(removeComplete)
                    .catch(removeFailed);

                function removeComplete() {
                    scope.items.splice(scope.items.indexOf(scope.item), 1);
                    elem.remove();
                }

                function removeFailed() {
                    position(0);
                }
            }

            function start(coords) {
                isFinished = false;
                startCoords = coords;
            }
        }
    }
})();
