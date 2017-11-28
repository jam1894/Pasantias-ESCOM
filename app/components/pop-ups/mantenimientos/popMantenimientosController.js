escom.controller('popMantenimientosController', ['$scope','$state','ModalService','popMantenimientosServices','globals',
function($scope,$state,Modal,popMantenimientosServices,globals) {

	var url = "";

	$scope.oknovelties = function(nov,$e){
		var id = globals.get();
		url = "novedades/" + id;
		var data = {
			state : "Revisado",
			solution : nov.solution
		};
		popMantenimientosServices.servicesPrincipalput(url,data).then(function(promise){
			if(promise.data.state == 1){
				$state.reload();
				$e.target.parentElement.parentElement.parentElement.remove();
			}else{
				$e.target.parentElement.parentElement.parentElement.remove();
                globals.set(promise.data.response);
                Modal.showModal({
                    templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
                    controller : 'globalPopController'
                })
			}
		});	
	}

}]);