app.service('apiSrv', ['$http',
    function($http) {
        /*
         * api urls
         */

        var self = this;

        this.api = {
            user: {
                login: "/accounts/login/",
                logout: "/accounts/logout/",
                registrate: "/accounts/signup/",
                profile: "/accounts/profile/",
                user: "api/v1/users/",
                userprofile: "api/v1/userprofiles/",
                offer: "api/v1/offers/",
                request: "api/v1/requests/"
            },
            lang: {
                lang: "api/languages/"
            },
            carTypes: "api/car_types/",
            geocoder: {
                address: "http://maps.googleapis.com/maps/api/geocode/json"
            }

        };

        var getTransformRequestFunc = function(type) {
            switch (type) {
                case "PARAM":
                    return function(data) {
                        return $.param(data);
                    };
                    break
                case "JSON":
                    return function(data) {
                        return JSON.stringify(data);
                    };
                    break
                default:
                    return function(data) {
                        return JSON.stringify(data);
                    };
                    break
            }
        };

        this.delete_func = function(url, params, success, error, type) {
            var contType = '';

            if (type == "PARAM")
                contType = 'application/x-www-form-urlencoded; charset=UTF-8';
            else
                contType = 'application/json';

            $http.delete(url, params)
                .success(function(data, status, headers, config) {
                    if (typeof(success) !== 'undefined')
                        success(data, status, headers, config);
                })
                .error(function(data, status, headers, config) {
                    if (typeof(error) !== 'undefined')
                        error(data, status, headers, config);
                });
        };

        this.put_func = function(url, params, success, error, type) {
            var contType = '';

            if (type == "PARAM")
                contType = 'application/x-www-form-urlencoded; charset=UTF-8';
            else
                contType = 'application/json';

            $http.put(url, params, {
                headers: {
                    'Content-Type': contType
                },
                transformRequest: getTransformRequestFunc(type)
            })
                .
            success(function(data, status, headers, config) {
                if (typeof(success) !== 'undefined')
                    success(data, status, headers, config);
            })
                .
            error(function(data, status, headers, config) {
                if (typeof(error) !== 'undefined')
                    error(data, status, headers, config);
            });
        };

        this.post_func = function(url, params, success, error, type) {
            var contType = '';

            if (type == "PARAM")
                contType = 'application/x-www-form-urlencoded; charset=UTF-8';
            else
                contType = 'application/json';

            $http.post(url, params, {
                headers: {
                    'Content-Type': contType
                },
                transformRequest: getTransformRequestFunc(type)
            })
                .
            success(function(data, status, headers, config) {
                if (typeof(success) !== 'undefined')
                    success(data, status, headers, config);
                //console.log(data);
            })
                .
            error(function(data, status, headers, config) {
                if (typeof(error) !== 'undefined')
                    error(data, status, headers, config);
            });
        };

        this.get_func = function(url, success, error) {
            $http.get(url)
                .
            success(function(data, status, headers, config) {
                if (typeof(success) !== 'undefined')
                    success(data, status, headers, config);
            })
                .
            error(function(data, status, headers, config) {
                if (typeof(error) !== 'undefined')
                    error(data, status, headers, config);
            });
        };

        this.get_func_params = function(url, params, success, error) {
            $http.get(url, {
                params: params,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                    'Access-Control-Allow-Credentials': true
                }
            })
                .
            success(function(data, status, headers, config) {
                if (typeof(success) !== 'undefined')
                    success(data, status, headers, config);
            })
                .
            error(function(data, status, headers, config) {
                if (typeof(error) !== 'undefined')
                    error(data, status, headers, config);
            });
        };

        /*
         *	type = "JSON", "PARAM"
         */
        this.send = {
            login: function(params, success, error, type) {
                self.post_func(self.api.user.login, params, success, error, "PARAM");
            },
            logout: function(params, success, error, type) {
                self.post_func(self.api.user.logout, params, success, error, "PARAM");
            },
            registrate: function(params, success, error, type) {
                self.post_func(self.api.user.registrate, params, success, error, "PARAM");
            },
            getUserInfo: function(user_id, success, error) {
                self.get_func(self.api.user.user + user_id + '/', success, error);
            },
            getUserProfile: function(user_id, success, error) {
                self.get_func(self.api.user.userprofile + user_id + '/', success, error);
            },
            setUserInfo: function(user_id, params, success, error) {
                self.put_func(self.api.user.user + user_id + '/', params, success, error, "JSON");
            },
            setUserProfile: function(user_id, params, success, error) {
                self.put_func(self.api.user.userprofile + user_id + '/', params, success, error, "JSON");
            },



            postOffer: function(params, success, error) {
                self.post_func(self.api.user.offer, params, success, error, "JSON");
            },
            deleteOffer: function(id, params, success, error) {
                self.delete_func(self.api.user.offer + id, params, success, error, "JSON");
            },
            putOffer: function(id, params, success, error) {
                self.put_func(self.api.user.offer + id, params, success, error, "JSON");
            },
            getOffer: function(params, success, error) {
                self.get_func_params(self.api.user.offer, params, success, error);
            },



            postRequest: function(params, success, error) {
                self.post_func(self.api.user.request, params, success, error, "JSON");
            },
            deleteRequest: function(id, params, success, error) {
                self.delete_func(self.api.user.request + id + '/', params, success, error, "JSON");
            },
            putRequest: function(id, params, success, error) {
                self.put_func(self.api.user.request + id + '/', params, success, error, "JSON");
            },
            getRequest: function(params, success, error) {
                self.get_func_params(self.api.user.request, params, success, error);
            },


            getAddressCoordinates: function(params, success, error) {
                self.get_func_params(self.api.geocoder.address, params, success, error);
            },


            getLang: function(success, error) {
                self.get_func(self.api.lang.lang, success, error);
            },
            getCarTypes: function(success, error) {
                self.get_func(self.api.carTypes, success, error);
            }
        }
    }
]);