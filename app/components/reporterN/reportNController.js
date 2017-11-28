escom.controller('reportController',['$scope','$state','NovedadesService','ModalService','globals',
function($scope,$state,NovedadesService,Modal,globals) {

  sessionStorage.getItem("documento") == null ? $state.go("login") : "ok";

	$scope.machines = {};
  	$scope.data = {
  		id_machine : $("#machine option")[0].value,
  		id_priority : $("#priority option")[0].value,
      novelty : ""
  	}

	function getMachine(){
		url = "maquinas";
	 	data = {};
      	NovedadesService.reportNovedadesGet(data,url).then(function(promise){
            var result = promise.data;
            $scope.machines = result.response;
      	})
    }
	
	$scope.saveNolvelty = function(data){
		url = "novedades";
    if(data != undefined)
    {
      if(data.novelty.trim() != "" && $("#priority option:selected").text() != "Prioridad"  &&
        $("#machine option:selected").text() != "Máquina a utilizar"){
          data["state"] = "Enviado";
          NovedadesService.reportNovedades(data,url).then(function(promise){
              var result = promise.data;
              globals.set(result.response);
              Modal.showModal({
                templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
                controller : 'globalPopController'
              })
              $scope.data = {
                id_machine : $("#machine option")[0].value,
                id_priority : $("#priority option")[0].value,
                novelty : ""
              }
          })
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

	getMachine();

}]);