app.directive("switchLoginRegistration", function () {
  return {
    link: function (scope, element) {
                element.click(function(){
                	if(angular.element('input[id=login]:checked', '.switch-toggle').val() == "login"){
                		angular.element('.confirm-password').hide('slow');
                		angular.element('.btn-login').val('Войти');
                	} else if(angular.element('input[id=registration]:checked', '.switch-toggle').val() == "registration"){
                		angular.element('.confirm-password').show('slow');
                		angular.element('.btn-login').val('Зарегистрироваться');
                	}
                });             
            }
  };
});

