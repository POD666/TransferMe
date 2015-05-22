app.controller('globalCtrl', ['$scope', '$http', 'apiSrv', 'globalUserSrv', '$cookies', '$cookieStore', '$window',

    function($scope, $http, apiSrv, globalUserSrv, $cookies, $cookieStore, $window) {
        /*$scope.switchLogReg = 'registration';
        $scope.*/
        $scope.globalUserSrv = globalUserSrv;
        $scope.apiSrv = apiSrv;



        $scope.isAuth = function() {
            return $scope.globalUserSrv.User.isAuthorised;
        };
    }
]);