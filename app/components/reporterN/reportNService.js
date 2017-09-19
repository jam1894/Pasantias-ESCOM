escom.factory('NovedadesService',['$http','globals','ModalService', function($http,globals,Modal){
    var novedades = {};

    novedades.reportNovedades = function(data,URL){
        showLoad();
        var promise = $http.post(window.urlService + URL,data)
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

    novedades.reportNovedadesGet = function(data,URL){
        showLoad();
        var promise = $http.get(window.urlService + URL,data)
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
    
    return novedades;
}]);