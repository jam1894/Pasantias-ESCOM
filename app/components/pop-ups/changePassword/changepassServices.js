escom.factory('changePassService',['$http','globals','ModalService', function($http,globals,Modal){
    var login = {};

    login.servicesPass = function(data,URL){
        showLoad();
        var promise = $http.put(window.urlService + URL,data)
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

    login.servicesPassget = function(URL){
        showLoad();
        var promise = $http.get(window.urlService + URL)
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
    
    return login;
}]);