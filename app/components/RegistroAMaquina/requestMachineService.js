escom.factory('requestService',['$http', function($http){
    var machinerequest = {};

    machinerequest.servicesRequest = function(data,URL){
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

    machinerequest.servicesRequestMachin = function(data,URL){
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
    
    return machinerequest;
}]);