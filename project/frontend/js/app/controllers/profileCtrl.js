app.controller('profileCtrl', ['$scope', '$http', 'apiSrv', 'globalUserSrv', '$cookies', '$cookieStore', '$window', '$timeout',

    function($scope, $http, apiSrv, globalUserSrv, $cookies, $cookieStore, $window, $timeout) {
        /*$scope.switchLogReg = 'registration';
        $scope.*/

        $scope.noError1 = false;
        $scope.noError2 = false;
        $scope.itsError1 = false;
        $scope.itsError2 = false;
        $scope.globalUserSrv = globalUserSrv;
        $scope.apiSrv = apiSrv;

        $scope.timeFunc = function() {
            console.log($scope.globalUserSrv.User.age);
        };

        $scope.save = function() {
            $scope.globalUserSrv.User.dob = angular.element('#dob_inp')
                .val();
            console.log($scope.globalUserSrv.User);
            $scope.globalUserSrv.setUserSett(
                function(error) {
                    $scope.itsError1 = error;
                    if (!$scope.itsError1)
                        $scope.noError1 = true;
                    else
                        $scope.noError1 = false;
                },
                function(error) {
                    $scope.itsError2 = error;
                    if (!$scope.itsError2)
                        $scope.noError2 = true;
                    else
                        $scope.noError2 = false;
                });
            $timeout(function() {
                $scope.noError1 = false;
                $scope.noError2 = false;
                $scope.itsError1 = false;
                $scope.itsError2 = false;
            }, 3500);
        };

        $scope.globalUserSrv.languages = [];
        var loadLang = false;

        $scope.autocompleteLangProfileFunc = function() {
            if (!loadLang) {
                $scope.apiSrv.get_func("/api/languages/", function(data) {
                    $scope.globalUserSrv.languages = data.objects;
                    console.log($scope.globalUserSrv.languages);
                });
                loadLang = true;
            }
        }

        $scope.delete = function(id, type) {
            console.log('delete', type);
            if (type == 'request') $scope.apiSrv.send.deleteRequest(id, {}, function(data) {
                console.log(type, data);
            });
            if (type == 'offer') $scope.apiSrv.send.deleteRequest(id, {}, function(data) {
                console.log(type, data);
            });
        }

    }
]);