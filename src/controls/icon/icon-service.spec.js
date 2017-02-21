describe('iconService', function() {
    var iconService = null;

    beforeEach(angular.mock.module('funbox.testtask'));
    beforeEach(inject(function($iconService, $q, $rootScope) {
        iconService = $iconService;
    }));

    it('should load icon', inject(function($rootScope, $q) {
        var mockMdiSvg = angular.element('<div>').append('<svg><defs><svg id="delete" viewBox="0 0 24 24" width="24" height="24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/></svg></defs></svg>')[0].querySelector('svg');
        var expectedResult = '<svg viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path></svg>';
        var deferred = $q.defer();
        spyOn(iconService, 'loadIcon').and.returnValue(deferred.promise);
        iconService.getIcon("delete").then(function(icon){
            expect(icon.outerHTML).toBe(expectedResult);
        });
        deferred.resolve(mockMdiSvg);
        $rootScope.$apply();
    }));
});