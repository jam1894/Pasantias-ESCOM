escom.factory('reportesServices',['$http', function($http){
    var servicesreportes = {};

    servicesreportes.servicesReporte = function(url,data){
        showLoad();
        var promise = $http.post(window.urlService + url,data)
            .success(function(data){
                hideLoad();
                console.log(data);
                return data;
            })
            .error(function(err){
                hideLoad();
                console.log("No tienes conexión a internet" + err);
            });
        return promise;
    };

    servicesreportes.servicesReporteGet = function(url,data){
        showLoad();
        var promise = $http.get(window.urlService + url,data)
            .success(function(data){
                hideLoad();
                console.log(data);
                return data;
            })
            .error(function(err){
                hideLoad();
                console.log("No tienes conexión a internet" + err);
            });
        return promise;
    };

    return servicesreportes;
}]);