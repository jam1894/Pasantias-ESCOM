escom.controller('mantenimientosController', ['$scope','$state','ModalService','mantenimientosServices','globals',
function($scope,$state,Modal,mantenimientosServices,globals) {

	sessionStorage.getItem("documento") == null ? $state.go("login") : "ok";

	$scope.validateMan = false,$scope.ValidateNov = false,$scope.ValidateManU = false,$scope.ValidateUser = false;

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

	function getUsers(){
 		url = 'users/getUsersApp/getAll';
 		data = {};
		mantenimientosServices.servicesPrincipalget(url,data).then(function(promise){
			var requests = promise.data;
			$scope.usersApp = requests.response;
			if(promise.data.status == 1){
				console.log($scope.novedades);
				$scope.ValidateUser = true;
			}else{
				$scope.ValidateUser = false;
			}
		})			
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

	$scope.approveUser = function(id){
		url = "users/updateState/updateAccept";
		var data = {
			id : id
		};
		mantenimientosServices.servicesPrincipal(url,data).then(function(promise){
			if(promise.data.state == 1){
				$state.reload();
			}else{
                globals.set(promise.data.response);
                Modal.showModal({
                    templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
                    controller : 'globalPopController'
                })
			}
		});
	}

	$scope.rejectUser = function(id){
		url = "users/updateState/updateReject";
		var data = {
			id : id
		};
		mantenimientosServices.servicesPrincipal(url,data).then(function(promise){
			if(promise.data.state == 1){
				$state.reload();
			}else{
                globals.set(promise.data.response);
                Modal.showModal({
                    templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
                    controller : 'globalPopController'
                })
			}
		});
	}

	$scope.okNovedades = function(id){
        globals.set(id);
        Modal.showModal({
            templateUrl : 'app/components/pop-ups/mantenimientos/popMantenimientos.html',
            controller : 'popMantenimientosController'
        })
	}

	getMaintences();
	getNovelties();
	getUsers();

}]);