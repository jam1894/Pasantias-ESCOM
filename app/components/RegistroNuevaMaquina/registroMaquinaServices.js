escom.factory('registroMaquinaServices',['$http','globals','ModalService', function($http,globals,Modal){
    var servicesregisMaquina = {};

    servicesregisMaquina.servicesRegistroMaquina = function(url,data){
        showLoad();
        var promise = $http.get(window.urlService + url, data)
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

    servicesregisMaquina.servicesRegistroMaquinaPost = function(url,data){
        showLoad();
        var promise = $http.post(window.urlService + url, data)
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

    servicesregisMaquina.servicesRegistroMaquinaDelete = function(url){
        showLoad();
        var promise = $http.delete(window.urlService + url)
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

    servicesregisMaquina.servicesRegistroMaquinaPut = function(url,data){
        showLoad();
        var promise = $http.put(window.urlService + url, data)
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

    return servicesregisMaquina;
}]);