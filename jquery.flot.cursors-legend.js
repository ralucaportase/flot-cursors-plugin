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
        var popup = div.add('<div id="popupWindow">');
        popup.append('<div>Edit cursor</div>');
        var tableDiv = popup.add('<div style="overflow: hidden;">');
    }

    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'cursors-legend',
        version: '0.1'
    });
    
    var popUpTemplate = '';
})(jQuery);