app.directive("commentUserRating", function () {
  return {
    link: function (scope, element) {
                element.rating(
                	{
                		// 'readonly' : true,
                		'showClear' : false,
                		'showCaption' : true,
                		'starCaptions': {
                			0.5 : '0.5', 
                			1 : '1', 
                			1.5 : '1.5', 
                			2 : '2',
                			2.5 : '2.5',
                			3 : '3',
                			3.5 : '3.5',
                			4 : '4',
                			4.5 : '4.5',
                			5 : '5',
                		},
                        'clearCaption' : '0'
                	}
                );          
            }
  };
});

app.directive("commentRating", function () {
  return {
    link: function (scope, element) {
                element.rating(
                	{
                		// 'readonly' : true,
                		'showClear' : false,
                		'showCaption' : false,
                		'starCaptions': {
                			0.5 : '0.5', 
                			1 : '1', 
                			1.5 : '1.5', 
                			2 : '2',
                			2.5 : '2.5',
                			3 : '3',
                			3.5 : '3.5',
                			4 : '4',
                			4.5 : '4.5',
                			5 : '5',
                		},
                        'clearCaption' : '0'
                	}
                );          
            }
  };
});


app.directive("profileRating", function () {
  return {
    link: function (scope, element) {
                element.rating(
                	{
                		// 'readonly' : true,
                		'showClear' : false,
                		'showCaption' : true,
                		'starCaptions': {
                			0.5 : '0.5', 
                			1 : '1', 
                			1.5 : '1.5', 
                			2 : '2',
                			2.5 : '2.5',
                			3 : '3',
                			3.5 : '3.5',
                			4 : '4',
                			4.5 : '4.5',
                			5 : '5',
                		},
                        'clearCaption' : '0'
                	}
                );          
            }
  };
});