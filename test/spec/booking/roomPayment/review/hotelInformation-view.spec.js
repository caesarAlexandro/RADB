define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'booking/hotelInfo/hotelInfo-itemView'
], function ($, _, Backbone, Marionette, HotelInfoItemView) {
    'use strict';
    describe('Hotel layout of Booking app', function () {
        beforeEach(function () {
            this.view = new HotelInfoItemView();
			this.view.render();
        } );
        it('Should have a head-label', function () {
            expect(this.view.$el.find(".head-label").length).to.equal(1);
        });
        it('Should have a main div with a container and background images', function () {
            expect(this.view.$el.find(".hotel-info").length).to.equal(1);
        });
        it('Should have a container with all the content', function () {
            expect(this.view.$el.find(".hotel-info-content").length).to.equal(1);
        });
        it('Should have a div with hotel description', function () {
            expect(this.view.$el.find(".hotel-description").length).to.equal(1);
        });
        it('Should have a div with amenities', function () {
            expect(this.view.$el.find(".head-label").length).to.equal(1);
        });
        it('Should have a div with Trip advisor reviews', function () {
            expect(this.view.$el.find(".reviews").length).to.equal(1);
        });
        it('Should have a div with background images', function () {
            expect(this.view.$el.find(".hotel-info-images").length).to.equal(1);
        });
        });
    });