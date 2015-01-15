/* Flot plugin for adding a legend for cursors to the plot.

Copyright (c) cipix2000@gmail.com.
Licensed under the MIT license.
*/

/*global jQuery*/

(function ($) {
    'use strict';

    var options = {
        cursorsLegendDiv: null
    };

    function init(plot) {
        var legendDiv;

        plot.hooks.processOptions.push(function (plot, options) {

            if (!options.cursorsLegendDiv) {
                return;
            }
            legendDiv = $('#' + options.cursorsLegendDiv);
            if (!legendDiv) {
                return;
            }
            populateLegendDiv(plot, legendDiv);

            plot.hooks.bindEvents.push(function (plot, eventHolder) {
                eventHolder.bind('cursorupdates', onCursorUpdates);
            });

            plot.hooks.shutdown.push(function (plot, eventHolder) {
                eventHolder.unbind('cursorupdates');
            });
        });

        var onCursorUpdates = function () {

        };
    }

    function populateLegendDiv(plot, div) {
        div.empty();
        div.append('<div id="jqxgrid"/>');
        var popup = $('<div id="popupWindow">').appendTo(div);
        popup.append('<div id="title">Edit cursor</div>');
        var bodyDiv = $('<div id="body" style="xxxoverflow: hidden;" />').appendTo(popup);
        bodyDiv.append('<span id="cursorNameText">Name</span>');
        bodyDiv.append('<input id="cursorname" />');
        bodyDiv.append('<span id="colorText">Color</span>');
        $('<div id="dropDownButton"\>').appendTo(bodyDiv)
            .append('<div id="colorPicker">');
        bodyDiv.append('<span id="modeText">Mode</span>');
        bodyDiv.append('<div id="dropDownList"\>');
    }

    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'cursors-legend',
        version: '0.1'
    });

    var popUpTemplate = '';
})(jQuery);