/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'templates'
], function ($, _, Backbone, Marionette, JST) {
    'use strict';
    return Marionette.LayoutView.extend({
        template : JST['app/scripts/booking/hotelList/hotelList-template.hbs'],
        regions : {
            'currentBranchResults' : '#currentBranchResults',
            'recommendationsResults' : '#recommendedResults'
        },
        serializeData : function () {
            var currentRoute = Backbone.history.getFragment(),
                cTotalResults = sessionStorage.getItem('currentTotalResults'),
                rTotalResults = sessionStorage.getItem('recommendedTotalResults');
            return _.extend({
                currentTotalResults : cTotalResults,
                recommendedTotalResults : rTotalResults
            }, this.model);
        },
        renderCarousel : function() {
            $('#resultscarousel').owlCarousel({
                navigation : true, // Show next and prev buttons
                slideSpeed : 300,
                paginationSpeed : 400,
                singleItem:true
            });
        },
        initialize: function () {
            this.render();
            setTimeout(this.renderCarousel, 1000);
        }
    });
});
