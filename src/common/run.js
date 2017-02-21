angular.module("funbox.testtask").run(["$rootScope", "$state", "$browserVersion", "$window", function ($rootScope, $state, $browserVersion, $window) {
    $rootScope.$on("$stateChangeSuccess", function (e, to, toParams, from, fromParams) {
        var name = to.name.split(".");
        $rootScope.page = name[0];
        $rootScope.subpage = name.length > 1 ? name[name.length - 1] : null;
        scroll(0, 0);

        if (!$browserVersion.isSupportedBrowser() && !$browserVersion.isItMobile()) {
            //редирект на неподдерживаемые браузеры
            $window.location.href = "/browsers.html";
        }
    });

    $rootScope.$on("$stateChangeError", function (e, to, toParams, from, fromParams, error) {
    });

}]);

angular.element(document).ready(function () {
    angular.bootstrap(document, ["funbox.testtask"]);
});
