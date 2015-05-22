app.service('utilsSrv',
    function() {
        var self = this;

        this.isEmptyObj = function(obj) {
            if (typeof(obj) == 'undefined') return true;
            if (obj == null) return true;
            if (obj.length > 0) return false;
            if (obj.length === 0) return true;
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) return false;
            }
            return true;
        }

    }
);