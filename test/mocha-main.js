/*global require*/
'use strict';

require.config({
    baseUrl: 'scripts/',
    shim: {
        handlebars: {
            exports: 'Handlebars'
        },
        bootstrap: {
            exports: 'Bootstrap',
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
        backboneRadio: '../vendor/backbone.radio/build/backbone.radio.min',
        waypoint: '../vendor/waypoints/lib/jquery.waypoints'
    }
});
var specFolder = '../spec/';
require([
    specFolder + 'booking/bookingHome/bookingHome-layoutView.spec',
    specFolder + 'booking/bookingHome/bookingHome-itemView.spec',
    specFolder + 'booking/roomPayment/guestInfo/guestInfo-itemView.spec',
    specFolder + 'booking/roomPayment/payment/payment-view.spec',
    specFolder + 'booking/roomPayment/review/hotelInformation-view.spec',
    specFolder + 'common/footer-itemView.spec',
    //specFolder + 'common/nav-router.spec',
    specFolder + 'common/topNav-itemView.spec'
    //Inject Test Files
   /* @devComment: This code should be implemented later 
    specFolder + '/common/nav-router.spec',*/
], function () {
    // Start the tests
    mocha.run();
});
