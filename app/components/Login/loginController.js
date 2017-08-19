escom.controller('loginController', ['$scope','$state','ModalService', 'loginServices',
function($scope,$state,Modal,loginServices) {

	$scope.login = function(data){
		url = "users/login";
		if($("#nit").val() != "" && ($("#password").val() != "")){
			loginServices.servicesLogin(url,data).then(function(promise){
				$scope.requests = promise.data;
				if($scope.requests.state>=1){
					sessionStorage.setItem("name",$scope.requests.message[0].nombre);
					sessionStorage.setItem("rol",$scope.requests.message[0].id_rol);
					sessionStorage.setItem("documento",$scope.requests.message[0].documento);
					if($scope.requests.message[0].id_rol == 1)			
						$state.go("menu.principalUser");
					else if($scope.requests.message[0].id_rol == 2)
						$state.go("menu.principalAdmin");
					else
						alert("El usuario no tiene permisos para ingresar");
				}else{
					alert($scope.requests.message);
				}
			})
		}
		else{
			alert("Completa todos los campos");
		}
	}

	$scope.register = function(){
		$state.go("registroUsuarios")
	}
}]);


