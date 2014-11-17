/* global $, describe, it, xit, after, beforeEach, afterEach, expect, jasmine */
/* jshint browser: true*/

describe("Cursors snapping", function () {
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

    it('should be able to snap to a plot');
});