/* Flot plugin for adding a legend for cursors to the plot.

Copyright (c) cipix2000@gmail.com.
Licensed under the MIT license.
*/

/*global jQuery*/

(function ($) {
    'use strict';

    var options = {cursorsLegendDiv: null};

    function init(plot) {
        var legendDiv;
        
        plot.hooks.processOptions.push(function (plot, options) {
            if (options.cursorsLegendDiv) {
                legendDiv = $(legendDiv)[0];
                if (legendDiv) {
                    populateLegendDiv(plot, legendDiv);
                }
            }
        });

        var onCursorUpdates = function () {

        };

        plot.hooks.bindEvents.push(function (plot, eventHolder) {
            eventHolder.bind('cursorupdates', onCursorUpdates);
        });

        plot.hooks.shutdown.push(function (plot, eventHolder) {
            eventHolder.unbind('cursorupdates');
        });
    }
    
    function populateLegendDiv(plot, div) {
        div.append('<div id="jqxgrid"/>');
        
    }

    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'cursors-legend',
        version: '0.1'
    });
})(jQuery);