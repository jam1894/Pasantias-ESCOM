escom.controller('rememPassController',['$scope','$state','changePassService','ModalService','globals',
function($scope,$state,changePassService,Modal,globals) {

	$scope.answerResp = false;

	var docum = "";

	$scope.remember = function(data,$event){
		$event.target.parentElement.parentElement.parentElement.parentElement.remove()
		if(data.response == $scope.answer.respuesta){
			var datals = {documento : docum};
			datals = JSON.stringify(datals)
			localStorage.setItem("user",datals);	        
	        Modal.showModal({
	          templateUrl : 'app/components/pop-ups/changePassword/changePassword.html',
	          controller : 'changePassController'
	        })
		}else{
            globals.set("¡La respuesta no es correcta!");
            Modal.showModal({
              templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
              controller : 'globalPopController'
            });
		}
	}

	$scope.validateD = function(documento){
		docum = documento;
		var url = "users/asnrespon/" + documento;
      	changePassService.servicesPassget(url).then(function(promise){
            var result = promise.data;
			if(result.status == 1){
				$scope.answer = result.response[0];
				$scope.answerResp = true;
			}else{
				$scope.answerResp= false;
	            globals.set(result.response);
	            Modal.showModal({
	              templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
	              controller : 'globalPopController'
	            })  
			}
      	})		
	}

}]);	