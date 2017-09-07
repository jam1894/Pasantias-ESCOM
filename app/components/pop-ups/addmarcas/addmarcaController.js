escom.controller('addmarcaController',['$scope','$state','globals','ModalService','addmarcaServices',
function($scope,$state,globals,Modal,addmarcaServices) {

	var save = false;

	var data = {
		mark : ""
	}

	$scope.savemark = function(data){
		var url = "marcas";
		if($("#marca").val() != ""){
			addmarcaServices.servicesMarca(url,data).then(function(promise){
				var requests = promise.data;
				globals.set(requests.response);
				if(requests.status == 1){
	              	Modal.showModal({
	                	templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
	                	controller : 'globalPopController'
	              	});
	              }
				else if(requests.status == 0){
					Modal.showModal({
	                	templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
	                	controller : 'globalPopController'
	              	});
				}
			})		
		}else{
			globals.set("Debes completar todos los campos");
			Modal.showModal({
            	templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
            	controller : 'globalPopController'
          	});			
		}

	}
	
}]);	