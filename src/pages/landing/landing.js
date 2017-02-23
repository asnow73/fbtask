(function(){
    'use strict';

    angular.module('funbox.testtask').controller('landingController', ['$scope', '$map', function($scope, $map) {
        $scope.map = {};
        $scope.map.points = [];
        $scope.map.route = [];

        $map.init();

        $scope.map.search = function(filter) {
            return $map.search(filter).then(function(res){
                $scope.$apply(function() {
                    $scope.map.points = res;
                });
            });
        };

        $scope.map.add = function (point) {
            $scope.map.route.push(point);
            $map.buildRoute($scope.map.route);
        };

        $scope.map.remove = function(point, index) {
            $scope.map.route.splice(index, 1);
            $map.buildRoute($scope.map.route);
        };

        $scope.$on('map-changed', function(){
            $scope.$apply();
        });


    }]);
})();