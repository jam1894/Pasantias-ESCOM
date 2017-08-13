escom.controller('loginController', ['$scope','$state','ModalService',
function($scope,$state,Modal) {
	$scope.login = function(){
		$state.go("menu.principalAdmin")
	}

	$scope.register = function(){
		$state.go("registroUsuarios")
	}
}]);


