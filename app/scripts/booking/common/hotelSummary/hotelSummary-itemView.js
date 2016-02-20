 /**
 * @ComponentName: HotelSummary Item View
 * @Description: The purpose of this Marionnette Item View object is to add the template, manipulate DOM, listen to
 * the events from the Hotel Summary page header component for the pages on the Booking Layout.
 **/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'handlebars',
    'common/utility/misc/data',
    'templates',
    'common/utility/helpers/valueCompare-helper'
], function ($, _, Backbone, Marionette, Handlebars, Data, JST) {
    'use strict';
    var query;
    return Marionette.ItemView.extend({
        initialize : function () {
            Handlebars.registerPartial('tripadvisorIcon',
                                       JST['app/scripts/common/utility/partials/tripadvisorIcon-partialTemplate.hbs']);
            Handlebars.registerPartial('bookNow',
                                       JST['app/scripts/booking/hotelInfo/utility/partials/bookNow-partialTemplate.hbs']);
            Handlebars.registerPartial('hotelInfo',
                                       JST['app/scripts/booking/common/utility/partials/hotelInfo-partialTemplate.hbs']);
            Handlebars.registerPartial('hotelInfoHeader',
                                       JST['app/scripts/booking/common/utility/partials/hotelInfo-partialTemplateHeader.hbs']);
        },
        template :  JST['app/scripts/booking/common/hotelSummary/hotelSummary-template.hbs'],
        serializeData : function () {
            var currentRoute = Backbone.history.getFragment();
            if (currentRoute.length > 26) {
                query = currentRoute.slice(28, 38);
                currentRoute = currentRoute.slice(0, 27);
            }
            return _.extend({
                currentPage : currentRoute,
                heading : 'ROOM, BEDS AND PAYMENT'
            }, this.model.toJSON());
        },
        events : {
            'click #BookNow' : 'bookNow'
        },
        /**
         * @function bookNow
         * @description After the User clicks on the Book Now button on the hotel summary for Hotel information, it will
         * send him to the room and payment section of the booking funnel.
         */
        bookNow : function () {
            if (query) {
                Backbone.history.navigate('booking/guestInfo/' + query, true);
            } else {
                Backbone.history.navigate('booking/guestInfo', true);
            }
            console.log(query);
            $(window).scrollTop(0, 0);
        },
        /**
         * @function Change Header
         * @description This class will change the header style based on the page selection.
         */
        changeHeader : function (option) {
            var header = '.page-header'
            if (option === 'Payment') {
                $('.book-now', header).hide();
                $('.summary-reservation', header).show();
                $('.page-header-book', header).removeClass('hidden');
                $('.page-header-body div', header).hide();
                $('.page-header-book', header).show();
                $('.page-header-body h1', header).text('ROOM, BEDS AND PAYMENT');
                $('.page-header-body h1', header).show();
                $('.page-header-body h5', header).removeClass('in');
                $('.page-header-body h2', header).removeClass('in');

            } else if (option === 'Confirmation') {
                $('.summary-reservation', header).hide();
                $('.page-header-body h1', header).text('YOU’RE CONFIRMED');
                $('.page-header-body h5', header).text('Confirmation Number').addClass('in');
                $('.page-header-body h2', header).text('GPVCCK5').addClass('in');
            } else if (option === 'HotelInfo') {
                //$('.page-header-book').fadeOut('slow');
                $('.summary-reservation', header).hide();
                $('.page-header-body h1', header).hide();
                $('.book-now', header).show();
                $('.page-header-body div', header).show();
            }
        }
    });
});
