escom.controller('globalPopController',['$scope','$state','globals',
function($scope,$state,globals) {
	$scope.message = globals.get();
}]);	