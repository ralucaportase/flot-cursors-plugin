/* global $, describe, it, xit, after, beforeEach, afterEach, expect, jasmine */
/* jshint browser: true*/

describe("Cursors interaction", function () {
    var sampledata = [[0, 1], [1, 1.1], [2, 1.2]];

    var plot;

    beforeEach(function () {
        jasmine.clock().install();
    });
    afterEach(function () {
        plot.shutdown();
        $('#placeholder').empty();
        jasmine.clock().uninstall();
    });

    it('should be become floating on mouse down on cursor manipulator and nonfloating on mouseup', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    mode: 'xy',
                    color: 'blue',
                    position: {
                        relativeX: 50,
                        relativeY: 60
                    }
                    }
                ]
        });

        var cursorX = plot.offset().left + 50;
        var cursorY = plot.offset().top + 60;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.locked).toBe(false);

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        expect(cursor.locked).toBe(true);
    });

    xit('should be become floating on mouse down on cursor vertical line and nonfloating on mouseup', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    mode: 'xy',
                    color: 'blue',
                    position: {
                        relativeX: 50,
                        relativeY: 60
                    }
                    }
                ]
        });

        var cursorX = plot.offset().left + 50;
        var cursorY = plot.offset().top + 20;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.locked).toBe(false);

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        expect(cursor.locked).toBe(true);
    });

    xit('should be become floating on mouse down on cursor horizontal line and nonfloating on mouseup', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    mode: 'xy',
                    color: 'blue',
                    position: {
                        relativeX: 50,
                        relativeY: 60
                    }
                    }
                ]
        });

        var cursorX = plot.offset().left + 30;
        var cursorY = plot.offset().top + 60;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.locked).toBe(false);

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        expect(cursor.locked).toBe(true);
    });

    it('should be possible to drag cursors with the mouse from the cursor manipulator', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    mode: 'xy',
                    color: 'blue',
                    position: {
                        relativeX: 50,
                        relativeY: 60
                    }
                    }
                ]
        });

        var cursorX = plot.offset().left + 50;
        var cursorY = plot.offset().top + 60;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        cursorX += 13;
        cursorY += 5;

        eventHolder.trigger(new $.Event('mousemove', {
            pageX: cursorX,
            pageY: cursorY
        }));

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.x).toBe(50 + 13);
        expect(cursor.y).toBe(60 + 5);
    });

    it('should be possible to drag cursors with the mouse from the cursor manipulator while the chart updates', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    mode: 'xy',
                    color: 'blue',
                    position: {
                        relativeX: 50,
                        relativeY: 60
                    }
                    }
                ]
        });

        var cursorX = plot.offset().left + 50;
        var cursorY = plot.offset().top + 60;

        var updateChart = function () {
            plot.setData([[[0, 1.2], [1, 1.1], [2, 1]]]);
            plot.setupGrid();
            plot.draw();
        };

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        cursorX += 13;
        cursorY += 5;

        updateChart();
        jasmine.clock().tick(20);

        eventHolder.trigger(new $.Event('mousemove', {
            pageX: cursorX,
            pageY: cursorY
        }));

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.x).toBe(50 + 13);
        expect(cursor.y).toBe(60 + 5);
    });

    it('should be highlighted on mouse over the cursor manipulator', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    mode: 'xy',
                    color: 'blue',
                    position: {
                        relativeX: 50,
                        relativeY: 60
                    }
                    }
                ]
        });

        var cursorX = plot.offset().left + 50;
        var cursorY = plot.offset().top + 60;

        jasmine.clock().tick(20);

        $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.highlighted).toBe(true);
    });

    it('should change the mouse pointer on mouse over the cursor manipulator', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    mode: 'xy',
                    color: 'blue',
                    position: {
                        relativeX: 50,
                        relativeY: 60
                    }
                    }
                ]
        });

        var cursorX = plot.offset().left + 50;
        var cursorY = plot.offset().top + 60;

        jasmine.clock().tick(20);

        $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
            pageX: cursorX,
            pageY: cursorY
        }));

        expect($('#placeholder').css('cursor')).toBe('pointer');
    });

    it('should change the mouse pointer on drag with the cursor manipulator', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    mode: 'xy',
                    color: 'blue',
                    position: {
                        relativeX: 50,
                        relativeY: 60
                    }
                    }
                ]
        });

        var cursorX = plot.offset().left + 50;
        var cursorY = plot.offset().top + 60;

        jasmine.clock().tick(20);

        $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        expect($('#placeholder').css('cursor')).toBe('move');

        $('#placeholder').find('.flot-overlay').trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        expect($('#placeholder').css('cursor')).toBe('default');
    });
});