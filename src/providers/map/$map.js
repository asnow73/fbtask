angular.module("funbox.testtask").service("$map", [function() {

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

    // построение маршрута по массиву координат
    this.buildRoute = function(points) {
        self.map.geoObjects.removeAll();
        if (points.length > 1) {
            ymaps.route(points).then(
                function (route) {
                    self.map.geoObjects.add(route);
                }
            );
        } else if (points.length == 1) {
            var start = null;
            start = new ymaps.Placemark(points[0]);
            self.map.geoObjects.add(start);
        }
    }


}]);