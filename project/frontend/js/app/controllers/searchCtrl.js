app.controller('searchCtrl', ['$scope', '$rootScope', '$http', 'apiSrv', 'globalUserSrv', '$cookies', '$cookieStore', '$window', 'globalSrv',

    function($scope, $rootScope, $http, apiSrv, globalUserSrv, $cookies, $cookieStore, $window, globalSrv) {


        $scope.apiSrv = apiSrv;
        $scope.globalSrv = globalSrv;
        $scope.globalUserSrv = globalUserSrv;

        $scope.cityFilterFrom = "";

        $scope.cityFrom = {};
        $scope.citiesFrom = [];

        $scope.cityTo = {};
        $scope.citiesTo = [];

        $scope.clickedAdvSearch = false;

        $scope.searchKeys = {
            place_from: '',
            place_to: '',
            price_from: null,
            price_to: null,
            date_from: '',
            date_to: '',
            languages: [],
            passanger_count: "",
            car_type: '',
            is_babysit: null,
            is_wifi: null,
            is_ski: null

        };

        $scope.offerClick = {
            exist: false,
            data: []
        };

        $scope.autocompleteLang = [];

        $scope.searchCitiesFrom = function() {
            angular.element('.city-from-input>div')
                .on('keyup', 'input.ng-valid-parse', function(e) {
                    if (e.which <= 90 && e.which >= 48) {
                        $http.get('/api/v1/places/autocomplete/?title=' + angular.element('.city-from-input>div>input.ng-valid-parse').val())
                            .success(function(data, status, headers, config) {
                                $scope.citiesFrom = data.objects;
                                console.log($scope.citiesFrom);
                            })
                            .error(function(data, status, headers, config) {
                                console.log("error" + status);
                            });
                    }
                });
        }


        $scope.searchCitiesTo = function() {
            angular.element('.city-to-input>div')
                .on('keyup', 'input.ng-valid-parse', function(e) {
                    if (e.which <= 90 && e.which >= 48) {
                        $http.get('/api/v1/places/autocomplete/?title=' + angular.element('.city-to-input>div>input.ng-valid-parse').val())
                            .success(function(data, status, headers, config) {
                                $scope.citiesTo = data.objects;
                                console.log($scope.citiesTo);
                            })
                            .error(function(data, status, headers, config) {
                                console.log("error" + status);
                            });
                    }
                });
        }

        var loadLang = false;

        $scope.autocompleteLangFunc = function() {
            if (!loadLang) {
                $scope.apiSrv.get_func("/api/languages/", function(data) {
                    $scope.autocompleteLang = data.objects;
                    console.log($scope.autocompleteLang);
                });
                loadLang = true;
            }
        }




        $scope.searchFunc = function() {

            console.log('globalSrv.carTypesSelect', $scope.globalSrv.carTypesSelect);
            var params = {};

            if ($scope.cityFrom.selected) params.place_from = $scope.cityFrom.selected.id;
            if ($scope.cityTo.selected) params.place_to = $scope.cityTo.selected.id;
            // if ($scope.searchKeys.price_from) params.price = $scope.searchKeys.price_from;
            if ($scope.searchKeys.price_from) params.price__gte = $scope.searchKeys.price_from;
            if ($scope.searchKeys.price_to) params.price__lte = $scope.searchKeys.price_to;
            if ($scope.searchKeys.car_type) params.car_type = $scope.searchKeys.car_type.id;
            if ($scope.searchKeys.is_babysit) params.is_baby_seat = $scope.searchKeys.is_babysit;
            if ($scope.searchKeys.is_ski) params.is_roof_rack = $scope.searchKeys.is_ski;
            if ($scope.searchKeys.is_wifi) params.is_wifi = $scope.searchKeys.is_wifi;
            if ($scope.searchKeys.passanger_count) params.places_count__lte = $scope.searchKeys.passanger_count;


            if ($scope.globalUserSrv.User.type == 'traveller') {
                $scope.apiSrv.send.getOffer(params, function(data, status, headers, config) {
                    $scope.offerClick.data = data.objects;
                    $scope.offerClick.exist = true;
                    console.log($scope.offerClick);
                    $scope.$broadcast('Toggle');
                    //$scope.toggleSearch();
                }, function(data, status, headers, config) {
                    console.log("error" + status);
                });
            } else if ($scope.globalUserSrv.User.type == 'driver') {
                $scope.apiSrv.send.getRequest(params, function(data, status, headers, config) {
                    $scope.offerClick.data = data.objects;
                    $scope.offerClick.exist = true;
                    console.log($scope.offerClick);
                    $scope.$broadcast('Toggle');
                    //$scope.toggleSearch();
                }, function(data, status, headers, config) {
                    console.log("error" + status);
                });
            }
            console.log('advsearch ');

        }

    }
]);