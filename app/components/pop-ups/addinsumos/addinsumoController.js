escom.controller('addinsumosController',['$scope','$state','globals','addinsumosServices','ModalService',
function($scope,$state,globals,addinsumosServices,Modal) {


	$scope.saveSupplie = function(data){
		var url = "insumos";
		if($("#code").val() != "" && $("#supplie").val() != "" && $("#quantity").val() != ""){
			addinsumosServices.servicesInsumos(url,data).then(function(promise){
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