/* global $, describe, it, xit, after, beforeEach, afterEach, expect, jasmine */
/* jshint browser: true*/

describe("Cursors snapping", function () {
    'use strict';

    var sampledata = [[0, 1], [1, 1.1], [2, 1.2]];
    var sampledata2 = [[0, 2], [1, 2.1], [2, 2.2]];

    var plot;

    beforeEach(function () {
        jasmine.clock().install();
    });

    afterEach(function () {
        plot.shutdown();
        $('#placeholder').empty();
        jasmine.clock().uninstall();
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
});