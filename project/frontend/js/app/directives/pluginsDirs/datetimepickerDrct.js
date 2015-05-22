app.directive("datetimez", function () {
  return {
    link: function (scope, element) {
                element.datetimepicker({
                	locale: 'ru'
                });                
            }
  };
});

