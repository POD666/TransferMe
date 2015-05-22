app.service('globalSrv', ['apiSrv',
    function(apiSrv) {

        var self = this;


        this.carTypesSelect = [];


        apiSrv.send.getCarTypes(function(data) {
            self.carTypesSelect = data.objects;
            console.log(self.carTypesSelect);
            //console.log($scope.selected);
        });

    }
]);