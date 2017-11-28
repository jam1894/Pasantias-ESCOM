escom.directive('scrollVertical', function(){
	function scroll(scope, element, attrs){
		repeatNtimes(20, 100, function(){
			var width_display = $(window).width();
			var height_display = $(window).height();

			if(($(".list-historial").height()+60)>height_display){
				var height_Scroll=($(".list-historial").height()+60)-$(element).height()-height_display;
				if(height_Scroll<0){
					height_Scroll = height_Scroll*-1;
				}
				$(element).css("height", height_Scroll+ "px");
			}
		});
	}
	return{
		restrict: 'A',
		link: scroll
	};
});

escom.directive('popUp', function(){
	function pop_up(scope, element, attrs){
		confirmDOMChanges(function(){
			element.css("max-height", height_display-50 + "px" );
			element.find(".pop-up section").css("max-height", element.height() + "px");

			var position_popUp = height_display/2 - element.height()/2;
			element.css("top", position_popUp + "px");
		});

		var $button = element.find(".button-close, .button-close2");

		$button.click(function(){
			element.parent().remove();
			if(scope.onCloseModal){
				scope.onCloseModal();
			}
		});

		scope.closeModal = function(){
			$button.click();
		}
	}
	return{
		restrict: 'C',
		link: pop_up
	};
});


escom.directive('maxHeight', function(){
	return{
		restrict: 'A',
		link : function (scope, element, attrs){
			var $elem = $(element);

			var refresh = function(){
				var maxHeight = parseInt(attrs.maxHeight);
				var height = $elem.height();
				if(height > maxHeight){
					$elem.css({
						position : 'absolute',
						top 	 : (-1 * (height - maxHeight) / 2) + 'px'
					});
				}
				else{
					$elem.css({
						position : 'relative'
					});
				}
			};

			$elem.load(refresh);
		}
	};
});


function repeatNtimes(n, duration, callback){
	var count = 0;
	var interval = setInterval(function(){
		if(count === n){
			clearInterval(interval);
			return;
		}
		count++;
		callback();
	}, duration);
}
