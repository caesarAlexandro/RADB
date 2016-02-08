 /**
 * @ComponentName: Modify Search View
 * @Description: The purpose of this Marionnette Item View object is to add the template, manipulate DOM, listen to
 * the events from the modify search component from the pages on the Booking Layout.
 **/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'handlebars',
    'templates',
    'booking/bookingHome/bookingHome-itemView',
    'common/utility/helpers/valueCompare-helper'
], function ($, _, Backbone, Marionette, Handlebars, JST, BookingHome) {
    'use strict';
    var bookingChannel;
    return Marionette.ItemView.extend({
        template:  JST['app/scripts/booking/common/modifySearch/modifySearch-template.hbs'],
    });
});
