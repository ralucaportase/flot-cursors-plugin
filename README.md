flot.cursors
============

This is a plugin for jQuery flot to create cursors. Cursors are used to measure various values on the graph. You can have multiple cursors on a graph

This plugin is based on another plugin `jQuery.flot.crosshair.js` which can be found in the flot chart package at <http://www.flotcharts.org/>

Options
-------

The plugin supports these options:

    cursors: [
        {
            name: 'string'
            mode: null or 'x' or 'y' or 'xy',
            color: color,
            lineWidth: number,
            position: {
                relativeX or x or x2 or x3 ..: number,
                relativeY or y or y2 or y3 ..: number,
            }
        },
        <more cursors if needed>
    ]

**name** is a string containing the name of the cursor.

**mode** is one of "x", "y" or "xy". The "x" mode enables a vertical
cursor that lets you trace the values on the x axis, "y" enables a
horizontal cursor and "xy" enables them both.

**color** is the color of the cursor (default is "rgba(170, 0, 0, 0.80)")

**lineWidth** is the width of the drawn lines (default is 1).

**position** position of the cursor. It can be specified relative to the canvas, in pixels, 
using a *relativeX, relativeY* pair of coordinates or using axis based coordinates 
( *x, x2, x3 .., y, y2, y3* ).


Public Methods
--------------


The plugin adds some public methods to the chart:

    getCursors()
    
        Returns a list containing all the cursors

    addCursor( options )
    
        creates a new cursor with the parameters specified in options. See the options described in the options section.

    removeCursor( cursorToRemove )

        remove the specified cursor from the plot. *cursorToRemove* is a cursor reference to one of the cursors obtained with getCursors()

    setCursor ( cursor , options)

        Changes one or more cursor property.

How to use:

    var myFlot = $.plot( $("#graph"), ...,
        {
            cursors: [
                { name: 'Green cursor', mode: 'xy', color: 'green' },
                { name: 'Red cursor', mode: 'xy', color: 'red' }
            ]
        });

jquery.flot.cursors is available under the MIT license.

Interactive example here: <http://cipix2000.github.io/flot-cursors-plugin/>
