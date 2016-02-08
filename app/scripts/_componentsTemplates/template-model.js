/**
* @ComponentName Model Name
* @Description The goal for this component is work as a Data Model for XXXXX
**/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';
    return Backbone.Model.extend({
        url: '',
        initialize: function () {
        },
        defaults: {
        },
        /*jshint unused:false*/
        validate: function (attrs, options) {
        },
        /*jshint unused:false*/
        parse: function (response, options)  {
            return response;
        }
    });

});
