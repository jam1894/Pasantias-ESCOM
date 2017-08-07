escom.controller('principalAdminController', ['$scope','$state','ModalService',
function($scope,$state,Modal) {

	$scope.formOK = function(){
		$state.go("menu.aprobadas");
	}
	
}]);