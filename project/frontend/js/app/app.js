var app = angular.module('TravelApp', [
    'ui.router',
    'ngCookies',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'ui.select',
    'uiGmapgoogle-maps'


])

app.config(['$urlRouterProvider', '$locationProvider', '$stateProvider', '$httpProvider', '$translateProvider', 'uiSelectConfig',
    function($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider, $translateProvider, uiSelectConfig) {


        /*
        ROUTING
        */
        $urlRouterProvider.otherwise('/search');
        $stateProvider
            .state('search', {
                url: '/search',
                views: {
                    'box@search': {
                        templateUrl: '/static/frontend/templates/search.html',
                        controller: function($scope) {
                            console.log('search');
                        }
                    }
                }
            })
            .state('addadv', {
                url: '/addadv',
                views: {
                    'addpost@addadv': {
                        templateUrl: '/static/frontend/templates/addadv.html',
                        controller: function($scope) {
                            console.log('addadv');
                        }
                    }
                }

            })
            .state('profile', {
                url: '/profile',
                views: {
                    'page@profile': {
                        templateUrl: '/static/frontend/templates/profile.html',
                        controller: function($scope) {
                            console.log('profile');
                        }
                    }
                }

            })
            .state('request', {
                url: '/request/:requestId',
                views: {
                    'postview@post': {
                        templateUrl: '/static/frontend/templates/postview.html',
                        controller: function($scope) {
                            console.log('postrequestview');
                        }
                    }
                }

            })
            .state('request.edit', {
                url: '/edit',
                views: {
                    'postview@post': {
                        templateUrl: '/static/frontend/templates/postedit.html',
                        controller: function($scope) {
                            console.log('postrequestview');
                        }
                    }
                }

            })
            .state('offer', {
                url: '/offer/:offerId',
                views: {
                    'postview@post': {
                        templateUrl: '/static/frontend/templates/postview.html',
                        controller: function($scope) {
                            console.log('postofferview_edit');
                        }
                    }
                }
            })
            .state('offer.edit', {
                url: '/edit',
                views: {
                    'postview@post': {
                        templateUrl: '/static/frontend/templates/postedit.html',
                        controller: function($scope) {
                            console.log('postrequestview_edit');
                        }
                    }
                }

            });

        /*
        LOCATION
        */
        $locationProvider.html5Mode(false);

        /*
        HTTP
        */
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.post['Accept'] = '*/*';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        //delete $httpProvider.defaults.headers.common["X-Requested-With"]; //Вася це для аякса так шо не чіпай) іначє буде біда

        $translateProvider.useStaticFilesLoader({
            prefix: '/static/frontend/json/translate/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');


    }
]);

app.run(['$rootScope', 'globalUserSrv', 'langSrv', '$translate',
    function($rootScope, globalUserSrv, langSrv, $translate) {

        $rootScope.changeLanguage = function(key) {
            console.log(key, $translate.use());
            $translate.use(key);
        };

        globalUserSrv.checkIsAuth();

        langSrv.getAllLangs();

    }
]);