escom.controller('solDevueltasController', ['$scope','$state','ModalService','solDevueltasServices','globals',
function($scope,$state,Modal,solDevueltasServices,globals) {

	var url = "";

	$scope.validarSol = function(id,action,comentario){
		url = "solicitudes/" + id;
		var coment = $("#coment").val();
		data = {
			state 			: action,
			img_entregada	: "",
			img_devuelta	: "",
			coment_ent		: "",
			coment_dev		: coment
		};
		solDevueltasServices.servicesPrincipalput(url,data).then(function(promise){
			var requestSol = promise.data.response;
			globals.set(requestSol);
	      	Modal.showModal({
	        	templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
	        	controller : 'globalPopController'
	     	});		
		});
	}

	$scope.getsolicitud = function(){
		var id = globals.get();
		url = "solicitudes/" + id;
		data = {};
		solDevueltasServices.servicesPrincipalget(url,data).then(function(promise){
			$scope.requests = promise.data.response[0];
			$scope.insumos = promise.data.response.insumos;
		});
	}

	$scope.reload = function(){
		$state.reload();
	}

	$scope.getsolicitud();

}]);