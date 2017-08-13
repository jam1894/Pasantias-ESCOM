appescom.factory('NovedadesService',['$http', function($http){
    var novedades = {};

    novedades.reportNovedades = function(data,URL){
        showLoad();
        var promise = $http.post(window.urlService + URL,data)
            .success(function(data){
                hideLoad();
                console.log(data);
                return data;
            })
            .error(function(err){
                hideLoad();
                alert(err);
            });
        return promise;
    };

    novedades.reportNovedadesGet = function(data,URL){
        showLoad();
        var promise = $http.get(window.urlService + URL,data)
            .success(function(data){
                hideLoad();
                console.log(data);
                return data;
            })
            .error(function(err){
                hideLoad();
                alert(err);
            });
        return promise;
    };
    
    return novedades;
}]);