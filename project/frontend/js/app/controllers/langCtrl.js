app.controller('langCtrl', ['$scope', '$rootScope', '$http', 'apiSrv', 'globalUserSrv', '$cookies', '$cookieStore', '$window', 'langSrv', 'utilsSrv', '$translate',

    function($scope, $rootScope, $http, apiSrv, globalUserSrv, $cookies, $cookieStore, $window, langSrv, utilsSrv, $translate) {
        $scope.globalUserSrv = globalUserSrv;
        $scope.apiSrv = apiSrv;
        $scope.langSrv = langSrv;
        $scope.utilsSrv = utilsSrv;

        $scope.selected_item = 1;

        $scope.items;


        //EVERYTHING IS CALLBACK
        $scope.loadLanguage = function(fun) {
            $scope.langSrv.getAllLangs(function(data) {
                if (typeof(fun) != 'undefined')
                    fun();
            });
            $scope.items = $scope.langSrv.langsList;
        };


        $scope.loadLanguage(function() {
            $scope.changeLanguage($scope.selected_item);
        });


        $scope.changeLanguage = function(id) {
            console.log('$scope.items', $scope.items);
            if ($scope.utilsSrv.isEmptyObj($scope.items)) {
                $scope.loadLanguage(function() {
                    $scope.selected_item = id;
                    $translate.use($scope.items[id].id)
                    $rootScope.changeLanguage($scope.items[id].id);
                });
            } else {
                if ($scope.items[$scope.selected_item].id != $translate.use()) {
                    $scope.selected_item = id;
                    $translate.use($scope.items[id].id)
                    $rootScope.changeLanguage($scope.items[id].id);
                } else {
                    $scope.selected_item = id;
                    $translate.use($scope.items[id].id)
                    $rootScope.changeLanguage($scope.items[id].id);
                }
            }


        };
    }
]);