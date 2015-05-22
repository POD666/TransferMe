/*app.directive('clickAnywhereButHere', function($document) {
    return {
        restrict: 'A',
        link: function(scope, elem, attr, ctrl) {
            elem.bind('click', function(e) {
                // this part keeps it from firing the click on the document.
                e.stopPropagation();
            });
            $document.bind('click', function() {
                // magic here.
                scope.$apply(attr.clickAnywhereButHere);
            })
        }
    }
})*/


app.directive('clickOff', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var isOff;
            isOff = true;
            angular.element(document.body).bind('click', function() {
                if (isOff) {
                    scope.$eval(attrs.clickOff);
                    scope.$digest();
                }
                return isOff = true;
            });
            return element.bind('click', function() {
                isOff = false;
            });
        }
    };
});