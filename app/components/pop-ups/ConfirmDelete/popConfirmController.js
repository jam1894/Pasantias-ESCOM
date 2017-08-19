escom.controller('confirmController',['$scope','$state','globals','homeService','ModalService',
function($scope,$state,globals,homeService,Modal) {

	$scope.confirmDelete = function(){
		var id = globals.get();
		var url = "solicitudes/"+ id;
		data = {};
	    homeService.servicesDelRequest(data,url).then(function(promise){
	      var result = promise.data;
	      globals.set(result.response);
	      Modal.showModal({
	        templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
	        controller : 'globalPopController'
	      });

	      if(result.state == 1)
	      	$("#solicitud-"+id).hide();
	    })  		
	}
}]);	