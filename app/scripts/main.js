/**
* @ComponentName: Main application dependency inyection
* @description Component to inyect and define the main dependencies for the application.
*/

'use strict';

require.config({
    shim: {
        handlebars: {
            exports: 'Handlebars'
        },
        bootstrap: {
            exports: 'Bootstrap',
            deps : ['jquery']
        },
        owlcarousel: {
            exports: 'owlcarousel',
            deps : ['jquery']
        }
    },
    paths: {
        jquery: '../vendor/jquery/dist/jquery',
        backbone: '../vendor/backbone/backbone',
        marionette: '../vendor/marionette/lib/backbone.marionette.min',
        underscore: '../vendor/lodash/dist/lodash',
        localstorage: '../vendor/backbone.localStorage/backbone.localStorage-min',
        handlebars: '../vendor/handlebars/handlebars.min',
        bootstrap: '../vendor/bootstrap/dist/js/bootstrap.min',
        backboneRadio:'../vendor/backbone.radio/build/backbone.radio.min',
        fontawesome:'../vendor/fontawesome/css/font-awesome.css',
        mansonry:'../vendor/masonry/masonry.js',
        waypoint: '../vendor/waypoints/lib/noframework.waypoints.min',
        normalize: '../vendor/normalize-css/normalize.css',
        webshim:'../vendor/webshim/js-webshim/dev/polyfiller',
        moment: '../vendor/moment/moment',
        rangedatepicker: '../vendor/jquery-date-range-picker/jquery.daterangepicker',
        owlcarousel: '../vendor/owlcarousel/owl-carousel/owl.carousel'
    }
});
require([
    'backbone',
    'marionette',
    'common/navigation/navMain-router',
    'booking/common/booking-router',
    'bootstrap',
    'backboneRadio',
    'owlcarousel'
],
function (Backbone, Marionette, MainRouter, BookingRouter) {
    new MainRouter();
    new BookingRouter();
    Backbone.history.start();
    Backbone.history.on('all', function () {
        var bookingLayout = Backbone.Radio.channel('Booking').request('Layout');
        if (typeof bookingLayout !== 'undefined') {
            bookingLayout.routeChange();
        }
    });
});

