app.controller('addAdvCtrl', ['$scope', '$http', 'apiSrv', 'globalUserSrv', 'globalSrv',

    function($scope, $http, apiSrv, globalUserSrv, globalSrv) {

        $scope.apiSrv = apiSrv;
        $scope.globalUserSrv = globalUserSrv;
        $scope.globalSrv = globalSrv;

        $scope.cityFrom = {};
        $scope.citiesFrom = [];

        $scope.cityTo = {};
        $scope.citiesTo = [];

        $scope.noError = false;
        $scope.itsError = false;

        $scope.addAdvFields = {
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

        $scope.autocompleteLang = [];
        var loadLang = false;

        $scope.autocompleteLangFunc = function() {
            if (!loadLang) {
                $scope.apiSrv.send.getLang(function(data) {
                    $scope.autocompleteLang = data.objects;
                    console.log($scope.autocompleteLang);
                });
                loadLang = true;
            }
        }


        $scope.post = function() {
            $scope.addAdvFields.date_from = angular.element('#date_from').val();
            $scope.addAdvFields.places_count = parseInt($scope.addAdvFields.places_count);
            $scope.addAdvFields.price = parseInt($scope.addAdvFields.price);
            $scope.addAdvFields.date_to = angular.element('#date_to').val();
            $scope.addAdvFields.car_type = $scope.addAdvFields.car_type.id;
            $scope.addAdvFields.place_from = $scope.cityFrom.selected.resource_uri;
            $scope.addAdvFields.place_to = $scope.cityTo.selected.resource_uri;
            if ($scope.globalUserSrv.User.type == 'driver') {
                $scope.apiSrv.send.postOffer($scope.addAdvFields, function(data) {
                    console.log(data);
                    $scope.noError = true;
                });
            } else {
                $scope.apiSrv.send.postRequest($scope.addAdvFields, function(data) {
                    console.log(data);
                    $scope.noError = true;
                });
            }

        };


    }
]);