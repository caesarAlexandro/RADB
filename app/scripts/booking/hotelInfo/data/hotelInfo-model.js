/**
* @ComponentName Hotel Information Model
* @Description The goal for this component is work as a Data Model for the information from the Hotel selected.
**/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    return Backbone.Model.extend({
        initialize: function () {
        },
        defaults: {
            'hotelType': '',
            'hotelName' : 'AAAA',
            'hotelAddress' : '',
            'hotelLocation' : '',
            'hotelTelephone' : ''
        },
        /*jshint unused:false*/
        validate: function (attrs, options) {
        },
        /*jshint unused:false*/
        parse: function (response, options) {
            return response;
        }
    });

});
