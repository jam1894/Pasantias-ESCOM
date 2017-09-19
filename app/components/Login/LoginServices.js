escom.factory('loginServices',['$http','globals','ModalService', function($http,globals,Modal){
    var serviceslogin = {};

    serviceslogin.servicesLogin = function(url,data){
        showLoad();
        var promise = $http.post(window.urlService + url,data)
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

    return serviceslogin;
}]);