escom.controller('registroMaquinasController', ['$scope','$state','registroMaquinaServices','ModalService', 'globals',
function($scope,$state,registroMaquinaServices,Modal,globals) {

  	$scope.data = {
    	changesupplie 	: $("#insum option")[0].value,
    	state 			: $("#state-id option")[0].value
  	};

 	$scope.supplies = [];
 	$scope.actionIU = "";
 	$scope.img = 'assets/img/ESCOM_2.jpg';

 	var url = "";

 	function getMark(){
 		data = {};
 		url = 'marcas';
		registroMaquinaServices.servicesRegistroMaquina(url,data).then(function(promise){
			var requests = promise.data.response;
			if(requests.length > 0)
				$scope.marks = promise.data.response;
			else
				console.log("no hay marcas");
			
		})
 	}

 	function getsupplies(){
 		data = {};
 		url = 'insumos';
		registroMaquinaServices.servicesRegistroMaquina(url,data).then(function(promise){
			var requests = promise.data.response;
			if(requests.length > 0)
				$scope.supplieget = promise.data.response;
			else
				console.log("no hay insumos");
			
		})
 	}

	$scope.validateMachine = function(machine){
 		data = {};
 		url = 'maquinas/' + machine;
		registroMaquinaServices.servicesRegistroMaquina(url,data).then(function(promise){
			var requests = promise.data;
			if(requests.status > 0){
				$scope.result = promise.data.response[0];
				$scope.supplies = promise.data.response.insumos;
				$scope.data = {
					serial			: machine,
					model 			: $scope.result.Modelo,
					machine 		: $scope.result.Equipo,
					state 			: $scope.result.Estado,
					timeMaintenance	: $scope.result.TiempoMantenimiento,
					timeUseCurrent	: $scope.result.TiempoUsoActual
 				}
				$("#choose-marca").val($scope.result.id_Marca);
				$scope.actionIU = "update";
			}
			else{
				$scope.actionIU = "insert";
				$scope.supplies = [];
				$scope.data = {
					serial			: machine,
					model 			: "",
					machine 		: "",
					state 			: $("#state-id option")[0].value,
					timeMaintenance	: "",
					timeUseCurrent	: "",
			    	changesupplie 	: $("#insum option")[0].value
 				}
 				$("#choose-marca").val($("#choose-marca option")[0].value);
			}
			
		})
	}

	$scope.SaveorUpdate = function(data){
		if($("#serial-id").val() != "" && $("#model-id").val() != "" && $("#machine-id").val() != "" 
			&& $("#choose-marca").val() != "" && $("#state-id").val() != "" && $("#timeMaintenance-id").val() != "" 
			&& $("#timeUseCurrent-id").val() != ""){
			data["id_mark"] = $("#choose-marca").val();
			data["supplies"] = [];
			for(var i = 0; i < $scope.supplies.length; i++){
				data["supplies"].push($scope.supplies[i].Id_insumo);
			}
			var imgSend = new FormData();
			imgSend.append("file",$scope.img);
			data["image"] =	imgSend;
			if($scope.actionIU == "insert"){
				url = "maquinas";
				registroMaquinaServices.servicesRegistroMaquinaPost(url,data).then(function(promise){
					var requests = promise.data.response;
					console.log(requests);
				})
			}
			else if($scope.actionIU == "update"){
				url = "maquinas/"+ data.serial;
				registroMaquinaServices.servicesRegistroMaquinaPut(url,data).then(function(promise){
					var requests = promise.data.response;
					console.log(requests);
				})
			}			
		}else{
            globals.set("Debes completar todos los campos");
            Modal.showModal({
            	templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
               	controller : 'globalPopController'
            })  
		}

	}

 	$scope.addinsumo = function(){
      Modal.showModal({
        templateUrl : 'app/components/pop-ups/addinsumos/addinsumo.html',
        controller : 'addinsumosController'
      });
 	}

 	$scope.addmarca = function(){
      Modal.showModal({
        templateUrl : 'app/components/pop-ups/addmarcas/addmarca.html',
        controller : 'addmarcaController'
      });
 	}

    $scope.removeitem = function(element){
      	var id = element.currentTarget.parentElement.id;
		if($scope.actionIU == "update"){
			url = "maquinas/"+ $scope.data.serial + "," + id;
			registroMaquinaServices.servicesRegistroMaquinaDelete(url).then(function(promise){
				var requests = promise.data.response;
		      	for(var i = 0; i<$scope.supplies.length;i++){
		        	if($scope.supplies[i].Id_insumo == id){
		          		$scope.supplies.splice(i,1);
		          		break;
		        	}
		      	}
			})
		}else{
	      	for(var i = 0; i<$scope.supplies.length;i++){
	        	if($scope.supplies[i].Id_insumo == id){
	          		$scope.supplies.splice(i,1);
	          		break;
	        	}
	      	}
		}
    }

    $scope.addSupplie = function(){
    	var valsupplie = true;
    	var idinsumo = $("#insum option:selected")[0].id;
    	for(var i = 0; i<$scope.supplies.length;i++){
    		if($scope.supplies[i].Id_insumo == idinsumo){
	        	valsupplie = false;
	        	break;
	        }
    	}
    	if(valsupplie){
		    if($scope.actionIU == "update"){
	      		var url = "maquinas/insertMxSCon";
	      		var datainsert = {
	      			serial : $scope.data.serial,
	      			supplies : [$("#insum option:selected")[0].id]
	      		}
				registroMaquinaServices.servicesRegistroMaquinaPost(url,datainsert).then(function(promise){
					var requests = promise.data.response;
	      			$scope.supplies.push({Id_insumo:idinsumo,insumo:$("#insum option:selected")[0].value});
	      			$("#insumo-id").val("");
				})  	
		  	}else{
		  	    $scope.supplies.push({Id_insumo:idinsumo,insumo:$("#insum option:selected")[0].value});
	      		$("#insumo-id").val("");
		  	}	
    	}else
    		console.log("Ya existe el item");

    }

	$('input[type=file]').change(function () {
		$scope.img = this.files[0];
       	var filePath = $("#file").val();
       	var reader = new FileReader();
       	reader.onload = function (e) {
            $('#image').attr('src',e.target.result);
            $scope.img["imgbase64"] = e.target.result;
            console.log($scope.img);
       	};
       	reader.readAsDataURL(this.files[0]); 
	});

 	getMark();
 	getsupplies();

}]);