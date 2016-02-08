/**
* @ComponentName : Model for GuestInformation.
* @Description : This model will store all the guest information about the user.
**/

define([
    'underscore',
    'backbone'
] , function (_, Backbone) {
    'use strict';
    return Backbone.Model.extend({
        url: 'localhost',
        // http://analopez-test.apigee.net/xbsservicemockup/guestinformation
        //@devComment: 'http://guillermolam-test.apigee.net/guestInformation/guestv2',
        parse: function (response) {
            return response[6];
        },
        initialize: function () {
            this.deferred = this.fetch();
        }
    })
});
