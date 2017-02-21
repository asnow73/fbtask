describe('landing', function() {
    var scope = null;
    var mapMock = null;
    var createController = null;

    beforeEach(function() {
        var mockMapService = {};
        angular.mock.module('funbox.testtask', function($provide) {
            $provide.value('$map', mockMapService);
        });

        inject(['$q', function($q) {
            mockMapService.init = function() {
            };

            mockMapService.search = function(filter) {
                return $q(function(resolve, reject){
                    var point = getTestPoint();
                    resolve([point]);
                });
            };

            mockMapService.buildRoute = function(points) {

            }
        }]);
    });

    beforeEach(inject(function($controller, $rootScope, $map) {
        scope = $rootScope.$new();
        mapMock = $map;
        createController = function(params) {
            return $controller('landingController', {$scope: scope, $map: mapMock });
        };
    }));

    it('map init should run', function() {
        spyOn(mapMock, 'init');
        createController();
        expect(mapMock.init).toHaveBeenCalled();
    });

    function getTestPoint() {
        return {
            coords : [
                53.155782, 48.474485
            ],
            description : "Rusya, Samarskaya oblast",
            name : "Syzran"
        };
    }

    it('should add point', function() {
        var point = getTestPoint();
        spyOn(mapMock, 'buildRoute');
        var ctrl = createController();
        expect(scope.map.route.length).toEqual(0);
        scope.map.add(point);
        expect(scope.map.route.length).toEqual(1);
        expect(mapMock.buildRoute).toHaveBeenCalled();
    });

    it('should remove point', function() {
        var point = getTestPoint();
        spyOn(mapMock, 'buildRoute');
        var ctrl = createController();
        scope.map.remove(point, 0);
        expect(scope.map.route.length).toEqual(0);
        expect(mapMock.buildRoute).toHaveBeenCalled();
    });

    it('should search points on the map', function(){
        var ctrl = createController();
        expect(scope.map.points.length).toEqual(0);
        scope.map.search('Ульяновск').then(function(){
            expect(scope.map.points.length).toEqual(1);
        });
    })
});