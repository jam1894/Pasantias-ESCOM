escom.controller('principalAdminController', ['$scope','$state','ModalService','principalServices','globals',
function($scope,$state,Modal,principalServices,globals) {

	var url = "";
	$scope.validateSp = false, $scope.validateA = false, $scope.validateE = false, $scope.validateD = false, $scope.validateR = false;

	$scope.formOK = function(){
		$state.go("menu.aprobadas");
	}

	function getSolicitudes(){
		url = "solicitudes";
		var data = {};
		principalServices.servicesPrincipalget(url,data).then(function(promise){
			var requests = promise.data.response;
			$scope.requests = promise.data.response;
			if($scope.requests != 'No se encontraron datos'){
				for(var i=0;i<$scope.requests.length;i++){
					if($scope.requests[i].estado_solicitud == 1 && $scope.requests[i].days >= 0 && $scope.requests[i].days <= 3)
						$scope.validateSp = true;
					if($scope.requests[i].estado_solicitud == 2)
						$scope.validateA = true;
					if($scope.requests[i].estado_solicitud == 3 && $scope.requests[i].days >= -3)
						$scope.validateR = true;
					if($scope.requests[i].estado_solicitud == 4)
						$scope.validateE = true;
					if($scope.requests[i].estado_solicitud == 5 && $scope.requests[i].days >= -3)
						$scope.validateD = true;
				}
			}else{
				$scope.validateSp = false, $scope.validateA = false, $scope.validateE = false,$scope.validateD = false,$scope.validateR = false;
			}
		});
	}
	
	$scope.validarSol = function(id,action){
		url = "solicitudes/" + id;
		data = {
			state 			: action,
			img_entregada	: "",
			img_devuelta	: "",
			coment_ent		: "",
			coment_dev		: ""
		};
		principalServices.servicesPrincipalput(url,data).then(function(promise){
			var requests = promise.data.response;
			getSolicitudes();
		});
	}
	
	$scope.soliciPenAprob = function(id){
        globals.set(id);
        Modal.showModal({
        	templateUrl : 'app/components/pop-ups/solAprobadas/solAprobadas.html',
           	controller : 'solAprobadasController'
        })  
	}

	$scope.solicitudesApro = function(id){
        globals.set(id);
        Modal.showModal({
        	templateUrl : 'app/components/pop-ups/solEntregadas/solEntregadas.html',
           	controller : 'solEntregadasController'
        })  
	}

	$scope.solicitudesRechaz = function(id){
        globals.set(id);
        Modal.showModal({
        	templateUrl : 'app/components/pop-ups/solAprobadas/solRechazadas.html',
           	controller : 'solAprobadasController'
        })  
	}

	$scope.solicitudesEntre = function(id){
        globals.set(id);
        Modal.showModal({
        	templateUrl : 'app/components/pop-ups/solDevueltas/solDevuelto.html',
           	controller : 'solDevueltasController'
        }) 		
	}
	
	$scope.solicitudesDevuel = function(id){
		
	}
	
	getSolicitudes();

}]);