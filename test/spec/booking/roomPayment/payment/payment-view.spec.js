define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'booking/roomPayment/roomPayment-ItemView'
], function  ($, _, Backbone, Marionette,RoomPaymentItemView) {
    'use strict';
    describe('Show information about rooms, beds, and payments', function () {
        beforeEach(function () {
            this.view = new RoomPaymentItemView();
			this.view.render();
        } );
        it('Should have a div with all the partials with the id accordion', function () {
        	expect(this.view.$el.find('#accordion').length).to.equal(1);
        });
        it('Should have a section with room type partial with id headingOne', function () {
            expect(this.view.$el.find("#headingOne").length).to.equal(1);
        });
        it('Should have a collapse room type div with id collapseOne', function () {
            expect(this.view.$el.find("#collapseOne").length).to.equal(1);
        });
        it('Should have a type of room div inside the collapsible div', function () {
            expect(this.view.$el.find("#radio-list-room").length).to.equal(1);
        });
        it('Should have a section with bed type partial with id headingTwo', function () {
            expect(this.view.$el.find("#headingTwo").length).to.equal(1);
        });
        it('Should have a collapse bed type div with id collapseTwo', function () {
            expect(this.view.$el.find("#collapseTwo").length).to.equal(1);
        });
        it('Should have a type of bed div inside the collapsible div', function () {
            expect(this.view.$el.find("#radio-list-bed").length).to.equal(1);
        });
        it('Should have a section with guestInfo partial with id headingThree', function () {
            expect(this.view.$el.find("#headingThree").length).to.equal(1);
        });
        it('Should have a collapse guestInfo div with id collapseThree', function () {
            expect(this.view.$el.find("#collapseThree").length).to.equal(1);
        });
        it('Should have a section with payment partial with id headingFour', function () {
            expect(this.view.$el.find("#headingFour").length).to.equal(1);
        });
        it('Should have a collapse payment div with id collapseFour', function () {
            expect(this.view.$el.find("#collapseFour").length).to.equal(1);
        });
        it('Should have a section with review partial with id headingFive', function () {
            expect(this.view.$el.find("#headingFive").length).to.equal(1);
        });
        it('Should have a collapse review div with id collapseFive', function () {
            expect(this.view.$el.find("#collapseFive").length).to.equal(1);
        });

    });
});