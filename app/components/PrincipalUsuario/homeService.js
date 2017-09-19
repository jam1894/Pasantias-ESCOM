escom.factory('homeService',['$http','globals','ModalService', function($http,globals,Modal){
    var home = {};

    home.servicesLogin = function(data,URL){
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

    home.servicesDelRequest = function(data,URL){
        showLoad();
        var promise = $http.delete(window.urlService + URL,data)
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
    
    return home;
}]);