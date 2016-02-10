define([
    'underscore',
    'backbone'
] , function (_, Backbone) {
    'use strict';
    return Backbone.Model.extend({
        url: 'http://acnjrkickerbxhca6smut.devcloud.acquia-sites.com/rest/destinations',
        initialize: function () {
            this.deferred = this.fetch({
                dataType: 'jsonp',
            });
        }
    })
});
