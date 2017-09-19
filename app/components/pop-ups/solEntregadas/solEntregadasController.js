escom.controller('solEntregadasController', ['$scope','$state','ModalService','solEntregadasServices','globals','Upload','$timeout',
function($scope,$state,Modal,solEntregadasServices,globals,Upload,$timeout) {

	var url = "";

	var name = datauser = sessionStorage.getItem("name");
	var lastname = datauser = sessionStorage.getItem("apellido");

	$scope.validarSol = function(id,action,image){
		url = "solicitudes/" + id;
		var coment = $("#coment").val();
		data = {
			state 			: action,
			coment_ent		: coment,
			coment_dev		: "",
			usuario_entrega : name + " " + lastname,
			usuario_recibe  : ""
		};
		solEntregadasServices.servicesPrincipalput(url,data).then(function(promise){
			var requestSol = promise.data.response;
			globals.set(requestSol);
	      	Modal.showModal({
	        	templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
	        	controller : 'globalPopController'
	     	});
	     	if(image != undefined){
	     		$scope.uploadPic(id,image);
	     	}
	     	
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

 	$scope.uploadPic = function(id,image) {
        Upload.upload({
	      url: window.urlService + 'solicitudes/storageImage',
	      data: {file: image,id_solicitud : id,accion : 1},
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            globals.set('Error status: ' + resp.status);
            Modal.showModal({
            	templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
               	controller : 'globalPopController'
            })  
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    }

	$scope.reload = function(){
		$state.reload();
	}

	$scope.getsolicitud();

}]);