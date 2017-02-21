describe('browser', function() {
    var browserVersion,
        userAgent = navigator.userAgent;

    beforeEach(angular.mock.module('funbox.testtask'));
    beforeEach(inject(['$browserVersion', function($browserVersion) {
        browserVersion = $browserVersion;
    }]));

    afterEach(function(){
        Object.defineProperty(navigator, 'userAgent', {
            value: userAgent,
            writable: true
        });
    });

    it('should exist', function() {
        expect(browserVersion).toBeDefined();
    });

    it('should support chrome browser', function() {
        Object.defineProperty(navigator, 'userAgent', {
            value: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36",
            writable: true
        });
        expect(browserVersion.isSupportedBrowser()).toBe(true);
    });

    it('should not support chrome browser', function() {
        Object.defineProperty(navigator, 'userAgent', {
            value: "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)",
            writable: true
        });
        expect(browserVersion.isSupportedBrowser()).toBe(false);
    });

    it('should detect mobile browser', function() {
        Object.defineProperty(navigator, 'userAgent', {
            value: 'Android',
            writable: true
        });
        expect(browserVersion.isItMobile()).not.toBe(false);
    });

    it('should detect desctop browser', function() {
        expect(browserVersion.isItMobile()).toBe(null);
    });
});