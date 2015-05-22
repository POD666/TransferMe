app.controller("offersCtrl", function($scope, $http) {
    $http.get('/static/frontend/json/offers.json').
    success(function(data, status, headers, config) {
        $scope.offers = data;
        console.log(data);
    }).
    error(function(data, status, headers, config) {
        console.log("error" + status);
    });
});