angular.module('funbox.testtask').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('landing', {
            url: '/',
            controller: 'landingController',
            templateUrl: '/pages/landing/landing.html'
        });
}]);