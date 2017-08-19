escom.factory('homeService',['$http', function($http){
    var home = {};

    home.servicesLogin = function(data,URL){
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

    home.servicesDelRequest = function(data,URL){
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
    
    return home;
}]);