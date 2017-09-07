escom.factory('mantenimientosServices',['$http', function($http){
    var mateinceservices = {};

    mateinceservices.servicesPrincipal = function(url,data){
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

    mateinceservices.servicesPrincipalget = function(url,data){
        showLoad();
        var promise = $http.get(window.urlService + url)
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

    mateinceservices.servicesPrincipalput = function(url,data){
        showLoad();
        var promise = $http.put(window.urlService + url,data)
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

    return mateinceservices;
}]);