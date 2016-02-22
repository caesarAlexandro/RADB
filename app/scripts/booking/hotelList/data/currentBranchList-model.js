/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';
    var rating = 3;
    return Backbone.Model.extend({
        initialize: function () {
        },
        defaults: {
            'hotelBrand' : 'Radisson Hotel',
            'hotelName' : 'Chicago O Hare',
            'address.line1' : '1450 East Touchy Avenue',
            'miles' : '15.7',
            'cityName' : 'Chicago',
            'address.stateCode' : 'IL',
            'price' : '150',
            'image' : 'full_bg1-lg.jpg',
            'rating' : '4.7'
        },
        /*jshint unused:false*/
        validate: function (attrs, options) {
        },
        /*jshint unused:false*/
        parse: function (response, options) {
            /**
             * @function hotelInformation
             * @description This code is used to separate the hotelName receive from the service.
             *  Once it's separated, we display the information in the view.
             **/
            var name = $(response).attr('name');
            var match = name.match(/^[\s\S]{1,10}\S*/);
            var prefix = match[0];
            name = name.substring(prefix.length).replace(/^\s+/, '');
            response.hotelBrandName = prefix;
            response.hotelName = name;
            response.image = $(response).attr('hotelCode') + '.jpg';
            response.rating = '4.' + rating++;
            return response;
        }
    });

});
