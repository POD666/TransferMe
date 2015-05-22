app.directive("addCar", function () {
  return {
    link: function (scope, element) {
         	element.click(function(){
         		angular.element('.add-car-post').show('slow');
         	});         
        }
  };
});