 /**
 * @ComponentName: Filter Item View
 * @Description: The purpose of this Marionnette Item View object is to add the template, manipulate DOM, listen to
 * the events from the filter component from the pages onthe Booking Layout.
 **/

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
        template:  JST['app/scripts/booking/common/filter/filter-template.hbs']
    });
});
