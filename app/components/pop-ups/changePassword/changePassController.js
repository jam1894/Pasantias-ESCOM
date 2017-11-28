escom.controller('changePassController',['$scope','$state','changePassService','ModalService','globals',
function($scope,$state,changePassService,Modal,globals) {

	 var dataUser = JSON.parse(sessionStorage.getItem("documento"));

	$scope.save = function(data,$event){
		var url = "users/restore/" + dataUser;
		if(data.password === data.validatePass){
	      	changePassService.servicesPass(data,url).then(function(promise){
	      		$event.target.parentElement.parentElement.parentElement.parentElement.remove();
	            var result = promise.data;
				if(result.state == 1){
					$state.go('login');
				}else{
		            globals.set(result.message);
		            Modal.showModal({
		              templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
		              controller : 'globalPopController'
		            })  
				}
	      	})	
		}else{
            globals.set("las constraseñas son distintas. Inténtalo nuevamente");
            Modal.showModal({
              templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
              controller : 'globalPopController'
            })  			
		}
	}

	$scope.remember = function(){
		
	}

}]);	