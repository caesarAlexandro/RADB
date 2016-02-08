/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'handlebars',
    'templates'
], function ($, _, Backbone, Marionette, Handlebars, JST) {
    'use strict';
    return Marionette.ItemView.extend({
        template: JST['app/scripts/booking/hotelList/loading/loading-template.hbs'],
        /*initialize : function () {
            this.render();
        },
        render: function()
        {
            var spinner = $('<div class="container loading-view"><div class="text-center"><i class="fa fa-circle-o-notch fa-spin"></i></div></div>');
            this.$el.html(spinner);
            console.log('Loaded');
        }*/
    });
});
