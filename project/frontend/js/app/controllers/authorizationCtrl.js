app.controller('authorizationCtrl', ['$scope', '$rootScope', '$http', 'apiSrv', '$cookies', '$cookieStore', '$window', 'globalUserSrv', '$browser',

    function($scope, $rootScope, $http, apiSrv, $cookies, $cookieStore, $window, globalUserSrv, $browser) {

        $scope.globalUserSrv = globalUserSrv;

        $scope.switchLogReg = 'login';
        $scope.wasError = false;
        $scope.iferror = false;
        $scope.params = {
            email: "",
            pwd1: "",
            pwd2: ""
        };
        $scope.loggedIn = false;
        $scope.loggingIn = false;
        $rootScope.$broadcast('loggingIn-changed', {
            loggingIn: $scope.loggingIn
        });
        $scope.errortext = "";

        $scope.switchLoginRegistration = function() {
            if ($scope.switchLogReg === 'registration') {
                $scope.switchLogReg = 'login';
                $scope.params.pwd2 = "";
            } else {
                $scope.switchLogReg = 'registration';
            }
        }

        $scope.showLogin = function() {
            console.log('showLogin');
            $scope.loggingIn = true;
            $rootScope.$broadcast('loggingIn-changed', {
                loggingIn: $scope.loggingIn
            });
        };

        $scope.cancel = function() {
            console.log('cancel');
            $scope.loggingIn = false;
            $rootScope.$broadcast('loggingIn-changed', {
                loggingIn: $scope.loggingIn
            });
        };

        $scope.logout = function() {
            console.log('logout');
            apiSrv.send.logout({},
                function(data) {
                    $scope.globalUserSrv.checkIsAuth();
                    $scope.user = null;
                    $scope.loggedIn = false;
                }, function(data) {
                    $scope.globalUserSrv.checkIsAuth();
                });

        };

        $scope.login = function() {
            var params = {
                login: $scope.params.email,
                password: $scope.params.pwd1
            };
            apiSrv.send.login(params,
                function(data, status, headers) {
                    $scope.iferror = false;
                    $scope.globalUserSrv.checkIsAuth();
                    $scope.loggingIn = false;
                    $rootScope.$broadcast('loggingIn-changed', {
                        loggingIn: $scope.loggingIn
                    });
                    $scope.loggedIn = true;
                    $scope.wasError = false;
                }, function(data, status, headers) {
                    $scope.wasError = true;
                    $scope.globalUserSrv.checkIsAuth();
                    $scope.iferror = true;
                    $scope.errortext = data.form_errors.__all__[0];
                });
        };

        $scope.registrate = function() {
            var params = {
                email: $scope.params.email,
                password1: $scope.params.pwd1,
                password2: $scope.params.pwd2
            };
            apiSrv.send.registrate(params,
                function(data, status, headers) {
                    $scope.iferror = false;
                    $scope.globalUserSrv.checkIsAuth();
                    $scope.loggingIn = false;
                    $rootScope.$broadcast('loggingIn-changed', {
                        loggingIn: $scope.loggingIn
                    });
                    $scope.loggedIn = true;
                    $scope.wasError = false;
                }, function(data, status, headers) {
                    $scope.globalUserSrv.checkIsAuth();
                    $scope.wasError = true;
                    $scope.iferror = true;
                    $scope.wasError = true;
                    /*if (!wasError) {
                        angular.element('.modal-body').animate({
                            "height": "+=100px"
                        }, "fast");
                        wasError = true;
                    }*/
                });
        };
    }
]);