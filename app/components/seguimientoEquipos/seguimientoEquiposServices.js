escom.factory('seguimientoServices',['$http', function($http){
    var servicesSeguimiento = {};

    servicesSeguimiento.servicesSeguimientoEquipos = function(url,data){
        showLoad();
        var promise = $http.post(window.urlService +'')
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

    return servicesSeguimiento;
}]);