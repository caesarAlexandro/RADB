define([
    'underscore',
    'backbone'
] , function (_, Backbone) {
    'use strict';
    return Backbone.Model.extend({
        url: 'http://acnjrkickerbxhca6smut.devcloud.acquia-sites.com/rest/ads',
        // parse: function (response) {
        //     return response[6];
        // },
        initialize: function () {
            this.deferred = this.fetch({
                dataType: 'jsonp'
            });
        }
        // defaults: {
        //     'Title' : 'Kids Stay and Eat Free',
        //     'Description' : 'Your VIP's stay and eat for free, and are free to eplore all the hotel has to offer'
        // }
    })
});
