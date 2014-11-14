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
        plot.shutdown();
        $('#placeholder').empty();
        jasmine.clock().uninstall();
    });

    it('should be possible to specify a cursor when creating the plot', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    mode: 'xy',
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
            cursors: [
            ]
        });

        var cursors = plot.getCursors();
        expect(cursors.length).toBe(0);
    });

    it('should be possible to specify multiple cursors when creating the plot', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    mode: 'xy',
                    color: 'blue',
                },
                {
                    name: 'Red cursor',
                    mode: 'xy',
                    color: 'red',
                }
            ]
        });

        var cursors = plot.getCursors();
        expect(cursors.length).toBe(2);
        expect(cursors[0].name).toBe('Blue cursor');
        expect(cursors[1].name).toBe('Red cursor');
    });

    it('should be possible to create a cursor programatically', function () {
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

    it('should be possible to remove a cursor programatically', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    mode: 'xy',
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

    it('should be possible to change cursor properties programatically', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    mode: 'xy',
                    color: 'blue',
                }
            ]
        });

        var cursors = plot.getCursors();
        expect(cursors.length).toBe(1);
        expect(cursors[0].name).toBe('Blue cursor');

        plot.setCursor(cursors[0], {
            name: 'Red Cursor',
            mode: 'x'
        });

        cursors = plot.getCursors();
        expect(cursors.length).toBe(1);

        expect(cursors[0].name).toBe('Red Cursor');
        expect(cursors[0].mode).toBe('x');
    });

    it('should be possible to specify the cursor shape');
    it('should display the cursor label when told so');

    describe('Intersections', function () {
        it('should find intersections with a plot', function () {
            plot = $.plot("#placeholder", [sampledata], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        mode: 'xy',
                        color: 'blue',
                        position: {
                            x: 1,
                            y: 0
                        }
                    }
                ]
            });

            jasmine.clock().tick(20);

            var cursors = plot.getCursors();
            var intersections = plot.getIntersections(cursors[0]);

            expect(intersections.points.length).toBe(1);
            expect(intersections.points[0].x).toBe(1);
            expect(intersections.points[0].y).toBe(sampledata[1][1]);

        });

        it('should find intersections with multiple plots', function () {
            plot = $.plot("#placeholder", [sampledata, sampledata2], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        mode: 'xy',
                        color: 'blue',
                        position: {
                            x: 1,
                            y: 0
                        }
                    }
                ]
            });

            jasmine.clock().tick(20);

            var cursors = plot.getCursors();
            var intersections = plot.getIntersections(cursors[0]);

            expect(intersections.points.length).toBe(2);
            expect(intersections.points[0].x).toBe(1);
            expect(intersections.points[0].y).toBe(sampledata[1][1]);
            expect(intersections.points[1].x).toBe(1);
            expect(intersections.points[1].y).toBe(sampledata2[1][1]);
        });

        it('should interpolate the intersections properly with linear scales', function () {
            plot = $.plot("#placeholder", [sampledata], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        mode: 'xy',
                        color: 'blue',
                        position: {
                            x: 0.5,
                            y: 0
                        }
                    }
                ]
            });

            jasmine.clock().tick(20);

            var cursors = plot.getCursors();
            var intersections = plot.getIntersections(cursors[0]);
            var expectedY = sampledata[0][1] + (sampledata[1][1] - sampledata[0][1]) / 2;

            expect(intersections.points[0].x).toBe(0.5);
            expect(intersections.points[0].y).toBe(expectedY);
        });

        it('should interpolate the intersections properly with log scales');
        it('should interpolate the intersections properly with mixed scales');

        it('should recompute intersections on data update', function () {
            plot = $.plot("#placeholder", [[[0, 1], [1, 5]]], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        mode: 'xy',
                        color: 'blue',
                        position: {
                            x: 0.5,
                            y: 0
                        }
                    }
                ]
            });

            var updateChart = function () {
                plot.setData([[[0, 1], [1, 7]]]);
                plot.setupGrid();
                plot.draw();
            };

            jasmine.clock().tick(20);

            var cursors = plot.getCursors();
            var intersections = plot.getIntersections(cursors[0]);

            expect(intersections.points[0].x).toBe(0.5);
            expect(intersections.points[0].y).toBe(3);
            updateChart();

            jasmine.clock().tick(20);

            intersections = plot.getIntersections(cursors[0]);

            expect(intersections.points[0].x).toBe(0.5);
            expect(intersections.points[0].y).toBe(4);
        });
    });

    describe('Positioning', function () {
        it('should be possible to position the cursor relative to the canvas', function () {
            plot = $.plot("#placeholder", [sampledata2], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        mode: 'xy',
                        color: 'blue',
                        position: {
                            relativeX: 3,
                            relativeY: 1.5
                        }
                    }
                ]
            });

            jasmine.clock().tick(20);

            var cursors = plot.getCursors();
            expect(cursors.length).toBe(1);
            expect(cursors[0].x).toBe(3);
            expect(cursors[0].y).toBe(1.5);
        });

        it('Cursors positioned relative to the canvas should be constrained by the canvas size', function () {
            plot = $.plot("#placeholder", [sampledata2], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        mode: 'xy',
                        color: 'blue',
                        position: {
                            relativeX: -30,
                            relativeY: -40
                        }
                    }
                ]
            });

            jasmine.clock().tick(20);
            var cursors = plot.getCursors();
            expect(cursors.length).toBe(1);
            expect(cursors[0].x).toBe(0);
            expect(cursors[0].y).toBe(0);
        });

        it('should be possible to position the cursor relative to the axes', function () {
            plot = $.plot("#placeholder", [sampledata2], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        mode: 'xy',
                        color: 'blue',
                        position: {
                            x: 1,
                            y: 2
                        }
                    }
                ]
            });

            jasmine.clock().tick(20);

            var pos = plot.p2c({
                x: 1,
                y: 2
            });
            var expectedX = pos.left;
            var expectedY = pos.top;
            var cursors = plot.getCursors();
            expect(cursors.length).toBe(1);
            expect(cursors[0].x).toBe(expectedX);
            expect(cursors[0].y).toBe(expectedY);
        });

        it('should be possible to position the cursor relative to any of the axes when having multiple ones', function () {
            plot = $.plot("#placeholder", [{
                data: sampledata,
                xaxis: 1,
                yaxis: 1
            }, {
                data: sampledata3,
                xaxis: 2,
                yaxis: 2
            }], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        mode: 'xy',
                        color: 'blue',
                        position: {
                            x: 1,
                            y: 1.1
                        }
                    },
                    {
                        name: 'Red cursor',
                        mode: 'xy',
                        color: 'red',
                        position: {
                            x2: 11,
                            y2: 20
                        }
                    }
                ],
                xaxes: [
                    {
                        position: 'bottom'
                    },
                    {
                        position: 'top'
                    }
                ],
                yaxes: [
                    {
                        position: 'left'
                    },
                    {
                        position: 'right'
                    }
                ]
            });

            jasmine.clock().tick(20);

            var pos1 = plot.p2c({
                x: 1,
                y: 1.1
            });

            var pos2 = plot.p2c({
                x2: 11,
                y2: 20
            });

            var expectedX1 = pos1.left;
            var expectedY1 = pos1.top;
            var expectedX2 = pos2.left;
            var expectedY2 = pos2.top;
            var cursors = plot.getCursors();
            expect(cursors.length).toBe(2);
            expect(cursors[0].x).toBe(expectedX1);
            expect(cursors[0].y).toBe(expectedY1);
            expect(cursors[1].x).toBe(expectedX2);
            expect(cursors[1].y).toBe(expectedY2);
        });
    });

    describe('Mouse interactions', function () {
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

    describe('Snapping', function () {});
});