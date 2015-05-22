app.directive("profileAddCar", function () {
  return {
    link: function (scope, element) {
         	element.click(function(){
         		angular.element('.profile-add-car').show('slow');
         	});         
        }
  };
});