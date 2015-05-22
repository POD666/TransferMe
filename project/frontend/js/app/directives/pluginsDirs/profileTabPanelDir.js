app.directive("tagInput", function () {	
  	return {
  		link: function (scope, element) {
  			angular.element('#profile-tabs a').click(function (e) {
			  e.preventDefault()
			  $(this).tab('show')
			})
  		}
	};
});

