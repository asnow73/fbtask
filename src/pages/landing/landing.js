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

        document.getElementsByClassName('route')[0].addEventListener('item-moved', function(e) {
            console.log('moved', e.data.oldIndex, e.data.newIndex);
            var tmp = $scope.map.route.splice(e.data.oldIndex, 1);
            $scope.map.route.splice(e.data.newIndex,0,tmp[0]);
            $scope.$apply();
            $map.buildRoute($scope.map.route);
        });

    }]);
})();