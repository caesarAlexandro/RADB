/**
* @ComponentName Collection Name
* @Description The goal for this component is work as a Data collection for XXXXX
**/

define([
    'underscore',
    'backbone',
    'models/collection.template'
], function (_, Backbone, CollectionTemplateModel) {
    'use strict';
    return Backbone.Collection.extend({
        model: CollectionTemplateModel,
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
