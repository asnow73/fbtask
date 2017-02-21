angular.module("funbox.testtask").directive("selectbox", ["$document", function($document) {
    return {
        link: link,
        restrinct: "E",
        scope: {
            source: '=',
            change: '&onChange',
            select: '&onSelect',
            title: '@'
        },
        templateUrl: '/controls/selectbox/selectbox.html'
    };

    function link(scope, element, attrs) {
        var options = element[0].getElementsByClassName('options')[0];
        var input = element.find("input")[0];

        function showOptions() {
            options.classList.remove('hide');
        }

        function hideOptions() {
            options.classList.add('hide');
        }

        scope.$watchCollection("source", function(collection, old) {
           if (collection.length) {
               showOptions();
           } else {
               hideOptions();
           }
        });

        scope.selectOption = function(option) {
            options.classList.add('hide');
            scope.select({point: option});
            scope.filter = "";
            input.focus();
        };

        element.on("keydown", function (e) {
            // Escape detect
            if (e.which == 27 || e.keyCode == 27) {
                scope.$apply(function() {
                    scope.filter = "";
                });
            }
        });

        // Следим за мышкой
        function startWatch(e) {
            var target = e.target;
            $document.on("mouseup", function mouseup(e) {
                $document.off("mouseup", mouseup);
                if (!element[0].contains(e.target)) {
                    scope.filter = '';
                    scope.$apply();
                    hideOptions();
                }
            });
        }

        $document.on("mousedown", startWatch);
        // Отключаем глобальные DOM обработчики
        scope.$on("$destroy", function () {
            $document.off("mousedown", startWatch);
        });
    }
}]);