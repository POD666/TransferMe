app.directive('clickFullSearch', ['$document', '$rootScope',
    function($document, $rootScope) {
        var clicked = false;
        var flag = true;
        /*ctrl - fn = "someCtrlFn(arg1)"*/
        return {
            restrict: 'A',
            link: function(scope, elem, attr, ctrl) {

                scope.toggleSearch = function() {


                    if (!clicked) {
                        // $animate.addClass(element, 'animate-show-search');

                        angular.element('#full-search-icon').toggleClass('glyphicon-chevron-down', false);
                        angular.element('#full-search-icon').toggleClass('glyphicon glyphicon-chevron-up', true);
                        angular.element('.headerSearch').animate({
                            "padding-top": "-=120px",
                            "margin-top": "-=30px"
                        }, "slow");
                        angular.element('.search-box').animate({
                            "height": "+=262px"
                        }, "slow");
                        angular.element('.search-filters').slideDown(" slow ");

                    } else {
                        angular.element('#full-search-icon').toggleClass('glyphicon-chevron-up', false);
                        angular.element('#full-search-icon').toggleClass('glyphicon-chevron-down', true);
                        angular.element('.search-filters').hide();
                        angular.element('.headerSearch').animate({
                            "padding-top": "+=120px",
                            "margin-top": "+=30px"
                        }, "slow");
                        angular.element('.search-box').animate({
                            "height": "-=262px"
                        }, "slow");
                    }
                    clicked = !clicked;
                }
                scope.$on('Toggle', function(event, args) {
                    console.log('on Toggle');
                    if (!clicked)
                        scope.toggleSearch();
                });
                elem.bind('click', function(e) {
                    scope.toggleSearch();

                });
            }
        }
    }
])