'use strict';

angular.module("funbox.testtask").directive("itemsList", [function () {
    return {
        restrict: "E",
        link: function (scope, element, attr) {
            var pointsList = element[0];
            var dragObject = {};

            function getCoords(elem) {
                var box = elem.getBoundingClientRect();
                return {
                    top: box.top + pageYOffset,
                    left: box.left + pageXOffset
                };
            }

            pointsList.addEventListener('mousedown', function(event){
                if (event.which != 1) {
                    return;
                }
                var elem = event.target.closest('.route-point');
                if (!elem) return;
                dragObject.elem = elem;

                // запомнить координаты, с которых начат перенос объекта
                dragObject.downX = event.pageX;
                dragObject.downY = event.pageY;
            });

            function createAvatar(e) {
                // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
                var avatar = dragObject.elem;
                var old = {
                    parent: avatar.parentNode,
                    nextSibling: avatar.nextSibling,
                    position: avatar.position || '',
                    left: avatar.left || '',
                    top: avatar.top || '',
                    zIndex: avatar.zIndex || ''
                };

                function reset() {
                    avatar.style.position = old.position;
                    avatar.style.left = old.left;
                    avatar.style.top = old.top;
                    avatar.style.zIndex = old.zIndex;
                    avatar.style.width = 'auto';
                    avatar.classList.remove('bordered');
                }

                // функция для отмены переноса
                avatar.rollback = function() {
                    old.parent.insertBefore(avatar, old.nextSibling);
                    reset();
                };

                avatar.move = function(elem) {
                    elem ? old.parent.insertBefore(avatar, elem) : old.parent.appendChild(avatar);
                    reset();
                };

                return avatar;
            }

            function getIndexOfElement(parent, elem) {
                for (var i = 0; i < parent.children.length; i++) {
                    if (elem == parent.children[i]) {
                        return i;
                    }
                }
                return null;
            }

            function startDrag(e) {
                var avatar = dragObject.avatar;
                dragObject.oldIndex = getIndexOfElement(pointsList, dragObject.elem);
                dragObject.newIndex = null;

                avatar.style.width = avatar.offsetWidth + 'px';
                document.body.appendChild(avatar);
                avatar.style.zIndex = 9999;
                avatar.style.position = 'absolute';
                avatar.classList.add('bordered');
            }

            function clearInsertPlace() {
                if (dragObject.insertItem) {
                    dragObject.insertItem.classList.remove('insert-top');
                    dragObject.insertItem.classList.remove('insert-bottom');
                }
                dragObject.insertItem = null;
            }

            function markInsertPlace(itemElem, avatarElem) {
                clearInsertPlace();
                dragObject.insertItem = itemElem;

                var coords = getCoords(itemElem);
                var coordsAvatar = getCoords(avatarElem);
                if (Math.abs(coords.top - coordsAvatar.top) > (itemElem.offsetHeight / 2)) {
                    itemElem.classList.add('insert-bottom');
                    itemElem.classList.remove('insert-top');
                } else {
                    itemElem.classList.add('insert-top');
                    itemElem.classList.remove('insert-bottom');
                }
            }

            document.addEventListener('mousemove', function(e) {
                if (!dragObject.elem) return;

                if ( !dragObject.avatar ) {

                    // посчитать дистанцию, на которую переместился курсор мыши
                    var moveX = e.pageX - dragObject.downX;
                    var moveY = e.pageY - dragObject.downY;
                    if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) {
                        return;
                    }

                    dragObject.avatar = createAvatar(e); // захватить элемент
                    if (!dragObject.avatar) {
                        dragObject = {};
                        return;
                    }

                    var coords = getCoords(dragObject.avatar);
                    dragObject.shiftX = dragObject.downX - coords.left;
                    dragObject.shiftY = dragObject.downY - coords.top;
                    startDrag(e);
                }

                // отобразить перенос объекта при каждом движении мыши
                dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
                dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

                var itemElem = findDroppable(e, '.route-point');
                if (itemElem) {
                    markInsertPlace(itemElem, dragObject.avatar)
                }

                return false;
            });

            function riseEvent(name, data) {
                var event = document.createEvent('HTMLEvents');
                event.initEvent(name, true, true);
                event.data = data;
                pointsList.dispatchEvent(event);
            }

            function finishDrag(e) {
                if (dragObject.insertItem) {
                    if (dragObject.insertItem.classList.contains('insert-top')) {
                        dragObject.avatar.move(dragObject.insertItem);
                    } else {
                        dragObject.avatar.move(dragObject.insertItem.nextSibling);
                    }
                    dragObject.newIndex = getIndexOfElement(pointsList, dragObject.elem);
                    riseEvent('item-moved', {
                        oldIndex: dragObject.oldIndex,
                        newIndex: dragObject.newIndex
                    });
                } else {
                    dragObject.avatar.rollback();
                }
                clearInsertPlace();
            }

            function findDroppable(event, className) {
                // спрячем переносимый элемент
                var left = dragObject.avatar.style.left;
                var top = dragObject.avatar.style.top;

                dragObject.avatar.style.left = '-1000px';
                dragObject.avatar.style.top = '-1000px';

                // получить самый вложенный элемент под курсором мыши
                var elem = document.elementFromPoint(event.clientX, event.clientY);

                // показать переносимый элемент обратно
                //dragObject.avatar.hidden = false;
                dragObject.avatar.style.left = left;
                dragObject.avatar.style.top = top;

                if (elem == null) {
                    // такое возможно, если курсор мыши "вылетел" за границу окна
                    return null;
                }

                return elem.closest(className);
            }

            document.addEventListener('mouseup', function(e) {
                if (dragObject.avatar) {
                    finishDrag(e);
                }
                dragObject = {};
            });
        }
    };
}]);