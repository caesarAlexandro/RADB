define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'booking/roomPayment/guestInfo/guestInfo-itemView'
], function ($, _, Backbone, Marionette, GuestInfo) {
    'use strict';
    describe('Guest Information in Room and Payment page', function () {
        beforeEach(function () {
            var guestModel = new Backbone.Model({
                firstName : "Jose",
                lastName : "Garcia",
                email: "jg@kaksd.akak",
                phoneNumber : 1233434,
                country : "Mexico",
                zip : 123456   
            });
            this.view = new GuestInfo({model:guestModel});
            this.view.render();
        });
        it('Room and Payment initialized', function () {
            this.view.should.equal(this.view);
        });

    });
});
