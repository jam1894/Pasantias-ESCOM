escom.factory('aprobadasServices',['$http', function($http){
    var servicesaprobadas = {};

    servicesaprobadas.servicesAprobada = function(url,data){
        showLoad();
        var promise = $http.post(window.urlService + url, data)
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

    return servicesaprobadas;
}]);