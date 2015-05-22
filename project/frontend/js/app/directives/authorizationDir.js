app.directive('authorizationModal',
    function($rootScope) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'static/frontend/templates/authorization.html',
            controller: function($scope) {
                var loginModal = $("#loginModal");

                $scope.$watch('wasError', function() {
                    if ($scope.wasError) {
                        angular.element('.modal-body').animate({
                            "height": "+=100px"
                        }, "fast");
                        $scope.wasError = false;
                    }
                });

                $rootScope.$on('loggingIn-changed', function(event, args) {
                    if (args.loggingIn) {
                        loginModal.modal('show');
                    } else {
                        loginModal.modal('hide');
                    }

                });

            }
        };
    }
);