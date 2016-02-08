 /**
 * @ComponentName: Main Router for Application
 * @Description: The goal for this component is to describe the routes for the navigation menu and the booking funnel routes
 * for the application and associate them with their function.
 **/

define([
    'jquery',
    'backbone',
    'marionette',
    'booking/common/booking-controller'
], function ($, Backbone, Marionette, bookingController) {
    'use strict';
    var mainChannel;
    return Marionette.AppRouter.extend({
        controller : bookingController,
        appRoutes : {
            'booking/hotelList/hotelInfo': 'hotelInfo',
            'booking/hotelList': 'hotelList',
            'booking/guestInfo': 'roomPayment',
            'booking/confirmation': 'confirmation',
            'booking/hotelList/hotelInfo/:query': 'hotelInfo',
            'booking/hotelList/:query': 'hotelList',
            'booking/guestInfo/:query': 'roomPayment',
            'booking/confirmation/:query': 'confirmation'
        }
    });
});
