app.controller("postCtrl", ['$rootScope', '$scope', '$http', '$stateParams', 'apiSrv', 'globalUserSrv', 'utilsSrv',
    function($rootScope, $scope, $http, $stateParams, apiSrv, globalUserSrv, utilsSrv) {

        $scope.globalUserSrv = globalUserSrv;
        $scope.utilsSrv = utilsSrv;
        $scope.apiSrv = apiSrv;

        console.log('$scope.globalUserSrv.User.type', $scope.globalUserSrv.User.type, $stateParams.offerId, $stateParams.requestId);

        if ($scope.utilsSrv.isEmptyObj($stateParams.offerId) && $scope.utilsSrv.isEmptyObj($stateParams.requestId)) {
            console.log('badUrl');
            $scope.offer = "NONE";
        } else if ($scope.utilsSrv.isEmptyObj($stateParams.offerId)) {
            apiSrv.get_func("/api/v1/requests/" + $stateParams.requestId, function(data) {
                $scope.offer = data;
            });
        } else if ($scope.utilsSrv.isEmptyObj($stateParams.requestId)) {
            apiSrv.get_func("/api/v1/offers/" + $stateParams.offerId, function(data) {
                $scope.offer = data;
            });
        }

        $scope.apiSrv.send.getAddressCoordinates({
            address: "Akakhel" //$scope.offer.place_from.title
        }, function(data) {
            $scope.latitude = data.results[0].geometry.location.lat;
        });
        //hop

        /*if ($scope.globalUserSrv.User.type == 'traveller') {
        apiSrv.get_func("/api/v1/offers/" + $stateParams.offerId, function(data) {
            $scope.offer = data;
        });
    } else if ($scope.globalUserSrv.User.type == 'driver') {
        apiSrv.get_func("/api/v1/requests/" + $stateParams.requestId, function(data) {
            $scope.offer = data;
        });
    }*/
    }
]);