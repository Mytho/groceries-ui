(function() {
    'use strict';

    angular
        .module('groceries')
        .directive('swipeDelete', swipeDelete);

    swipeDelete.$inject = ['$swipe'];

    function swipeDelete($swipe) {
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
                        '<div class="swipe-cancel" ng-style="styles.cancel">'+
                          '<i class="fa fa-trash"></i>'+
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
            var isFinished, startCoords;

            scope.styles = {
                outer: {
                    padding: 0,
                    height: elem.data('origHeight')
                },
                inner: {
                    'padding-top': elem.data('origPaddingTop'),
                    height: elem.data('origHeight')
                },
                cancel: {
                    position: 'absolute',
                    'padding-top': elem.data('origPaddingTop'),
                    height: elem.data('origHeight')
                }
            };

            $swipe.bind(elem, {
                start: start,
                move: move,
                end: end,
                cancel: cancel
            });

            function cancel(coords) {
                // ..
            }

            function end(coords) {
                if ( ! isFinished) {
                    position(0);
                }
            }

            function move(coords) {
                if (coords.x - startCoords.x < 0) {
                    return position(0);
                }

                if (elem.find('.swipe-inner').offset().left > elem.find('.swipe-inner').outerWidth() / 2) {
                    isFinished = true;
                    return position(elem.find('.swipe-inner').outerWidth());
                }

                position(coords.x - startCoords.x, true);
            }

            function position(x, isInstant) {
                if (isInstant) {
                    return elem.find('.swipe-inner').css('left', x);
                }

                elem.find('.swipe-inner').animate({left: x}, 200);
            }

            function start(coords) {
                isFinished = false;
                startCoords = coords;
            }
        }
    }
})();
