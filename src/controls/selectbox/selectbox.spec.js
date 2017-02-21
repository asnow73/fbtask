describe('selectbox', function() {
    var scope = null;
    var element = null;

    beforeEach(angular.mock.module('funbox.testtask'));
    beforeEach(angular.mock.module('templates'));
    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();

        element = '<selectbox source="map.points" title="Название точки маршрута" on-select="map.add(point)" on-change="map.search(filter)"></selectbox>';

        scope.map = {};
        scope.map.points = [];
        scope.map.add = function(point) {};
        scope.map.search = function(filter) {
        };

        element = $compile(element)(scope);
        scope.$apply();
    }));

    function getTestPoint() {
        return {
            coords : [
                53.155782, 48.474485
            ],
            description : "Rusya, Samarskaya oblast",
            name : "Syzran"
        };
    }

    function prepareOptionsWithPoint($compile) {
        var point = getTestPoint();
        scope.map.points = [point];
        element = $compile(element)(scope);
        scope.$apply();
        return point;
    }

    it('should has empty source', function() {
        var isolated = element.isolateScope();
        expect(isolated.source.length).toBe(0);
    });

    it('should has 1 point in source', inject(function($compile) {
        prepareOptionsWithPoint($compile);
        var isolated = element.isolateScope();
        expect(isolated.source.length).toBe(1);
    }));

    it('should has title tag with correct value', function(){
        var titleElement = element.find('label');
        expect(titleElement).toBeDefined();
        expect(titleElement.text()).toEqual('Название точки маршрута');
    });

    it('should hide options when click outside element', inject(function($document, $compile){
        prepareOptionsWithPoint($compile);
        $document.triggerHandler('mousedown');
        $document.triggerHandler('mouseup');

        var optionsElement = angular.element(element[0].getElementsByClassName('options')[0]);
        expect(optionsElement.hasClass('hide')).toEqual(true);
    }));

    it('should hide options when esc key down', inject(function($compile){
        prepareOptionsWithPoint($compile);
        var input = element.find('input');
        input[0].value = 'Ульяновск';

        var optionsElement = element[0].getElementsByClassName('options')[0];
        expect(optionsElement.classList.contains('hide')).toEqual(false);
        element.triggerHandler({
            type: 'keydown',
            which: 27
        });
        expect(optionsElement.classList.contains('true')).toEqual(false);
        //Очищен фильтр
        expect(input[0].value).toEqual('');
    }));

    it('should show options when source is not empty', inject(function($compile){
        prepareOptionsWithPoint($compile);
        var optionsElement = element[0].getElementsByClassName('options')[0];
        expect(optionsElement.classList.contains('hide')).toEqual(false);
    }));

    it('should hide options when source is empty', function(){
        var optionsElement = element[0].getElementsByClassName('options')[0];
        var isolated = element.isolateScope();
        expect(isolated.source.length).toBe(0);
        expect(optionsElement.classList.contains('hide')).toEqual(true);
    });

    it('should run change(search) when input is filling', inject(function($compile, $rootScope){
        spyOn(scope.map, 'search');
        var input = element.find('input');
        input[0].value = 'Ульяновск';
        input.triggerHandler('change');
        expect(scope.map.search).toHaveBeenCalledWith('Ульяновск');
    }));

    it('should run select(add) when point from options is selected', inject(function($compile, $timeout){
        var point = prepareOptionsWithPoint($compile);
        var input = element.find('input');
        input[0].value = 'Ульяновск';

        var option = angular.element(element[0].getElementsByClassName('option')[0]);
        var optionsElement = element[0].getElementsByClassName('options')[0];
        expect(optionsElement.classList.contains('hide')).toEqual(false);

        spyOn(scope.map, 'add');
        option.triggerHandler('click');

        //Убран список с точками
        expect(optionsElement.classList.contains('hide')).toEqual(true);
        //Вызван матод add
        expect(scope.map.add).toHaveBeenCalledWith(point);
        //Очищен фильтр
        expect(input[0].value).toEqual('');
    }));
});
