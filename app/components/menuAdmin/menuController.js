escom.controller('menuController', ['$scope','$state','ModalService',
function($scope,$state,Modal) {
	$scope.getuser = sessionStorage.getItem("name") != undefined ? sessionStorage.getItem("name") : "NAN";
	$scope.rol = sessionStorage.getItem("rol") != undefined ? sessionStorage.getItem("rol") : "NAN";
	$scope.logout = function(){
		sessionStorage.clear();
		$state.go("login");
	}
}]);