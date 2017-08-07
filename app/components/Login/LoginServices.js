escom.factory('loginServices',['$http', function($http){
    var serviceslogin = {};

    serviceslogin.servicesLogin = function(url,data){
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

    return serviceslogin;
}]);