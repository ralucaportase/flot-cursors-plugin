/* global $, describe, it, xit, after, beforeEach, afterEach, expect, jasmine */
/* jshint browser: true*/

describe("Cursors snapping", function () {
    'use strict';

    var sampledata = [[0, 1], [1, 1.1], [2, 1.2]];
    var sampledata2 = [[0, 2], [1, 2.1], [2, 2.2]];
    var sampledatav2 = [[0, 1], [1, 2.1], [2, 1.2]];
    var sampledata2v2 = [[0, 2], [1, 0.9], [2, 2.2]];

    var plot;
    var placeholder;

    beforeEach(function () {
        var fixture = setFixtures('<div id="demo-container" style="width: 800px;height: 600px">').find('#demo-container').get(0);

        placeholder = $('<div id="placeholder" style="width: 100%;height: 100%">');
        placeholder.appendTo(fixture);
        jasmine.clock().install();
    });

    afterEach(function () {
        plot.shutdown();
        $('#placeholder').empty();
        jasmine.clock().uninstall();
    });

    it('should not snap to a plot by default', function () {
        plot = $.plot("#placeholder", [sampledata], {
            xaxis: { autoscale: 'none', min: 0, max: 2 },
            yaxis: { autoscale: 'none', min: 0, max: 2 },
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        x: 1,
                        y: 1
                    }
                }
            ]
        });

        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        var pos = plot.p2c({
            x: 1,
            y: 1
        });

        expect(cursor.x).toBe(pos.left);
        expect(cursor.y).toBe(pos.top);
    });

    it('should be able to snap to a plot', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        x: 1,
                        y: 0
                    },
                    snapToPlot: 0
                }
            ]
        });

        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        var pos = plot.p2c({
            x: 1,
            y: 1.1
        });

        expect(cursor.x).toBe(pos.left);
        expect(cursor.y).toBe(pos.top);
    });

    it('should be able to snap to a specific plot', function () {
        plot = $.plot("#placeholder", [sampledata, sampledata2], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        x: 1,
                        y: 0
                    },
                    snapToPlot: 1
                }
            ]
        });

        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        var pos = plot.p2c({
            x: 1,
            y: 2.1
        });

        expect(cursor.x).toBe(pos.left);
        expect(cursor.y).toBe(pos.top);
    });

    it('should be able to snap to a dynamic plot', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        x: 1,
                        y: 0
                    },
                    snapToPlot: 0
                }
            ]
        });

        var updateChart = function () {
            plot.setData([sampledata2]);
            plot.setupGrid();
            plot.draw();
        };

        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        var pos = plot.p2c({
            x: 1,
            y: 1.1
        });

        expect(cursor.x).toBe(pos.left);
        expect(cursor.y).toBe(pos.top);

        updateChart();
        jasmine.clock().tick(20);

        pos = plot.p2c({
            x: 1,
            y: 2.1
        });

        expect(cursor.x).toBe(pos.left);
        expect(cursor.y).toBe(pos.top);
    });

    it('should be able to snap to any plot when the cursor is created with coords relative to canvas', function () {
        plot = $.plot("#placeholder", [sampledata, sampledata2], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 0.5,
                        relativeY: 0.75
                    },
                    snapToPlot: -1
                }
            ]
        });
        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        var pos = plot.p2c({ x: 1, y: 1.1 });
        expect(cursor.x).toBe(pos.left);
        expect(cursor.y).toBe(pos.top);

        plot.setData([sampledatav2, sampledata2v2]);
        plot.setupGrid();
        plot.draw();

        jasmine.clock().tick(20);
        pos = plot.p2c({ x: 1, y: 0.9 });
        expect(cursor.x).toBeCloseTo(pos.left, 2);
        expect(cursor.y).toBeCloseTo(pos.top, 2);
    });

    it('should be able to snap to any plot when the cursor is created with coords relative to axes', function () {
        plot = $.plot("#placeholder", [sampledata, sampledata2], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        x: 1,
                        y: 1
                    },
                    snapToPlot: -1
                }
            ]
        });
        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        var pos = plot.p2c({ x: 1, y: 1.1 });
        expect(cursor.x).toBe(pos.left);
        expect(cursor.y).toBe(pos.top);

        plot.setData([sampledatav2, sampledata2v2]);
        plot.setupGrid();
        plot.draw();

        jasmine.clock().tick(20);
        pos = plot.p2c({ x: 1, y: 0.9 });
        expect(cursor.x).toBeCloseTo(pos.left, 2);
        expect(cursor.y).toBeCloseTo(pos.top, 2);
    });

    it('should be possible to change it to snap to a different plot', function () {
        plot = $.plot("#placeholder", [sampledata, sampledata2], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        x: 1,
                        y: 0
                    },
                    snapToPlot: 0
                }
            ]
        });

        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        var pos = plot.p2c({
            x: 1,
            y: 1.1
        });

        expect(cursor.x).toBe(pos.left);
        expect(cursor.y).toBe(pos.top);

        plot.setCursor(cursor, {
            snapToPlot: 1
        });

        jasmine.clock().tick(20);

        pos = plot.p2c({
            x: 1,
            y: 2.1
        });

        expect(cursor.x).toBe(pos.left);
        expect(cursor.y).toBe(pos.top);
    });

    it('should stay at the set position when no data is available at the requested x position', function () {
        plot = $.plot("#placeholder", [sampledata, sampledata2], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        x: 1,
                        y: 0
                    },
                    snapToPlot: 1
                }
            ]
        });

        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        var pos = plot.p2c({
            x: 1,
            y: 2.1
        });

        expect(cursor.x).toBe(pos.left);
        expect(cursor.y).toBe(pos.top);

        plot.setCursor(cursor, {
            snapToPlot: 0
        });

        jasmine.clock().tick(20);

        pos = plot.p2c({
            x: 1,
            y: 1.1
        });

        expect(cursor.x).toBe(pos.left);
        expect(cursor.y).toBe(pos.top);
    });

    it('should snap on the closest position on mouse up', function() {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 0.2,
                        relativeY: 0.1
                    }
                }
            ]
        });

        var cursorX = plot.offset().left + plot.width() * 0.5,
            cursorY = plot.offset().top + plot.height() * 0.6,
            cursor = plot.getCursors()[0];

        cursor.selected = true;
        cursor.dragmode = 'xy';

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        expect(cursor.position.relativeX).toBe(0.5);
        expect(cursor.position.relativeY).toBe(0.6);
    })
});
