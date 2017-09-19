escom.controller('loginController', ['$scope','$state','ModalService', 'loginServices','globals',
function($scope,$state,Modal,loginServices,globals) {

	$scope.login = function(data){
		url = "users/login";
		if($("#nit").val() != "" && ($("#password").val() != "")){
			loginServices.servicesLogin(url,data).then(function(promise){
				$scope.requests = promise.data;
				if($scope.requests.state>=1){
					sessionStorage.setItem("name",$scope.requests.message[0].nombre);
					sessionStorage.setItem("apellido",$scope.requests.message[0].apellido);
					sessionStorage.setItem("rol",$scope.requests.message[0].id_rol);
					sessionStorage.setItem("documento",$scope.requests.message[0].documento);
					if($scope.requests.message[0].id_rol == 1)			
						$state.go("menu.principalUser");
					else if($scope.requests.message[0].id_rol == 2)
						$state.go("menu.principalAdmin");
					else{
			          	globals.set("El usuario no tiene permisos para ingresar");
			            	Modal.showModal({
			            		templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
			               		controller : 'globalPopController'
			            })
			        }  
				}else{
		          	globals.set($scope.requests.message);
		            	Modal.showModal({
		            		templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
		               		controller : 'globalPopController'
		            })
				}
			})
		}
		else{
          	globals.set("Completa todos los campos");
            	Modal.showModal({
            		templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
               		controller : 'globalPopController'
            })
		}
	}

	$scope.register = function(){
		$state.go("registroUsuarios")
	}
}]);


