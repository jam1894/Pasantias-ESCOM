escom.factory('addinsumosServices',['$http', function($http){
    var servicesinsumos = {};

    servicesinsumos.servicesInsumos = function(url,data){
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

    return servicesinsumos;
}]);