angular.module("funbox.testtask").factory("$browserVersion", ['$window',

    function ($window) {
        //Версия браузера
        function getBrowserData() {
            var ua = navigator.userAgent;

            var tem = null;
            var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return { name: 'IE', version: (tem[1] || '') };
            }
            if (M[1] === 'Chrome') {
                tem = ua.match(/\bOPR\/(\d+)/);
                if (tem != null) {
                    return { name: 'Opera', version: tem[1] };
                }
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) {
                M.splice(1, 1, tem[1]);
            }
            return {
                name: M[0],
                version: M[1]
            };
        }

        return {
            //Версия браузера
            isSupportedBrowser: function () {
                var supportedBrowsers = {
                    "IE": 11,
                    "MSIE": 11,
                    "Chrome": 40,
                    "Firefox": 35,
                    "Opera": 30,
                    "Safari": 8
                };
                var browser = getBrowserData();
                return (!supportedBrowsers[browser.name] || (supportedBrowsers[browser.name] && supportedBrowsers[browser.name] <= browser.version));
            },

            isItMobile: function() {
                return navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile)/i);
            }
        };
    }]);