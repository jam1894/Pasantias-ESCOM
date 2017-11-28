escom.controller('registroUsuariosAdminController',['$scope','$state','RegisterAdminService','ModalService','globals',
function($scope,$state,RegisterAdminService,Modal,globals) {

	sessionStorage.getItem("documento") == null ? $state.go("login") : "ok";

	$scope.rangos = {};
 	$scope.actionIU = "";

	$scope.register = function(data){

		if(data != undefined)
		{
			if( data.hasOwnProperty("lastname") && data.hasOwnProperty("name") && data.hasOwnProperty("nit") 
				&& $("#range option:selected").text() != "Rango" &&  $("#study-grade option:selected").text() != "Tipo de estudio"
				&& $("#state option:selected").text() != "Estado"){

				if($scope.actionIU == "insert"){
					if($("#password-id").val().trim() != "" && $("#passdValid").val().trim() != ""){
						if(data.password.trim() === $("#passdValid").val().trim()){
							url="users"
							data["tipoestudio"] = $("#study-grade option:selected").val();
							data["range"] = $("#range option:selected").val();
							data["rol"] = $("#tipo-usuario option:selected").val();
							data["estado"] = $("#state option:selected").val();
							data.rol == "1" ? data["state"] = 1 : data["state"] = 2;
							RegisterAdminService.servicesLogin(data,url).then(function(promise){
					            var result = promise.data;
					            globals.set(result.message);
					            Modal.showModal({
					              templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
					              controller : 'globalPopController'
					            });
								$scope.data = {
									name			: "",
									lastname 		: "",
									nit 			: "",
									password		: "",
				 				}
						 		$("#tipo-usuario").val($("#tipo-usuario option")[0].value);
						 		$("#range").val($("#range option")[0].value);
						 		$("#study-grade").val($("#study-grade option")[0].value);
						 		$("#passdValid").val("");				            				
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
					}
				
				}else if($scope.actionIU == "update"){
					if($("#password-id").val().trim() === $("#passdValid").val().trim()){
						url="users/" + data.nit;
						data["tipoestudio"] = $("#study-grade option:selected").val();
						data["range"] = $("#range option:selected").val();
						data["rol"] = $("#tipo-usuario option:selected").val();
						data["estado"] = $("#state option:selected").val();
						RegisterAdminService.servicesusersPut(data,url).then(function(promise){
				            var result = promise.data;
				            globals.set(result.response);
				            Modal.showModal({
				              templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
				              controller : 'globalPopController'
				            })
							$scope.data = {
								name			: "",
								lastname 		: "",
								nit 			: "",
								password		: "",
			 				}
					 		$("#tipo-usuario").val($("#tipo-usuario option")[0].value);
					 		$("#range").val($("#range option")[0].value);
					 		$("#study-grade").val($("#study-grade option")[0].value);
					 		$("#passdValid").val("");

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
				}

			}else{
	            globals.set("Debes completar toda la información requerida");
	            Modal.showModal({
	              templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
	              controller : 'globalPopController'
	            })
			}
		}else{
            globals.set("Debes completar toda la información requerida");
            Modal.showModal({
              templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
              controller : 'globalPopController'
            })
        }
	}

	$scope.validateUser = function(user){
 		data = {};
 		url = 'users/' + user;
		RegisterAdminService.servicesLoginGet(data,url).then(function(promise){
			var requests = promise.data;
			if(requests.status <= 0){
				$scope.actionIU = "insert";
				$scope.data = {
					name			: "",
					lastname 		: "",
					nit 			: user,
					password		: "",
 				}
		 		$("#tipo-usuario").val($("#tipo-usuario option")[0].value);
		 		$("#range").val($("#range option")[0].value);
		 		$("#study-grade").val($("#study-grade option")[0].value);
			}
			else{		
				var result = requests.response[0];
				$scope.data = {
					name			: result.nombre,
					lastname 		: result.apellido,
					nit 			: user,
					password		: ""
 				}
		 		$("#tipo-usuario").val(result.id_rol);
		 		$("#range").val(result.id_rango);
		 		$("#study-grade").val(result.id);
 				$scope.actionIU = "update";
			}
			
		})		
	}

	function getRango(){
		url = "rango";
		data = {};
      	RegisterAdminService.servicesLoginGet(data,url).then(function(promise){
            var result = promise.data;
            $scope.rangos = result.response;
      	})
	}

	$scope.delete = function(id){
		if(id != undefined && id != ""){
			url = 'users/' + id;
	      	RegisterAdminService.servicesusersDelete(data,url).then(function(promise){
	            var result = promise.data;
	            if(result.state == 1){
	            	$state.reload();
	            }
	      	})					
      }
	}

	getRango();
}]);
