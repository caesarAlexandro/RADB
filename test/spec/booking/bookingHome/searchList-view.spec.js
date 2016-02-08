define([
    'jquery',
    'underscore',
    'backbone',  
    'marionette',
    'booking/bookingHome/bookingHome-itemView'
], function  ($, _, Backbone, Marionette,SearchItemView) {
    'use strict';

    describe("Search List ", function () {
        beforeEach(function () {
            this.view = new SearchItemView();
			this.view.render();
        });
        it('Should have a home-search section', function () {
        	expect(this.view.$el.find('#home-search').length).to.equal(1);
        });
        it('Should have a search-pane section', function () {
        	expect(this.view.$el.find('.search-pane').length).to.equal(1);
        });
        it('Should have a list-details section with a DatePicker partial', function () {
        	expect(this.view.$el.find('.list-details').length).to.equal(1);
        });
        it('Should have a popular_social section', function () {
        	expect(this.view.$el.find('.popular_social').length).to.equal(1);
        });
        it('Should have a RedNear Me buttton',function () {
			expect(this.view.$el.find('#btn-readnear').length).to.be.equal(1);
		});
        it('Should have a Search by map buttton',function () {
			expect(this.view.$el.find('#btn-redin').length).to.be.equal(1);
		});
        it('Should have a My Reservation buttton',function () {
			expect(this.view.$el.find('#btn-myreservation').length).to.be.equal(1);
		});
        it('Should have a search-box',function () {
			expect(this.view.$el.find('.search-box').length).to.be.equal(1);
		});
        it('Should have a nav-social section with icons',function () {
			expect(this.view.$el.find('.nav-social').length).to.be.equal(1);
		});
        it('Should have a Facebook icon',function () {
			expect(this.view.$el.find('.fa-facebook').length).to.be.equal(1);
		});
        it('Should have a Twitter icon',function () {
			expect(this.view.$el.find('.fa-twitter').length).to.be.equal(1);
		});
        it('Should have a Google+ icon',function () {
			expect(this.view.$el.find('.fa-google-plus').length).to.be.equal(1);
		});
        it('Should have a Pinterest icon',function () {
			expect(this.view.$el.find('.fa-pinterest').length).to.be.equal(1);
		});
    });
});
