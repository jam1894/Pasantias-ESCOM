escom.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
        .state('login',{
            url:            '/login',
            templateUrl:    'app/components/Login/login.html',
            controller:     'loginController'
        }).state('registroUsuarios',{
            url:            '/registroUsuarios',
            templateUrl:    'app/components/registroNuevosUsuarios/registroUsuarios.html',
            controller:     'registroUsuariosController'
        }).state('menu',{
            url:            '/menu',
            templateUrl:    'app/components/menuAdmin/menuAdmin.html',
            controller:     'menuController'
        }).state('menu.principalAdmin',{
            url:            '/principalAdmin',
            templateUrl:    'app/components/principalAdmin/principal.html',
            controller:     'principalAdminController'
        }).state('menu.registroMaquinas',{
            url:            '/registroMaquinas',
            templateUrl:    'app/components/RegistroNuevaMaquina/registroMaquinas.html',
            controller:     'registroMaquinasController'
        }).state('menu.mantenimientos',{
            url:            '/mantenimientos',
            templateUrl:    'app/components/mantenimientos/mantenimientos.html',
            controller:     'mantenimientosController'
        }).state('menu.Reportes',{
            url:            '/Reportes',
            templateUrl:    'app/components/Reportes/generacionReportes.html',
            controller:     'reportesController'
        }).state('menu.aprobadas',{
            url:            '/aprobada',
            templateUrl:    'app/components/formAprobadas/form_aprobadas.html',
            controller:     'aprobadasController'
        }).state('menu.principalUser',{
            url:            '/principalUser',
            templateUrl:    'app/components/PrincipalUsuario/Principal_User.html',
            controller:     'homeController'
        }).state('menu.reporteNov',{
            url:            '/novedades',
            templateUrl:    'app/components/reporterN/reporterNove.html',
            controller:     'reportController'
        }).state('menu.pedirMaquina',{
            url:            '/SolicitarMaquina',
            templateUrl:    'app/components/RegistroAMaquina/Registro_Maquinas.html',
            controller:     'requestMachineController'
        }).state('menu.registroUsuarios',{
            url:            '/registroUsuarios',
            templateUrl:    'app/components/registroNuevosUserAdmin/registroUsuariosAdmin.html',
            controller:     'registroUsuariosAdminController'
        });
        
        $urlRouterProvider.otherwise("/login");

}); 

escom.controller('menuController',['$scope','$state', function($scope,$state) {
    $state.go('login');
}]);