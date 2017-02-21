'use strict';

angular.module("funbox.testtask").factory("$iconService", ['$templateRequest', '$q', '$sce', function ($templateRequest, $q, $sce) {
    var defaultIconSetUrl = "/mdi.svg";
    var svgs = null;
    var cacheIcon = {};

    var instance = {
        getIcon: getIcon,
        loadIcon: loadIcon
    };

    function getIcon(id) {
        if (!angular.isString(id)) {
            id = $sce.getTrustedUrl(id);
        }

        return instance.loadIcon(defaultIconSetUrl).then(function(svg){
            svgs = svg;
            if (cacheIcon[id]) {
                return cacheIcon[id].cloneNode(true);
            }
            //var icon = svgs.getElementById(id); -- не работает в Safari
            var icon = svgs.querySelector('#' + id);
            if (!icon) {
                throw "svg with id = " + id + "is not found";
            }
            icon.setAttribute('xmlns', "http://www.w3.org/2000/svg");
            icon.setAttribute('width', "100%");
            icon.setAttribute('height', "100%");
            icon.removeAttribute('id');

            cacheIcon[id] = icon.cloneNode(true);
            return icon;
        });
    }

    function loadIcon(url) {
        return $q(function(resolve, reject) {
            var announceAndReject = function(err) {
                reject(err);
            };
            var extractSvg = function(response) {
                var svg = angular.element('<div>').append(response)[0].querySelector('svg');
                resolve(svg);
            };

            $templateRequest(url, false).then(extractSvg, announceAndReject);
        });
    }

    return instance;
}]);