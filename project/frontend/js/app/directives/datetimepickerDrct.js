// app.directive('datetimez', function() {
//     return {
//         restrict: 'A',
//         require : 'ngModel',
//         link: function(scope, element, attrs) {
//           element.datetimepicker({
//             dateFormat:'dd/MM/yyyy hh:mm:ss',
//             language: 'pt-BR'
//           }).on('changeDate', function(e) {            
//             scope.$apply();
//           });
//         }
//     };
// });

app.directive("datetimez", function() {
    return {
        link: function(scope, element) {
            element.datetimepicker({
                locale: 'ru'
            });
        }
    };
});

app.directive("taginput", function() {
    return {
        link: function(scope, element) {
            console.log('taginput', element);
            element.taginput({
                style: 'bootstrap'
            });
        }
    };
});