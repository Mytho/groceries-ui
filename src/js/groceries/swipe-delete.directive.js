(function() {
    'use strict';

    angular
        .module('groceries')
        .directive('swipeDelete', swipeDelete);

    swipeDelete.$inject = ['$swipe', '$timeout', 'groceriesService'];

    function swipeDelete($swipe, $timeout, groceriesService) {
        return {
            link: {
                pre: pre,
                post: post
            },
            scope: {
                item: '=swipeDelete'
            },
            template: '<div class="swipe-outer" ng-style="styles.outer">'+
                        '<div class="swipe-inner" ng-style="styles.inner" ng-transclude></div>'+
                        '<div class="swipe-undo" ng-style="styles.undo">'+
                          '<i class="fa fa-trash"></i>'+
                          '<a ng-click="undo()">UNDO</a>'+
                        '</div>'+
                      '</div>',
            transclude: true,
            replace: true,
            restrict: 'A'
        };

        function pre(scope, elem, attrs) {
            elem.data('origHeight', elem.outerHeight());
            elem.data('origPaddingTop', elem.css('padding-top'));
        }

        function post(scope, elem, attrs) {
            scope.styles = {
                outer: {
                    padding: 0,
                    height: elem.data('origHeight')
                },
                inner: {
                    'padding-top': elem.data('origPaddingTop'),
                    height: elem.data('origHeight')
                },
                undo: {
                    position: 'absolute',
                    'padding-top': elem.data('origPaddingTop'),
                    height: elem.data('origHeight')
                }
            };

            scope.undo = undo;

            $swipe.bind(elem, {
                start: start,
                move: move,
                end: end
            });

            function end(coords) {
                if ( ! scope.isFinished) {
                    return position(0);
                }

                scope.t = $timeout(remove, 1500);
            }

            function move(coords) {
                if (coords.x - scope.startCoords.x < 0) {
                    return position(0);
                }

                if (elem.find('.swipe-inner').offset().left > elem.find('.swipe-inner').outerWidth() / 2) {
                    scope.isFinished = true;
                    return position(elem.find('.swipe-inner').outerWidth());
                }

                position(coords.x - scope.startCoords.x, true);
            }

            function undo() {
                $timeout.cancel(scope.t);
                position(0);
            }

            function remove() {
                return groceriesService.remove(scope.item)
                    .then(removeComplete)
                    .catch(removeFailed);

                function removeComplete() {
                    elem.remove();
                }

                function removeFailed() {
                    position(0);
                }
            }

            function position(x, isInstant) {
                if (isInstant) {
                    return elem.find('.swipe-inner').css('left', x);
                }

                elem.find('.swipe-inner').animate({left: x}, 200);
            }

            function start(coords) {
                scope.isFinished = false;
                scope.startCoords = coords;
            }
        }
    }
})();
