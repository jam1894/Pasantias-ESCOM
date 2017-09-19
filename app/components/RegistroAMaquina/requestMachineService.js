escom.factory('requestService',['$http','globals','ModalService', function($http,globals,Modal){
    var machinerequest = {};

    machinerequest.servicesRequest = function(data,URL){
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

    machinerequest.servicesRequestMachin = function(data,URL){
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
    
    return machinerequest;
}]);