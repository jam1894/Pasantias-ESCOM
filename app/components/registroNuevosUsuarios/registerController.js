escom.controller('registroUsuariosController',['$scope','$state','RegisterService','ModalService','globals',
function($scope,$state,RegisterService,Modal,globals) {

	$scope.rangos = {};

	$scope.register = function(data){

		if(data != undefined)
		{
			if(data.hasOwnProperty("lastname")  && data.hasOwnProperty("response") &&
				data.hasOwnProperty("name") && data.hasOwnProperty("nit") 							&&
				data.hasOwnProperty("password") && $("#range option:selected").text() != "Rango" 	&&
				$("#study-grade option:selected").text() != "Tipo de estudio" && $("#answer option:selected").text() != "Pregunta seguridad"){

				if(data.password.trim() === $("#passdValid").val().trim()){
					url="users"
					data["tipoestudio"] = $("#study-grade option:selected").val();
					data["rol"] = 1;
					data["range"] = $("#range option:selected").val();
					data["estado"] = 1;
					data["id_pregunta"] = $("#answer option:selected").val();
					RegisterService.servicesLogin(data,url).then(function(promise){
			            var result = promise.data;
			            console.log(result);
			            if(result.state == 1){
			            	sessionStorage.clear();
							sessionStorage.setItem("name",result.data[0].nombre);
							sessionStorage.setItem("rol",result.data[0].id_rol);
							sessionStorage.setItem("documento",result.data[0].documento);
			            	$state.go('login');
			            	
				            globals.set("De 24 a 48 horas se activará tu cuenta. En caso contrario, comuniquese con el administrador del sistema");
				            Modal.showModal({
				              templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
				              controller : 'globalPopController'
				            })	
			            }else{
				            globals.set(result.message);
				            Modal.showModal({
				              templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
				              controller : 'globalPopController'
				            })
			            }
						
		      		})
				}else{		 
		            globals.set("Las contraseñas no coinciden. Por favor intentalo nuevamente");
		            Modal.showModal({
		              templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
		              controller : 'globalPopController'
		            })
					$("#passdValid").val("");
					data.password = "";
				}

			}else{
	            globals.set("Debes completar toda la información requerida y Aceptar los términos y condiciones");
	            Modal.showModal({
	              templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
	              controller : 'globalPopController'
	            })
			}
		}else{
            globals.set("Debes completar toda la información requerida y Aceptar los términos y condiciones");
            Modal.showModal({
              templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
              controller : 'globalPopController'
            })
        }
	}

	function getRango(){
		url = "rango";
		data = {};
      	RegisterService.servicesLoginGet(data,url).then(function(promise){
            var result = promise.data;
            $scope.rangos = result.response;
      	})
	}

	function getAnswers(){
		url = "users";
		data = {};
      	RegisterService.servicesLoginGet(data,url).then(function(promise){
            var result = promise.data;
            $scope.answers = result.response;
      	})		
	}

	$scope.back = function(){
		$state.go("login");
	}

	$scope.openTerms = function(){
        Modal.showModal({
          templateUrl : 'app/components/pop-ups/Terms/terms.html',
          controller : 'globalPopController'
        })		
	}

	getAnswers()
	getRango();
}]);
