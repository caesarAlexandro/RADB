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
        template:  JST['app/scripts/booking/hotelList/recommendedResults/recommendedList-template.hbs'],
        events : {
            'click .hotel-result' : 'hInformation',
            'click #selectHotel' : 'hPayment'
        },
        initialize : function () {
            bookingChannel = Backbone.Radio.channel('Booking');
        },
        /**
         * @function hInformation
         * @description After the User clicks on the hotel description, it will reedirect him to the hotel Information page.
         **/
        hInformation : function () {
            var brandName = this.model.get('hotelBrandName').toLowerCase(),
                brandQuery = '';
            for (var x = 0 ; x < brandName.length ; x++) {
                if (brandName.charAt(x) === ' ') {
                    brandQuery += brandName.charAt(x + 1).toUpperCase();
                    x++;
                }else {
                    brandQuery += brandName.charAt(x);
                }
            };
            Backbone.history.navigate('booking/hotelList/hotelInfo', true);
            bookingChannel.reply('BookModel', this.model);
            $(window).scrollTop(0, 0);
        },
        /**
         * @function hInformation
         * @description After the User clicks on the Select button of a specific hotel, it will reedirect him
         * to the Payment and Room page.
         **/
        hPayment : function (event) {
            var brandName = this.model.get('hotelBrandName').toLowerCase(),
                brandQuery = '';
            for (var x = 0 ; x < brandName.length ; x++) {
                if (brandName.charAt(x) === ' ') {
                    brandQuery += brandName.charAt(x + 1).toUpperCase();
                    x++;
                } else {
                    brandQuery += brandName.charAt(x);
                }
            };
            Backbone.history.navigate('booking/guestInfo', true);
            bookingChannel.reply('BookModel', this.model);
            $(window).scrollTop(0, 0);
            event.stopPropagation();
        }
    });
});
