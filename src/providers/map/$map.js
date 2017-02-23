angular.module("funbox.testtask").service("$map", ['$rootScope', function($rootScope) {

    this.map = null;
    var self = this;

    // создание карты
    this.init = function() {
        ymaps.ready(init);
        function init(){
            ymaps.geolocation.get({
                // Выставляем опцию для определения положения по ip
                provider: 'yandex',
                // Карта автоматически отцентрируется по положению пользователя.
                mapStateAutoApply: true
            }).then(function (res) {
                self.map = new ymaps.Map('map', {
                    center: res.geoObjects.position,
                    zoom: 7
                });
            });
        }
    };

    // поиск объектов на карте
    this.search = function(filter) {
        var myGeocoder = ymaps.geocode(filter);
        return myGeocoder.then(
            function (res) {
                var points = res.geoObjects.toArray();
                points = points.map(function(point) {
                    var properties = point.properties.getAll();
                    return {
                        name: properties.name,
                        description: properties.description,
                        coords: point.geometry.getCoordinates()
                    }
                });
                return points;
            }
        );
    };

    function getPointCoords(points) {
        return points.map(function(point){
            return point.coords;
        });
    }

    // построение маршрута по массиву координат
    this.buildRoute = function(points) {
        self.map.geoObjects.removeAll();
        var coords = getPointCoords(points);
        var myPolyline = new ymaps.Polyline(
            coords,
            {},
            {
                strokeWidth: 2,
                strokeColor: '#0000FF',
                draggable: false
            }
        );
        self.map.geoObjects.add(myPolyline);

        for (var i = 0; i < points.length; ++i) {
            var point = points[i];
            var placemark = new ymaps.Placemark(point.coords, {
                //hintContent: 'Москва!',
                balloonContent: point.name
            },{
                draggable: true
            });
            placemark.originalPoint = point;
            placemark.events.add("dragend", function (event) {
                var movedPlacemark = event.originalEvent.target;
                var coords = movedPlacemark.geometry.getCoordinates();
                self.search(coords).then(function(objects){
                    var firstPoint = objects[0];
                    movedPlacemark.originalPoint.name = firstPoint.name;
                    movedPlacemark.originalPoint.description = firstPoint.description;
                    movedPlacemark.originalPoint.coords = firstPoint.coords;
                    self.buildRoute(points);
                    $rootScope.$broadcast('map-changed');
                });
            });

            self.map.geoObjects.add(placemark);
        }
    }


}]);