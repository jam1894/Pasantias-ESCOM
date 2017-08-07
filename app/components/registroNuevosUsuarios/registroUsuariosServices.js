escom.factory('usuariosServices',['$http', function($http){
    var servicesUsuarios = {};

    servicesUsuarios.servicesNuevoUsuario = function(url,data){
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

    return servicesUsuarios;
}]);