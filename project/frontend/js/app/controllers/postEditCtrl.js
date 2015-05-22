app.controller('postEditCtrl', ['$rootScope', '$scope', '$http', '$stateParams', 'apiSrv', 'globalUserSrv', 'utilsSrv',

    function($rootScope, $scope, $http, $stateParams, apiSrv, globalUserSrv, utilsSrv) {

        $scope.id_lol;
        $scope.type;

        $scope.cityFrom = {};
        $scope.citiesFrom = [];

        $scope.cityTo = {};
        $scope.citiesTo = [];

        $scope.noError = false;
        $scope.itsError = false;

        $scope.globalUserSrv = globalUserSrv;
        $scope.utilsSrv = utilsSrv;
        console.log('postEditCtrl');
        $scope.editAdvFields = {
            title: '',
            price: null,
            currency: '$',
            place_from: '',
            place_to: '',
            date_from: '',
            date_to: '',
            description: '',
            is_baby_seat: false,
            is_wifi: false,
            is_roof_rack: false,
            photo: '',
            brand: '',
            model: '',
            car_type: '',
            places_count: ''
        };

        $scope.searchCitiesFrom = function() {
            angular.element('.city-from-input>div').on('keyup', 'input.ng-valid-parse', function(e) {
                if (e.which <= 90 && e.which >= 48) {
                    $http.get('/api/v1/places/autocomplete/?title=' + angular.element('.city-from-input>div>input.ng-valid-parse').val()).
                    success(function(data, status, headers, config) {
                        $scope.citiesFrom = data.objects;
                    }).
                    error(function(data, status, headers, config) {});
                }
            });
        }


        $scope.searchCitiesTo = function() {
            angular.element('.city-to-input>div').on('keyup', 'input.ng-valid-parse', function(e) {
                if (e.which <= 90 && e.which >= 48) {
                    $http.get('/api/v1/places/autocomplete/?title=' + angular.element('.city-to-input>div>input.ng-valid-parse').val()).
                    success(function(data, status, headers, config) {
                        $scope.citiesTo = data.objects;
                    }).
                    error(function(data, status, headers, config) {});
                }
            });
        }

        if ($scope.utilsSrv.isEmptyObj($stateParams.offerId) && $scope.utilsSrv.isEmptyObj($stateParams.requestId)) {
            console.log('badUrl');
            $scope.offer = "NONE";
        } else if ($scope.utilsSrv.isEmptyObj($stateParams.offerId)) {
            apiSrv.get_func("/api/v1/requests/" + $stateParams.requestId, function(data) {
                $scope.offer = data;
                console.log('requests :', $scope.offer, $scope.editAdvFields);
                $scope.cityFrom.selected = $scope.offer.place_from;
                $scope.cityTo.selected = $scope.offer.place_to;
                $scope.offer.place_from = '';
                $scope.offer.place_to = '';
                $scope.editAdvFields = $scope.offer;
                $scope.type = 'request';
                $scope.id_lol = $stateParams.requestId;

            });
        } else if ($scope.utilsSrv.isEmptyObj($stateParams.requestId)) {
            apiSrv.get_func("/api/v1/offers/" + $stateParams.offerId, function(data) {
                $scope.offer = data;
                console.log('offer :', $scope.offer, $scope.editAdvFields);
                $scope.cityFrom.selected = $scope.offer.place_from;
                $scope.cityTo.selected = $scope.offer.place_to;
                $scope.offer.place_from = '';
                $scope.offer.place_to = '';
                $scope.editAdvFields = $scope.offer;
                $scope.type = 'offer';
                $scope.id_lol = $stateParams.offerId;
            });
        }


        $scope.edit = function() {
            console.log('edit');
            var editObj = {};
            editObj.date_from = angular.element('#date_from').val();
            if (!$scope.utilsSrv.isEmptyObj($scope.editAdvFields.places_count)) editObj.places_count = parseInt($scope.editAdvFields.places_count);
            editObj.price = parseInt($scope.editAdvFields.price);
            editObj.date_to = angular.element('#date_to').val();
            editObj.car_type = $scope.editAdvFields.car_type.id;
            editObj.place_from = $scope.cityFrom.selected.resource_uri;
            editObj.place_to = $scope.cityTo.selected.resource_uri;

            if ($scope.type == 'offer') {
                $scope.apiSrv.send.putOffer($scope.id_lol, editObj, function(data) {
                    console.log(data);
                    $scope.noError = true;
                });
            } else if ($scope.type == 'request') {
                $scope.apiSrv.send.putRequest($scope.id_lol, editObj, function(data) {
                    console.log(data);
                    $scope.noError = true;
                });
            }

        };

    }
]);