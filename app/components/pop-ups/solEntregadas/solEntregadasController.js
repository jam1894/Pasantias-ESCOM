escom.controller('solEntregadasController', ['$scope','$state','ModalService','solEntregadasServices','globals',
function($scope,$state,Modal,solEntregadasServices,globals) {

	var url = "";

	$scope.validarSol = function(id,action,comentario){
		url = "solicitudes/" + id;
		var coment = $("#coment").val();
		data = {
			state 			: action,
			img_entregada	: "",
			img_devuelta	: "",
			coment_ent		: coment,
			coment_dev		: ""
		};
		solEntregadasServices.servicesPrincipalput(url,data).then(function(promise){
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
		solEntregadasServices.servicesPrincipalget(url,data).then(function(promise){
			$scope.requests = promise.data.response[0];
			$scope.insumos = promise.data.response.insumos;
		});
	}

	$scope.reload = function(){
		$state.reload();
	}

	$scope.getsolicitud();

}]);