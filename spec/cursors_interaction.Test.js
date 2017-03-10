/* global $, describe, it, xit, after, beforeEach, afterEach, expect, jasmine */
/* jshint browser: true*/

describe("Cursors interaction", function () {
    'use strict';

    var sampledata = [[0, 1], [1, 1.1], [2, 1.2]];
    var plot;
    var placeholder;

    beforeEach(function () {
      var fixture = setFixtures('<div id="demo-container" style="width: 800px;height: 600px">').find('#demo-container').get(0);

      placeholder = $('<div id="placeholder" style="width: 100%;height: 100%">');
      placeholder.appendTo(fixture);

        jasmine.addMatchers({
            toBeAnyOf: function (util, customEqualityTesters) {
                return {
                    compare: function (actual, expected) {
                        var res = false;
                        for (var i = 0, l = expected.length; i < l; i++) {
                            if (actual === expected[i]) {
                                res = true;
                                break;
                            }
                        }
                        return {
                            pass: res
                        };
                    }
                };
            }
        });

        jasmine.clock().install();
    });

    afterEach(function () {
        plot.shutdown();
        $('#placeholder').empty();
        jasmine.clock().uninstall();
    });

    it('should become selected on mouse down on cursor manipulator and unselected on mouseup', function () {
        plot = $.plot("#placeholder", [sampledata], {
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
        });

        var cursorX = plot.offset().left + plot.width() * 0.5;
        var cursorY = plot.offset().top + plot.height() * 0.6;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.selected).toBe(true);

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        expect(cursor.selected).toBe(false);
    });

    it('should not become selected on mouse down if not visible', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 0.5,
                        relativeY: 0.6
                    },
                    show: false
                }
            ]
        });

        var cursorX = plot.offset().left + plot.width() * 0.5;
        var cursorY = plot.offset().top + plot.height() * 0.6;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.selected).not.toBe(true);
    });

    it('should treat a mouseout event as a mouseup', function () {
        plot = $.plot("#placeholder", [sampledata], {
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
        });

        var cursorX = plot.offset().left + plot.width() * 0.5;
        var cursorY = plot.offset().top + plot.height() * 0.6;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.selected).toBe(true);

        eventHolder.trigger(new $.Event('mouseout', {
            pageX: cursorX,
            pageY: cursorY
        }));

        expect(cursor.selected).toBe(false);
    });

    it('should only listen to the relevant mouse buttons', function() {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 0.5,
                        relativeY: 0.6
                    },
                    mouseButton: 'right',
                }
            ]
        });

        var cursorX = plot.offset().left + plot.width() * 0.5;
        var cursorY = plot.offset().top + plot.height() * 0.6;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY,
            button: 2
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.selected).toBe(true);

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY,
            button: 2
        }));

        expect(cursor.selected).toBe(false);

        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY,
            button: 1
        }));

        expect(cursor.selected).toBe(false);
    });

    it('should become selected on mouse down on cursor vertical line and unselected on mouseup', function () {
        plot = $.plot("#placeholder", [sampledata], {
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
        });

        var cursorX = plot.offset().left + plot.width() * 0.5;
        var cursorY = plot.offset().top + plot.height() * 0.2;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.selected).toBe(true);

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        expect(cursor.selected).toBe(false);
    });

    it('should become selected on mouse down on cursor horizontal line and unselected on mouseup', function () {
        plot = $.plot("#placeholder", [sampledata], {
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
        });

        var cursorX = plot.offset().left + plot.width() * 0.3;
        var cursorY = plot.offset().top + plot.height() * 0.6;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.selected).toBe(true);

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        expect(cursor.selected).toBe(false);
    });

    it('should be possible to drag cursors with the mouse from the cursor manipulator', function () {
        plot = $.plot("#placeholder", [sampledata], {
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
        });

        var cursorX = plot.offset().left + plot.width() * 0.5;
        var cursorY = plot.offset().top + plot.height() * 0.6;

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
        expect(cursor.x).toBe(plot.width() * 0.5 + 13);
        expect(cursor.y).toBe(plot.height() * 0.6 + 5);
    });

    it('should not be possible to move a cursor with movable set to false', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 0.5,
                        relativeY: 0.6
                    },
                    movable: false
                    }
                ]
        });

        var cursorX = plot.offset().left + plot.width() * 0.5;
        var cursorY = plot.offset().top + plot.height() * 0.6;

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
        expect(cursor.x).toBe(plot.width() * 0.5);
        expect(cursor.y).toBe(plot.height() * 0.6);
    });

    it('should not be possible to move a cursor that is not visible', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 0.5,
                        relativeY: 0.6
                    },
                    show: false
                }
            ]
        });

        var cursorX = plot.offset().left + plot.width() * 0.5;
        var cursorY = plot.offset().top + plot.height() * 0.6;

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
        expect(cursor.x).toBe(plot.width() * 0.5);
        expect(cursor.y).toBe(plot.height() * 0.6);
    });

    it('should be constrained on the right side by the chart margin when dragging', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 0.5,
                        relativeY: 0.6
                    }
                }
            ],
            yaxes: [
                {
                    position: 'right'
                }]
        });

        var cursorX = plot.offset().left + plot.width() * 0.5;
        var cursorY = plot.offset().top + plot.height() * 0.6;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        cursorX = plot.offset().left + plot.width() + 5;

        eventHolder.trigger(new $.Event('mousemove', {
            pageX: cursorX,
            pageY: cursorY
        }));

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        expect(cursor.x).toBe(plot.width());
        expect(cursor.y).toBe(plot.height() * 0.6);
    });

    it('should be constrained on the top side by the chart margin when dragging', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 0.5,
                        relativeY: 0.6
                    }
                }
            ],
            xaxes: [
                {
                    position: 'top'
                }]
        });

        var cursorX = plot.offset().left + plot.width() * 0.5;
        var cursorY = plot.offset().top + plot.height() * 0.6;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        cursorY = plot.offset().top - 5;

        eventHolder.trigger(new $.Event('mousemove', {
            pageX: cursorX,
            pageY: cursorY
        }));

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        expect(cursor.x).toBe(plot.width() * 0.5);
        expect(cursor.y).toBe(0);
    });

    it('should be constrained on the bottom side by the chart margin when dragging', function () {
        plot = $.plot("#placeholder", [sampledata], {
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
        });

        var cursorX = plot.offset().left + plot.width() * 0.5;
        var cursorY = plot.offset().top + plot.height() * 0.6;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        cursorY = plot.offset().top + plot.height() + 5;

        eventHolder.trigger(new $.Event('mousemove', {
            pageX: cursorX,
            pageY: cursorY
        }));

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        expect(cursor.x).toBe(plot.width() * 0.5);
        expect(cursor.y).toBe(plot.height());
    });

    it('should be possible to drag cursors with the mouse from the cursor manipulator while the chart updates', function () {
        plot = $.plot("#placeholder", [sampledata], {
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
        });

        var cursorX = plot.offset().left + plot.width() * 0.5;
        var cursorY = plot.offset().top + plot.height() * 0.6;

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
        expect(cursor.x).toBe(plot.width() * 0.5 + 13);
        expect(cursor.y).toBe(plot.height() * 0.6 + 5);
    });

    it('should be possible to drag cursors with the mouse from the vertical line if the cursor is positioned relative to axes', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        x: 0,
                        y: 0
                    }
                }
            ]
        });

        var cursorX = plot.offset().left;
        var cursorY = plot.offset().top + plot.height();

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        cursorX += 13;

        eventHolder.trigger(new $.Event('mousemove', {
            pageX: cursorX,
            pageY: cursorY
        }));

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        expect(cursor.x).toBeCloseTo(cursorX - plot.offset().left, 0);
    });

    it('should be possible to drag cursors with the mouse from the horizontal line if the cursor is positioned relative to axes', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    mode: 'y',
                    position: {
                        x: 0,
                        y: 0
                    }
                }
            ]
        });

        var cursorX = plot.offset().left;
        var cursorY = plot.offset().top + plot.height();

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        cursorY -= 13;

        eventHolder.trigger(new $.Event('mousemove', {
            pageX: cursorX,
            pageY: cursorY
        }));

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        expect(cursor.y).toBeCloseTo(cursorY - plot.offset().top, 0);
    });

    it('should be highlighted on mouse over the cursor manipulator', function () {
        plot = $.plot("#placeholder", [sampledata], {
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
        });

        var cursorX = plot.offset().left + plot.width() * 0.5;
        var cursorY = plot.offset().top + plot.height() * 0.6;

        jasmine.clock().tick(20);

        $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.highlighted).toBe(true);
    });

    it('should not be highlighted on mouse over the cursor manipulator if not visible', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 0.5,
                        relativeY: 0.6
                    },
                    show: false
                }
            ]
        });

        var cursorX = plot.offset().left + plot.width() * 0.5;
        var cursorY = plot.offset().top + plot.height() * 0.6;

        jasmine.clock().tick(20);

        $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.highlighted).not.toBe(true);
    });

    describe('Mouse pointer', function () {
        it('should change the mouse pointer on mouse over the cursor manipulator', function () {
            plot = $.plot("#placeholder", [sampledata], {
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
            });

        var cursorX = plot.offset().left + plot.width() * 0.5;
        var cursorY = plot.offset().top + plot.height() * 0.6;

            jasmine.clock().tick(20);

            $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
                pageX: cursorX,
                pageY: cursorY
            }));

            expect($('#placeholder').css('cursor')).toBe('pointer');
        });

        it('should not change the mouse pointer on mouse over the cursor manipulator if not visible', function () {
            plot = $.plot("#placeholder", [sampledata], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        color: 'blue',
                        position: {
                            relativeX: 0.5,
                            relativeY: 0.6
                        },
                        show: false
                    }
                ]
            });

        var cursorX = plot.offset().left + plot.width() * 0.5;
        var cursorY = plot.offset().top + plot.height() * 0.6;

            jasmine.clock().tick(20);

            $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
                pageX: cursorX,
                pageY: cursorY
            }));

            expect($('#placeholder').css('cursor')).not.toBe('pointer');
        });


        it('should change the mouse pointer when moving from the cursor vertical line to the cursor manipulator', function () {
            plot = $.plot("#placeholder", [sampledata], {
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
            });

            var cursorX = plot.offset().left + plot.width() * 0.5;
            var cursorY = plot.offset().top + plot.height() * 0.6 / 2;

            jasmine.clock().tick(20);

            $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
                pageX: cursorX,
                pageY: cursorY
            }));

            cursorY += plot.height() * 0.6 / 2;

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
                        color: 'blue',
                        position: {
                            relativeX: 0.5,
                            relativeY: 0.6
                        }
                    }
                ]
            });

            var cursorX = plot.offset().left + plot.width() * 0.5;
            var cursorY = plot.offset().top + plot.height() * 0.6;

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

        it('should change the mouse pointer on mouse over the cursor vertical line', function () {
            plot = $.plot("#placeholder", [sampledata], {
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
            });

            var cursorX = plot.offset().left + plot.width() * 0.5;
            var cursorY = plot.offset().top + plot.height() * 0.3;

            jasmine.clock().tick(20);

            $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
                pageX: cursorX,
                pageY: cursorY
            }));

            expect($('#placeholder').css('cursor')).toBe('col-resize');
        });

        it('shouldn\'t change the mouse pointer when the mouse is at the same x but the cursor doesn\'t have a vertical line', function () {
            plot = $.plot("#placeholder", [sampledata], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        mode: 'y',
                        color: 'blue',
                        position: {
                            relativeX: 0.5,
                            relativeY: 0.6
                        }
                    }
                ]
            });

            var cursorX = plot.offset().left + plot.width() * 0.5;
            var cursorY = plot.offset().top + plot.height() * 0.3;

            jasmine.clock().tick(20);

            $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
                pageX: cursorX,
                pageY: cursorY
            }));

            expect($('#placeholder').css('cursor')).toBeAnyOf(['auto', 'default']);
        });

        it('should change the mouse pointer on mouse over the cursor horizontal line', function () {
            plot = $.plot("#placeholder", [sampledata], {
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
            });

            var cursorX = plot.offset().left + plot.width() * 0.3;
            var cursorY = plot.offset().top + plot.height() * 0.6;

            jasmine.clock().tick(20);

            $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
                pageX: cursorX,
                pageY: cursorY
            }));

            expect($('#placeholder').css('cursor')).toBe('row-resize');
        });

        it('should set the mouse pointer correctly when moving the cursor in one axis');

        it('should set the mouse pointer of the holder div to default on chart shutdown', function () {
            plot = $.plot("#placeholder", [sampledata], {
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
            });

            var cursorX = plot.offset().left + plot.width() * 0.5;
            var cursorY = plot.offset().top + plot.height() * 0.6;

            jasmine.clock().tick(20);

            $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
                pageX: cursorX,
                pageY: cursorY
            }));

            expect($('#placeholder').css('cursor')).toBe('pointer');

            plot.shutdown();

            expect($('#placeholder').css('cursor')).toBeAnyOf(['auto', 'default']);
        });
    });
});
