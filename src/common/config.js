angular.module("funbox.testtask")
    .config([
        "$locationProvider",
        "$stateProvider",
        "$urlRouterProvider",
        function ($locationProvider, $stateProvider, $urlRouterProvider) {
            $locationProvider.html5Mode({ enabled: true });
            $urlRouterProvider.otherwise("/");
        }
    ])
    .config(['$compileProvider', function ($compileProvider) {
        // disable debug info
        //$compileProvider.debugInfoEnabled(false);
    }]);