escom.factory('registroMaquinaServices',['$http', function($http){
    var servicesregisMaquina = {};

    servicesregisMaquina.servicesRegistroMaquina = function(url,data){
        showLoad();
        var promise = $http.get(window.urlService + url, data)
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

    servicesregisMaquina.servicesRegistroMaquinaPost = function(url,data){
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

    servicesregisMaquina.servicesRegistroMaquinaDelete = function(url){
        showLoad();
        var promise = $http.delete(window.urlService + url)
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

    servicesregisMaquina.servicesRegistroMaquinaPut = function(url,data){
        showLoad();
        var promise = $http.put(window.urlService + url, data)
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

    return servicesregisMaquina;
}]);