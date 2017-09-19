escom.factory('mantenimientosServices',['$http','globals','ModalService', function($http,globals,Modal){
    var mateinceservices = {};

    mateinceservices.servicesPrincipal = function(url,data){
        showLoad();
        var promise = $http.post(window.urlService +'')
            .success(function(data){
                hideLoad();
                return data;
            })
            .error(function(err){
                hideLoad();
                globals.set(err);
                Modal.showModal({
                    templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
                    controller : 'globalPopController'
                })
            });
        return promise;
    };

    mateinceservices.servicesPrincipalget = function(url,data){
        showLoad();
        var promise = $http.get(window.urlService + url)
            .success(function(data){
                hideLoad();
                return data;
            })
            .error(function(err){
                hideLoad();
                globals.set(err);
                Modal.showModal({
                    templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
                    controller : 'globalPopController'
                })
            });
        return promise;
    };

    mateinceservices.servicesPrincipalput = function(url,data){
        showLoad();
        var promise = $http.put(window.urlService + url,data)
            .success(function(data){
                hideLoad();
                return data;
            })
            .error(function(err){
                hideLoad();
                globals.set(err);
                Modal.showModal({
                    templateUrl : 'app/components/pop-ups/popGlobal/popUpMessage.html',
                    controller : 'globalPopController'
                })
            });
        return promise;
    };

    return mateinceservices;
}]);