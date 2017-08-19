escom.controller('requestMachineController',['$scope','$state','requestService','ModalService','globals',
function($scope,$state,requestService,Modal,globals) {

	$scope.machines = {};
  $scope.insumos = {};
  $scope.data = {
    "idequipo" : $("#machine option")[0].value,
    "changesupplie" : $("#insum option")[0].value
  };
  $scope.supplies = [];
  
  var dataUser = JSON.parse(localStorage.getItem("user"));

	function getMachine(){
		url = "maquinas";
	 	data = {};
  	requestService.servicesRequest(data,url).then(function(promise){
        var result = promise.data;
        $scope.machines = result.response;
	      console.log($scope.machines);
  	})
  }

   	$scope.changesupplies = function(){
    	var id = $scope.data.idequipo.split("-")[0];
		  url = "maquinas/suppliexm/"+id;
	   	data = {};
      $scope.insumos = {};
      	requestService.servicesRequest(data,url).then(function(promise){
            var result = promise.data;
            if(result.state == 0)
		          alert(result.response);
            else
              $scope.insumos = result.response;
      	})

      $("#box-insumos > div").remove();
      $scope.supplies = [];
    }
    
    $scope.request = function(data){
      if(data.idequipo != "Máquina a utilizar" && data.hasOwnProperty('fecha') && data.hasOwnProperty('horaInicio') 
        && data.hasOwnProperty('horaFin') && data.hasOwnProperty('detalleActividad')){
        if(data.fecha != undefined && data.horaInicio != undefined && data.horaFin != undefined && data.detalleActividad.trim() != ""){
          if(corverthour(data.horaInicio) <= corverthour(data.horaFin)){
            url = "solicitudes";
            data["idpersona"] = dataUser.documento;
            data["supplies"] = [];
            data["estado_solicitud"] = 1;
            data["img_entregado"] = '';
            data["img_devuelto"] = '';
            data.fecha = corvertDate(data.fecha);
            data.horaInicio = corverthour(data.horaInicio);
            data.horaFin = corverthour(data.horaFin);
            var suppliesSelect = $("#box-insumos div");
            for(var i=0;i<suppliesSelect.length;i++){
              data.supplies.push(suppliesSelect[i].id);
            }
            requestService.servicesRequestMachin(data,url).then(function(promise){
              var result = promise.data;
              globals.set(promise.data.response);
              Modal.showModal({
                templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
                controller : 'globalPopController'
              });
              $scope.data = {
                "idequipo" : $("#machine option")[0].value,
                "changesupplie" : $("#insum option")[0].value
              };
              $("#machine option:selected").text($("#machine option")[0].value);
              $("#insum option:selected").text($("#insum option")[0].value);
              $scope.supplies = [];
            })             
          }else{
              globals.set("La hora final no puede ser menor a la inicial");
              Modal.showModal({
                templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
                controller : 'globalPopController'
              })  
          }           
        }else{
            globals.set("Debes llenar todos los campos para hacer la solicitud");
            Modal.showModal({
              templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
              controller : 'globalPopController'
            })            
        }
      }else{
        globals.set("Debes llenar todos los campos para hacer la solicitud");
        Modal.showModal({
          templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
          controller : 'globalPopController'
        })  
      }
    }

    function corvertDate(date){
      date = new Date(date);
      year = date.getFullYear();
      month = date.getMonth()+1;
      dt = date.getDate();

      if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }

      return year + '-' + month + '-' + dt
    }

    function corverthour(hour){
      d = new Date(hour);
      var h = addZero(d.getHours());
      var m = addZero(d.getMinutes());
      var s = addZero(d.getSeconds());
      return h + ":" + m + ":" + s;
    }

    function addZero(i) {
      if (i < 10) {
          i = "0" + i;
      }
      return i;
    }

    $scope.removeitem = function(element){ 
      var id = element.currentTarget.parentElement.id;
      for(var i = 0; i<$scope.supplies.length;i++){
        if($scope.supplies[i].Id_insumo == id){
          $scope.supplies.splice(i,1);
          break;
        }
      }
    }

    $scope.addSupplie = function(){
      $scope.supplies.push({Id_insumo:$("#insum option:selected")[0].id,insumo:$("#insum option:selected")[0].value});
      $scope.data.changesupplie = $("#insum option")[0].value;
    }
    
    getMachine();

}]);