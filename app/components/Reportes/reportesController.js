escom.controller('reportesController', ['$scope','$state','ModalService','reportesServices','globals',
function($scope,$state,Modal,reportesServices,globals) {

	$scope.reports = false;
	$scope.keysJsonVal = [];
	$scope.data = {
		report : $("#reportid option")[0].value
	}
	$scope.getReport = function(option){
		$scope.keysJsonVal = [];
		$scope.request = [];
		if(option.report == 1){
			url = "insumos";
		 	data = {};
		 	getServices(url,data)
		}else if(option.report == 2){
			url = "/solicitudes/getsolicitudesDate";
			var dateinit = ConvertgetDateCurrent(option.datei);
			var datefinal = ConvertgetDateCurrent(option.datef);
		 	data = {
		 		datei : dateinit,
		 		datef : datefinal
		 	};
		 	postService(url,data);
		}else if(option.report == 3){
			var dateinit = ConvertgetDateCurrent(option.datei);
			var datefinal = ConvertgetDateCurrent(option.datef);
			url = "novedades/fechas";
		 	data = {
		 		datei : dateinit,
		 		datef : datefinal
		 	};
		 	postService(url,data)		
		}
  	}

  	function postService(url,data){
	  	reportesServices.servicesReporte(url,data).then(function(promise){
	        var result = promise.data;
	        $scope.request = result.response;
		    console.log($scope.request);
		    var keysjsresponse = Object.keys($scope.request[0]);
		    for(var i=0;i<keysjsresponse.length;i++){
		    	$scope.keysJsonVal.push(keysjsresponse[i]);
		    }
	  	});
  	}

  	function getServices(url,data){
	  	reportesServices.servicesReporteGet(url,data).then(function(promise){
	        var result = promise.data;
	        $scope.request = result.response;
		    console.log($scope.request);
		    var keysjsresponse = Object.keys($scope.request[0]);
		    for(var i=0;i<keysjsresponse.length;i++){
		    	$scope.keysJsonVal.push(keysjsresponse[i]);
		    }
	  	});
  	}

  	$scope.validateReport = function(e){
  		if(e != 1)
  			$scope.reports = true;
  		else
  			$scope.reports = false;
  	}

	$scope.exportReport = function()

	{
	    var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
	    var textRange; var j=0;
	    tab = document.getElementById('reportsGen'); // id of table

	    for(j = 0 ; j < tab.rows.length ; j++) 
	    {     
	        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
	        //tab_text=tab_text+"</tr>";
	    }

	    tab_text=tab_text+"</table>";
	    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
	    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
	    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

	    var ua = window.navigator.userAgent;
	    var msie = ua.indexOf("MSIE "); 

	    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
	    {
	        txtArea1.document.open("txt/html","replace");
	        txtArea1.document.write(tab_text);
	        txtArea1.document.close();
	        txtArea1.focus(); 
	        sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
	    }  
	    else                 //other browser not tested on IE 11
	        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  

	    return (sa);
	}

}]);