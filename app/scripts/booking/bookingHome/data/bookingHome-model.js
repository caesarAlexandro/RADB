/*global define*/
define([
    'underscore',
    'backbone',
    'moment'
], function(_, Backbone, moment) {
    'use strict';

    return Backbone.Model.extend({
        initialize: function() {},
        defaults: {
            'city': 'Chicago',
            'dateIn': moment().format('ddd, MMM DD, YYYY'),
            'dateOut': moment().add(1, 'days').format('ddd, MMM DD, YYYY'),
            'cancelFree': moment().subtract(1, 'days').format('ddd, MMM DD, YYYY'),
            'numRooms': '1',
            'numGuests': '1'
        },
        /*jshint unused:false*/
        validate: function(attrs, options) {},
        /*jshint unused:false*/
        parse: function(response, options) {
            return response;
        }
    });
});
