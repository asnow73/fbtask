'use strict';

angular.module("funbox.testtask").directive("icon", ["$iconService", function ($acIconService) {
    return {
        restrict: "E",
        link: function (scope, element, attr) {
            attr.$observe('svgIcon', function (iconSrc) {
                $acIconService.getIcon(iconSrc).then(appendIcon);
            });
            attr.$observe('svgSrc', function (iconSrc) {
                $acIconService.loadIcon(iconSrc).then(appendIcon);
            });

            function appendIcon(icon) {
                element.empty();
                element.append(icon);
            }
        }
    };
}]);
