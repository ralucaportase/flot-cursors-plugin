/* global $, describe, it, xit, after, beforeEach, afterEach, expect, jasmine */
/* jshint browser: true*/

describe("Flot cursors", function () {
    var sampledata = [[0, 1], [1, 1.1], [2, 1.2]];
    var sampledata2 = [[0, 2], [1, 2.1], [2, 2.2]];
    var sampledata3 = [[0, 20], [10, 19], [15, 18]];

    var plot;

    beforeEach(function () {
        jasmine.clock().install();
    });

    afterEach(function () {
        if (plot) {
            plot.shutdown();
        }
        $('#placeholder').empty();
        jasmine.clock().uninstall();
    });

    it('should be possible to specify a cursor when creating the plot', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                }
            ]
        });

        var cursors = plot.getCursors();
        expect(cursors.length).toBe(1);
        expect(cursors[0].name).toBe('Blue cursor');
    });

    it('should be possible to specify zero cursors when creating the plot', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: []
        });

        var cursors = plot.getCursors();
        expect(cursors.length).toBe(0);
    });

    it('should be possible to specify multiple cursors when creating the plot', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                },
                {
                    name: 'Red cursor',
                    color: 'red',
                }
            ]
        });

        var cursors = plot.getCursors();
        expect(cursors.length).toBe(2);
        expect(cursors[0].name).toBe('Blue cursor');
        expect(cursors[1].name).toBe('Red cursor');
    });

    it('should have xy mode by default', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                }
            ]
        });

        var cursors = plot.getCursors();
        expect(cursors[0].mode).toBe('xy');
    });

    it('should be possible to create a cursor at runtime', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: []
        });

        var cursors = plot.getCursors();
        expect(cursors.length).toBe(0);

        plot.addCursor('Blue cursor', 'xy', 'blue', {
            relativeX: 7,
            relativeY: 7
        });

        cursors = plot.getCursors();
        expect(cursors.length).toBe(1);

        expect(cursors[0].name).toBe('Blue cursor');
    });

    it('should be possible to remove a cursor at runtime', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    x: 3,
                    y: 1.5
                }
            ]
        });

        var cursors = plot.getCursors();
        expect(cursors.length).toBe(1);

        plot.removeCursor(cursors[0]);

        cursors = plot.getCursors();
        expect(cursors.length).toBe(0);
    });

    it('should be possible to change a cursor name at runtime', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue'
                }
            ]
        });

        var cursors = plot.getCursors();
        expect(cursors.length).toBe(1);
        expect(cursors[0].name).toBe('Blue cursor');

        plot.setCursor(cursors[0], {
            name: 'Red Cursor'
        });

        cursors = plot.getCursors();
        expect(cursors.length).toBe(1);

        expect(cursors[0].name).toBe('Red Cursor');
    });

    it('should be possible to change a cursor showLabel at runtime', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue'
                }
            ]
        });

        var cursors = plot.getCursors();
        expect(cursors.length).toBe(1);
        expect(cursors[0].showLabel).toBe(false);

        plot.setCursor(cursors[0], {
            showLabel: true
        });

        cursors = plot.getCursors();
        expect(cursors.length).toBe(1);

        expect(cursors[0].showLabel).toBe(true);
    });

    it('should be possible to change a cursor mode at runtime', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue'
                }
            ]
        });

        var cursors = plot.getCursors();
        expect(cursors.length).toBe(1);
        expect(cursors[0].mode).toBe('xy');

        plot.setCursor(cursors[0], {
            mode: 'x'
        });

        cursors = plot.getCursors();
        expect(cursors.length).toBe(1);
        expect(cursors[0].mode).toBe('x');
    });

    it('should be possible to specify the cursor shape');
    it('should display the cursor label when told so');
});