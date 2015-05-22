app.service('langSrv', ['$http', 'apiSrv',
    function($http, apiSrv) {

        var self = this;

        this.langsList = {};

        this.updateLangs = function() {};

        this.getAllLangs = function(suc) {
            var langs = {};
            console.log(suc);
            apiSrv.send.getLang(function(data) {
                self.langsList = data.objects;
                console.log(self.langsList);
                if (typeof(suc) != 'undefined') suc();
            });
        };

    }
]);