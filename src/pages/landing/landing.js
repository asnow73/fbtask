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

        function getPointCoords(points) {
            return points.map(function(point){
                return point.coords;
            });
        }

        $scope.map.add = function (point) {
            $scope.map.route.push(point);
            var points = getPointCoords($scope.map.route);
            $map.buildRoute(points);
        };

        $scope.map.remove = function(point, index) {
            $scope.map.route.splice(index, 1);
            var points = getPointCoords($scope.map.route);
            $map.buildRoute(points);
        }

    }]);
})();