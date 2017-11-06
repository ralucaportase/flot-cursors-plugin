$(function () {
    'use strict';

    $.thumb = {};

    var mainEventHolder,
        currentState,
        svgLayer;

    $.thumb.createSVGLayer = function (placeholder, eventHolder) {
        if ($('.flot-thumbs')[0]) {
            return $('.flot-thumbs')[0];
        }

        var SVGContainer = document.createElement('div');
        SVGContainer.className = 'flot-thumbs';
        SVGContainer.style.position = 'absolute';
        SVGContainer.style.top = '0px';
        SVGContainer.style.left = '0px';
        SVGContainer.style.bottom = '0px';
        SVGContainer.style.right = '0px';
        SVGContainer.style.pointerEvents = 'none';

        var svgRoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgRoot.setAttributeNS(null, 'width', '100%');
        svgRoot.setAttributeNS(null, 'height', '100%');

        SVGContainer.appendChild(svgRoot);

        if (placeholder) {
            placeholder.append(SVGContainer);
        } else {
            document.body.append(SVGContainer);
        }

        if (eventHolder) {
            mainEventHolder = eventHolder;
        } else {
            mainEventHolder = document;
        }

        bindEvents(svgRoot);

        svgLayer = svgRoot;

        return svgRoot;
    }

    function bindEvents(svgRoot) {
        svgRoot.addEventListener('mousemove', moveElement, false);
        svgRoot.addEventListener('touchmove', moveElement, false);
        svgRoot.addEventListener('mouseup', deselectElement, false);
        svgRoot.addEventListener('touchend', deselectElement, false);
    }

    $.thumb.createThumb = function (radius, cx, cy, svgRoot, constraintFunction) {
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttributeNS(null, 'r', radius);
        circle.setAttributeNS(null, 'cx', cx);
        circle.setAttributeNS(null, 'cy', cy);
        circle.setAttributeNS(null, 'transform', 'matrix(1 0 0 1 0 0)');
        circle.setAttribute('class', 'draggable');
        circle.style.pointerEvents = 'all';

        circle.addEventListener('mousedown', selectElement, false);
        circle.addEventListener('touchstart', selectElement, false);
        circle.constraintFunction = constraintFunction;

        svgRoot.appendChild(circle);

        return circle;
    }

    function selectElement(evt) {
        if (evt.target.getAttribute('class').indexOf('draggable') !== -1) {
            currentState = {
                selectedElement: evt.target,
                x: getEventXPosition(evt),
                y: getEventYPosition(evt)
            };
            svgLayer.style.pointerEvents = 'all';
        }

        if (!currentState) {
            return;
        }

        dispatchThumbEvent('thumbmovestart', evt);
    }

    function moveElement(evt) {
        var posX = getEventXPosition(evt),
            posY = getEventYPosition(evt),
            dx, dy;

        if (!currentState) {
            return;
        }

        if (currentState.selectedElement.constraintFunction) {
            [posX, posY] = currentState.selectedElement.constraintFunction(posX, posY, currentState.x, currentState.y);
        }

        var currentMatrix = currentState.selectedElement.getCTM();

        dx = posX - currentState.x;
        dy = posY - currentState.y;

        currentMatrix.e += dx;
        currentMatrix.f += dy;
        currentState.selectedElement.transform.baseVal.getItem(0).setMatrix(currentMatrix);

        //update last mouse position
        currentState.x = posX;
        currentState.y = posY;

        evt.preventDefault();
        evt.stopPropagation();

        //dispach new event to update cursor position
        dispatchThumbEvent('thumbmove', evt);
    }

    function deselectElement(evt) {
        if (currentState) {
            currentState = null;
            svgLayer.style.pointerEvents = 'none';
            mainEventHolder.dispatchEvent(new CustomEvent('thumbmoveend', { detail: evt }));
        }
    }

    function dispatchThumbEvent (eventType, evt) {
        var pageX = getEventXPosition(evt),
            pageY = getEventYPosition(evt),
            thumbEvent = new CustomEvent(eventType, { detail: evt });
        thumbEvent.pageX = pageX;
        thumbEvent.pageY = pageY;
        mainEventHolder.dispatchEvent(thumbEvent);
    }

    function getEventXPosition(evt) {
        return evt.pageX ? evt.pageX : evt.touches[0].pageX;
    }

    function getEventYPosition(evt) {
        return evt.pageY ? evt.pageY : evt.touches[0].pageY;
    }

    $.thumb.updateComputedXPosition = function(thumb, position) {
        var thumbPositionMatrix = thumb.getCTM(),
            newThumbCx = position - thumbPositionMatrix.e;
        thumb.setAttributeNS(null, 'cx', newThumbCx);
    }

    $.thumb.updateComputedYPosition = function(thumb, position) {
        var thumbPositionMatrix = thumb.getCTM(),
            newThumbCy = position - thumbPositionMatrix.f;
        thumb.setAttributeNS(null, 'cy', newThumbCy);
    }

    function unbindEvents(svgRoot) {
        svgRoot.removeEventListener('mousemove', moveElement);
        svgRoot.removeEventListener('touchmove', moveElement);
        svgRoot.removeEventListener('mouseup', deselectElement);
        svgRoot.removeEventListener('touchend', deselectElement);
    }

    $.thumb.shutdown = function(svgRoot) {
        currentState = null;

        unbindEvents(svgRoot);
    }
});
