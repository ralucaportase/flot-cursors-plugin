flot.cursors
============

This is a plugin for jQuery flot, to create cursors.

This plugin is based on another plugin `jQuery.flot.crosshair.js` which can be found on <http://code.google.com/p/flot/>

The plugin supports these options:

cursors: [
    {
        mode: null or "x" or "y" or "xy",
        color: color,
        lineWidth: number,
        position: {...}
    },
    {
        mode: null or "x" or "y" or "xy",
        color: color,
        lineWidth: number,
        position: {...}
    }
]

Set the mode to one of "x", "y" or "xy". The "x" mode enables a vertical
cursor that lets you trace the values on the x axis, "y" enables a
horizontal cursor and "xy" enables them both. "color" is the color of the
cursor (default is "rgba(170, 0, 0, 0.80)"), "lineWidth" is the width of
the drawn lines (default is 1).

The plugin also adds some public methods:

    addCursor( name, pos, options )

        add a new cursor named 'name' at the position pos with default options
        specified in options. "pos" is in coordinates of the plot and should be
        on the form { x: xpos, y: ypos } (you can use  x2/x3/... if you're using
        multiple axes), which is coincidentally the same format as what you get
        from a "plothover" event.

    removeCursor( name )

        remove the cursor named 'name'.

    moveCursor( name , pos)

        Causes the cursor with the name 'name' to move to 'pos'

    Example usage:

	var myFlot = $.plot( $("#graph"), ...,
    {
        cursors: [
            { name: 'Green cursor', mode: 'xy', color: 'green' },
            { name: 'Red cursor', mode: 'xy', color: 'red' }
        ]
    });

jquery.flot.cursors is available under the MIT license.
