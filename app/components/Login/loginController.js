escom.controller('loginController', ['$scope','$state','ModalService', 'loginServices',
function($scope,$state,Modal,loginServices) {

	$scope.login = function(data){
		url = "users/login";
		if($("#nit").val() != "" && ($("#password").val() != "")){
			loginServices.servicesLogin(url,data).then(function(promise){
				$scope.requests = promise.data;
				if($scope.requests.state>=1){
					$state.go("menu.principalAdmin");
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
		$state.go("registro")
	}
}]);


