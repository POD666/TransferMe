app.directive("tagInput", function () {	
  	return {
  		restrict : 'A',
		link: function (scope, element) {
		    element.taginput({
				style: 'bootstrap'
			});      
			angular.element('.taginput-wrapper').on('keyup', 'input', function(){
				console.log('uuu');
			    if(angular.element('.taginput-tag').length >= 5){
			      	$(this).attr('disabled','true').hide();
			    } 
			});
			angular.element('.taginput-tag.btn.btn-default.btn-sm').click( function(){
				console.log('hghhhhh');
			    if(angular.element('.taginput-tag').length <= 4){
				    angular.element('.taginput-wrapper input').attr('disabled','').show();
				    angular.element('.taginput-wrapper input').focus(); 
			    } 
			});       
		}
	};
});