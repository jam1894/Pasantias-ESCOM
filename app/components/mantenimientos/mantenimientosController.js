escom.controller('mantenimientosController', ['$scope','$state','ModalService','mantenimientosServices',
function($scope,$state,Modal,mantenimientosServices) {

	$scope.validateMan = false,$scope.ValidateNov = false,$scope.ValidateManU = false;

	function getMaintences(){
		url = "maquinas/mm/MachineMainte";
		var data = {};
		mantenimientosServices.servicesPrincipalget(url,data).then(function(promise){
			$scope.equipos = promise.data.response;
			if(promise.data.status == 1){
				for(var i=0;i<$scope.equipos.length;i++){
					if($scope.equipos[i].TiempoMantenimiento - $scope.equipos[i].TiempoUsoActual <= 0)
						$scope.ValidateManU = true;
					
					if($scope.equipos[i].TiempoMantenimiento - $scope.equipos[i].TiempoUsoActual > 0 &&
						$scope.equipos[i].TiempoMantenimiento - $scope.equipos[i].TiempoUsoActual <= 5)
						$scope.validateMan = true;					
				}			

			}else{
				$scope.validateMan = false;
				$scope.ValidateManU = false;
			}
		});
	}

	function getNovelties(){
		url = "novedades";
		var data = {};
		mantenimientosServices.servicesPrincipalget(url,data).then(function(promise){
			$scope.novedades = promise.data.response;
			if(promise.data.status == 1){
				console.log($scope.novedades);
				$scope.ValidateNov = true;
			}else{
				$scope.ValidateNov = false;
			}
		});
	}

	$scope.okMantenimientos = function(id){
		url = "maquinas/stateMachine/" + id;
		var data = {
			state : "Disponible",
			timeUseCurrent : 0
		};
		mantenimientosServices.servicesPrincipalput(url,data).then(function(promise){
			if(promise.data.state == 1){
				$state.reload();
			}else{

			}
		});
	}

	$scope.okNovedades = function(id){
		url = "novedades/" + id;
		var data = {
			state : "Revisado"
		};
		mantenimientosServices.servicesPrincipalput(url,data).then(function(promise){
			if(promise.data.state == 1){
				$state.reload();
			}
		});	
	}

	getMaintences();
	getNovelties();

}]);