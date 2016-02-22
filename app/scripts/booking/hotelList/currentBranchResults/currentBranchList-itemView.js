
/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'handlebars',
    'templates',
    'backboneRadio'
], function ($, _, Backbone, Marionette, Handlebars, JST) {
    'use strict';
    var bookingChannel;
    return Marionette.ItemView.extend({
        template:  JST['app/scripts/booking/hotelList/currentBranchResults/currentBranchList-template.hbs'],
        events : {
            //'click .hotel-result' : 'hotelInformation',
            'click .gotodetails' : 'hotelInformation',
            'click #selectHotel' : 'hotelPayment',
            'click .quickview' : 'quickView',
            'click .showfilters' : 'showFilters'
        },
        initialize : function () {
            bookingChannel = Backbone.Radio.channel('Booking');
        },
        showFilters : function () {
            $('.filters').show();
        },
        quickView : function () {
            $('.hotelsummary').slideToggle(200);
        },
        /**
         * @function hotelInformation
         * @description After the User clicks on the hotel description it will sends him to the hotel Information page.
         */
        hotelInformation : function () {
            Backbone.history.navigate('booking/hotelList/hotelInfo', true);
            bookingChannel.reply('BookModel', this.model);
            $(window).scrollTop(0, 0);
        },
        /**
         * @function hotelInformation
         * @description After the User clicks on the select button for a specifci hotel it will sends him to
         * the Payment and Room page.
         */
        hotelPayment : function (event) {
            Backbone.history.navigate('booking/guestInfo', true);
            bookingChannel.reply('BookModel', this.model);
            $(window).scrollTop(0, 0);
            event.stopPropagation();
        }
    });
});
