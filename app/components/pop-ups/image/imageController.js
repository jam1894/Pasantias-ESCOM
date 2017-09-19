escom.controller('imageController', ['$scope','$state','globals',
function($scope,$state,globals) {
	$scope.image = window.urlImages + globals.get();
}]);