escom.factory('RegisterAdminService',['$http', function($http){
    var register = {};

    register.servicesLogin = function(data,URL){
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

    register.servicesLoginGet = function(data,URL){
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

    register.servicesusersPut = function(data,URL){
        showLoad();
        var promise = $http.put(window.urlService + URL,data)
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

    register.servicesusersDelete = function(data,URL){
        showLoad();
        var promise = $http.delete(window.urlService + URL,data)
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

    return register;
}]);