describe('map', function() {
    var map;

    beforeEach(angular.mock.module('funbox.testtask'));

    beforeEach(inject(['$window', '$q', function ($window, $q) {
        //mock for yandex map
        var mockMapService = {
            ready: function() {
            },
            geolocation: {
                get: function() {
                    return $q(function(resolve, reject){
                    });
                }
            },
            geocode: function() {
                return $q(function(resolve, reject){
                });
            },
            route: function() {
                return $q(function(resolve, reject){
                });
            },
            Map: function() {},
            Placemark: function() {}
        };
        $window.ymaps = mockMapService;
    }]));

    beforeEach(inject(function($map) {
        map = $map;
    }));

    it('should exist', function() {
        expect(map).toBeDefined();
        expect(map.init).toBeDefined();
        expect(map.search).toBeDefined();
        expect(map.buildRoute).toBeDefined();
    });
});