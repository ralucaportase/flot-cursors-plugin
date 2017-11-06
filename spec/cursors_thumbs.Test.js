describe('cursor with thumbs', function() {
    'use strict';

    var sampledata = [[0, 1], [1, 1.1], [2, 1.2]],
        plot,
        placeholder,
        options;

    beforeEach(function() {
        var fixture = setFixtures('<div id="demo-container" style="width: 800px;height: 600px">').find('#demo-container').get(0);

        placeholder = $('<div id="placeholder" style="width: 100%;height: 100%">');
        placeholder.appendTo(fixture);
        options = {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 0.5,
                        relativeY: 0.6
                    },
                    showThumbs: true
                }
            ]
        };

        jasmine.clock().install();
    });

    afterEach(function () {
        plot.shutdown();
        $('#placeholder').empty();
        jasmine.clock().uninstall();
    });

    it('should create a thumb for showThumb specified', function() {
        plot = $.plot(placeholder, [sampledata], options);

        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        expect(cursor.thumbs.length).toEqual(1);
    });

    it('should not create a thumb for showThumb false', function() {
        options = {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 0.5,
                        relativeY: 0.6
                    }
                }
            ]
        };
        plot = $.plot(placeholder, [sampledata], options);

        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        expect(cursor.thumbs.length).toEqual(0);
    });

    describe('thumbmove event for a given cursor', function() {
        it('should set the cursor selected property for thumbmovestart event', function() {
            plot = $.plot(placeholder, [sampledata], options);

            jasmine.clock().tick(20);

            var thumb = $('circle')[0],
                initialCoords = [{x: 0, y: 0}];

            simulate.sendTouchEvents(initialCoords, thumb, 'touchstart');
            var cursor = plot.getCursors()[0];

            expect(cursor.selected).toEqual(true);
        });

        it('should set the cursor selected property to false for thumbmoveend event', function() {
            plot = $.plot(placeholder, [sampledata], options);

            jasmine.clock().tick(20);

            var thumb = $('circle')[0],
                initialCoords = [{x: 0, y: 0}],
                svgRoot = $.thumb.createSVGLayer(placeholder).children[0],
                cursor = plot.getCursors()[0];

            simulate.sendTouchEvents(initialCoords, thumb, 'touchstart');

            expect(cursor.selected).toEqual(true);

            simulate.sendTouchEvents(initialCoords, svgRoot, 'touchend');

            expect(cursor.selected).toEqual(false);
        });

        it('should change the cursor position on thumbmove event', function() {
            plot = $.plot(placeholder, [sampledata], options);

            jasmine.clock().tick(20);

            var cursorX = plot.offset().left + plot.width() * 0.5,
                cursorY = plot.offset().top + plot.height() * 0.6,
                svgRoot = $.thumb.createSVGLayer(placeholder).children[0],
                thumb = $('circle')[0],
                cursor = plot.getCursors()[0],
                initialCoords = [{x: cursorX, y: cursorY}],
                finalCoords = [{x: cursorX + 100, y: cursorY + 100}];

            simulate.sendTouchEvents(initialCoords, thumb, 'touchstart');
            simulate.sendTouchEvents(finalCoords, svgRoot, 'touchmove');

            jasmine.clock().tick(20);

            expect(cursor.x).toBeCloseTo(plot.width() * 0.5 + 100);
            expect(cursor.y).toBeCloseTo(plot.height() * 0.6);
        });

        it('should change the thumb position on cursor move event', function() {
            plot = $.plot(placeholder, [sampledata], options);

            jasmine.clock().tick(20);

            var cursorX = plot.offset().left + plot.width() * 0.5,
                cursorY = plot.offset().top + plot.height() * 0.6,
                eventHolder = $('#placeholder').find('.flot-overlay'),
                thumb = $('circle')[0],
                cursor = plot.getCursors()[0],
                thumbCy = parseFloat(thumb.getAttribute('cy'));

            simulate.mouseDown(eventHolder[0], cursorX, cursorY);
            eventHolder.trigger(new $.Event('mousemove', {
                pageX: cursorX + 100,
                pageY: cursorY + 50
            }));

            eventHolder.trigger(new $.Event('mouseup', {
                pageX: cursorX + 100,
                pageY: cursorY + 50
            }));

            jasmine.clock().tick(20);

            expect(parseFloat(thumb.getAttribute('cx'))).toEqual(cursor.x + plot.getPlotOffset().left);
            expect(thumbCy).toEqual(parseFloat(thumb.getAttribute('cy')));
        });
    });
});
