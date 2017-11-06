describe('Svg drag plugin', function () {
    'use strict';

    describe('createSVGLayer', function() {
        var placeholder;

        beforeEach(function() {
            placeholder = setFixtures('<div id="test-container" style="width: 600px;height: 400px">')
                .find('#test-container');
        });

        it('should create a svg element if it does not exist', function() {
            $.thumb.createSVGLayer(placeholder);
            expect($('svg')[0]).not.toBeNull();
        });

        it('should return an svg element after creation', function() {
            expect($.thumb.createSVGLayer(placeholder)).not.toBeNull();
        });
    });

    describe('createThumb', function() {
        var placeholder, svgRoot;

        beforeEach(function() {
            placeholder = setFixtures('<div id="test-container" style="width: 600px;height: 400px">')
                .find('#test-container');
            svgRoot = $.thumb.createSVGLayer(placeholder);
        });

        it('should create a svg thumb element', function() {
            $.thumb.createThumb(20, 50, 50, svgRoot);
            expect($('circle')[0]).not.toBeNull();
        });

        it('should create a svg thumb with certain radius', function() {
            $.thumb.createThumb(20, 50, 50, svgRoot);
            expect($('circle')[0].getAttribute('r')).toEqual('20');
        });

        it('should create a svg thumb with center of circle at a certain place', function() {
            $.thumb.createThumb(20, 50, 50, svgRoot);
            expect($('circle')[0].getAttribute('cx')).toEqual('50');
            expect($('circle')[0].getAttribute('cy')).toEqual('50');
        });
    });

    describe('thumbs navigation', function() {
        var placeholder, svgRoot, thumb;

        beforeEach(function() {
            placeholder = setFixtures('<div id="test-container" style="width: 600px;height: 400px">')
                .find('#test-container');
            svgRoot = $.thumb.createSVGLayer(placeholder);
            $.thumb.createThumb(20, 0, 0, svgRoot);
            thumb = $('circle')[0];
        });

        it('touchstart should trigger thumbmovestart event', function() {
            var spy = jasmine.createSpy('thumbmovestart handler'),
                initialCoords = [{x: 0, y: 0}];

            document.addEventListener('thumbmovestart', spy);

            simulate.sendTouchEvents(initialCoords, thumb, 'touchstart');

            expect(spy).toHaveBeenCalled();
            expect(spy.calls.count()).toBe(1);
        });

        it('mousedown should trigger thumbmovestart event', function() {
            var spy = jasmine.createSpy('thumbmovestart handler'),
                initialCoords = [{x: 0, y: 0}];

            document.addEventListener('thumbmovestart', spy);

            simulate.sendTouchEvents(initialCoords, thumb, 'mousedown');

            expect(spy).toHaveBeenCalled();
            expect(spy.calls.count()).toBe(1);
        });

        it('touchend should trigger thumbmoveend event', function() {
            var spy = jasmine.createSpy('thumbmoveend handler'),
                initialCoords = [{x: 0, y: 0}];

            document.addEventListener('thumbmoveend', spy);

            simulate.sendTouchEvents(initialCoords, thumb, 'touchstart');
            simulate.sendTouchEvents(initialCoords, svgRoot, 'touchend');

            expect(spy).toHaveBeenCalled();
            expect(spy.calls.count()).toBe(1);
        });

        it('mouseup should trigger thumbmoveend event', function() {
            var spy = jasmine.createSpy('thumbmoveend handler'),
                initialCoords = [{x: 0, y: 0}];

            document.addEventListener('thumbmoveend', spy);

            simulate.sendTouchEvents(initialCoords, thumb, 'mousedown');
            simulate.sendTouchEvents(initialCoords, svgRoot, 'mouseup');

            expect(spy).toHaveBeenCalled();
            expect(spy.calls.count()).toBe(1);
        });

        it('touchmove should trigger thumbmove event', function() {
            var spy = jasmine.createSpy('thumbmove handler'),
                initialCoords = [{x: 0, y: 0}],
                finalCoords = [{x: 1, y: 1}];

            document.addEventListener('thumbmove', spy);

            simulate.sendTouchEvents(initialCoords, thumb, 'touchstart');
            simulate.sendTouchEvents(finalCoords, svgRoot, 'touchmove');

            expect(spy).toHaveBeenCalled();
            expect(spy.calls.count()).toBe(1);
        });

        it('touchmove should  not trigger thumbmove event for circle not touched', function() {
            var spy = jasmine.createSpy('thumbmove handler'),
                initialCoords = [{x: 200, y: 200}],
                finalCoords = [{x: 1, y: 1}];

            document.addEventListener('thumbmove', spy);

            simulate.sendTouchEvents(initialCoords, svgRoot, 'touchstart');
            simulate.sendTouchEvents(finalCoords, svgRoot, 'touchmove');

            expect(spy).toHaveBeenCalled();
            expect(spy.calls.count()).toBe(1);
        });

        it('mousemove should trigger thumbmove event', function() {
            var spy = jasmine.createSpy('thumbmove handler'),
                initialCoords = [{x: 0, y: 0}],
                finalCoords = [{x: 1, y: 1}];

            document.addEventListener('thumbmove', spy);

            simulate.sendTouchEvents(initialCoords, thumb, 'mousedown');
            simulate.sendTouchEvents(finalCoords, svgRoot, 'mousemove');

            expect(spy).toHaveBeenCalled();
            expect(spy.calls.count()).toBe(1);
        });

        it('touchmove should update svg element position', function() {
            var initialCoords = [{x: 0, y: 0}],
                finalCoords = [{x: 10, y: 10}];

            simulate.sendTouchEvents(initialCoords, thumb, 'touchstart');
            simulate.sendTouchEvents(finalCoords, svgRoot, 'touchmove');

            var currentMatrix = thumb.getCTM();

            expect(currentMatrix.e).toEqual(finalCoords[0].x - initialCoords[0].x);
            expect(currentMatrix.f).toEqual(finalCoords[0].y - initialCoords[0].y);
        });

        it('touchmove should take into accout constraint function', function() {
            var initialCoords = [{x: 0, y: 0}],
                finalCoords = [{x: 10, y: 10}],
                verticalConstraint = function (mouseX, mouseY, currentX, currentY) {
                    return [currentX, mouseY];
                };

            $.thumb.createThumb(20, 0, 0, svgRoot, verticalConstraint);
            thumb = $('circle')[1];

            simulate.sendTouchEvents(initialCoords, thumb, 'touchstart');
            simulate.sendTouchEvents(finalCoords, svgRoot, 'touchmove');

            var currentMatrix = thumb.getCTM();

            expect(currentMatrix.e).toEqual(0);
            expect(currentMatrix.f).toEqual(finalCoords[0].y - initialCoords[0].y);
        });

        it('mousemove should update svg element position', function() {
            var initialCoords = [{x: 0, y: 0}],
                finalCoords = [{x: 1, y: 1}];

            simulate.sendTouchEvents(initialCoords, thumb, 'mousedown');
            simulate.sendTouchEvents(finalCoords, svgRoot, 'mousemove');

            var currentMatrix = thumb.getCTM();

            expect(currentMatrix.e).toEqual(finalCoords[0].x - initialCoords[0].x);
            expect(currentMatrix.f).toEqual(finalCoords[0].y - initialCoords[0].y);
        });

        it('mousemove should update svg element position', function() {
            var initialCoords = [{x: 0, y: 0}],
                finalCoords = [{x: 1, y: 1}],
                horizontalConstraint = function (mouseX, mouseY, currentX, currentY) {
                    return [mouseX, currentY];
                };

            $.thumb.createThumb(20, 0, 0, svgRoot, horizontalConstraint);
            thumb = $('circle')[1];

            simulate.sendTouchEvents(initialCoords, thumb, 'mousedown');
            simulate.sendTouchEvents(finalCoords, svgRoot, 'mousemove');

            var currentMatrix = thumb.getCTM();

            expect(currentMatrix.e).toEqual(finalCoords[0].x - initialCoords[0].x);
            expect(currentMatrix.f).toEqual(0);
        });
    });

    describe('shutdown', function() {
        var placeholder, svgRoot, thumb;

        beforeEach(function() {
            placeholder = setFixtures('<div id="test-container" style="width: 600px;height: 400px">')
                .find('#test-container');
            svgRoot = $.thumb.createSVGLayer(placeholder);
            $.thumb.createThumb(20, 0, 0, svgRoot);
            thumb = $('circle')[0];
        });

        it('should remove touch and mouse handlers', function() {
            var spy = jasmine.createSpy('thumbsmove handler'),
                spy2 = jasmine.createSpy('thumbsmoveend handler'),
                initialCoords = [{x: 0, y: 0}],
                finalCoords = [{x: 1, y: 1}];

            document.addEventListener('thumbsmove', spy);
            document.addEventListener('thumbsmoveend', spy2);

            $.thumb.shutdown(svgRoot);

            //after shutdown, check if the events are still triggerd
            simulate.sendTouchEvents(initialCoords, thumb, 'touchstart');
            simulate.sendTouchEvents(finalCoords, svgRoot, 'touchmove');
            simulate.sendTouchEvents(finalCoords, svgRoot, 'touchend');

            expect(spy).not.toHaveBeenCalled();
            expect(spy.calls.count()).toBe(0);
            expect(spy2).not.toHaveBeenCalled();
            expect(spy2.calls.count()).toBe(0);

            simulate.sendTouchEvents(initialCoords, thumb, 'mousedown');
            simulate.sendTouchEvents(finalCoords, svgRoot, 'mousemove');
            simulate.sendTouchEvents(finalCoords, svgRoot, 'mouseup');

            expect(spy).not.toHaveBeenCalled();
            expect(spy.calls.count()).toBe(0);
            expect(spy2).not.toHaveBeenCalled();
            expect(spy2.calls.count()).toBe(0);
        });
    });

    describe('updateComputedXPosition', function() {
        var placeholder, svgRoot, thumb;

        beforeEach(function() {
            placeholder = setFixtures('<div id="test-container" style="width: 600px;height: 400px">')
                .find('#test-container');
            svgRoot = $.thumb.createSVGLayer(placeholder);
            $.thumb.createThumb(20, 0, 0, svgRoot);
            thumb = $('circle')[0];
        });

        it('should update for a thumb the cx position', function() {
            var position = 30;
            $.thumb.updateComputedXPosition(thumb, position);

            expect(thumb.getCTM().e + parseFloat(thumb.getAttribute('cx'))).toEqual(position);
        });

        it('should update for a translated thumb the cx position', function() {
            var currentMatrix = thumb.getCTM(),
                position = 30,
                translationAmout = 10;

            currentMatrix.e += translationAmout;
            thumb.transform.baseVal.getItem(0).setMatrix(currentMatrix);

            $.thumb.updateComputedXPosition(thumb, position);

            expect(thumb.getCTM().e).toEqual(translationAmout);
            expect(thumb.getCTM().e + parseFloat(thumb.getAttribute('cx'))).toEqual(position);
        });
    });

    describe('updateComputedYPosition', function() {
        var placeholder, svgRoot, thumb;

        beforeEach(function() {
            placeholder = setFixtures('<div id="test-container" style="width: 600px;height: 400px">')
                .find('#test-container');
            svgRoot = $.thumb.createSVGLayer(placeholder);
            $.thumb.createThumb(20, 0, 0, svgRoot);
            thumb = $('circle')[0];
        });

        it('should update for a thumb the cx position', function() {
            var position = 30;
            $.thumb.updateComputedYPosition(thumb, position);

            expect(thumb.getCTM().f + parseFloat(thumb.getAttribute('cy'))).toEqual(position);
        });

        it('should update for a translated thumb the cx position', function() {
            var currentMatrix = thumb.getCTM(),
                position = 30,
                translationAmout = 10;

            currentMatrix.f += translationAmout;
            thumb.transform.baseVal.getItem(0).setMatrix(currentMatrix);

            $.thumb.updateComputedYPosition(thumb, position);

            expect(thumb.getCTM().f).toEqual(translationAmout);
            expect(thumb.getCTM().f + parseFloat(thumb.getAttribute('cy'))).toEqual(position);
        });
    });
});
