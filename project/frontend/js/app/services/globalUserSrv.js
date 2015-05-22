app.service('globalUserSrv', ['$cookies', '$timeout', 'apiSrv', 'utilsSrv',
    function($cookies, $timeout, apiSrv, utilsSrv) {
        /*
         * type: "traveller", "driver"
         */

        var self = this;

        var getAge = function(birth) {
            var today = new Date();
            var nowyear = today.getFullYear();
            var nowmonth = today.getMonth();
            var nowday = today.getDate();
            console.log(nowyear, nowmonth, nowday);

            birth = new Date(birth);
            console.log(birth.toUTCString());
            var birthyear = birth.getFullYear();
            var birthmonth = birth.getMonth();
            var birthday = birth.getDate();

            console.log(birthyear, birthmonth, birthday);
            var age = nowyear - birthyear;

            var age_month = nowmonth - birthmonth;
            var age_day = nowday - birthday;

            return age;
        }

        this.User = {
            type: "traveller",
            firstName: "",
            lastName: "",
            location: "",
            age: "",
            languages: [],
            description: "",
            email: "",
            dob: "",
            avatarUrl: "",

            touristRatting: 0,
            driverRatting: 0,

            userId: "None",
            isAuthorised: false,
            userName: "",
            profileOffers: {},
            profileRequests: {}
        };


        this.checkIsAuth = function(event) {

            $timeout(function() {
                self.User.userId = $cookies.user_id;
                self.User.isAuthorised = $cookies.user_id != "None" ? true : false;
                self.getUserSett();
                console.log(self.User);
            }, 100);

        };

        this.getUserSett = function() {
            if (self.User.isAuthorised) {
                apiSrv.send.getUserInfo(self.User.userId, function(data) {
                    self.User.userName = data.username;
                    self.User.email = data.email;
                    self.User.firstName = data.first_name;
                    self.User.lastName = data.last_name;
                });
                apiSrv.send.getUserProfile(self.User.userId, function(data) {
                    console.log(data);
                    self.User.dob = data.dob;
                    self.User.location = data.location;
                    self.User.avatarUrl = data.avatar_url;
                    self.User.description = data.description;
                    self.User.type = data.is_driver ? "driver" : "traveller";
                    /*if (self.User.dob) {
                        self.User.age = getAge(self.User.dob);
                    }*/
                });

                apiSrv.send.getOffer({
                    user: self.User.userId
                }, function(data) {
                    self.User.profileOffers = data.objects;
                    console.log(self.User.profileOffers);
                });

                apiSrv.send.getRequest({
                    user: self.User.userId
                }, function(data) {
                    self.User.profileRequests = data.objects;
                    console.log(self.User.profileRequests);
                });
            }
            console.log(self.User);
        };

        this.setUserSett = function(errorHandler1, errorHandler2) {

            var userInfo = {
                    first_name: self.User.firstName,
                    last_name: self.User.lastName,
                },
                wasError = false;

            console.log(self.User.type == "traveller" ? false : true, self.User.type);
            var userProfile = {};
            if (!utilsSrv.isEmptyObj(self.User.description)) userProfile.description = self.User.description;
            if (!utilsSrv.isEmptyObj(self.User.location)) userProfile.location = self.User.location;
            if (!utilsSrv.isEmptyObj(self.User.dob)) userProfile.dob = self.User.dob;
            if (!utilsSrv.isEmptyObj(self.User.type)) userProfile.is_driver = self.User.type == "traveller" ? false : true;


            if (self.User.isAuthorised) {
                apiSrv.send.setUserInfo(self.User.userId, userInfo, function(data) {
                    console.log(data);
                    self.User.userName = data.username;
                    self.User.email = data.email;
                    self.User.firstName = data.first_name;
                    self.User.lastName = data.last_name;
                    errorHandler1(false);
                }, function(error) {
                    errorHandler1(true);
                });

                apiSrv.send.setUserProfile(self.User.userId, userProfile, function(data) {
                    console.log(data);
                    self.User.dob = data.dob;
                    self.User.location = data.location;
                    self.User.avatarUrl = data.avatar_url;
                    self.User.description = data.description;
                    self.User.type = data.is_driver ? "driver" : "traveller";
                    errorHandler2(false);
                }, function(error) {
                    errorHandler2(true);
                });
            }
        }
    }
]);